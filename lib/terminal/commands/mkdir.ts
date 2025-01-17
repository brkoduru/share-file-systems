
/* lib/terminal/commands/mkdir - A utility for recursively creating directories in the file system. */

import { mkdir as makeDir, stat, Stats } from "fs";
import { resolve } from "path";

import error from "../utilities/error.js";
import log from "../utilities/log.js";
import vars from "../utilities/vars.js";

// makes specified directory structures in the local file system
const mkdir = function terminal_commands_mkdir(dirToMake:string, callback:(typeError:Error) => void):void {
    let ind:number = 0;
    const dir:string = (vars.command === "mkdir")
            ? resolve(process.argv[0])
            : resolve(dirToMake),
        dirs:string[] = dir.split(vars.sep),
        len:number = dirs.length,
        errorHandler = function terminal_commands_mkdir_errorHandler(errorInstance:NodeJS.ErrnoException, statInstance:Stats, errorCallback:() => void):void {
            if (errorInstance !== null) {
                if (errorInstance.toString().indexOf("no such file or directory") > 0 || errorInstance.code === "ENOENT") {
                    errorCallback();
                    return;
                }
                error([errorInstance.toString()]);
                return;
            }

            if (statInstance.isDirectory() === true) {
                recursiveStat();
                return;
            }

            const type:string = (statInstance.isFile() === true)
                ? "file"
                : (statInstance.isSymbolicLink() === true)
                    ? "symbolic link"
                    : (statInstance.isCharacterDevice() === true)
                        ? "character device"
                        : (statInstance.isFIFO() === true)
                            ? "FIFO"
                            : (statInstance.isSocket() === true)
                                ? "socket"
                                : "unknown file system object";
            error([`Destination directory, '${vars.text.cyan + dir + vars.text.none}', is a ${type}.`], true);
            return;
        },
        recursiveStat = function terminal_commands_mkdir_recursiveStat():void {
            ind = ind + 1;
            const target:string = dirs.slice(0, ind).join(vars.sep);
            stat(target, function terminal_commands_mkdir_recursiveStat_callback(errA:NodeJS.ErrnoException, statA:Stats):void {
                errorHandler(errA, statA, function terminal_commands_mkdir_recursiveStat_callback_errorHandler():void {
                    makeDir(target, function terminal_mkdir_recursiveStat_callback_errorHandler_makeDir(errB:NodeJS.ErrnoException):void {
                        if (errB !== null && errB.toString().indexOf("file already exists") < 0) {
                            error([errB.toString()]);
                            return;
                        }
                        if (ind === len) {
                            callback(null);
                        } else {
                            terminal_commands_mkdir_recursiveStat();
                        }
                    });
                });
            });
        };
    if (vars.command === "mkdir") {
        if (vars.verbose === true) {
            log.title("Make directories");
        }
        if (process.argv[0] === undefined) {
            error([
                "No directory name specified.",
                `See ${vars.text.cyan + vars.command_instruction} commands mkdir${vars.text.none} for examples.`
            ], true);
            process.exit(1);
            return;
        }
        callback = function terminal_commands_mkdir_callback():void {
            if (vars.verbose === true) {
                log([`Directory created at ${vars.text.cyan + dir + vars.text.none}`], true);
            }
        };
    }
    if (dirs[0] === "") {
        ind = ind + 1;
    }
    recursiveStat();
};

export default mkdir;