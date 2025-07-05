import "dotenv/config";
import OpenAI from "openai";
import readline from "readline";
import { SYSTEM_PROMPT } from "./system";
import { appointmentFunctionMap } from "./appointment";

const MODEL = "gpt-4o-mini";

const client = new OpenAI({
  apiKey: process.env.OPENAPI_KEY,
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const messages = [] as any;

messages.push({
  role: "system",
  content: SYSTEM_PROMPT,
});

async function sendToLLM(content: string) {
  messages.push({
    role: "user",
    content,
  });

  const response = await client.chat.completions.create({
    messages,
    model: MODEL,
  });

  messages.push(response.choices[0].message);

  return response.choices[0].message.content;
}

async function processLLMResponse(response: any) {
  const parsedJson = JSON.parse(response);

  if (parsedJson.to == "user") {
    console.log(parsedJson.message);
  } else if (parsedJson.to == "system") {
    const fn = parsedJson.functionCall.function;
    const args = parsedJson.functionCall.arguments;

    const functionResponse = appointmentFunctionMap[fn](...args);

    await processLLMResponse(
      await sendToLLM("response is " + functionResponse ? "true" : "false")
    );
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
