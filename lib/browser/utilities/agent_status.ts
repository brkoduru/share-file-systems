
/* lib/browser/utilities/agent_status - Receive and process agent activity status notifications from the network. */

import browser from "../browser.js";
import network from "./network.js";

let idleDelay:NodeJS.Timeout = null;
const idleTime:number = 15000,
    selfStatus:service_agentStatus = {
        agent: browser.data.hashDevice,
        agentType: "device",
        broadcast: true,
        status: "active"
    },

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
    agent_status:module_agentStatus = {
        active: function browser_utilities_agentStatus_active(event:KeyboardEvent|MouseEvent):void {
            const localDevice:Element = document.getElementById(browser.data.hashDevice),
                currentStatus:activityStatus = localDevice.getAttribute("class") as activityStatus;
            if (event !== null) {
                event.stopPropagation();
            }
            clearTimeout(idleDelay);
            if (currentStatus !== "active") {
                localDevice.setAttribute("class", "active");
                selfStatus.status = "active";
                network.send(selfStatus, "agent-status");
            }
            idleDelay = setTimeout(agent_status.idle, idleTime);
        },
        idle: function browser_utilities_agentStatus_idle():void {
            const localDevice:Element = document.getElementById(browser.data.hashDevice),
                currentStatus:activityStatus = localDevice.getAttribute("class") as activityStatus;
            if (currentStatus === "active") {
                localDevice.setAttribute("class", "idle");
                selfStatus.status = "idle";
                network.send(selfStatus, "agent-status");
            }
        },
        receive: function browser_utilities_agentStatus_receive(socketData:socketData):void {
            const data:service_agentStatus = socketData.data as service_agentStatus;

            // do not receive local agent status from a remote agent
            if (browser[data.agentType][data.agent] !== undefined && (data.agentType !== "device" || (data.agentType === "device" && data.agent !== browser.data.hashDevice))) {
                const agent:Element = document.getElementById(data.agent);
                agent.setAttribute("class", data.status);
            }
        },
        start: function browser_utilities_agentStatus_start():void {

            // watch for local idleness
            document.documentElement.onclick = agent_status.active;
            document.documentElement.onkeydown = agent_status.active;

            agent_status.active(null);
        }
    };

export default agent_status;