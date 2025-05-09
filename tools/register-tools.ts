
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

// tools
import { researchTool } from "./research";

export function registerTools(server: McpServer) {
    researchTool(server)
}