
/* lib/terminal/fileService/routeCopy - A library to handle file system asset movement. */

import { ServerResponse } from "http";

import response from "../server/response.js";
import route from "./route.js";
import serverVars from "../server/serverVars.js";
import serviceCopy from "./serviceCopy.js";
import serviceFile from "./serviceFile.js";
import user from "./user.js";

const routeCopy = function terminal_fileService_routeCopy(serverResponse:ServerResponse, dataString:string, action:copyTypes):void {
    if (action === "copy" || serverVars.testType === "service") {
        const data:systemDataCopy = JSON.parse(dataString),
            routeCallback = function terminal_fileService_routeCopy_route_callback(message:string|Buffer):void {
                const status:fileStatusMessage = JSON.parse(message.toString());
                serviceFile.respond.status(serverResponse, status);
                serviceFile.statusBroadcast({
                    action: "fs-directory",
                    agent: data.agentSource,
                    depth: 2,
                    location: data.location,
                    name: ""
                }, status);
            };
        // service tests must be regarded as local device tests even they have a non-matching agent
        // otherwise there is an endless loop of http requests because service tests are only differentiated by port and not ip.
        if (data.agentSource.id === serverVars.hashDevice || serverVars.testType === "service") {
            // self device
            if (data.agentSource.id === data.agentWrite.id) {
                serviceCopy.actions.sameAgent(serverResponse, data);
            } else {
                serviceCopy.actions.requestList(serverResponse, data, 0);
            }
        } else if (data.agentSource.id === serverVars.hashUser) {
            // self user
            const sourceUser = function terminal_fileService_routeCopy_sourceUser(writeDevice:string):void {
                user({
                    action: (data.cut === true)
                        ? "cut"
                        : "copy-request-files",
                    agent: data.agentSource,
                    callback: function terminal_fileService_routeCopy_sourceUser_callback(sourceDevice:string):void {
                        if (sourceDevice === serverVars.hashDevice) {
                            if (writeDevice === sourceDevice) {
                                serviceCopy.actions.sameAgent(serverResponse, data);
                            } else {
                                serviceCopy.actions.requestList(serverResponse, data, 0);
                            }
                        } else {
                            route({
                                agent: sourceDevice,
                                agentData: "agentSource",
                                agentType: data.agentSource.type,
                                callback: routeCallback,
                                data: data,
                                dataString: dataString,
                                dataType: "copy",
                                requestType: "copy",
                                serverResponse: serverResponse
                            });
                        }
                    },
                    serverResponse: serverResponse
                });
            }
            // first verify if the destination is this user and if the destination location is shared
            if (data.agentWrite.id === serverVars.hashUser) {
                user({
                    action: "copy",
                    agent: data.agentSource,
                    callback: function terminal_fileService_routeCopy(writeDevice:string):void {
                        sourceUser(writeDevice);
                    },
                    serverResponse: serverResponse
                });
            } else {
                // destination is not this user, so ignore it and evaluate source location
                sourceUser("");
            }
        } else {
            route({
                agent: data.agentSource.id,
                agentData: "agentSource",
                agentType: data.agentSource.type,
                callback: routeCallback,
                data: data,
                dataString: dataString,
                dataType: "copy",
                requestType: "copy",
                serverResponse: serverResponse
            });
        }
    } else if (action === "copy-file") {
        // copy-file just returns a file in a HTTP response
        const data:copyFileRequest = JSON.parse(dataString),
            routeFileList = function terminal_fileService_routeCopy_routeCopyFile(agent:string, type:agentType):void {
                route({
                    agent: agent,
                    agentData: "agent",
                    agentType: type,
                    callback: function terminal_fileService_routeCopy_userCopyFile_route(message:Buffer):void {
                        response({
                            message: message,
                            mimeType: "application/octet-stream",
                            responseType: "copy-file",
                            serverResponse: serverResponse
                        });
                    },
                    data: data,
                    dataString: dataString,
                    dataType: "copy",
                    requestType: "copy-file",
                    serverResponse: serverResponse
                });
            };
        if (data.agent.id === serverVars.hashDevice) {
            serviceCopy.actions.sendFile(serverResponse, data);
        } else if (data.agent.id === serverVars.hashUser) {
            // using a bogus action because read only concerns are not relevant to file responses
            user({
                action: "copy-file",
                agent: data.agent,
                callback: function terminal_fileService_routeCopy_userCopyFile(device:string):void {
                    if (device === serverVars.hashDevice) {
                        serviceCopy.actions.sendFile(serverResponse, data);
                    } else {
                        routeFileList(device, "device");
                    }
                },
                serverResponse: serverResponse
            });
        } else {
            routeFileList(data.agent.id, data.agent.type);
        }
    } else if (action === "copy-request-files") {
        const data:systemRequestFiles = JSON.parse(dataString),
            routeRequestFiles = function terminal_fileService_routeCopy_routeRequestFiles(agent:string, type:agentType):void {
                route({
                    agent: agent,
                    agentData: "data.agent",
                    agentType: type,
                    callback: function terminal_fileService_routeCopy_routeCopyRequest(message:string|Buffer):void {
                        response({
                            message: message.toString(),
                            mimeType: "application/json",
                            responseType: "copy-request-files",
                            serverResponse: serverResponse
                        });
                    },
                    data: data,
                    dataString: dataString,
                    dataType: "copy",
                    requestType: "copy-request-files",
                    serverResponse: serverResponse
                });
            };
        if (data.data.agentWrite.id === serverVars.hashDevice) {
            serviceCopy.actions.requestFiles(serverResponse, data);
        } else if (data.data.agentWrite.id === serverVars.hashUser) {
            user({
                action: "copy-request-files",
                agent: data.data.agentWrite,
                callback: function terminal_fileService_routeCopy_userCopyRequest(device:string):void {
                    if (device === serverVars.hashDevice) {
                        serviceCopy.actions.requestFiles(serverResponse, data);
                    } else {
                        routeRequestFiles(device, "device");
                    }
                },
                serverResponse: serverResponse
            });
        } else {
            routeRequestFiles(data.data.agentWrite.id, data.data.agentWrite.type);
        }
    }
};

export default routeCopy;