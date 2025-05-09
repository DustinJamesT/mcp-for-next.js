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
        research: {
          description: "Conducts a research task on a topic. Access to vector database of recent news, crypto projects, research papers, and more. Returns a write up of the research, including influential content and sources.",
          parameters: {
            type: "object",
            properties: {
              instructions: { type: "string" },
            }
          }
        }
      },
      resources: {},
      prompts: {}
    },
  },
  {
    redisUrl: process.env.REDIS_URL,
    sseEndpoint: "/sse",
    sseMessageEndpoint: "/message",
    streamableHttpEndpoint: "/mcp",
    verboseLogs: true,
    maxDuration: 800,
  }
);


export { handler as GET, handler as POST, handler as DELETE };
