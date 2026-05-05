"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = randNormal;
function randNormal() {
    const u = 1 - Math.random(); // Converting [0,1) to (0,1]
    const v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}
