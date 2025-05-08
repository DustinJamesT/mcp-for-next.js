

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export function researchTest(server: McpServer) {

    server.tool(
        "research",
        `Conducts a research task on a topic.
        Access to vector database of recent news, crypto projects, research papers, and more.
        Returns a write up of the research, including influential content and sources.
        `,
        { 
            instructions: z
                .string()
                .describe('simple objective for the search. This should be a single sentence with a clear objective.'),
            search_queries: z
                .array(z.string())
                .describe('the semantic search queries to use for the research. Max 3 queries. REQUIRED.')
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
                .describe('the depth of the research. Can be one of "low", "medium", "high" depending on user request. Default is "medium"')
                .optional(),
            days_back: z
                .number()
                .describe('the number of days to go back for the research. Default is 30 days for most requests. Use 30 here if you are unsure.')
                .optional(),
        },
        async ({ instructions, search_queries, ecosystem_ids, category_ids, research_depth, days_back }) => {
    
            try {
                const body = {
                    agent_id:  2,
                    instructions: instructions,
                    queries: search_queries,
                    ecosystem_ids: ecosystem_ids || [],
                    category_ids: category_ids || [],
                    project_ids: [],
                    days_back: days_back || 30,
                    research_depth: research_depth || 'medium',
                    use_web_search: true,
                    action_type: 'research_context',
                    model: 'gemini-2.0-flash',
                    context_only: true
                };

                console.log('... [tool] researchTool body:', body);

                const fetchResponse = await fetch(
                    process.env.VELDT_AGENT_BASE_URL + '/api/v1/agent/research-skill',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${process.env.VELDT_INTERNAL_API_KEY}`
                        },
                        body: JSON.stringify(body),
                    }
                );

                // Check for HTTP errors
                if (!fetchResponse.ok) {
                    let errorBodyText = 'Could not read error response body.';
                    try {
                        // Attempt to read the response body for more details
                        errorBodyText = await fetchResponse.text(); 
                    } catch (e) {
                        console.error("Failed to parse error response body:", e);
                    }
                    // Return immediately with the error
                    return {
                        content: [{
                            type: "text",
                            text: `HTTP error! status: ${fetchResponse.status}, body: ${errorBodyText}`
                        }],
                        isError: true
                    };
                }

                // If fetchResponse.ok is true, parse the JSON response
                const response = await fetchResponse.json();
                
                
                return {
                    content: [{ 
                        type: "text", 
                        text: JSON.stringify(response, null, 2) 
                    }]
                };
            } catch (err: unknown) {
            const error = err as Error;
            return {
                content: [{
                type: "text",
                text: `Error: ${error.message}`
                }],
                isError: true
            };
            }
        }
        );

}