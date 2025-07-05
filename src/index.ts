import { Agent, run } from "@openai/agents";
import "dotenv/config";
import readline from "readline";
import { SYSTEM_PROMPT } from "./system";
import {
  checkAppointmentTool,
  deleteAppointmentTool,
  scheduleAppointmentTool,
} from "./tools/appointment";

const MODEL = "gpt-4o-mini";

const agent = new Agent({
  name: "Assistant",
  instructions: SYSTEM_PROMPT,
  model: MODEL,
  tools: [checkAppointmentTool, scheduleAppointmentTool, deleteAppointmentTool],
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const messages = [] as any;

async function sendToLLM(content: string) {
  messages.push({
    role: "user",
    content: content,
  });
  const result = await run(agent, messages);
  return result.finalOutput;
}

async function processLLMResponse(response: any) {
  const parsedJson = JSON.parse(response);
  if (parsedJson.to == "user") {
    console.log("Ai: " + parsedJson.message);
  }
}

async function main() {
  while (true) {
    const input: string = await new Promise((resolve) => {
      rl.question("Say something: ", resolve);
    });

    const response = await sendToLLM(input);
    await processLLMResponse(response);
  }
}

main();
