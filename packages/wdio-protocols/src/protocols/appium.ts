import Chromium from './chromium.js'

const getLogTypes = '/session/:sessionId/se/log/types' as const
const getLog = '/session/:sessionId/se/log' as const

const chromiumLogCommands = {
    [getLogTypes]: Chromium[getLogTypes],
    [getLog]: Chromium[getLog],
}

export default {
    ...chromiumLogCommands,
    '/session/:sessionId': {
        GET: {
            command: 'getSession',
            description: 'Retrieve the capabilities of the current session.',
            ref: 'https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints',
            deprecated: 'Use `getAppiumSessionCapabilities` instead',
            parameters: [],
            returns: {
                type: 'Object',
                name: 'capabilities',
                description: "An object describing the session's capabilities.",
            },
        },
    },
    '/session/:sessionId/context': {
        GET: {
            command: 'getAppiumContext',
            ref: 'https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts',
            parameters: [],
            returns: {
                type: 'Context',
                name: 'context',
                description:
                    "a string representing the current context or null representing 'no context'",
            },
        },
        POST: {
            command: 'switchAppiumContext',
            ref: 'https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts',
            parameters: [
                {
                    name: 'name',
                    type: 'string',
                    description: 'a string representing an available context',
                    required: true,
                },
            ],
        },
    },
    '/session/:sessionId/contexts': {
        GET: {
            command: 'getAppiumContexts',
            ref: 'https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts',
            parameters: [],
            returns: {
                type: 'Context[]',
                name: 'contexts',
                description:
                    "an array of strings representing available contexts, e.g. 'WEBVIEW', or 'NATIVE'",
            },
        },
    },
    '/session/:sessionId/appium/commands': {
        GET: {
            command: 'getAppiumCommands',
            description: 'Retrieve the endpoints and BiDi commands supported in the current session.',
            ref: 'https://github.com/appium/appium/blob/master/packages/base-driver/lib/protocol/routes.js',
            parameters: [],
            returns: {
                type: 'Object',
                name: 'commands',
                description:
                    'Supported endpoints and BiDi commands, each grouped into common, driver-specific, and plugin-specific endpoints/commands.',
            },
        },
    },
    '/session/:sessionId/appium/extensions': {
        GET: {
            command: 'getAppiumExtensions',
            description: 'Retrieve the extension commands supported in the current session.',
            ref: 'https://github.com/appium/appium/blob/master/packages/base-driver/lib/protocol/routes.js',
            parameters: [],
            returns: {
                type: 'Object',
                name: 'commands',
                description:
                    'Supported extension commands, grouped into driver-specific and plugin-specific commands.',
            },
        },
    },
    '/session/:sessionId/appium/capabilities': {
        GET: {
            command: 'getAppiumSessionCapabilities',
            description: 'Retrieve the capabilities of the current session.',
            ref: 'https://github.com/appium/appium/blob/master/packages/base-driver/lib/protocol/routes.js',
            parameters: [],
            returns: {
                type: 'Object',
                name: 'capabilities',
                description: "An object describing the session's capabilities.",
            },
        },
    },
    '/session/:sessionId/appium/device/shake': {
        POST: {
            command: 'shake',
            description: 'Perform a shake action on the device.',
            ref: 'https://appium.github.io/appium.io/docs/en/commands/device/interactions/shake/',
            parameters: [],
            support: {
                ios: {
                    XCUITest: '9.3+',
                    UIAutomation: '8.0 to 9.3',
                },
            },
        },
    },
    '/session/:sessionId/appium/device/lock': {
        POST: {
            command: 'lock',
            description: 'Lock the device.',
            ref: 'https://appium.github.io/appium.io/docs/en/commands/device/interactions/lock/',
            parameters: [
                {
                    name: 'seconds',
                    type: 'number',
                    description: 'how long to lock the screen (iOS only)',
                    required: false,
                },
            ],
            support: {
                ios: {
                    UIAutomation: '8.0 to 9.3',
                },
                android: {
                    UiAutomator: '4.2+',
                },
                windows: {
                    Windows: '10+',
                },
            },
        },
    },
    '/session/:sessionId/appium/device/unlock': {
        POST: {
            command: 'unlock',
            description: 'Unlock the device.',
            ref: 'https://appium.github.io/appium.io/docs/en/commands/device/interactions/unlock/',
            parameters: [],
            support: {
                android: {
                    UiAutomator: '4.2+',
                },
                windows: {
                    Windows: '10+',
                },
            },
        },
    },
    '/session/:sessionId/appium/device/is_locked': {
        POST: {
            command: 'isLocked',
            description: 'Check whether the device is locked or not.',
            ref: 'https://appium.github.io/appium.io/docs/en/commands/device/interactions/is-locked/',
            parameters: [],
            returns: {
                type: 'boolean',
                name: 'isLocked',
                description: 'True if the device is locked, false if not',
            },
            support: {
                android: {
                    UiAutomator: '4.2+',
                },
                windows: {
                    Windows: '10+',
                },
            },
        },
    },
    '/session/:sessionId/appium/start_recording_screen': {
        POST: {
            command: 'startRecordingScreen',
            description: 'Start recording the screen.',
            ref: 'https://appium.github.io/appium.io/docs/en/commands/device/recording-screen/start-recording-screen/',
            parameters: [
                {
                    name: 'options',
                    type: 'object',
                    description:
                        'command parameters that can contain keys like: remotePath, username, password, method, forceRestart, timeLimit, videoType, videoQuality, videoFps, bitRate, videoSize, bugReport (see more description in Appium docs)',
                    required: false,
                },
            ],
            support: {
                ios: {
                    XCUITest: '9.3+',
                },
                android: {
                    UiAutomator: '4.2+',
                },
                windows: {
                    Windows: '10+',
                },
            },
        },
    },
    '/session/:sessionId/appium/stop_recording_screen': {
        POST: {
            command: 'stopRecordingScreen',
            description: 'Stop recording screen',
            ref: 'https://appium.github.io/appium.io/docs/en/commands/device/recording-screen/stop-recording-screen/',
            parameters: [
                {
                    name: 'remotePath',
                    type: 'string',
                    description:
                        'The path to the remote location, where the resulting video should be uploaded. The following protocols are supported http/https, ftp. This option only has an effect if there is screen recording process in progreess and forceRestart parameter is not set to true. Null or empty string value (the default setting) means the content of resulting file should be encoded as Base64.',
                    required: false,
                },
                {
                    name: 'username',
                    type: 'string',
                    description:
                        'The name of the user for the remote authentication.',
                    required: false,
                },
                {
                    name: 'password',
                    type: 'string',
                    description: 'The password for the remote authentication.',
                    required: false,
                },
                {
                    name: 'method',
                    type: 'string',
                    description:
                        "The http multipart upload method name. The 'PUT' one is used by default.",
                    required: false,
                },
            ],
            returns: {
                type: 'string',
                name: 'response',
                description:
                    'Base64 encoded string. If remote_path is set, the response is empty string',
            },
            support: {
                ios: {
                    XCUITest: '9.3+',
                },
                android: {
                    UiAutomator: '4.2+',
                },
                windows: {
                    Windows: '10+',
                },
            },
        },
    },
    '/session/:sessionId/appium/performanceData/types': {
        POST: {
            command: 'getPerformanceDataTypes',
            description:
                'Returns the information types of the system state which is supported to read as like cpu, memory, network traffic, and battery.',
            ref: 'https://appium.github.io/appium.io/docs/en/commands/device/performance-data/performance-data-types/',
            parameters: [],
            returns: {
                type: 'string[]',
                name: 'performanceTypes',
                description:
                    'The available performance data types (cpuinfo|batteryinfo|networkinfo|memoryinfo)',
            },
            support: {
                android: {
                    UiAutomator: '4.2+',
                },
            },
        },
    },
    '/session/:sessionId/appium/getPerformanceData': {
        POST: {
            command: 'getPerformanceData',
            description:
                'Returns the information of the system state which is supported to read as like cpu, memory, network traffic, and battery.',
            ref: 'https://appium.github.io/appium.io/docs/en/commands/device/performance-data/get-performance-data/',
            parameters: [
                {
                    name: 'packageName',
                    type: 'string',
                    description: 'the package name of the application',
                    required: true,
                },
                {
                    name: 'dataType',
                    type: 'string',
                    description:
                        'the type of system state which wants to read. It should be one of the supported performance data types',
                    required: true,
                },
                {
                    name: 'dataReadTimeout',
                    type: 'number',
                    description: 'the number of attempts to read',
                    required: false,
                },
            ],
            returns: {
                type: 'string[]',
                name: 'performanceData',
                description:
                    'The information type of the system state which is supported to read as like cpu, memory, network traffic, and battery',
            },
            support: {
                android: {
                    UiAutomator: '4.2+',
                },
            },
        },
    },
    '/session/:sessionId/appium/device/press_keycode': {
        POST: {
            command: 'pressKeyCode',
            description: 'Press a particular key on the device.',
            ref: 'https://appium.github.io/appium.io/docs/en/commands/device/keys/press-keycode/',
            parameters: [
                {
                    name: 'keycode',
                    type: 'number',
                    description: 'keycode to press',
                    required: true,
                },
                {
                    name: 'metastate',
                    type: 'number',
                    description: 'meta state to press the keycode with',
                    required: false,
                },
                {
                    name: 'flags',
                    type: 'number',
                    description: 'flags for the keypress',
                    required: false,
                },
            ],
            support: {
                android: {
                    UiAutomator: '4.2+',
                },
            },
        },
    },
    '/session/:sessionId/appium/device/long_press_keycode': {
        POST: {
            command: 'longPressKeyCode',
            description: 'Press and hold a particular key code on the device.',
            ref: 'https://appium.github.io/appium.io/docs/en/commands/device/keys/long-press-keycode/',
            parameters: [
                {
                    name: 'keycode',
                    type: 'number',
                    description: 'keycode to press on the device',
                    required: true,
                },
                {
                    name: 'metastate',
                    type: 'number',
                    description: 'metastate for the keypress',
                    required: false,
                },
                {
                    name: 'flags',
                    type: 'number',
                    description: 'flags for the keypress',
                    required: false,
                },
            ],
            support: {
                android: {
                    UiAutomator: '4.2+',
                },
            },
        },
    },
    '/session/:sessionId/appium/device/keyevent': {
        POST: {
            command: 'sendKeyEvent',
            description: 'Send a key code to the device.',
            ref: 'https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints',
            parameters: [
                {
                    name: 'keycode',
                    type: 'string',
                    description: 'keycode to press',
                    required: true,
                },
                {
                    name: 'metastate',
                    type: 'string',
                    description: 'meta state to press the keycode with',
                    required: false,
                },
            ],
            support: {
                android: {
                    UiAutomator: '4.2+',
                },
            },
        },
    },
    '/session/:sessionId/rotation': {
        POST: {
            command: 'rotateDevice',
            description: 'Rotate the device in three dimensions.',
            ref: 'https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-rotation',
            parameters: [
                {
                    name: 'x',
                    type: 'number',
                    description:
                        'x offset to use for the center of the rotate gesture',
                    required: true,
                    default: 0,
                },
                {
                    name: 'y',
                    type: 'number',
                    description:
                        'y offset to use for the center of the rotate gesture',
                    required: true,
                    default: 0,
                },
                {
                    name: 'z',
                    type: 'number',
                    description:
                        'z offset to use for the center of the rotate gesture',
                    required: true,
                    default: 0,
                },
            ],
            support: {
                ios: {
                    UIAutomation: '8.0 to 9.3',
                },
                android: {
                    UiAutomator: '4.2+',
                },
            },
        },
    },
    '/session/:sessionId/appium/device/current_activity': {
        GET: {
            command: 'getCurrentActivity',
            description: 'Get the name of the current Android activity.',
            ref: 'https://appium.github.io/appium.io/docs/en/commands/device/activity/current-activity/',
            parameters: [],
            returns: {
                type: 'string',
                name: 'activity',
                description: 'Name of the current activity',
            },
            support: {
                android: {
                    UiAutomator: '4.2+',
                },
            },
        },
    },
    '/session/:sessionId/appium/device/current_package': {
        GET: {
            command: 'getCurrentPackage',
            description: 'Get the name of the current Android package.',
            ref: 'https://appium.github.io/appium.io/docs/en/commands/device/activity/current-package/',
            parameters: [],
            returns: {
                type: 'string',
                name: 'package',
                description: 'Name of the current package',
            },
            support: {
                android: {
                    UiAutomator: '4.2+',
                },
            },
        },
    },
    '/session/:sessionId/appium/device/install_app': {
        POST: {
            command: 'installApp',
            description: 'Install the given app onto the device.',
            ref: 'https://appium.github.io/appium.io/docs/en/commands/device/app/install-app/',
            parameters: [
                {
                    name: 'appPath',
                    type: 'string',
                    description: 'path to application .apk file',
                    required: true,
                },
            ],
            support: {
                ios: {
                    XCUITest: '9.3+',
                    UIAutomation: '8.0 to 9.3',
                },
                android: {
                    UiAutomator: '4.2+',
                },
            },
        },
    },
    '/session/:sessionId/appium/device/activate_app': {
        POST: {
            command: 'activateApp',
            description: 'Activate the given app onto the device',
            ref: 'https://appium.github.io/appium.io/docs/en/commands/device/app/activate-app/',
            parameters: [
                {
                    name: 'appId',
                    type: 'string',
                    description:
                        'App ID (package ID for Android, bundle ID for iOS)',
                    required: true,
                },
            ],
            support: {
                ios: {
                    XCUITest: '9.3+',
                },
                android: {
                    UiAutomator: '4.2+',
                },
            },
        },
    },
    '/session/:sessionId/appium/device/remove_app': {
        POST: {
            command: 'removeApp',
            description: 'Remove an app from the device.',
            ref: 'https://appium.github.io/appium.io/docs/en/commands/device/app/remove-app/',
            parameters: [
                {
                    name: 'appId',
                    type: 'string',
                    description:
                        'App ID (package ID for Android, bundle ID for iOS)',
                    required: true,
                },
            ],
            support: {
                ios: {
                    XCUITest: '9.3+',
                    UIAutomation: '8.0 to 9.3',
                },
                android: {
                    UiAutomator: '4.2+',
                },
            },
        },
    },
    '/session/:sessionId/appium/device/terminate_app': {
        POST: {
            command: 'terminateApp',
            description: 'Terminate the given app on the device',
            ref: 'https://appium.github.io/appium.io/docs/en/commands/device/app/terminate-app/',
            parameters: [
                {
                    name: 'appId',
                    type: 'string',
                    description:
                        'App ID (package ID for Android, bundle ID for iOS)',
                    required: true,
                },
                {
                    name: 'options',
                    type: 'object',
                    description:
                        'Command options. E.g. "timeout": (Only Android) Timeout to retry terminate the app (see more in Appium docs)',
                    required: false,
                },
            ],
            support: {
                ios: {
                    XCUITest: '9.3+',
                },
                android: {
                    UiAutomator: '4.2+',
                },
            },
        },
    },
    '/session/:sessionId/appium/device/app_installed': {
        POST: {
            command: 'isAppInstalled',
            description:
                'Check whether the specified app is installed on the device.',
            ref: 'https://appium.github.io/appium.io/docs/en/commands/device/app/is-app-installed/',
            parameters: [
                {
                    name: 'appId',
                    type: 'string',
                    description:
                        'App ID (package ID for Android, bundle ID for iOS)',
                    required: true,
                },
            ],
            returns: {
                type: 'boolean',
                name: 'isAppInstalled',
                description: 'Return true if installed, false if not',
            },
            support: {
                ios: {
                    XCUITest: '9.3+',
                    UIAutomation: '8.0 to 9.3',
                },
                android: {
                    UiAutomator: '4.2+',
                },
            },
        },
    },
    '/session/:sessionId/appium/device/app_state': {
        POST: {
            command: 'queryAppState',
            description: 'Get the given app status on the device',
            ref: 'https://appium.github.io/appium.io/docs/en/commands/device/app/app-state/',
            parameters: [
                {
                    name: 'appId',
                    type: 'string',
                    description:
                        'App ID (package ID for Android, bundle ID for iOS)',
                    required: true,
                },
            ],
            returns: {
                type: 'number',
                name: 'appStatus',
                description:
                    '0 is not installed. 1 is not running. 2 is running in background or suspended. 3 is running in background. 4 is running in foreground',
            },
            support: {
                ios: {
                    XCUITest: '9.3+',
                },
                android: {
                    UiAutomator: '4.2+',
                },
            },
        },
    },
    '/session/:sessionId/appium/device/hide_keyboard': {
        POST: {
            command: 'hideKeyboard',
            description: 'Hide soft keyboard.',
            ref: 'https://appium.github.io/appium.io/docs/en/commands/device/keys/hide-keyboard/',
            parameters: [
                {
                    name: 'strategy',
                    type: 'string',
                    description:
                        "hide keyboard strategy (UIAutomation only), available strategies - 'press', 'pressKey', 'swipeDown', 'tapOut', 'tapOutside', 'default'",
                    required: false,
                },
                {
                    name: 'key',
                    type: 'string',
                    description: "key value if strategy is 'pressKey'",
                    required: false,
                },
                {
                    name: 'keyCode',
                    type: 'string',
                    description: "key code if strategy is 'pressKey'",
                    required: false,
                },
                {
                    name: 'keyName',
                    type: 'string',
                    description: "key name if strategy is 'pressKey'",
                    required: false,
                },
            ],
            support: {
                ios: {
                    XCUITest: '9.3+',
                    UIAutomation: '8.0 to 9.3',
                },
                android: {
                    UiAutomator: '4.2+',
                },
                windows: {
                    Windows: '10+',
                },
            },
        },
    },
    '/session/:sessionId/appium/device/is_keyboard_shown': {
        GET: {
            command: 'isKeyboardShown',
            description: 'Whether or not the soft keyboard is shown.',
            ref: 'https://appium.github.io/appium.io/docs/en/commands/device/keys/is-keyboard-shown/',
            parameters: [],
            returns: {
                type: 'boolean',
                name: 'isKeyboardShown',
                description: 'True if the keyboard is shown',
            },
            support: {
                ios: {
                    XCUITest: '9.3+',
                    UIAutomation: '8.0 to 9.3',
                },
                android: {
                    UiAutomator: '4.2+',
                },
                windows: {
                    Windows: '10+',
                },
            },
        },
    },
    '/session/:sessionId/appium/device/push_file': {
        POST: {
            command: 'pushFile',
            description: 'Place a file onto the device in a particular place.',
            ref: 'https://appium.github.io/appium.io/docs/en/commands/device/files/push-file/',
            parameters: [
                {
                    name: 'path',
                    type: 'string',
                    description: 'path to install the data to',
                    required: true,
                },
                {
                    name: 'data',
                    type: 'string',
                    description: 'contents of file in base64',
                    required: true,
                },
            ],
            support: {
                ios: {
                    XCUITest: '9.3+',
                    UIAutomation: '8.0 to 9.3',
                },
                android: {
                    UiAutomator: '4.2+',
                },
                windows: {
                    Windows: '10+',
                },
            },
        },
    },
    '/session/:sessionId/appium/device/pull_file': {
        POST: {
            command: 'pullFile',
            description: "Retrieve a file from the device's file system.",
            ref: 'https://appium.github.io/appium.io/docs/en/commands/device/files/pull-file/',
            parameters: [
                {
                    name: 'path',
                    type: 'string',
                    description: 'path on the device to pull file from',
                    required: true,
                },
            ],
            support: {
                ios: {
                    XCUITest: '9.3+',
                    UIAutomation: '8.0 to 9.3',
                },
                android: {
                    UiAutomator: '4.2+',
                },
                windows: {
                    Windows: '10+',
                },
            },
            returns: {
                type: 'string',
                name: 'response',
                description: 'Contents of file in base64',
            },
        },
    },
    '/session/:sessionId/appium/device/pull_folder': {
        POST: {
            command: 'pullFolder',
            description: "Retrieve a folder from the device's file system.",
            ref: 'https://appium.github.io/appium.io/docs/en/commands/device/files/pull-folder/',
            parameters: [
                {
                    name: 'path',
                    type: 'string',
                    description: 'path to an entire folder on the device',
                    required: true,
                },
            ],
            support: {
                ios: {
                    XCUITest: '9.3+',
                    UIAutomation: '8.0 to 9.3',
                },
                android: {
                    UiAutomator: '4.2+',
                },
                windows: {
                    Windows: '10+',
                },
            },
        },
    },
    '/session/:sessionId/appium/device/toggle_airplane_mode': {
        POST: {
            command: 'toggleAirplaneMode',
            description: 'Toggle airplane mode on device.',
            ref: 'https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-airplane-mode/',
            parameters: [],
            support: {
                android: {
                    UiAutomator: '4.2+',
                },
            },
        },
    },
    '/session/:sessionId/appium/device/toggle_data': {
        POST: {
            command: 'toggleData',
            description: 'Switch the state of data service.',
            ref: 'https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-data/',
            parameters: [],
            support: {
                android: {
                    UiAutomator: '4.2+',
                },
            },
        },
    },
    '/session/:sessionId/appium/device/toggle_wifi': {
        POST: {
            command: 'toggleWiFi',
            description: 'Switch the state of the wifi service.',
            ref: 'https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-wifi/',
            parameters: [],
            support: {
                android: {
                    UiAutomator: '4.2+',
                },
            },
        },
    },
    '/session/:sessionId/appium/device/toggle_location_services': {
        POST: {
            command: 'toggleLocationServices',
            description: 'Switch the state of the location service.',
            ref: 'https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-location-services/',
            parameters: [],
            support: {
                android: {
                    UiAutomator: '4.2+',
                },
            },
        },
    },
    '/session/:sessionId/appium/device/network_speed': {
        POST: {
            command: 'toggleNetworkSpeed',
            description: 'Set network speed (Emulator only)',
            ref: 'https://appium.github.io/appium.io/docs/en/commands/device/network/network-speed/',
            parameters: [
                {
                    name: 'netspeed',
                    type: 'string',
                    description:
                        "Network type - 'full','gsm', 'edge', 'hscsd', 'gprs', 'umts', 'hsdpa', 'lte', 'evdo'",
                    required: true,
                },
            ],
            support: {
                android: {
                    UiAutomator: '4.2+',
                },
            },
        },
    },
    '/session/:sessionId/appium/device/open_notifications': {
        POST: {
            command: 'openNotifications',
            description: 'Open Android notifications (Emulator only).',
            ref: 'https://appium.github.io/appium.io/docs/en/commands/device/system/open-notifications/',
            parameters: [],
            support: {
                android: {
                    UiAutomator: '4.2+',
                },
            },
        },
    },
    '/session/:sessionId/appium/device/start_activity': {
        POST: {
            command: 'startActivity',
            description:
                'Start an Android activity by providing package name and activity name.',
            ref: 'https://appium.github.io/appium.io/docs/en/commands/device/activity/start-activity/',
            parameters: [
                {
                    name: 'appPackage',
                    type: 'string',
                    description: 'name of app',
                    required: true,
                },
                {
                    name: 'appActivity',
                    type: 'string',
                    description: 'name of activity',
                    required: true,
                },
                {
                    name: 'appWaitPackage',
                    type: 'string',
                    description: 'name of app to wait for',
                    required: false,
                },
                {
                    name: 'appWaitActivity',
                    type: 'string',
                    description: 'name of activity to wait for',
                    required: false,
                },
                {
                    name: 'intentAction',
                    type: 'string',
                    description:
                        'intent action which will be used to start activity',
                    required: false,
                    default: 'android.intent.action.MAIN',
                },
                {
                    name: 'intentCategory',
                    type: 'string',
                    description:
                        'intent category which will be used to start activity',
                    required: false,
                    default: 'android.intent.category.LAUNCHER',
                },
                {
                    name: 'intentFlags',
                    type: 'string',
                    description: 'flags that will be used to start activity',
                    required: false,
                    default: '0x10200000',
                },
                {
                    name: 'optionalIntentArguments',
                    type: 'string',
                    description:
                        'additional intent arguments that will be used to start activity',
                    required: false,
                },
                {
                    name: 'dontStopAppOnReset',
                    type: 'string',
                    description:
                        'doesn’t stop the process of the app under test, before starting the app using adb',
                    required: false,
                },
            ],
            support: {
                android: {
                    UiAutomator: '4.2+',
                },
            },
        },
    },
    '/session/:sessionId/appium/device/system_bars': {
        GET: {
            command: 'getSystemBars',
            description:
                'Retrieve visibility and bounds information of the status and navigation bars.',
            ref: 'https://appium.github.io/appium.io/docs/en/commands/device/system/system-bars/',
            parameters: [],
            returns: {
                type: 'object[]',
                name: 'systemBars',
                description:
                    'Information about visibility and bounds of status and navigation bar',
            },
            support: {
                android: {
                    UiAutomator: '4.2+',
                },
            },
        },
    },
    '/session/:sessionId/appium/device/system_time': {
        GET: {
            command: 'getDeviceTime',
            description: 'Get the time on the device.',
            ref: 'https://appium.github.io/appium.io/docs/en/commands/device/system/system-time/',
            parameters: [],
            returns: {
                type: 'string',
                name: 'time',
                description: 'Time on the device',
            },
            support: {
                ios: {
                    XCUITest: '9.3+',
                    UIAutomation: '8.0 to 9.3',
                },
                android: {
                    UiAutomator: '4.2+',
                },
            },
        },
    },
    '/session/:sessionId/appium/device/display_density': {
        GET: {
            command: 'getDisplayDensity',
            description: 'Get display density from device.',
            ref: 'https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints',
            parameters: [],
            returns: {
                type: '*',
                name: 'displayDensity',
            },
            support: {
                android: {
                    UiAutomator: '4.2+',
                },
            },
        },
    },
    '/session/:sessionId/appium/simulator/touch_id': {
        POST: {
            command: 'touchId',
            description:
                'Simulate a [touch id](https://support.apple.com/en-ca/ht201371) event (iOS Simulator only). To enable this feature, the `allowTouchIdEnroll` desired capability must be set to true and the Simulator must be [enrolled](https://support.apple.com/en-ca/ht201371). When you set allowTouchIdEnroll to true, it will set the Simulator to be enrolled by default. The enrollment state can be [toggled](https://appium.github.io/appium.io/docs/en/commands/device/simulator/toggle-touch-id-enrollment/index.html). This call will only work if Appium process or its parent application (e.g. Terminal.app or Appium.app) has access to Mac OS accessibility in System Preferences > Security & Privacy > Privacy > Accessibility list.',
            ref: 'https://appium.github.io/appium.io/docs/en/commands/device/simulator/touch-id/',
            parameters: [
                {
                    name: 'match',
                    type: 'boolean',
                    description:
                        'are we simulating a successful touch (true) or a failed touch (false)',
                    required: true,
                },
            ],
            support: {
                ios: {
                    XCUITest: '9.3+',
                },
            },
        },
    },
    '/session/:sessionId/appium/simulator/toggle_touch_id_enrollment': {
        POST: {
            command: 'toggleEnrollTouchId',
            description:
                "Toggle the simulator being [enrolled](https://support.apple.com/en-ca/ht201371) to accept touchId (iOS Simulator only). To enable this feature, the `allowTouchIdEnroll` desired capability must be set to true. When `allowTouchIdEnroll` is set to true the Simulator will be enrolled by default, and the 'Toggle Touch ID Enrollment' changes the enrollment state. This call will only work if the Appium process or its parent application (e.g., Terminal.app or Appium.app) has access to Mac OS accessibility in System Preferences > Security & Privacy > Privacy > Accessibility list.",
            ref: 'https://appium.github.io/appium.io/docs/en/commands/device/simulator/toggle-touch-id-enrollment/',
            parameters: [
                {
                    name: 'enabled',
                    type: 'boolean',
                    description:
                        'equals to true if TouchID enrollment should be enabled',
                    required: false,
                    default: true,
                },
            ],
            support: {
                ios: {
                    XCUITest: '9.3+',
                },
            },
        },
    },
    '/session/:sessionId/appium/app/launch': {
        POST: {
            command: 'launchApp',
            description:
                'Launch an app on device.',
            ref: 'https://appium.github.io/appium.io/docs/en/commands/device/app/launch-app/',
            deprecated: 'For iOS, utilize `driver.execute(\'mobile: launchApp\', { ... })`, and for Android, make use of `driver.execute(\'mobile: activateApp\', { ... })`.',
            parameters: [],
            support: {
                ios: {
                    XCUITest: '9.3+',
                    UIAutomation: '8.0 to 9.3',
                },
                android: {
                    UiAutomator: '4.2+',
                },
            },
        },
    },
    '/session/:sessionId/appium/app/close': {
        POST: {
            command: 'closeApp',
            description: 'Close an app on device.',
            ref: 'https://appium.github.io/appium.io/docs/en/commands/device/app/close-app/',
            deprecated: 'Use `driver.execute(\'mobile: terminateApp\', { ... })` instead',
            parameters: [],
            support: {
                ios: {
                    XCUITest: '9.3+',
                    UIAutomation: '8.0 to 9.3',
                },
                android: {
                    UiAutomator: '4.2+',
                },
            },
        },
    },
    '/session/:sessionId/appium/app/background': {
        POST: {
            command: 'background',
            description:
                'Send the currently running app for this session to the background.',
            ref: 'https://appium.github.io/appium.io/docs/en/commands/device/app/background-app/',
            deprecated: 'Use `driver.execute(\'mobile: backgroundApp\', { ... })` instead',
            parameters: [
                {
                    name: 'seconds',
                    type: '(number|null)',
                    description:
                        "timeout to restore app, if 'null' app won't be restored",
                    required: true,
                    default: 'null',
                },
            ],
            support: {
                ios: {
                    XCUITest: '9.3+',
                    UIAutomation: '8.0 to 9.3',
                },
                android: {
                    UiAutomator: '4.2+',
                },
            },
        },
    },
    '/session/:sessionId/appium/app/end_test_coverage': {
        POST: {
            command: 'endCoverage',
            description: 'Get test coverage data.',
            ref: 'https://appium.github.io/appium.io/docs/en/commands/device/app/end-test-coverage/',
            parameters: [
                {
                    name: 'intent',
                    type: 'string',
                    description: 'intent to broadcast',
                    required: true,
                },
                {
                    name: 'path',
                    type: 'string',
                    description: 'path to .ec file',
                    required: true,
                },
            ],
            support: {
                android: {
                    UiAutomator: '4.2+',
                },
            },
        },
    },
    '/session/:sessionId/appium/app/strings': {
        POST: {
            command: 'getStrings',
            description: 'Get app strings.',
            ref: 'https://appium.github.io/appium.io/docs/en/commands/device/app/get-app-strings/',
            parameters: [
                {
                    name: 'language',
                    type: 'string',
                    description: 'language code',
                    required: false,
                },
                {
                    name: 'stringFile',
                    type: 'string',
                    description: 'path to the string file',
                    required: false,
                },
            ],
            returns: {
                type: 'object',
                name: 'appStrings',
                description:
                    'all defined Strings from an app for the specified language and strings filename',
            },
            support: {
                ios: {
                    XCUITest: '9.3+',
                    UIAutomation: '8.0 to 9.3',
                },
                android: {
                    UiAutomator: '4.2+',
                },
            },
        },
    },
    '/session/:sessionId/appium/element/:elementId/value': {
        POST: {
            command: 'setValueImmediate',
            ref: 'https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints',
            variables: [
                {
                    name: 'elementId',
                    description:
                        'the id of an element returned in a previous call to Find Element(s)',
                },
            ],
            parameters: [
                {
                    name: 'text',
                    type: 'string',
                    description: 'text to set to an element',
                    required: true,
                },
            ],
            support: {
                ios: {
                    XCUITest: '9.3+',
                },
                android: {
                    UiAutomator: '4.2+',
                },
            },
        },
    },
    '/session/:sessionId/appium/element/:elementId/replace_value': {
        POST: {
            command: 'replaceValue',
            description: 'Replace the value to element directly.',
            ref: 'https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints',
            variables: [
                {
                    name: 'elementId',
                    description:
                        'the id of an element returned in a previous call to Find Element(s)',
                },
            ],
            parameters: [
                {
                    name: 'value',
                    type: 'string',
                    description: 'value to replace on element',
                    required: true,
                },
            ],
            support: {
                ios: {
                    XCUITest: '9.3+',
                    UIAutomation: '8.0 to 9.3',
                },
                android: {
                    UiAutomator: '4.2+',
                },
            },
        },
    },
    '/session/:sessionId/appium/settings': {
        GET: {
            command: 'getSettings',
            description: 'Retrieve the current settings on the device.',
            ref: 'https://appium.github.io/appium.io/docs/en/commands/session/settings/get-settings/',
            parameters: [],
            returns: {
                type: 'object',
                name: 'settings',
                description:
                    'JSON hash of all the currently specified settings, see Settings API',
            },
            support: {
                ios: {
                    XCUITest: '9.3+',
                    UIAutomation: '8.0 to 9.3',
                },
                android: {
                    UiAutomator: '4.2+',
                },
                windows: {
                    Windows: '10+',
                },
            },
        },
        POST: {
            command: 'updateSettings',
            description: 'Update the current setting on the device.',
            ref: 'https://appium.github.io/appium.io/docs/en/commands/session/settings/update-settings/',
            parameters: [
                {
                    name: 'settings',
                    type: 'object',
                    description: 'key/value object with settings to update',
                    required: true,
                },
            ],
            support: {
                ios: {
                    XCUITest: '9.3+',
                    UIAutomation: '8.0 to 9.3',
                },
                android: {
                    UiAutomator: '4.2+',
                },
                windows: {
                    Windows: '10+',
                },
            },
        },
    },
    '/session/:sessionId/appium/receive_async_response': {
        POST: {
            command: 'receiveAsyncResponse',
            description:
                'Callback url for asynchronous execution of JavaScript.',
            ref: 'https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints',
            parameters: [
                {
                    name: 'response',
                    type: 'object',
                    description: 'response to receive on device',
                    required: true,
                },
            ],
            support: {
                ios: {
                    XCUITest: '9.3+',
                    UIAutomation: '8.0 to 9.3',
                }
            },
        },
    },
    '/session/:sessionId/appium/device/gsm_call': {
        POST: {
            command: 'gsmCall',
            description: 'Make GSM call (Emulator only).',
            ref: 'https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-call/',
            parameters: [
                {
                    name: 'phoneNumber',
                    type: 'string',
                    description: 'the phone number to call to',
                    required: true,
                },
                {
                    name: 'action',
                    type: 'string',
                    description:
                        "The action - 'call', 'accept', 'cancel', 'hold'",
                    required: true,
                },
            ],
            support: {
                android: {
                    UiAutomator: '4.2+',
                },
            },
        },
    },
    '/session/:sessionId/appium/device/gsm_signal': {
        POST: {
            command: 'gsmSignal',
            description: 'Set GSM signal strength (Emulator only).',
            ref: 'https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-signal/',
            parameters: [
                {
                    name: 'signalStrength',
                    type: 'string',
                    description: 'signal strength in the range [0, 4]',
                    required: true,
                },
                {
                    name: 'signalStrengh',
                    type: 'string',
                    description:
                        'signal strength in the range [0, 4]. Please also set this parameter with the same value if you use Appium v1.11.0 or lower (see https://github.com/appium/appium/issues/12234).',
                    required: false,
                },
            ],
            support: {
                android: {
                    UiAutomator: '4.2+',
                },
            },
        },
    },
    '/session/:sessionId/appium/device/power_capacity': {
        POST: {
            command: 'powerCapacity',
            description: 'Set the battery percentage (Emulator only).',
            ref: 'https://appium.github.io/appium.io/docs/en/commands/device/emulator/power_capacity/',
            parameters: [
                {
                    name: 'percent',
                    type: 'number',
                    description: 'percentage value in range [0, 100]',
                    required: true,
                },
            ],
            support: {
                android: {
                    UiAutomator: '4.2+',
                },
            },
        },
    },
    '/session/:sessionId/appium/device/power_ac': {
        POST: {
            command: 'powerAC',
            description:
                'Set the state of the battery charger to connected or not (Emulator only).',
            ref: 'https://appium.github.io/appium.io/docs/en/commands/device/emulator/power_ac/',
            parameters: [
                {
                    name: 'state',
                    type: 'string',
                    description: 'set the state. on or off',
                    required: true,
                },
            ],
            support: {
                android: {
                    UiAutomator: '4.2+',
                },
            },
        },
    },
    '/session/:sessionId/appium/device/gsm_voice': {
        POST: {
            command: 'gsmVoice',
            description: 'Set GSM voice state (Emulator only).',
            ref: 'https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-voice/',
            parameters: [
                {
                    name: 'state',
                    type: 'string',
                    description:
                        "state of GSM voice - 'unregistered', 'home', 'roaming', 'searching', 'denied', 'off', 'on'",
                    required: true,
                },
            ],
            support: {
                android: {
                    UiAutomator: '4.2+',
                },
            },
        },
    },
    '/session/:sessionId/appium/device/send_sms': {
        POST: {
            command: 'sendSms',
            description: 'Simulate an SMS message (Emulator only).',
            ref: 'https://appium.github.io/appium.io/docs/en/commands/device/network/send-sms/',
            parameters: [
                {
                    name: 'phoneNumber',
                    type: 'string',
                    description: 'the phone number to send the SMS too',
                    required: true,
                },
                {
                    name: 'message',
                    type: 'string',
                    description: 'the SMS message',
                    required: true,
                },
            ],
            support: {
                android: {
                    UiAutomator: '4.2+',
                },
            },
        },
    },
    '/session/:sessionId/appium/device/finger_print': {
        POST: {
            command: 'fingerPrint',
            description:
                'Authenticate users by using their finger print scans on supported emulators.',
            ref: 'https://appium.github.io/appium.io/docs/en/commands/device/authentication/finger-print/',
            parameters: [
                {
                    name: 'fingerprintId',
                    type: 'number',
                    description:
                        'finger prints stored in Android Keystore system (from 1 to 10)',
                    required: true,
                },
            ],
            support: {
                android: {
                    UiAutomator: '4.2+',
                },
            },
        },
    },
    '/session/:sessionId/appium/device/set_clipboard': {
        POST: {
            command: 'setClipboard',
            description: 'Set the content of the system clipboard',
            ref: 'https://appium.github.io/appium.io/docs/en/commands/device/clipboard/set-clipboard/',
            parameters: [
                {
                    name: 'content',
                    type: 'string',
                    description: 'The actual base64 encoded clipboard content',
                    required: true,
                },
                {
                    name: 'contentType',
                    type: 'string',
                    description:
                        'The type of the content to get. Plaintext, Image, URL. Android supports only plaintext',
                    required: false,
                },
                {
                    name: 'label',
                    type: 'string',
                    description: 'Clipboard data label for Android',
                    required: false,
                },
            ],
            returns: {
                type: 'string',
                name: 'response',
                description: 'Response from Appium server',
            },
            support: {
                ios: {
                    XCUITest: '9.3+',
                },
                android: {
                    UiAutomator: '4.2+',
                },
            },
        },
    },
    '/session/:sessionId/appium/device/get_clipboard': {
        POST: {
            command: 'getClipboard',
            description: 'Get the content of the system clipboard',
            ref: 'https://appium.github.io/appium.io/docs/en/commands/device/clipboard/get-clipboard/',
            parameters: [
                {
                    name: 'contentType',
                    type: 'string',
                    description:
                        'The type of the content to get. Plaintext, Image, URL. Android supports only plaintext',
                    required: false,
                },
            ],
            returns: {
                type: 'string',
                name: 'response',
                description:
                    'Clipboard content as base64-encoded string or an empty string if the clipboard is empty',
            },
            support: {
                ios: {
                    XCUITest: '9.3+',
                },
                android: {
                    UiAutomator: '4.2+',
                },
            },
        },
    },
    '/session/:sessionId/touch/perform': {
        POST: {
            command: 'touchPerform',
            description:
                "This functionality is only available from within a native context. 'Touch Perform' works similarly to the other singular touch interactions, except that this allows you to chain together more than one touch action as one command. This is useful because Appium commands are sent over the network and there's latency between commands. This latency can make certain touch interactions impossible because some interactions need to be performed in one sequence. Vertical, for example, requires pressing down, moving to a different y coordinate, and then releasing. For it to work, there can't be a delay between the interactions.",
            ref: 'https://appium.github.io/appium.io/docs/en/commands/interactions/touch/touch-perform/',
            parameters: [
                {
                    name: 'actions',
                    type: 'object[]',
                    description:
                        'The type of action to perform (e.g. moveTo, release, press, tap, wait)',
                    required: true,
                },
            ],
            examples: [
                [
                    '// do a horizontal swipe by percentage',
                    'const startPercentage = 10;',
                    'const endPercentage = 90;',
                    'const anchorPercentage = 50;',
                    '',
                    'const { width, height } = driver.getWindowSize();',
                    'const anchor = height * anchorPercentage / 100;',
                    'const startPoint = width * startPercentage / 100;',
                    'const endPoint = width * endPercentage / 100;',
                    'driver.touchPerform([',
                    '  {',
                    "    action: 'press',",
                    '    options: {',
                    '      x: startPoint,',
                    '      y: anchor,',
                    '    },',
                    '  },',
                    '  {',
                    "    action: 'wait',",
                    '    options: {',
                    '      ms: 100,',
                    '    },',
                    '  },',
                    '  {',
                    "    action: 'moveTo',",
                    '    options: {',
                    '      x: endPoint,',
                    '      y: anchor,',
                    '    },',
                    '  },',
                    '  {',
                    "    action: 'release',",
                    '    options: {},',
                    '  },',
                    ']);',
                ],
            ],
            support: {
                android: {
                    UiAutomator: '4.2+',
                },
                ios: {
                    XCUITest: '9.3+',
                    UIAutomation: '8.0 to 9.3',
                },
                windows: {
                    Windows: '10+',
                },
            },
        },
    },
    '/session/:sessionId/touch/multi/perform': {
        POST: {
            command: 'multiTouchPerform',
            description:
                'This functionality is only available from within a native context. Perform a multi touch action sequence.',
            ref: 'https://appium.github.io/appium.io/docs/en/commands/interactions/touch/multi-touch-perform/',
            parameters: [
                {
                    name: 'actions',
                    type: 'object[]',
                    description:
                        'The type of action to perform (e.g. moveTo, release, press, tap, wait)',
                    required: true,
                },
            ],
            support: {
                android: {
                    UiAutomator: '4.2+',
                },
                ios: {
                    XCUITest: '9.3+',
                    UIAutomation: '8.0 to 9.3',
                },
                windows: {
                    Windows: '10+',
                },
            },
        },
    },
    '/session/:sessionId/appium/execute_driver': {
        POST: {
            command: 'executeDriverScript',
            description:
                'This command enables you to specify a WebdriverIO script as a string and transmit it to the Appium server for local execution on the server itself. This approach helps minimize potential latency associated with each command. ***To utilize this command with Appium 2.0, you must have the [`execute-driver-plugin`](https://github.com/appium/appium/tree/master/packages/execute-driver-plugin) plugin installed.***',
            ref: 'https://github.com/appium/appium/blob/master/docs/en/commands/session/execute-driver.md',
            parameters: [
                {
                    name: 'script',
                    type: 'string',
                    description:
                        "The script to execute. It has access to a 'driver' object which represents a WebdriverIO session attached to the current server.",
                    required: true,
                },
                {
                    name: 'type',
                    type: 'string',
                    description:
                        "The language/framework used in the script. Currently, only 'webdriverio' is supported and is the default.",
                    required: false,
                },
                {
                    name: 'timeout',
                    type: 'number',
                    description:
                        'The number of milliseconds the script should be allowed to run before being killed by the Appium server. Defaults to the equivalent of 1 hour.',
                    required: false,
                },
            ],
            returns: {
                type: 'object',
                name: 'result',
                description:
                    "An object containing two fields: 'result', which is the return value of the script itself, and 'logs', which contains 3 inner fields, 'log', 'warn', and 'error', which hold an array of strings logged by console.log, console.warn, and console.error in the script's execution.",
            },
        },
    },
    '/session/:sessionId/appium/events': {
        POST: {
            command: 'getEvents',
            description: 'Get events stored in appium server.',
            ref: 'https://github.com/appium/appium/blob/master/docs/en/commands/session/events/get-events.md',
            parameters: [
                {
                    name: 'type',
                    type: 'string[]',
                    description:
                        'Get events which are filtered with the type if the type is provided.',
                    required: true,
                },
            ],
            returns: {
                type: 'object',
                name: 'result',
                description:
                    "A JSON hash of events like `{'commands' => [{'cmd' => 123455, ....}], 'startTime' => 1572954894127, }`.",
            },
            support: {
                android: {
                    UiAutomator: '4.2+',
                },
                ios: {
                    XCUITest: '9.3+',
                },
            },
        },
    },
    '/session/:sessionId/appium/log_event': {
        POST: {
            command: 'logEvent',
            description: 'Store a custom event.',
            ref: 'https://github.com/appium/appium/blob/master/docs/en/commands/session/events/log-event.md',
            parameters: [
                {
                    name: 'vendor',
                    type: 'string',
                    description:
                        'The name of vendor. It will be `vendor` in `vendor:event`.',
                    required: true,
                },
                {
                    name: 'event',
                    type: 'string',
                    description:
                        'The name of event. It will be `event` in `vendor:event`.',
                    required: true,
                },
            ],
            support: {
                android: {
                    UiAutomator: '4.2+',
                },
                ios: {
                    XCUITest: '9.3+',
                },
            },
        },
    },
    '/session/:sessionId/appium/compare_images': {
        POST: {
            command: 'compareImages',
            description:
                'This feature conducts image comparisons utilizing the capabilities of the OpenCV framework. Please note that for this functionality to work, both the OpenCV framework and the opencv4nodejs module must be installed on the machine where the Appium server is operational. ***Furthermore, you\'ll need to have the [`images-plugin`](https://github.com/appium/appium/tree/master/packages/images-plugin) plugin installed to use this feature with Appium 2.0.***',
            ref: 'https://github.com/appium/appium/blob/master/packages/images-plugin/docs/image-comparison.md',
            parameters: [
                {
                    name: 'mode',
                    type: 'string',
                    description:
                        "One of possible comparison modes: 'matchFeatures', 'getSimilarity', 'matchTemplate'. 'matchFeatures' is by default.",
                    required: true,
                    default: 'matchFeatures',
                },
                {
                    name: 'firstImage',
                    type: 'string',
                    description:
                        'An image data. All image formats, that OpenCV library itself accepts, are supported.',
                    required: true,
                },
                {
                    name: 'secondImage',
                    type: 'string',
                    description:
                        'An image data. All image formats, that OpenCV library itself accepts, are supported.',
                    required: true,
                },
                {
                    name: 'options',
                    type: 'object',
                    description:
                        'The content of this dictionary depends on the actual `mode` value. See the documentation on `appium-support` module for more details. ',
                    required: true,
                    default: {},
                },
            ],
            returns: {
                type: 'object',
                name: 'result',
                description:
                    'The content of the resulting dictionary depends on the actual `mode` and `options` values. See the documentation on `appium-support` module for more details.',
            },
        },
    },
    '/session/:sessionId/timeouts/implicit_wait': {
        POST: {
            command: 'implicitWait',
            description:
                'Set the amount of time the driver should wait when searching for elements. When searching for a single element, the driver should poll the page until an element is found or the timeout expires, whichever occurs first. When searching for multiple elements, the driver should poll the page until at least one element is found or the timeout expires, at which point it should return an empty list. If this command is never sent, the driver should default to an implicit wait of 0ms.',
            ref: 'https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints',
            parameters: [
                {
                    name: 'ms',
                    type: 'number',
                    description:
                        'The amount of time, in milliseconds, to wait on an element.',
                    required: true,
                },
            ],
            support: {
                android: {
                    UiAutomator: '4.2+',
                },
                ios: {
                    XCUITest: '9.3+',
                },
            },
        },
    },
    '/session/:sessionId/element/:elementId/location_in_view': {
        GET: {
            command: 'getLocationInView',
            description:
                "Determine an element's location on the screen once it has been scrolled into view.<br /><br />__Note:__ This is considered an internal command and should only be used to determine an element's location for correctly generating native events.",
            ref: 'https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints',
            variables: [
                {
                    name: 'elementId',
                    description: 'ID of the element to route the command to',
                },
            ],
            parameters: [],
            returns: {
                type: 'Object',
                name: 'location',
                description:
                    'The X and Y coordinates for the element on the page.',
            },
            support: {
                android: {
                    UiAutomator: '4.2+',
                },
                ios: {
                    XCUITest: '9.3+',
                },
            },
        },
    },
    '/session/:sessionId/keys': {
        POST: {
            command: 'sendKeys',
            description: 'Send a sequence of key strokes to the active element',
            ref: 'https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints',
            parameters: [
                {
                    name: 'value',
                    type: 'string[]',
                    description:
                        'The sequence of keys to type. An array must be provided.',
                    required: true,
                },
            ],
            support: {
                android: {
                    UiAutomator: '4.2+',
                },
                ios: {
                    XCUITest: '9.3+',
                },
            },
        },
    },
    '/session/:sessionId/ime/available_engines': {
        GET: {
            command: 'availableIMEEngines',
            description: 'List all available engines on the machine. To use an engine, it has to be present in this list.',
            ref: 'https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints',
            parameters: [],
            returns: {
                type: 'String[]',
                name: 'engines',
                description: 'A list of available engines',
            },
            support: {
                android: {
                    UiAutomator: '4.2+',
                }
            },
        },
    },
    '/session/:sessionId/ime/active_engine': {
        GET: {
            command: 'getActiveIMEEngine',
            description: 'Get the name of the active IME engine. The name string is platform specific.',
            ref: 'https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints',
            parameters: [],
            returns: {
                type: 'String',
                name: 'engine',
                description: 'The name of the active IME engine',
            },
            support: {
                android: {
                    UiAutomator: '4.2+',
                }
            },
        },
    },
    '/session/:sessionId/ime/activated': {
        GET: {
            command: 'isIMEActivated',
            description: 'Indicates whether IME input is active at the moment',
            ref: 'https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints',
            parameters: [],
            returns: {
                type: 'Boolean',
                name: 'isActive',
                description:
                    'true if IME input is available and currently active, false otherwise',
            },
            support: {
                android: {
                    UiAutomator: '4.2+',
                }
            },
        },
    },
    '/session/:sessionId/ime/deactivate': {
        POST: {
            command: 'deactivateIMEEngine',
            description: 'De-activates the currently-active IME engine.',
            ref: 'https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints',
            parameters: [],
            support: {
                android: {
                    UiAutomator: '4.2+',
                }
            },
        },
    },
    '/session/:sessionId/ime/activate': {
        POST: {
            command: 'activateIMEEngine',
            description: 'Make an engines that is available',
            ref: 'https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints',
            parameters: [
                {
                    name: 'engine',
                    type: 'string',
                    description: 'name of the engine to activate',
                    required: true,
                },
            ],
            support: {
                android: {
                    UiAutomator: '4.2+',
                }
            },
        },
    },
    '/session/:sessionId/timeouts/async_script': {
        POST: {
            command: 'asyncScriptTimeout',
            description:
                'Set the amount of time, in milliseconds, that asynchronous scripts executed by `/session/:sessionId/execute_async` are permitted to run before they are aborted and a `Timeout` error is returned to the client.',
            ref: 'https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints',
            parameters: [
                {
                    name: 'ms',
                    type: 'number',
                    description:
                        'The amount of time, in milliseconds, that time-limited commands are permitted to run',
                    required: true,
                },
            ],
            support: {
                ios: {
                    XCUITest: '9.3+',
                },
            },
        },
    },
    '/session/:sessionId/element/:elementId/submit': {
        POST: {
            command: 'submit',
            description: 'Submit a form element.',
            ref: 'https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints',
            variables: [
                {
                    name: 'elementId',
                    description: 'ID of the form element to be submitted',
                },
            ],
            parameters: [],
            support: {
                ios: {
                    XCUITest: '9.3+',
                },
            },
        },
    },
    '/session/:sessionId/element/:elementId/size': {
        GET: {
            command: 'getElementSize',
            description:
                "Determine an element's size in pixels. The size will be returned as a JSON object with `width` and `height` properties.",
            ref: 'https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints',
            variables: [
                {
                    name: 'elementId',
                    description: 'ID of the element to route the command to',
                },
            ],
            parameters: [],
            returns: {
                type: 'Object',
                name: 'size',
                description: 'The width and height of the element, in pixels.',
            },
            support: {
                android: {
                    UiAutomator: '4.2+',
                },
                ios: {
                    XCUITest: '9.3+',
                },
            },
        },
    },
    '/session/:sessionId/element/:elementId/location': {
        GET: {
            command: 'getElementLocation',
            description:
                "Determine an element's location on the page. The point `(0, 0)` refers to the upper-left corner of the page. The element's coordinates are returned as a JSON object with `x` and `y` properties.",
            ref: 'https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints',
            variables: [
                {
                    name: 'elementId',
                    description: 'ID of the element to route the command to',
                },
            ],
            parameters: [],
            returns: {
                type: 'Object',
                name: 'location',
                description:
                    'The X and Y coordinates for the element on the page.',
            },
            support: {
                android: {
                    UiAutomator: '4.2+',
                },
                ios: {
                    XCUITest: '9.3+',
                },
            },
        },
    },
    '/session/:sessionId/touch/click': {
        POST: {
            command: 'touchClick',
            description: 'Single tap on the touch enabled device.',
            ref: 'https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints',
            parameters: [
                {
                    name: 'element',
                    type: 'string',
                    description: 'ID of the element to single tap on.',
                    required: true,
                },
            ],
            support: {
                android: {
                    UiAutomator: '4.2+',
                },
                ios: {
                    XCUITest: '9.3+',
                },
            },
        },
    },
    '/session/:sessionId/touch/down': {
        POST: {
            command: 'touchDown',
            description: 'Finger down on the screen.',
            ref: 'https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints',
            parameters: [
                {
                    name: 'x',
                    type: 'number',
                    description: 'x coordinate on the screen',
                    required: true,
                },
                {
                    name: 'y',
                    type: 'number',
                    description: 'y coordinate on the screen',
                    required: true,
                },
            ],
            support: {
                android: {
                    UiAutomator: '4.2+',
                }
            },
        },
    },
    '/session/:sessionId/touch/up': {
        POST: {
            command: 'touchUp',
            description: 'Finger up on the screen.',
            ref: 'https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints',
            parameters: [
                {
                    name: 'x',
                    type: 'number',
                    description: 'x coordinate on the screen',
                    required: true,
                },
                {
                    name: 'y',
                    type: 'number',
                    description: 'y coordinate on the screen',
                    required: true,
                },
            ],
            support: {
                android: {
                    UiAutomator: '4.2+',
                }
            },
        },
    },
    '/session/:sessionId/touch/move': {
        POST: {
            command: 'touchMove',
            description: 'Finger move on the screen.',
            ref: 'https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints',
            parameters: [
                {
                    name: 'x',
                    type: 'number',
                    description: 'x coordinate on the screen',
                    required: true,
                },
                {
                    name: 'y',
                    type: 'number',
                    description: 'y coordinate on the screen',
                    required: true,
                },
            ],
            support: {
                android: {
                    UiAutomator: '4.2+',
                }
            },
        },
    },
    '/session/:sessionId/touch/longclick': {
        POST: {
            command: 'touchLongClick',
            description:
                'Long press on the touch screen using finger motion events.',
            ref: 'https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints',
            parameters: [
                {
                    name: 'element',
                    type: 'string',
                    description: 'ID of the element to long press on',
                    required: true,
                },
            ],
            support: {
                android: {
                    UiAutomator: '4.2+',
                }
            },
        },
    },
    '/session/:sessionId/touch/flick': {
        POST: {
            command: 'touchFlick',
            description:
                'Flick on the touch screen using finger motion events. This flick command starts at a particular screen location.',
            ref: 'https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints',
            parameters: [
                {
                    name: 'xoffset',
                    type: 'number',
                    description: 'the x offset in pixels to flick by',
                    required: false,
                },
                {
                    name: 'yoffset',
                    type: 'number',
                    description: 'the y offset in pixels to flick by',
                    required: false,
                },
                {
                    name: 'element',
                    type: 'string',
                    description: 'ID of the element where the flick starts',
                    required: false,
                },
                {
                    name: 'speed',
                    type: 'number',
                    description: 'the speed in pixels per seconds',
                    required: false,
                },
                {
                    name: 'xspeed',
                    type: 'number',
                    description: 'the x speed in pixels per second',
                    required: false,
                },
                {
                    name: 'yspeed',
                    type: 'number',
                    description: 'the y speed in pixels per second',
                    required: false,
                },
            ],
            support: {
                android: {
                    UiAutomator: '4.2+',
                }
            },
        },
    },
    '/session/:sessionId/orientation': {
        GET: {
            command: 'getOrientation',
            description: 'Get the current device orientation.',
            ref: 'https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints',
            parameters: [],
            returns: {
                type: 'String',
                name: 'orientation',
                description:
                    'The current orientation corresponding to a value defined in ScreenOrientation: `LANDSCAPE|PORTRAIT`.',
            },
            support: {
                android: {
                    UiAutomator: '4.2+',
                },
                ios: {
                    XCUITest: '9.3+',
                },
            },
        },
        POST: {
            command: 'setOrientation',
            description: 'Set the device orientation',
            ref: 'https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints',
            parameters: [
                {
                    name: 'orientation',
                    type: 'string',
                    description:
                        'the new browser orientation as defined in ScreenOrientation: `LANDSCAPE|PORTRAIT`',
                    required: true,
                },
            ],
            support: {
                android: {
                    UiAutomator: '4.2+',
                },
                ios: {
                    XCUITest: '9.3+',
                },
            },
        },
    },
    '/session/:sessionId/location': {
        GET: {
            command: 'getGeoLocation',
            description: 'Get the current geo location.',
            ref: 'https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints',
            parameters: [],
            returns: {
                type: 'Object',
                name: 'location',
                description: 'The current geo location.',
            },
        },
        POST: {
            command: 'setGeoLocation',
            description: 'Set the current geo location.',
            ref: 'https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints',
            parameters: [
                {
                    name: 'location',
                    type: 'object',
                    description:
                        'the new location (`{latitude: number, longitude: number, altitude: number}`)',
                    required: true,
                },
            ],
        },
    },
}
