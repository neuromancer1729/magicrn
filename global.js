/**
 * Web3.js and Fortmatic mobile compatible setup
 */

/* Process object for node.js */
global.process = require('process');
process.browser = false;

/* Buffer */
global.Buffer = require('buffer').Buffer;
if (typeof btoa === 'undefined') {
    global.btoa = function (str) {
        return new Buffer(str, 'binary').toString('base64')
    }
}
if (typeof atob === 'undefined') {
    global.atob = function (b64Encoded) {
        return new Buffer(b64Encoded, 'base64').toString('binary')
    }
}

/* URL */
import { URL } from "whatwg-url";
global.URL = URL;
