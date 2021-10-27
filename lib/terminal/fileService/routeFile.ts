
/* lib/terminal/fileService/routeFile - A library that manages all file system operations except copy/cut operations. */

import { IncomingHttpHeaders } from "http";

import responder from "../server/responder.js";
import route from "./route.js";
import serverVars from "../server/serverVars.js";
import serviceFile from "./serviceFile.js";
import user from "./user.js";

const routeFile = function terminal_fileService_routeFile(dataPackage:socketData, transmit:transmit):void {
    const data:systemDataFile = dataPackage.data as systemDataFile,
        routeCallback = function terminal_fileService_routeFile_routeCallback(message:Buffer | string, headers:IncomingHttpHeaders):void {
            const responseType:requestType = headers["response-type"] as requestType;
            if (responseType === "error") {
                responder({
                    data: new Error(message as string),
                    service: "error"
                }, transmit);
            } else if (data.action === "fs-base64" || data.action === "fs-hash" || data.action === "fs-read") {
                responder({
                    data: JSON.parse(message.toString()) as stringData[],
                    service: "fs"
                }, transmit);
            } else if (data.action === "fs-details") {
                responder({
                    data: JSON.parse(message.toString()) as fsDetails,
                    service: "fs"
                }, transmit);
            } else {
                const status:fileStatusMessage = JSON.parse(message.toString());
                responder({
                    data: status,
                    service: "fs"
                }, transmit);
                if (data.action === "fs-directory" && (data.name === "expand" || data.name === "navigate" || data.name.indexOf("loadPage:") === 0)) {
                    return;
                }
                if (data.action === "fs-search") {
                    return;
                }
                serviceFile.statusBroadcast(data, status);
            }
        };
    // service tests must be regarded as local device tests even they have a non-matching agent
    // otherwise there is an endless loop of http requests because service tests are only differentiated by port and not ip.
    // for fs-execute this forces processing on the local device instead of routing
    if (data.agent.id === serverVars.hashDevice || data.action === "fs-execute" || serverVars.testType === "service") {
        serviceFile.menu(data, transmit);
    } else if (data.agent.id === serverVars.hashUser) {
        user({
            agent: data.agent,
            action: data.action,
            callback: function terminal_fileService_routeFile_user(device:string):void {
                if (device === serverVars.hashDevice) {
                    serviceFile.menu(data, transmit);
                } else {
                    route({
                        agent: device,
                        agentData: "agent",
                        agentType: "device",
                        callback: routeCallback,
                        data: data,
                        dataString: JSON.stringify(data),
                        dataType: "file",
                        requestType: "fs",
                        transmit: transmit
                    });
                }
            },
            transmit: transmit
        });
    } else {
        route({
            agent: data.agent.id,
            agentData: "agent",
            agentType: data.agent.type,
            callback: routeCallback,
            data: data,
            dataString: JSON.stringify(data),
            dataType: "file",
            requestType: "fs",
            transmit: transmit
        });
    }
};

export default routeFile;