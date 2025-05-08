


import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

// resources 
import { getCategoryEcoIds } from "./category-eco-ids";


export function registerResources(server: McpServer) {
    getCategoryEcoIds(server)
}