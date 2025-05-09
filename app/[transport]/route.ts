import { createMcpHandler } from "@vercel/mcp-adapter";

// tools 
import { registerTools } from "@/tools/register-tools";

// resources
import { registerResources } from "@/resources/register-resources";



const handler = createMcpHandler(
  (server: any) => {
    server.instructions = "This is a test of the instructions tool."

    registerTools(server)
    registerResources(server)
    
  },
  {
    capabilities: {
      tools: {
        echo: {
          description: "Echo a message",
          // Zod schema for echo tool's message param
          parameters: { type: "object", properties: { message: { type: "string" } }, required: ["message"] }
        },

      },
      resources: {
        categoryEcosystemIds: {
          description: "Echoes text from a URI like echo://your-text-here"
        },
        conversations: {
          description: "Echoes text from a URI like echo://your-text-here"
        }
      },
      prompts: {}
    },
  },
  {
    redisUrl: process.env.REDIS_URL,
    sseEndpoint: "/sse",
    sseMessageEndpoint: "/sse",
    streamableHttpEndpoint: "/mcp",
    verboseLogs: true,
    maxDuration: 800,
  }
);

export { handler as GET, handler as POST, handler as DELETE };
