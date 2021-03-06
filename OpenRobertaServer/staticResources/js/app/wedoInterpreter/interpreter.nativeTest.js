define(["require", "exports", "interpreter.constants", "interpreter.util"], function (require, exports, C, U) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NativeTest = (function () {
        function NativeTest(opLog, debug) {
            this.timers = {};
            this.timers['start'] = Date.now();
            U.loggingEnabled(opLog, debug);
        }
        NativeTest.prototype.clearDisplay = function () {
            U.debug('clear display');
        };
        NativeTest.prototype.getSample = function (s, name, port, sensor, slot) {
            var robotText = 'robot: ' + name + ', port: ' + port;
            U.debug(robotText + ' getsample from ' + sensor);
            switch (sensor) {
                case "infrared":
                    s.push(5);
                    break;
                case "gyro":
                    s.push(3);
                    break;
                case "buttons":
                    s.push(true);
                    break;
                case C.TIMER:
                    s.push(this.timerGet(port));
                    break;
                default:
                    throw 'invalid get sample for ' + name + ' - ' + port + ' - ' + sensor + ' - ' + slot;
            }
        };
        NativeTest.prototype.timerReset = function (port) {
            this.timers[port] = Date.now();
            U.debug('timerReset for ' + port);
        };
        NativeTest.prototype.timerGet = function (port) {
            var now = Date.now();
            var startTime = this.timers[port];
            if (startTime === undefined) {
                startTime = this.timers['start'];
            }
            var delta = now - startTime;
            U.debug('timerGet for ' + port + ' returned ' + delta);
            return delta;
        };
        NativeTest.prototype.ledOnAction = function (name, port, color) {
            var robotText = 'robot: ' + name + ', port: ' + port;
            U.info(robotText + ' led on color ' + color);
        };
        NativeTest.prototype.statusLightOffAction = function (name, port) {
            var robotText = 'robot: ' + name + ', port: ' + port;
            U.info(robotText + ' led off');
        };
        NativeTest.prototype.toneAction = function (name, frequency, duration) {
            var robotText = 'robot: ' + name;
            U.info(robotText + ' piezo: ' + ', frequency: ' + frequency + ', duration: ' + duration);
        };
        NativeTest.prototype.motorOnAction = function (name, port, duration, speed) {
            var robotText = 'robot: ' + name + ', port: ' + port;
            var durText = duration === -1 ? ' w.o. duration' : (' for ' + duration + ' msec');
            U.info(robotText + ' motor speed ' + speed + durText);
        };
        NativeTest.prototype.motorStopAction = function (name, port) {
            var robotText = 'robot: ' + name + ', port: ' + port;
            U.info(robotText + ' motor stop');
        };
        NativeTest.prototype.showTextAction = function (text) {
            var showText = "" + text;
            U.info('show "' + showText + '"');
        };
        NativeTest.prototype.close = function () {
            // CI implementation. No real robot. No motor off, etc.
        };
        return NativeTest;
    }());
    exports.NativeTest = NativeTest;
});
