import { AtpAgent } from "@atproto/api";
import * as dotenv from 'dotenv';
import * as process from "process";
import generateProgress from "./progress_generation.js";

dotenv.config();

async function agentInit() { 
    const agent = new AtpAgent({
        service: "https://bsky.social", 
    });

    await agent.login({
        identifier: process.env.BLUESKY_USERNAME,
        password: process.env.BLUESKY_PASSWORD,
    });

    return agent; 
}

async function postProgress() {
    try {
        const agent = await agentInit();

        const progress = await generateProgress(); 

        await agent.post({
            text: progress, 
            createdAt: new Date().toISOString(),
        });

        console.log('post posted!!!', progress);
    } catch (error) {
        console.error('porblem', error);
    }
}

postProgress();