import { createMcpHandler } from "@vercel/mcp-adapter";
import { z } from "zod";
import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js"; // Or appropriate path from SDK
//console.log("Creating MCP handler: ", process.env.REDIS_URL)

// tools 
import { RESEARCH_TOOL } from "@/tools/research";

// resources
import { CATEGORY_ECO_IDS } from "@/resources/category-eco-ids";

// Define the type for the parameters based on RESEARCH_TOOL.inputSchema
// This helps with type safety inside the handler
type ResearchToolParams = {
  instructions: string;
  search_queries: string[];
  ecosystem_ids: number[];
  category_ids: number[];
  research_depth: 'low' | 'medium' | 'high'; 
  days_back?: number; 
};



const handler = createMcpHandler(
  (server: any) => {
    
    // === ECHO TOOL ===
    server.tool(
      "echo",
      "Echo a message",
      { 
        message: z.string() 
      },
      async ({ message }: { message: string }) => ({
        content: [{ type: "text", text: `Tool echo: ${message}` }],
      })
    );

    // === RESEARCH TOOL ===
    server.tool("researchTool",
      z.object({
        instructions: z
            .string()
            .describe('simple objective for the search. This should be a single sentence with a clear objective.'),
        search_queries: z
            .array(z.string())
            .describe('the semantic search queries to use for the research.')
            .min(1)
            .max(5),
        ecosystem_ids: z
            .array(z.number())
            .describe('the ecosystem_ids to filter the research context by')
            .min(0)
            .max(5),
        category_ids: z
            .array(z.number())
            .describe('the category_ids to filter the research context by')
            .min(0)
            .max(5),
        research_depth: z
            .enum(['low', 'medium', 'high'])
            .describe('the depth of the research. Can be one of "low", "medium", "high" depending on user request. Default is "medium"'),
        days_back: z
            .number()
            .describe('the number of days to go back for the research. Default is 30 days for most requests. Use 30 here if you are unsure.')
            .optional(),
      }),
      async (params: ResearchToolParams) => {
      const {
        instructions,
        search_queries,
        ecosystem_ids,
        category_ids,
        research_depth,
        days_back,
      } = params;

      const effectiveDaysBack = days_back ?? 30; 

      console.log('... [mcp-tool] researchTool execute:', {
        instructions,
        search_queries,
        ecosystem_ids,
        category_ids,
        research_depth,
        days_back: effectiveDaysBack,
      });

      const body = {
        agent_id: 2, 
        instructions: instructions,
        queries: search_queries,
        ecosystem_ids: ecosystem_ids,
        category_ids: category_ids,
        days_back: effectiveDaysBack,
        research_depth: research_depth, 
        action_type: 'research_context', 
        model: 'gemini-2.0-flash', 
        context_only: true, 
      };

      console.log('... [mcp-tool] researchTool body:', body);

      try {
        const fetchResponse = await fetch(
          (process.env.VELDT_AGENT_BASE_URL || '') + '/api/v1/agent/research-skill',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.VELDT_INTERNAL_API_KEY || ''}`,
            },
            body: JSON.stringify(body),
          }
        );

        if (!fetchResponse.ok) {
          let errorBodyText = 'Could not read error response body.';
          try {
            errorBodyText = await fetchResponse.text();
          } catch (e) {
            console.error("Failed to parse error response body:", e);
          }
          const errorMsg = `HTTP error! status: ${fetchResponse.status}, body: ${errorBodyText}`;
          console.error(errorMsg);
          return {
            content: [{ type: 'text', text: errorMsg }],
            isError: true,
          };
        }

        const responseData = await fetchResponse.json();
        console.log('[mcp-tool] researchTool - response:', responseData);

        return {
          content: [{ type: 'text', text: JSON.stringify(responseData) }],
          isError: false,
        };
      } catch (error: any) {
        console.error('... [mcp-tool] researchTool execution error:', error);
        return {
          content: [{ type: 'text', text: `Execution error: ${error.message}` }],
          isError: true,
        };
      }
    });

    // === Category Ecosystem Ids RESOURCE ===
    server.resource(
      "categoryEcosystemIds",
      new ResourceTemplate("categoryEcosystemIds://", { list: undefined }),
      async (uri: URL) => ({
        contents: [{
          uri: uri.href,
          text: CATEGORY_ECO_IDS
        }]
      })
    );

    server.resource(
      "Conversations list: Returns list of conversation resources.",
      new ResourceTemplate("conversations://", {
        list: async (extra) => {
          const filter = { 
          };

          try {
            
            return {
              resources: []
            };
          } catch (error) {
            console.error("Error fetching conversation list:", error);
            return { resources: [] };
          }
        }
      }),
      async (uri: URL, variables: any) => {
        return {
          contents: [
            {
              uri: uri.href,
              text: "CATEGORY_ECO_IDS"
            }
          ]
        };
      }
    );

    // === ECHO PROMPT ===
    const echoPromptSchema = z.object({
      inputText: z.string().describe("Text to include in the echoed prompt")
    });
    server.prompt(
      "echoPrompt",
      echoPromptSchema,
      ({ inputText }: z.infer<typeof echoPromptSchema>) => ({
        messages: [{
          role: "user" as const,
          content: {
            type: "text" as const,
            text: `Prompt echo: ${inputText}`
          }
        }]
      })
    );
  },
  {
    capabilities: {
      tools: {
        echo: {
          description: "Echo a message",
          // Zod schema for echo tool's message param
          parameters: { type: "object", properties: { message: { type: "string" } }, required: ["message"] }
        },
        researchTool: {
          description: RESEARCH_TOOL.description,
          parameters: RESEARCH_TOOL.inputSchema,
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
    streamableHttpEndpoint: "/mcp",
    verboseLogs: true,
    maxDuration: 800,
  }
);

export { handler as GET, handler as POST, handler as DELETE };
