# lib/terminal/server/transmission Code Files
These files are libraries are service end points behind network transmission.

## Files
<!-- Do not edit below this line.  Contents dynamically populated. -->

* **[agent_http.ts](agent_http.ts)**           - This library launches the HTTP service and all supporting service utilities.
* **[agent_websocket.ts](agent_websocket.ts)** - A command utility for creating a websocket server or client.
* **[ipResolve.ts](ipResolve.ts)**             - Tests connectivity to remote agents from among their known IP addresses.
* **[methodGET.ts](methodGET.ts)**             - The library for handling all traffic related to HTTP requests with method GET.
* **[receiver.ts](receiver.ts)**               - The library for handling all traffic related to HTTP requests with method POST.
* **[responder.ts](responder.ts)**             - Send network output, whether an http response or websocket.
* **[sender.ts](sender.ts)**                   - Abstracts away the communication channel from the message.