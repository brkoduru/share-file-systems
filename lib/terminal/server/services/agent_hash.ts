

/* lib/terminal/server/services/agent_hash - A library for creating a new user/device identification. */

import { cpus, hostname, release, totalmem, type } from "os";

import hash from "../../commands/hash.js";
import sender from "../transmission/sender.js";
import serverVars from "../serverVars.js";
import settings from "./settings.js";

const hashAgent = function terminal_server_services_hashAgent(socketData:socketData):void {
    const hashData:service_agentHash = socketData.data as service_agentHash,
        callbackUser = function terminal_server_services_hashUser(hashUser:hashOutput):void {
            const callbackDevice = function terminal_server_services_hashUser_hashAgent(hashAgent:hashOutput):void {
                const deviceData:deviceData = {
                        cpuCores: cpus().length,
                        cpuID: cpus()[0].model,
                        platform: process.platform,
                        memTotal: totalmem(),
                        osType: type(),
                        osVersion: release()
                    },
                    hashes:service_agentHash = {
                        device: hashAgent.hash,
                        deviceData: deviceData,
                        user: hashUser.hash
                    };
                serverVars.hashDevice = hashAgent.hash;
                serverVars.nameDevice = hashData.device;
                serverVars.device[serverVars.hashDevice] = {
                    deviceData: deviceData,
                    ipAll: serverVars.localAddresses,
                    ipSelected: "",
                    name: hashData.device,
                    ports: serverVars.ports,
                    shares: {},
                    status: "active"
                };
                settings({
                    data: {
                        settings: serverVars.device,
                        type: "device"
                    },
                    service: "settings"
                });
                sender.broadcast({
                    data: hashes,
                    service: "agent-hash"
                }, "browser");
            };
            serverVars.hashUser = hashUser.hash;
            serverVars.nameUser = hashData.user;
            input.callback = callbackDevice;
            input.source = hashUser.hash + hashData.device;
            hash(input);
        },
        input:config_command_hash = {
            algorithm: "sha3-512",
            callback: callbackUser,
            directInput: true,
            source: hashData.user + hostname() + process.env.os + process.hrtime.bigint().toString()
        };
    hash(input);
};

export default hashAgent;