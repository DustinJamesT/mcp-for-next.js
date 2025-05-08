import {
    Tool,
    CallToolRequestSchema,
    ListToolsRequestSchema,
  } from '@modelcontextprotocol/sdk/types.js';

const detailed_instructions =
`
To generate optimal search queries, follow the following process:
    <query_generation_process>
        1. Conversation Analysis:
            - Identify the main question or topic from the user's last message
            - Key concepts that need definition or explanation
            - Related theories or frameworks that provide context
            - Specific technical details or implementations mentioned
            - Current trends or developments relevant to the topic
            - Potential opposing viewpoints or controversies
            - Statistical data or metrics that would be valuable

        2. Query Design:
            - Start with broader, foundational concepts, and sector categories (2-3 queries)
            - Follow with specific technical details (2-3 queries)
            - Include queries that bridge gaps between concepts
            - Ensure each query complements others without overlap

        3. Query Topic Optimization:
            - Foundational queries for establishing core concepts
            - Deep-dive queries for technical specifications
            - Comparative queries for different approaches/perspectives
            - Statistical queries for relevant data and trends
            - Implementation queries for practical examples
            - Current state queries for latest developments
            - Avoid queries focused on regulation, policy, risks, or legislation unless explicitly asked for

        4. Query Structure:
            - Use semantic search friendly terminology (avoid site:, filetype:, etc.)
            - Make queries distinct but interconnected
            - Target different types of information sources
            - Be specific and detailed while avoiding overly complex language
            - Only reference feed_context if directly relevant to user's question
            - If the user is asking for recent events, news, create a newsletter or similar, create queries to find more info about the most related recent events and feed_context.

        5. Query Count:
            - Match query count with the research_depth required.
            - low: 1 query
            - medium: 3 queries
            - high: 5 queries
    </query_generation_process>
`;

export const RESEARCH_TOOL: Tool = {
  name: 'researchTool',
  description: 'Go-to tool for generic research and context gathering.',
  inputSchema: {
    type: 'object',
    properties: {
      instructions: {
        type: 'string',
        description: 'Simple objective for the search. This should be a single sentence with a clear objective.'
      },
      search_queries: {
        type: 'array',
        items: { type: 'string' },
        description: 'The semantic search queries to use for the research.',
        minItems: 1,
        maxItems: 5
      },
      ecosystem_ids: {
        type: 'array',
        items: { type: 'integer' },
        description: 'The ecosystem_ids to filter the research context by.',
        minItems: 0,
        maxItems: 5
      },
      category_ids: {
        type: 'array',
        items: { type: 'integer' },
        description: 'The category_ids to filter the research context by.',
        minItems: 0,
        maxItems: 5
      },
      project_ids: {
        type: 'array',
        items: { type: 'integer' },
        description: 'Filter for project_ids of relevance to the user\'s request. Be sure that project_id is obviously available in the feed or the hovered content. Otherwise return an empty array as a default. IMPORTANT: post_ids or other fields not explicitly named "project_id" are not applicable.',
        minItems: 0,
        maxItems: 5
      },
      research_depth: {
        type: 'string',
        enum: ['low', 'medium', 'high'],
        description: 'The depth of the research. Can be one of "low", "medium", "high" depending on user request. Default is "medium"',
        default: 'medium'
      },
      days_back: {
        type: 'integer',
        description: 'The number of days to go back for the research. Default is 30 days for most requests. Use 30 here if you are unsure.',
        default: 30
      },
      use_web_search: {
        type: 'boolean',
        description: 'Whether to use web search for the research. Default is true. Set to false only for requests specific to your own memory.',
        default: true
      }
    },
    required: [
      'instructions',
      'search_queries',
      'ecosystem_ids',
      'category_ids',
      'research_depth'
    ]
  }
};

