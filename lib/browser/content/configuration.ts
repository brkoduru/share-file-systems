
/* lib/browser/content/configuration - A collection of utilities and event handlers associated with processing the application state and system configuration. */

import browser from "../browser.js";
import common from "../../common/common.js";
import network from "../utilities/network.js";
import util from "../utilities/util.js";

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
const configuration:module_configuration = {

    /* Default color definitions for the various supported color schemes */
    colorDefaults: {
        "dark": ["222", "333"],
        "default": ["fff", "eee"]
    },

    content: function browser_content_configuration_content():Element {
        const configurationBody:Element = document.createElement("div"),
            random:string = Math.random().toString(),
            createSection = function browser_content_configuration_content_createSection(title:string):Element {
                const container:Element = document.createElement("div"),
                    h3:Element = document.createElement("h3");
                container.setAttribute("class", "section");
                h3.innerHTML = title;
                container.appendChild(h3);
                return container;
            },
            perAgentType = function browser_content_configuration_content_perAgentType(agentType:agentType):void {
                const ul:Element = document.createElement("ul");
                section = createSection(`◩ ${common.capitalize(agentType)} Color Definitions`);
                p = document.createElement("p");
                p.innerHTML = "Accepted format is 3 or 6 digit hexadecimal (0-f)";
                section.appendChild(p);
                ul.setAttribute("class", `${agentType}-color-list`);
                section.appendChild(ul);
                configurationBody.appendChild(section);
            };
        let section:Element,
            p:HTMLElement = document.createElement("p"),
            select:HTMLElement,
            option:HTMLOptionElement,
            label:Element = document.createElement("label"),
            input:HTMLInputElement = document.createElement("input"),
            button:HTMLElement = document.createElement("button"),
            text:Text = document.createTextNode("Compression level. Accepted values are 0 - 11");
        configurationBody.setAttribute("class", "configuration");

        // brotli compression
        section = createSection("🗜 Brotli Compression Level");
        input.type = "text";
        input.value = browser.data.brotli.toString();
        input.name = "brotli";
        input.onkeyup = configuration.events.configurationText;
        input.onblur = configuration.events.configurationText;
        label.appendChild(input);
        label.appendChild(text);
        p.appendChild(label);
        section.appendChild(p);
        button.onclick = configuration.events.detailsToggle;
        button.innerHTML = "More information ⇣";
        section.appendChild(button);
        p = document.createElement("p");
        p.innerHTML = "In this application compression is applied to file system artifacts traveling from one device to another across a network. There is substantial CPU overhead in decompressing files. The ideal case for applying compression is extremely large files that take longer to transfer than the decompress. It is advised to disable compression if on a very fast local network or transferring many small files. Compression can be disabled by setting the value to 0.";
        p.setAttribute("class", "configuration-details");
        p.style.display = "none";
        section.appendChild(p);
        configurationBody.appendChild(section);

        // storage location
        section = createSection("⍒ Remote Execution Storage Location");
        p = document.createElement("p");
        input = document.createElement("input");
        label = document.createElement("label");
        text = document.createTextNode("File storage location");
        button = document.createElement("button");
        input.type = "text";
        input.value = browser.data.storage;
        input.name = "storage";
        input.onkeyup = configuration.events.configurationText;
        input.onblur = configuration.events.configurationText;
        label.appendChild(input);
        label.appendChild(text);
        p.appendChild(label);
        section.appendChild(p);
        p = document.createElement("p");
        button.onclick = configuration.events.detailsToggle;
        button.innerHTML = "More information ⇣";
        section.appendChild(button);
        p = document.createElement("p");
        p.innerHTML = "When attempting to execute a file stored on a remote device/user that file must first be copied to the local device.  This setting determines the location where such filed will be written.";
        p.setAttribute("class", "configuration-details");
        p.style.display = "none";
        section.appendChild(p);

        configurationBody.appendChild(section);

        // hash algorithm
        section = createSection("⌗ Hash Algorithm");
        input = document.createElement("input");
        label = document.createElement("label");
        text = document.createTextNode("Hash Algorithm");
        select = document.createElement("select");
        p = document.createElement("p");
        {
            const hashes:hash[] = ["blake2d512", "blake2s256", "sha3-224", "sha3-256", "sha3-384", "sha3-512", "sha512-224", "sha512-256", "shake128", "shake256"],
                length:number = hashes.length;
            let a:number = 0;
            do {
                option = document.createElement("option");
                option.innerHTML = hashes[a];
                if (browser.data.hashType === hashes[a]) {
                    option.selected = true;
                }
                select.appendChild(option);
                a = a + 1;
            } while (a < length);
        }
        select.onchange = configuration.events.configurationText;
        label.appendChild(select);
        label.appendChild(text);
        p.appendChild(label);
        section.appendChild(p);
        configurationBody.appendChild(section);

        // audio
        section  = createSection("🔊 Allow Audio");
        p = document.createElement("p");
        label = document.createElement("label");
        input = document.createElement("input");
        label.setAttribute("class", "radio");
        input.type = "radio";
        input.name = `audio-${random}`;
        input.value = "on";
        input.checked = true;
        input.onclick = configuration.events.audio;
        text = document.createTextNode("On");
        label.appendChild(text);
        label.appendChild(input);
        p.appendChild(label);
        label = document.createElement("label");
        input = document.createElement("input");
        label.setAttribute("class", "radio");
        input.type = "radio";
        input.name = `audio-${random}`;
        input.value = "off";
        input.onclick = configuration.events.audio;
        text = document.createTextNode("Off");
        label.appendChild(text);
        label.appendChild(input);
        p.appendChild(label);
        section.appendChild(p);
        configurationBody.appendChild(section);

        // color scheme
        section = createSection("▣ Color Theme");
        p = document.createElement("p");
        label = document.createElement("label");
        input = document.createElement("input");
        label.setAttribute("class", "radio");
        input.type = "radio";
        input.checked = true;
        input.name = `color-scheme-${random}`;
        input.value = "default";
        input.onclick = configuration.events.colorScheme;
        label.innerHTML = "Default";
        label.appendChild(input);
        p.appendChild(label);
        label = document.createElement("label");
        input = document.createElement("input");
        label.setAttribute("class", "radio");
        input.type = "radio";
        input.name = `color-scheme-${random}`;
        input.value = "dark";
        input.onclick = configuration.events.colorScheme;
        label.innerHTML ="Dark";
        label.appendChild(input);
        p.appendChild(label);
        section.appendChild(p);
        configurationBody.appendChild(section);

        perAgentType("device");
        perAgentType("user");
        common.agents({
            countBy: "agent",
            perAgent: function browser_content_configuration_content_perAgent(agentNames:agentNames):void {
                configuration.tools.addUserColor(agentNames.agent, agentNames.agentType, configurationBody);
            },
            source: browser
        });
        return configurationBody;
    },

    events: {

        /* specify custom agent color configuration */
        agentColor: function browser_content_configuration_agentColor(event:Event):void {
            const element:HTMLInputElement = event.target as HTMLInputElement,
                keyboard:KeyboardEvent = event as KeyboardEvent,
                colorTest:RegExp = (/^(([0-9a-fA-F]{3})|([0-9a-fA-F]{6}))$/),
                color:string = `${element.value.replace(/\s+/g, "").replace("#", "")}`,
                parent:Element = element.parentNode as Element;
            if (colorTest.test(color) === true) {
                if (event.type === "blur" || (event.type === "keyup" && keyboard.key === "Enter")) {
                    const item:Element = parent.parentNode as Element,
                        ancestor:Element = element.getAncestor("ul", "tag"),
                        type:agentType = ancestor.getAttribute("class").split("-")[0] as agentType,
                        agent:string = item.getAttribute("data-agent"),
                        swatch:HTMLElement = parent.getElementsByClassName("swatch")[0] as HTMLElement;
                    element.value = color;
                    if (parent.innerHTML.indexOf("Body") > 0) {
                        configuration.tools.applyAgentColors(agent, type, [color, browser.data.colors[type][agent][1]]);
                    } else {
                        configuration.tools.applyAgentColors(agent, type, [browser.data.colors[type][agent][0], color]);
                    }
                    swatch.style.background = `#${color}`;
                    network.configuration();
                } else if (event.type === "keyup") {
                    const span:HTMLElement = parent.getElementsByTagName("span")[0];
                    span.style.background = color;
                }
            }
        },

        /* Enable or disable audio from the configuration menu */
        audio: function browser_content_configuration_audio(event:MouseEvent):void {
            const element:HTMLInputElement = event.target as HTMLInputElement;
            if (element.value === "on") {
                browser.data.audio = true;
            } else {
                browser.data.audio = false;
            }
            configuration.tools.radio(element);
            if (browser.loading === false) {
                network.configuration();
            }
        },

        /* Change the color scheme */
        colorScheme: function browser_content_configuration_colorScheme(event:MouseEvent):void {
            const element:HTMLInputElement = event.target as HTMLInputElement,
                oldScheme:string = browser.data.color,
                complete = function browser_content_configuration_colorScheme_complete(counts:agentCounts):void {
                    counts.count = counts.count + 1;
                    if (counts.count === agentsTotal) {
                        browser.data.color = element.value as colorScheme;
                        if (browser.loading === false) {
                            network.configuration();
                        }
                    }
                };
            let agentColors:HTMLCollectionOf<HTMLElement>,
                agentsTotal:number = 0;
            browser.pageBody.setAttribute("class", element.value);

            common.agents({
                complete: complete,
                countBy: "agent",
                perAgent: function browser_content_configuration_colorScheme_perAgent(agentNames:agentNames, counts:agentCounts):void {
                    if (agentColors === null || (agentNames.agentType === "user" && agentNames.agent === browser.data.hashUser)) {
                        complete(counts);
                        return;
                    }
                    const agent:string = agentNames.agent,
                        agentType:agentType = agentNames.agentType,
                        color:color = browser.data.colors[agentType][agent],
                        agentLength:number = agentColors.length;
                    let c:number = 0,
                        swatches:HTMLCollectionOf<Element>,
                        swatch1:HTMLElement,
                        swatch2:HTMLElement,
                        inputs:HTMLCollectionOf<HTMLInputElement>;
                    if (color[0] === configuration.colorDefaults[oldScheme][0] && color[1] === configuration.colorDefaults[oldScheme][1]) {
                        color[0] = configuration.colorDefaults[element.value][0];
                        color[1] = configuration.colorDefaults[element.value][1];
                    }
                    configuration.tools.applyAgentColors(agent, agentType, [color[0], color[1]]);
                    do {
                        if (agentColors[c].getAttribute("data-agent") === agent) {
                            swatches = agentColors[c].getElementsByClassName("swatch");
                            swatch1 = swatches[0] as HTMLElement;
                            swatch2 = swatches[1] as HTMLElement;
                            inputs = agentColors[c].getElementsByTagName("input");
                            swatch1.style.background = `#${color[0]}`;
                            swatch2.style.background = `#${color[1]}`;
                            inputs[0].value = color[0];
                            inputs[1].value = color[1];
                            break;
                        }
                        c = c + 1;
                    } while (c < agentLength);
                    complete(counts);
                },
                perAgentType: function browser_content_configuration_colorScheme_perAgent(agentNames:agentNames):void {
                    const list:Element = document.getElementsByClassName(`${agentNames.agentType}-color-list`)[0];
                    if (list === undefined) {
                        agentColors = null;
                    } else {
                        agentColors =  document.getElementsByClassName(`${agentNames.agentType}-color-list`)[0].getElementsByTagName("li");
                        agentsTotal = agentsTotal + agentColors.length;
                    }
                },
                source: browser
            });
            configuration.tools.radio(element);
        },

        /* Process various settings by text input or select list */
        configurationText: function browser_content_configuration_configurationText(event:Event):void {
            const element:HTMLInputElement = event.target as HTMLInputElement,
                keyboard:KeyboardEvent = event as KeyboardEvent;
            if (element.value.replace(/\s+/, "") !== "" && (event.type === "blur" || (event.type === "change" && util.name(element) === "select") || (event.type === "keyup" && keyboard.key === "Enter"))) {
                const numb:number = Number(element.value),
                    parent:Element = element.parentNode as Element,
                    parentText:string = parent.innerHTML.toLowerCase();
                if (parentText.indexOf("brotli") > 0) {
                    if (isNaN(numb) === true || numb < 0 || numb > 11) {
                        element.value = browser.data.brotli.toString();
                    }
                    element.value = Math.floor(numb).toString();
                    browser.data.brotli = Math.floor(numb) as brotli;
                } else if (parentText.indexOf("hash") > 0) {
                    browser.data.hashType = element.value as hash;
                } else if (parentText.indexOf("storage") > 0) {
                    browser.data.storage = element.value;
                }
                network.configuration();
            }
        },

        /* Shows and hides additional textual information about compression */
        detailsToggle: function browser_content_configuration_detailsToggle(event:MouseEvent):void {
            const element:HTMLInputElement = event.target as HTMLInputElement,
                parent:Element = element.parentNode as Element,
                info:HTMLElement = parent.getElementsByClassName("configuration-details")[0] as HTMLElement;
            if (info.style.display === "none") {
                info.style.display = "block";
                element.innerHTML = "Less information ⇡";
            } else {
                info.style.display = "none";
                element.innerHTML = "More information ⇣";
            }
        }
    },

    tools: {
        /* Add agent color options to the configuration modal content */
        addUserColor: function browser_content_configuration_addUserColor(agent:string, type:agentType, configurationBody:Element):void {
            const ul:Element = configurationBody.getElementsByClassName(`${type}-color-list`)[0],
                li:Element = document.createElement("li"),
                p:Element = document.createElement("p"),
                agentColor:[string, string] = browser.data.colors[type][agent];
            let span:HTMLElement,
                label:Element,
                input:HTMLInputElement,
                text:Text;
            p.innerHTML = browser[type][agent].name;
            li.setAttribute("data-agent", agent);
            li.appendChild(p);

            label = document.createElement("label");
            input = document.createElement("input");
            span = document.createElement("span");
            span.setAttribute("class", "swatch");
            span.style.background = `#${agentColor[0]}`;
            label.appendChild(span);
            input.type = "text";
            input.value = agentColor[0];
            input.onblur = configuration.events.agentColor;
            input.onkeyup = configuration.events.agentColor;
            label.appendChild(input);
            text = document.createTextNode("Body Color");
            label.appendChild(text);
            li.appendChild(label);

            label = document.createElement("label");
            input = document.createElement("input");
            span = document.createElement("span");
            span.setAttribute("class", "swatch");
            span.style.background = `#${agentColor[1]}`;
            label.appendChild(span);
            input.type = "text";
            input.value = agentColor[1];
            input.onblur = configuration.events.agentColor;
            input.onkeyup = configuration.events.agentColor;
            label.appendChild(input);
            text = document.createTextNode("Heading Color");
            label.appendChild(text);
            li.appendChild(label);

            ul.appendChild(li);
        },

        /* Update the agent color information in the style tag */
        applyAgentColors: function browser_content_configuration_applyUserColors(agent:string, type:agentType, colors:[string, string]):void {
            const prefix:string = `#spaces .box[data-agent="${agent}"] `,
                style:string = browser.style.innerHTML,
                styleText:styleText = {
                    agent: agent,
                    colors: colors,
                    replace: true,
                    type: type
                };
            let scheme:string = browser.pageBody.getAttribute("class");
            if (scheme === null) {
                scheme = "default";
            }
            if (colors[0] === configuration.colorDefaults[scheme][0] && colors[1] === configuration.colorDefaults[scheme][1]) {
                // colors are defaults for the current scheme
                styleText.colors = ["", ""];
                configuration.tools.styleText(styleText);
            } else if (style.indexOf(prefix) > -1) {
                // replace changed colors in the style tag if present
                configuration.tools.styleText(styleText);
            } else {
                // add new styles if not present
                styleText.replace = false;
                configuration.tools.styleText(styleText);
            }
            browser.data.colors[type][agent][0] = colors[0];
            browser.data.colors[type][agent][1] = colors[1];
        },

        /* Sets a class on a grandparent element to apply style changes to the corresponding label */
        radio: function browser_content_configuration_radio(element:Element):void {
            const parent:HTMLElement = element.parentNode as HTMLElement,
                grandParent:Element = parent.parentNode as Element,
                labels:HTMLCollectionOf<Element> = grandParent.getElementsByTagName("label"),
                length:number = labels.length;
            let a:number = 0;
            do {
                labels[a].setAttribute("class", "radio");
                a = a + 1;
            } while (a < length);
            parent.setAttribute("class", "radio-checked");
        },

        /* Applies agent color definitions */
        styleText: function browser_content_configuration_styleText(input:styleText):void {
            const template:string[] = [
                `#spaces .box[data-agent="${input.agent}"] .body,`,
                `#spaces #${input.type} button[data-agent="${input.agent}"]:hover{background-color:#`,
                browser.data.colors[input.type][input.agent][0],
                "}",
                `#spaces #${input.type} button[data-agent="${input.agent}"],`,
                `#spaces .box[data-agent="${input.agent}"] .status-bar,`,
                `#spaces .box[data-agent="${input.agent}"] .footer,`,
                `#spaces .box[data-agent="${input.agent}"] h2.heading{background-color:#`,
                browser.data.colors[input.type][input.agent][1],
                "}"
            ];
            if (input.replace === true) {
                if (input.colors[0] === "" && input.colors[1] === "") {
                    // removes an agent's colors
                    browser.style.innerHTML = browser.style.innerHTML.replace(template.join(""), "");
                } else {
                    const old:string = template.join("");
                    if (input.colors[0] !== "") {
                        template[2] = input.colors[0];
                    }
                    if (input.colors[1] !== "") {
                        template[8] = input.colors[1];
                    }
                    // updates an agent's colors
                    browser.style.innerHTML = browser.style.innerHTML.replace(old, template.join(""));
                }
            } else {
                if (input.colors[0] !== "") {
                    template[2] = input.colors[0];
                }
                if (input.colors[1] !== "") {
                    template[8] = input.colors[1];
                }
                // adds an agent's colors
                browser.style.innerHTML = browser.style.innerHTML + template.join("");
            }
        }
    }

};

export default configuration;