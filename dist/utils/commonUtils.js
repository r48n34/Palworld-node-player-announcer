"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.numberToFormatStr = void 0;
const number_to_words_1 = __importDefault(require("number-to-words"));
function numberToFormatStr(num) {
    const engWord = number_to_words_1.default.toWords(num).split(" ").join("");
    return engWord.charAt(0).toUpperCase() + engWord.slice(1);
}
exports.numberToFormatStr = numberToFormatStr;
//# sourceMappingURL=commonUtils.js.map