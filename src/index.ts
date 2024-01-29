import 'dotenv/config';
import { RconClient } from "rconify";
import dayjs from 'dayjs'

import { numberToFormatStr } from './utils/commonUtils';

process.setMaxListeners(15);
let currentPlayerCount: number = -1;

async function connectFunc(client: RconClient){

    try {
        
        // Announce player leave or join 
        async function announceLeaveJoin(diffArr: number, mode: "LEAVE" | "JOIN", maxPLayer: number){
            const sendText = `${numberToFormatStr(diffArr)}-player-${mode === "LEAVE" ? "leaved(-)" : "joined(+)"}|(Total-${maxPLayer})`;
            console.log(`${sendText} (${dayjs().format('DD/MM/YYYY - HH:mm:ss')})`)
            await client.sendCommand(`Broadcast [${dayjs().format('HH:mm:ss')}]|${sendText}`);
        }
    
        await client.connect();
    
        const result: string = await client.sendCommand("ShowPlayers");
        const nowPlayer: string[] = result.split("\n").slice(1)
    
        if(currentPlayerCount === -1){
            currentPlayerCount = nowPlayer.length
        }
        else if(currentPlayerCount !== nowPlayer.length) {
            const diff = Math.abs(nowPlayer.length - currentPlayerCount)
            
            if(nowPlayer.length > currentPlayerCount){ // New player join
                await announceLeaveJoin(diff, "JOIN", nowPlayer.length)
            }
            else { // Player left    
                await announceLeaveJoin(diff, "LEAVE", nowPlayer.length)
            }
    
            currentPlayerCount = nowPlayer.length
        }
    
        client.disconnect();      
    }
    catch (error) {
        console.error(error)
    }

}

async function main(){

    try {
        const INTERVAL = process.env.INTERVAL ? +process.env.INTERVAL * 1000 : 5 * 1000;

        const client: RconClient = new RconClient({
            host: process.env.RCON_IP ?? "127.0.0.1",
            port: process.env.RCON_PORT ? +process.env.RCON_PORT : 25575,
            password: process.env.RCON_PASSWORD || "",
            ignoreInvalidAuthResponse: false
        });

        console.log("Connected, server starting")
        setInterval( async () => connectFunc(client), INTERVAL) 
    }
    catch (error) {
        console.error(error)
    }
    
}

(async () => {
   await main();
})()