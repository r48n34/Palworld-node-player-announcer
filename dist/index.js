"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const rconify_1 = require("rconify");
const dayjs_1 = __importDefault(require("dayjs"));
const commonUtils_1 = require("./utils/commonUtils");
process.setMaxListeners(15);
let currentPlayerCount = -1;
function connectFunc(client) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Announce player leave or join 
            function announceLeaveJoin(diffArr, mode, maxPLayer) {
                return __awaiter(this, void 0, void 0, function* () {
                    const sendText = `${(0, commonUtils_1.numberToFormatStr)(diffArr)}-player-${mode === "LEAVE" ? "leaved(-)" : "joined(+)"}|(Total-${maxPLayer})`;
                    console.log(`${sendText} (${(0, dayjs_1.default)().format('DD/MM/YYYY - HH:mm:ss')})`);
                    yield client.sendCommand(`Broadcast [${(0, dayjs_1.default)().format('HH:mm:ss')}]|${sendText}`);
                });
            }
            yield client.connect();
            const result = yield client.sendCommand("ShowPlayers");
            const nowPlayer = result.split("\n").slice(1);
            if (currentPlayerCount === -1) {
                currentPlayerCount = nowPlayer.length;
            }
            else if (currentPlayerCount !== nowPlayer.length) {
                const diff = Math.abs(nowPlayer.length - currentPlayerCount);
                if (nowPlayer.length > currentPlayerCount) { // New player join
                    yield announceLeaveJoin(diff, "JOIN", nowPlayer.length);
                }
                else { // Player left    
                    yield announceLeaveJoin(diff, "LEAVE", nowPlayer.length);
                }
                currentPlayerCount = nowPlayer.length;
            }
            client.disconnect();
        }
        catch (error) {
            console.error(error);
        }
    });
}
function main() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const INTERVAL = process.env.INTERVAL ? +process.env.INTERVAL * 1000 : 5 * 1000;
            const client = new rconify_1.RconClient({
                host: (_a = process.env.RCON_IP) !== null && _a !== void 0 ? _a : "127.0.0.1",
                port: process.env.RCON_PORT ? +process.env.RCON_PORT : 25575,
                password: process.env.RCON_PASSWORD || "",
                ignoreInvalidAuthResponse: false
            });
            console.log("Connected, server starting");
            setInterval(() => __awaiter(this, void 0, void 0, function* () { return connectFunc(client); }), INTERVAL);
        }
        catch (error) {
            console.error(error);
        }
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield main();
}))();
//# sourceMappingURL=index.js.map