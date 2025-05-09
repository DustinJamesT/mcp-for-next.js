
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

// tools
import { researchTest } from "./research";

export function registerTools(server: McpServer) {
    researchTest(server)
}