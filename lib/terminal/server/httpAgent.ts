
/* lib/terminal/server/httpAgent - This library launches the HTTP service and all supporting service utilities. */

import { stat } from "fs";
import { ClientRequest, IncomingMessage, OutgoingHttpHeaders, request as httpRequest, RequestOptions, ServerResponse } from "http";
import { request as httpsRequest} from "https";
import { Readable } from "stream";
import { StringDecoder } from "string_decoder";

import error from "../utilities/error.js";
import log from "../utilities/log.js";
import methodGET from "./methodGET.js";
import receiver from "./receiver.js";
import serverVars from "./serverVars.js";
import vars from "../utilities/vars.js";

// cspell:words nosniff

const httpAgent:httpAgent = {
    receive: function terminal_server_httpAgent_receive(request:IncomingMessage, serverResponse:ServerResponse):void {
        let ended:boolean = false,
            host:string = (function terminal_server_httpAGent_receive_host():string {
                let name:string = request.headers.host;
                if (name === undefined) {
                    return "";
                }
                if (name === "localhost" || (/((localhost)|(\[::\])):\d{0,5}/).test(name) === true || name === "::1" || name === "[::1]" || name === "127.0.0.1") {
                    return "localhost";
                }
                if (name.indexOf(":") > 0) {
                    name = name.slice(0, name.lastIndexOf(":"));
                }
                if (name.charAt(0) === "[") {
                    name = name.slice(1, name.length - 1);
                }
                if (name === "::1" || name === "127.0.0.1") {
                    return "localhost";
                }
                return request.headers.host;
            }());
        const chunks:string[] = [],
            decoder:StringDecoder = new StringDecoder("utf8"),
            agentType:agentType = request.headers["agent-type"] as agentType,
            agent:string = request.headers["agent-hash"] as string,
            postTest = function terminal_server_httpAgent_receive_postTest():boolean {
                if (
                    request.method === "POST" && 
                    request.headers["request-type"] !== undefined && (
                        host === "localhost" || (
                            host !== "localhost" && (
                                (serverVars[request.headers["agent-type"] as agentType] !== undefined && serverVars[agentType][agent] !== undefined) ||
                                request.headers["request-type"] === "hash-device" ||
                                request.headers["request-type"] === "invite-request" ||
                                request.headers["request-type"] === "invite-complete" ||
                                serverVars.testType.indexOf("browser") === 0
                            )
                        )
                    )
                ) {
                    return true;
                }
                return false;
            },
            setIdentity = function terminal_server_httpAgent_receive_setIdentity(forbidden:boolean):void {
                if (request.headers["agent-hash"] === undefined) {
                    return;
                }
                if (forbidden === true) {
                    serverResponse.setHeader("agent-hash", request.headers["agent-hash"]);
                    serverResponse.setHeader("agent-type", "user");
                } else {
                    const type:agentType = request.headers["agent-type"] as agentType,
                        self:string = (type === "device")
                            ? serverVars.hashDevice
                            : serverVars.hashUser;
                    if (self !== undefined) {
                        host = self;
                        serverResponse.setHeader("agent-hash", self);
                        serverResponse.setHeader("agent-type", type);
                    }
                }
            },
            post = function terminal_server_httpAgent_receive_post():void {
                const body:string = chunks.join(""),
                    receivedLength:number = Buffer.byteLength(body),
                    contentLength:number = Number(request.headers["content-length"]);
                if (receivedLength > contentLength) {
                    request.destroy({
                        name: "TOO_LARGE",
                        message: "Request destroyed for size in excess of its content-length header."
                    });
                }
                setIdentity(false);
                receiver(JSON.parse(body), {
                    socket: serverResponse,
                    type: "http"
                });
            },
            destroy = function terminal_server_httpAgent_receive_destroy():void {
                setIdentity(true);
                request.destroy({
                    name: "FORBIDDEN",
                    message: `Agent type ${agentType} does not contain agent identity ${agent}.`
                });
            },
            requestEnd = function terminal_server_httpAgent_receive_requestEnd():void {
                ended = true;
                if (host === "") {
                    destroy();
                } else if (request.method === "GET") {
                    if (host === "localhost") {
                        setIdentity(true);
                        methodGET(request, serverResponse);
                    } else {
                        destroy();
                    }
                } else if (postTest() === true) {
                    post();
                } else {
                    // the delay is necessary to prevent a race condition between service execution and data settings writing
                    setTimeout(function terminal_server_httpAgent_receive_requestEnd_delay():void {
                        if (postTest() === true) {
                            post();
                        } else {
                            stat(`${vars.projectPath}lib${vars.sep}settings${vars.sep}user.json`, function terminal_server_httpAgent_receive_requestEnd_delay_userStat(err:Error):void {
                                if (err === null) {
                                    destroy();
                                }
                            });
                            destroy();
                        }
                    }, 50);
                }
            },
            requestError = function terminal_server_httpAgent_receive_requestError(errorMessage:NodeJS.ErrnoException):void {
                const errorString:string = errorMessage.toString();
                if (errorMessage.code !== "ETIMEDOUT" && (ended === false || (ended === true && errorString !== "Error: aborted"))) {
                    const body:string = chunks.join("");
                    log([
                        `${vars.text.cyan}POST request, ${request.headers["request-type"]}, methodPOST.ts${vars.text.none}`,
                        body.slice(0, 1024),
                        "",
                        `body length: ${body.length}`,
                        vars.text.angry + errorString + vars.text.none,
                        "",
                        ""
                    ]);
                }
            },
            responseError = function terminal_server_httpAgent_receive_responseError(errorMessage:NodeJS.ErrnoException):void {
                if (errorMessage.code !== "ETIMEDOUT") {
                    const body:string = chunks.join("");
                    log([
                        `${vars.text.cyan}POST response, ${request.headers["request-type"]}, methodPOST.ts${vars.text.none}`,
                        (body.length > 1024)
                            ? `${body.slice(0, 512)}  ...  ${body.slice(body.length - 512)}`
                            : body,
                        "",
                        `body length: ${body.length}`,
                        vars.text.angry + errorMessage.toString() + vars.text.none,
                        "",
                        ""
                    ]);
                }
            },
            // eslint-disable-next-line
            requestType:string = (request.method === "GET") ? `GET ${request.url}` : request.headers["request-type"] as string;
        // *** available for troubleshooting:
        // console.log(`${requestType} ${host} ${postTest()} ${agentType} ${agent}`);

        // request handling
        request.on("data", function terminal_server_methodPOST_data(data:Buffer):void {
            chunks.push(decoder.write(data));
        });
        request.on("error", requestError);
        serverResponse.on("error", responseError);
        request.on("end", requestEnd);
    },
    request: function terminal_server_httpAgent_request(config:httpRequest):void {
        const dataString:string = JSON.stringify(config.payload),
            headers:OutgoingHttpHeaders = {
                "content-type": "application/x-www-form-urlencoded",
                "content-length": Buffer.byteLength(dataString),
                "agent-hash": (config.agentType === "device")
                    ? serverVars.hashDevice
                    : serverVars.hashUser,
                "agent-name": (config.agentType === "device")
                    ? serverVars.nameDevice
                    : serverVars.nameUser,
                "agent-type": config.agentType,
                "request-type": config.payload.service
            },
            payload:RequestOptions = {
                headers: headers,
                host: config.ip,
                method: "POST",
                path: "/",
                port: config.port,
                timeout: (config.payload.service === "agent-online")
                    ? 1000
                    : (config.payload.service.indexOf("copy") === 0)
                        ? 7200000
                        : 5000
            },
            scheme:"http"|"https" = (serverVars.secure === true)
                ? "https"
                : "http",
            requestError = function terminal_server_httpSender_requestError(erRequest:NodeJS.ErrnoException):void {
                error([
                    `${vars.text.angry}Error on client HTTP request for service:${vars.text.none} ${config.payload.service}`,
                    `Agent Name: ${serverVars[config.agentType][config.agent].name}, Agent Type: ${config.agentType},  Agent ID: ${config.agent}`,
                    "",
                    JSON.stringify(erRequest)
                ]);
            },
            responseError = function terminal_server_httpSender_responseError(erResponse:NodeJS.ErrnoException):void {
                error([
                    `${vars.text.angry}Error on client HTTP response for service:${vars.text.none} ${config.payload.service}`,
                    `Agent Name: ${serverVars[config.agentType][config.agent].name}, Agent Type: ${config.agentType},  Agent ID: ${config.agent}`,
                    "",
                    JSON.stringify(erResponse)
                ]);
            },
            requestCallback = function terminal_server_httpSender_callback(fsResponse:IncomingMessage):void {
                const chunks:Buffer[] = [];
                fsResponse.setEncoding("utf8");
                fsResponse.on("data", function terminal_server_httpSender_callback_data(chunk:Buffer):void {
                    chunks.push(chunk);
                });
                fsResponse.on("end", function terminal_server_httpSender_callback_end():void {
                    const body:string = (Buffer.isBuffer(chunks[0]) === true)
                        ? Buffer.concat(chunks).toString()
                        : chunks.join("");
                    if (fsResponse.headers["response-type"] === "forbidden") {
                        if (body.indexOf("ForbiddenAccess:") === 0) {
                            //forbiddenUser(body.replace("ForbiddenAccess:", ""), "user");
                        } else {
                            error([body]);
                        }
                    } else if (config.callback !== null) {
                        config.callback(JSON.parse(body));
                    }
                });
                fsResponse.on("error", responseError);
            },
            fsRequest:ClientRequest = (scheme === "https")
                ? httpsRequest(payload, requestCallback)
                : httpRequest(payload, requestCallback);
        if (fsRequest.writableEnded === true) {
            error([
                "Attempt to write to HTTP request after end:",
                dataString
            ]);
        } else {
            fsRequest.on("error", requestError);
            fsRequest.write(dataString);
            fsRequest.end();
        }
    },
    requestCopy: function terminal_server_httpAgent_requestCopy(config:httpCopyRequest):void {
        const agent:agent = serverVars[config.agentType][config.agent],
            net:[string, number] = (agent === undefined)
                ? ["", 0]
                : [
                    agent.ipSelected,
                    agent.ports.http
                ],
            scheme:"http"|"https" = (serverVars.secure === true)
                ? "https"
                : "http",
            headers:OutgoingHttpHeaders = {
                "content-type": "application/x-www-form-urlencoded",
                "content-length": Buffer.byteLength(config.dataString),
                "agent-hash": (config.agentType === "device")
                    ? serverVars.hashDevice
                    : serverVars.hashUser,
                "agent-name": (config.agentType === "device")
                    ? serverVars.nameDevice
                    : serverVars.nameUser,
                "agent-type": config.agentType,
                "request-type": "copy-file"
            },
            httpConfig:RequestOptions = {
                headers: headers,
                host: net[0],
                method: "POST",
                path: "/",
                port: net[1],
                timeout: 5000
            },
            requestCallback = function terminal_fileService_routeCopy_routeCopyFile_response(fsResponse:IncomingMessage):void {
                const serverResponse:ServerResponse = config.transmit.socket as ServerResponse;
                serverResponse.setHeader("compression", fsResponse.headers.compression);
                serverResponse.setHeader("cut_path", fsResponse.headers.cut_path);
                serverResponse.setHeader("file_name", fsResponse.headers.file_name);
                serverResponse.setHeader("file_size", fsResponse.headers.file_size);
                serverResponse.setHeader("hash", fsResponse.headers.hash);
                serverResponse.setHeader("response-type", "copy-file");
                serverResponse.writeHead(200, {"content-type": "application/octet-stream; charset=binary"});
                fsResponse.pipe(serverResponse);
            },
            fsRequest:ClientRequest = (scheme === "https")
                ? httpsRequest(httpConfig, requestCallback)
                : httpRequest(httpConfig, requestCallback);
        if (net[0] === "") {
            return;
        }
        fsRequest.on("error", function terminal_fileService_serviceCopy_requestFiles_requestFile_requestError(errorMessage:NodeJS.ErrnoException):void {
            if (errorMessage.code !== "ETIMEDOUT" && errorMessage.code !== "ECONNREFUSED") {
                error(["Error at client request in requestFile of serviceCopy", config.dataString, errorMessage.toString()]);
            }
        });
        fsRequest.write(config.dataString);
        fsRequest.end();
    },
    respond: function terminal_server_httpAgent_respond(config:responseConfig):void {
        if (config.serverResponse !== null) {
            if (config.serverResponse.writableEnded === true) {
                const message:string[] = ["Write after end of HTTP response."];
                if (typeof config.message === "string") {
                    message.push("");
                    message.push(`${vars.text.cyan}Response message body:${vars.text.none}`);
                    message.push(config.message);
                }
                error(message);
            } else {
                const textTypes:string[] = [
                        "application/json",
                        "text/plain",
                        "text/html",
                        "application/javascript",
                        "text/css",
                        "image/svg+xml",
                        "application/xhtml+xml"
                    ],
                    readStream:Readable = Readable.from(config.message),
                    contains = function terminal_server_httpAgent_respond_contains(input:string):boolean {
                        const stringMessage:string = (Buffer.isBuffer(config.message) === true)
                                ? ""
                                : config.message as string,
                            lower:string = stringMessage.toLowerCase();
                        if (lower.indexOf(input) > -1 && lower.indexOf(input) < 10) {
                            return true;
                        }
                        return false;
                    },
                    type:string = (textTypes.indexOf(config.mimeType) > -1)
                        ? `${config.mimeType}; charset=utf-8`
                        : config.mimeType;
                let status:number;
                if (Buffer.isBuffer(config.message) === true) {
                    status = 200;
                } else if (contains("ENOENT") === true || contains("not found") === true) {
                    status = 404;
                } else if (contains("forbidden") === true || config.message === "Unexpected user.") {
                    status = 403;
                } else {
                    status = 200;
                }
                config.serverResponse.setHeader("cache-control", "no-store");
                if (serverVars.secure === true) {
                    config.serverResponse.setHeader("strict-transport-security", "max-age=63072000");
                }
                config.serverResponse.setHeader("alt-svc", "clear");
                config.serverResponse.setHeader("connection", "keep-alive");
                config.serverResponse.setHeader("content-length", Buffer.byteLength(config.message));
                config.serverResponse.setHeader("referrer-policy", "no-referrer");
                config.serverResponse.setHeader("response-type", config.responseType);
                config.serverResponse.setHeader("x-content-type-options", "nosniff");
                config.serverResponse.writeHead(status, {"content-type": type});
                readStream.pipe(config.serverResponse);
            }
        }
    }
};

export default httpAgent;