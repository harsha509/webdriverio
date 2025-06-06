import logger from '@wdio/logger'
import { WritableStreamBuffer } from 'stream-buffers'
import type { Workers } from '@wdio/types'

import WorkerInstance from './worker.js'
import { SHUTDOWN_TIMEOUT, BUFFER_OPTIONS } from './constants.js'

const log = logger('@wdio/local-runner')

export type { WorkerInstance }

export interface RunArgs extends Workers.WorkerRunPayload {
    command: string
    args: Workers.WorkerMessageArgs
}

export default class LocalRunner {
    workerPool: Record<string, WorkerInstance> = {}

    stdout = new WritableStreamBuffer(BUFFER_OPTIONS)
    stderr = new WritableStreamBuffer(BUFFER_OPTIONS)

    constructor (
        private _options: never,
        protected _config: WebdriverIO.Config
    ) {}

    /**
     * nothing to initialize when running locally
     */
    initialize () {}

    getWorkerCount () {
        return Object.keys(this.workerPool).length
    }

    async run ({ command, args, ...workerOptions }: RunArgs) {
        /**
         * adjust max listeners on stdout/stderr when creating listeners
         */
        const workerCnt = this.getWorkerCount()
        if (workerCnt >= process.stdout.getMaxListeners() - 2) {
            process.stdout.setMaxListeners(workerCnt + 2)
            process.stderr.setMaxListeners(workerCnt + 2)
        }

        const worker = new WorkerInstance(this._config, workerOptions, this.stdout, this.stderr)
        this.workerPool[workerOptions.cid] = worker
        worker.postMessage(command, args)
        return worker
    }

    /**
     * shutdown all worker processes
     *
     * @return {Promise}  resolves when all worker have been shutdown or
     *                    a timeout was reached
     */
    shutdown () {
        log.info('Shutting down spawned worker')

        for (const [cid, worker] of Object.entries(this.workerPool)) {
            const { capabilities, server, sessionId, config, isMultiremote, instances } = worker
            let payload: Partial<Workers.WorkerMessageArgs> = {}

            /**
             * put connection information to payload if in watch mode
             * in order to attach to browser session and kill it
             */
            if (config && config.watch && (sessionId || isMultiremote)) {
                payload = {
                    config: { ...server, sessionId, ...config },
                    capabilities,
                    watch: true,
                    isMultiremote,
                    instances
                } as unknown as Workers.WorkerMessageArgs
            } else if (!worker.isBusy) {
                delete this.workerPool[cid]
                continue
            }

            worker.postMessage('endSession', payload)
        }

        return new Promise<boolean>((resolve) => {
            const timeout = setTimeout(resolve, SHUTDOWN_TIMEOUT)
            const interval = setInterval(() => {
                const busyWorker = Object.entries(this.workerPool)
                    .filter(([, worker]) => worker.isBusy).length

                log.info(`Waiting for ${busyWorker} to shut down gracefully`)
                if (busyWorker === 0) {
                    clearTimeout(timeout)
                    clearInterval(interval)
                    log.info('shutting down')
                    return resolve(true)
                }
            }, 250)
        })
    }
}
