
/* lib/terminal/test/samples/service - A list of service related tests. */

import * as http from "http";

import agents from "../../../common/agents.js";
import remove from "../../commands/remove.js";
import readStorage from "../../utilities/readStorage.js";
import server from "../../commands/server.js";
import serverVars from "../../server/serverVars.js";
import vars from "../../utilities/vars.js";

import testComplete from "../application/complete.js";
import testEvaluation from "../application/evaluation.js";

// tests structure
// * artifact - the address of anything written to disk, so that it can be removed
// * command - the command to execute minus the `node js/services` part
// * file - a file system address to open
// * name - a short label to describe the test
// * qualifier - how to test, see simulationItem in index.d.ts for appropriate values
// * share - optional object containing share data to test against
// * test - the value to compare against

const projectPath:string = vars.projectPath,
    sep:string = vars.sep,
    windowsPath:string = projectPath.replace(/\\/g, "\\\\"),
    windowsSep:string = sep.replace(/\\/g, "\\\\"),
    loopback:string = (serverVars.addresses[0].length > 1)
        ? "::"
        : "127.0.0.1",
    hash:string = "622d3d0c8cb85c227e6bad1c99c9cd8f9323c8208383ece09ac58e713c94c34868f121de6e58e358de00a41f853f54e4ef66e6fe12a86ee124f7e452dbe89800",

    // start test list
    service:testServiceArray = [
        // todo: fs - readonly tests
        // todo: user tests
    ];
service.populate = function test_services_populate():void {
    service.push(<testTemplateFileService>{
        command: {
            fs: {
                action: "fs-base64",
                agent: serverVars.hashDevice,
                agentType: "device",
                copyAgent: "",
                copyType: "device",
                depth: 1,
                id: "test-ID",
                location: [`some-modal-id:${projectPath}tsconfig.json`],
                name: "",
                watch: "no"
            }
        },
        name: "fs:fs-base64, Base 64 Local",
        qualifier: "is",
        test: [{
            content: "ewogICAgImNvbXBpbGVyT3B0aW9ucyI6IHsKICAgICAgICAibW9kdWxlUmVzb2x1dGlvbiI6ICJub2RlIiwKICAgICAgICAib3V0RGlyIjogImpzIiwKICAgICAgICAicHJldHR5IjogdHJ1ZSwKICAgICAgICAidGFyZ2V0IjogIkVTNiIsCiAgICAgICAgInR5cGVzIjogWyJub2RlIl0sCiAgICAgICAgInR5cGVSb290cyI6IFsibm9kZV9tb2R1bGVzL0B0eXBlcyJdCiAgICB9LAogICAgImV4Y2x1ZGUiOiBbCiAgICAgICAgImpzIiwKICAgICAgICAibm9kZV9tb2R1bGVzIgogICAgXSwKICAgICJpbmNsdWRlIjogWwogICAgICAgICIqLnRzIiwKICAgICAgICAiKiovKi50cyIKICAgIF0KfQ==",
            id: "some-modal-id",
            path: `${projectPath}tsconfig.json`
        }]
    });
    service.push(<testTemplateFileService>{
        command: {
            fs: {
                action: "fs-base64",
                agent: "a5908e8446995926ab2dd037851146a2b3e6416dcdd68856e7350c937d6e92356030c2ee702a39a8a2c6c58dac9adc3d666c28b96ee06ddfcf6fead94f81054e",
                agentType: "device",
                copyAgent: "",
                copyType: "device",
                depth: 1,
                id: "test-ID",
                location: [`some-modal-id:${projectPath}tsconfig.json`],
                name: "",
                watch: "no"
            }
        },
        name: "fs:fs-base64, Base 64 Remote Device",
        qualifier: "is",
        test: [{
            content: "ewogICAgImNvbXBpbGVyT3B0aW9ucyI6IHsKICAgICAgICAibW9kdWxlUmVzb2x1dGlvbiI6ICJub2RlIiwKICAgICAgICAib3V0RGlyIjogImpzIiwKICAgICAgICAicHJldHR5IjogdHJ1ZSwKICAgICAgICAidGFyZ2V0IjogIkVTNiIsCiAgICAgICAgInR5cGVzIjogWyJub2RlIl0sCiAgICAgICAgInR5cGVSb290cyI6IFsibm9kZV9tb2R1bGVzL0B0eXBlcyJdCiAgICB9LAogICAgImV4Y2x1ZGUiOiBbCiAgICAgICAgImpzIiwKICAgICAgICAibm9kZV9tb2R1bGVzIgogICAgXSwKICAgICJpbmNsdWRlIjogWwogICAgICAgICIqLnRzIiwKICAgICAgICAiKiovKi50cyIKICAgIF0KfQ==",
            id: "some-modal-id",
            path: `${projectPath}tsconfig.json`
        }]
    });
    service.push(<testTemplateFileService>{
        command: {
            fs: {
                action: "fs-close",
                agent: serverVars.hashDevice,
                agentType: "device",
                copyAgent: "",
                copyType: "device",
                depth: 1,
                id: "test-ID",
                location: [`${projectPath}lib`],
                name: "",
                watch: "no"
            }
        },
        name: "fs:fs-close, Close Local",
        qualifier: "begins",
        test: `Watcher ${projectPath}lib closed.`
    });
    service.push(<testTemplateFileService>{
        command: {
            fs: {
                action: "fs-close",
                agent: "a5908e8446995926ab2dd037851146a2b3e6416dcdd68856e7350c937d6e92356030c2ee702a39a8a2c6c58dac9adc3d666c28b96ee06ddfcf6fead94f81054e",
                agentType: "device",
                copyAgent: "",
                copyType: "device",
                depth: 1,
                id: "test-ID",
                location: [`${projectPath}lib`],
                name: "",
                watch: "no"
            }
        },
        name: "fs:fs-close, Close Remote Device",
        qualifier: "begins",
        test: "{\"fs-update-remote\":{\"agent\":\"a5908e8446995926ab2dd037851146a2b3e6416dcdd68856e7350c937d6e92356030c2ee702a39a8a2c6c58dac9adc3d666c28b96ee06ddfcf6fead94f81054e\",\"agentType\":\"device\",\"dirs\":[["
    });
    service.push(<testTemplateFileService>{
        artifact: `${projectPath}storage${sep}tsconfig.json`,
        command: {
            fs: {
                action: "fs-copy",
                agent: serverVars.hashDevice,
                agentType: "device",
                copyAgent: serverVars.hashDevice,
                copyType: "device",
                depth: 1,
                id: "test-ID",
                location: [`${projectPath}tsconfig.json`],
                name: `${projectPath}storage`,
                watch: "no"
            }
        },
        name: "fs:fs-copy, Copy Local to Local",
        qualifier: "is",
        test: {
            "file-list-status": {
                failures: [],
                message: "Copy complete. XXXX file written at size XXXX (XXXX bytes) with XXXX integrity failures.",
                target: "remote-test-ID"
            }
        }
    });
    service.push(<testTemplateFileService>{
        artifact: `${projectPath}storage${sep}tsconfig.json`,
        command: {
            fs: {
                action: "fs-copy",
                agent: serverVars.hashDevice,
                agentType: "device",
                copyAgent: "a5908e8446995926ab2dd037851146a2b3e6416dcdd68856e7350c937d6e92356030c2ee702a39a8a2c6c58dac9adc3d666c28b96ee06ddfcf6fead94f81054e",
                copyType: "device",
                depth: 1,
                id: "test-ID",
                location: [`${projectPath}tsconfig.json`],
                name: `${projectPath}storage`,
                watch: "no"
            }
        },
        name: "fs:fs-copy, Copy Local to Remote Device",
        qualifier: "is",
        test: {
            "file-list-status": {
                failures: [],
                message: "Copy complete. XXXX file written at size XXXX (XXXX bytes) with XXXX integrity failures.",
                target: "remote-test-ID"
            }
        }
    });
    service.push(<testTemplateFileService>{
        artifact: `${projectPath}storage${sep}tsconfig.json`,
        command: {
            fs: {
                action: "fs-copy",
                agent: "a5908e8446995926ab2dd037851146a2b3e6416dcdd68856e7350c937d6e92356030c2ee702a39a8a2c6c58dac9adc3d666c28b96ee06ddfcf6fead94f81054e",
                agentType: "device",
                copyAgent: serverVars.hashDevice,
                copyType: "device",
                depth: 1,
                id: "test-ID",
                location: [`${projectPath}tsconfig.json`],
                name: `${projectPath}storage`,
                watch: "no"
            }
        },
        name: "fs:fs-copy, Copy Remote Device to Local",
        qualifier: "is",
        test: {
            "file-list-status": {
                failures: [],
                message: "Copy complete. XXXX file written at size XXXX (XXXX bytes) with XXXX integrity failures.",
                target: "remote-test-ID"
            }
        }
    });
    /*service.push(<testTemplateFileService>{
        command: {
            fs: {
                action: "fs-copy",
                agent: "a5908e8446995926ab2dd037851146a2b3e6416dcdd68856e7350c937d6e92356030c2ee702a39a8a2c6c58dac9adc3d666c28b96ee06ddfcf6fead94f81054e",
                agentType: "device",
                copyAgent: "fa042a71aee124b7b667d97fd84c0a309e72aefcae5d95762bc05d39cbeedae88122758f8625910a669271251d5f561a1c2749c6d66664f5d35dcc8c608c1a89",
                copyType: "device",
                depth: 1,
                id: "test-ID",
                location: [`${projectPath}version.json`],
                name: `${projectPath}storage`,
                watch: "no"
            }
        },
        name: "fs:fs-copy, Copy from Remote Device to different Remote Device",
        qualifier: "is",
        test: {
            "file-list-status": {
                failures: [],
                message: "Copy complete. XXXX file written at size XXXX (XXXX bytes) with XXXX integrity failures.",
                target: "remote-test-ID"
            }
        }
    });*/
    service.push(<testTemplateFileService>{
        artifact: `${projectPath}storage${sep}tsconfig.json`,
        command: {
            fs: {
                action: "fs-copy",
                agent: "a5908e8446995926ab2dd037851146a2b3e6416dcdd68856e7350c937d6e92356030c2ee702a39a8a2c6c58dac9adc3d666c28b96ee06ddfcf6fead94f81054e",
                agentType: "device",
                copyAgent: "a5908e8446995926ab2dd037851146a2b3e6416dcdd68856e7350c937d6e92356030c2ee702a39a8a2c6c58dac9adc3d666c28b96ee06ddfcf6fead94f81054e",
                copyType: "device",
                depth: 1,
                id: "test-ID",
                location: [`${projectPath}tsconfig.json`],
                name: `${projectPath}storage`,
                watch: "no"
            }
        },
        name: "fs:fs-copy, Copy Remote Device to Same Remote Device 1",
        qualifier: "contains",
        test: "fs-update-remote"
    });
    service.push(<testTemplateFileService>{
        artifact: `${projectPath}storage${sep}tsconfig.json`,
        command: {
            fs: {
                action: "fs-copy",
                agent: "a5908e8446995926ab2dd037851146a2b3e6416dcdd68856e7350c937d6e92356030c2ee702a39a8a2c6c58dac9adc3d666c28b96ee06ddfcf6fead94f81054e",
                agentType: "device",
                copyAgent: "a5908e8446995926ab2dd037851146a2b3e6416dcdd68856e7350c937d6e92356030c2ee702a39a8a2c6c58dac9adc3d666c28b96ee06ddfcf6fead94f81054e",
                copyType: "device",
                depth: 1,
                id: "test-ID",
                location: [`${projectPath}tsconfig.json`],
                name: `${projectPath}storage`,
                watch: "no"
            }
        },
        name: "fs:fs-copy, Copy Remote Device to Same Remote Device 2",
        qualifier: "contains",
        test: `["${windowsPath}storage","directory"`
    });
    service.push(<testTemplateFileService>{
        artifact: `${projectPath}storage${sep}tsconfig.json`,
        command: {
            fs: {
                action: "fs-copy",
                agent: "a5908e8446995926ab2dd037851146a2b3e6416dcdd68856e7350c937d6e92356030c2ee702a39a8a2c6c58dac9adc3d666c28b96ee06ddfcf6fead94f81054e",
                agentType: "device",
                copyAgent: "a5908e8446995926ab2dd037851146a2b3e6416dcdd68856e7350c937d6e92356030c2ee702a39a8a2c6c58dac9adc3d666c28b96ee06ddfcf6fead94f81054e",
                copyType: "device",
                depth: 1,
                id: "test-ID",
                location: [`${projectPath}tsconfig.json`],
                name: `${projectPath}storage`,
                watch: "no"
            }
        },
        name: "fs:fs-copy, Copy Remote Device to Same Remote Device 3",
        qualifier: "contains",
        test: "\"agent\":\"a5908e8446995926ab2dd037851146a2b3e6416dcdd68856e7350c937d6e92356030c2ee702a39a8a2c6c58dac9adc3d666c28b96ee06ddfcf6fead94f81054e\""
    });
    service.push(<testTemplateFileService>{
        command: {
            fs: {
                action: "fs-details",
                agent: serverVars.hashDevice,
                agentType: "device",
                copyAgent: "",
                copyType: "device",
                depth: 1,
                id: "test-ID",
                location: [`${projectPath}tsconfig.json`],
                name: "",
                watch: "no"
            }
        },
        name: "fs:fs-details, Details of Local tsconfig.json",
        qualifier: "is",
        test: {
            dirs: [
                [`${projectPath}tsconfig.json`,"file","",0,0,"stat"]
            ],
            fail: [],
            id: "test-ID"
        }
    });
    service.push(<testTemplateFileService>{
        command: {
            fs: {
                action: "fs-details",
                agent: "a5908e8446995926ab2dd037851146a2b3e6416dcdd68856e7350c937d6e92356030c2ee702a39a8a2c6c58dac9adc3d666c28b96ee06ddfcf6fead94f81054e",
                agentType: "device",
                copyAgent: "",
                copyType: "device",
                depth: 1,
                id: "test-ID",
                location: [`${projectPath}tsconfig.json`],
                name: "",
                watch: "no"
            }
        },
        name: "fs:fs-details, Details of Remote Device tsconfig.json",
        qualifier: "is",
        test: {
            dirs: [
                [`${projectPath}tsconfig.json`,"file","",0,0,"stat"]
            ],
            fail: [],
            id: "test-ID"
        }
    });
    service.push(<testTemplateFileService>{
        command: {
            fs: {
                action: "fs-new",
                agent: serverVars.hashDevice,
                agentType: "device",
                copyAgent: "",
                copyType: "device",
                depth: 1,
                id: "test-ID",
                location: [`${projectPath}serviceTestLocal`],
                name: "directory",
                watch: "no"
            }
        },
        name: "fs:fs-new, Local New Directory",
        qualifier: "is",
        test: `${projectPath}serviceTestLocal created.`
    });
    service.push(<testTemplateFileService>{
        command: {
            fs: {
                action: "fs-new",
                agent: serverVars.hashDevice,
                agentType: "device",
                copyAgent: "",
                copyType: "device",
                depth: 1,
                id: "test-ID",
                location: [`${projectPath}serviceTestLocal.json`],
                name: "file",
                watch: "no"
            }
        },
        name: "fs:fs-new, Local New File",
        qualifier: "is",
        test: `${projectPath}serviceTestLocal.json created.`
    });
    service.push(<testTemplateFileService>{
        command: {
            fs: {
                action: "fs-new",
                agent: "a5908e8446995926ab2dd037851146a2b3e6416dcdd68856e7350c937d6e92356030c2ee702a39a8a2c6c58dac9adc3d666c28b96ee06ddfcf6fead94f81054e",
                agentType: "device",
                copyAgent: "",
                copyType: "device",
                depth: 1,
                id: "test-ID",
                location: [`${projectPath}serviceTestRemote`],
                name: "directory",
                watch: "no"
            }
        },
        name: "fs:fs-new, Remote Device New Directory",
        qualifier: "is",
        test: `${projectPath}serviceTestRemote created.`
    });
    service.push(<testTemplateFileService>{
        command: {
            fs: {
                action: "fs-new",
                agent: "a5908e8446995926ab2dd037851146a2b3e6416dcdd68856e7350c937d6e92356030c2ee702a39a8a2c6c58dac9adc3d666c28b96ee06ddfcf6fead94f81054e",
                agentType: "device",
                copyAgent: "",
                copyType: "device",
                depth: 1,
                id: "test-ID",
                location: [`${projectPath}serviceTestRemote.json`],
                name: "file",
                watch: "no"
            }
        },
        name: "fs:fs-new, Remote Device New File",
        qualifier: "is",
        test: `${projectPath}serviceTestRemote.json created.`
    });
    service.push(<testTemplateFileService>{
        command: {
            fs: {
                action: "fs-write",
                agent: serverVars.hashDevice,
                agentType: "device",
                copyAgent: "",
                copyType: "device",
                depth: 1,
                id: "test-ID",
                location: [`${projectPath}serviceTestLocal.json`],
                name: "local text fragment",
                watch: "no"
            }
        },
        name: "fs:fs-write, Write Local",
        qualifier: "is",
        test: `File ${projectPath}serviceTestLocal.json saved to disk on local device.`
    });
    service.push(<testTemplateFileService>{
        command: {
            fs: {
                action: "fs-write",
                agent: "a5908e8446995926ab2dd037851146a2b3e6416dcdd68856e7350c937d6e92356030c2ee702a39a8a2c6c58dac9adc3d666c28b96ee06ddfcf6fead94f81054e",
                agentType: "device",
                copyAgent: "",
                copyType: "device",
                depth: 1,
                id: "test-ID",
                location: [`${projectPath}serviceTestRemote.json`],
                name: "remote device text fragment",
                watch: "no"
            }
        },
        name: "fs:fs-write, Write Remote Device to Local",
        qualifier: "is",
        test: `File ${projectPath}serviceTestRemote.json saved to disk on device a5908e8446995926ab2dd037851146a2b3e6416dcdd68856e7350c937d6e92356030c2ee702a39a8a2c6c58dac9adc3d666c28b96ee06ddfcf6fead94f81054e.`
    });
    service.push(<testTemplateFileService>{
        command: {
            fs: {
                action: "fs-read",
                agent: serverVars.hashDevice,
                agentType: "device",
                copyAgent: "",
                copyType: "device",
                depth: 1,
                id: "test-ID",
                location: [`${projectPath}serviceTestLocal.json`],
                name: "",
                watch: "no"
            }
        },
        name: "fs:fs-read, Read Local",
        qualifier: "is",
        test: [{
            content: "local text fragment",
            id: "test-ID",
            path: `${projectPath}serviceTestLocal.json`
        }]
    });
    service.push(<testTemplateFileService>{
        command: {
            fs: {
                action: "fs-read",
                agent: "a5908e8446995926ab2dd037851146a2b3e6416dcdd68856e7350c937d6e92356030c2ee702a39a8a2c6c58dac9adc3d666c28b96ee06ddfcf6fead94f81054e",
                agentType: "device",
                copyAgent: "",
                copyType: "device",
                depth: 1,
                id: "test-ID",
                location: [`${projectPath}serviceTestRemote.json`],
                name: "",
                watch: "no"
            }
        },
        name: "fs:fs-read, Read Remote Device",
        qualifier: "is",
        test: [{
            content: "remote device text fragment",
            id: "test-ID",
            path: `${projectPath}serviceTestRemote.json`
        }]
    });
    service.push(<testTemplateFileService>{
        command: {
            fs: {
                action: "fs-rename",
                agent: serverVars.hashDevice,
                agentType: "device",
                copyAgent: "",
                copyType: "device",
                depth: 1,
                id: "test-ID",
                location: [`${projectPath}serviceTestLocal`],
                name: "serviceLocal",
                watch: "no"
            }
        },
        name: "fs:fs-rename, Rename Local Directory",
        qualifier: "is",
        test: `Path ${projectPath}serviceTestLocal on device ${serverVars.hashDevice} renamed to ${projectPath}serviceLocal.`
    });
    service.push(<testTemplateFileService>{
        command: {
            fs: {
                action: "fs-rename",
                agent: serverVars.hashDevice,
                agentType: "device",
                copyAgent: "",
                copyType: "device",
                depth: 1,
                id: "test-ID",
                location: [`${projectPath}serviceTestLocal.json`],
                name: "serviceLocal.json",
                watch: "no"
            }
        },
        name: "fs:fs-rename, Rename Local File",
        qualifier: "is",
        test: `Path ${projectPath}serviceTestLocal.json on device ${serverVars.hashDevice} renamed to ${projectPath}serviceLocal.json.`
    });
    service.push(<testTemplateFileService>{
        command: {
            fs: {
                action: "fs-rename",
                agent: "a5908e8446995926ab2dd037851146a2b3e6416dcdd68856e7350c937d6e92356030c2ee702a39a8a2c6c58dac9adc3d666c28b96ee06ddfcf6fead94f81054e",
                agentType: "device",
                copyAgent: "",
                copyType: "device",
                depth: 1,
                id: "test-ID",
                location: [`${projectPath}serviceTestRemote`],
                name: "serviceRemote",
                watch: "no"
            }
        },
        name: "fs:fs-rename, Rename Remote Device Directory",
        qualifier: "is",
        test: `Path ${projectPath}serviceTestRemote on device a5908e8446995926ab2dd037851146a2b3e6416dcdd68856e7350c937d6e92356030c2ee702a39a8a2c6c58dac9adc3d666c28b96ee06ddfcf6fead94f81054e renamed to ${projectPath}serviceRemote.`
    });
    service.push(<testTemplateFileService>{
        command: {
            fs: {
                action: "fs-rename",
                agent: "a5908e8446995926ab2dd037851146a2b3e6416dcdd68856e7350c937d6e92356030c2ee702a39a8a2c6c58dac9adc3d666c28b96ee06ddfcf6fead94f81054e",
                agentType: "device",
                copyAgent: "",
                copyType: "device",
                depth: 1,
                id: "test-ID",
                location: [`${projectPath}serviceTestRemote.json`],
                name: "serviceRemote.json",
                watch: "no"
            }
        },
        name: "fs:fs-rename, Rename Remote Device File",
        qualifier: "is",
        test: `Path ${projectPath}serviceTestRemote.json on device a5908e8446995926ab2dd037851146a2b3e6416dcdd68856e7350c937d6e92356030c2ee702a39a8a2c6c58dac9adc3d666c28b96ee06ddfcf6fead94f81054e renamed to ${projectPath}serviceRemote.json.`
    });
    service.push(<testTemplateFileService>{
        command: {
            fs: {
                action: "fs-destroy",
                agent: serverVars.hashDevice,
                agentType: "device",
                copyAgent: "",
                copyType: "device",
                depth: 1,
                id: "test-ID",
                location: [`${projectPath}serviceLocal`],
                name: "",
                watch: "no"
            }
        },
        name: "fs:fs-destroy, Destroy Local Directory",
        qualifier: "is",
        test: `Path(s) ${projectPath}serviceLocal destroyed on device ${serverVars.hashDevice}.`
    });
    service.push(<testTemplateFileService>{
        command: {
            fs: {
                action: "fs-destroy",
                agent: serverVars.hashDevice,
                agentType: "device",
                copyAgent: "",
                copyType: "device",
                depth: 1,
                id: "test-ID",
                location: [`${projectPath}serviceLocal.json`],
                name: "",
                watch: "no"
            }
        },
        name: "fs:fs-destroy, Destroy Local File",
        qualifier: "is",
        test: `Path(s) ${projectPath}serviceLocal.json destroyed on device ${serverVars.hashDevice}.`
    });
    service.push(<testTemplateFileService>{
        command: {
            fs: {
                action: "fs-destroy",
                agent: "a5908e8446995926ab2dd037851146a2b3e6416dcdd68856e7350c937d6e92356030c2ee702a39a8a2c6c58dac9adc3d666c28b96ee06ddfcf6fead94f81054e",
                agentType: "device",
                copyAgent: "",
                copyType: "device",
                depth: 1,
                id: "test-ID",
                location: [`${projectPath}serviceRemote`],
                name: "",
                watch: "no"
            }
        },
        name: "fs:fs-destroy, Destroy Remote Device Directory",
        qualifier: "is",
        test: `Path(s) ${projectPath}serviceRemote destroyed on device a5908e8446995926ab2dd037851146a2b3e6416dcdd68856e7350c937d6e92356030c2ee702a39a8a2c6c58dac9adc3d666c28b96ee06ddfcf6fead94f81054e.`
    });
    service.push(<testTemplateFileService>{
        command: {
            fs: {
                action: "fs-destroy",
                agent: "a5908e8446995926ab2dd037851146a2b3e6416dcdd68856e7350c937d6e92356030c2ee702a39a8a2c6c58dac9adc3d666c28b96ee06ddfcf6fead94f81054e",
                agentType: "device",
                copyAgent: "",
                copyType: "device",
                depth: 1,
                id: "test-ID",
                location: [`${projectPath}serviceRemote.json`],
                name: "",
                watch: "no"
            }
        },
        name: "fs:fs-destroy, Destroy Remote Device File",
        qualifier: "is",
        test: `Path(s) ${projectPath}serviceRemote.json destroyed on device a5908e8446995926ab2dd037851146a2b3e6416dcdd68856e7350c937d6e92356030c2ee702a39a8a2c6c58dac9adc3d666c28b96ee06ddfcf6fead94f81054e.`
    });
    service.push(<testTemplateFileService>{
        command: {
            fs: {
                action: "fs-hash",
                agent: serverVars.hashDevice,
                agentType: "device",
                copyAgent: "",
                copyType: "device",
                depth: 1,
                id: "test-ID",
                location: [`some-modal-id:${projectPath}tsconfig.json`],
                name: "",
                watch: "no"
            }
        },
        name: "fs:fs-hash, Hash Local",
        qualifier: "is",
        test: [{
            content: hash,
            id: "some-modal-id",
            path: `${projectPath}tsconfig.json`
        }]
    });
    service.push(<testTemplateFileService>{
        command: {
            fs: {
                action: "fs-hash",
                agent: "a5908e8446995926ab2dd037851146a2b3e6416dcdd68856e7350c937d6e92356030c2ee702a39a8a2c6c58dac9adc3d666c28b96ee06ddfcf6fead94f81054e",
                agentType: "device",
                copyAgent: "",
                copyType: "device",
                depth: 1,
                id: "test-ID",
                location: [`some-modal-id:${projectPath}tsconfig.json`],
                name: "",
                watch: "no"
            }
        },
        name: "fs:fs-hash, Hash Remote Device",
        qualifier: "is",
        test: [{
            content: hash,
            id: "some-modal-id",
            path: `${projectPath}tsconfig.json`
        }]
    });
    service.push(<testTemplateFileService>{
        command: {
            fs: {
                action: "fs-directory",
                agent: serverVars.hashDevice,
                agentType: "device",
                copyAgent: "",
                copyType: "device",
                depth: 2,
                id: "test-ID",
                location: [`${projectPath}js${sep}lib`],
                name: ".js",
                watch: "no"
            }
        },
        name: "fs:fs-directory, Directory Local 1",
        qualifier: "begins",
        test: "{\"dirs\":[["
    });
    service.push(<testTemplateFileService>{
        command: {
            fs: {
                action: "fs-directory",
                agent: serverVars.hashDevice,
                agentType: "device",
                copyAgent: "",
                copyType: "device",
                depth: 2,
                id: "test-ID",
                location: [`${projectPath}js${sep}lib`],
                name: ".js",
                watch: "no"
            }
        },
        name: "fs:fs-directory, Directory Local 2",
        qualifier: "contains",
        test: `["${windowsPath}js${windowsSep}lib${windowsSep}browser${windowsSep}fs.js","file"`
    });
    service.push(<testTemplateFileService>{
        command: {
            fs: {
                action: "fs-directory",
                agent: "a5908e8446995926ab2dd037851146a2b3e6416dcdd68856e7350c937d6e92356030c2ee702a39a8a2c6c58dac9adc3d666c28b96ee06ddfcf6fead94f81054e",
                agentType: "device",
                copyAgent: "",
                copyType: "device",
                depth: 2,
                id: "test-ID",
                location: [`${projectPath}js${sep}lib`],
                name: ".js",
                watch: "no"
            }
        },
        name: "fs:fs-directory, Directory Remote Device 1",
        qualifier: "begins",
        test: "{\"dirs\":[["
    });
    service.push(<testTemplateFileService>{
        command: {
            fs: {
                action: "fs-directory",
                agent: "a5908e8446995926ab2dd037851146a2b3e6416dcdd68856e7350c937d6e92356030c2ee702a39a8a2c6c58dac9adc3d666c28b96ee06ddfcf6fead94f81054e",
                agentType: "device",
                copyAgent: "",
                copyType: "device",
                depth: 2,
                id: "test-ID",
                location: [`${projectPath}js${sep}lib`],
                name: ".js",
                watch: "no"
            }
        },
        name: "fs:fs-directory, Directory Remote Device 2",
        qualifier: "contains",
        test: `["${windowsPath}js${windowsSep}lib${windowsSep}browser${windowsSep}fs.js","file"`
    });
    service.push(<testTemplateFileService>{
        command: {
            fs: {
                action: "fs-search",
                agent: serverVars.hashDevice,
                agentType: "device",
                copyAgent: "",
                copyType: "device",
                depth: 0,
                id: "test-ID",
                location: [`${projectPath}`],
                name: ".js",
                watch: "no"
            }
        },
        name: "fs:fs-search, Search Local 1",
        qualifier: "begins",
        test: "{\"dirs\":[["
    });
    service.push(<testTemplateFileService>{
        command: {
            fs: {
                action: "fs-search",
                agent: serverVars.hashDevice,
                agentType: "device",
                copyAgent: "",
                copyType: "device",
                depth: 0,
                id: "test-ID",
                location: [`${projectPath}`],
                name: ".js",
                watch: "no"
            }
        },
        name: "fs:fs-search, Search Local 2",
        qualifier: "contains",
        test: `["${windowsPath}js${windowsSep}lib${windowsSep}browser${windowsSep}fs.js","file"`
    });
    service.push(<testTemplateFileService>{
        command: {
            fs: {
                action: "fs-search",
                agent: "a5908e8446995926ab2dd037851146a2b3e6416dcdd68856e7350c937d6e92356030c2ee702a39a8a2c6c58dac9adc3d666c28b96ee06ddfcf6fead94f81054e",
                agentType: "device",
                copyAgent: "",
                copyType: "device",
                depth: 0,
                id: "test-ID",
                location: [`${projectPath}`],
                name: ".js",
                watch: "no"
            }
        },
        name: "fs:fs-search, Search Remote Device 1",
        qualifier: "begins",
        test: "{\"dirs\":[["
    });
    service.push(<testTemplateFileService>{
        command: {
            fs: {
                action: "fs-search",
                agent: "a5908e8446995926ab2dd037851146a2b3e6416dcdd68856e7350c937d6e92356030c2ee702a39a8a2c6c58dac9adc3d666c28b96ee06ddfcf6fead94f81054e",
                agentType: "device",
                copyAgent: "",
                copyType: "device",
                depth: 0,
                id: "test-ID",
                location: [`${projectPath}`],
                name: ".js",
                watch: "no"
            }
        },
        name: "fs:fs-search, Search Remote Device 2",
        qualifier: "contains",
        test: `["${windowsPath}js${windowsSep}lib${windowsSep}browser${windowsSep}fs.js","file"`
    });
    service.push(<testTemplateUpdateRemote>{
        command: {
            "fs-update-remote": {
                agent: "a5908e8446995926ab2dd037851146a2b3e6416dcdd68856e7350c937d6e92356030c2ee702a39a8a2c6c58dac9adc3d666c28b96ee06ddfcf6fead94f81054e",
                agentType: "device",
                dirs: [
                    [`${projectPath}storage${sep}storage.txt`, "file", "", 0, 0, "stat"]
                ],
                fail: [],
                location: `${projectPath}storage`,
                status: "test payload"
            }
        },
        name: "fs-update-remote, Local",
        qualifier: "is",
        test: `Received directory watch for {"fs-update-remote":{"agent":"a5908e8446995926ab2dd037851146a2b3e6416dcdd68856e7350c937d6e92356030c2ee702a39a8a2c6c58dac9adc3d666c28b96ee06ddfcf6fead94f81054e","agentType":"device","dirs":[["${windowsPath}storage${windowsSep}storage.txt","file","",0,0,"stat"]],"fail":[],"location":"${windowsPath}storage","status":"test payload"}} at XXXX `
    });
    service.push(<testTemplateSettings>{
        command: {
            settings: {
                audio: true,
                brotli: 7,
                color: "default",
                colors: {
                    device: {
                        [serverVars.hashDevice]: ["fff", "eee"]
                    },
                    user: {}
                },
                hashDevice: serverVars.hashDevice,
                hashType: "sha3-512",
                hashUser: serverVars.hashUser,
                modals: {
                    "systems-modal": {
                        agent: serverVars.hashDevice,
                        agentType: "device",
                        content: null,
                        inputs: [
                            "close", "maximize", "minimize"
                        ],
                        read_only: false,
                        single: true,
                        status: "hidden",
                        title: "<span class=\"icon-systemLog\">⌬</span> System Log",
                        type: "systems",
                        width: 800,
                        zIndex: 1,
                        id: "systems-modal",
                        left: 200,
                        top: 200,
                        height: 400
                    },
                },
                modalTypes: [
                    "systems", "settings", "fileNavigate", "invite-request"
                ],
                nameDevice: "this device name",
                nameUser: "local user name",
                zIndex: 6
            }
        },
        name: "settings, Local settings storage without HTTP response",
        qualifier: "is",
        test: "settings storage written with false response for testing."
    });
    service.push(<testTemplateMessages>{
        command: {
            messages: {
                status: [],
                users: [],
                errors: [
                    [
                        "[17 FEB 2020, 13:59:00.878]","EPERM: operation not permitted, rename 'settings-0.15976829605695686.json' -> 'settings.json'", [
                            "terminal_error_errorOut (file:///share-file-systems/js/lib/terminal/error.js:23:32))",
                            "Object.terminal_error [as error] (file:///share-file-systems/js/lib/terminal/error.js:103:9))",
                            "terminal_server_storage_renameNode (file:///share-file-systems/js/lib/terminal/server/storage.js:13:25))",
                            "FSReqCallback.oncomplete (fs.js:154:23)"
                        ]
                    ]
                ]
            }
        },
        name: "messages, Local messages storage without HTTP response",
        qualifier: "is",
        test: "messages storage written with false response for testing."
    });
    service.push(<testTemplateDevice>{
        command: {
            device: {
                [serverVars.hashDevice]: {
                    ip: loopback,
                    name: "local device name",
                    port: 80,
                    shares: {
                        [serverVars.hashDevice]: {
                            execute: false,
                            name: "C:\\mp3",
                            readOnly: false,
                            type: "directory"
                        }
                    }
                }
            }
        },
        name: "device storage, Local device storage without HTTP response",
        qualifier: "is",
        test: "device storage written with false response for testing."
    });
    service.push(<testTemplateUser>{
        command: {
            user: {
                [serverVars.hashDevice]: {
                    ip: loopback,
                    name: "remote user name",
                    port: 80,
                    shares: {
                        [serverVars.hashDevice]: {
                            execute: false,
                            name: "C:\\movies",
                            readOnly: false,
                            type: "directory"
                        }
                    }
                }
            }
        },
        name: "user storage, Local user storage without HTTP response",
        qualifier: "is",
        test: "user storage written with false response for testing."
    });
    service.push(<testTemplateInvite>{
        command: {
            invite: {
                action: "invite",
                deviceHash: serverVars.hashDevice,
                deviceName: "old desktop computer",
                message: "Hello",
                name: "",
                ip: loopback,
                modal: "test-modal",
                port: 80,
                shares: {
                    "76e9d9d3e3d66051b793b980f21ab270e14fa3c2682a4f9a047ce104c853291ab846669d4305aeda67126af6850c06bc168cda9610f3d730a601185e29ee20be": {
                        execute: false,
                        name: "C:\\music",
                        readOnly: true,
                        type: "directory"
                    }
                },
                status: "invited",
                type: "device",
                userHash: "21ca7db79e6eb80ea103c4a10f7dee9b6ee3116717579ee9f06808a0eb8b8f416d063512c8fd91199d9fa17fbafaa9dccb93034530a8e473dffd321aca1ec872",
                userName: "local user name"
            }
        },
        name: "invite, invite - Local device invite",
        qualifier: "is",
        test: `Invitation received at start terminal XXXX from start browser. Sending invitation to remote terminal: XXXX `
    });
    service.push(<testTemplateInvite>{
        command: {
            invite: {
                action: "invite-request",
                deviceHash: serverVars.hashDevice,
                deviceName: "old desktop computer",
                message: "Hello",
                name: "",
                ip: loopback,
                modal: "test-modal",
                port: 80,
                shares: {
                    "76e9d9d3e3d66051b793b980f21ab270e14fa3c2682a4f9a047ce104c853291ab846669d4305aeda67126af6850c06bc168cda9610f3d730a601185e29ee20be": {
                        execute: false,
                        name: "C:\\music",
                        readOnly: true,
                        type: "directory"
                    }
                },
                status: "invited",
                type: "device",
                userHash: "21ca7db79e6eb80ea103c4a10f7dee9b6ee3116717579ee9f06808a0eb8b8f416d063512c8fd91199d9fa17fbafaa9dccb93034530a8e473dffd321aca1ec872",
                userName: "local user name"
            }
        },
        name: "invite, invite-request - Local device invite",
        qualifier: "is",
        test: `Invitation received at remote terminal XXXX and sent to remote browser.`
    });
    service.push(<testTemplateInvite>{
        command: {
            invite: {
                action: "invite-response",
                deviceHash: serverVars.hashDevice,
                deviceName: "old desktop computer",
                message: "Hello",
                name: "",
                ip: loopback,
                modal: "test-modal",
                port: 80,
                shares: {
                    "76e9d9d3e3d66051b793b980f21ab270e14fa3c2682a4f9a047ce104c853291ab846669d4305aeda67126af6850c06bc168cda9610f3d730a601185e29ee20be": {
                        execute: false,
                        name: "C:\\music",
                        readOnly: true,
                        type: "directory"
                    }
                },
                status: "invited",
                type: "device",
                userHash: "21ca7db79e6eb80ea103c4a10f7dee9b6ee3116717579ee9f06808a0eb8b8f416d063512c8fd91199d9fa17fbafaa9dccb93034530a8e473dffd321aca1ec872",
                userName: "local user name"
            }
        },
        name: "invite, invite-response - Local device invite",
        qualifier: "is",
        test: `Ignored invitation response processed at remote terminal XXXX and sent to start terminal.`
    });
    service.push(<testTemplateInvite>{
        command: {
            invite: {
                action: "invite-response",
                deviceHash: serverVars.hashDevice,
                deviceName: "old desktop computer",
                message: "Hello",
                name: "",
                ip: loopback,
                modal: "test-modal",
                port: 80,
                shares: {
                    "76e9d9d3e3d66051b793b980f21ab270e14fa3c2682a4f9a047ce104c853291ab846669d4305aeda67126af6850c06bc168cda9610f3d730a601185e29ee20be": {
                        execute: false,
                        name: "C:\\music",
                        readOnly: true,
                        type: "directory"
                    }
                },
                status: "accepted",
                type: "device",
                userHash: "21ca7db79e6eb80ea103c4a10f7dee9b6ee3116717579ee9f06808a0eb8b8f416d063512c8fd91199d9fa17fbafaa9dccb93034530a8e473dffd321aca1ec872",
                userName: "local user name"
            }
        },
        name: "invite, invite-response - Local device invite response, accepted",
        qualifier: "is",
        test: `Accepted invitation response processed at remote terminal XXXX and sent to start terminal.`
    });
    service.push(<testTemplateInvite>{
        command: {
            invite: {
                action: "invite-response",
                deviceHash: serverVars.hashDevice,
                deviceName: "old desktop computer",
                message: "Hello",
                name: "",
                ip: loopback,
                modal: "test-modal",
                port: 80,
                shares: {
                    "76e9d9d3e3d66051b793b980f21ab270e14fa3c2682a4f9a047ce104c853291ab846669d4305aeda67126af6850c06bc168cda9610f3d730a601185e29ee20be": {
                        execute: false,
                        name: "C:\\music",
                        readOnly: true,
                        type: "directory"
                    }
                },
                status: "invited",
                type: "device",
                userHash: "21ca7db79e6eb80ea103c4a10f7dee9b6ee3116717579ee9f06808a0eb8b8f416d063512c8fd91199d9fa17fbafaa9dccb93034530a8e473dffd321aca1ec872",
                userName: "local user name"
            }
        },
        name: "invite, invite-response - Local device invite response, ignored",
        qualifier: "is",
        test: `Ignored invitation response processed at remote terminal XXXX and sent to start terminal.`
    });
    service.push(<testTemplateInvite>{
        command: {
            invite: {
                action: "invite-response",
                deviceHash: serverVars.hashDevice,
                deviceName: "old desktop computer",
                message: "Hello",
                name: "",
                ip: loopback,
                modal: "test-modal",
                port: 80,
                shares: {
                    "76e9d9d3e3d66051b793b980f21ab270e14fa3c2682a4f9a047ce104c853291ab846669d4305aeda67126af6850c06bc168cda9610f3d730a601185e29ee20be": {
                        execute: false,
                        name: "C:\\music",
                        readOnly: true,
                        type: "directory"
                    }
                },
                status: "declined",
                type: "device",
                userHash: "21ca7db79e6eb80ea103c4a10f7dee9b6ee3116717579ee9f06808a0eb8b8f416d063512c8fd91199d9fa17fbafaa9dccb93034530a8e473dffd321aca1ec872",
                userName: "local user name"
            }
        },
        name: "invite, invite-response - Local device invite response, declined",
        qualifier: "is",
        test: `Declined invitation response processed at remote terminal XXXX and sent to start terminal.`
    });
    service.push(<testTemplateInvite>{
        command: {
            invite: {
                action: "invite-complete",
                deviceHash: serverVars.hashDevice,
                deviceName: "old desktop computer",
                message: "Hello",
                name: "",
                ip: loopback,
                modal: "test-modal",
                port: 80,
                shares: {
                    "76e9d9d3e3d66051b793b980f21ab270e14fa3c2682a4f9a047ce104c853291ab846669d4305aeda67126af6850c06bc168cda9610f3d730a601185e29ee20be": {
                        execute: false,
                        name: "C:\\music",
                        readOnly: true,
                        type: "directory"
                    }
                },
                status: "accepted",
                type: "device",
                userHash: "21ca7db79e6eb80ea103c4a10f7dee9b6ee3116717579ee9f06808a0eb8b8f416d063512c8fd91199d9fa17fbafaa9dccb93034530a8e473dffd321aca1ec872",
                userName: "local user name"
            }
        },
        name: "invite, invite-complete - Local user invite complete, accepted",
        qualifier: "is",
        test: "Accepted invitation returned to XXXX from this local terminal XXXX and to the local browser(s)."
    });
    service.push(<testTemplateInvite>{
        command: {
            invite: {
                action: "invite-complete",
                deviceHash: serverVars.hashDevice,
                deviceName: "old desktop computer",
                message: "Hello",
                name: "",
                ip: loopback,
                modal: "test-modal",
                port: 80,
                shares: {
                    "76e9d9d3e3d66051b793b980f21ab270e14fa3c2682a4f9a047ce104c853291ab846669d4305aeda67126af6850c06bc168cda9610f3d730a601185e29ee20be": {
                        execute: false,
                        name: "C:\\music",
                        readOnly: true,
                        type: "directory"
                    }
                },
                status: "invited",
                type: "device",
                userHash: "21ca7db79e6eb80ea103c4a10f7dee9b6ee3116717579ee9f06808a0eb8b8f416d063512c8fd91199d9fa17fbafaa9dccb93034530a8e473dffd321aca1ec872",
                userName: "local user name"
            }
        },
        name: "invite, invite-complete - Local user invite complete, ignored",
        qualifier: "is",
        test: "Ignored invitation returned to XXXX from this local terminal XXXX and to the local browser(s)."
    });
    service.push(<testTemplateHeartbeatBroadcast>{
        command: {
            "heartbeat-broadcast": {
                agentFrom: "localhost-browser",
                shareFrom: serverVars.hashDevice,
                shares: {
                    "76e9d9d3e3d66051b793b980f21ab270e14fa3c2682a4f9a047ce104c853291ab846669d4305aeda67126af6850c06bc168cda9610f3d730a601185e29ee20be": {
                        execute: false,
                        name: "C:\\music",
                        readOnly: true,
                        type: "directory"
                    }
                },
                status: "active"
            }
        },
        name: "heartbeat-broadcast, from Browser",
        qualifier: "is",
        test: "Heartbeat response received for each remote terminal."
    });
    service.push(<testTemplateHeartbeatBroadcast>{
        command: {
            "heartbeat-broadcast": {
                agentFrom: "localhost-terminal",
                shareFrom: serverVars.hashDevice,
                shares: {
                    "76e9d9d3e3d66051b793b980f21ab270e14fa3c2682a4f9a047ce104c853291ab846669d4305aeda67126af6850c06bc168cda9610f3d730a601185e29ee20be": {
                        execute: false,
                        name: "C:\\music",
                        readOnly: true,
                        type: "directory"
                    }
                },
                status: "active"
            }
        },
        name: "heartbeat-broadcast, from Terminal",
        qualifier: "is",
        test: "Heartbeat response received for each remote terminal."
    });
    service.push(<testTemplateHeartbeat>{
        command: {
            heartbeat: {
                agentFrom: serverVars.hashDevice,
                agentTo: "a5908e8446995926ab2dd037851146a2b3e6416dcdd68856e7350c937d6e92356030c2ee702a39a8a2c6c58dac9adc3d666c28b96ee06ddfcf6fead94f81054e",
                agentType: "device",
                shareFrom: serverVars.hashDevice,
                shares: {
                    "a5908e8446995926ab2dd037851146a2b3e6416dcdd68856e7350c937d6e92356030c2ee702a39a8a2c6c58dac9adc3d666c28b96ee06ddfcf6fead94f81054e": {
                        "ip"    : "::1",
                        "name"  : "test device laptop",
                        "port"  : 0,
                        "shares": {
                            "ccd7be8a1603ae4ca8d39f142e538c18fa16b157ce8f315a0f8a66060b3fbe71fa429bc309c964e8b8ce6c7cf699b4802777a99b5c961e8419ae24d6bfaf241b": {
                                "execute" : false,
                                "name"    : "C:\\mp3\\deviceLaptop",
                                "readOnly": true,
                                "type"    : "directory"
                            },
                            "1a36a5c57a86e6015aff4a2888d1e399d7a8b74d306952f01243822f84812174224feee82760d90883b300cb3848f2ef4c41cc00a703101b47b314c6af5894ee": {
                                "execute" : false,
                                "name"    : "E:\\deviceLaptop",
                                "readOnly": false,
                                "type"    : "directory"
                            },
                            "0d8e80125088946594d6d80070e833b978a466e9789504e51c67462d09133f33994d0ea06cf9006d4d7fc651a5adceab72b6b80797166288458cfb53d021dbc6": {
                                "execute" : false,
                                "name"    : "C:\\deviceLaptop\\notes.pdf",
                                "readOnly": true,
                                "type"    : "file"
                            }
                        }
                    },
                    "fa042a71aee124b7b667d97fd84c0a309e72aefcae5d95762bc05d39cbeedae88122758f8625910a669271251d5f561a1c2749c6d66664f5d35dcc8c608c1a89": {
                        "ip"    : "::1",
                        "name"  : "test device desktop",
                        "port"  : 0,
                        "shares": {
                            "36b0d1a2ddc81858b0339d3296b4f69513b779a122ec279ea71a1cb50231952e5f5ba9197c6438e91cd3d8bd6b3d5feee78ce4fd0e4386abe3af0487449a02d7": {
                                "execute" : false,
                                "name"    : "C:\\mp3\\deviceDesktop",
                                "readOnly": true,
                                "type"    : "directory"
                            },
                            "71f79d5cc211b5fa52f95a33ad9aaa4b6bf3ad3951ac06365ee316e5f4da70811fd3ed8fa585024009683cf83e40fd31211b1a36324dfc79148d12dea16fbcef": {
                                "execute" : false,
                                "name"    : "E:\\deviceDesktop",
                                "readOnly": false,
                                "type"    : "directory"
                            },
                            "768b031d795208e4adca58a4908161e77d61132c3e6ef5a76960fcd51b05f1e96ada60af01b3a9561f5c061a6e9dabc311e9970853b8b5ce0c1f0966b02315e7": {
                                "execute" : false,
                                "name"    : "C:\\deviceDesktop\\notes.pdf",
                                "readOnly": true,
                                "type"    : "file"
                            }
                        }
                    }
                },
                status: "active"
            }
        },
        name: "heartbeat, regular heartbeat",
        qualifier: "is",
        test: {
            "heartbeat-response-device": {
                agentFrom: serverVars.hashDevice,
                agentTo: serverVars.hashDevice,
                agentType: "device",
                shareFrom: serverVars.hashDevice,
                shares: {
                    "a5908e8446995926ab2dd037851146a2b3e6416dcdd68856e7350c937d6e92356030c2ee702a39a8a2c6c58dac9adc3d666c28b96ee06ddfcf6fead94f81054e": {
                        "ip"    : "::1",
                        "name"  : "test device laptop",
                        "port"  : 0,
                        "shares": {
                            "ccd7be8a1603ae4ca8d39f142e538c18fa16b157ce8f315a0f8a66060b3fbe71fa429bc309c964e8b8ce6c7cf699b4802777a99b5c961e8419ae24d6bfaf241b": {
                                "execute" : false,
                                "name"    : "C:\\mp3\\deviceLaptop",
                                "readOnly": true,
                                "type"    : "directory"
                            },
                            "1a36a5c57a86e6015aff4a2888d1e399d7a8b74d306952f01243822f84812174224feee82760d90883b300cb3848f2ef4c41cc00a703101b47b314c6af5894ee": {
                                "execute" : false,
                                "name"    : "E:\\deviceLaptop",
                                "readOnly": false,
                                "type"    : "directory"
                            },
                            "0d8e80125088946594d6d80070e833b978a466e9789504e51c67462d09133f33994d0ea06cf9006d4d7fc651a5adceab72b6b80797166288458cfb53d021dbc6": {
                                "execute" : false,
                                "name"    : "C:\\deviceLaptop\\notes.pdf",
                                "readOnly": true,
                                "type"    : "file"
                            }
                        }
                    },
                    "fa042a71aee124b7b667d97fd84c0a309e72aefcae5d95762bc05d39cbeedae88122758f8625910a669271251d5f561a1c2749c6d66664f5d35dcc8c608c1a89": {
                        "ip"    : "::1",
                        "name"  : "test device desktop",
                        "port"  : 0,
                        "shares": {
                            "36b0d1a2ddc81858b0339d3296b4f69513b779a122ec279ea71a1cb50231952e5f5ba9197c6438e91cd3d8bd6b3d5feee78ce4fd0e4386abe3af0487449a02d7": {
                                "execute" : false,
                                "name"    : "C:\\mp3\\deviceDesktop",
                                "readOnly": true,
                                "type"    : "directory"
                            },
                            "71f79d5cc211b5fa52f95a33ad9aaa4b6bf3ad3951ac06365ee316e5f4da70811fd3ed8fa585024009683cf83e40fd31211b1a36324dfc79148d12dea16fbcef": {
                                "execute" : false,
                                "name"    : "E:\\deviceDesktop",
                                "readOnly": false,
                                "type"    : "directory"
                            },
                            "768b031d795208e4adca58a4908161e77d61132c3e6ef5a76960fcd51b05f1e96ada60af01b3a9561f5c061a6e9dabc311e9970853b8b5ce0c1f0966b02315e7": {
                                "execute" : false,
                                "name"    : "C:\\deviceDesktop\\notes.pdf",
                                "readOnly": true,
                                "type"    : "file"
                            }
                        }
                    }
                },
                status: "active"
            }
        }
    });
    service.push(<testTemplateHeartbeat>{
        command: {
            heartbeat: {
                agentFrom: serverVars.hashUser,
                agentTo: "a5908e8446995926ab2dd037851146a2b3e6416dcdd68856e7350c937d6e92356030c2ee702a39a8a2c6c58dac9adc3d666c28b96ee06ddfcf6fead94f81054e",
                agentType: "device",
                shareFrom: serverVars.hashDevice,
                shares: {
                    "fa042a71aee124b7b667d97fd84c0a309e72aefcae5d95762bc05d39cbeedae88122758f8625910a669271251d5f561a1c2749c6d66664f5d35dcc8c608c1a89": {
                        "ip"    : "::1",
                        "name"  : "test device desktop",
                        "port"  : 0,
                        "shares": {
                            "36b0d1a2ddc81858b0339d3296b4f69513b779a122ec279ea71a1cb50231952e5f5ba9197c6438e91cd3d8bd6b3d5feee78ce4fd0e4386abe3af0487449a02d7": {
                                "execute" : false,
                                "name"    : "C:\\mp3\\deviceDesktop",
                                "readOnly": true,
                                "type"    : "directory"
                            },
                            "71f79d5cc211b5fa52f95a33ad9aaa4b6bf3ad3951ac06365ee316e5f4da70811fd3ed8fa585024009683cf83e40fd31211b1a36324dfc79148d12dea16fbcef": {
                                "execute" : false,
                                "name"    : "E:\\deviceDesktop",
                                "readOnly": false,
                                "type"    : "directory"
                            },
                            "768b031d795208e4adca58a4908161e77d61132c3e6ef5a76960fcd51b05f1e96ada60af01b3a9561f5c061a6e9dabc311e9970853b8b5ce0c1f0966b02315e7": {
                                "execute" : false,
                                "name"    : "C:\\deviceDesktop\\notes.pdf",
                                "readOnly": true,
                                "type"    : "file"
                            }
                        }
                    }
                },
                status: "active"
            }
        },
        name: "heartbeat, Unexpected User",
        qualifier: "is",
        test: "Unexpected user."
    });
};
service.addServers = function test_services_addServers(callback:Function):void {
    const flags = {
            removal: false,
            storage: false
        },
        servers = function test_services_addServers_servers():void {
            const complete = function test_services_addServers_servers_complete(counts:agentCounts):void {
                counts.count = counts.count + 1;
                if (counts.count === counts.total) {
                    callback();
                }
            };
            agents({
                complete: complete,
                countBy: "agent",
                perAgent: function test_services_addServers_servers_perAgent(agentNames:agentNames, counts:agentCounts):void {
                    const serverCallback = function test_services_addServers_servers_perAgent_serverCallback(output:serverOutput):void {
                        serverVars[output.agentType][output.agent].port = output.webPort;
                        serverVars[output.agentType][output.agent].ip = loopback;
                        if (output.agentType === "device" && output.agent === serverVars.hashDevice) {
                            serverVars.wsPort = output.wsPort;
                        }
                        complete(counts);
                    };
                    service.serverRemote[agentNames.agentType][agentNames.agent] = server({
                        agent: agentNames.agent,
                        agentType: agentNames.agentType,
                        callback: serverCallback
                    });
                },
                source: serverVars
            });
        },
        storageComplete = function test_services_addServers_storageComplete(storageData:storageItems):void {

            serverVars.brotli = storageData.settings.brotli;
            serverVars.hashDevice = storageData.settings.hashDevice;
            serverVars.hashType = storageData.settings.hashType;
            serverVars.hashUser = storageData.settings.hashUser;
            serverVars.nameDevice = storageData.settings.nameDevice;
            serverVars.nameUser = storageData.settings.nameUser;
            serverVars.device = storageData.device;
            serverVars.user = storageData.user;

            service.serverRemote = {
                device: {},
                user: {}
            };

            service.populate();
            flags.storage = true;
            if (flags.removal === true) {
                servers();
            }
        },
        removal = function test_services_addServers_removal():void {
            let count:number = 0;
            const list:string[] = [
                    `${projectPath}serviceTestLocal`,
                    `${projectPath}serviceLocal`,
                    `${projectPath}serviceTestLocal.json`,
                    `${projectPath}serviceLocal.json`,
                    `${projectPath}serviceTestRemote`,
                    `${projectPath}serviceRemote`,
                    `${projectPath}serviceTestRemote.json`,
                    `${projectPath}serviceRemote.json`,
                    `${projectPath}storage${sep}version.json`
                ],
                removeCallback = function test_services_addServers_removal_removeCallback():void {
                    count = count + 1;
                    if (count === list.length) {
                        flags.removal = true;
                        if (flags.storage === true) {
                            servers();
                        }
                    }
                };
            list.forEach(function test_services_addServers_removal_each(value:string):void {
                remove(value, removeCallback);
            });
        };
    serverVars.storage = `${projectPath}lib${sep}terminal${sep}test${sep}storage`;
    readStorage(storageComplete);
    removal();
};
service.execute = function test_services_execute(config:testExecute):void {
    const index:number = (config.list.length < 1)
            ? config.index
            : config.list[config.index],
        testItem:testServiceInstance = service[index],
        keyword:string = (function test_services_execute_keyword():string {
            const words:string[] = Object.keys(testItem.command);
            return words[0];
        }()),
        agent:string = testItem.command[keyword].agent,
        command:string = (function test_services_execute_command():string {
            if (keyword === "invite") {
                if (testItem.command.invite.action === "invite" || testItem.command.invite.action === "invite-response") {
                    if (testItem.command.invite.type === "device") {
                        testItem.command.invite.port = service.serverRemote.device["a5908e8446995926ab2dd037851146a2b3e6416dcdd68856e7350c937d6e92356030c2ee702a39a8a2c6c58dac9adc3d666c28b96ee06ddfcf6fead94f81054e"].port;
                    } else {
                        // add user hash once here once created
                        testItem.command.invite.port = service.serverRemote.user[""].port;
                    }
                } else {
                    testItem.command.invite.port = serverVars.device[serverVars.hashDevice].port;
                }
            }
            return JSON.stringify(testItem.command);
        }()),
        name:string = (testItem.name === undefined)
            ? command
            : testItem.name,
        header:http.OutgoingHttpHeaders = (agent === serverVars.hashDevice || agent === undefined)
            ? {
                "content-type": "application/x-www-form-urlencoded",
                "content-length": Buffer.byteLength(command),
                "agent-name": "localUser",
                "agent-type": "device",
                "remote-user": (testItem.command[keyword].copyAgent !== undefined && testItem.command[keyword].copyAgent !== "" && testItem.command[keyword].copyAgent !== serverVars.hashDevice)
                    ? testItem.command[keyword].copyAgent
                    : "localUser"
            }
            : {
                "content-type": "application/x-www-form-urlencoded",
                "content-length": Buffer.byteLength(command),
                "agent-name": testItem.command[keyword].agent,
                "agent-type": "user",
                "remote-user": "localUser"
            },
        payload:http.RequestOptions = {
            headers: header,
            host: loopback,
            method: "POST",
            path: "/",
            port: (keyword === "invite")
                ? testItem.command.invite.port
                : (keyword === "heartbeat" || testItem.command[keyword].agent === undefined)
                    ? serverVars.device[serverVars.hashDevice].port
                    : serverVars[testItem.command[keyword].agentType][testItem.command[keyword].agent].port,
            timeout: 1000
        },
        evaluator = function test_service_execute_evaluator(message:string):void {
            testEvaluation({
                callback: config.complete,
                index: config.index,
                list: config.list,
                test: <testItem>service[index],
                testType: "service",
                values: [message, "", ""]
            });
        },
        requestCallback = function test_service_callback(response:http.IncomingMessage):void {
            const chunks:string[] = [];
            response.on("data", function test_service_callback_data(chunk:string):void {
                chunks.push(chunk);
            });
            response.on("end", function test_service_callback_end():void {
                // A delay is built into the server to eliminate a race condition between service execution and data writing.
                // * That service delay requires a delay between service test intervals to prevent tests from bleeding into each other.
                // * The delay here is the HTTP round trip plus 10ms.
                setTimeout(function test_service_callback_end_delay():void {
                    request.end();
                    evaluator(chunks.join(""));
                }, 10);
            });
        },
        request:http.ClientRequest = http.request(payload, requestCallback);
    request.on("error", function test_testListRunner_service_error(reqError:nodeError):void {
        evaluator(`fail - Failed to execute on service test: ${name}: ${reqError.toString()}`);
    });
    request.write(command);
};
service.killServers = function test_services_killServers(complete:testComplete):void {
    const agentComplete = function test_services_killServers_complete(counts:agentCounts):void {
        counts.count = counts.count + 1;
        if (counts.count === counts.total) {
            testComplete(complete);
        }
    };
    agents({
        complete: agentComplete,
        countBy: "agent",
        perAgent: function test_services_killServers_perAgent(agentNames:agentNames, counts:agentCounts):void {
            service.serverRemote[agentNames.agentType][agentNames.agent].close();
            agentComplete(counts);
        },
        source: serverVars
    });
};

export default service;