import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";

const origin = process.argv[2] || "https://mcp-for-next-js.vercel.app";

const apiKey   = process.env.VELDT_API_KEY;          // or read from disk / CLI
const header   = "Authorization";  

async function main() {
  //const transport = new SSEClientTransport(new URL(`${origin}/sse`));
  const transport = new SSEClientTransport(
    new URL(`${origin}/sse`),
    { headers: { [header]: `Bearer ${apiKey}` } }      // 👈 rides along on every request
  );
  console.log('... [script] origin:', origin);
  console.log('... [script] origin:', origin?.transport);
  console.log('... [script] argv:', process.argv);
  console.log('... [script] apiKey:', apiKey);
  console.log('... [script] header:', header);

  const client = new Client(
    {
      name: "veldt-client",
      version: "1.0.0",
    },
    {
      capabilities: {
        prompts: {},
        resources: {},
        tools: {},
      },
    }
  );

  console.log("Connecting to", origin);
  await client.connect(transport);

  console.log("Connected", client.getServerCapabilities());

  const result = await client.listTools();
  console.log(result);
  client.close();
}

main();
