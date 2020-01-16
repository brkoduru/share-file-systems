import { Duplex } from "stream";
/**
 * Emits the `'close'` event on a stream.
 *
 * @param {stream.Duplex} The stream.
 * @private
 */
function emitClose(stream) {
    stream.emit('close');
}
/**
 * The listener of the `'end'` event.
 *
 * @private
 */
function duplexOnEnd() {
    if (!this.destroyed && this._writableState.finished) {
        this.destroy();
    }
}
/**
 * The listener of the `'error'` event.
 *
 * @private
 */
function duplexOnError(err) {
    this.removeListener('error', duplexOnError);
    this.destroy();
    if (this.listenerCount('error') === 0) {
        // Do not suppress the throwing behavior.
        this.emit('error', err);
    }
}
/**
 * Wraps a `WebSocket` in a duplex stream.
 *
 * @param {WebSocket} ws The `WebSocket` to wrap
 * @param {Object} options The options for the `Duplex` constructor
 * @return {stream.Duplex} The duplex stream
 * @public
 */
function createWebSocketStream(ws, options) {
    let resumeOnReceiverDrain = true;
    function receiverOnDrain() {
        if (resumeOnReceiverDrain)
            ws._socket.resume();
    }
    if (ws.readyState === ws.CONNECTING) {
        ws.once('open', function open() {
            ws._receiver.removeAllListeners('drain');
            ws._receiver.on('drain', receiverOnDrain);
        });
    }
    else {
        ws._receiver.removeAllListeners('drain');
        ws._receiver.on('drain', receiverOnDrain);
    }
    const duplex = new Duplex(Object.assign(Object.assign({}, options), { autoDestroy: false, emitClose: false, objectMode: false, readableObjectMode: false, writableObjectMode: false }));
    ws.on('message', function message(msg) {
        if (!duplex.push(msg)) {
            resumeOnReceiverDrain = false;
            ws._socket.pause();
        }
    });
    ws.once('error', function error(err) {
        duplex.destroy(err);
    });
    ws.once('close', function close() {
        if (duplex.destroyed)
            return;
        duplex.push(null);
    });
    duplex._destroy = function (err, callback) {
        if (ws.readyState === ws.CLOSED) {
            callback(err);
            process.nextTick(emitClose, duplex);
            return;
        }
        ws.once('close', function close() {
            callback(err);
            process.nextTick(emitClose, duplex);
        });
        ws.terminate();
    };
    duplex._final = function (callback) {
        if (ws.readyState === ws.CONNECTING) {
            ws.once('open', function open() {
                duplex._final(callback);
            });
            return;
        }
        if (ws._socket._writableState.finished) {
            if (duplex._readableState.endEmitted)
                duplex.destroy();
            callback();
        }
        else {
            ws._socket.once('finish', function finish() {
                // `duplex` is not destroyed here because the `'end'` event will be
                // emitted on `duplex` after this `'finish'` event. The EOF signaling
                // `null` chunk is, in fact, pushed when the WebSocket emits `'close'`.
                callback();
            });
            ws.close();
        }
    };
    duplex._read = function () {
        if (ws.readyState === ws.OPEN && !resumeOnReceiverDrain) {
            resumeOnReceiverDrain = true;
            if (!ws._receiver._writableState.needDrain)
                ws._socket.resume();
        }
    };
    duplex._write = function (chunk, encoding, callback) {
        if (ws.readyState === ws.CONNECTING) {
            ws.once('open', function open() {
                duplex._write(chunk, encoding, callback);
            });
            return;
        }
        ws.send(chunk, callback);
    };
    duplex.on('end', duplexOnEnd);
    duplex.on('error', duplexOnError);
    return duplex;
}
export default createWebSocketStream;
