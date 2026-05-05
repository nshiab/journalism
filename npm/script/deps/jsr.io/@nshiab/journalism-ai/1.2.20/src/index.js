"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmbedding = exports.askAIPool = exports.askAI = void 0;
const askAI_js_1 = __importDefault(require("./ai/askAI.js"));
exports.askAI = askAI_js_1.default;
const askAIPool_js_1 = __importDefault(require("./ai/askAIPool.js"));
exports.askAIPool = askAIPool_js_1.default;
const getEmbedding_js_1 = __importDefault(require("./ai/getEmbedding.js"));
exports.getEmbedding = getEmbedding_js_1.default;
