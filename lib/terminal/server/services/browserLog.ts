
/* lib/terminal/server/services/browserLog - This handy utility writes log output to the terminal from the browser's console.log for more direct log visibility. */

import log from "../../utilities/log.js";
import serverVars from "../serverVars.js";
import transmit_http from "../transmission/transmit_http.js";

const browserLog = function terminal_server_services_browserLog(socketData:socketData, transmit:transmit):void {
    const logData:service_log = socketData.data as service_log,
        browserIndex:number = serverVars.testType.indexOf("browser");
    if (browserIndex < 0 || (browserIndex === 0 && logData[0] !== null)) {
        log(logData);
    }
    transmit_http.respondEmpty(transmit);
};

export default browserLog;