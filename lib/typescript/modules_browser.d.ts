/* lib/typescript/modules_browser.d - TypeScript interfaces that define master library modules used in the browser. */

/**
 * Extends the DOM's Document interface to include custom methods.
 */
interface Document {
    getElementsByAttribute: (name:string, value:string) => Element[];
    getModalsByModalType: (type:modalType|"all") => Element[];
    getNodesByType: (typeValue:number | string) => Node[];
    getElementsByText: (textValue:string, caseSensitive?:boolean) => Element[];
}

/**
 * Extends the DOM's Element interface to include custom methods.
 */
interface Element {
    getAncestor: (identifier:string, selector:selector) => Element;
    getElementsByAttribute: (name:string, value:string) => Element[];
    getNodesByType: (typeValue:number | string) => Node[];
    getElementsByText: (textValue:string, caseSensitive?:boolean) => Element[];
}

interface module_agentHash {
    receive: (socketData:socketData) => void;
    send: (nameDevice:HTMLInputElement, nameUser:HTMLInputElement) => void;
}

/**
 * Manages agent data in the browser.
 * * **addAgent** - Adds an agent into the browser user interface whether the agent is new or the page is loading.
 * * **deleteAgent** - Removes an agent from the browser user interface.
 * * **deleteShare** - Removes a share from a device of the local user.
 * * **receive** - Receives agent data from the terminal for processing in the browser.
 * ```typescript
 *
 * interface module_agentManagement {
 *     addAgent: (input:addAgent) => void;
 *     deleteAgent: (agent:string, agentType:agentType) => void;
 *     deleteShare: (event:MouseEvent) => void;
 *     receive: (socketData:socketData) => void;
 * }
 * ``` */
interface module_agentManagement {
    addAgent: (input:addAgent) => void;
    deleteAgent: (agent:string, agentType:agentType) => void;
    deleteShare: (event:MouseEvent) => void;
    receive: (socketData:socketData) => void;
}

/**
 * Manages local agent activity status from the browser.
 * * **active** - Converts local agent status to "active".
 * * **idle** - Converts local agent status to "idle".
 * * **receive** - Receives status data from remote agents.
 * * **start** - Initiates local agent status timer on page load.
 * ```typescript
 * interface module_agentStatus {
 *     active: (event:KeyboardEvent|MouseEvent) => void;
 *     idle: () => void;
 *     receive: (socketData:socketData) => void;
 *     start: () => void;
 * }
 * ``` */
interface module_agentStatus {
    active: (event:KeyboardEvent|MouseEvent) => void;
    idle: () => void;
    receive: (socketData:socketData) => void;
    start: () => void;
}

/**
 * Provides globally available utilities, such as string formatting tools.
 * * **agents** - Provides a means to loop through agent types, agents, and shares against a supplied function.
 * * **capitalize** - Converts the first character of a string to a capital letter if that first character is a lowercase letter.
 * * **commas** - Converts a number into a string with commas separating character triplets from the right.
 * * **dateFormat** - Converts a date object into US Army date format.
 * * **prettyBytes** - Converts a number into an abbreviated exponent of 2 describing storage size, example: 2134321 => 2.0MB.
 * * **selfShares** - Converts the list of shares from all devices into a single package for distribution to external users.
 * * **time** - Produce a formatted time string from a date object.
 *
 * ```typescript
 * interface module_common {
 *     agents: (config:agentsConfiguration) => void;
 *     capitalize: (input:string) => string;
 *     commas: (input:number) => string;
 *     dateFormat: (date:Date) => string;
 *     prettyBytes: (input:number) => string;
 *     selfShares: (devices:agents) => agentShares;
 *     time: (date:Date) => string;
 * }
 * ``` */
interface module_common {
    agents: (config:config_agentIdentity) => void;
    capitalize: (input:string) => string;
    commas: (input:number) => string;
    dateFormat: (date:Date) => string;
    prettyBytes: (input:number) => string;
    selfShares: (devices:agents) => agentShares;
    time: (date:Date) => string;
}

/**
 * Methods for generating the configuration modal and its interactions.
 * * **colorDefaults** - An object associating color information to color scheme names.
 * * **content** - Generates the configuration modal content to populate into the configuration modal.
 * * **events.agentColor** - Specify custom agent color configurations.
 * * **events.audio** - Assign changes to the audio option to settings.
 * * **events.colorScheme** - Changes the color scheme of the page by user interaction.
 * * **events.configurationText** - Processes settings changes from either text input or select lists.
 * * **events.detailsToggle** - Shows and hides text explaining compression.
 * * **events.modal** - Generates the configuration modal and fills it with content.
 * * **tools.addUserColor** - Add agent color options to the configuration modal content.
 * * **tools.applyAgentColors** - Update the specified color information against the default colors of the current color scheme.
 * * **tools.radio** - Sets a class on a grandparent element to apply style changes to the corresponding label.
 * * **tools.styleText** - Generates the CSS code for an agent specific style change and populates it into an HTML style tag.
 *
 * ```typescript
 * interface module_configuration {
 *     colorDefaults: colorList;
 *     content: () => Element;
 *     events: {
 *         agentColor: (event:Event) => void;
 *         audio: (event:MouseEvent) => void;
 *         colorScheme: (event:MouseEvent) => void;
 *         configurationText: (event:Event) => void;
 *         detailsToggle: (event:MouseEvent) => void;
 *         modal: (event:MouseEvent) => void;
 *     };
 *     tools: {
 *         addUserColor: (agent:string, type:agentType, configurationBody:Element) => void;
 *         applyAgentColors: (agent:string, type:agentType, colors:[string, string]) => void;
 *         radio: (element:Element) => void;
 *         styleText: (input:styleText) => void;
 *     };
 * }
 * ``` */
interface module_configuration {
    colorDefaults: colorList;
    content: () => Element;
    events: {
        agentColor: (event:Event) => void;
        audio: (event:MouseEvent) => void;
        colorScheme: (event:MouseEvent) => void;
        configurationText: (event:Event) => void;
        detailsToggle: (event:MouseEvent) => void;
    };
    tools: {
        addUserColor: (agent:string, type:agentType, configurationBody:Element) => void;
        applyAgentColors: (agent:string, type:agentType, colors:[string, string]) => void;
        radio: (element:Element) => void;
        styleText: (input:styleText) => void;
    };
}

/**
 * Creates and populates the right click context menu for the file navigate modal types.
 * * **content** - Creates the HTML content of the context menu.
 * * **element** - Stores a reference to the element.target associated with a given menu item.
 * * **events.copy** - Handler for the *Copy* menu button, which stores file system address information in the application's clipboard.
 * * **events.dataString** - Handler for the *Base64*, *Edit*, and *Hash* menu buttons.
 * * **events.destroy** - Handler for the *Destroy* menu button, which is responsible for deleting file system artifacts.
 * * **events.details** - Handler for the *Details* menu button, which will generate a details modal.
 * * **events.fsNew** - Handler for the *New Directory* and *New File* menu buttons.
 * * **events.menu** - Generates the context menu which populates with different menu items depending upon event.target of the right click.
 * * **events.paste** - Handler for the *Paste* menu item which performs the file copy operation over the network.
 * * **type** - Stores a context action type for awareness to the context action event handler.
 *
 * ```typescript
 * interface module_context {
 *     content:(event:MouseEvent) => Element;
 *     element: Element;
 *     events: {
 *         copy: (event:Event) => void;
 *         dataString: (event:Event) => void;
 *         destroy: (event:Event) => void;
 *         details: (Event:Event) => void;
 *         fsNew: (event:Event) => void;
 *         menu: (event:MouseEvent) => void;
 *         paste: (event:Event) => void;
 *     };
 *     type: contextType;
 * }
 * type contextType = "" | "Base64" | "copy" | "cut" | "directory" | "Edit" | "file" | "Hash";
 * ``` */
interface module_context {
    content:(event:MouseEvent) => Element;
    element: Element;
    events: {
        copy: (event:Event) => void;
        dataString: (event:Event) => void;
        destroy: (event:Event) => void;
        details: (Event:Event) => void;
        fsNew: (event:Event) => void;
        menu: (event:MouseEvent) => void;
        paste: (event:Event) => void;
    };
    type: contextType;
}

/**
 * Generates the user experience associated with file system interaction.
 * * **content.dataString** - Populate content into modals for string output operations, such as: Base64, Hash, File Read.
 * * **content.details** - Generates the contents of a details type modal.
 * * **content.list** - Generates the contents of a file system list for population into a file navigate modal.
 * * **content.status** - Translates messaging into file system lists for the appropriate modals.
 * * **dragFlag** - Allows the drag handler to identify whether the shift or control/command keys are pressed while selecting items from the file list.
 * * **events.back** - Handler for the back button, which steps back to the prior file system location of the given agent stored in the modal's navigation history.
 * * **events.directory** - Handler for navigation into a directory by means of double click.
 * * **events.drag** - Move file system artifacts from one location to another by means of double click.
 * * **events.execute** - Allows operating system execution of a file by double click interaction.
 * * **events.expand** - Opens a directory into a child list without changing the location of the current modal.
 * * **events.keyExecute** - Allows file execution by keyboard control, such as pressing the *Enter* key.
 * * **events.lisFocus** - When clicking on a file list give focus to an input field in that list so that the list can receive focus.
 * * **events.parent** - Handler to navigate into the parent directory by click the parent navigate button.
 * * **events.rename** - Converts a file system item text into a text input field so that the artifact can be renamed.
 * * **events.saveFile** - A handler for an interaction that allows writing file changes to the file system.
 * * **events.search** - Sends a search query in order to receive a filtered list of file system artifacts.
 * * **events.searchFocus** - Provides an interaction that enlarges and reduces the width of the search field.
 * * **events.select** - Select a file system item for interaction by click.
 * * **events.text** - Allows changing file system location by changing the text address of the current location.
 * * **tools.listFail** - Display status information when the Operating system locks files from access.
 * * **tools.listItem** - Generates the HTML content for a single file system artifacts that populates a file system list.
 * * **tools.modalAddress** - Updates the file system address of the current file navigate modal in response to navigating to different locations.
 *
 * ```typescript
 * interface module_fileBrowser {
 *     content: {
 *         details: (socketData:socketData) => void;
 *         list: (location:string, dirs:directoryResponse, message:string) => Element;
 *         status: (socketData:socketData) => void;
 *     };
 *     dragFlag: dragFlag;
 *     events: {
 *         back: (event:Event) => void;
 *         directory: (event:Event) => void;
 *         drag: (event:MouseEvent|TouchEvent) => void;
 *         execute: (event:Event) => void;
 *         expand: (event:Event) => void;
 *         keyExecute: (event:KeyboardEvent) => void;
 *         listFocus: (event:Event) => void;
 *         parent: (event:Event) => void;
 *         rename: (event:Event) => void;
 *         saveFile: (event:Event) => void;
 *         search: (event?:Event, searchElement?:HTMLInputElement, callback?:eventCallback) => void;
 *         searchFocus: (event:Event) => void;
 *         select: (event:Event) => void;
 *         text: (event:Event) => void;
 *     };
 *     tools: {
 *         listFail: (count:number, box: Element) => void;
 *         listItem: (item:directoryItem, extraClass:string) => Element;
 *         modalAddress: (config:config_modalHistory) => void;
 *     };
 * }
 * type eventCallback = (event:Event, callback:(event:MouseEvent, dragBox:Element) => void) => void;
 * type dragFlag = "" | "control" | "shift";
 * ``` */
interface module_fileBrowser {
    content: {
        dataString: (socketData:socketData) => void;
        details: (socketData:socketData) => void;
        list: (location:string, dirs:directoryResponse, message:string) => Element;
        status: (socketData:socketData) => void;
    };
    dragFlag: dragFlag;
    events: {
        back: (event:Event) => void;
        directory: (event:Event) => void;
        drag: (event:MouseEvent|TouchEvent) => void;
        execute: (event:Event) => void;
        expand: (event:Event) => void;
        keyExecute: (event:KeyboardEvent) => void;
        listFocus: (event:Event) => void;
        parent: (event:Event) => void;
        rename: (event:Event) => void;
        saveFile: (event:Event) => void;
        search: (event?:Event, searchElement?:HTMLInputElement, callback?:eventCallback) => void;
        searchFocus: (event:Event) => void;
        select: (event:Event) => void;
        text: (event:Event) => void;
    };
    tools: {
        listFail: (count:number, box: Element) => void;
        listItem: (item:directoryItem, extraClass:string) => Element;
        modalAddress: (config:config_modalHistory) => void;
    };
}

/**
 * Provides a common location to store events associated with the application at large opposed to content or utility specific events.
 * * **contextMenuRemove** - Removes a context menu if one is visible.
 * * **fullscreen** - An event handler that launches the browser into fullscreen mode.
 * * **fullscreenChange** - An event handler that executes when the browser moves in or out of fullscreen mode.
 * * **menu** - Displays the primary modal in the top left corner of the application.
 * * **menuBlue** - Destroys the menu, if present.
 * * **minimizeAll** - Forcefully minimizes all modals to the tray at the bottom of the application.
 * * **minimizeAllFlag** - A flag that halts state saving until all modals are minimized.
 * * **modal.configuration** - Displays a configuration modal from the main menu.
 * * **modal.deleteList** - Displays a Delete Agent modal from the main menu.
 * * **modal.export** - Displays an Import/Export modal from the main menu.
 * * **modal.fileNavigate** - Displays a File Navigate modal from the main menu.
 * * **modal.invite** - Displays an Invitation modal from the main menu.
 * * **modal.textPad** - Displays a TextPad modal from the main menu.
 * * **shareAll** - Displays a Share modal associated with multiple agents.
 *
 * ```typescript
 * interface module_globalEvents {
 *     contextMenuRemove: () => void;
 *     fullscreen: (event:Event) => void;
 *     fullscreenChange: (event:Event) => void;
 *     menu: (event:Event) => void;
 *     menuBlur: (event:Event) => void;
 *     minimizeAll: (event:Event) => void;
 *     minimizeAllFlag: boolean;
 *     modal: {
 *         configuration: (event:MouseEvent) => void;
 *         deleteList: (event:MouseEvent, configuration?:config_modal) => void;
 *         export: (event:MouseEvent) => void;
 *         fileNavigate: (Event:Event, config?: navConfig) => void;
 *         invite: (event:Event, settings?:config_modal) => void;
 *         textPad: (event:Event, config?:config_modal) => Element;
 *     };
 *     shareAll: (event:MouseEvent) => void;
 * }
 * ``` */
interface module_globalEvents {
    contextMenuRemove: () => void;
    fullscreen: (event:Event) => void;
    fullscreenChange: (event:Event) => void;
    menu: (event:Event) => void;
    menuBlur: (event:Event) => void;
    minimizeAll: (event:Event) => void;
    minimizeAllFlag: boolean;
    modal: {
        configuration: (event:MouseEvent) => void;
        deleteList: (event:MouseEvent, configuration?:config_modal) => void;
        export: (event:MouseEvent) => void;
        fileNavigate: (Event:Event, config?: config_fileNavigate) => void;
        invite: (event:Event, settings?:config_modal) => void;
        textPad: (event:Event, config?:config_modal) => Element;
    };
    shareAll: (event:MouseEvent) => void;
}

/**
 * Provides invite modal content, invite messaging handling, and all associated interactions.
 * * **content.remote** - Prepares content for the recipient agent of an invitation.
 * * **content.start** - Starts the invitation process by creating an *invite* modal and populating it with content.
 * * **events.decline** - The event handler for when a remote user declines an invitation request.
 * * **events.portValidation** - A form validation control to assert input is formatted like an IP address.
 * * **events.request** - Issues an invitation request to the network.
 * * **events.typeToggle** - Toggles informational text when the user clicks on an agent type radio button.
 * * **tools.accept** - The event handler for when a remote user accepts an invitation request.
 * * **tools.complete** - Provides messaging at the final stage of the invitation process.
 * * **tools.receive** - Receives an invitation request at the remote agent.
 * * **tools.transmissionReceipt** - Routes invitation message traffic from the network to the appropriate method.
 *
 * ```typescript
 * interface module_invite {
 *     content: {
 *         remote: (invitation:service_invite, name:string) => Element;
 *         start: (settings?:config_modal) => Element;
 *     };
 *     events: {
 *         decline: (event:MouseEvent) => void;
 *         portValidation: (event:KeyboardEvent) => void;
 *         request: (event:Event, options:config_modal) => void;
 *         typeToggle: (event:Event) => void;
 *     },
 *     tools: {
 *         accept: (box:Element) => void;
 *         complete: (invitation:service_invite) => void;
 *         receive: (invitation:service_invite) => void;
 *         transmissionReceipt: (socketData:socketData) => void;
 *     }
 * }
 * ``` */
interface module_invite {
    content: {
        remote: (invitation:service_invite, name:string) => Element;
        start: (settings?:config_modal) => Element;
    };
    events: {
        decline: (event:MouseEvent) => void;
        portValidation: (event:KeyboardEvent) => void;
        request: (event:Event, options:config_modal) => void;
        typeToggle: (event:Event) => void;
    };
    tools: {
        accept: (box:Element) => void;
        complete: (invitation:service_invite) => void;
        receive: (invitation:service_invite) => void;
        transmissionReceipt: (socketData:socketData) => void;
    };
}

/**
 * Provides audio/video access from browser APIs and all associated interactions.
 * * **content** - Creates an audio or video HTML element to populate into a media modal.
 * * **events.selfDrag** - Allows dragging a thumbnail of local webcam video from one corner of a video modal to another.
 * * **events.videoButton** - Creates a button where a user may initiate a video call with another agent.
 * * **tools.kill** - Destroys a media stream to the local hardware and closes the corresponding modal.
 * * **tools.modal** - Creates a media modal populated with content from method *media.element*.
 *
 * ```typescript
 * interface module_media {
 *     content: (mediaType:mediaType, height:number, width:number) => Element;
 *     events: {
 *         selfDrag: (event:Event) => void;
 *         videoButton: (event:Event) => void;
 *     };
 *     tools: {
 *         kill: (modal:config_modal) => void;
 *         modal: (mediaConfig:config_mediaModal) => Element;
 *     };
 * }
 * type mediaType = "audio" | "video";
 * ``` */
interface module_media {
    content: (mediaType:mediaType, height:number, width:number) => Element;
    events: {
        selfDrag: (event:Event) => void;
        videoButton: (event:Event) => void;
    };
    tools: {
        kill: (modal:config_modal) => void;
        modal: (mediaConfig:config_mediaModal) => Element;
    };
}

/**
 * Generates text message modals and all associated interactions.
 * * **content.modal** - Generates a message modal.
 * * **content.footer** - Called from modal.create to supply the footer area modal content.
 * * **events.keySubmit** - Submits a text message on key press, such as pressing the 'Enter' key.
 * * **events.modalToggle** - Toggles between code type input and text type input.
 * * **events.shareButton** - Creates a message button for the *share* modals.
 * * **events.submit** - Submit event handler to take message text into a data object for transmission across a network.
 * * **tools.populate** - Populate stored messages into message modals.
 * * **tools.post** - Visually display the submitted and received messages as modal content.
 * * **tools.receive** - Receives message updates from the network.
 *
 * ```typescript
 * interface module_message {
 *     content: {
 *         footer: (mode:messageMode, value:string) => Element;
 *         modal: (configuration:config_modal, agentType:agentType, agentName:string) => Element;
 *     };
 *     events: {
 *         keySubmit: (event:Event) => void;
 *         modeToggle: (event:Event) => void;
 *         shareButton: (event:Event) => void;
 *         submit: (event:Event) => void;
 *     };
 *     tools: {
 *         populate:(modalId:string) => void;
 *         post: (item:messageItem, target:messageTarget, modalId:string) => void;
 *         receive: (socketData:socketData) => void;
 *     };
 * }
 * type messageMode = "code" | "text";
 * type messageTarget = "agentFrom" | "agentTo";
 * ``` */
interface module_message {
    content: {
        footer: (mode:messageMode, value:string) => Element;
        modal: (configuration:config_modal, agentType:agentType, agentName:string) => Element;
    };
    events: {
        keySubmit: (event:Event) => void;
        modeToggle: (event:Event) => void;
        shareButton: (event:Event) => void;
        submit: (event:Event) => void;
    };
    tools: {
        populate:(modalId:string) => void;
        post: (item:messageItem, target:messageTarget, modalId:string) => void;
        receive: (socketData:socketData) => void;
    };
}

/**
 * Provides generic modal specific interactions such as resize, move, generic modal buttons, and so forth.
 * * **content** - Creates a new modal.
 * * **events.close** - Closes a modal by removing it from the DOM, removing it from state, and killing any associated media.
 * * **events.closeEnduring** - Modal types that are enduring are hidden, not destroyed, when closed.
 * * **events.confirm** - Handling for an optional confirmation button.
 * * **events.export** - Creates an import/export modal.
 * * **events.footerResize** - If a resizable textarea element is present in the modal outside the body this ensures the body is the correct size.
 * * **events.importSettings** - Handler for import/export modals that modify saved settings from an imported JSON string then reloads the page.
 * * **events.maximize** - Maximizes a modal to fill the view port.
 * * **events.minimize** - Minimizes a modal to the tray at the bottom of the page.
 * * **events.move** - Allows dragging a modal around the screen.
 * * **events.resize** - Resizes a modal respective to the event target, which could be any of 4 corners or 4 sides.
 * * **events.textPad** - Creates a text pad modal, which is just a modal wrapping a large text area for free typing.
 * * **events.textSave** - Handler to push the text content of a textPad modal into settings so that it is saved.
 * * **events.textTimer** - A timing event so that contents of a textPad modal are automatically save after a brief duration of focus blur.
 * * **events.unMinimize** - Restores a minimized modal to its prior size and location.
 * * **events.zTop** - Processes visual overlapping or depth of modals.
 * * **tools.forceMinimize** - Modals that do not have a minimize button still need to conform to minimize from other interactions.
 *
 * ```typescript
 * interface module_modal {
 *     content: (options:config_modal) => Element;
 *     events: {
 *         close: (event:MouseEvent) => void;
 *         closeEnduring: (event:MouseEvent) => void;
 *         confirm: (event:MouseEvent) => void;
 *         footerResize: (event:MouseEvent) => void;
 *         importSettings: (event:MouseEvent) => void;
 *         maximize: (event:Event, callback?:() => void) => void;
 *         minimize: (event:Event, callback?:() => void) => void;
 *         move: (event:Event) => void;
 *         resize: (event:MouseEvent|TouchEvent) => void;
 *         textSave: (event:Event) => void;
 *         textTimer: (event:KeyboardEvent) => void;
 *         unMinimize: (event:MouseEvent) => void;
 *         zTop: (event:KeyboardEvent|MouseEvent, elementInput?:Element) => void;
 *     };
 *     tools: {
 *         forceMinimize: (id:string) => void;
 *     };
 * }
 * ``` */
interface module_modal {
    content: (options:config_modal) => Element;
    events: {
        close: (event:MouseEvent) => void;
        closeEnduring: (event:MouseEvent) => void;
        confirm: (event:MouseEvent) => void;
        footerResize: (event:MouseEvent) => void;
        importSettings: (event:MouseEvent) => void;
        maximize: (event:Event, callback?:() => void) => void;
        minimize: (event:Event, callback?:() => void) => void;
        move: (event:Event) => void;
        resize: (event:MouseEvent|TouchEvent) => void;
        textSave: (event:Event) => void;
        textTimer: (event:KeyboardEvent) => void;
        unMinimize: (event:MouseEvent) => void;
        zTop: (event:KeyboardEvent|MouseEvent, elementInput?:Element) => void;
    };
    tools: {
        forceMinimize: (id:string) => void;
    };
}

/**
 * Builds HTTP request bodies for transfer to the terminal.
 * * **configuration** - A convenience method for setting state changes to a file.
 * * **http** - Prepares XHR and manages response text.
 * * **receive** - Receives data from the network.
 * * **send** - Provides a means for allowing arbitrary HTTP requests.
 *
 * ```typescript
 * interface module_network {
 *     configuration: () => void;
 *     http: (socketData:socketData) => void;
 *     receive: (dataString:string) => void;
 *     send:(data:socketDataType, service:requestType) => void;
 * }
 * type requestType = "agent-hash" | "agent-management" | "agent-online" | "agent-resolve" | "agent-status" | "copy-file-request" | "copy-file" | "copy" | "error" | "file-system-status" | "file-system-details" | "file-system" | "GET" | "hash-share" | "invite" | "log" | "message" | "response-no-action" | "settings" | "string-generate" | "test-browser";
 * type socketDataType = Buffer | service_agentHash | service_agentManagement | service_agentResolve | service_agentStatus | service_copy | service_copy_file | service_error | service_copy_fileRequest | service_fileStatus | service_fileSystem | service_fileSystemDetails | service_hashShare | service_invite | service_log | service_message | service_settings | service_stringGenerate | service_testBrowser;
 * ``` */
interface module_network {
    configuration: () => void;
    http: (socketData:socketData) => void;
    receive: (dataString:string) => void;
    send:(data:socketDataType, service:requestType) => void;
}

/**
 * A browser remote control interface used for browser test automation.
 * * **action** - A property holding the action property value of the current test item.
 * * **delay** - A utility to delay execution of evaluation criteria if the current test item features a delay property.
 * * **domFailure** - A flag indicating whether an event resulted in a DOM failure for reporting to the terminal.
 * * **error** - Gathers JavaScript errors from the page for reporting to the terminal as a test failure.
 * * **evaluate** - Executes the units of evaluation provided in a test item.
 * * **event** - Executes the events provided in a test item.
 * * **getProperty** - Retrieve the value of the specified DOM property or attribute.
 * * **index** - A property holding the index of the current test item.
 * * **keyAlt** - A flag indicating whether the Alt key is pressed and not released while executing further events.
 * * **KeyControl** - A flag indicating whether the Control/Command key is pressed and not released while executing further events.
 * * **keyShift** - A flag indicating whether the Shift key is pressed and not released while executing further events.
 * * **node** - Retrieves a DOM node from the page by reading instructions from the test item.
 * * **receive** - Receives test instructions from the terminal and will either close the browser or execute *remote.event*.
 * * **report** - Generates the evaluation report for sending to the terminal.
 * * **sendTest** - Sends test results to terminal.
 * * **stringify** - Converts a primitive of any type into a string for presentation.
 *
 * ```typescript
 * interface module_remote {
 *     action: testBrowserAction;
 *     delay: (config:testBrowserItem) => void;
 *     domFailure: boolean;
 *     error: (message:string, source:string, line:number, col:number, error:Error) => void;
 *     evaluate: (test:testBrowserTest) => [boolean, string, string];
 *     event: (item:service_testBrowser, pageLoad:boolean) => void;
 *     getProperty: (test:testBrowserTest) => primitive;
 *     index: number;
 *     keyAlt: boolean;
 *     keyControl: boolean;
 *     keyShift: boolean;
 *     node: (dom:testBrowserDOM, property:string) => Element;
 *     receive: (socketData:socketData) => void;
 *     report: (test:testBrowserTest[], index:number) => void;
 *     sendTest: (payload:[boolean, string, string][], index:number, task:testBrowserAction) => void;
 *     stringify: (primitive:primitive) => string;
 * }
 * type primitive = boolean | number | string | null | undefined;
 * type testBrowserAction = "close" | "nothing" | "request" | "reset-browser" | "reset-complete" | "reset-request" | "reset-response" | "respond" | "result";
 * ``` */
interface module_remote {
    action: testBrowserAction;
    delay: (config:testBrowserItem) => void;
    domFailure: boolean;
    error: (message:string, source:string, line:number, col:number, error:Error) => void;
    evaluate: (test:testBrowserTest) => [boolean, string, string];
    event: (item:service_testBrowser, pageLoad:boolean) => void;
    getProperty: (test:testBrowserTest) => primitive;
    index: number;
    keyAlt: boolean;
    keyControl: boolean;
    keyShift: boolean;
    node: (dom:testBrowserDOM, property:string) => Element;
    receive: (socketData:socketData) => void;
    report: (test:testBrowserTest[], index:number) => void;
    sendTest: (payload:[boolean, string, string][], index:number, task:testBrowserAction) => void;
    stringify: (primitive:primitive) => string;
}

/**
 * Populates the various agent modals, device details, and share data lists.
 * * **content** - Generates the content of the share modal.
 * * **events.context** - Handler for the File Navigate context menu item *Add a Share*.
 * * **events.deleteList** - Creates a confirmation modal listing users for deletion.
 * * **events.deleteToggle** -  Changes visual state of items in the shares delete list as they are checked or unchecked.
 * * **events.readOnly** - Toggle a share between read only and full access.
 * * **tools.deleteAgentList** - Process termination of one or more agents from a *share_delete* modal.
 * * **tools.deleteListContent** - Creates the HTML content of the share_delete type modal.
 * * **tools.modal** - Creates a share modal displaying device details, shares, and available features.
 * * **tools.update** - Updates the content of device shares in response to messaging from the network and local user interaction.
 *
 * ```typescript
 * interface module_share {
 *     content: (agent:string, agentType:agentType|"") => Element;
 *     events: {
 *         context: (event:Event) => void;
 *         deleteList: (event:MouseEvent, configuration?:config_modal) => void;
 *         deleteToggle: (event:MouseEvent) => void;
 *         readOnly: (event:MouseEvent) => void;
 *     }
 *     tools: {
 *         deleteAgentList: (box:Element) => void;
 *         deleteListContent: () => Element;
 *         hash: (socketData) => void;
 *         modal: (agent:string, agentType:agentType|"", configuration:config_modal) => void;
 *         update: (exclusion:string) => void;
 *     }
 * }
 * ``` */
interface module_share {
    content: (agent:string, agentType:agentType|"") => Element;
    events: {
        context: (event:Event) => void;
        deleteToggle: (event:MouseEvent) => void;
        readOnly: (event:MouseEvent) => void;
    };
    tools: {
        deleteAgentList: (box:Element) => void;
        deleteListContent: () => Element;
        hash: (socketData:socketData) => void;
        modal: (agent:string, agentType:agentType|"", configuration:config_modal) => void;
        update: (exclusion:string) => void;
    };
}

/**
 * A list of common tools that only apply to the browser side of the application.
 * * **audio** - Plays audio in the browser.
 * * **delay** - Create a div element with a spinner and class name of 'delay'.
 * * **dragBox** - Draw a selection box to capture a collection of items into a selection.
 * * **dragList** - Selects list items in response to drawing a drag box.
 * * **fileAgent** - Produces fileAgent objects for service_fileSystem and service_copy.
 * * **fileStatus** - A utility to format and describe status bar messaging in a file navigator modal.
 * * **fixHeight** - Resizes the interactive area to fit the browser viewport.
 * * **formKeys** - Provides form execution on key down of 'Enter' key to input fields not in a form.
 * * **getAgent** - Get the agent of a given modal.
 * * **keys** - Executes shortcut key combinations.
 * * **name** - Get a lowercase node name for a given element.
 * * **sanitizeHTML** - Make a string safe to inject via innerHTML.
 * * **screenPosition** -  Gathers the view port position of an element.
 * * **selectedAddresses** - Gather the selected addresses and types of file system artifacts in a fileNavigator modal.
 * * **selectNode** - Remove selections of file system artifacts in a given fileNavigator modal.
 *
 * ```typescript
 * interface module_util {
 *     audio: (name:string) => void;
 *     delay: () => Element;
 *     dragBox: eventCallback;
 *     dragList: (event:MouseEvent, dragBox:Element) => void;
 *     fileAgent: (element:Element, copyElement:Element, address?:string) => [fileAgent, fileAgent, fileAgent];
 *     fixHeight: () => void;
 *     formKeys: (event:KeyboardEvent, submit:() => void) => void;
 *     getAgent: (element:Element) => agency;
 *     keys: (event:KeyboardEvent) => void;
 *     name: (item:Element) => string;
 *     sanitizeHTML: (input:string) => string;
 *     screenPosition: (node:Element) => DOMRect;
 *     selectedAddresses: (element:Element, type:string) => [string, fileType, string][];
 *     selectNone:(element:Element) => void;
 * }
 * type agency = [string, boolean, agentType];
 * type eventCallback = (event:Event, callback:(event:MouseEvent, dragBox:Element) => void) => void;
 * type fileType = "directory" | "file" | "link";
 * ``` */
interface module_util {
    audio: (name:string) => void;
    delay: () => Element;
    dragBox: eventCallback;
    dragList: (event:MouseEvent, dragBox:Element) => void;
    fileAgent: (element:Element, copyElement:Element, address?:string) => [fileAgent, fileAgent, fileAgent];
    fixHeight: () => void;
    formKeys: (event:KeyboardEvent, submit:() => void) => void;
    getAgent: (element:Element) => agency;
    keys: (event:KeyboardEvent) => void;
    name: (item:Element) => string;
    sanitizeHTML: (input:string) => string;
    screenPosition: (node:Element) => DOMRect;
    selectedAddresses: (element:Element, type:string) => [string, fileType, string][];
    selectNone:(element:Element) => void;
}