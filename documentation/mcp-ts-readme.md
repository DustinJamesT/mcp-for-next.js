Directory structure:
└── modelcontextprotocol-typescript-sdk/
    ├── README.md
    ├── CLAUDE.md
    ├── CODE_OF_CONDUCT.md
    ├── CONTRIBUTING.md
    ├── eslint.config.mjs
    ├── jest.config.js
    ├── LICENSE
    ├── package.json
    ├── SECURITY.md
    ├── tsconfig.cjs.json
    ├── tsconfig.json
    ├── tsconfig.prod.json
    ├── .npmrc
    ├── src/
    │   ├── cli.ts
    │   ├── inMemory.test.ts
    │   ├── inMemory.ts
    │   ├── types.test.ts
    │   ├── types.ts
    │   ├── __mocks__/
    │   │   └── pkce-challenge.ts
    │   ├── client/
    │   │   ├── auth.test.ts
    │   │   ├── auth.ts
    │   │   ├── cross-spawn.test.ts
    │   │   ├── index.test.ts
    │   │   ├── index.ts
    │   │   ├── sse.test.ts
    │   │   ├── sse.ts
    │   │   ├── stdio.test.ts
    │   │   ├── stdio.ts
    │   │   ├── streamableHttp.test.ts
    │   │   ├── streamableHttp.ts
    │   │   └── websocket.ts
    │   ├── examples/
    │   │   ├── README.md
    │   │   ├── client/
    │   │   │   ├── multipleClientsParallel.ts
    │   │   │   ├── parallelToolCallsClient.ts
    │   │   │   ├── simpleStreamableHttp.ts
    │   │   │   └── streamableHttpWithSseFallbackClient.ts
    │   │   ├── server/
    │   │   │   ├── jsonResponseStreamableHttp.ts
    │   │   │   ├── simpleSseServer.ts
    │   │   │   ├── simpleStatelessStreamableHttp.ts
    │   │   │   ├── simpleStreamableHttp.ts
    │   │   │   ├── sseAndStreamableHttpCompatibleServer.ts
    │   │   │   └── standaloneSseWithGetStreamableHttp.ts
    │   │   └── shared/
    │   │       └── inMemoryEventStore.ts
    │   ├── integration-tests/
    │   │   ├── process-cleanup.test.ts
    │   │   ├── stateManagementStreamableHttp.test.ts
    │   │   └── taskResumability.test.ts
    │   ├── server/
    │   │   ├── completable.test.ts
    │   │   ├── completable.ts
    │   │   ├── index.test.ts
    │   │   ├── index.ts
    │   │   ├── mcp.test.ts
    │   │   ├── mcp.ts
    │   │   ├── sse.test.ts
    │   │   ├── sse.ts
    │   │   ├── stdio.test.ts
    │   │   ├── stdio.ts
    │   │   ├── streamableHttp.test.ts
    │   │   ├── streamableHttp.ts
    │   │   └── auth/
    │   │       ├── clients.ts
    │   │       ├── errors.ts
    │   │       ├── provider.ts
    │   │       ├── router.test.ts
    │   │       ├── router.ts
    │   │       ├── types.ts
    │   │       ├── handlers/
    │   │       │   ├── authorize.test.ts
    │   │       │   ├── authorize.ts
    │   │       │   ├── metadata.test.ts
    │   │       │   ├── metadata.ts
    │   │       │   ├── register.test.ts
    │   │       │   ├── register.ts
    │   │       │   ├── revoke.test.ts
    │   │       │   ├── revoke.ts
    │   │       │   ├── token.test.ts
    │   │       │   └── token.ts
    │   │       ├── middleware/
    │   │       │   ├── allowedMethods.test.ts
    │   │       │   ├── allowedMethods.ts
    │   │       │   ├── bearerAuth.test.ts
    │   │       │   ├── bearerAuth.ts
    │   │       │   ├── clientAuth.test.ts
    │   │       │   └── clientAuth.ts
    │   │       └── providers/
    │   │           ├── proxyProvider.test.ts
    │   │           └── proxyProvider.ts
    │   └── shared/
    │       ├── auth.ts
    │       ├── protocol.test.ts
    │       ├── protocol.ts
    │       ├── stdio.test.ts
    │       ├── stdio.ts
    │       ├── transport.ts
    │       ├── uriTemplate.test.ts
    │       └── uriTemplate.ts
    └── .github/
        └── workflows/
            └── main.yml


Files Content:

(Files content cropped to 300k characters, download full ingest to see more)
================================================
FILE: README.md
================================================
# MCP TypeScript SDK ![NPM Version](https://img.shields.io/npm/v/%40modelcontextprotocol%2Fsdk) ![MIT licensed](https://img.shields.io/npm/l/%40modelcontextprotocol%2Fsdk)

## Table of Contents
- [Overview](#overview)
- [Installation](#installation)
- [Quickstart](#quickstart)
- [What is MCP?](#what-is-mcp)
- [Core Concepts](#core-concepts)
  - [Server](#server)
  - [Resources](#resources)
  - [Tools](#tools)
  - [Prompts](#prompts)
- [Running Your Server](#running-your-server)
  - [stdio](#stdio)
  - [Streamable HTTP](#streamable-http)
  - [Testing and Debugging](#testing-and-debugging)
- [Examples](#examples)
  - [Echo Server](#echo-server)
  - [SQLite Explorer](#sqlite-explorer)
- [Advanced Usage](#advanced-usage)
  - [Low-Level Server](#low-level-server)
  - [Writing MCP Clients](#writing-mcp-clients)
  - [Server Capabilities](#server-capabilities)
  - [Proxy OAuth Server](#proxy-authorization-requests-upstream)
  - [Backwards Compatibility](#backwards-compatibility)

## Overview

The Model Context Protocol allows applications to provide context for LLMs in a standardized way, separating the concerns of providing context from the actual LLM interaction. This TypeScript SDK implements the full MCP specification, making it easy to:

- Build MCP clients that can connect to any MCP server
- Create MCP servers that expose resources, prompts and tools
- Use standard transports like stdio and Streamable HTTP
- Handle all MCP protocol messages and lifecycle events

## Installation

```bash
npm install @modelcontextprotocol/sdk
```

## Quick Start

Let's create a simple MCP server that exposes a calculator tool and some data:

```typescript
import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create an MCP server
const server = new McpServer({
  name: "Demo",
  version: "1.0.0"
});

// Add an addition tool
server.tool("add",
  { a: z.number(), b: z.number() },
  async ({ a, b }) => ({
    content: [{ type: "text", text: String(a + b) }]
  })
);

// Add a dynamic greeting resource
server.resource(
  "greeting",
  new ResourceTemplate("greeting://{name}", { list: undefined }),
  async (uri, { name }) => ({
    contents: [{
      uri: uri.href,
      text: `Hello, ${name}!`
    }]
  })
);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);
```

## What is MCP?

The [Model Context Protocol (MCP)](https://modelcontextprotocol.io) lets you build servers that expose data and functionality to LLM applications in a secure, standardized way. Think of it like a web API, but specifically designed for LLM interactions. MCP servers can:

- Expose data through **Resources** (think of these sort of like GET endpoints; they are used to load information into the LLM's context)
- Provide functionality through **Tools** (sort of like POST endpoints; they are used to execute code or otherwise produce a side effect)
- Define interaction patterns through **Prompts** (reusable templates for LLM interactions)
- And more!

## Core Concepts

### Server

The McpServer is your core interface to the MCP protocol. It handles connection management, protocol compliance, and message routing:

```typescript
const server = new McpServer({
  name: "My App",
  version: "1.0.0"
});
```

### Resources

Resources are how you expose data to LLMs. They're similar to GET endpoints in a REST API - they provide data but shouldn't perform significant computation or have side effects:

```typescript
// Static resource
server.resource(
  "config",
  "config://app",
  async (uri) => ({
    contents: [{
      uri: uri.href,
      text: "App configuration here"
    }]
  })
);

// Dynamic resource with parameters
server.resource(
  "user-profile",
  new ResourceTemplate("users://{userId}/profile", { list: undefined }),
  async (uri, { userId }) => ({
    contents: [{
      uri: uri.href,
      text: `Profile data for user ${userId}`
    }]
  })
);
```

### Tools

Tools let LLMs take actions through your server. Unlike resources, tools are expected to perform computation and have side effects:

```typescript
// Simple tool with parameters
server.tool(
  "calculate-bmi",
  {
    weightKg: z.number(),
    heightM: z.number()
  },
  async ({ weightKg, heightM }) => ({
    content: [{
      type: "text",
      text: String(weightKg / (heightM * heightM))
    }]
  })
);

// Async tool with external API call
server.tool(
  "fetch-weather",
  { city: z.string() },
  async ({ city }) => {
    const response = await fetch(`https://api.weather.com/${city}`);
    const data = await response.text();
    return {
      content: [{ type: "text", text: data }]
    };
  }
);
```

### Prompts

Prompts are reusable templates that help LLMs interact with your server effectively:

```typescript
server.prompt(
  "review-code",
  { code: z.string() },
  ({ code }) => ({
    messages: [{
      role: "user",
      content: {
        type: "text",
        text: `Please review this code:\n\n${code}`
      }
    }]
  })
);
```

## Running Your Server

MCP servers in TypeScript need to be connected to a transport to communicate with clients. How you start the server depends on the choice of transport:

### stdio

For command-line tools and direct integrations:

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new McpServer({
  name: "example-server",
  version: "1.0.0"
});

// ... set up server resources, tools, and prompts ...

const transport = new StdioServerTransport();
await server.connect(transport);
```

### Streamable HTTP

For remote servers, set up a Streamable HTTP transport that handles both client requests and server-to-client notifications.

#### With Session Management

In some cases, servers need to be stateful. This is achieved by [session management](https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#session-management).

```typescript
import express from "express";
import { randomUUID } from "node:crypto";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js"



const app = express();
app.use(express.json());

// Map to store transports by session ID
const transports: { [sessionId: string]: StreamableHTTPServerTransport } = {};

// Handle POST requests for client-to-server communication
app.post('/mcp', async (req, res) => {
  // Check for existing session ID
  const sessionId = req.headers['mcp-session-id'] as string | undefined;
  let transport: StreamableHTTPServerTransport;

  if (sessionId && transports[sessionId]) {
    // Reuse existing transport
    transport = transports[sessionId];
  } else if (!sessionId && isInitializeRequest(req.body)) {
    // New initialization request
    transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () => randomUUID(),
      onsessioninitialized: (sessionId) => {
        // Store the transport by session ID
        transports[sessionId] = transport;
      }
    });

    // Clean up transport when closed
    transport.onclose = () => {
      if (transport.sessionId) {
        delete transports[transport.sessionId];
      }
    };
    const server = new McpServer({
      name: "example-server",
      version: "1.0.0"
    });

    // ... set up server resources, tools, and prompts ...

    // Connect to the MCP server
    await server.connect(transport);
  } else {
    // Invalid request
    res.status(400).json({
      jsonrpc: '2.0',
      error: {
        code: -32000,
        message: 'Bad Request: No valid session ID provided',
      },
      id: null,
    });
    return;
  }

  // Handle the request
  await transport.handleRequest(req, res, req.body);
});

// Reusable handler for GET and DELETE requests
const handleSessionRequest = async (req: express.Request, res: express.Response) => {
  const sessionId = req.headers['mcp-session-id'] as string | undefined;
  if (!sessionId || !transports[sessionId]) {
    res.status(400).send('Invalid or missing session ID');
    return;
  }
  
  const transport = transports[sessionId];
  await transport.handleRequest(req, res);
};

// Handle GET requests for server-to-client notifications via SSE
app.get('/mcp', handleSessionRequest);

// Handle DELETE requests for session termination
app.delete('/mcp', handleSessionRequest);

app.listen(3000);
```

#### Without Session Management (Stateless)

For simpler use cases where session management isn't needed:

```typescript
const app = express();
app.use(express.json());

app.post('/mcp', async (req: Request, res: Response) => {
  // In stateless mode, create a new instance of transport and server for each request
  // to ensure complete isolation. A single instance would cause request ID collisions
  // when multiple clients connect concurrently.
  
  try {
    const server = getServer(); 
    const transport: StreamableHTTPServerTransport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
    });
    res.on('close', () => {
      console.log('Request closed');
      transport.close();
      server.close();
    });
    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  } catch (error) {
    console.error('Error handling MCP request:', error);
    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: '2.0',
        error: {
          code: -32603,
          message: 'Internal server error',
        },
        id: null,
      });
    }
  }
});

app.get('/mcp', async (req: Request, res: Response) => {
  console.log('Received GET MCP request');
  res.writeHead(405).end(JSON.stringify({
    jsonrpc: "2.0",
    error: {
      code: -32000,
      message: "Method not allowed."
    },
    id: null
  }));
});

app.delete('/mcp', async (req: Request, res: Response) => {
  console.log('Received DELETE MCP request');
  res.writeHead(405).end(JSON.stringify({
    jsonrpc: "2.0",
    error: {
      code: -32000,
      message: "Method not allowed."
    },
    id: null
  }));
});


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`MCP Stateless Streamable HTTP Server listening on port ${PORT}`);
});

```

This stateless approach is useful for:
- Simple API wrappers
- RESTful scenarios where each request is independent
- Horizontally scaled deployments without shared session state

### Testing and Debugging

To test your server, you can use the [MCP Inspector](https://github.com/modelcontextprotocol/inspector). See its README for more information.

## Examples

### Echo Server

A simple server demonstrating resources, tools, and prompts:

```typescript
import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

const server = new McpServer({
  name: "Echo",
  version: "1.0.0"
});

server.resource(
  "echo",
  new ResourceTemplate("echo://{message}", { list: undefined }),
  async (uri, { message }) => ({
    contents: [{
      uri: uri.href,
      text: `Resource echo: ${message}`
    }]
  })
);

server.tool(
  "echo",
  { message: z.string() },
  async ({ message }) => ({
    content: [{ type: "text", text: `Tool echo: ${message}` }]
  })
);

server.prompt(
  "echo",
  { message: z.string() },
  ({ message }) => ({
    messages: [{
      role: "user",
      content: {
        type: "text",
        text: `Please process this message: ${message}`
      }
    }]
  })
);
```

### SQLite Explorer

A more complex example showing database integration:

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import sqlite3 from "sqlite3";
import { promisify } from "util";
import { z } from "zod";

const server = new McpServer({
  name: "SQLite Explorer",
  version: "1.0.0"
});

// Helper to create DB connection
const getDb = () => {
  const db = new sqlite3.Database("database.db");
  return {
    all: promisify<string, any[]>(db.all.bind(db)),
    close: promisify(db.close.bind(db))
  };
};

server.resource(
  "schema",
  "schema://main",
  async (uri) => {
    const db = getDb();
    try {
      const tables = await db.all(
        "SELECT sql FROM sqlite_master WHERE type='table'"
      );
      return {
        contents: [{
          uri: uri.href,
          text: tables.map((t: {sql: string}) => t.sql).join("\n")
        }]
      };
    } finally {
      await db.close();
    }
  }
);

server.tool(
  "query",
  { sql: z.string() },
  async ({ sql }) => {
    const db = getDb();
    try {
      const results = await db.all(sql);
      return {
        content: [{
          type: "text",
          text: JSON.stringify(results, null, 2)
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
    } finally {
      await db.close();
    }
  }
);
```

## Advanced Usage

### Dynamic Servers

If you want to offer an initial set of tools/prompts/resources, but later add additional ones based on user action or external state change, you can add/update/remove them _after_ the Server is connected. This will automatically emit the corresponding `listChanged` notificaions:

```ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

const server = new McpServer({
  name: "Dynamic Example",
  version: "1.0.0"
});

const listMessageTool = server.tool(
  "listMessages",
  { channel: z.string() },
  async ({ channel }) => ({
    content: [{ type: "text", text: await listMessages(channel) }]
  })
);

const putMessageTool = server.tool(
  "putMessage",
  { channel: z.string(), message: z.string() },
  async ({ channel, message }) => ({
    content: [{ type: "text", text: await putMessage(channel, string) }]
  })
);
// Until we upgrade auth, `putMessage` is disabled (won't show up in listTools)
putMessageTool.disable()

const upgradeAuthTool = server.tool(
  "upgradeAuth",
  { permission: z.enum(["write', vadmin"])},
  // Any mutations here will automatically emit `listChanged` notifications
  async ({ permission }) => {
    const { ok, err, previous } = await upgradeAuthAndStoreToken(permission)
    if (!ok) return {content: [{ type: "text", text: `Error: ${err}` }]}

    // If we previously had read-only access, 'putMessage' is now available
    if (previous === "read") {
      putMessageTool.enable()
    }

    if (permission === 'write') {
      // If we've just upgraded to 'write' permissions, we can still call 'upgradeAuth' 
      // but can only upgrade to 'admin'. 
      upgradeAuthTool.update({
        paramSchema: { permission: z.enum(["admin"]) }, // change validation rules
      })
    } else {
      // If we're now an admin, we no longer have anywhere to upgrade to, so fully remove that tool
      upgradeAuthTool.remove()
    }
  }
)

// Connect as normal
const transport = new StdioServerTransport();
await server.connect(transport);
```

### Low-Level Server

For more control, you can use the low-level Server class directly:

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListPromptsRequestSchema,
  GetPromptRequestSchema
} from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  {
    name: "example-server",
    version: "1.0.0"
  },
  {
    capabilities: {
      prompts: {}
    }
  }
);

server.setRequestHandler(ListPromptsRequestSchema, async () => {
  return {
    prompts: [{
      name: "example-prompt",
      description: "An example prompt template",
      arguments: [{
        name: "arg1",
        description: "Example argument",
        required: true
      }]
    }]
  };
});

server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  if (request.params.name !== "example-prompt") {
    throw new Error("Unknown prompt");
  }
  return {
    description: "Example prompt",
    messages: [{
      role: "user",
      content: {
        type: "text",
        text: "Example prompt text"
      }
    }]
  };
});

const transport = new StdioServerTransport();
await server.connect(transport);
```

### Writing MCP Clients

The SDK provides a high-level client interface:

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const transport = new StdioClientTransport({
  command: "node",
  args: ["server.js"]
});

const client = new Client(
  {
    name: "example-client",
    version: "1.0.0"
  }
);

await client.connect(transport);

// List prompts
const prompts = await client.listPrompts();

// Get a prompt
const prompt = await client.getPrompt({
  name: "example-prompt",
  arguments: {
    arg1: "value"
  }
});

// List resources
const resources = await client.listResources();

// Read a resource
const resource = await client.readResource({
  uri: "file:///example.txt"
});

// Call a tool
const result = await client.callTool({
  name: "example-tool",
  arguments: {
    arg1: "value"
  }
});
```

### Proxy Authorization Requests Upstream

You can proxy OAuth requests to an external authorization provider:

```typescript
import express from 'express';
import { ProxyOAuthServerProvider, mcpAuthRouter } from '@modelcontextprotocol/sdk';

const app = express();

const proxyProvider = new ProxyOAuthServerProvider({
    endpoints: {
        authorizationUrl: "https://auth.external.com/oauth2/v1/authorize",
        tokenUrl: "https://auth.external.com/oauth2/v1/token",
        revocationUrl: "https://auth.external.com/oauth2/v1/revoke",
    },
    verifyAccessToken: async (token) => {
        return {
            token,
            clientId: "123",
            scopes: ["openid", "email", "profile"],
        }
    },
    getClient: async (client_id) => {
        return {
            client_id,
            redirect_uris: ["http://localhost:3000/callback"],
        }
    }
})

app.use(mcpAuthRouter({
    provider: proxyProvider,
    issuerUrl: new URL("http://auth.external.com"),
    baseUrl: new URL("http://mcp.example.com"),
    serviceDocumentationUrl: new URL("https://docs.example.com/"),
}))
```

This setup allows you to:
- Forward OAuth requests to an external provider
- Add custom token validation logic
- Manage client registrations
- Provide custom documentation URLs
- Maintain control over the OAuth flow while delegating to an external provider

### Backwards Compatibility

Clients and servers with StreamableHttp tranport can maintain [backwards compatibility](https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#backwards-compatibility) with the deprecated HTTP+SSE transport (from protocol version 2024-11-05) as follows

#### Client-Side Compatibility

For clients that need to work with both Streamable HTTP and older SSE servers:

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";
let client: Client|undefined = undefined
const baseUrl = new URL(url);
try {
  client = new Client({
    name: 'streamable-http-client',
    version: '1.0.0'
  });
  const transport = new StreamableHTTPClientTransport(
    new URL(baseUrl)
  );
  await client.connect(transport);
  console.log("Connected using Streamable HTTP transport");
} catch (error) {
  // If that fails with a 4xx error, try the older SSE transport
  console.log("Streamable HTTP connection failed, falling back to SSE transport");
  client = new Client({
    name: 'sse-client',
    version: '1.0.0'
  });
  const sseTransport = new SSEClientTransport(baseUrl);
  await client.connect(sseTransport);
  console.log("Connected using SSE transport");
}
```

#### Server-Side Compatibility

For servers that need to support both Streamable HTTP and older clients:

```typescript
import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";

const server = new McpServer({
  name: "backwards-compatible-server",
  version: "1.0.0"
});

// ... set up server resources, tools, and prompts ...

const app = express();
app.use(express.json());

// Store transports for each session type
const transports = {
  streamable: {} as Record<string, StreamableHTTPServerTransport>,
  sse: {} as Record<string, SSEServerTransport>
};

// Modern Streamable HTTP endpoint
app.all('/mcp', async (req, res) => {
  // Handle Streamable HTTP transport for modern clients
  // Implementation as shown in the "With Session Management" example
  // ...
});

// Legacy SSE endpoint for older clients
app.get('/sse', async (req, res) => {
  // Create SSE transport for legacy clients
  const transport = new SSEServerTransport('/messages', res);
  transports.sse[transport.sessionId] = transport;
  
  res.on("close", () => {
    delete transports.sse[transport.sessionId];
  });
  
  await server.connect(transport);
});

// Legacy message endpoint for older clients
app.post('/messages', async (req, res) => {
  const sessionId = req.query.sessionId as string;
  const transport = transports.sse[sessionId];
  if (transport) {
    await transport.handlePostMessage(req, res, req.body);
  } else {
    res.status(400).send('No transport found for sessionId');
  }
});

app.listen(3000);
```

**Note**: The SSE transport is now deprecated in favor of Streamable HTTP. New implementations should use Streamable HTTP, and existing SSE implementations should plan to migrate.

## Documentation

- [Model Context Protocol documentation](https://modelcontextprotocol.io)
- [MCP Specification](https://spec.modelcontextprotocol.io)
- [Example Servers](https://github.com/modelcontextprotocol/servers)

## Contributing

Issues and pull requests are welcome on GitHub at https://github.com/modelcontextprotocol/typescript-sdk.

## License

This project is licensed under the MIT License—see the [LICENSE](LICENSE) file for details.



================================================
FILE: CLAUDE.md
================================================
# MCP TypeScript SDK Guide

## Build & Test Commands
```
npm run build        # Build ESM and CJS versions
npm run lint         # Run ESLint
npm test             # Run all tests
npx jest path/to/file.test.ts  # Run specific test file
npx jest -t "test name"        # Run tests matching pattern
```

## Code Style Guidelines
- **TypeScript**: Strict type checking, ES modules, explicit return types
- **Naming**: PascalCase for classes/types, camelCase for functions/variables
- **Files**: Lowercase with hyphens, test files with `.test.ts` suffix
- **Imports**: ES module style, include `.js` extension, group imports logically
- **Error Handling**: Use TypeScript's strict mode, explicit error checking in tests
- **Formatting**: 2-space indentation, semicolons required, single quotes preferred
- **Testing**: Co-locate tests with source files, use descriptive test names
- **Comments**: JSDoc for public APIs, inline comments for complex logic

## Project Structure
- `/src`: Source code with client, server, and shared modules
- Tests alongside source files with `.test.ts` suffix
- Node.js >= 18 required


================================================
FILE: CODE_OF_CONDUCT.md
================================================
# Contributor Covenant Code of Conduct

## Our Pledge

We as members, contributors, and leaders pledge to make participation in our
community a harassment-free experience for everyone, regardless of age, body
size, visible or invisible disability, ethnicity, sex characteristics, gender
identity and expression, level of experience, education, socio-economic status,
nationality, personal appearance, race, religion, or sexual identity
and orientation.

We pledge to act and interact in ways that contribute to an open, welcoming,
diverse, inclusive, and healthy community.

## Our Standards

Examples of behavior that contributes to a positive environment for our
community include:

* Demonstrating empathy and kindness toward other people
* Being respectful of differing opinions, viewpoints, and experiences
* Giving and gracefully accepting constructive feedback
* Accepting responsibility and apologizing to those affected by our mistakes,
  and learning from the experience
* Focusing on what is best not just for us as individuals, but for the
  overall community

Examples of unacceptable behavior include:

* The use of sexualized language or imagery, and sexual attention or
  advances of any kind
* Trolling, insulting or derogatory comments, and personal or political attacks
* Public or private harassment
* Publishing others' private information, such as a physical or email
  address, without their explicit permission
* Other conduct which could reasonably be considered inappropriate in a
  professional setting

## Enforcement Responsibilities

Community leaders are responsible for clarifying and enforcing our standards of
acceptable behavior and will take appropriate and fair corrective action in
response to any behavior that they deem inappropriate, threatening, offensive,
or harmful.

Community leaders have the right and responsibility to remove, edit, or reject
comments, commits, code, wiki edits, issues, and other contributions that are
not aligned to this Code of Conduct, and will communicate reasons for moderation
decisions when appropriate.

## Scope

This Code of Conduct applies within all community spaces, and also applies when
an individual is officially representing the community in public spaces.
Examples of representing our community include using an official e-mail address,
posting via an official social media account, or acting as an appointed
representative at an online or offline event.

## Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be
reported to the community leaders responsible for enforcement at
mcp-coc@anthropic.com.
All complaints will be reviewed and investigated promptly and fairly.

All community leaders are obligated to respect the privacy and security of the
reporter of any incident.

## Enforcement Guidelines

Community leaders will follow these Community Impact Guidelines in determining
the consequences for any action they deem in violation of this Code of Conduct:

### 1. Correction

**Community Impact**: Use of inappropriate language or other behavior deemed
unprofessional or unwelcome in the community.

**Consequence**: A private, written warning from community leaders, providing
clarity around the nature of the violation and an explanation of why the
behavior was inappropriate. A public apology may be requested.

### 2. Warning

**Community Impact**: A violation through a single incident or series
of actions.

**Consequence**: A warning with consequences for continued behavior. No
interaction with the people involved, including unsolicited interaction with
those enforcing the Code of Conduct, for a specified period of time. This
includes avoiding interactions in community spaces as well as external channels
like social media. Violating these terms may lead to a temporary or
permanent ban.

### 3. Temporary Ban

**Community Impact**: A serious violation of community standards, including
sustained inappropriate behavior.

**Consequence**: A temporary ban from any sort of interaction or public
communication with the community for a specified period of time. No public or
private interaction with the people involved, including unsolicited interaction
with those enforcing the Code of Conduct, is allowed during this period.
Violating these terms may lead to a permanent ban.

### 4. Permanent Ban

**Community Impact**: Demonstrating a pattern of violation of community
standards, including sustained inappropriate behavior,  harassment of an
individual, or aggression toward or disparagement of classes of individuals.

**Consequence**: A permanent ban from any sort of public interaction within
the community.

## Attribution

This Code of Conduct is adapted from the [Contributor Covenant][homepage],
version 2.0, available at
https://www.contributor-covenant.org/version/2/0/code_of_conduct.html.

Community Impact Guidelines were inspired by [Mozilla's code of conduct
enforcement ladder](https://github.com/mozilla/diversity).

[homepage]: https://www.contributor-covenant.org

For answers to common questions about this code of conduct, see the FAQ at
https://www.contributor-covenant.org/faq. Translations are available at
https://www.contributor-covenant.org/translations.



================================================
FILE: CONTRIBUTING.md
================================================
# Contributing to MCP TypeScript SDK

We welcome contributions to the Model Context Protocol TypeScript SDK! This document outlines the process for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR-USERNAME/typescript-sdk.git`
3. Install dependencies: `npm install`
4. Build the project: `npm run build`
5. Run tests: `npm test`

## Development Process

1. Create a new branch for your changes
2. Make your changes
3. Run `npm run lint` to ensure code style compliance
4. Run `npm test` to verify all tests pass
5. Submit a pull request

## Pull Request Guidelines

- Follow the existing code style
- Include tests for new functionality
- Update documentation as needed
- Keep changes focused and atomic
- Provide a clear description of changes

## Running Examples

- Start the server: `npm run server`
- Run the client: `npm run client`

## Code of Conduct

This project follows our [Code of Conduct](CODE_OF_CONDUCT.md). Please review it before contributing.

## Reporting Issues

- Use the [GitHub issue tracker](https://github.com/modelcontextprotocol/typescript-sdk/issues)
- Search existing issues before creating a new one
- Provide clear reproduction steps

## Security Issues

Please review our [Security Policy](SECURITY.md) for reporting security vulnerabilities.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.



================================================
FILE: eslint.config.mjs
================================================
// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        linterOptions: {
            reportUnusedDisableDirectives: false,
        },
        rules: {
            "@typescript-eslint/no-unused-vars": ["error",
                { "argsIgnorePattern": "^_" }
            ]
        }
    }
);



================================================
FILE: jest.config.js
================================================
import { createDefaultEsmPreset } from "ts-jest";

const defaultEsmPreset = createDefaultEsmPreset();

/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  ...defaultEsmPreset,
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
    "^pkce-challenge$": "<rootDir>/src/__mocks__/pkce-challenge.ts"
  },
  transformIgnorePatterns: [
    "/node_modules/(?!eventsource)/"
  ],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};



================================================
FILE: LICENSE
================================================
MIT License

Copyright (c) 2024 Anthropic, PBC

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.



================================================
FILE: package.json
================================================
{
  "name": "@modelcontextprotocol/sdk",
  "version": "1.11.1",
  "description": "Model Context Protocol implementation for TypeScript",
  "license": "MIT",
  "author": "Anthropic, PBC (https://anthropic.com)",
  "homepage": "https://modelcontextprotocol.io",
  "bugs": "https://github.com/modelcontextprotocol/typescript-sdk/issues",
  "type": "module",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/modelcontextprotocol/typescript-sdk.git"
  },
  "engines": {
    "node": ">=18"
  },
  "keywords": [
    "modelcontextprotocol",
    "mcp"
  ],
  "exports": {
    "./*": {
      "import": "./dist/esm/*",
      "require": "./dist/cjs/*"
    }
  },
  "typesVersions": {
    "*": {
      "*": [
        "./dist/esm/*"
      ]
    }
  },
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "npm run build:esm && npm run build:cjs",
    "build:esm": "tsc -p tsconfig.prod.json && echo '{\"type\": \"module\"}' > dist/esm/package.json",
    "build:cjs": "tsc -p tsconfig.cjs.json && echo '{\"type\": \"commonjs\"}' > dist/cjs/package.json",
    "prepack": "npm run build:esm && npm run build:cjs",
    "lint": "eslint src/",
    "test": "jest",
    "start": "npm run server",
    "server": "tsx watch --clear-screen=false src/cli.ts server",
    "client": "tsx src/cli.ts client"
  },
  "dependencies": {
    "content-type": "^1.0.5",
    "cors": "^2.8.5",
    "cross-spawn": "^7.0.3",
    "eventsource": "^3.0.2",
    "express": "^5.0.1",
    "express-rate-limit": "^7.5.0",
    "pkce-challenge": "^5.0.0",
    "raw-body": "^3.0.0",
    "zod": "^3.23.8",
    "zod-to-json-schema": "^3.24.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.8.0",
    "@jest-mock/express": "^3.0.0",
    "@types/content-type": "^1.1.8",
    "@types/cors": "^2.8.17",
    "@types/cross-spawn": "^6.0.6",
    "@types/eslint__js": "^8.42.3",
    "@types/eventsource": "^1.1.15",
    "@types/express": "^5.0.0",
    "@types/jest": "^29.5.12",
    "@types/node": "^22.0.2",
    "@types/supertest": "^6.0.2",
    "@types/ws": "^8.5.12",
    "eslint": "^9.8.0",
    "jest": "^29.7.0",
    "supertest": "^7.0.0",
    "ts-jest": "^29.2.4",
    "tsx": "^4.16.5",
    "typescript": "^5.5.4",
    "typescript-eslint": "^8.0.0",
    "ws": "^8.18.0"
  },
  "resolutions": {
    "strip-ansi": "6.0.1"
  }
}



================================================
FILE: SECURITY.md
================================================
# Security Policy
Thank you for helping us keep the SDKs and systems they interact with secure.

## Reporting Security Issues

This SDK is maintained by [Anthropic](https://www.anthropic.com/) as part of the Model Context Protocol project.

The security of our systems and user data is Anthropic’s top priority. We appreciate the work of security researchers acting in good faith in identifying and reporting potential vulnerabilities.

Our security program is managed on HackerOne and we ask that any validated vulnerability in this functionality be reported through their [submission form](https://hackerone.com/anthropic-vdp/reports/new?type=team&report_type=vulnerability).

## Vulnerability Disclosure Program

Our Vulnerability Program Guidelines are defined on our [HackerOne program page](https://hackerone.com/anthropic-vdp).



================================================
FILE: tsconfig.cjs.json
================================================
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "module": "commonjs",
    "moduleResolution": "node",
    "outDir": "./dist/cjs"
  },
  "exclude": ["**/*.test.ts", "src/__mocks__/**/*"]
}



================================================
FILE: tsconfig.json
================================================
{
  "compilerOptions": {
    "target": "es2018",
    "module": "Node16",
    "moduleResolution": "Node16",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "skipLibCheck": true,
    "baseUrl": ".",
    "paths": {
      "pkce-challenge": ["node_modules/pkce-challenge/dist/index.node"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}



================================================
FILE: tsconfig.prod.json
================================================
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist/esm"
  },
  "exclude": ["**/*.test.ts", "src/__mocks__/**/*"]
}



================================================
FILE: .npmrc
================================================
registry = "https://registry.npmjs.org/"



================================================
FILE: src/cli.ts
================================================
import WebSocket from "ws";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).WebSocket = WebSocket;

import express from "express";
import { Client } from "./client/index.js";
import { SSEClientTransport } from "./client/sse.js";
import { StdioClientTransport } from "./client/stdio.js";
import { WebSocketClientTransport } from "./client/websocket.js";
import { Server } from "./server/index.js";
import { SSEServerTransport } from "./server/sse.js";
import { StdioServerTransport } from "./server/stdio.js";
import { ListResourcesResultSchema } from "./types.js";

async function runClient(url_or_command: string, args: string[]) {
  const client = new Client(
    {
      name: "mcp-typescript test client",
      version: "0.1.0",
    },
    {
      capabilities: {
        sampling: {},
      },
    },
  );

  let clientTransport;

  let url: URL | undefined = undefined;
  try {
    url = new URL(url_or_command);
  } catch {
    // Ignore
  }

  if (url?.protocol === "http:" || url?.protocol === "https:") {
    clientTransport = new SSEClientTransport(new URL(url_or_command));
  } else if (url?.protocol === "ws:" || url?.protocol === "wss:") {
    clientTransport = new WebSocketClientTransport(new URL(url_or_command));
  } else {
    clientTransport = new StdioClientTransport({
      command: url_or_command,
      args,
    });
  }

  console.log("Connected to server.");

  await client.connect(clientTransport);
  console.log("Initialized.");

  await client.request({ method: "resources/list" }, ListResourcesResultSchema);

  await client.close();
  console.log("Closed.");
}

async function runServer(port: number | null) {
  if (port !== null) {
    const app = express();

    let servers: Server[] = [];

    app.get("/sse", async (req, res) => {
      console.log("Got new SSE connection");

      const transport = new SSEServerTransport("/message", res);
      const server = new Server(
        {
          name: "mcp-typescript test server",
          version: "0.1.0",
        },
        {
          capabilities: {},
        },
      );

      servers.push(server);

      server.onclose = () => {
        console.log("SSE connection closed");
        servers = servers.filter((s) => s !== server);
      };

      await server.connect(transport);
    });

    app.post("/message", async (req, res) => {
      console.log("Received message");

      const sessionId = req.query.sessionId as string;
      const transport = servers
        .map((s) => s.transport as SSEServerTransport)
        .find((t) => t.sessionId === sessionId);
      if (!transport) {
        res.status(404).send("Session not found");
        return;
      }

      await transport.handlePostMessage(req, res);
    });

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}/sse`);
    });
  } else {
    const server = new Server(
      {
        name: "mcp-typescript test server",
        version: "0.1.0",
      },
      {
        capabilities: {
          prompts: {},
          resources: {},
          tools: {},
          logging: {},
        },
      },
    );

    const transport = new StdioServerTransport();
    await server.connect(transport);

    console.log("Server running on stdio");
  }
}

const args = process.argv.slice(2);
const command = args[0];
switch (command) {
  case "client":
    if (args.length < 2) {
      console.error("Usage: client <server_url_or_command> [args...]");
      process.exit(1);
    }

    runClient(args[1], args.slice(2)).catch((error) => {
      console.error(error);
      process.exit(1);
    });

    break;

  case "server": {
    const port = args[1] ? parseInt(args[1]) : null;
    runServer(port).catch((error) => {
      console.error(error);
      process.exit(1);
    });

    break;
  }

  default:
    console.error("Unrecognized command:", command);
}



================================================
FILE: src/inMemory.test.ts
================================================
import { InMemoryTransport } from "./inMemory.js";
import { JSONRPCMessage } from "./types.js";
import { AuthInfo } from "./server/auth/types.js";

describe("InMemoryTransport", () => {
  let clientTransport: InMemoryTransport;
  let serverTransport: InMemoryTransport;

  beforeEach(() => {
    [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  });

  test("should create linked pair", () => {
    expect(clientTransport).toBeDefined();
    expect(serverTransport).toBeDefined();
  });

  test("should start without error", async () => {
    await expect(clientTransport.start()).resolves.not.toThrow();
    await expect(serverTransport.start()).resolves.not.toThrow();
  });

  test("should send message from client to server", async () => {
    const message: JSONRPCMessage = {
      jsonrpc: "2.0",
      method: "test",
      id: 1,
    };

    let receivedMessage: JSONRPCMessage | undefined;
    serverTransport.onmessage = (msg) => {
      receivedMessage = msg;
    };

    await clientTransport.send(message);
    expect(receivedMessage).toEqual(message);
  });

  test("should send message with auth info from client to server", async () => {
    const message: JSONRPCMessage = {
      jsonrpc: "2.0",
      method: "test",
      id: 1,
    };

    const authInfo: AuthInfo = {
      token: "test-token",
      clientId: "test-client",
      scopes: ["read", "write"],
      expiresAt: Date.now() / 1000 + 3600,
    };

    let receivedMessage: JSONRPCMessage | undefined;
    let receivedAuthInfo: AuthInfo | undefined;
    serverTransport.onmessage = (msg, extra) => {
      receivedMessage = msg;
      receivedAuthInfo = extra?.authInfo;
    };

    await clientTransport.send(message, { authInfo });
    expect(receivedMessage).toEqual(message);
    expect(receivedAuthInfo).toEqual(authInfo);
  });

  test("should send message from server to client", async () => {
    const message: JSONRPCMessage = {
      jsonrpc: "2.0",
      method: "test",
      id: 1,
    };

    let receivedMessage: JSONRPCMessage | undefined;
    clientTransport.onmessage = (msg) => {
      receivedMessage = msg;
    };

    await serverTransport.send(message);
    expect(receivedMessage).toEqual(message);
  });

  test("should handle close", async () => {
    let clientClosed = false;
    let serverClosed = false;

    clientTransport.onclose = () => {
      clientClosed = true;
    };

    serverTransport.onclose = () => {
      serverClosed = true;
    };

    await clientTransport.close();
    expect(clientClosed).toBe(true);
    expect(serverClosed).toBe(true);
  });

  test("should throw error when sending after close", async () => {
    await clientTransport.close();
    await expect(
      clientTransport.send({ jsonrpc: "2.0", method: "test", id: 1 }),
    ).rejects.toThrow("Not connected");
  });

  test("should queue messages sent before start", async () => {
    const message: JSONRPCMessage = {
      jsonrpc: "2.0",
      method: "test",
      id: 1,
    };

    let receivedMessage: JSONRPCMessage | undefined;
    serverTransport.onmessage = (msg) => {
      receivedMessage = msg;
    };

    await clientTransport.send(message);
    await serverTransport.start();
    expect(receivedMessage).toEqual(message);
  });
});



================================================
FILE: src/inMemory.ts
================================================
import { Transport } from "./shared/transport.js";
import { JSONRPCMessage, RequestId } from "./types.js";
import { AuthInfo } from "./server/auth/types.js";

interface QueuedMessage {
  message: JSONRPCMessage;
  extra?: { authInfo?: AuthInfo };
}

/**
 * In-memory transport for creating clients and servers that talk to each other within the same process.
 */
export class InMemoryTransport implements Transport {
  private _otherTransport?: InMemoryTransport;
  private _messageQueue: QueuedMessage[] = [];

  onclose?: () => void;
  onerror?: (error: Error) => void;
  onmessage?: (message: JSONRPCMessage, extra?: { authInfo?: AuthInfo }) => void;
  sessionId?: string;

  /**
   * Creates a pair of linked in-memory transports that can communicate with each other. One should be passed to a Client and one to a Server.
   */
  static createLinkedPair(): [InMemoryTransport, InMemoryTransport] {
    const clientTransport = new InMemoryTransport();
    const serverTransport = new InMemoryTransport();
    clientTransport._otherTransport = serverTransport;
    serverTransport._otherTransport = clientTransport;
    return [clientTransport, serverTransport];
  }

  async start(): Promise<void> {
    // Process any messages that were queued before start was called
    while (this._messageQueue.length > 0) {
      const queuedMessage = this._messageQueue.shift()!;
      this.onmessage?.(queuedMessage.message, queuedMessage.extra);
    }
  }

  async close(): Promise<void> {
    const other = this._otherTransport;
    this._otherTransport = undefined;
    await other?.close();
    this.onclose?.();
  }

  /**
   * Sends a message with optional auth info.
   * This is useful for testing authentication scenarios.
   */
  async send(message: JSONRPCMessage, options?: { relatedRequestId?: RequestId, authInfo?: AuthInfo }): Promise<void> {
    if (!this._otherTransport) {
      throw new Error("Not connected");
    }

    if (this._otherTransport.onmessage) {
      this._otherTransport.onmessage(message, { authInfo: options?.authInfo });
    } else {
      this._otherTransport._messageQueue.push({ message, extra: { authInfo: options?.authInfo } });
    }
  }
}



================================================
FILE: src/types.test.ts
================================================
import { LATEST_PROTOCOL_VERSION, SUPPORTED_PROTOCOL_VERSIONS } from "./types.js";

describe("Types", () => {

    test("should have correct latest protocol version", () => {
        expect(LATEST_PROTOCOL_VERSION).toBeDefined();
        expect(LATEST_PROTOCOL_VERSION).toBe("2025-03-26");
    });
    test("should have correct supported protocol versions", () => {
        expect(SUPPORTED_PROTOCOL_VERSIONS).toBeDefined();
        expect(SUPPORTED_PROTOCOL_VERSIONS).toBeInstanceOf(Array);
        expect(SUPPORTED_PROTOCOL_VERSIONS).toContain(LATEST_PROTOCOL_VERSION);
        expect(SUPPORTED_PROTOCOL_VERSIONS).toContain("2024-11-05");
        expect(SUPPORTED_PROTOCOL_VERSIONS).toContain("2024-10-07");
    });

});



================================================
FILE: src/types.ts
================================================
import { z, ZodTypeAny } from "zod";

export const LATEST_PROTOCOL_VERSION = "2025-03-26";
export const SUPPORTED_PROTOCOL_VERSIONS = [
  LATEST_PROTOCOL_VERSION,
  "2024-11-05",
  "2024-10-07",
];

/* JSON-RPC types */
export const JSONRPC_VERSION = "2.0";

/**
 * A progress token, used to associate progress notifications with the original request.
 */
export const ProgressTokenSchema = z.union([z.string(), z.number().int()]);

/**
 * An opaque token used to represent a cursor for pagination.
 */
export const CursorSchema = z.string();

const RequestMetaSchema = z
  .object({
    /**
     * If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.
     */
    progressToken: z.optional(ProgressTokenSchema),
  })
  .passthrough();

const BaseRequestParamsSchema = z
  .object({
    _meta: z.optional(RequestMetaSchema),
  })
  .passthrough();

export const RequestSchema = z.object({
  method: z.string(),
  params: z.optional(BaseRequestParamsSchema),
});

const BaseNotificationParamsSchema = z
  .object({
    /**
     * This parameter name is reserved by MCP to allow clients and servers to attach additional metadata to their notifications.
     */
    _meta: z.optional(z.object({}).passthrough()),
  })
  .passthrough();

export const NotificationSchema = z.object({
  method: z.string(),
  params: z.optional(BaseNotificationParamsSchema),
});

export const ResultSchema = z
  .object({
    /**
     * This result property is reserved by the protocol to allow clients and servers to attach additional metadata to their responses.
     */
    _meta: z.optional(z.object({}).passthrough()),
  })
  .passthrough();

/**
 * A uniquely identifying ID for a request in JSON-RPC.
 */
export const RequestIdSchema = z.union([z.string(), z.number().int()]);

/**
 * A request that expects a response.
 */
export const JSONRPCRequestSchema = z
  .object({
    jsonrpc: z.literal(JSONRPC_VERSION),
    id: RequestIdSchema,
  })
  .merge(RequestSchema)
  .strict();

export const isJSONRPCRequest = (value: unknown): value is JSONRPCRequest =>
  JSONRPCRequestSchema.safeParse(value).success;

/**
 * A notification which does not expect a response.
 */
export const JSONRPCNotificationSchema = z
  .object({
    jsonrpc: z.literal(JSONRPC_VERSION),
  })
  .merge(NotificationSchema)
  .strict();

export const isJSONRPCNotification = (
  value: unknown
): value is JSONRPCNotification =>
  JSONRPCNotificationSchema.safeParse(value).success;

/**
 * A successful (non-error) response to a request.
 */
export const JSONRPCResponseSchema = z
  .object({
    jsonrpc: z.literal(JSONRPC_VERSION),
    id: RequestIdSchema,
    result: ResultSchema,
  })
  .strict();

export const isJSONRPCResponse = (value: unknown): value is JSONRPCResponse =>
  JSONRPCResponseSchema.safeParse(value).success;

/**
 * Error codes defined by the JSON-RPC specification.
 */
export enum ErrorCode {
  // SDK error codes
  ConnectionClosed = -32000,
  RequestTimeout = -32001,

  // Standard JSON-RPC error codes
  ParseError = -32700,
  InvalidRequest = -32600,
  MethodNotFound = -32601,
  InvalidParams = -32602,
  InternalError = -32603,
}

/**
 * A response to a request that indicates an error occurred.
 */
export const JSONRPCErrorSchema = z
  .object({
    jsonrpc: z.literal(JSONRPC_VERSION),
    id: RequestIdSchema,
    error: z.object({
      /**
       * The error type that occurred.
       */
      code: z.number().int(),
      /**
       * A short description of the error. The message SHOULD be limited to a concise single sentence.
       */
      message: z.string(),
      /**
       * Additional information about the error. The value of this member is defined by the sender (e.g. detailed error information, nested errors etc.).
       */
      data: z.optional(z.unknown()),
    }),
  })
  .strict();

export const isJSONRPCError = (value: unknown): value is JSONRPCError =>
  JSONRPCErrorSchema.safeParse(value).success;

export const JSONRPCMessageSchema = z.union([
  JSONRPCRequestSchema,
  JSONRPCNotificationSchema,
  JSONRPCResponseSchema,
  JSONRPCErrorSchema,
]);

/* Empty result */
/**
 * A response that indicates success but carries no data.
 */
export const EmptyResultSchema = ResultSchema.strict();

/* Cancellation */
/**
 * This notification can be sent by either side to indicate that it is cancelling a previously-issued request.
 *
 * The request SHOULD still be in-flight, but due to communication latency, it is always possible that this notification MAY arrive after the request has already finished.
 *
 * This notification indicates that the result will be unused, so any associated processing SHOULD cease.
 *
 * A client MUST NOT attempt to cancel its `initialize` request.
 */
export const CancelledNotificationSchema = NotificationSchema.extend({
  method: z.literal("notifications/cancelled"),
  params: BaseNotificationParamsSchema.extend({
    /**
     * The ID of the request to cancel.
     *
     * This MUST correspond to the ID of a request previously issued in the same direction.
     */
    requestId: RequestIdSchema,

    /**
     * An optional string describing the reason for the cancellation. This MAY be logged or presented to the user.
     */
    reason: z.string().optional(),
  }),
});

/* Initialization */
/**
 * Describes the name and version of an MCP implementation.
 */
export const ImplementationSchema = z
  .object({
    name: z.string(),
    version: z.string(),
  })
  .passthrough();

/**
 * Capabilities a client may support. Known capabilities are defined here, in this schema, but this is not a closed set: any client can define its own, additional capabilities.
 */
export const ClientCapabilitiesSchema = z
  .object({
    /**
     * Experimental, non-standard capabilities that the client supports.
     */
    experimental: z.optional(z.object({}).passthrough()),
    /**
     * Present if the client supports sampling from an LLM.
     */
    sampling: z.optional(z.object({}).passthrough()),
    /**
     * Present if the client supports listing roots.
     */
    roots: z.optional(
      z
        .object({
          /**
           * Whether the client supports issuing notifications for changes to the roots list.
           */
          listChanged: z.optional(z.boolean()),
        })
        .passthrough(),
    ),
  })
  .passthrough();

/**
 * This request is sent from the client to the server when it first connects, asking it to begin initialization.
 */
export const InitializeRequestSchema = RequestSchema.extend({
  method: z.literal("initialize"),
  params: BaseRequestParamsSchema.extend({
    /**
     * The latest version of the Model Context Protocol that the client supports. The client MAY decide to support older versions as well.
     */
    protocolVersion: z.string(),
    capabilities: ClientCapabilitiesSchema,
    clientInfo: ImplementationSchema,
  }),
});

export const isInitializeRequest = (value: unknown): value is InitializeRequest =>
  InitializeRequestSchema.safeParse(value).success;


/**
 * Capabilities that a server may support. Known capabilities are defined here, in this schema, but this is not a closed set: any server can define its own, additional capabilities.
 */
export const ServerCapabilitiesSchema = z
  .object({
    /**
     * Experimental, non-standard capabilities that the server supports.
     */
    experimental: z.optional(z.object({}).passthrough()),
    /**
     * Present if the server supports sending log messages to the client.
     */
    logging: z.optional(z.object({}).passthrough()),
    /**
     * Present if the server supports sending completions to the client.
     */
    completions: z.optional(z.object({}).passthrough()),
    /**
     * Present if the server offers any prompt templates.
     */
    prompts: z.optional(
      z
        .object({
          /**
           * Whether this server supports issuing notifications for changes to the prompt list.
           */
          listChanged: z.optional(z.boolean()),
        })
        .passthrough(),
    ),
    /**
     * Present if the server offers any resources to read.
     */
    resources: z.optional(
      z
        .object({
          /**
           * Whether this server supports clients subscribing to resource updates.
           */
          subscribe: z.optional(z.boolean()),

          /**
           * Whether this server supports issuing notifications for changes to the resource list.
           */
          listChanged: z.optional(z.boolean()),
        })
        .passthrough(),
    ),
    /**
     * Present if the server offers any tools to call.
     */
    tools: z.optional(
      z
        .object({
          /**
           * Whether this server supports issuing notifications for changes to the tool list.
           */
          listChanged: z.optional(z.boolean()),
        })
        .passthrough(),
    ),
  })
  .passthrough();

/**
 * After receiving an initialize request from the client, the server sends this response.
 */
export const InitializeResultSchema = ResultSchema.extend({
  /**
   * The version of the Model Context Protocol that the server wants to use. This may not match the version that the client requested. If the client cannot support this version, it MUST disconnect.
   */
  protocolVersion: z.string(),
  capabilities: ServerCapabilitiesSchema,
  serverInfo: ImplementationSchema,
  /**
   * Instructions describing how to use the server and its features.
   *
   * This can be used by clients to improve the LLM's understanding of available tools, resources, etc. It can be thought of like a "hint" to the model. For example, this information MAY be added to the system prompt.
   */
  instructions: z.optional(z.string()),
});

/**
 * This notification is sent from the client to the server after initialization has finished.
 */
export const InitializedNotificationSchema = NotificationSchema.extend({
  method: z.literal("notifications/initialized"),
});

export const isInitializedNotification = (value: unknown): value is InitializedNotification =>
  InitializedNotificationSchema.safeParse(value).success;

/* Ping */
/**
 * A ping, issued by either the server or the client, to check that the other party is still alive. The receiver must promptly respond, or else may be disconnected.
 */
export const PingRequestSchema = RequestSchema.extend({
  method: z.literal("ping"),
});

/* Progress notifications */
export const ProgressSchema = z
  .object({
    /**
     * The progress thus far. This should increase every time progress is made, even if the total is unknown.
     */
    progress: z.number(),
    /**
     * Total number of items to process (or total progress required), if known.
     */
    total: z.optional(z.number()),
  })
  .passthrough();

/**
 * An out-of-band notification used to inform the receiver of a progress update for a long-running request.
 */
export const ProgressNotificationSchema = NotificationSchema.extend({
  method: z.literal("notifications/progress"),
  params: BaseNotificationParamsSchema.merge(ProgressSchema).extend({
    /**
     * The progress token which was given in the initial request, used to associate this notification with the request that is proceeding.
     */
    progressToken: ProgressTokenSchema,
  }),
});

/* Pagination */
export const PaginatedRequestSchema = RequestSchema.extend({
  params: BaseRequestParamsSchema.extend({
    /**
     * An opaque token representing the current pagination position.
     * If provided, the server should return results starting after this cursor.
     */
    cursor: z.optional(CursorSchema),
  }).optional(),
});

export const PaginatedResultSchema = ResultSchema.extend({
  /**
   * An opaque token representing the pagination position after the last returned result.
   * If present, there may be more results available.
   */
  nextCursor: z.optional(CursorSchema),
});

/* Resources */
/**
 * The contents of a specific resource or sub-resource.
 */
export const ResourceContentsSchema = z
  .object({
    /**
     * The URI of this resource.
     */
    uri: z.string(),
    /**
     * The MIME type of this resource, if known.
     */
    mimeType: z.optional(z.string()),
  })
  .passthrough();

export const TextResourceContentsSchema = ResourceContentsSchema.extend({
  /**
   * The text of the item. This must only be set if the item can actually be represented as text (not binary data).
   */
  text: z.string(),
});

export const BlobResourceContentsSchema = ResourceContentsSchema.extend({
  /**
   * A base64-encoded string representing the binary data of the item.
   */
  blob: z.string().base64(),
});

/**
 * A known resource that the server is capable of reading.
 */
export const ResourceSchema = z
  .object({
    /**
     * The URI of this resource.
     */
    uri: z.string(),

    /**
     * A human-readable name for this resource.
     *
     * This can be used by clients to populate UI elements.
     */
    name: z.string(),

    /**
     * A description of what this resource represents.
     *
     * This can be used by clients to improve the LLM's understanding of available resources. It can be thought of like a "hint" to the model.
     */
    description: z.optional(z.string()),

    /**
     * The MIME type of this resource, if known.
     */
    mimeType: z.optional(z.string()),
  })
  .passthrough();

/**
 * A template description for resources available on the server.
 */
export const ResourceTemplateSchema = z
  .object({
    /**
     * A URI template (according to RFC 6570) that can be used to construct resource URIs.
     */
    uriTemplate: z.string(),

    /**
     * A human-readable name for the type of resource this template refers to.
     *
     * This can be used by clients to populate UI elements.
     */
    name: z.string(),

    /**
     * A description of what this template is for.
     *
     * This can be used by clients to improve the LLM's understanding of available resources. It can be thought of like a "hint" to the model.
     */
    description: z.optional(z.string()),

    /**
     * The MIME type for all resources that match this template. This should only be included if all resources matching this template have the same type.
     */
    mimeType: z.optional(z.string()),
  })
  .passthrough();

/**
 * Sent from the client to request a list of resources the server has.
 */
export const ListResourcesRequestSchema = PaginatedRequestSchema.extend({
  method: z.literal("resources/list"),
});

/**
 * The server's response to a resources/list request from the client.
 */
export const ListResourcesResultSchema = PaginatedResultSchema.extend({
  resources: z.array(ResourceSchema),
});

/**
 * Sent from the client to request a list of resource templates the server has.
 */
export const ListResourceTemplatesRequestSchema = PaginatedRequestSchema.extend(
  {
    method: z.literal("resources/templates/list"),
  },
);

/**
 * The server's response to a resources/templates/list request from the client.
 */
export const ListResourceTemplatesResultSchema = PaginatedResultSchema.extend({
  resourceTemplates: z.array(ResourceTemplateSchema),
});

/**
 * Sent from the client to the server, to read a specific resource URI.
 */
export const ReadResourceRequestSchema = RequestSchema.extend({
  method: z.literal("resources/read"),
  params: BaseRequestParamsSchema.extend({
    /**
     * The URI of the resource to read. The URI can use any protocol; it is up to the server how to interpret it.
     */
    uri: z.string(),
  }),
});

/**
 * The server's response to a resources/read request from the client.
 */
export const ReadResourceResultSchema = ResultSchema.extend({
  contents: z.array(
    z.union([TextResourceContentsSchema, BlobResourceContentsSchema]),
  ),
});

/**
 * An optional notification from the server to the client, informing it that the list of resources it can read from has changed. This may be issued by servers without any previous subscription from the client.
 */
export const ResourceListChangedNotificationSchema = NotificationSchema.extend({
  method: z.literal("notifications/resources/list_changed"),
});

/**
 * Sent from the client to request resources/updated notifications from the server whenever a particular resource changes.
 */
export const SubscribeRequestSchema = RequestSchema.extend({
  method: z.literal("resources/subscribe"),
  params: BaseRequestParamsSchema.extend({
    /**
     * The URI of the resource to subscribe to. The URI can use any protocol; it is up to the server how to interpret it.
     */
    uri: z.string(),
  }),
});

/**
 * Sent from the client to request cancellation of resources/updated notifications from the server. This should follow a previous resources/subscribe request.
 */
export const UnsubscribeRequestSchema = RequestSchema.extend({
  method: z.literal("resources/unsubscribe"),
  params: BaseRequestParamsSchema.extend({
    /**
     * The URI of the resource to unsubscribe from.
     */
    uri: z.string(),
  }),
});

/**
 * A notification from the server to the client, informing it that a resource has changed and may need to be read again. This should only be sent if the client previously sent a resources/subscribe request.
 */
export const ResourceUpdatedNotificationSchema = NotificationSchema.extend({
  method: z.literal("notifications/resources/updated"),
  params: BaseNotificationParamsSchema.extend({
    /**
     * The URI of the resource that has been updated. This might be a sub-resource of the one that the client actually subscribed to.
     */
    uri: z.string(),
  }),
});

/* Prompts */
/**
 * Describes an argument that a prompt can accept.
 */
export const PromptArgumentSchema = z
  .object({
    /**
     * The name of the argument.
     */
    name: z.string(),
    /**
     * A human-readable description of the argument.
     */
    description: z.optional(z.string()),
    /**
     * Whether this argument must be provided.
     */
    required: z.optional(z.boolean()),
  })
  .passthrough();

/**
 * A prompt or prompt template that the server offers.
 */
export const PromptSchema = z
  .object({
    /**
     * The name of the prompt or prompt template.
     */
    name: z.string(),
    /**
     * An optional description of what this prompt provides
     */
    description: z.optional(z.string()),
    /**
     * A list of arguments to use for templating the prompt.
     */
    arguments: z.optional(z.array(PromptArgumentSchema)),
  })
  .passthrough();

/**
 * Sent from the client to request a list of prompts and prompt templates the server has.
 */
export const ListPromptsRequestSchema = PaginatedRequestSchema.extend({
  method: z.literal("prompts/list"),
});

/**
 * The server's response to a prompts/list request from the client.
 */
export const ListPromptsResultSchema = PaginatedResultSchema.extend({
  prompts: z.array(PromptSchema),
});

/**
 * Used by the client to get a prompt provided by the server.
 */
export const GetPromptRequestSchema = RequestSchema.extend({
  method: z.literal("prompts/get"),
  params: BaseRequestParamsSchema.extend({
    /**
     * The name of the prompt or prompt template.
     */
    name: z.string(),
    /**
     * Arguments to use for templating the prompt.
     */
    arguments: z.optional(z.record(z.string())),
  }),
});

/**
 * Text provided to or from an LLM.
 */
export const TextContentSchema = z
  .object({
    type: z.literal("text"),
    /**
     * The text content of the message.
     */
    text: z.string(),
  })
  .passthrough();

/**
 * An image provided to or from an LLM.
 */
export const ImageContentSchema = z
  .object({
    type: z.literal("image"),
    /**
     * The base64-encoded image data.
     */
    data: z.string().base64(),
    /**
     * The MIME type of the image. Different providers may support different image types.
     */
    mimeType: z.string(),
  })
  .passthrough();

/**
 * An Audio provided to or from an LLM.
 */
export const AudioContentSchema = z
  .object({
    type: z.literal("audio"),
    /**
     * The base64-encoded audio data.
     */
    data: z.string().base64(),
    /**
     * The MIME type of the audio. Different providers may support different audio types.
     */
    mimeType: z.string(),
  })
  .passthrough();

/**
 * The contents of a resource, embedded into a prompt or tool call result.
 */
export const EmbeddedResourceSchema = z
  .object({
    type: z.literal("resource"),
    resource: z.union([TextResourceContentsSchema, BlobResourceContentsSchema]),
  })
  .passthrough();

/**
 * Describes a message returned as part of a prompt.
 */
export const PromptMessageSchema = z
  .object({
    role: z.enum(["user", "assistant"]),
    content: z.union([
      TextContentSchema,
      ImageContentSchema,
      AudioContentSchema,
      EmbeddedResourceSchema,
    ]),
  })
  .passthrough();

/**
 * The server's response to a prompts/get request from the client.
 */
export const GetPromptResultSchema = ResultSchema.extend({
  /**
   * An optional description for the prompt.
   */
  description: z.optional(z.string()),
  messages: z.array(PromptMessageSchema),
});

/**
 * An optional notification from the server to the client, informing it that the list of prompts it offers has changed. This may be issued by servers without any previous subscription from the client.
 */
export const PromptListChangedNotificationSchema = NotificationSchema.extend({
  method: z.literal("notifications/prompts/list_changed"),
});

/* Tools */
/**
 * Additional properties describing a Tool to clients.
 *
 * NOTE: all properties in ToolAnnotations are **hints**.
 * They are not guaranteed to provide a faithful description of
 * tool behavior (including descriptive properties like `title`).
 *
 * Clients should never make tool use decisions based on ToolAnnotations
 * received from untrusted servers.
 */
export const ToolAnnotationsSchema = z
  .object({
    /**
     * A human-readable title for the tool.
     */
    title: z.optional(z.string()),

    /**
     * If true, the tool does not modify its environment.
     *
     * Default: false
     */
    readOnlyHint: z.optional(z.boolean()),

    /**
     * If true, the tool may perform destructive updates to its environment.
     * If false, the tool performs only additive updates.
     *
     * (This property is meaningful only when `readOnlyHint == false`)
     *
     * Default: true
     */
    destructiveHint: z.optional(z.boolean()),

    /**
     * If true, calling the tool repeatedly with the same arguments
     * will have no additional effect on the its environment.
     *
     * (This property is meaningful only when `readOnlyHint == false`)
     *
     * Default: false
     */
    idempotentHint: z.optional(z.boolean()),

    /**
     * If true, this tool may interact with an "open world" of external
     * entities. If false, the tool's domain of interaction is closed.
     * For example, the world of a web search tool is open, whereas that
     * of a memory tool is not.
     *
     * Default: true
     */
    openWorldHint: z.optional(z.boolean()),
  })
  .passthrough();

/**
 * Definition for a tool the client can call.
 */
export const ToolSchema = z
  .object({
    /**
     * The name of the tool.
     */
    name: z.string(),
    /**
     * A human-readable description of the tool.
     */
    description: z.optional(z.string()),
    /**
     * A JSON Schema object defining the expected parameters for the tool.
     */
    inputSchema: z
      .object({
        type: z.literal("object"),
        properties: z.optional(z.object({}).passthrough()),
      })
      .passthrough(),
    /**
     * Optional additional tool information.
     */
    annotations: z.optional(ToolAnnotationsSchema),
  })
  .passthrough();

/**
 * Sent from the client to request a list of tools the server has.
 */
export const ListToolsRequestSchema = PaginatedRequestSchema.extend({
  method: z.literal("tools/list"),
});

/**
 * The server's response to a tools/list request from the client.
 */
export const ListToolsResultSchema = PaginatedResultSchema.extend({
  tools: z.array(ToolSchema),
});

/**
 * The server's response to a tool call.
 */
export const CallToolResultSchema = ResultSchema.extend({
  content: z.array(
    z.union([TextContentSchema, ImageContentSchema, AudioContentSchema, EmbeddedResourceSchema]),
  ),
  isError: z.boolean().default(false).optional(),
});

/**
 * CallToolResultSchema extended with backwards compatibility to protocol version 2024-10-07.
 */
export const CompatibilityCallToolResultSchema = CallToolResultSchema.or(
  ResultSchema.extend({
    toolResult: z.unknown(),
  }),
);

/**
 * Used by the client to invoke a tool provided by the server.
 */
export const CallToolRequestSchema = RequestSchema.extend({
  method: z.literal("tools/call"),
  params: BaseRequestParamsSchema.extend({
    name: z.string(),
    arguments: z.optional(z.record(z.unknown())),
  }),
});

/**
 * An optional notification from the server to the client, informing it that the list of tools it offers has changed. This may be issued by servers without any previous subscription from the client.
 */
export const ToolListChangedNotificationSchema = NotificationSchema.extend({
  method: z.literal("notifications/tools/list_changed"),
});

/* Logging */
/**
 * The severity of a log message.
 */
export const LoggingLevelSchema = z.enum([
  "debug",
  "info",
  "notice",
  "warning",
  "error",
  "critical",
  "alert",
  "emergency",
]);

/**
 * A request from the client to the server, to enable or adjust logging.
 */
export const SetLevelRequestSchema = RequestSchema.extend({
  method: z.literal("logging/setLevel"),
  params: BaseRequestParamsSchema.extend({
    /**
     * The level of logging that the client wants to receive from the server. The server should send all logs at this level and higher (i.e., more severe) to the client as notifications/logging/message.
     */
    level: LoggingLevelSchema,
  }),
});

/**
 * Notification of a log message passed from server to client. If no logging/setLevel request has been sent from the client, the server MAY decide which messages to send automatically.
 */
export const LoggingMessageNotificationSchema = NotificationSchema.extend({
  method: z.literal("notifications/message"),
  params: BaseNotificationParamsSchema.extend({
    /**
     * The severity of this log message.
     */
    level: LoggingLevelSchema,
    /**
     * An optional name of the logger issuing this message.
     */
    logger: z.optional(z.string()),
    /**
     * The data to be logged, such as a string message or an object. Any JSON serializable type is allowed here.
     */
    data: z.unknown(),
  }),
});

/* Sampling */
/**
 * Hints to use for model selection.
 */
export const ModelHintSchema = z
  .object({
    /**
     * A hint for a model name.
     */
    name: z.string().optional(),
  })
  .passthrough();

/**
 * The server's preferences for model selection, requested of the client during sampling.
 */
export const ModelPreferencesSchema = z
  .object({
    /**
     * Optional hints to use for model selection.
     */
    hints: z.optional(z.array(ModelHintSchema)),
    /**
     * How much to prioritize cost when selecting a model.
     */
    costPriority: z.optional(z.number().min(0).max(1)),
    /**
     * How much to prioritize sampling speed (latency) when selecting a model.
     */
    speedPriority: z.optional(z.number().min(0).max(1)),
    /**
     * How much to prioritize intelligence and capabilities when selecting a model.
     */
    intelligencePriority: z.optional(z.number().min(0).max(1)),
  })
  .passthrough();

/**
 * Describes a message issued to or received from an LLM API.
 */
export const SamplingMessageSchema = z
  .object({
    role: z.enum(["user", "assistant"]),
    content: z.union([TextContentSchema, ImageContentSchema, AudioContentSchema]),
  })
  .passthrough();

/**
 * A request from the server to sample an LLM via the client. The client has full discretion over which model to select. The client should also inform the user before beginning sampling, to allow them to inspect the request (human in the loop) and decide whether to approve it.
 */
export const CreateMessageRequestSchema = RequestSchema.extend({
  method: z.literal("sampling/createMessage"),
  params: BaseRequestParamsSchema.extend({
    messages: z.array(SamplingMessageSchema),
    /**
     * An optional system prompt the server wants to use for sampling. The client MAY modify or omit this prompt.
     */
    systemPrompt: z.optional(z.string()),
    /**
     * A request to include context from one or more MCP servers (including the caller), to be attached to the prompt. The client MAY ignore this request.
     */
    includeContext: z.optional(z.enum(["none", "thisServer", "allServers"])),
    temperature: z.optional(z.number()),
    /**
     * The maximum number of tokens to sample, as requested by the server. The client MAY choose to sample fewer tokens than requested.
     */
    maxTokens: z.number().int(),
    stopSequences: z.optional(z.array(z.string())),
    /**
     * Optional metadata to pass through to the LLM provider. The format of this metadata is provider-specific.
     */
    metadata: z.optional(z.object({}).passthrough()),
    /**
     * The server's preferences for which model to select.
     */
    modelPreferences: z.optional(ModelPreferencesSchema),
  }),
});

/**
 * The client's response to a sampling/create_message request from the server. The client should inform the user before returning the sampled message, to allow them to inspect the response (human in the loop) and decide whether to allow the server to see it.
 */
export const CreateMessageResultSchema = ResultSchema.extend({
  /**
   * The name of the model that generated the message.
   */
  model: z.string(),
  /**
   * The reason why sampling stopped.
   */
  stopReason: z.optional(
    z.enum(["endTurn", "stopSequence", "maxTokens"]).or(z.string()),
  ),
  role: z.enum(["user", "assistant"]),
  content: z.discriminatedUnion("type", [
    TextContentSchema,
    ImageContentSchema,
    AudioContentSchema
  ]),
});

/* Autocomplete */
/**
 * A reference to a resource or resource template definition.
 */
export const ResourceReferenceSchema = z
  .object({
    type: z.literal("ref/resource"),
    /**
     * The URI or URI template of the resource.
     */
    uri: z.string(),
  })
  .passthrough();

/**
 * Identifies a prompt.
 */
export const PromptReferenceSchema = z
  .object({
    type: z.literal("ref/prompt"),
    /**
     * The name of the prompt or prompt template
     */
    name: z.string(),
  })
  .passthrough();

/**
 * A request from the client to the server, to ask for completion options.
 */
export const CompleteRequestSchema = RequestSchema.extend({
  method: z.literal("completion/complete"),
  params: BaseRequestParamsSchema.extend({
    ref: z.union([PromptReferenceSchema, ResourceReferenceSchema]),
    /**
     * The argument's information
     */
    argument: z
      .object({
        /**
         * The name of the argument
         */
        name: z.string(),
        /**
         * The value of the argument to use for completion matching.
         */
        value: z.string(),
      })
      .passthrough(),
  }),
});

/**
 * The server's response to a completion/complete request
 */
export const CompleteResultSchema = ResultSchema.extend({
  completion: z
    .object({
      /**
       * An array of completion values. Must not exceed 100 items.
       */
      values: z.array(z.string()).max(100),
      /**
       * The total number of completion options available. This can exceed the number of values actually sent in the response.
       */
      total: z.optional(z.number().int()),
      /**
       * Indicates whether there are additional completion options beyond those provided in the current response, even if the exact total is unknown.
       */
      hasMore: z.optional(z.boolean()),
    })
    .passthrough(),
});

/* Roots */
/**
 * Represents a root directory or file that the server can operate on.
 */
export const RootSchema = z
  .object({
    /**
     * The URI identifying the root. This *must* start with file:// for now.
     */
    uri: z.string().startsWith("file://"),
    /**
     * An optional name for the root.
     */
    name: z.optional(z.string()),
  })
  .passthrough();

/**
 * Sent from the server to request a list of root URIs from the client.
 */
export const ListRootsRequestSchema = RequestSchema.extend({
  method: z.literal("roots/list"),
});

/**
 * The client's response to a roots/list request from the server.
 */
export const ListRootsResultSchema = ResultSchema.extend({
  roots: z.array(RootSchema),
});

/**
 * A notification from the client to the server, informing it that the list of roots has changed.
 */
export const RootsListChangedNotificationSchema = NotificationSchema.extend({
  method: z.literal("notifications/roots/list_changed"),
});

/* Client messages */
export const ClientRequestSchema = z.union([
  PingRequestSchema,
  InitializeRequestSchema,
  CompleteRequestSchema,
  SetLevelRequestSchema,
  GetPromptRequestSchema,
  ListPromptsRequestSchema,
  ListResourcesRequestSchema,
  ListResourceTemplatesRequestSchema,
  ReadResourceRequestSchema,
  SubscribeRequestSchema,
  UnsubscribeRequestSchema,
  CallToolRequestSchema,
  ListToolsRequestSchema,
]);

export const ClientNotificationSchema = z.union([
  CancelledNotificationSchema,
  ProgressNotificationSchema,
  InitializedNotificationSchema,
  RootsListChangedNotificationSchema,
]);

export const ClientResultSchema = z.union([
  EmptyResultSchema,
  CreateMessageResultSchema,
  ListRootsResultSchema,
]);

/* Server messages */
export const ServerRequestSchema = z.union([
  PingRequestSchema,
  CreateMessageRequestSchema,
  ListRootsRequestSchema,
]);

export const ServerNotificationSchema = z.union([
  CancelledNotificationSchema,
  ProgressNotificationSchema,
  LoggingMessageNotificationSchema,
  ResourceUpdatedNotificationSchema,
  ResourceListChangedNotificationSchema,
  ToolListChangedNotificationSchema,
  PromptListChangedNotificationSchema,
]);

export const ServerResultSchema = z.union([
  EmptyResultSchema,
  InitializeResultSchema,
  CompleteResultSchema,
  GetPromptResultSchema,
  ListPromptsResultSchema,
  ListResourcesResultSchema,
  ListResourceTemplatesResultSchema,
  ReadResourceResultSchema,
  CallToolResultSchema,
  ListToolsResultSchema,
]);

export class McpError extends Error {
  constructor(
    public readonly code: number,
    message: string,
    public readonly data?: unknown,
  ) {
    super(`MCP error ${code}: ${message}`);
    this.name = "McpError";
  }
}

type Primitive = string | number | boolean | bigint | null | undefined;
type Flatten<T> = T extends Primitive
  ? T
  : T extends Array<infer U>
  ? Array<Flatten<U>>
  : T extends Set<infer U>
  ? Set<Flatten<U>>
  : T extends Map<infer K, infer V>
  ? Map<Flatten<K>, Flatten<V>>
  : T extends object
  ? { [K in keyof T]: Flatten<T[K]> }
  : T;

type Infer<Schema extends ZodTypeAny> = Flatten<z.infer<Schema>>;

/* JSON-RPC types */
export type ProgressToken = Infer<typeof ProgressTokenSchema>;
export type Cursor = Infer<typeof CursorSchema>;
export type Request = Infer<typeof RequestSchema>;
export type RequestMeta = Infer<typeof RequestMetaSchema>;
export type Notification = Infer<typeof NotificationSchema>;
export type Result = Infer<typeof ResultSchema>;
export type RequestId = Infer<typeof RequestIdSchema>;
export type JSONRPCRequest = Infer<typeof JSONRPCRequestSchema>;
export type JSONRPCNotification = Infer<typeof JSONRPCNotificationSchema>;
export type JSONRPCResponse = Infer<typeof JSONRPCResponseSchema>;
export type JSONRPCError = Infer<typeof JSONRPCErrorSchema>;
export type JSONRPCMessage = Infer<typeof JSONRPCMessageSchema>;

/* Empty result */
export type EmptyResult = Infer<typeof EmptyResultSchema>;

/* Cancellation */
export type CancelledNotification = Infer<typeof CancelledNotificationSchema>;

/* Initialization */
export type Implementation = Infer<typeof ImplementationSchema>;
export type ClientCapabilities = Infer<typeof ClientCapabilitiesSchema>;
export type InitializeRequest = Infer<typeof InitializeRequestSchema>;
export type ServerCapabilities = Infer<typeof ServerCapabilitiesSchema>;
export type InitializeResult = Infer<typeof InitializeResultSchema>;
export type InitializedNotification = Infer<typeof InitializedNotificationSchema>;

/* Ping */
export type PingRequest = Infer<typeof PingRequestSchema>;

/* Progress notifications */
export type Progress = Infer<typeof ProgressSchema>;
export type ProgressNotification = Infer<typeof ProgressNotificationSchema>;

/* Pagination */
export type PaginatedRequest = Infer<typeof PaginatedRequestSchema>;
export type PaginatedResult = Infer<typeof PaginatedResultSchema>;

/* Resources */
export type ResourceContents = Infer<typeof ResourceContentsSchema>;
export type TextResourceContents = Infer<typeof TextResourceContentsSchema>;
export type BlobResourceContents = Infer<typeof BlobResourceContentsSchema>;
export type Resource = Infer<typeof ResourceSchema>;
export type ResourceTemplate = Infer<typeof ResourceTemplateSchema>;
export type ListResourcesRequest = Infer<typeof ListResourcesRequestSchema>;
export type ListResourcesResult = Infer<typeof ListResourcesResultSchema>;
export type ListResourceTemplatesRequest = Infer<typeof ListResourceTemplatesRequestSchema>;
export type ListResourceTemplatesResult = Infer<typeof ListResourceTemplatesResultSchema>;
export type ReadResourceRequest = Infer<typeof ReadResourceRequestSchema>;
export type ReadResourceResult = Infer<typeof ReadResourceResultSchema>;
export type ResourceListChangedNotification = Infer<typeof ResourceListChangedNotificationSchema>;
export type SubscribeRequest = Infer<typeof SubscribeRequestSchema>;
export type UnsubscribeRequest = Infer<typeof UnsubscribeRequestSchema>;
export type ResourceUpdatedNotification = Infer<typeof ResourceUpdatedNotificationSchema>;

/* Prompts */
export type PromptArgument = Infer<typeof PromptArgumentSchema>;
export type Prompt = Infer<typeof PromptSchema>;
export type ListPromptsRequest = Infer<typeof ListPromptsRequestSchema>;
export type ListPromptsResult = Infer<typeof ListPromptsResultSchema>;
export type GetPromptRequest = Infer<typeof GetPromptRequestSchema>;
export type TextContent = Infer<typeof TextContentSchema>;
export type ImageContent = Infer<typeof ImageContentSchema>;
export type AudioContent = Infer<typeof AudioContentSchema>;
export type EmbeddedResource = Infer<typeof EmbeddedResourceSchema>;
export type PromptMessage = Infer<typeof PromptMessageSchema>;
export type GetPromptResult = Infer<typeof GetPromptResultSchema>;
export type PromptListChangedNotification = Infer<typeof PromptListChangedNotificationSchema>;

/* Tools */
export type ToolAnnotations = Infer<typeof ToolAnnotationsSchema>;
export type Tool = Infer<typeof ToolSchema>;
export type ListToolsRequest = Infer<typeof ListToolsRequestSchema>;
export type ListToolsResult = Infer<typeof ListToolsResultSchema>;
export type CallToolResult = Infer<typeof CallToolResultSchema>;
export type CompatibilityCallToolResult = Infer<typeof CompatibilityCallToolResultSchema>;
export type CallToolRequest = Infer<typeof CallToolRequestSchema>;
export type ToolListChangedNotification = Infer<typeof ToolListChangedNotificationSchema>;

/* Logging */
export type LoggingLevel = Infer<typeof LoggingLevelSchema>;
export type SetLevelRequest = Infer<typeof SetLevelRequestSchema>;
export type LoggingMessageNotification = Infer<typeof LoggingMessageNotificationSchema>;

/* Sampling */
export type SamplingMessage = Infer<typeof SamplingMessageSchema>;
export type CreateMessageRequest = Infer<typeof CreateMessageRequestSchema>;
export type CreateMessageResult = Infer<typeof CreateMessageResultSchema>;

/* Autocomplete */
export type ResourceReference = Infer<typeof ResourceReferenceSchema>;
export type PromptReference = Infer<typeof PromptReferenceSchema>;
export type CompleteRequest = Infer<typeof CompleteRequestSchema>;
export type CompleteResult = Infer<typeof CompleteResultSchema>;

/* Roots */
export type Root = Infer<typeof RootSchema>;
export type ListRootsRequest = Infer<typeof ListRootsRequestSchema>;
export type ListRootsResult = Infer<typeof ListRootsResultSchema>;
export type RootsListChangedNotification = Infer<typeof RootsListChangedNotificationSchema>;

/* Client messages */
export type ClientRequest = Infer<typeof ClientRequestSchema>;
export type ClientNotification = Infer<typeof ClientNotificationSchema>;
export type ClientResult = Infer<typeof ClientResultSchema>;

/* Server messages */
export type ServerRequest = Infer<typeof ServerRequestSchema>;
export type ServerNotification = Infer<typeof ServerNotificationSchema>;
export type ServerResult = Infer<typeof ServerResultSchema>;



================================================
FILE: src/__mocks__/pkce-challenge.ts
================================================
export default function pkceChallenge() {
  return {
    code_verifier: "test_verifier",
    code_challenge: "test_challenge",
  };
}


================================================
FILE: src/client/auth.test.ts
================================================
import {
  discoverOAuthMetadata,
  startAuthorization,
  exchangeAuthorization,
  refreshAuthorization,
  registerClient,
} from "./auth.js";

// Mock fetch globally
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("OAuth Authorization", () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  describe("discoverOAuthMetadata", () => {
    const validMetadata = {
      issuer: "https://auth.example.com",
      authorization_endpoint: "https://auth.example.com/authorize",
      token_endpoint: "https://auth.example.com/token",
      registration_endpoint: "https://auth.example.com/register",
      response_types_supported: ["code"],
      code_challenge_methods_supported: ["S256"],
    };

    it("returns metadata when discovery succeeds", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => validMetadata,
      });

      const metadata = await discoverOAuthMetadata("https://auth.example.com");
      expect(metadata).toEqual(validMetadata);
      const calls = mockFetch.mock.calls;
      expect(calls.length).toBe(1);
      const [url, options] = calls[0];
      expect(url.toString()).toBe("https://auth.example.com/.well-known/oauth-authorization-server");
      expect(options.headers).toEqual({
        "MCP-Protocol-Version": "2025-03-26"
      });
    });

    it("returns metadata when first fetch fails but second without MCP header succeeds", async () => {
      // Set up a counter to control behavior
      let callCount = 0;

      // Mock implementation that changes behavior based on call count
      mockFetch.mockImplementation((_url, _options) => {
        callCount++;

        if (callCount === 1) {
          // First call with MCP header - fail with TypeError (simulating CORS error)
          // We need to use TypeError specifically because that's what the implementation checks for
          return Promise.reject(new TypeError("Network error"));
        } else {
          // Second call without header - succeed
          return Promise.resolve({
            ok: true,
            status: 200,
            json: async () => validMetadata
          });
        }
      });

      // Should succeed with the second call
      const metadata = await discoverOAuthMetadata("https://auth.example.com");
      expect(metadata).toEqual(validMetadata);

      // Verify both calls were made
      expect(mockFetch).toHaveBeenCalledTimes(2);

      // Verify first call had MCP header
      expect(mockFetch.mock.calls[0][1]?.headers).toHaveProperty("MCP-Protocol-Version");
    });

    it("throws an error when all fetch attempts fail", async () => {
      // Set up a counter to control behavior
      let callCount = 0;

      // Mock implementation that changes behavior based on call count
      mockFetch.mockImplementation((_url, _options) => {
        callCount++;

        if (callCount === 1) {
          // First call - fail with TypeError
          return Promise.reject(new TypeError("First failure"));
        } else {
          // Second call - fail with different error
          return Promise.reject(new Error("Second failure"));
        }
      });

      // Should fail with the second error
      await expect(discoverOAuthMetadata("https://auth.example.com"))
        .rejects.toThrow("Second failure");

      // Verify both calls were made
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });

    it("returns undefined when discovery endpoint returns 404", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      const metadata = await discoverOAuthMetadata("https://auth.example.com");
      expect(metadata).toBeUndefined();
    });

    it("throws on non-404 errors", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      await expect(
        discoverOAuthMetadata("https://auth.example.com")
      ).rejects.toThrow("HTTP 500");
    });

    it("validates metadata schema", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          // Missing required fields
          issuer: "https://auth.example.com",
        }),
      });

      await expect(
        discoverOAuthMetadata("https://auth.example.com")
      ).rejects.toThrow();
    });
  });

  describe("startAuthorization", () => {
    const validMetadata = {
      issuer: "https://auth.example.com",
      authorization_endpoint: "https://auth.example.com/auth",
      token_endpoint: "https://auth.example.com/tkn",
      response_types_supported: ["code"],
      code_challenge_methods_supported: ["S256"],
    };

    const validClientInfo = {
      client_id: "client123",
      client_secret: "secret123",
      redirect_uris: ["http://localhost:3000/callback"],
      client_name: "Test Client",
    };

    it("generates authorization URL with PKCE challenge", async () => {
      const { authorizationUrl, codeVerifier } = await startAuthorization(
        "https://auth.example.com",
        {
          clientInformation: validClientInfo,
          redirectUrl: "http://localhost:3000/callback",
        }
      );

      expect(authorizationUrl.toString()).toMatch(
        /^https:\/\/auth\.example\.com\/authorize\?/
      );
      expect(authorizationUrl.searchParams.get("response_type")).toBe("code");
      expect(authorizationUrl.searchParams.get("code_challenge")).toBe("test_challenge");
      expect(authorizationUrl.searchParams.get("code_challenge_method")).toBe(
        "S256"
      );
      expect(authorizationUrl.searchParams.get("redirect_uri")).toBe(
        "http://localhost:3000/callback"
      );
      expect(codeVerifier).toBe("test_verifier");
    });

    it("uses metadata authorization_endpoint when provided", async () => {
      const { authorizationUrl } = await startAuthorization(
        "https://auth.example.com",
        {
          metadata: validMetadata,
          clientInformation: validClientInfo,
          redirectUrl: "http://localhost:3000/callback",
        }
      );

      expect(authorizationUrl.toString()).toMatch(
        /^https:\/\/auth\.example\.com\/auth\?/
      );
    });

    it("validates response type support", async () => {
      const metadata = {
        ...validMetadata,
        response_types_supported: ["token"], // Does not support 'code'
      };

      await expect(
        startAuthorization("https://auth.example.com", {
          metadata,
          clientInformation: validClientInfo,
          redirectUrl: "http://localhost:3000/callback",
        })
      ).rejects.toThrow(/does not support response type/);
    });

    it("validates PKCE support", async () => {
      const metadata = {
        ...validMetadata,
        response_types_supported: ["code"],
        code_challenge_methods_supported: ["plain"], // Does not support 'S256'
      };

      await expect(
        startAuthorization("https://auth.example.com", {
          metadata,
          clientInformation: validClientInfo,
          redirectUrl: "http://localhost:3000/callback",
        })
      ).rejects.toThrow(/does not support code challenge method/);
    });
  });

  describe("exchangeAuthorization", () => {
    const validTokens = {
      access_token: "access123",
      token_type: "Bearer",
      expires_in: 3600,
      refresh_token: "refresh123",
    };

    const validClientInfo = {
      client_id: "client123",
      client_secret: "secret123",
      redirect_uris: ["http://localhost:3000/callback"],
      client_name: "Test Client",
    };

    it("exchanges code for tokens", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => validTokens,
      });

      const tokens = await exchangeAuthorization("https://auth.example.com", {
        clientInformation: validClientInfo,
        authorizationCode: "code123",
        codeVerifier: "verifier123",
        redirectUri: "http://localhost:3000/callback",
      });

      expect(tokens).toEqual(validTokens);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.objectContaining({
          href: "https://auth.example.com/token",
        }),
        expect.objectContaining({
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
      );

      const body = mockFetch.mock.calls[0][1].body as URLSearchParams;
      expect(body.get("grant_type")).toBe("authorization_code");
      expect(body.get("code")).toBe("code123");
      expect(body.get("code_verifier")).toBe("verifier123");
      expect(body.get("client_id")).toBe("client123");
      expect(body.get("client_secret")).toBe("secret123");
      expect(body.get("redirect_uri")).toBe("http://localhost:3000/callback");
    });

    it("validates token response schema", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          // Missing required fields
          access_token: "access123",
        }),
      });

      await expect(
        exchangeAuthorization("https://auth.example.com", {
          clientInformation: validClientInfo,
          authorizationCode: "code123",
          codeVerifier: "verifier123",
          redirectUri: "http://localhost:3000/callback",
        })
      ).rejects.toThrow();
    });

    it("throws on error response", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
      });

      await expect(
        exchangeAuthorization("https://auth.example.com", {
          clientInformation: validClientInfo,
          authorizationCode: "code123",
          codeVerifier: "verifier123",
          redirectUri: "http://localhost:3000/callback",
        })
      ).rejects.toThrow("Token exchange failed");
    });
  });

  describe("refreshAuthorization", () => {
    const validTokens = {
      access_token: "newaccess123",
      token_type: "Bearer",
      expires_in: 3600,
      refresh_token: "newrefresh123",
    };

    const validClientInfo = {
      client_id: "client123",
      client_secret: "secret123",
      redirect_uris: ["http://localhost:3000/callback"],
      client_name: "Test Client",
    };

    it("exchanges refresh token for new tokens", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => validTokens,
      });

      const tokens = await refreshAuthorization("https://auth.example.com", {
        clientInformation: validClientInfo,
        refreshToken: "refresh123",
      });

      expect(tokens).toEqual(validTokens);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.objectContaining({
          href: "https://auth.example.com/token",
        }),
        expect.objectContaining({
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
      );

      const body = mockFetch.mock.calls[0][1].body as URLSearchParams;
      expect(body.get("grant_type")).toBe("refresh_token");
      expect(body.get("refresh_token")).toBe("refresh123");
      expect(body.get("client_id")).toBe("client123");
      expect(body.get("client_secret")).toBe("secret123");
    });

    it("validates token response schema", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          // Missing required fields
          access_token: "newaccess123",
        }),
      });

      await expect(
        refreshAuthorization("https://auth.example.com", {
          clientInformation: validClientInfo,
          refreshToken: "refresh123",
        })
      ).rejects.toThrow();
    });

    it("throws on error response", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
      });

      await expect(
        refreshAuthorization("https://auth.example.com", {
          clientInformation: validClientInfo,
          refreshToken: "refresh123",
        })
      ).rejects.toThrow("Token refresh failed");
    });
  });

  describe("registerClient", () => {
    const validClientMetadata = {
      redirect_uris: ["http://localhost:3000/callback"],
      client_name: "Test Client",
    };

    const validClientInfo = {
      client_id: "client123",
      client_secret: "secret123",
      client_id_issued_at: 1612137600,
      client_secret_expires_at: 1612224000,
      ...validClientMetadata,
    };

    it("registers client and returns client information", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => validClientInfo,
      });

      const clientInfo = await registerClient("https://auth.example.com", {
        clientMetadata: validClientMetadata,
      });

      expect(clientInfo).toEqual(validClientInfo);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.objectContaining({
          href: "https://auth.example.com/register",
        }),
        expect.objectContaining({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(validClientMetadata),
        })
      );
    });

    it("validates client information response schema", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          // Missing required fields
          client_secret: "secret123",
        }),
      });

      await expect(
        registerClient("https://auth.example.com", {
          clientMetadata: validClientMetadata,
        })
      ).rejects.toThrow();
    });

    it("throws when registration endpoint not available in metadata", async () => {
      const metadata = {
        issuer: "https://auth.example.com",
        authorization_endpoint: "https://auth.example.com/authorize",
        token_endpoint: "https://auth.example.com/token",
        response_types_supported: ["code"],
      };

      await expect(
        registerClient("https://auth.example.com", {
          metadata,
          clientMetadata: validClientMetadata,
        })
      ).rejects.toThrow(/does not support dynamic client registration/);
    });

    it("throws on error response", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
      });

      await expect(
        registerClient("https://auth.example.com", {
          clientMetadata: validClientMetadata,
        })
      ).rejects.toThrow("Dynamic client registration failed");
    });
  });
});



================================================
FILE: src/client/auth.ts
================================================
import pkceChallenge from "pkce-challenge";
import { LATEST_PROTOCOL_VERSION } from "../types.js";
import type { OAuthClientMetadata, OAuthClientInformation, OAuthTokens, OAuthMetadata, OAuthClientInformationFull } from "../shared/auth.js";
import { OAuthClientInformationFullSchema, OAuthMetadataSchema, OAuthTokensSchema } from "../shared/auth.js";

/**
 * Implements an end-to-end OAuth client to be used with one MCP server.
 * 
 * This client relies upon a concept of an authorized "session," the exact
 * meaning of which is application-defined. Tokens, authorization codes, and
 * code verifiers should not cross different sessions.
 */
export interface OAuthClientProvider {
  /**
   * The URL to redirect the user agent to after authorization.
   */
  get redirectUrl(): string | URL;

  /**
   * Metadata about this OAuth client.
   */
  get clientMetadata(): OAuthClientMetadata;

  /**
   * Loads information about this OAuth client, as registered already with the
   * server, or returns `undefined` if the client is not registered with the
   * server.
   */
  clientInformation(): OAuthClientInformation | undefined | Promise<OAuthClientInformation | undefined>;

  /**
   * If implemented, this permits the OAuth client to dynamically register with
   * the server. Client information saved this way should later be read via
   * `clientInformation()`.
   * 
   * This method is not required to be implemented if client information is
   * statically known (e.g., pre-registered).
   */
  saveClientInformation?(clientInformation: OAuthClientInformationFull): void | Promise<void>;

  /**
   * Loads any existing OAuth tokens for the current session, or returns
   * `undefined` if there are no saved tokens.
   */
  tokens(): OAuthTokens | undefined | Promise<OAuthTokens | undefined>;

  /**
   * Stores new OAuth tokens for the current session, after a successful
   * authorization.
   */
  saveTokens(tokens: OAuthTokens): void | Promise<void>;

  /**
   * Invoked to redirect the user agent to the given URL to begin the authorization flow.
   */
  redirectToAuthorization(authorizationUrl: URL): void | Promise<void>;

  /**
   * Saves a PKCE code verifier for the current session, before redirecting to
   * the authorization flow.
   */
  saveCodeVerifier(codeVerifier: string): void | Promise<void>;

  /**
   * Loads the PKCE code verifier for the current session, necessary to validate
   * the authorization result.
   */
  codeVerifier(): string | Promise<string>;
}

export type AuthResult = "AUTHORIZED" | "REDIRECT";

export class UnauthorizedError extends Error {
  constructor(message?: string) {
    super(message ?? "Unauthorized");
  }
}

/**
 * Orchestrates the full auth flow with a server.
 * 
 * This can be used as a single entry point for all authorization functionality,
 * instead of linking together the other lower-level functions in this module.
 */
export async function auth(
  provider: OAuthClientProvider,
  { serverUrl, authorizationCode }: { serverUrl: string | URL, authorizationCode?: string }): Promise<AuthResult> {
  const metadata = await discoverOAuthMetadata(serverUrl);

  // Handle client registration if needed
  let clientInformation = await Promise.resolve(provider.clientInformation());
  if (!clientInformation) {
    if (authorizationCode !== undefined) {
      throw new Error("Existing OAuth client information is required when exchanging an authorization code");
    }

    if (!provider.saveClientInformation) {
      throw new Error("OAuth client information must be saveable for dynamic registration");
    }

    const fullInformation = await registerClient(serverUrl, {
      metadata,
      clientMetadata: provider.clientMetadata,
    });

    await provider.saveClientInformation(fullInformation);
    clientInformation = fullInformation;
  }

  // Exchange authorization code for tokens
  if (authorizationCode !== undefined) {
    const codeVerifier = await provider.codeVerifier();
    const tokens = await exchangeAuthorization(serverUrl, {
      metadata,
      clientInformation,
      authorizationCode,
      codeVerifier,
      redirectUri: provider.redirectUrl,
    });

    await provider.saveTokens(tokens);
    return "AUTHORIZED";
  }

  const tokens = await provider.tokens();

  // Handle token refresh or new authorization
  if (tokens?.refresh_token) {
    try {
      // Attempt to refresh the token
      const newTokens = await refreshAuthorization(serverUrl, {
        metadata,
        clientInformation,
        refreshToken: tokens.refresh_token,
      });

      await provider.saveTokens(newTokens);
      return "AUTHORIZED";
    } catch (error) {
      console.error("Could not refresh OAuth tokens:", error);
    }
  }

  // Start new authorization flow
  const { authorizationUrl, codeVerifier } = await startAuthorization(serverUrl, {
    metadata,
    clientInformation,
    redirectUrl: provider.redirectUrl
  });

  await provider.saveCodeVerifier(codeVerifier);
  await provider.redirectToAuthorization(authorizationUrl);
  return "REDIRECT";
}

/**
 * Looks up RFC 8414 OAuth 2.0 Authorization Server Metadata.
 *
 * If the server returns a 404 for the well-known endpoint, this function will
 * return `undefined`. Any other errors will be thrown as exceptions.
 */
export async function discoverOAuthMetadata(
  serverUrl: string | URL,
  opts?: { protocolVersion?: string },
): Promise<OAuthMetadata | undefined> {
  const url = new URL("/.well-known/oauth-authorization-server", serverUrl);
  let response: Response;
  try {
    response = await fetch(url, {
      headers: {
        "MCP-Protocol-Version": opts?.protocolVersion ?? LATEST_PROTOCOL_VERSION
      }
    });
  } catch (error) {
    // CORS errors come back as TypeError
    if (error instanceof TypeError) {
      response = await fetch(url);
    } else {
      throw error;
    }
  }

  if (response.status === 404) {
    return undefined;
  }

  if (!response.ok) {
    throw new Error(
      `HTTP ${response.status} trying to load well-known OAuth metadata`,
    );
  }

  return OAuthMetadataSchema.parse(await response.json());
}

/**
 * Begins the authorization flow with the given server, by generating a PKCE challenge and constructing the authorization URL.
 */
export async function startAuthorization(
  serverUrl: string | URL,
  {
    metadata,
    clientInformation,
    redirectUrl,
  }: {
    metadata?: OAuthMetadata;
    clientInformation: OAuthClientInformation;
    redirectUrl: string | URL;
  },
): Promise<{ authorizationUrl: URL; codeVerifier: string }> {
  const responseType = "code";
  const codeChallengeMethod = "S256";

  let authorizationUrl: URL;
  if (metadata) {
    authorizationUrl = new URL(metadata.authorization_endpoint);

    if (!metadata.response_types_supported.includes(responseType)) {
      throw new Error(
        `Incompatible auth server: does not support response type ${responseType}`,
      );
    }

    if (
      !metadata.code_challenge_methods_supported ||
      !metadata.code_challenge_methods_supported.includes(codeChallengeMethod)
    ) {
      throw new Error(
        `Incompatible auth server: does not support code challenge method ${codeChallengeMethod}`,
      );
    }
  } else {
    authorizationUrl = new URL("/authorize", serverUrl);
  }

  // Generate PKCE challenge
  const challenge = await pkceChallenge();
  const codeVerifier = challenge.code_verifier;
  const codeChallenge = challenge.code_challenge;

  authorizationUrl.searchParams.set("response_type", responseType);
  authorizationUrl.searchParams.set("client_id", clientInformation.client_id);
  authorizationUrl.searchParams.set("code_challenge", codeChallenge);
  authorizationUrl.searchParams.set(
    "code_challenge_method",
    codeChallengeMethod,
  );
  authorizationUrl.searchParams.set("redirect_uri", String(redirectUrl));

  return { authorizationUrl, codeVerifier };
}

/**
 * Exchanges an authorization code for an access token with the given server.
 */
export async function exchangeAuthorization(
  serverUrl: string | URL,
  {
    metadata,
    clientInformation,
    authorizationCode,
    codeVerifier,
    redirectUri,
  }: {
    metadata?: OAuthMetadata;
    clientInformation: OAuthClientInformation;
    authorizationCode: string;
    codeVerifier: string;
    redirectUri: string | URL;
  },
): Promise<OAuthTokens> {
  const grantType = "authorization_code";

  let tokenUrl: URL;
  if (metadata) {
    tokenUrl = new URL(metadata.token_endpoint);

    if (
      metadata.grant_types_supported &&
      !metadata.grant_types_supported.includes(grantType)
    ) {
      throw new Error(
        `Incompatible auth server: does not support grant type ${grantType}`,
      );
    }
  } else {
    tokenUrl = new URL("/token", serverUrl);
  }

  // Exchange code for tokens
  const params = new URLSearchParams({
    grant_type: grantType,
    client_id: clientInformation.client_id,
    code: authorizationCode,
    code_verifier: codeVerifier,
    redirect_uri: String(redirectUri),
  });

  if (clientInformation.client_secret) {
    params.set("client_secret", clientInformation.client_secret);
  }

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  if (!response.ok) {
    throw new Error(`Token exchange failed: HTTP ${response.status}`);
  }

  return OAuthTokensSchema.parse(await response.json());
}

/**
 * Exchange a refresh token for an updated access token.
 */
export async function refreshAuthorization(
  serverUrl: string | URL,
  {
    metadata,
    clientInformation,
    refreshToken,
  }: {
    metadata?: OAuthMetadata;
    clientInformation: OAuthClientInformation;
    refreshToken: string;
  },
): Promise<OAuthTokens> {
  const grantType = "refresh_token";

  let tokenUrl: URL;
  if (metadata) {
    tokenUrl = new URL(metadata.token_endpoint);

    if (
      metadata.grant_types_supported &&
      !metadata.grant_types_supported.includes(grantType)
    ) {
      throw new Error(
        `Incompatible auth server: does not support grant type ${grantType}`,
      );
    }
  } else {
    tokenUrl = new URL("/token", serverUrl);
  }

  // Exchange refresh token
  const params = new URLSearchParams({
    grant_type: grantType,
    client_id: clientInformation.client_id,
    refresh_token: refreshToken,
  });

  if (clientInformation.client_secret) {
    params.set("client_secret", clientInformation.client_secret);
  }

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  if (!response.ok) {
    throw new Error(`Token refresh failed: HTTP ${response.status}`);
  }

  return OAuthTokensSchema.parse(await response.json());
}

/**
 * Performs OAuth 2.0 Dynamic Client Registration according to RFC 7591.
 */
export async function registerClient(
  serverUrl: string | URL,
  {
    metadata,
    clientMetadata,
  }: {
    metadata?: OAuthMetadata;
    clientMetadata: OAuthClientMetadata;
  },
): Promise<OAuthClientInformationFull> {
  let registrationUrl: URL;

  if (metadata) {
    if (!metadata.registration_endpoint) {
      throw new Error("Incompatible auth server: does not support dynamic client registration");
    }

    registrationUrl = new URL(metadata.registration_endpoint);
  } else {
    registrationUrl = new URL("/register", serverUrl);
  }

  const response = await fetch(registrationUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(clientMetadata),
  });

  if (!response.ok) {
    throw new Error(`Dynamic client registration failed: HTTP ${response.status}`);
  }

  return OAuthClientInformationFullSchema.parse(await response.json());
}


================================================
FILE: src/client/cross-spawn.test.ts
================================================
import { StdioClientTransport } from "./stdio.js";
import spawn from "cross-spawn";
import { JSONRPCMessage } from "../types.js";
import { ChildProcess } from "node:child_process";

// mock cross-spawn
jest.mock("cross-spawn");
const mockSpawn = spawn as jest.MockedFunction<typeof spawn>;

describe("StdioClientTransport using cross-spawn", () => {
  beforeEach(() => {
    // mock cross-spawn's return value
    mockSpawn.mockImplementation(() => {
      const mockProcess: {
        on: jest.Mock;
        stdin?: { on: jest.Mock; write: jest.Mock };
        stdout?: { on: jest.Mock };
        stderr?: null;
      } = {
        on: jest.fn((event: string, callback: () => void) => {
          if (event === "spawn") {
            callback();
          }
          return mockProcess;
        }),
        stdin: {
          on: jest.fn(),
          write: jest.fn().mockReturnValue(true)
        },
        stdout: {
          on: jest.fn()
        },
        stderr: null
      };
      return mockProcess as unknown as ChildProcess;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should call cross-spawn correctly", async () => {
    const transport = new StdioClientTransport({
      command: "test-command",
      args: ["arg1", "arg2"]
    });

    await transport.start();

    // verify spawn is called correctly
    expect(mockSpawn).toHaveBeenCalledWith(
      "test-command",
      ["arg1", "arg2"],
      expect.objectContaining({
        shell: false
      })
    );
  });

  test("should pass environment variables correctly", async () => {
    const customEnv = { TEST_VAR: "test-value" };
    const transport = new StdioClientTransport({
      command: "test-command",
      env: customEnv
    });

    await transport.start();

    // verify environment variables are passed correctly
    expect(mockSpawn).toHaveBeenCalledWith(
      "test-command",
      [],
      expect.objectContaining({
        env: customEnv
      })
    );
  });

  test("should send messages correctly", async () => {
    const transport = new StdioClientTransport({
      command: "test-command"
    });

    // get the mock process object
    const mockProcess: {
      on: jest.Mock;
      stdin: {
        on: jest.Mock;
        write: jest.Mock;
        once: jest.Mock;
      };
      stdout: {
        on: jest.Mock;
      };
      stderr: null;
    } = {
      on: jest.fn((event: string, callback: () => void) => {
        if (event === "spawn") {
          callback();
        }
        return mockProcess;
      }),
      stdin: {
        on: jest.fn(),
        write: jest.fn().mockReturnValue(true),
        once: jest.fn()
      },
      stdout: {
        on: jest.fn()
      },
      stderr: null
    };

    mockSpawn.mockReturnValue(mockProcess as unknown as ChildProcess);

    await transport.start();

    // 关键修复：确保 jsonrpc 是字面量 "2.0"
    const message: JSONRPCMessage = {
      jsonrpc: "2.0",
      id: "test-id",
      method: "test-method"
    };

    await transport.send(message);

    // verify message is sent correctly
    expect(mockProcess.stdin.write).toHaveBeenCalled();
  });
});


================================================
FILE: src/client/index.test.ts
================================================
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-constant-binary-expression */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Client } from "./index.js";
import { z } from "zod";
import {
  RequestSchema,
  NotificationSchema,
  ResultSchema,
  LATEST_PROTOCOL_VERSION,
  SUPPORTED_PROTOCOL_VERSIONS,
  InitializeRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  CreateMessageRequestSchema,
  ListRootsRequestSchema,
  ErrorCode,
} from "../types.js";
import { Transport } from "../shared/transport.js";
import { Server } from "../server/index.js";
import { InMemoryTransport } from "../inMemory.js";

test("should initialize with matching protocol version", async () => {
  const clientTransport: Transport = {
    start: jest.fn().mockResolvedValue(undefined),
    close: jest.fn().mockResolvedValue(undefined),
    send: jest.fn().mockImplementation((message) => {
      if (message.method === "initialize") {
        clientTransport.onmessage?.({
          jsonrpc: "2.0",
          id: message.id,
          result: {
            protocolVersion: LATEST_PROTOCOL_VERSION,
            capabilities: {},
            serverInfo: {
              name: "test",
              version: "1.0",
            },
            instructions: "test instructions",
          },
        });
      }
      return Promise.resolve();
    }),
  };

  const client = new Client(
    {
      name: "test client",
      version: "1.0",
    },
    {
      capabilities: {
        sampling: {},
      },
    },
  );

  await client.connect(clientTransport);

  // Should have sent initialize with latest version
  expect(clientTransport.send).toHaveBeenCalledWith(
    expect.objectContaining({
      method: "initialize",
      params: expect.objectContaining({
        protocolVersion: LATEST_PROTOCOL_VERSION,
      }),
    }),
    expect.objectContaining({
      relatedRequestId: undefined,
    }),
  );

  // Should have the instructions returned
  expect(client.getInstructions()).toEqual("test instructions");
});

test("should initialize with supported older protocol version", async () => {
  const OLD_VERSION = SUPPORTED_PROTOCOL_VERSIONS[1];
  const clientTransport: Transport = {
    start: jest.fn().mockResolvedValue(undefined),
    close: jest.fn().mockResolvedValue(undefined),
    send: jest.fn().mockImplementation((message) => {
      if (message.method === "initialize") {
        clientTransport.onmessage?.({
          jsonrpc: "2.0",
          id: message.id,
          result: {
            protocolVersion: OLD_VERSION,
            capabilities: {},
            serverInfo: {
              name: "test",
              version: "1.0",
            },
          },
        });
      }
      return Promise.resolve();
    }),
  };

  const client = new Client(
    {
      name: "test client",
      version: "1.0",
    },
    {
      capabilities: {
        sampling: {},
      },
    },
  );

  await client.connect(clientTransport);

  // Connection should succeed with the older version
  expect(client.getServerVersion()).toEqual({
    name: "test",
    version: "1.0",
  });

  // Expect no instructions
  expect(client.getInstructions()).toBeUndefined();
});

test("should reject unsupported protocol version", async () => {
  const clientTransport: Transport = {
    start: jest.fn().mockResolvedValue(undefined),
    close: jest.fn().mockResolvedValue(undefined),
    send: jest.fn().mockImplementation((message) => {
      if (message.method === "initialize") {
        clientTransport.onmessage?.({
          jsonrpc: "2.0",
          id: message.id,
          result: {
            protocolVersion: "invalid-version",
            capabilities: {},
            serverInfo: {
              name: "test",
              version: "1.0",
            },
          },
        });
      }
      return Promise.resolve();
    }),
  };

  const client = new Client(
    {
      name: "test client",
      version: "1.0",
    },
    {
      capabilities: {
        sampling: {},
      },
    },
  );

  await expect(client.connect(clientTransport)).rejects.toThrow(
    "Server's protocol version is not supported: invalid-version",
  );

  expect(clientTransport.close).toHaveBeenCalled();
});

test("should connect new client to old, supported server version", async () => {
  const OLD_VERSION = SUPPORTED_PROTOCOL_VERSIONS[1];
  const server = new Server(
      {
        name: "test server",
        version: "1.0",
      },
      {
        capabilities: {
          resources: {},
          tools: {},
        },
      },
  );

  server.setRequestHandler(InitializeRequestSchema, (_request) => ({
    protocolVersion: OLD_VERSION,
    capabilities: {
      resources: {},
      tools: {},
    },
    serverInfo: {
      name: "old server",
      version: "1.0",
    },
  }));

  server.setRequestHandler(ListResourcesRequestSchema, () => ({
    resources: [],
  }));

  server.setRequestHandler(ListToolsRequestSchema, () => ({
    tools: [],
  }));

  const [clientTransport, serverTransport] =
      InMemoryTransport.createLinkedPair();

  const client = new Client(
      {
        name: "new client",
        version: "1.0",
        protocolVersion: LATEST_PROTOCOL_VERSION,
      },
      {
        capabilities: {
          sampling: {},
        },
        enforceStrictCapabilities: true,
      },
  );

  await Promise.all([
    client.connect(clientTransport),
    server.connect(serverTransport),
  ]);

  expect(client.getServerVersion()).toEqual({
    name: "old server",
    version: "1.0",
  });
});

test("should negotiate version when client is old, and newer server supports its version", async () => {
  const OLD_VERSION = SUPPORTED_PROTOCOL_VERSIONS[1];
  const server = new Server(
      {
        name: "new server",
        version: "1.0",
      },
      {
        capabilities: {
          resources: {},
          tools: {},
        },
      },
  );

  server.setRequestHandler(InitializeRequestSchema, (_request) => ({
    protocolVersion: LATEST_PROTOCOL_VERSION,
    capabilities: {
      resources: {},
      tools: {},
    },
    serverInfo: {
      name: "new server",
      version: "1.0",
    },
  }));

  server.setRequestHandler(ListResourcesRequestSchema, () => ({
    resources: [],
  }));

  server.setRequestHandler(ListToolsRequestSchema, () => ({
    tools: [],
  }));

  const [clientTransport, serverTransport] =
      InMemoryTransport.createLinkedPair();

  const client = new Client(
      {
        name: "old client",
        version: "1.0",
        protocolVersion: OLD_VERSION,
      },
      {
        capabilities: {
          sampling: {},
        },
        enforceStrictCapabilities: true,
      },
  );

  await Promise.all([
    client.connect(clientTransport),
    server.connect(serverTransport),
  ]);

  expect(client.getServerVersion()).toEqual({
    name: "new server",
    version: "1.0",
  });
});

test("should throw when client is old, and server doesn't support its version", async () => {
  const OLD_VERSION = SUPPORTED_PROTOCOL_VERSIONS[1];
  const FUTURE_VERSION = "FUTURE_VERSION";
  const server = new Server(
      {
        name: "new server",
        version: "1.0",
      },
      {
        capabilities: {
          resources: {},
          tools: {},
        },
      },
  );

  server.setRequestHandler(InitializeRequestSchema, (_request) => ({
    protocolVersion: FUTURE_VERSION,
    capabilities: {
      resources: {},
      tools: {},
    },
    serverInfo: {
      name: "new server",
      version: "1.0",
    },
  }));

  server.setRequestHandler(ListResourcesRequestSchema, () => ({
    resources: [],
  }));

  server.setRequestHandler(ListToolsRequestSchema, () => ({
    tools: [],
  }));

  const [clientTransport, serverTransport] =
      InMemoryTransport.createLinkedPair();

  const client = new Client(
      {
        name: "old client",
        version: "1.0",
        protocolVersion: OLD_VERSION,
      },
      {
        capabilities: {
          sampling: {},
        },
        enforceStrictCapabilities: true,
      },
  );

  await Promise.all([
    expect(client.connect(clientTransport)).rejects.toThrow(
        "Server's protocol version is not supported: FUTURE_VERSION"
    ),
    server.connect(serverTransport),
  ]);

});

test("should respect server capabilities", async () => {
  const server = new Server(
    {
      name: "test server",
      version: "1.0",
    },
    {
      capabilities: {
        resources: {},
        tools: {},
      },
    },
  );

  server.setRequestHandler(InitializeRequestSchema, (_request) => ({
    protocolVersion: LATEST_PROTOCOL_VERSION,
    capabilities: {
      resources: {},
      tools: {},
    },
    serverInfo: {
      name: "test",
      version: "1.0",
    },
  }));

  server.setRequestHandler(ListResourcesRequestSchema, () => ({
    resources: [],
  }));

  server.setRequestHandler(ListToolsRequestSchema, () => ({
    tools: [],
  }));

  const [clientTransport, serverTransport] =
    InMemoryTransport.createLinkedPair();

  const client = new Client(
    {
      name: "test client",
      version: "1.0",
    },
    {
      capabilities: {
        sampling: {},
      },
      enforceStrictCapabilities: true,
    },
  );

  await Promise.all([
    client.connect(clientTransport),
    server.connect(serverTransport),
  ]);

  // Server supports resources and tools, but not prompts
  expect(client.getServerCapabilities()).toEqual({
    resources: {},
    tools: {},
  });

  // These should work
  await expect(client.listResources()).resolves.not.toThrow();
  await expect(client.listTools()).resolves.not.toThrow();

  // These should throw because prompts, logging, and completions are not supported
  await expect(client.listPrompts()).rejects.toThrow(
    "Server does not support prompts",
  );
  await expect(client.setLoggingLevel("error")).rejects.toThrow(
    "Server does not support logging",
  );
  await expect(
    client.complete({
      ref: { type: "ref/prompt", name: "test" },
      argument: { name: "test", value: "test" },
    }),
  ).rejects.toThrow("Server does not support completions");
});

test("should respect client notification capabilities", async () => {
  const server = new Server(
    {
      name: "test server",
      version: "1.0",
    },
    {
      capabilities: {},
    },
  );

  const client = new Client(
    {
      name: "test client",
      version: "1.0",
    },
    {
      capabilities: {
        roots: {
          listChanged: true,
        },
      },
    },
  );

  const [clientTransport, serverTransport] =
    InMemoryTransport.createLinkedPair();

  await Promise.all([
    client.connect(clientTransport),
    server.connect(serverTransport),
  ]);

  // This should work because the client has the roots.listChanged capability
  await expect(client.sendRootsListChanged()).resolves.not.toThrow();

  // Create a new client without the roots.listChanged capability
  const clientWithoutCapability = new Client(
    {
      name: "test client without capability",
      version: "1.0",
    },
    {
      capabilities: {},
      enforceStrictCapabilities: true,
    },
  );

  await clientWithoutCapability.connect(clientTransport);

  // This should throw because the client doesn't have the roots.listChanged capability
  await expect(clientWithoutCapability.sendRootsListChanged()).rejects.toThrow(
    /^Client does not support/,
  );
});

test("should respect server notification capabilities", async () => {
  const server = new Server(
    {
      name: "test server",
      version: "1.0",
    },
    {
      capabilities: {
        logging: {},
        resources: {
          listChanged: true,
        },
      },
    },
  );

  const client = new Client(
    {
      name: "test client",
      version: "1.0",
    },
    {
      capabilities: {},
    },
  );

  const [clientTransport, serverTransport] =
    InMemoryTransport.createLinkedPair();

  await Promise.all([
    client.connect(clientTransport),
    server.connect(serverTransport),
  ]);

  // These should work because the server has the corresponding capabilities
  await expect(
    server.sendLoggingMessage({ level: "info", data: "Test" }),
  ).resolves.not.toThrow();
  await expect(server.sendResourceListChanged()).resolves.not.toThrow();

  // This should throw because the server doesn't have the tools capability
  await expect(server.sendToolListChanged()).rejects.toThrow(
    "Server does not support notifying of tool list changes",
  );
});

test("should only allow setRequestHandler for declared capabilities", () => {
  const client = new Client(
    {
      name: "test client",
      version: "1.0",
    },
    {
      capabilities: {
        sampling: {},
      },
    },
  );

  // This should work because sampling is a declared capability
  expect(() => {
    client.setRequestHandler(CreateMessageRequestSchema, () => ({
      model: "test-model",
      role: "assistant",
      content: {
        type: "text",
        text: "Test response",
      },
    }));
  }).not.toThrow();

  // This should throw because roots listing is not a declared capability
  expect(() => {
    client.setRequestHandler(ListRootsRequestSchema, () => ({}));
  }).toThrow("Client does not support roots capability");
});

/*
  Test that custom request/notification/result schemas can be used with the Client class.
  */
test("should typecheck", () => {
  const GetWeatherRequestSchema = RequestSchema.extend({
    method: z.literal("weather/get"),
    params: z.object({
      city: z.string(),
    }),
  });

  const GetForecastRequestSchema = RequestSchema.extend({
    method: z.literal("weather/forecast"),
    params: z.object({
      city: z.string(),
      days: z.number(),
    }),
  });

  const WeatherForecastNotificationSchema = NotificationSchema.extend({
    method: z.literal("weather/alert"),
    params: z.object({
      severity: z.enum(["warning", "watch"]),
      message: z.string(),
    }),
  });

  const WeatherRequestSchema = GetWeatherRequestSchema.or(
    GetForecastRequestSchema,
  );
  const WeatherNotificationSchema = WeatherForecastNotificationSchema;
  const WeatherResultSchema = ResultSchema.extend({
    temperature: z.number(),
    conditions: z.string(),
  });

  type WeatherRequest = z.infer<typeof WeatherRequestSchema>;
  type WeatherNotification = z.infer<typeof WeatherNotificationSchema>;
  type WeatherResult = z.infer<typeof WeatherResultSchema>;

  // Create a typed Client for weather data
  const weatherClient = new Client<
    WeatherRequest,
    WeatherNotification,
    WeatherResult
  >(
    {
      name: "WeatherClient",
      version: "1.0.0",
    },
    {
      capabilities: {
        sampling: {},
      },
    },
  );

  // Typecheck that only valid weather requests/notifications/results are allowed
  false &&
    weatherClient.request(
      {
        method: "weather/get",
        params: {
          city: "Seattle",
        },
      },
      WeatherResultSchema,
    );

  false &&
    weatherClient.notification({
      method: "weather/alert",
      params: {
        severity: "warning",
        message: "Storm approaching",
      },
    });
});

test("should handle client cancelling a request", async () => {
  const server = new Server(
    {
      name: "test server",
      version: "1.0",
    },
    {
      capabilities: {
        resources: {},
      },
    },
  );

  // Set up server to delay responding to listResources
  server.setRequestHandler(
    ListResourcesRequestSchema,
    async (request, extra) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return {
        resources: [],
      };
    },
  );

  const [clientTransport, serverTransport] =
    InMemoryTransport.createLinkedPair();

  const client = new Client(
    {
      name: "test client",
      version: "1.0",
    },
    {
      capabilities: {},
    },
  );

  await Promise.all([
    client.connect(clientTransport),
    server.connect(serverTransport),
  ]);

  // Set up abort controller
  const controller = new AbortController();

  // Issue request but cancel it immediately
  const listResourcesPromise = client.listResources(undefined, {
    signal: controller.signal,
  });
  controller.abort("Cancelled by test");

  // Request should be rejected
  await expect(listResourcesPromise).rejects.toBe("Cancelled by test");
});

test("should handle request timeout", async () => {
  const server = new Server(
    {
      name: "test server",
      version: "1.0",
    },
    {
      capabilities: {
        resources: {},
      },
    },
  );

  // Set up server with a delayed response
  server.setRequestHandler(
    ListResourcesRequestSchema,
    async (_request, extra) => {
      const timer = new Promise((resolve) => {
        const timeout = setTimeout(resolve, 100);
        extra.signal.addEventListener("abort", () => clearTimeout(timeout));
      });

      await timer;
      return {
        resources: [],
      };
    },
  );

  const [clientTransport, serverTransport] =
    InMemoryTransport.createLinkedPair();

  const client = new Client(
    {
      name: "test client",
      version: "1.0",
    },
    {
      capabilities: {},
    },
  );

  await Promise.all([
    client.connect(clientTransport),
    server.connect(serverTransport),
  ]);

  // Request with 0 msec timeout should fail immediately
  await expect(
    client.listResources(undefined, { timeout: 0 }),
  ).rejects.toMatchObject({
    code: ErrorCode.RequestTimeout,
  });
});



================================================
FILE: src/client/index.ts
================================================
import {
  mergeCapabilities,
  Protocol,
  ProtocolOptions,
  RequestOptions,
} from "../shared/protocol.js";
import { Transport } from "../shared/transport.js";
import {
  CallToolRequest,
  CallToolResultSchema,
  ClientCapabilities,
  ClientNotification,
  ClientRequest,
  ClientResult,
  CompatibilityCallToolResultSchema,
  CompleteRequest,
  CompleteResultSchema,
  EmptyResultSchema,
  GetPromptRequest,
  GetPromptResultSchema,
  Implementation,
  InitializeResultSchema,
  LATEST_PROTOCOL_VERSION,
  ListPromptsRequest,
  ListPromptsResultSchema,
  ListResourcesRequest,
  ListResourcesResultSchema,
  ListResourceTemplatesRequest,
  ListResourceTemplatesResultSchema,
  ListToolsRequest,
  ListToolsResultSchema,
  LoggingLevel,
  Notification,
  ReadResourceRequest,
  ReadResourceResultSchema,
  Request,
  Result,
  ServerCapabilities,
  SubscribeRequest,
  SUPPORTED_PROTOCOL_VERSIONS,
  UnsubscribeRequest,
} from "../types.js";

export type ClientOptions = ProtocolOptions & {
  /**
   * Capabilities to advertise as being supported by this client.
   */
  capabilities?: ClientCapabilities;
};

/**
 * An MCP client on top of a pluggable transport.
 *
 * The client will automatically begin the initialization flow with the server when connect() is called.
 *
 * To use with custom types, extend the base Request/Notification/Result types and pass them as type parameters:
 *
 * ```typescript
 * // Custom schemas
 * const CustomRequestSchema = RequestSchema.extend({...})
 * const CustomNotificationSchema = NotificationSchema.extend({...})
 * const CustomResultSchema = ResultSchema.extend({...})
 *
 * // Type aliases
 * type CustomRequest = z.infer<typeof CustomRequestSchema>
 * type CustomNotification = z.infer<typeof CustomNotificationSchema>
 * type CustomResult = z.infer<typeof CustomResultSchema>
 *
 * // Create typed client
 * const client = new Client<CustomRequest, CustomNotification, CustomResult>({
 *   name: "CustomClient",
 *   version: "1.0.0"
 * })
 * ```
 */
export class Client<
  RequestT extends Request = Request,
  NotificationT extends Notification = Notification,
  ResultT extends Result = Result,
> extends Protocol<
  ClientRequest | RequestT,
  ClientNotification | NotificationT,
  ClientResult | ResultT
> {
  private _serverCapabilities?: ServerCapabilities;
  private _serverVersion?: Implementation;
  private _capabilities: ClientCapabilities;
  private _instructions?: string;

  /**
   * Initializes this client with the given name and version information.
   */
  constructor(
    private _clientInfo: Implementation,
    options?: ClientOptions,
  ) {
    super(options);
    this._capabilities = options?.capabilities ?? {};
  }

  /**
   * Registers new capabilities. This can only be called before connecting to a transport.
   *
   * The new capabilities will be merged with any existing capabilities previously given (e.g., at initialization).
   */
  public registerCapabilities(capabilities: ClientCapabilities): void {
    if (this.transport) {
      throw new Error(
        "Cannot register capabilities after connecting to transport",
      );
    }

    this._capabilities = mergeCapabilities(this._capabilities, capabilities);
  }

  protected assertCapability(
    capability: keyof ServerCapabilities,
    method: string,
  ): void {
    if (!this._serverCapabilities?.[capability]) {
      throw new Error(
        `Server does not support ${capability} (required for ${method})`,
      );
    }
  }

  override async connect(transport: Transport, options?: RequestOptions): Promise<void> {
    await super.connect(transport);
    // When transport sessionId is already set this means we are trying to reconnect.
    // In this case we don't need to initialize again.
    if (transport.sessionId !== undefined) {
      return;
    }
    try {
      const result = await this.request(
        {
          method: "initialize",
          params: {
            protocolVersion: LATEST_PROTOCOL_VERSION,
            capabilities: this._capabilities,
            clientInfo: this._clientInfo,
          },
        },
        InitializeResultSchema,
        options
      );

      if (result === undefined) {
        throw new Error(`Server sent invalid initialize result: ${result}`);
      }

      if (!SUPPORTED_PROTOCOL_VERSIONS.includes(result.protocolVersion)) {
        throw new Error(
          `Server's protocol version is not supported: ${result.protocolVersion}`,
        );
      }

      this._serverCapabilities = result.capabilities;
      this._serverVersion = result.serverInfo;

      this._instructions = result.instructions;

      await this.notification({
        method: "notifications/initialized",
      });
    } catch (error) {
      // Disconnect if initialization fails.
      void this.close();
      throw error;
    }
  }

  /**
   * After initialization has completed, this will be populated with the server's reported capabilities.
   */
  getServerCapabilities(): ServerCapabilities | undefined {
    return this._serverCapabilities;
  }

  /**
   * After initialization has completed, this will be populated with information about the server's name and version.
   */
  getServerVersion(): Implementation | undefined {
    return this._serverVersion;
  }

  /**
   * After initialization has completed, this may be populated with information about the server's instructions.
   */
  getInstructions(): string | undefined {
    return this._instructions;
  }

  protected assertCapabilityForMethod(method: RequestT["method"]): void {
    switch (method as ClientRequest["method"]) {
      case "logging/setLevel":
        if (!this._serverCapabilities?.logging) {
          throw new Error(
            `Server does not support logging (required for ${method})`,
          );
        }
        break;

      case "prompts/get":
      case "prompts/list":
        if (!this._serverCapabilities?.prompts) {
          throw new Error(
            `Server does not support prompts (required for ${method})`,
          );
        }
        break;

      case "resources/list":
      case "resources/templates/list":
      case "resources/read":
      case "resources/subscribe":
      case "resources/unsubscribe":
        if (!this._serverCapabilities?.resources) {
          throw new Error(
            `Server does not support resources (required for ${method})`,
          );
        }

        if (
          method === "resources/subscribe" &&
          !this._serverCapabilities.resources.subscribe
        ) {
          throw new Error(
            `Server does not support resource subscriptions (required for ${method})`,
          );
        }

        break;

      case "tools/call":
      case "tools/list":
        if (!this._serverCapabilities?.tools) {
          throw new Error(
            `Server does not support tools (required for ${method})`,
          );
        }
        break;

      case "completion/complete":
        if (!this._serverCapabilities?.completions) {
          throw new Error(
            `Server does not support completions (required for ${method})`,
          );
        }
        break;

      case "initialize":
        // No specific capability required for initialize
        break;

      case "ping":
        // No specific capability required for ping
        break;
    }
  }

  protected assertNotificationCapability(
    method: NotificationT["method"],
  ): void {
    switch (method as ClientNotification["method"]) {
      case "notifications/roots/list_changed":
        if (!this._capabilities.roots?.listChanged) {
          throw new Error(
            `Client does not support roots list changed notifications (required for ${method})`,
          );
        }
        break;

      case "notifications/initialized":
        // No specific capability required for initialized
        break;

      case "notifications/cancelled":
        // Cancellation notifications are always allowed
        break;

      case "notifications/progress":
        // Progress notifications are always allowed
        break;
    }
  }

  protected assertRequestHandlerCapability(method: string): void {
    switch (method) {
      case "sampling/createMessage":
        if (!this._capabilities.sampling) {
          throw new Error(
            `Client does not support sampling capability (required for ${method})`,
          );
        }
        break;

      case "roots/list":
        if (!this._capabilities.roots) {
          throw new Error(
            `Client does not support roots capability (required for ${method})`,
          );
        }
        break;

      case "ping":
        // No specific capability required for ping
        break;
    }
  }

  async ping(options?: RequestOptions) {
    return this.request({ method: "ping" }, EmptyResultSchema, options);
  }

  async complete(params: CompleteRequest["params"], options?: RequestOptions) {
    return this.request(
      { method: "completion/complete", params },
      CompleteResultSchema,
      options,
    );
  }

  async setLoggingLevel(level: LoggingLevel, options?: RequestOptions) {
    return this.request(
      { method: "logging/setLevel", params: { level } },
      EmptyResultSchema,
      options,
    );
  }

  async getPrompt(
    params: GetPromptRequest["params"],
    options?: RequestOptions,
  ) {
    return this.request(
      { method: "prompts/get", params },
      GetPromptResultSchema,
      options,
    );
  }

  async listPrompts(
    params?: ListPromptsRequest["params"],
    options?: RequestOptions,
  ) {
    return this.request(
      { method: "prompts/list", params },
      ListPromptsResultSchema,
      options,
    );
  }

  async listResources(
    params?: ListResourcesRequest["params"],
    options?: RequestOptions,
  ) {
    return this.request(
      { method: "resources/list", params },
      ListResourcesResultSchema,
      options,
    );
  }

  async listResourceTemplates(
    params?: ListResourceTemplatesRequest["params"],
    options?: RequestOptions,
  ) {
    return this.request(
      { method: "resources/templates/list", params },
      ListResourceTemplatesResultSchema,
      options,
    );
  }

  async readResource(
    params: ReadResourceRequest["params"],
    options?: RequestOptions,
  ) {
    return this.request(
      { method: "resources/read", params },
      ReadResourceResultSchema,
      options,
    );
  }

  async subscribeResource(
    params: SubscribeRequest["params"],
    options?: RequestOptions,
  ) {
    return this.request(
      { method: "resources/subscribe", params },
      EmptyResultSchema,
      options,
    );
  }

  async unsubscribeResource(
    params: UnsubscribeRequest["params"],
    options?: RequestOptions,
  ) {
    return this.request(
      { method: "resources/unsubscribe", params },
      EmptyResultSchema,
      options,
    );
  }

  async callTool(
    params: CallToolRequest["params"],
    resultSchema:
      | typeof CallToolResultSchema
      | typeof CompatibilityCallToolResultSchema = CallToolResultSchema,
    options?: RequestOptions,
  ) {
    return this.request(
      { method: "tools/call", params },
      resultSchema,
      options,
    );
  }

  async listTools(
    params?: ListToolsRequest["params"],
    options?: RequestOptions,
  ) {
    return this.request(
      { method: "tools/list", params },
      ListToolsResultSchema,
      options,
    );
  }

  async sendRootsListChanged() {
    return this.notification({ method: "notifications/roots/list_changed" });
  }
}



================================================
FILE: src/client/sse.test.ts
================================================
import { createServer, type IncomingMessage, type Server } from "http";
import { AddressInfo } from "net";
import { JSONRPCMessage } from "../types.js";
import { SSEClientTransport } from "./sse.js";
import { OAuthClientProvider, UnauthorizedError } from "./auth.js";
import { OAuthTokens } from "../shared/auth.js";

describe("SSEClientTransport", () => {
  let server: Server;
  let transport: SSEClientTransport;
  let baseUrl: URL;
  let lastServerRequest: IncomingMessage;
  let sendServerMessage: ((message: string) => void) | null = null;

  beforeEach((done) => {
    // Reset state
    lastServerRequest = null as unknown as IncomingMessage;
    sendServerMessage = null;

    // Create a test server that will receive the EventSource connection
    server = createServer((req, res) => {
      lastServerRequest = req;

      // Send SSE headers
      res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      });

      // Send the endpoint event
      res.write("event: endpoint\n");
      res.write(`data: ${baseUrl.href}\n\n`);

      // Store reference to send function for tests
      sendServerMessage = (message: string) => {
        res.write(`data: ${message}\n\n`);
      };

      // Handle request body for POST endpoints
      if (req.method === "POST") {
        let body = "";
        req.on("data", (chunk) => {
          body += chunk;
        });
        req.on("end", () => {
          (req as IncomingMessage & { body: string }).body = body;
          res.end();
        });
      }
    });

    // Start server on random port
    server.listen(0, "127.0.0.1", () => {
      const addr = server.address() as AddressInfo;
      baseUrl = new URL(`http://127.0.0.1:${addr.port}`);
      done();
    });

    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(async () => {
    await transport.close();
    await server.close();

    jest.clearAllMocks();
  });

  describe("connection handling", () => {
    it("establishes SSE connection and receives endpoint", async () => {
      transport = new SSEClientTransport(baseUrl);
      await transport.start();

      expect(lastServerRequest.headers.accept).toBe("text/event-stream");
      expect(lastServerRequest.method).toBe("GET");
    });

    it("rejects if server returns non-200 status", async () => {
      // Create a server that returns 403
      await server.close();

      server = createServer((req, res) => {
        res.writeHead(403);
        res.end();
      });

      await new Promise<void>((resolve) => {
        server.listen(0, "127.0.0.1", () => {
          const addr = server.address() as AddressInfo;
          baseUrl = new URL(`http://127.0.0.1:${addr.port}`);
          resolve();
        });
      });

      transport = new SSEClientTransport(baseUrl);
      await expect(transport.start()).rejects.toThrow();
    });

    it("closes EventSource connection on close()", async () => {
      transport = new SSEClientTransport(baseUrl);
      await transport.start();

      const closePromise = new Promise((resolve) => {
        lastServerRequest.on("close", resolve);
      });

      await transport.close();
      await closePromise;
    });
  });

  describe("message handling", () => {
    it("receives and parses JSON-RPC messages", async () => {
      const receivedMessages: JSONRPCMessage[] = [];
      transport = new SSEClientTransport(baseUrl);
      transport.onmessage = (msg) => receivedMessages.push(msg);

      await transport.start();

      const testMessage: JSONRPCMessage = {
        jsonrpc: "2.0",
        id: "test-1",
        method: "test",
        params: { foo: "bar" },
      };

      sendServerMessage!(JSON.stringify(testMessage));

      // Wait for message processing
      await new Promise((resolve) => setTimeout(resolve, 50));

      expect(receivedMessages).toHaveLength(1);
      expect(receivedMessages[0]).toEqual(testMessage);
    });

    it("handles malformed JSON messages", async () => {
      const errors: Error[] = [];
      transport = new SSEClientTransport(baseUrl);
      transport.onerror = (err) => errors.push(err);

      await transport.start();

      sendServerMessage!("invalid json");

      // Wait for message processing
      await new Promise((resolve) => setTimeout(resolve, 50));

      expect(errors).toHaveLength(1);
      expect(errors[0].message).toMatch(/JSON/);
    });

    it("handles messages via POST requests", async () => {
      transport = new SSEClientTransport(baseUrl);
      await transport.start();

      const testMessage: JSONRPCMessage = {
        jsonrpc: "2.0",
        id: "test-1",
        method: "test",
        params: { foo: "bar" },
      };

      await transport.send(testMessage);

      // Wait for request processing
      await new Promise((resolve) => setTimeout(resolve, 50));

      expect(lastServerRequest.method).toBe("POST");
      expect(lastServerRequest.headers["content-type"]).toBe(
        "application/json",
      );
      expect(
        JSON.parse(
          (lastServerRequest as IncomingMessage & { body: string }).body,
        ),
      ).toEqual(testMessage);
    });

    it("handles POST request failures", async () => {
      // Create a server that returns 500 for POST
      await server.close();

      server = createServer((req, res) => {
        if (req.method === "GET") {
          res.writeHead(200, {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache, no-transform",
            Connection: "keep-alive",
          });
          res.write("event: endpoint\n");
          res.write(`data: ${baseUrl.href}\n\n`);
        } else {
          res.writeHead(500);
          res.end("Internal error");
        }
      });

      await new Promise<void>((resolve) => {
        server.listen(0, "127.0.0.1", () => {
          const addr = server.address() as AddressInfo;
          baseUrl = new URL(`http://127.0.0.1:${addr.port}`);
          resolve();
        });
      });

      transport = new SSEClientTransport(baseUrl);
      await transport.start();

      const testMessage: JSONRPCMessage = {
        jsonrpc: "2.0",
        id: "test-1",
        method: "test",
        params: {},
      };

      await expect(transport.send(testMessage)).rejects.toThrow(/500/);
    });
  });

  describe("header handling", () => {
    it("uses custom fetch implementation from EventSourceInit to add auth headers", async () => {
      const authToken = "Bearer test-token";

      // Create a fetch wrapper that adds auth header
      const fetchWithAuth = (url: string | URL, init?: RequestInit) => {
        const headers = new Headers(init?.headers);
        headers.set("Authorization", authToken);
        return fetch(url.toString(), { ...init, headers });
      };

      transport = new SSEClientTransport(baseUrl, {
        eventSourceInit: {
          fetch: fetchWithAuth,
        },
      });

      await transport.start();

      // Verify the auth header was received by the server
      expect(lastServerRequest.headers.authorization).toBe(authToken);
    });

    it("passes custom headers to fetch requests", async () => {
      const customHeaders = {
        Authorization: "Bearer test-token",
        "X-Custom-Header": "custom-value",
      };

      transport = new SSEClientTransport(baseUrl, {
        requestInit: {
          headers: customHeaders,
        },
      });

      await transport.start();

      // Store original fetch
      const originalFetch = global.fetch;

      try {
        // Mock fetch for the message sending test
        global.fetch = jest.fn().mockResolvedValue({
          ok: true,
        });

        const message: JSONRPCMessage = {
          jsonrpc: "2.0",
          id: "1",
          method: "test",
          params: {},
        };

        await transport.send(message);

        // Verify fetch was called with correct headers
        expect(global.fetch).toHaveBeenCalledWith(
          expect.any(URL),
          expect.objectContaining({
            headers: expect.any(Headers),
          }),
        );

        const calledHeaders = (global.fetch as jest.Mock).mock.calls[0][1]
          .headers;
        expect(calledHeaders.get("Authorization")).toBe(
          customHeaders.Authorization,
        );
        expect(calledHeaders.get("X-Custom-Header")).toBe(
          customHeaders["X-Custom-Header"],
        );
        expect(calledHeaders.get("content-type")).toBe("application/json");
      } finally {
        // Restore original fetch
        global.fetch = originalFetch;
      }
    });
  });

  describe("auth handling", () => {
    let mockAuthProvider: jest.Mocked<OAuthClientProvider>;

    beforeEach(() => {
      mockAuthProvider = {
        get redirectUrl() { return "http://localhost/callback"; },
        get clientMetadata() { return { redirect_uris: ["http://localhost/callback"] }; },
        clientInformation: jest.fn(() => ({ client_id: "test-client-id", client_secret: "test-client-secret" })),
        tokens: jest.fn(),
        saveTokens: jest.fn(),
        redirectToAuthorization: jest.fn(),
        saveCodeVerifier: jest.fn(),
        codeVerifier: jest.fn(),
      };
    });

    it("attaches auth header from provider on SSE connection", async () => {
      mockAuthProvider.tokens.mockResolvedValue({
        access_token: "test-token",
        token_type: "Bearer"
      });

      transport = new SSEClientTransport(baseUrl, {
        authProvider: mockAuthProvider,
      });

      await transport.start();

      expect(lastServerRequest.headers.authorization).toBe("Bearer test-token");
      expect(mockAuthProvider.tokens).toHaveBeenCalled();
    });

    it("attaches auth header from provider on POST requests", async () => {
      mockAuthProvider.tokens.mockResolvedValue({
        access_token: "test-token",
        token_type: "Bearer"
      });

      transport = new SSEClientTransport(baseUrl, {
        authProvider: mockAuthProvider,
      });

      await transport.start();

      const message: JSONRPCMessage = {
        jsonrpc: "2.0",
        id: "1",
        method: "test",
        params: {},
      };

      await transport.send(message);

      expect(lastServerRequest.headers.authorization).toBe("Bearer test-token");
      expect(mockAuthProvider.tokens).toHaveBeenCalled();
    });

    it("attempts auth flow on 401 during SSE connection", async () => {
      // Create server that returns 401s
      await server.close();

      server = createServer((req, res) => {
        lastServerRequest = req;
        if (req.url !== "/") {
          res.writeHead(404).end();
        } else {
          res.writeHead(401).end();
        }
      });

      await new Promise<void>(resolve => {
        server.listen(0, "127.0.0.1", () => {
          const addr = server.address() as AddressInfo;
          baseUrl = new URL(`http://127.0.0.1:${addr.port}`);
          resolve();
        });
      });

      transport = new SSEClientTransport(baseUrl, {
        authProvider: mockAuthProvider,
      });

      await expect(() => transport.start()).rejects.toThrow(UnauthorizedError);
      expect(mockAuthProvider.redirectToAuthorization.mock.calls).toHaveLength(1);
    });

    it("attempts auth flow on 401 during POST request", async () => {
      // Create server that accepts SSE but returns 401 on POST
      await server.close();

      server = createServer((req, res) => {
        lastServerRequest = req;

        switch (req.method) {
          case "GET":
            if (req.url !== "/") {
              res.writeHead(404).end();
              return;
            }

            res.writeHead(200, {
              "Content-Type": "text/event-stream",
              "Cache-Control": "no-cache, no-transform",
              Connection: "keep-alive",
            });
            res.write("event: endpoint\n");
            res.write(`data: ${baseUrl.href}\n\n`);
            break;

          case "POST":
            res.writeHead(401);
            res.end();
            break;
        }
      });

      await new Promise<void>(resolve => {
        server.listen(0, "127.0.0.1", () => {
          const addr = server.address() as AddressInfo;
          baseUrl = new URL(`http://127.0.0.1:${addr.port}`);
          resolve();
        });
      });

      transport = new SSEClientTransport(baseUrl, {
        authProvider: mockAuthProvider,
      });

      await transport.start();

      const message: JSONRPCMessage = {
        jsonrpc: "2.0",
        id: "1",
        method: "test",
        params: {},
      };

      await expect(() => transport.send(message)).rejects.toThrow(UnauthorizedError);
      expect(mockAuthProvider.redirectToAuthorization.mock.calls).toHaveLength(1);
    });

    it("respects custom headers when using auth provider", async () => {
      mockAuthProvider.tokens.mockResolvedValue({
        access_token: "test-token",
        token_type: "Bearer"
      });

      const customHeaders = {
        "X-Custom-Header": "custom-value",
      };

      transport = new SSEClientTransport(baseUrl, {
        authProvider: mockAuthProvider,
        requestInit: {
          headers: customHeaders,
        },
      });

      await transport.start();

      const message: JSONRPCMessage = {
        jsonrpc: "2.0",
        id: "1",
        method: "test",
        params: {},
      };

      await transport.send(message);

      expect(lastServerRequest.headers.authorization).toBe("Bearer test-token");
      expect(lastServerRequest.headers["x-custom-header"]).toBe("custom-value");
    });

    it("refreshes expired token during SSE connection", async () => {
      // Mock tokens() to return expired token until saveTokens is called
      let currentTokens: OAuthTokens = {
        access_token: "expired-token",
        token_type: "Bearer",
        refresh_token: "refresh-token"
      };
      mockAuthProvider.tokens.mockImplementation(() => currentTokens);
      mockAuthProvider.saveTokens.mockImplementation((tokens) => {
        currentTokens = tokens;
      });

      // Create server that returns 401 for expired token, then accepts new token
      await server.close();

      let connectionAttempts = 0;
      server = createServer((req, res) => {
        lastServerRequest = req;

        if (req.url === "/token" && req.method === "POST") {
          // Handle token refresh request
          let body = "";
          req.on("data", chunk => { body += chunk; });
          req.on("end", () => {
            const params = new URLSearchParams(body);
            if (params.get("grant_type") === "refresh_token" &&
              params.get("refresh_token") === "refresh-token" &&
              params.get("client_id") === "test-client-id" &&
              params.get("client_secret") === "test-client-secret") {
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify({
                access_token: "new-token",
                token_type: "Bearer",
                refresh_token: "new-refresh-token"
              }));
            } else {
              res.writeHead(400).end();
            }
          });
          return;
        }

        if (req.url !== "/") {
          res.writeHead(404).end();
          return;
        }

        const auth = req.headers.authorization;
        if (auth === "Bearer expired-token") {
          res.writeHead(401).end();
          return;
        }

        if (auth === "Bearer new-token") {
          res.writeHead(200, {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache, no-transform",
            Connection: "keep-alive",
          });
          res.write("event: endpoint\n");
          res.write(`data: ${baseUrl.href}\n\n`);
          connectionAttempts++;
          return;
        }

        res.writeHead(401).end();
      });

      await new Promise<void>(resolve => {
        server.listen(0, "127.0.0.1", () => {
          const addr = server.address() as AddressInfo;
          baseUrl = new URL(`http://127.0.0.1:${addr.port}`);
          resolve();
        });
      });

      transport = new SSEClientTransport(baseUrl, {
        authProvider: mockAuthProvider,
      });

      await transport.start();

      expect(mockAuthProvider.saveTokens).toHaveBeenCalledWith({
        access_token: "new-token",
        token_type: "Bearer",
        refresh_token: "new-refresh-token"
      });
      expect(connectionAttempts).toBe(1);
      expect(lastServerRequest.headers.authorization).toBe("Bearer new-token");
    });

    it("refreshes expired token during POST request", async () => {
      // Mock tokens() to return expired token until saveTokens is called
      let currentTokens: OAuthTokens = {
        access_token: "expired-token",
        token_type: "Bearer",
        refresh_token: "refresh-token"
      };
      mockAuthProvider.tokens.mockImplementation(() => currentTokens);
      mockAuthProvider.saveTokens.mockImplementation((tokens) => {
        currentTokens = tokens;
      });

      // Create server that accepts SSE but returns 401 on POST with expired token
      await server.close();

      let postAttempts = 0;
      server = createServer((req, res) => {
        lastServerRequest = req;

        if (req.url === "/token" && req.method === "POST") {
          // Handle token refresh request
          let body = "";
          req.on("data", chunk => { body += chunk; });
          req.on("end", () => {
            const params = new URLSearchParams(body);
            if (params.get("grant_type") === "refresh_token" &&
              params.get("refresh_token") === "refresh-token" &&
              params.get("client_id") === "test-client-id" &&
              params.get("client_secret") === "test-client-secret") {
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify({
                access_token: "new-token",
                token_type: "Bearer",
                refresh_token: "new-refresh-token"
              }));
            } else {
              res.writeHead(400).end();
            }
          });
          return;
        }

        switch (req.method) {
          case "GET":
            if (req.url !== "/") {
              res.writeHead(404).end();
              return;
            }

            res.writeHead(200, {
              "Content-Type": "text/event-stream",
              "Cache-Control": "no-cache, no-transform",
              Connection: "keep-alive",
            });
            res.write("event: endpoint\n");
            res.write(`data: ${baseUrl.href}\n\n`);
            break;

          case "POST": {
            if (req.url !== "/") {
              res.writeHead(404).end();
              return;
            }

            const auth = req.headers.authorization;
            if (auth === "Bearer expired-token") {
              res.writeHead(401).end();
              return;
            }

            if (auth === "Bearer new-token") {
              res.writeHead(200).end();
              postAttempts++;
              return;
            }

            res.writeHead(401).end();
            break;
          }
        }
      });

      await new Promise<void>(resolve => {
        server.listen(0, "127.0.0.1", () => {
          const addr = server.address() as AddressInfo;
          baseUrl = new URL(`http://127.0.0.1:${addr.port}`);
          resolve();
        });
      });

      transport = new SSEClientTransport(baseUrl, {
        authProvider: mockAuthProvider,
      });

      await transport.start();

      const message: JSONRPCMessage = {
        jsonrpc: "2.0",
        id: "1",
        method: "test",
        params: {},
      };

      await transport.send(message);

      expect(mockAuthProvider.saveTokens).toHaveBeenCalledWith({
        access_token: "new-token",
        token_type: "Bearer",
        refresh_token: "new-refresh-token"
      });
      expect(postAttempts).toBe(1);
      expect(lastServerRequest.headers.authorization).toBe("Bearer new-token");
    });

    it("redirects to authorization if refresh token flow fails", async () => {
      // Mock tokens() to return expired token until saveTokens is called
      let currentTokens: OAuthTokens = {
        access_token: "expired-token",
        token_type: "Bearer",
        refresh_token: "refresh-token"
      };
      mockAuthProvider.tokens.mockImplementation(() => currentTokens);
      mockAuthProvider.saveTokens.mockImplementation((tokens) => {
        currentTokens = tokens;
      });

      // Create server that returns 401 for all tokens
      await server.close();

      server = createServer((req, res) => {
        lastServerRequest = req;

        if (req.url === "/token" && req.method === "POST") {
          // Handle token refresh request - always fail
          res.writeHead(400).end();
          return;
        }

        if (req.url !== "/") {
          res.writeHead(404).end();
          return;
        }
        res.writeHead(401).end();
      });

      await new Promise<void>(resolve => {
        server.listen(0, "127.0.0.1", () => {
          const addr = server.address() as AddressInfo;
          baseUrl = new URL(`http://127.0.0.1:${addr.port}`);
          resolve();
        });
      });

      transport = new SSEClientTransport(baseUrl, {
        authProvider: mockAuthProvider,
      });

      await expect(() => transport.start()).rejects.toThrow(UnauthorizedError);
      expect(mockAuthProvider.redirectToAuthorization).toHaveBeenCalled();
    });
  });
});



================================================
FILE: src/client/sse.ts
================================================
import { EventSource, type ErrorEvent, type EventSourceInit } from "eventsource";
import { Transport } from "../shared/transport.js";
import { JSONRPCMessage, JSONRPCMessageSchema } from "../types.js";
import { auth, AuthResult, OAuthClientProvider, UnauthorizedError } from "./auth.js";

export class SseError extends Error {
  constructor(
    public readonly code: number | undefined,
    message: string | undefined,
    public readonly event: ErrorEvent,
  ) {
    super(`SSE error: ${message}`);
  }
}

/**
 * Configuration options for the `SSEClientTransport`.
 */
export type SSEClientTransportOptions = {
  /**
   * An OAuth client provider to use for authentication.
   * 
   * When an `authProvider` is specified and the SSE connection is started:
   * 1. The connection is attempted with any existing access token from the `authProvider`.
   * 2. If the access token has expired, the `authProvider` is used to refresh the token.
   * 3. If token refresh fails or no access token exists, and auth is required, `OAuthClientProvider.redirectToAuthorization` is called, and an `UnauthorizedError` will be thrown from `connect`/`start`.
   * 
   * After the user has finished authorizing via their user agent, and is redirected back to the MCP client application, call `SSEClientTransport.finishAuth` with the authorization code before retrying the connection.
   * 
   * If an `authProvider` is not provided, and auth is required, an `UnauthorizedError` will be thrown.
   * 
   * `UnauthorizedError` might also be thrown when sending any message over the SSE transport, indicating that the session has expired, and needs to be re-authed and reconnected.
   */
  authProvider?: OAuthClientProvider;

  /**
   * Customizes the initial SSE request to the server (the request that begins the stream).
   * 
   * NOTE: Setting this property will prevent an `Authorization` header from
   * being automatically attached to the SSE request, if an `authProvider` is
   * also given. This can be worked around by setting the `Authorization` header
   * manually.
   */
  eventSourceInit?: EventSourceInit;

  /**
   * Customizes recurring POST requests to the server.
   */
  requestInit?: RequestInit;
};

/**
 * Client transport for SSE: this will connect to a server using Server-Sent Events for receiving
 * messages and make separate POST requests for sending messages.
 */
export class SSEClientTransport implements Transport {
  private _eventSource?: EventSource;
  private _endpoint?: URL;
  private _abortController?: AbortController;
  private _url: URL;
  private _eventSourceInit?: EventSourceInit;
  private _requestInit?: RequestInit;
  private _authProvider?: OAuthClientProvider;

  onclose?: () => void;
  onerror?: (error: Error) => void;
  onmessage?: (message: JSONRPCMessage) => void;

  constructor(
    url: URL,
    opts?: SSEClientTransportOptions,
  ) {
    this._url = url;
    this._eventSourceInit = opts?.eventSourceInit;
    this._requestInit = opts?.requestInit;
    this._authProvider = opts?.authProvider;
  }

  private async _authThenStart(): Promise<void> {
    if (!this._authProvider) {
      throw new UnauthorizedError("No auth provider");
    }

    let result: AuthResult;
    try {
      result = await auth(this._authProvider, { serverUrl: this._url });
    } catch (error) {
      this.onerror?.(error as Error);
      throw error;
    }

    if (result !== "AUTHORIZED") {
      throw new UnauthorizedError();
    }

    return await this._startOrAuth();
  }

  private async _commonHeaders(): Promise<HeadersInit> {
    const headers: HeadersInit = {};
    if (this._authProvider) {
      const tokens = await this._authProvider.tokens();
      if (tokens) {
        headers["Authorization"] = `Bearer ${tokens.access_token}`;
      }
    }

    return headers;
  }

  private _startOrAuth(): Promise<void> {
    return new Promise((resolve, reject) => {
      this._eventSource = new EventSource(
        this._url.href,
        this._eventSourceInit ?? {
          fetch: (url, init) => this._commonHeaders().then((headers) => fetch(url, {
            ...init,
            headers: {
              ...headers,
              Accept: "text/event-stream"
            }
          })),
        },
      );
      this._abortController = new AbortController();

      this._eventSource.onerror = (event) => {
        if (event.code === 401 && this._authProvider) {
          this._authThenStart().then(resolve, reject);
          return;
        }

        const error = new SseError(event.code, event.message, event);
        reject(error);
        this.onerror?.(error);
      };

      this._eventSource.onopen = () => {
        // The connection is open, but we need to wait for the endpoint to be received.
      };

      this._eventSource.addEventListener("endpoint", (event: Event) => {
        const messageEvent = event as MessageEvent;

        try {
          this._endpoint = new URL(messageEvent.data, this._url);
          if (this._endpoint.origin !== this._url.origin) {
            throw new Error(
              `Endpoint origin does not match connection origin: ${this._endpoint.origin}`,
            );
          }
        } catch (error) {
          reject(error);
          this.onerror?.(error as Error);

          void this.close();
          return;
        }

        resolve();
      });

      this._eventSource.onmessage = (event: Event) => {
        const messageEvent = event as MessageEvent;
        let message: JSONRPCMessage;
        try {
          message = JSONRPCMessageSchema.parse(JSON.parse(messageEvent.data));
        } catch (error) {
          this.onerror?.(error as Error);
          return;
        }

        this.onmessage?.(message);
      };
    });
  }

  async start() {
    if (this._eventSource) {
      throw new Error(
        "SSEClientTransport already started! If using Client class, note that connect() calls start() automatically.",
      );
    }

    return await this._startOrAuth();
  }

  /**
   * Call this method after the user has finished authorizing via their user agent and is redirected back to the MCP client application. This will exchange the authorization code for an access token, enabling the next connection attempt to successfully auth.
   */
  async finishAuth(authorizationCode: string): Promise<void> {
    if (!this._authProvider) {
      throw new UnauthorizedError("No auth provider");
    }

    const result = await auth(this._authProvider, { serverUrl: this._url, authorizationCode });
    if (result !== "AUTHORIZED") {
      throw new UnauthorizedError("Failed to authorize");
    }
  }

  async close(): Promise<void> {
    this._abortController?.abort();
    this._eventSource?.close();
    this.onclose?.();
  }

  async send(message: JSONRPCMessage): Promise<void> {
    if (!this._endpoint) {
      throw new Error("Not connected");
    }

    try {
      const commonHeaders = await this._commonHeaders();
      const headers = new Headers({ ...commonHeaders, ...this._requestInit?.headers });
      headers.set("content-type", "application/json");
      const init = {
        ...this._requestInit,
        method: "POST",
        headers,
        body: JSON.stringify(message),
        signal: this._abortController?.signal,
      };

      const response = await fetch(this._endpoint, init);
      if (!response.ok) {
        if (response.status === 401 && this._authProvider) {
          const result = await auth(this._authProvider, { serverUrl: this._url });
          if (result !== "AUTHORIZED") {
            throw new UnauthorizedError();
          }

          // Purposely _not_ awaited, so we don't call onerror twice
          return this.send(message);
        }

        const text = await response.text().catch(() => null);
        throw new Error(
          `Error POSTing to endpoint (HTTP ${response.status}): ${text}`,
        );
      }
    } catch (error) {
      this.onerror?.(error as Error);
      throw error;
    }
  }
}



================================================
FILE: src/client/stdio.test.ts
================================================
import { JSONRPCMessage } from "../types.js";
import { StdioClientTransport, StdioServerParameters } from "./stdio.js";

const serverParameters: StdioServerParameters = {
  command: "/usr/bin/tee",
};

test("should start then close cleanly", async () => {
  const client = new StdioClientTransport(serverParameters);
  client.onerror = (error) => {
    throw error;
  };

  let didClose = false;
  client.onclose = () => {
    didClose = true;
  };

  await client.start();
  expect(didClose).toBeFalsy();
  await client.close();
  expect(didClose).toBeTruthy();
});

test("should read messages", async () => {
  const client = new StdioClientTransport(serverParameters);
  client.onerror = (error) => {
    throw error;
  };

  const messages: JSONRPCMessage[] = [
    {
      jsonrpc: "2.0",
      id: 1,
      method: "ping",
    },
    {
      jsonrpc: "2.0",
      method: "notifications/initialized",
    },
  ];

  const readMessages: JSONRPCMessage[] = [];
  const finished = new Promise<void>((resolve) => {
    client.onmessage = (message) => {
      readMessages.push(message);

      if (JSON.stringify(message) === JSON.stringify(messages[1])) {
        resolve();
      }
    };
  });

  await client.start();
  await client.send(messages[0]);
  await client.send(messages[1]);
  await finished;
  expect(readMessages).toEqual(messages);

  await client.close();
});



================================================
FILE: src/client/stdio.ts
================================================
import { ChildProcess, IOType } from "node:child_process";
import spawn from "cross-spawn";
import process from "node:process";
import { Stream, PassThrough } from "node:stream";
import { ReadBuffer, serializeMessage } from "../shared/stdio.js";
import { Transport } from "../shared/transport.js";
import { JSONRPCMessage } from "../types.js";

export type StdioServerParameters = {
  /**
   * The executable to run to start the server.
   */
  command: string;

  /**
   * Command line arguments to pass to the executable.
   */
  args?: string[];

  /**
   * The environment to use when spawning the process.
   *
   * If not specified, the result of getDefaultEnvironment() will be used.
   */
  env?: Record<string, string>;

  /**
   * How to handle stderr of the child process. This matches the semantics of Node's `child_process.spawn`.
   *
   * The default is "inherit", meaning messages to stderr will be printed to the parent process's stderr.
   */
  stderr?: IOType | Stream | number;

  /**
   * The working directory to use when spawning the process.
   *
   * If not specified, the current working directory will be inherited.
   */
  cwd?: string;
};

/**
 * Environment variables to inherit by default, if an environment is not explicitly given.
 */
export const DEFAULT_INHERITED_ENV_VARS =
  process.platform === "win32"
    ? [
        "APPDATA",
        "HOMEDRIVE",
        "HOMEPATH",
        "LOCALAPPDATA",
        "PATH",
        "PROCESSOR_ARCHITECTURE",
        "SYSTEMDRIVE",
        "SYSTEMROOT",
        "TEMP",
        "USERNAME",
        "USERPROFILE",
      ]
    : /* list inspired by the default env inheritance of sudo */
      ["HOME", "LOGNAME", "PATH", "SHELL", "TERM", "USER"];

/**
 * Returns a default environment object including only environment variables deemed safe to inherit.
 */
export function getDefaultEnvironment(): Record<string, string> {
  const env: Record<string, string> = {};

  for (const key of DEFAULT_INHERITED_ENV_VARS) {
    const value = process.env[key];
    if (value === undefined) {
      continue;
    }

    if (value.startsWith("()")) {
      // Skip functions, which are a security risk.
      continue;
    }

    env[key] = value;
  }

  return env;
}

/**
 * Client transport for stdio: this will connect to a server by spawning a process and communicating with it over stdin/stdout.
 *
 * This transport is only available in Node.js environments.
 */
export class StdioClientTransport implements Transport {
  private _process?: ChildProcess;
  private _abortController: AbortController = new AbortController();
  private _readBuffer: ReadBuffer = new ReadBuffer();
  private _serverParams: StdioServerParameters;
  private _stderrStream: PassThrough | null = null;

  onclose?: () => void;
  onerror?: (error: Error) => void;
  onmessage?: (message: JSONRPCMessage) => void;

  constructor(server: StdioServerParameters) {
    this._serverParams = server;
    if (server.stderr === "pipe" || server.stderr === "overlapped") {
      this._stderrStream = new PassThrough();
    }
  }

  /**
   * Starts the server process and prepares to communicate with it.
   */
  async start(): Promise<void> {
    if (this._process) {
      throw new Error(
        "StdioClientTransport already started! If using Client class, note that connect() calls start() automatically."
      );
    }

    return new Promise((resolve, reject) => {
      this._process = spawn(
        this._serverParams.command,
        this._serverParams.args ?? [],
        {
          env: this._serverParams.env ?? getDefaultEnvironment(),
          stdio: ["pipe", "pipe", this._serverParams.stderr ?? "inherit"],
          shell: false,
          signal: this._abortController.signal,
          windowsHide: process.platform === "win32" && isElectron(),
          cwd: this._serverParams.cwd,
        }
      );

      this._process.on("error", (error) => {
        if (error.name === "AbortError") {
          // Expected when close() is called.
          this.onclose?.();
          return;
        }

        reject(error);
        this.onerror?.(error);
      });

      this._process.on("spawn", () => {
        resolve();
      });

      this._process.on("close", (_code) => {
        this._process = undefined;
        this.onclose?.();
      });

      this._process.stdin?.on("error", (error) => {
        this.onerror?.(error);
      });

      this._process.stdout?.on("data", (chunk) => {
        this._readBuffer.append(chunk);
        this.processReadBuffer();
      });

      this._process.stdout?.on("error", (error) => {
        this.onerror?.(error);
      });

      if (this._stderrStream && this._process.stderr) {
        this._process.stderr.pipe(this._stderrStream);
      }
    });
  }

  /**
   * The stderr stream of the child process, if `StdioServerParameters.stderr` was set to "pipe" or "overlapped".
   *
   * If stderr piping was requested, a PassThrough stream is returned _immediately_, allowing callers to
   * attach listeners before the start method is invoked. This prevents loss of any early
   * error output emitted by the child process.
   */
  get stderr(): Stream | null {
    if (this._stderrStream) {
      return this._stderrStream;
    }

    return this._process?.stderr ?? null;
  }

  private processReadBuffer() {
    while (true) {
      try {
        const message = this._readBuffer.readMessage();
        if (message === null) {
          break;
        }

        this.onmessage?.(message);
      } catch (error) {
        this.onerror?.(error as Error);
      }
    }
  }

  async close(): Promise<void> {
    this._abortController.abort();
    this._process = undefined;
    this._readBuffer.clear();
  }

  send(message: JSONRPCMessage): Promise<void> {
    return new Promise((resolve) => {
      if (!this._process?.stdin) {
        throw new Error("Not connected");
      }

      const json = serializeMessage(message);
      if (this._process.stdin.write(json)) {
        resolve();
      } else {
        this._process.stdin.once("drain", resolve);
      }
    });
  }
}

function isElectron() {
  return "type" in process;
}



================================================
FILE: src/client/streamableHttp.test.ts
================================================
import { StreamableHTTPClientTransport, StreamableHTTPReconnectionOptions } from "./streamableHttp.js";
import { OAuthClientProvider, UnauthorizedError } from "./auth.js";
import { JSONRPCMessage } from "../types.js";


describe("StreamableHTTPClientTransport", () => {
  let transport: StreamableHTTPClientTransport;
  let mockAuthProvider: jest.Mocked<OAuthClientProvider>;

  beforeEach(() => {
    mockAuthProvider = {
      get redirectUrl() { return "http://localhost/callback"; },
      get clientMetadata() { return { redirect_uris: ["http://localhost/callback"] }; },
      clientInformation: jest.fn(() => ({ client_id: "test-client-id", client_secret: "test-client-secret" })),
      tokens: jest.fn(),
      saveTokens: jest.fn(),
      redirectToAuthorization: jest.fn(),
      saveCodeVerifier: jest.fn(),
      codeVerifier: jest.fn(),
    };
    transport = new StreamableHTTPClientTransport(new URL("http://localhost:1234/mcp"), { authProvider: mockAuthProvider });
    jest.spyOn(global, "fetch");
  });

  afterEach(async () => {
    await transport.close().catch(() => { });
    jest.clearAllMocks();
  });

  it("should send JSON-RPC messages via POST", async () => {
    const message: JSONRPCMessage = {
      jsonrpc: "2.0",
      method: "test",
      params: {},
      id: "test-id"
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 202,
      headers: new Headers(),
    });

    await transport.send(message);

    expect(global.fetch).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        method: "POST",
        headers: expect.any(Headers),
        body: JSON.stringify(message)
      })
    );
  });

  it("should send batch messages", async () => {
    const messages: JSONRPCMessage[] = [
      { jsonrpc: "2.0", method: "test1", params: {}, id: "id1" },
      { jsonrpc: "2.0", method: "test2", params: {}, id: "id2" }
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: new Headers({ "content-type": "text/event-stream" }),
      body: null
    });

    await transport.send(messages);

    expect(global.fetch).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        method: "POST",
        headers: expect.any(Headers),
        body: JSON.stringify(messages)
      })
    );
  });

  it("should store session ID received during initialization", async () => {
    const message: JSONRPCMessage = {
      jsonrpc: "2.0",
      method: "initialize",
      params: {
        clientInfo: { name: "test-client", version: "1.0" },
        protocolVersion: "2025-03-26"
      },
      id: "init-id"
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: new Headers({ "content-type": "text/event-stream", "mcp-session-id": "test-session-id" }),
    });

    await transport.send(message);

    // Send a second message that should include the session ID
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 202,
      headers: new Headers()
    });

    await transport.send({ jsonrpc: "2.0", method: "test", params: {} } as JSONRPCMessage);

    // Check that second request included session ID header
    const calls = (global.fetch as jest.Mock).mock.calls;
    const lastCall = calls[calls.length - 1];
    expect(lastCall[1].headers).toBeDefined();
    expect(lastCall[1].headers.get("mcp-session-id")).toBe("test-session-id");
  });

  it("should terminate session with DELETE request", async () => {
    // First, simulate getting a session ID
    const message: JSONRPCMessage = {
      jsonrpc: "2.0",
      method: "initialize",
      params: {
        clientInfo: { name: "test-client", version: "1.0" },
        protocolVersion: "2025-03-26"
      },
      id: "init-id"
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: new Headers({ "content-type": "text/event-stream", "mcp-session-id": "test-session-id" }),
    });

    await transport.send(message);
    expect(transport.sessionId).toBe("test-session-id");

    // Now terminate the session
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: new Headers()
    });

    await transport.terminateSession();

    // Verify the DELETE request was sent with the session ID
    const calls = (global.fetch as jest.Mock).mock.calls;
    const lastCall = calls[calls.length - 1];
    expect(lastCall[1].method).toBe("DELETE");
    expect(lastCall[1].headers.get("mcp-session-id")).toBe("test-session-id");

    // The session ID should be cleared after successful termination
    expect(transport.sessionId).toBeUndefined();
  });

  it("should handle 405 response when server doesn't support session termination", async () => {
    // First, simulate getting a session ID
    const message: JSONRPCMessage = {
      jsonrpc: "2.0",
      method: "initialize",
      params: {
        clientInfo: { name: "test-client", version: "1.0" },
        protocolVersion: "2025-03-26"
      },
      id: "init-id"
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: new Headers({ "content-type": "text/event-stream", "mcp-session-id": "test-session-id" }),
    });

    await transport.send(message);

    // Now terminate the session, but server responds with 405
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 405,
      statusText: "Method Not Allowed",
      headers: new Headers()
    });

    await expect(transport.terminateSession()).resolves.not.toThrow();
  });

  it("should handle 404 response when session expires", async () => {
    const message: JSONRPCMessage = {
      jsonrpc: "2.0",
      method: "test",
      params: {},
      id: "test-id"
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: "Not Found",
      text: () => Promise.resolve("Session not found"),
      headers: new Headers()
    });

    const errorSpy = jest.fn();
    transport.onerror = errorSpy;

    await expect(transport.send(message)).rejects.toThrow("Error POSTing to endpoint (HTTP 404)");
    expect(errorSpy).toHaveBeenCalled();
  });

  it("should handle non-streaming JSON response", async () => {
    const message: JSONRPCMessage = {
      jsonrpc: "2.0",
      method: "test",
      params: {},
      id: "test-id"
    };

    const responseMessage: JSONRPCMessage = {
      jsonrpc: "2.0",
      result: { success: true },
      id: "test-id"
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: new Headers({ "content-type": "application/json" }),
      json: () => Promise.resolve(responseMessage)
    });

    const messageSpy = jest.fn();
    transport.onmessage = messageSpy;

    await transport.send(message);

    expect(messageSpy).toHaveBeenCalledWith(responseMessage);
  });

  it("should attempt initial GET connection and handle 405 gracefully", async () => {
    // Mock the server not supporting GET for SSE (returning 405)
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 405,
      statusText: "Method Not Allowed"
    });

    // We expect the 405 error to be caught and handled gracefully
    // This should not throw an error that breaks the transport
    await transport.start();
    await expect(transport["_startOrAuthSse"]({})).resolves.not.toThrow("Failed to open SSE stream: Method Not Allowed");
    // Check that GET was attempted
    expect(global.fetch).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        method: "GET",
        headers: expect.any(Headers)
      })
    );

    // Verify transport still works after 405
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 202,
      headers: new Headers()
    });

    await transport.send({ jsonrpc: "2.0", method: "test", params: {} } as JSONRPCMessage);
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  it("should handle successful initial GET connection for SSE", async () => {
    // Set up readable stream for SSE events
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        // Send a server notification via SSE
        const event = "event: message\ndata: {\"jsonrpc\": \"2.0\", \"method\": \"serverNotification\", \"params\": {}}\n\n";
        controller.enqueue(encoder.encode(event));
      }
    });

    // Mock successful GET connection
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: new Headers({ "content-type": "text/event-stream" }),
      body: stream
    });

    const messageSpy = jest.fn();
    transport.onmessage = messageSpy;

    await transport.start();
    await transport["_startOrAuthSse"]({});

    // Give time for the SSE event to be processed
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(messageSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        jsonrpc: "2.0",
        method: "serverNotification",
        params: {}
      })
    );
  });

  it("should handle multiple concurrent SSE streams", async () => {
    // Mock two POST requests that return SSE streams
    const makeStream = (id: string) => {
      const encoder = new TextEncoder();
      return new ReadableStream({
        start(controller) {
          const event = `event: message\ndata: {"jsonrpc": "2.0", "result": {"id": "${id}"}, "id": "${id}"}\n\n`;
          controller.enqueue(encoder.encode(event));
        }
      });
    };

    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ "content-type": "text/event-stream" }),
        body: makeStream("request1")
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ "content-type": "text/event-stream" }),
        body: makeStream("request2")
      });

    const messageSpy = jest.fn();
    transport.onmessage = messageSpy;

    // Send two concurrent requests
    await Promise.all([
      transport.send({ jsonrpc: "2.0", method: "test1", params: {}, id: "request1" }),
      transport.send({ jsonrpc: "2.0", method: "test2", params: {}, id: "request2" })
    ]);

    // Give time for SSE processing
    await new Promise(resolve => setTimeout(resolve, 100));

    // Both streams should have delivered their messages
    expect(messageSpy).toHaveBeenCalledTimes(2);

    // Verify received messages without assuming specific order
    expect(messageSpy.mock.calls.some(call => {
      const msg = call[0];
      return msg.id === "request1" && msg.result?.id === "request1";
    })).toBe(true);

    expect(messageSpy.mock.calls.some(call => {
      const msg = call[0];
      return msg.id === "request2" && msg.result?.id === "request2";
    })).toBe(true);
  });

  it("should support custom reconnection options", () => {
    // Create a transport with custom reconnection options
    transport = new StreamableHTTPClientTransport(new URL("http://localhost:1234/mcp"), {
      reconnectionOptions: {
        initialReconnectionDelay: 500,
        maxReconnectionDelay: 10000,
        reconnectionDelayGrowFactor: 2,
        maxRetries: 5,
      }
    });

    // Verify options were set correctly (checking implementation details)
    // Access private properties for testing
    const transportInstance = transport as unknown as {
      _reconnectionOptions: StreamableHTTPReconnectionOptions;
    };
    expect(transportInstance._reconnectionOptions.initialReconnectionDelay).toBe(500);
    expect(transportInstance._reconnectionOptions.maxRetries).toBe(5);
  });

  it("should pass lastEventId when reconnecting", async () => {
    // Create a fresh transport
    transport = new StreamableHTTPClientTransport(new URL("http://localhost:1234/mcp"));

    // Mock fetch to verify headers sent
    const fetchSpy = global.fetch as jest.Mock;
    fetchSpy.mockReset();
    fetchSpy.mockResolvedValue({
      ok: true,
      status: 200,
      headers: new Headers({ "content-type": "text/event-stream" }),
      body: new ReadableStream()
    });

    // Call the reconnect method directly with a lastEventId
    await transport.start();
    // Type assertion to access private method
    const transportWithPrivateMethods = transport as unknown as {
      _startOrAuthSse: (options: { resumptionToken?: string }) => Promise<void>
    };
    await transportWithPrivateMethods._startOrAuthSse({ resumptionToken: "test-event-id" });

    // Verify fetch was called with the lastEventId header
    expect(fetchSpy).toHaveBeenCalled();
    const fetchCall = fetchSpy.mock.calls[0];
    const headers = fetchCall[1].headers;
    expect(headers.get("last-event-id")).toBe("test-event-id");
  });

  it("should throw error when invalid content-type is received", async () => {
    // Clear any previous state from other tests
    jest.clearAllMocks();

    // Create a fresh transport instance
    transport = new StreamableHTTPClientTransport(new URL("http://localhost:1234/mcp"));

    const message: JSONRPCMessage = {
      jsonrpc: "2.0",
      method: "test",
      params: {},
      id: "test-id"
    };

    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode("invalid text response"));
        controller.close();
      }
    });

    const errorSpy = jest.fn();
    transport.onerror = errorSpy;

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: new Headers({ "content-type": "text/plain" }),
      body: stream
    });

    await transport.start();
    await expect(transport.send(message)).rejects.toThrow("Unexpected content type: text/plain");
    expect(errorSpy).toHaveBeenCalled();
  });


  it("should always send specified custom headers", async () => {
    const requestInit = {
      headers: {
        "X-Custom-Header": "CustomValue"
      }
    };
    transport = new StreamableHTTPClientTransport(new URL("http://localhost:1234/mcp"), {
      requestInit: requestInit
    });

    let actualReqInit: RequestInit = {};

    ((global.fetch as jest.Mock)).mockImplementation(
      async (_url, reqInit) => {
        actualReqInit = reqInit;
        return new Response(null, { status: 200, headers: { "content-type": "text/event-stream" } });
      }
    );

    await transport.start();

    await transport["_startOrAuthSse"]({});
    expect((actualReqInit.headers as Headers).get("x-custom-header")).toBe("CustomValue");

    requestInit.headers["X-Custom-Header"] = "SecondCustomValue";

    await transport.send({ jsonrpc: "2.0", method: "test", params: {} } as JSONRPCMessage);
    expect((actualReqInit.headers as Headers).get("x-custom-header")).toBe("SecondCustomValue");

    expect(global.fetch).toHaveBeenCalledTimes(2);
  });


  it("should have exponential backoff with configurable maxRetries", () => {
    // This test verifies the maxRetries and backoff calculation directly

    // Create transport with specific options for testing
    transport = new StreamableHTTPClientTransport(new URL("http://localhost:1234/mcp"), {
      reconnectionOptions: {
        initialReconnectionDelay: 100,
        maxReconnectionDelay: 5000,
        reconnectionDelayGrowFactor: 2,
        maxRetries: 3,
      }
    });

    // Get access to the internal implementation
    const getDelay = transport["_getNextReconnectionDelay"].bind(transport);

    // First retry - should use initial delay
    expect(getDelay(0)).toBe(100);

    // Second retry - should double (2^1 * 100 = 200)
    expect(getDelay(1)).toBe(200);

    // Third retry - should double again (2^2 * 100 = 400) 
    expect(getDelay(2)).toBe(400);

    // Fourth retry - should double again (2^3 * 100 = 800)
    expect(getDelay(3)).toBe(800);

    // Tenth retry - should be capped at maxReconnectionDelay
    expect(getDelay(10)).toBe(5000);
  });

  it("attempts auth flow on 401 during POST request", async () => {
    const message: JSONRPCMessage = {
      jsonrpc: "2.0",
      method: "test",
      params: {},
      id: "test-id"
    };

    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: false,
        status: 401,
        statusText: "Unauthorized",
        headers: new Headers()
      })
      .mockResolvedValue({
        ok: false,
        status: 404
      });

    await expect(transport.send(message)).rejects.toThrow(UnauthorizedError);
    expect(mockAuthProvider.redirectToAuthorization.mock.calls).toHaveLength(1);
  });
});



================================================
FILE: src/client/streamableHttp.ts
================================================
import { Transport } from "../shared/transport.js";
import { isInitializedNotification, isJSONRPCRequest, isJSONRPCResponse, JSONRPCMessage, JSONRPCMessageSchema } from "../types.js";
import { auth, AuthResult, OAuthClientProvider, UnauthorizedError } from "./auth.js";
import { EventSourceParserStream } from "eventsource-parser/stream";

// Default reconnection options for StreamableHTTP connections
const DEFAULT_STREAMABLE_HTTP_RECONNECTION_OPTIONS: StreamableHTTPReconnectionOptions = {
  initialReconnectionDelay: 1000,
  maxReconnectionDelay: 30000,
  reconnectionDelayGrowFactor: 1.5,
  maxRetries: 2,
};

export class StreamableHTTPError extends Error {
  constructor(
    public readonly code: number | undefined,
    message: string | undefined,
  ) {
    super(`Streamable HTTP error: ${message}`);
  }
}

/**
 * Options for starting or authenticating an SSE connection
 */
interface StartSSEOptions {
  /**
   * The resumption token used to continue long-running requests that were interrupted.
   *
   * This allows clients to reconnect and continue from where they left off.
   */
  resumptionToken?: string;

  /**
   * A callback that is invoked when the resumption token changes.
   *
   * This allows clients to persist the latest token for potential reconnection.
   */
  onresumptiontoken?: (token: string) => void;

  /**
  * Override Message ID to associate with the replay message
  * so that response can be associate with the new resumed request.
  */
  replayMessageId?: string | number;
}

/**
 * Configuration options for reconnection behavior of the StreamableHTTPClientTransport.
 */
export interface StreamableHTTPReconnectionOptions {
  /**
   * Maximum backoff time between reconnection attempts in milliseconds.
   * Default is 30000 (30 seconds).
   */
  maxReconnectionDelay: number;

  /**
   * Initial backoff time between reconnection attempts in milliseconds.
   * Default is 1000 (1 second).
   */
  initialReconnectionDelay: number;

  /**
   * The factor by which the reconnection delay increases after each attempt.
   * Default is 1.5.
   */
  reconnectionDelayGrowFactor: number;

  /**
   * Maximum number of reconnection attempts before giving up.
   * Default is 2.
   */
  maxRetries: number;
}

/**
 * Configuration options for the `StreamableHTTPClientTransport`.
 */
export type StreamableHTTPClientTransportOptions = {
  /**
   * An OAuth client provider to use for authentication.
   *
   * When an `authProvider` is specified and the connection is started:
   * 1. The connection is attempted with any existing access token from the `authProvider`.
   * 2. If the access token has expired, the `authProvider` is used to refresh the token.
   * 3. If token refresh fails or no access token exists, and auth is required, `OAuthClientProvider.redirectToAuthorization` is called, and an `UnauthorizedError` will be thrown from `connect`/`start`.
   *
   * After the user has finished authorizing via their user agent, and is redirected back to the MCP client application, call `StreamableHTTPClientTransport.finishAuth` with the authorization code before retrying the connection.
   *
   * If an `authProvider` is not provided, and auth is required, an `UnauthorizedError` will be thrown.
   *
   * `UnauthorizedError` might also be thrown when sending any message over the transport, indicating that the session has expired, and needs to be re-authed and reconnected.
   */
  authProvider?: OAuthClientProvider;

  /**
   * Customizes HTTP requests to the server.
   */
  requestInit?: RequestInit;

  /**
   * Options to configure the reconnection behavior.
   */
  reconnectionOptions?: StreamableHTTPReconnectionOptions;

  /**
   * Session ID for the connection. This is used to identify the session on the server.
   * When not provided and connecting to a server that supports session IDs, the server will generate a new session ID.
   */
  sessionId?: string;
};

/**
 * Client transport for Streamable HTTP: this implements the MCP Streamable HTTP transport specification.
 * It will connect to a server using HTTP POST for sending messages and HTTP GET with Server-Sent Events
 * for receiving messages.
 */
export class StreamableHTTPClientTransport implements Transport {
  private _abortController?: AbortController;
  private _url: URL;
  private _requestInit?: RequestInit;
  private _authProvider?: OAuthClientProvider;
  private _sessionId?: string;
  private _reconnectionOptions: StreamableHTTPReconnectionOptions;

  onclose?: () => void;
  onerror?: (error: Error) => void;
  onmessage?: (message: JSONRPCMessage) => void;

  constructor(
    url: URL,
    opts?: StreamableHTTPClientTransportOptions,
  ) {
    this._url = url;
    this._requestInit = opts?.requestInit;
    this._authProvider = opts?.authProvider;
    this._sessionId = opts?.sessionId;
    this._reconnectionOptions = opts?.reconnectionOptions ?? DEFAULT_STREAMABLE_HTTP_RECONNECTION_OPTIONS;
  }

  private async _authThenStart(): Promise<void> {
    if (!this._authProvider) {
      throw new UnauthorizedError("No auth provider");
    }

    let result: AuthResult;
    try {
      result = await auth(this._authProvider, { serverUrl: this._url });
    } catch (error) {
      this.onerror?.(error as Error);
      throw error;
    }

    if (result !== "AUTHORIZED") {
      throw new UnauthorizedError();
    }

    return await this._startOrAuthSse({ resumptionToken: undefined });
  }

  private async _commonHeaders(): Promise<Headers> {
    const headers: HeadersInit = {};
    if (this._authProvider) {
      const tokens = await this._authProvider.tokens();
      if (tokens) {
        headers["Authorization"] = `Bearer ${tokens.access_token}`;
      }
    }

    if (this._sessionId) {
      headers["mcp-session-id"] = this._sessionId;
    }

    return new Headers(
      { ...headers, ...this._requestInit?.headers }
    );
  }


  private async _startOrAuthSse(options: StartSSEOptions): Promise<void> {
    const { resumptionToken } = options;
    try {
      // Try to open an initial SSE stream with GET to listen for server messages
      // This is optional according to the spec - server may not support it
      const headers = await this._commonHeaders();
      headers.set("Accept", "text/event-stream");

      // Include Last-Event-ID header for resumable streams if provided
      if (resumptionToken) {
        headers.set("last-event-id", resumptionToken);
      }

      const response = await fetch(this._url, {
        method: "GET",
        headers,
        signal: this._abortController?.signal,
      });

      if (!response.ok) {
        if (response.status === 401 && this._authProvider) {
          // Need to authenticate
          return await this._authThenStart();
        }

        // 405 indicates that the server does not offer an SSE stream at GET endpoint
        // This is an expected case that should not trigger an error
        if (response.status === 405) {
          return;
        }

        throw new StreamableHTTPError(
          response.status,
          `Failed to open SSE stream: ${response.statusText}`,
        );
      }

      this._handleSseStream(response.body, options);
    } catch (error) {
      this.onerror?.(error as Error);
      throw error;
    }
  }


  /**
   * Calculates the next reconnection delay using  backoff algorithm
   * 
   * @param attempt Current reconnection attempt count for the specific stream
   * @returns Time to wait in milliseconds before next reconnection attempt
   */
  private _getNextReconnectionDelay(attempt: number): number {
    // Access default values directly, ensuring they're never undefined
    const initialDelay = this._reconnectionOptions.initialReconnectionDelay;
    const growFactor = this._reconnectionOptions.reconnectionDelayGrowFactor;
    const maxDelay = this._reconnectionOptions.maxReconnectionDelay;

    // Cap at maximum delay
    return Math.min(initialDelay * Math.pow(growFactor, attempt), maxDelay);

  }

  /**
   * Schedule a reconnection attempt with exponential backoff
   * 
   * @param lastEventId The ID of the last received event for resumability
   * @param attemptCount Current reconnection attempt count for this specific stream
   */
  private _scheduleReconnection(options: StartSSEOptions, attemptCount = 0): void {
    // Use provided options or default options
    const maxRetries = this._reconnectionOptions.maxRetries;

    // Check if we've exceeded maximum retry attempts
    if (maxRetries > 0 && attemptCount >= maxRetries) {
      this.onerror?.(new Error(`Maximum reconnection attempts (${maxRetries}) exceeded.`));
      return;
    }

    // Calculate next delay based on current attempt count
    const delay = this._getNextReconnectionDelay(attemptCount);

    // Schedule the reconnection
    setTimeout(() => {
      // Use the last event ID to resume where we left off
      this._startOrAuthSse(options).catch(error => {
        this.onerror?.(new Error(`Failed to reconnect SSE stream: ${error instanceof Error ? error.message : String(error)}`));
        // Schedule another attempt if this one failed, incrementing the attempt counter
        this._scheduleReconnection(options, attemptCount + 1);
      });
    }, delay);
  }

  private _handleSseStream(stream: ReadableStream<Uint8Array> | null, options: StartSSEOptions): void {
    if (!stream) {
      return;
    }
    const { onresumptiontoken, replayMessageId } = options;

    let lastEventId: string | undefined;
    const processStream = async () => {
      // this is the closest we can get to trying to catch network errors
      // if something happens reader will throw
      try {
        // Create a pipeline: binary stream -> text decoder -> SSE parser
        const reader = stream
          .pipeThrough(new TextDecoderStream())
          .pipeThrough(new EventSourceParserStream())
          .getReader();


        while (true) {
          const { value: event, done } = await reader.read();
          if (done) {
            break;
          }

          // Update last event ID if provided
          if (event.id) {
            lastEventId = event.id;
            onresumptiontoken?.(event.id);
          }

          if (!event.event || event.event === "message") {
            try {
              const message = JSONRPCMessageSchema.parse(JSON.parse(event.data));
              if (replayMessageId !== undefined && isJSONRPCResponse(message)) {
                message.id = replayMessageId;
              }
              this.onmessage?.(message);
            } catch (error) {
              this.onerror?.(error as Error);
            }
          }
        }
      } catch (error) {
        // Handle stream errors - likely a network disconnect
        this.onerror?.(new Error(`SSE stream disconnected: ${error}`));

        // Attempt to reconnect if the stream disconnects unexpectedly and we aren't closing
        if (this._abortController && !this._abortController.signal.aborted) {
          // Use the exponential backoff reconnection strategy
          if (lastEventId !== undefined) {
            try {
              this._scheduleReconnection({
                resumptionToken: lastEventId,
                onresumptiontoken,
                replayMessageId
              }, 0);
            }
            catch (error) {
              this.onerror?.(new Error(`Failed to reconnect: ${error instanceof Error ? error.message : String(error)}`));

            }
          }
        }
      }
    };
    processStream();
  }

  async start() {
    if (this._abortController) {
      throw new Error(
        "StreamableHTTPClientTransport already started! If using Client class, note that connect() calls start() automatically.",
      );
    }

    this._abortController = new AbortController();
  }

  /**
   * Call this method after the user has finished authorizing via their user agent and is redirected back to the MCP client application. This will exchange the authorization code for an access token, enabling the next connection attempt to successfully auth.
   */
  async finishAuth(authorizationCode: string): Promise<void> {
    if (!this._authProvider) {
      throw new UnauthorizedError("No auth provider");
    }

    const result = await auth(this._authProvider, { serverUrl: this._url, authorizationCode });
    if (result !== "AUTHORIZED") {
      throw new UnauthorizedError("Failed to authorize");
    }
  }

  async close(): Promise<void> {
    // Abort any pending requests
    this._abortController?.abort();

    this.onclose?.();
  }

  async send(message: JSONRPCMessage | JSONRPCMessage[], options?: { resumptionToken?: string, onresumptiontoken?: (token: string) => void }): Promise<void> {
    try {
      const { resumptionToken, onresumptiontoken } = options || {};

      if (resumptionToken) {
        // If we have at last event ID, we need to reconnect the SSE stream
        this._startOrAuthSse({ resumptionToken, replayMessageId: isJSONRPCRequest(message) ? message.id : undefined }).catch(err => this.onerror?.(err));
        return;
      }

      const headers = await this._commonHeaders();
      headers.set("content-type", "application/json");
      headers.set("accept", "application/json, text/event-stream");

      const init = {
        ...this._requestInit,
        method: "POST",
        headers,
        body: JSON.stringify(message),
        signal: this._abortController?.signal,
      };

      const response = await fetch(this._url, init);

      // Handle session ID received during initialization
      const sessionId = response.headers.get("mcp-session-id");
      if (sessionId) {
        this._sessionId = sessionId;
      }

      if (!response.ok) {
        if (response.status === 401 && this._authProvider) {
          const result = await auth(this._authProvider, { serverUrl: this._url });
          if (result !== "AUTHORIZED") {
            throw new UnauthorizedError();
          }

          // Purposely _not_ awaited, so we don't call onerror twice
          return this.send(message);
        }

        const text = await response.text().catch(() => null);
        throw new Error(
          `Error POSTing to endpoint (HTTP ${response.status}): ${text}`,
        );
      }

      // If the response is 202 Accepted, there's no body to process
      if (response.status === 202) {
        // if the accepted notification is initialized, we start the SSE stream
        // if it's supported by the server
        if (isInitializedNotification(message)) {
          // Start without a lastEventId since this is a fresh connection
          this._startOrAuthSse({ resumptionToken: undefined }).catch(err => this.onerror?.(err));
        }
        return;
      }

      // Get original message(s) for detecting request IDs
      const messages = Array.isArray(message) ? message : [message];

      const hasRequests = messages.filter(msg => "method" in msg && "id" in msg && msg.id !== undefined).length > 0;

      // Check the response type
      const contentType = response.headers.get("content-type");

      if (hasRequests) {
        if (contentType?.includes("text/event-stream")) {
          // Handle SSE stream responses for requests
          // We use the same handler as standalone streams, which now supports
          // reconnection with the last event ID
          this._handleSseStream(response.body, { onresumptiontoken });
        } else if (contentType?.includes("application/json")) {
          // For non-streaming servers, we might get direct JSON responses
          const data = await response.json();
          const responseMessages = Array.isArray(data)
            ? data.map(msg => JSONRPCMessageSchema.parse(msg))
            : [JSONRPCMessageSchema.parse(data)];

          for (const msg of responseMessages) {
            this.onmessage?.(msg);
          }
        } else {
          throw new StreamableHTTPError(
            -1,
            `Unexpected content type: ${contentType}`,
          );
        }
      }
    } catch (error) {
      this.onerror?.(error as Error);
      throw error;
    }
  }

  get sessionId(): string | undefined {
    return this._sessionId;
  }

  /**
   * Terminates the current session by sending a DELETE request to the server.
   * 
   * Clients that no longer need a particular session
   * (e.g., because the user is leaving the client application) SHOULD send an
   * HTTP DELETE to the MCP endpoint with the Mcp-Session-Id header to explicitly
   * terminate the session.
   * 
   * The server MAY respond with HTTP 405 Method Not Allowed, indicating that
   * the server does not allow clients to terminate sessions.
   */
  async terminateSession(): Promise<void> {
    if (!this._sessionId) {
      return; // No session to terminate
    }

    try {
      const headers = await this._commonHeaders();

      const init = {
        ...this._requestInit,
        method: "DELETE",
        headers,
        signal: this._abortController?.signal,
      };

      const response = await fetch(this._url, init);

      // We specifically handle 405 as a valid response according to the spec,
      // meaning the server does not support explicit session termination
      if (!response.ok && response.status !== 405) {
        throw new StreamableHTTPError(
          response.status,
          `Failed to terminate session: ${response.statusText}`
        );
      }

      this._sessionId = undefined;
    } catch (error) {
      this.onerror?.(error as Error);
      throw error;
    }
  }
}



================================================
FILE: src/client/websocket.ts
================================================
import { Transport } from "../shared/transport.js";
import { JSONRPCMessage, JSONRPCMessageSchema } from "../types.js";

const SUBPROTOCOL = "mcp";

/**
 * Client transport for WebSocket: this will connect to a server over the WebSocket protocol.
 */
export class WebSocketClientTransport implements Transport {
  private _socket?: WebSocket;
  private _url: URL;

  onclose?: () => void;
  onerror?: (error: Error) => void;
  onmessage?: (message: JSONRPCMessage) => void;

  constructor(url: URL) {
    this._url = url;
  }

  start(): Promise<void> {
    if (this._socket) {
      throw new Error(
        "WebSocketClientTransport already started! If using Client class, note that connect() calls start() automatically.",
      );
    }

    return new Promise((resolve, reject) => {
      this._socket = new WebSocket(this._url, SUBPROTOCOL);

      this._socket.onerror = (event) => {
        const error =
          "error" in event
            ? (event.error as Error)
            : new Error(`WebSocket error: ${JSON.stringify(event)}`);
        reject(error);
        this.onerror?.(error);
      };

      this._socket.onopen = () => {
        resolve();
      };

      this._socket.onclose = () => {
        this.onclose?.();
      };

      this._socket.onmessage = (event: MessageEvent) => {
        let message: JSONRPCMessage;
        try {
          message = JSONRPCMessageSchema.parse(JSON.parse(event.data));
        } catch (error) {
          this.onerror?.(error as Error);
          return;
        }

        this.onmessage?.(message);
      };
    });
  }

  async close(): Promise<void> {
    this._socket?.close();
  }

  send(message: JSONRPCMessage): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this._socket) {
        reject(new Error("Not connected"));
        return;
      }

      this._socket?.send(JSON.stringify(message));
      resolve();
    });
  }
}



================================================
FILE: src/examples/README.md
================================================
# MCP TypeScript SDK Examples

This directory contains example implementations of MCP clients and servers using the TypeScript SDK.

## Table of Contents

- [Client Implementations](#client-implementations)
  - [Streamable HTTP Client](#streamable-http-client)
  - [Backwards Compatible Client](#backwards-compatible-client)
- [Server Implementations](#server-implementations)
  - [Single Node Deployment](#single-node-deployment)
    - [Streamable HTTP Transport](#streamable-http-transport)
    - [Deprecated SSE Transport](#deprecated-sse-transport)
    - [Backwards Compatible Server](#streamable-http-backwards-compatible-server-with-sse)
  - [Multi-Node Deployment](#multi-node-deployment)
- [Backwards Compatibility](#testing-streamable-http-backwards-compatibility-with-sse)

## Client Implementations

### Streamable HTTP Client

A full-featured interactive client that connects to a Streamable HTTP server, demonstrating how to:

- Establish and manage a connection to an MCP server
- List and call tools with arguments
- Handle notifications through the SSE stream
- List and get prompts with arguments
- List available resources
- Handle session termination and reconnection
- Support for resumability with Last-Event-ID tracking

```bash
npx tsx src/examples/client/simpleStreamableHttp.ts
```

### Backwards Compatible Client

A client that implements backwards compatibility according to the [MCP specification](https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#backwards-compatibility), allowing it to work with both new and legacy servers. This client demonstrates:

- The client first POSTs an initialize request to the server URL:
  - If successful, it uses the Streamable HTTP transport
  - If it fails with a 4xx status, it attempts a GET request to establish an SSE stream

```bash
npx tsx src/examples/client/streamableHttpWithSseFallbackClient.ts
```

## Server Implementations

### Single Node Deployment

These examples demonstrate how to set up an MCP server on a single node with different transport options.

#### Streamable HTTP Transport

##### Simple Streamable HTTP Server

A server that implements the Streamable HTTP transport (protocol version 2025-03-26). 

- Basic server setup with Express and the Streamable HTTP transport
- Session management with an in-memory event store for resumability
- Tool implementation with the `greet` and `multi-greet` tools
- Prompt implementation with the `greeting-template` prompt
- Static resource exposure
- Support for notifications via SSE stream established by GET requests
- Session termination via DELETE requests

```bash
npx tsx src/examples/server/simpleStreamableHttp.ts
```

##### JSON Response Mode Server

A server that uses Streamable HTTP transport with JSON response mode enabled (no SSE). 

- Streamable HTTP with JSON response mode, which returns responses directly in the response body
- Limited support for notifications (since SSE is disabled)
- Proper response handling according to the MCP specification for servers that don't support SSE
- Returning appropriate HTTP status codes for unsupported methods

```bash
npx tsx src/examples/server/jsonResponseStreamableHttp.ts
```

##### Streamable HTTP with server notifications

A server that demonstrates server notifications using Streamable HTTP. 

- Resource list change notifications with dynamically added resources
- Automatic resource creation on a timed interval


```bash
npx tsx src/examples/server/standaloneSseWithGetStreamableHttp.ts
```

#### Deprecated SSE Transport

A server that implements the deprecated HTTP+SSE transport (protocol version 2024-11-05). This example only used for testing backwards compatibility for clients.

- Two separate endpoints: `/mcp` for the SSE stream (GET) and `/messages` for client messages (POST)
- Tool implementation with a `start-notification-stream` tool that demonstrates sending periodic notifications

```bash
npx tsx src/examples/server/simpleSseServer.ts
```

#### Streamable Http Backwards Compatible Server with SSE 

A server that supports both Streamable HTTP and SSE transports, adhering to the [MCP specification for backwards compatibility](https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#backwards-compatibility). 

- Single MCP server instance with multiple transport options
- Support for Streamable HTTP requests at `/mcp` endpoint (GET/POST/DELETE)
- Support for deprecated SSE transport with `/sse` (GET) and `/messages` (POST)
- Session type tracking to avoid mixing transport types
- Notifications and tool execution across both transport types

```bash
npx tsx src/examples/server/sseAndStreamableHttpCompatibleServer.ts
```

### Multi-Node Deployment

When deploying MCP servers in a horizontally scaled environment (multiple server instances), there are a few different options that can be useful for different use cases:
- **Stateless mode** - No need to maintain state between calls to MCP servers. Useful for simple API wrapper servers.
- **Persistent storage mode** - No local state needed, but session data is stored in a database. Example: an MCP server for online ordering where the shopping cart is stored in a database.
- **Local state with message routing** - Local state is needed, and all requests for a session must be routed to the correct node. This can be done with a message queue and pub/sub system.

#### Stateless Mode

The Streamable HTTP transport can be configured to operate without tracking sessions. This is perfect for simple API proxies or when each request is completely independent.

##### Implementation

To enable stateless mode, configure the `StreamableHTTPServerTransport` with:
```typescript
sessionIdGenerator: undefined
```

This disables session management entirely, and the server won't generate or expect session IDs.

- No session ID headers are sent or expected
- Any server node can process any request
- No state is preserved between requests
- Perfect for RESTful or stateless API scenarios
- Simplest deployment model with minimal infrastructure requirements

```
┌─────────────────────────────────────────────┐
│                  Client                     │
└─────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────┐
│                Load Balancer                │
└─────────────────────────────────────────────┘
          │                       │
          ▼                       ▼
┌─────────────────┐     ┌─────────────────────┐
│  MCP Server #1  │     │    MCP Server #2    │
│ (Node.js)       │     │  (Node.js)          │
└─────────────────┘     └─────────────────────┘
```



#### Persistent Storage Mode

For cases where you need session continuity but don't need to maintain in-memory state on specific nodes, you can use a database to persist session data while still allowing any node to handle requests.

##### Implementation

Configure the transport with session management, but retrieve and store all state in an external persistent storage:

```typescript
sessionIdGenerator: () => randomUUID(),
eventStore: databaseEventStore
```

All session state is stored in the database, and any node can serve any client by retrieving the state when needed.

- Maintains sessions with unique IDs
- Stores all session data in an external database
- Provides resumability through the database-backed EventStore
- Any node can handle any request for the same session
- No node-specific memory state means no need for message routing
- Good for applications where state can be fully externalized
- Somewhat higher latency due to database access for each request


```
┌─────────────────────────────────────────────┐
│                  Client                     │
└─────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────┐
│                Load Balancer                │
└─────────────────────────────────────────────┘
          │                       │
          ▼                       ▼
┌─────────────────┐     ┌─────────────────────┐
│  MCP Server #1  │     │    MCP Server #2    │
│ (Node.js)       │     │  (Node.js)          │
└─────────────────┘     └─────────────────────┘
          │                       │
          │                       │
          ▼                       ▼
┌─────────────────────────────────────────────┐
│           Database (PostgreSQL)             │
│                                             │
│  • Session state                            │
│  • Event storage for resumability           │
└─────────────────────────────────────────────┘
```



#### Streamable HTTP with Distributed Message Routing

For scenarios where local in-memory state must be maintained on specific nodes (such as Computer Use or complex session state), the Streamable HTTP transport can be combined with a pub/sub system to route messages to the correct node handling each session.

1. **Bidirectional Message Queue Integration**:
   - All nodes both publish to and subscribe from the message queue
   - Each node registers the sessions it's actively handling
   - Messages are routed based on session ownership

2. **Request Handling Flow**:
   - When a client connects to Node A with an existing `mcp-session-id`
   - If Node A doesn't own this session, it:
     - Establishes and maintains the SSE connection with the client
     - Publishes the request to the message queue with the session ID
     - Node B (which owns the session) receives the request from the queue
     - Node B processes the request with its local session state
     - Node B publishes responses/notifications back to the queue
     - Node A subscribes to the response channel and forwards to the client

3. **Channel Identification**:
   - Each message channel combines both `mcp-session-id` and `stream-id`
   - This ensures responses are correctly routed back to the originating connection

```
┌─────────────────────────────────────────────┐
│                  Client                     │
└─────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────┐
│                Load Balancer                │
└─────────────────────────────────────────────┘
          │                       │
          ▼                       ▼
┌─────────────────┐     ┌─────────────────────┐
│  MCP Server #1  │◄───►│    MCP Server #2    │
│ (Has Session A) │     │  (Has Session B)    │
└─────────────────┘     └─────────────────────┘
          ▲│                     ▲│
          │▼                     │▼
┌─────────────────────────────────────────────┐
│         Message Queue / Pub-Sub             │
│                                             │
│  • Session ownership registry               │
│  • Bidirectional message routing            │
│  • Request/response forwarding              │
└─────────────────────────────────────────────┘
```


- Maintains session affinity for stateful operations without client redirection
- Enables horizontal scaling while preserving complex in-memory state
- Provides fault tolerance through the message queue as intermediary


## Backwards Compatibility

### Testing Streamable HTTP Backwards Compatibility with SSE

To test the backwards compatibility features:

1. Start one of the server implementations:
   ```bash
   # Legacy SSE server (protocol version 2024-11-05)
   npx tsx src/examples/server/simpleSseServer.ts
   
   # Streamable HTTP server (protocol version 2025-03-26)
   npx tsx src/examples/server/simpleStreamableHttp.ts
   
   # Backwards compatible server (supports both protocols)
   npx tsx src/examples/server/sseAndStreamableHttpCompatibleServer.ts
   ```

2. Then run the backwards compatible client:
   ```bash
   npx tsx src/examples/client/streamableHttpWithSseFallbackClient.ts
   ```

This demonstrates how the MCP ecosystem ensures interoperability between clients and servers regardless of which protocol version they were built for.


================================================
FILE: src/examples/client/multipleClientsParallel.ts
================================================
import { Client } from '../../client/index.js';
import { StreamableHTTPClientTransport } from '../../client/streamableHttp.js';
import {
  CallToolRequest,
  CallToolResultSchema,
  LoggingMessageNotificationSchema,
  CallToolResult,
} from '../../types.js';

/**
 * Multiple Clients MCP Example
 * 
 * This client demonstrates how to:
 * 1. Create multiple MCP clients in parallel
 * 2. Each client calls a single tool 
 * 3. Track notifications from each client independently
 */

// Command line args processing
const args = process.argv.slice(2);
const serverUrl = args[0] || 'http://localhost:3000/mcp';

interface ClientConfig {
  id: string;
  name: string;
  toolName: string;
  toolArguments: Record<string, string | number | boolean>;
}

async function createAndRunClient(config: ClientConfig): Promise<{ id: string; result: CallToolResult }> {
  console.log(`[${config.id}] Creating client: ${config.name}`);

  const client = new Client({
    name: config.name,
    version: '1.0.0'
  });

  const transport = new StreamableHTTPClientTransport(new URL(serverUrl));

  // Set up client-specific error handler
  client.onerror = (error) => {
    console.error(`[${config.id}] Client error:`, error);
  };

  // Set up client-specific notification handler
  client.setNotificationHandler(LoggingMessageNotificationSchema, (notification) => {
    console.log(`[${config.id}] Notification: ${notification.params.data}`);
  });

  try {
    // Connect to the server
    await client.connect(transport);
    console.log(`[${config.id}] Connected to MCP server`);

    // Call the specified tool
    console.log(`[${config.id}] Calling tool: ${config.toolName}`);
    const toolRequest: CallToolRequest = {
      method: 'tools/call',
      params: {
        name: config.toolName,
        arguments: {
          ...config.toolArguments,
          // Add client ID to arguments for identification in notifications
          caller: config.id
        }
      }
    };

    const result = await client.request(toolRequest, CallToolResultSchema);
    console.log(`[${config.id}] Tool call completed`);

    // Keep the connection open for a bit to receive notifications
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Disconnect
    await transport.close();
    console.log(`[${config.id}] Disconnected from MCP server`);

    return { id: config.id, result };
  } catch (error) {
    console.error(`[${config.id}] Error:`, error);
    throw error;
  }
}

async function main(): Promise<void> {
  console.log('MCP Multiple Clients Example');
  console.log('============================');
  console.log(`Server URL: ${serverUrl}`);
  console.log('');

  try {
    // Define client configurations
    const clientConfigs: ClientConfig[] = [
      {
        id: 'client1',
        name: 'basic-client-1',
        toolName: 'start-notification-stream',
        toolArguments: {
          interval: 3, // 1 second between notifications
          count: 5     // Send 5 notifications
        }
      },
      {
        id: 'client2',
        name: 'basic-client-2',
        toolName: 'start-notification-stream',
        toolArguments: {
          interval: 2, // 2 seconds between notifications
          count: 3     // Send 3 notifications
        }
      },
      {
        id: 'client3',
        name: 'basic-client-3',
        toolName: 'start-notification-stream',
        toolArguments: {
          interval: 1, // 0.5 second between notifications
          count: 8       // Send 8 notifications
        }
      }
    ];

    // Start all clients in parallel
    console.log(`Starting ${clientConfigs.length} clients in parallel...`);
    console.log('');

    const clientPromises = clientConfigs.map(config => createAndRunClient(config));
    const results = await Promise.all(clientPromises);

    // Display results from all clients
    console.log('\n=== Final Results ===');
    results.forEach(({ id, result }) => {
      console.log(`\n[${id}] Tool result:`);
      if (Array.isArray(result.content)) {
        result.content.forEach((item: { type: string; text?: string }) => {
          if (item.type === 'text' && item.text) {
            console.log(`  ${item.text}`);
          } else {
            console.log(`  ${item.type} content:`, item);
          }
        });
      } else {
        console.log(`  Unexpected result format:`, result);
      }
    });

    console.log('\n=== All clients completed successfully ===');

  } catch (error) {
    console.error('Error running multiple clients:', error);
    process.exit(1);
  }
}

// Start the example
main().catch((error: unknown) => {
  console.error('Error running MCP multiple clients example:', error);
  process.exit(1);
});


================================================
FILE: src/examples/client/parallelToolCallsClient.ts
================================================
import { Client } from '../../client/index.js';
import { StreamableHTTPClientTransport } from '../../client/streamableHttp.js';
import {
  ListToolsRequest,
  ListToolsResultSchema,
  CallToolResultSchema,
  LoggingMessageNotificationSchema,
  CallToolResult,
} from '../../types.js';

/**
 * Parallel Tool Calls MCP Client
 * 
 * This client demonstrates how to:
 * 1. Start multiple tool calls in parallel
 * 2. Track notifications from each tool call using a caller parameter
 */

// Command line args processing
const args = process.argv.slice(2);
const serverUrl = args[0] || 'http://localhost:3000/mcp';

async function main(): Promise<void> {
  console.log('MCP Parallel Tool Calls Client');
  console.log('==============================');
  console.log(`Connecting to server at: ${serverUrl}`);

  let client: Client;
  let transport: StreamableHTTPClientTransport;

  try {
    // Create client with streamable HTTP transport
    client = new Client({
      name: 'parallel-tool-calls-client',
      version: '1.0.0'
    });

    client.onerror = (error) => {
      console.error('Client error:', error);
    };

    // Connect to the server
    transport = new StreamableHTTPClientTransport(new URL(serverUrl));
    await client.connect(transport);
    console.log('Successfully connected to MCP server');

    // Set up notification handler with caller identification
    client.setNotificationHandler(LoggingMessageNotificationSchema, (notification) => {
      console.log(`Notification: ${notification.params.data}`);
    });

    console.log("List tools")
    const toolsRequest = await listTools(client);
    console.log("Tools: ", toolsRequest)


    // 2. Start multiple notification tools in parallel
    console.log('\n=== Starting Multiple Notification Streams in Parallel ===');
    const toolResults = await startParallelNotificationTools(client);

    // Log the results from each tool call
    for (const [caller, result] of Object.entries(toolResults)) {
      console.log(`\n=== Tool result for ${caller} ===`);
      result.content.forEach((item: { type: string; text?: string; }) => {
        if (item.type === 'text') {
          console.log(`  ${item.text}`);
        } else {
          console.log(`  ${item.type} content:`, item);
        }
      });
    }

    // 3. Wait for all notifications (10 seconds)
    console.log('\n=== Waiting for all notifications ===');
    await new Promise(resolve => setTimeout(resolve, 10000));

    // 4. Disconnect
    console.log('\n=== Disconnecting ===');
    await transport.close();
    console.log('Disconnected from MCP server');

  } catch (error) {
    console.error('Error running client:', error);
    process.exit(1);
  }
}

/**
 * List available tools on the server
 */
async function listTools(client: Client): Promise<void> {
  try {
    const toolsRequest: ListToolsRequest = {
      method: 'tools/list',
      params: {}
    };
    const toolsResult = await client.request(toolsRequest, ListToolsResultSchema);

    console.log('Available tools:');
    if (toolsResult.tools.length === 0) {
      console.log('  No tools available');
    } else {
      for (const tool of toolsResult.tools) {
        console.log(`  - ${tool.name}: ${tool.description}`);
      }
    }
  } catch (error) {
    console.log(`Tools not supported by this server: ${error}`);
  }
}

/**
 * Start multiple notification tools in parallel with different configurations
 * Each tool call includes a caller parameter to identify its notifications
 */
async function startParallelNotificationTools(client: Client): Promise<Record<string, CallToolResult>> {
  try {
    // Define multiple tool calls with different configurations
    const toolCalls = [
      {
        caller: 'fast-notifier',
        request: {
          method: 'tools/call',
          params: {
            name: 'start-notification-stream',
            arguments: {
              interval: 2,  // 0.5 second between notifications
              count: 10,      // Send 10 notifications
              caller: 'fast-notifier' // Identify this tool call
            }
          }
        }
      },
      {
        caller: 'slow-notifier',
        request: {
          method: 'tools/call',
          params: {
            name: 'start-notification-stream',
            arguments: {
              interval: 5, // 2 seconds between notifications
              count: 5,       // Send 5 notifications
              caller: 'slow-notifier' // Identify this tool call
            }
          }
        }
      },
      {
        caller: 'burst-notifier',
        request: {
          method: 'tools/call',
          params: {
            name: 'start-notification-stream',
            arguments: {
              interval: 1,  // 0.1 second between notifications
              count: 3,       // Send just 3 notifications
              caller: 'burst-notifier' // Identify this tool call
            }
          }
        }
      }
    ];

    console.log(`Starting ${toolCalls.length} notification tools in parallel...`);

    // Start all tool calls in parallel
    const toolPromises = toolCalls.map(({ caller, request }) => {
      console.log(`Starting tool call for ${caller}...`);
      return client.request(request, CallToolResultSchema)
        .then(result => ({ caller, result }))
        .catch(error => {
          console.error(`Error in tool call for ${caller}:`, error);
          throw error;
        });
    });

    // Wait for all tool calls to complete
    const results = await Promise.all(toolPromises);

    // Organize results by caller
    const resultsByTool: Record<string, CallToolResult> = {};
    results.forEach(({ caller, result }) => {
      resultsByTool[caller] = result;
    });

    return resultsByTool;
  } catch (error) {
    console.error(`Error starting parallel notification tools:`, error);
    throw error;
  }
}

// Start the client
main().catch((error: unknown) => {
  console.error('Error running MCP client:', error);
  process.exit(1);
});


================================================
FILE: src/examples/client/simpleStreamableHttp.ts
================================================
import { Client } from '../../client/index.js';
import { StreamableHTTPClientTransport } from '../../client/streamableHttp.js';
import { createInterface } from 'node:readline';
import {
  ListToolsRequest,
  ListToolsResultSchema,
  CallToolRequest,
  CallToolResultSchema,
  ListPromptsRequest,
  ListPromptsResultSchema,
  GetPromptRequest,
  GetPromptResultSchema,
  ListResourcesRequest,
  ListResourcesResultSchema,
  LoggingMessageNotificationSchema,
  ResourceListChangedNotificationSchema,
} from '../../types.js';

// Create readline interface for user input
const readline = createInterface({
  input: process.stdin,
  output: process.stdout
});

// Track received notifications for debugging resumability
let notificationCount = 0;

// Global client and transport for interactive commands
let client: Client | null = null;
let transport: StreamableHTTPClientTransport | null = null;
let serverUrl = 'http://localhost:3000/mcp';
let notificationsToolLastEventId: string | undefined = undefined;
let sessionId: string | undefined = undefined;

async function main(): Promise<void> {
  console.log('MCP Interactive Client');
  console.log('=====================');

  // Connect to server immediately with default settings
  await connect();

  // Print help and start the command loop
  printHelp();
  commandLoop();
}

function printHelp(): void {
  console.log('\nAvailable commands:');
  console.log('  connect [url]              - Connect to MCP server (default: http://localhost:3000/mcp)');
  console.log('  disconnect                 - Disconnect from server');
  console.log('  terminate-session          - Terminate the current session');
  console.log('  reconnect                  - Reconnect to the server');
  console.log('  list-tools                 - List available tools');
  console.log('  call-tool <name> [args]    - Call a tool with optional JSON arguments');
  console.log('  greet [name]               - Call the greet tool');
  console.log('  multi-greet [name]         - Call the multi-greet tool with notifications');
  console.log('  start-notifications [interval] [count] - Start periodic notifications');
  console.log('  list-prompts               - List available prompts');
  console.log('  get-prompt [name] [args]   - Get a prompt with optional JSON arguments');
  console.log('  list-resources             - List available resources');
  console.log('  help                       - Show this help');
  console.log('  quit                       - Exit the program');
}

function commandLoop(): void {
  readline.question('\n> ', async (input) => {
    const args = input.trim().split(/\s+/);
    const command = args[0]?.toLowerCase();

    try {
      switch (command) {
        case 'connect':
          await connect(args[1]);
          break;

        case 'disconnect':
          await disconnect();
          break;

        case 'terminate-session':
          await terminateSession();
          break;

        case 'reconnect':
          await reconnect();
          break;

        case 'list-tools':
          await listTools();
          break;

        case 'call-tool':
          if (args.length < 2) {
            console.log('Usage: call-tool <name> [args]');
          } else {
            const toolName = args[1];
            let toolArgs = {};
            if (args.length > 2) {
              try {
                toolArgs = JSON.parse(args.slice(2).join(' '));
              } catch {
                console.log('Invalid JSON arguments. Using empty args.');
              }
            }
            await callTool(toolName, toolArgs);
          }
          break;

        case 'greet':
          await callGreetTool(args[1] || 'MCP User');
          break;

        case 'multi-greet':
          await callMultiGreetTool(args[1] || 'MCP User');
          break;

        case 'start-notifications': {
          const interval = args[1] ? parseInt(args[1], 10) : 2000;
          const count = args[2] ? parseInt(args[2], 10) : 10;
          await startNotifications(interval, count);
          break;
        }

        case 'list-prompts':
          await listPrompts();
          break;

        case 'get-prompt':
          if (args.length < 2) {
            console.log('Usage: get-prompt <name> [args]');
          } else {
            const promptName = args[1];
            let promptArgs = {};
            if (args.length > 2) {
              try {
                promptArgs = JSON.parse(args.slice(2).join(' '));
              } catch {
                console.log('Invalid JSON arguments. Using empty args.');
              }
            }
            await getPrompt(promptName, promptArgs);
          }
          break;

        case 'list-resources':
          await listResources();
          break;

        case 'help':
          printHelp();
          break;

        case 'quit':
        case 'exit':
          await cleanup();
          return;

        default:
          if (command) {
            console.log(`Unknown command: ${command}`);
          }
          break;
      }
    } catch (error) {
      console.error(`Error executing command: ${error}`);
    }

    // Continue the command loop
    commandLoop();
  });
}

async function connect(url?: string): Promise<void> {
  if (client) {
    console.log('Already connected. Disconnect first.');
    return;
  }

  if (url) {
    serverUrl = url;
  }

  console.log(`Connecting to ${serverUrl}...`);

  try {
    // Create a new client
    client = new Client({
      name: 'example-client',
      version: '1.0.0'
    });
    client.onerror = (error) => {
      console.error('\x1b[31mClient error:', error, '\x1b[0m');
    }

    transport = new StreamableHTTPClientTransport(
      new URL(serverUrl),
      {
        sessionId: sessionId
      }
    );

    // Set up notification handlers
    client.setNotificationHandler(LoggingMessageNotificationSchema, (notification) => {
      notificationCount++;
      console.log(`\nNotification #${notificationCount}: ${notification.params.level} - ${notification.params.data}`);
      // Re-display the prompt
      process.stdout.write('> ');
    });

    client.setNotificationHandler(ResourceListChangedNotificationSchema, async (_) => {
      console.log(`\nResource list changed notification received!`);
      try {
        if (!client) {
          console.log('Client disconnected, cannot fetch resources');
          return;
        }
        const resourcesResult = await client.request({
          method: 'resources/list',
          params: {}
        }, ListResourcesResultSchema);
        console.log('Available resources count:', resourcesResult.resources.length);
      } catch {
        console.log('Failed to list resources after change notification');
      }
      // Re-display the prompt
      process.stdout.write('> ');
    });

    // Connect the client
    await client.connect(transport);
    sessionId = transport.sessionId
    console.log('Transport created with session ID:', sessionId);
    console.log('Connected to MCP server');
  } catch (error) {
    console.error('Failed to connect:', error);
    client = null;
    transport = null;
  }
}

async function disconnect(): Promise<void> {
  if (!client || !transport) {
    console.log('Not connected.');
    return;
  }

  try {
    await transport.close();
    console.log('Disconnected from MCP server');
    client = null;
    transport = null;
  } catch (error) {
    console.error('Error disconnecting:', error);
  }
}

async function terminateSession(): Promise<void> {
  if (!client || !transport) {
    console.log('Not connected.');
    return;
  }

  try {
    console.log('Terminating session with ID:', transport.sessionId);
    await transport.terminateSession();
    console.log('Session terminated successfully');
    
    // Check if sessionId was cleared after termination
    if (!transport.sessionId) {
      console.log('Session ID has been cleared');
      sessionId = undefined;
      
      // Also close the transport and clear client objects
      await transport.close();
      console.log('Transport closed after session termination');
      client = null;
      transport = null;
    } else {
      console.log('Server responded with 405 Method Not Allowed (session termination not supported)');
      console.log('Session ID is still active:', transport.sessionId);
    }
  } catch (error) {
    console.error('Error terminating session:', error);
  }
}

async function reconnect(): Promise<void> {
  if (client) {
    await disconnect();
  }
  await connect();
}

async function listTools(): Promise<void> {
  if (!client) {
    console.log('Not connected to server.');
    return;
  }

  try {
    const toolsRequest: ListToolsRequest = {
      method: 'tools/list',
      params: {}
    };
    const toolsResult = await client.request(toolsRequest, ListToolsResultSchema);

    console.log('Available tools:');
    if (toolsResult.tools.length === 0) {
      console.log('  No tools available');
    } else {
      for (const tool of toolsResult.tools) {
        console.log(`  - ${tool.name}: ${tool.description}`);
      }
    }
  } catch (error) {
    console.log(`Tools not supported by this server (${error})`);
  }
}

async function callTool(name: string, args: Record<string, unknown>): Promise<void> {
  if (!client) {
    console.log('Not connected to server.');
    return;
  }

  try {
    const request: CallToolRequest = {
      method: 'tools/call',
      params: {
        name,
        arguments: args
      }
    };

    console.log(`Calling tool '${name}' with args:`, args);
    const onLastEventIdUpdate = (event: string) => {
      notificationsToolLastEventId = event;
    };
    const result = await client.request(request, CallToolResultSchema, {
      resumptionToken: notificationsToolLastEventId, onresumptiontoken: onLastEventIdUpdate
    });

    console.log('Tool result:');
    result.content.forEach(item => {
      if (item.type === 'text') {
        console.log(`  ${item.text}`);
      } else {
        console.log(`  ${item.type} content:`, item);
      }
    });
  } catch (error) {
    console.log(`Error calling tool ${name}: ${error}`);
  }
}

async function callGreetTool(name: string): Promise<void> {
  await callTool('greet', { name });
}

async function callMultiGreetTool(name: string): Promise<void> {
  console.log('Calling multi-greet tool with notifications...');
  await callTool('multi-greet', { name });
}

async function startNotifications(interval: number, count: number): Promise<void> {
  console.log(`Starting notification stream: interval=${interval}ms, count=${count || 'unlimited'}`);
  await callTool('start-notification-stream', { interval, count });
}

async function listPrompts(): Promise<void> {
  if (!client) {
    console.log('Not connected to server.');
    return;
  }

  try {
    const promptsRequest: ListPromptsRequest = {
      method: 'prompts/list',
      params: {}
    };
    const promptsResult = await client.request(promptsRequest, ListPromptsResultSchema);
    console.log('Available prompts:');
    if (promptsResult.prompts.length === 0) {
      console.log('  No prompts available');
    } else {
      for (const prompt of promptsResult.prompts) {
        console.log(`  - ${prompt.name}: ${prompt.description}`);
      }
    }
  } catch (error) {
    console.log(`Prompts not supported by this server (${error})`);
  }
}

async function getPrompt(name: string, args: Record<string, unknown>): Promise<void> {
  if (!client) {
    console.log('Not connected to server.');
    return;
  }

  try {
    const promptRequest: GetPromptRequest = {
      method: 'prompts/get',
      params: {
        name,
        arguments: args as Record<string, string>
      }
    };

    const promptResult = await client.request(promptRequest, GetPromptResultSchema);
    console.log('Prompt template:');
    promptResult.messages.forEach((msg, index) => {
      console.log(`  [${index + 1}] ${msg.role}: ${msg.content.text}`);
    });
  } catch (error) {
    console.log(`Error getting prompt ${name}: ${error}`);
  }
}

async function listResources(): Promise<void> {
  if (!client) {
    console.log('Not connected to server.');
    return;
  }

  try {
    const resourcesRequest: ListResourcesRequest = {
      method: 'resources/list',
      params: {}
    };
    const resourcesResult = await client.request(resourcesRequest, ListResourcesResultSchema);

    console.log('Available resources:');
    if (resourcesResult.resources.length === 0) {
      console.log('  No resources available');
    } else {
      for (const resource of resourcesResult.resources) {
        console.log(`  - ${resource.name}: ${resource.uri}`);
      }
    }
  } catch (error) {
    console.log(`Resources not supported by this server (${error})`);
  }
}

async function cleanup(): Promise<void> {
  if (client && transport) {
    try {
      // First try to terminate the session gracefully
      if (transport.sessionId) {
        try {
          console.log('Terminating session before exit...');
          await transport.terminateSession();
          console.log('Session terminated successfully');
        } catch (error) {
          console.error('Error terminating session:', error);
        }
      }
      
      // Then close the transport
      await transport.close();
    } catch (error) {
      console.error('Error closing transport:', error);
    }
  }

  process.stdin.setRawMode(false);
  readline.close();
  console.log('\nGoodbye!');
  process.exit(0);
}

// Set up raw mode for keyboard input to capture Escape key
process.stdin.setRawMode(true);
process.stdin.on('data', async (data) => {
  // Check for Escape key (27)
  if (data.length === 1 && data[0] === 27) {
    console.log('\nESC key pressed. Disconnecting from server...');

    // Abort current operation and disconnect from server
    if (client && transport) {
      await disconnect();
      console.log('Disconnected. Press Enter to continue.');
    } else {
      console.log('Not connected to server.');
    }

    // Re-display the prompt
    process.stdout.write('> ');
  }
});

// Handle Ctrl+C
process.on('SIGINT', async () => {
  console.log('\nReceived SIGINT. Cleaning up...');
  await cleanup();
});

// Start the interactive client
main().catch((error: unknown) => {
  console.error('Error running MCP client:', error);
  process.exit(1);
});


================================================
FILE: src/examples/client/streamableHttpWithSseFallbackClient.ts
================================================
import { Client } from '../../client/index.js';
import { StreamableHTTPClientTransport } from '../../client/streamableHttp.js';
import { SSEClientTransport } from '../../client/sse.js';
import {
  ListToolsRequest,
  ListToolsResultSchema,
  CallToolRequest,
  CallToolResultSchema,
  LoggingMessageNotificationSchema,
} from '../../types.js';

/**
 * Simplified Backwards Compatible MCP Client
 * 
 * This client demonstrates backward compatibility with both:
 * 1. Modern servers using Streamable HTTP transport (protocol version 2025-03-26)
 * 2. Older servers using HTTP+SSE transport (protocol version 2024-11-05)
 * 
 * Following the MCP specification for backwards compatibility:
 * - Attempts to POST an initialize request to the server URL first (modern transport)
 * - If that fails with 4xx status, falls back to GET request for SSE stream (older transport)
 */

// Command line args processing
const args = process.argv.slice(2);
const serverUrl = args[0] || 'http://localhost:3000/mcp';

async function main(): Promise<void> {
  console.log('MCP Backwards Compatible Client');
  console.log('===============================');
  console.log(`Connecting to server at: ${serverUrl}`);

  let client: Client;
  let transport: StreamableHTTPClientTransport | SSEClientTransport;

  try {
    // Try connecting with automatic transport detection
    const connection = await connectWithBackwardsCompatibility(serverUrl);
    client = connection.client;
    transport = connection.transport;

    // Set up notification handler
    client.setNotificationHandler(LoggingMessageNotificationSchema, (notification) => {
      console.log(`Notification: ${notification.params.level} - ${notification.params.data}`);
    });

    // DEMO WORKFLOW:
    // 1. List available tools
    console.log('\n=== Listing Available Tools ===');
    await listTools(client);

    // 2. Call the notification tool
    console.log('\n=== Starting Notification Stream ===');
    await startNotificationTool(client);

    // 3. Wait for all notifications (5 seconds)
    console.log('\n=== Waiting for all notifications ===');
    await new Promise(resolve => setTimeout(resolve, 5000));

    // 4. Disconnect
    console.log('\n=== Disconnecting ===');
    await transport.close();
    console.log('Disconnected from MCP server');

  } catch (error) {
    console.error('Error running client:', error);
    process.exit(1);
  }
}

/**
 * Connect to an MCP server with backwards compatibility
 * Following the spec for client backward compatibility
 */
async function connectWithBackwardsCompatibility(url: string): Promise<{
  client: Client,
  transport: StreamableHTTPClientTransport | SSEClientTransport,
  transportType: 'streamable-http' | 'sse'
}> {
  console.log('1. Trying Streamable HTTP transport first...');

  // Step 1: Try Streamable HTTP transport first
  const client = new Client({
    name: 'backwards-compatible-client',
    version: '1.0.0'
  });

  client.onerror = (error) => {
    console.error('Client error:', error);
  };
  const baseUrl = new URL(url);

  try {
    // Create modern transport
    const streamableTransport = new StreamableHTTPClientTransport(baseUrl);
    await client.connect(streamableTransport);

    console.log('Successfully connected using modern Streamable HTTP transport.');
    return {
      client,
      transport: streamableTransport,
      transportType: 'streamable-http'
    };
  } catch (error) {
    // Step 2: If transport fails, try the older SSE transport
    console.log(`StreamableHttp transport connection failed: ${error}`);
    console.log('2. Falling back to deprecated HTTP+SSE transport...');

    try {
      // Create SSE transport pointing to /sse endpoint
      const sseTransport = new SSEClientTransport(baseUrl);
      const sseClient = new Client({
        name: 'backwards-compatible-client',
        version: '1.0.0'
      });
      await sseClient.connect(sseTransport);

      console.log('Successfully connected using deprecated HTTP+SSE transport.');
      return {
        client: sseClient,
        transport: sseTransport,
        transportType: 'sse'
      };
    } catch (sseError) {
      console.error(`Failed to connect with either transport method:\n1. Streamable HTTP error: ${error}\n2. SSE error: ${sseError}`);
      throw new Error('Could not connect to server with any available transport');
    }
  }
}

/**
 * List available tools on the server
 */
async function listTools(client: Client): Promise<void> {
  try {
    const toolsRequest: ListToolsRequest = {
      method: 'tools/list',
      params: {}
    };
    const toolsResult = await client.request(toolsRequest, ListToolsResultSchema);

    console.log('Available tools:');
    if (toolsResult.tools.length === 0) {
      console.log('  No tools available');
    } else {
      for (const tool of toolsResult.tools) {
        console.log(`  - ${tool.name}: ${tool.description}`);
      }
    }
  } catch (error) {
    console.log(`Tools not supported by this server: ${error}`);
  }
}

/**
 * Start a notification stream by calling the notification tool
 */
async function startNotificationTool(client: Client): Promise<void> {
  try {
    // Call the notification tool using reasonable defaults
    const request: CallToolRequest = {
      method: 'tools/call',
      params: {
        name: 'start-notification-stream',
        arguments: {
          interval: 1000, // 1 second between notifications
          count: 5       // Send 5 notifications
        }
      }
    };

    console.log('Calling notification tool...');
    const result = await client.request(request, CallToolResultSchema);

    console.log('Tool result:');
    result.content.forEach(item => {
      if (item.type === 'text') {
        console.log(`  ${item.text}`);
      } else {
        console.log(`  ${item.type} content:`, item);
      }
    });
  } catch (error) {
    console.log(`Error calling notification tool: ${error}`);
  }
}

// Start the client
main().catch((error: unknown) => {
  console.error('Error running MCP client:', error);
  process.exit(1);
});


================================================
FILE: src/examples/server/jsonResponseStreamableHttp.ts
================================================
import express, { Request, Response } from 'express';
import { randomUUID } from 'node:crypto';
import { McpServer } from '../../server/mcp.js';
import { StreamableHTTPServerTransport } from '../../server/streamableHttp.js';
import { z } from 'zod';
import { CallToolResult, isInitializeRequest } from '../../types.js';


// Create an MCP server with implementation details
const getServer = () => {
  const server = new McpServer({
    name: 'json-response-streamable-http-server',
    version: '1.0.0',
  }, {
    capabilities: {
      logging: {},
    }
  });

  // Register a simple tool that returns a greeting
  server.tool(
    'greet',
    'A simple greeting tool',
    {
      name: z.string().describe('Name to greet'),
    },
    async ({ name }): Promise<CallToolResult> => {
      return {
        content: [
          {
            type: 'text',
            text: `Hello, ${name}!`,
          },
        ],
      };
    }
  );

  // Register a tool that sends multiple greetings with notifications
  server.tool(
    'multi-greet',
    'A tool that sends different greetings with delays between them',
    {
      name: z.string().describe('Name to greet'),
    },
    async ({ name }, { sendNotification }): Promise<CallToolResult> => {
      const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

      await sendNotification({
        method: "notifications/message",
        params: { level: "debug", data: `Starting multi-greet for ${name}` }
      });

      await sleep(1000); // Wait 1 second before first greeting

      await sendNotification({
        method: "notifications/message",
        params: { level: "info", data: `Sending first greeting to ${name}` }
      });

      await sleep(1000); // Wait another second before second greeting

      await sendNotification({
        method: "notifications/message",
        params: { level: "info", data: `Sending second greeting to ${name}` }
      });

      return {
        content: [
          {
            type: 'text',
            text: `Good morning, ${name}!`,
          }
        ],
      };
    }
  );
  return server;
}

const app = express();
app.use(express.json());

// Map to store transports by session ID
const transports: { [sessionId: string]: StreamableHTTPServerTransport } = {};

app.post('/mcp', async (req: Request, res: Response) => {
  console.log('Received MCP request:', req.body);
  try {
    // Check for existing session ID
    const sessionId = req.headers['mcp-session-id'] as string | undefined;
    let transport: StreamableHTTPServerTransport;

    if (sessionId && transports[sessionId]) {
      // Reuse existing transport
      transport = transports[sessionId];
    } else if (!sessionId && isInitializeRequest(req.body)) {
      // New initialization request - use JSON response mode
      transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: () => randomUUID(),
        enableJsonResponse: true, // Enable JSON response mode
        onsessioninitialized: (sessionId) => {
          // Store the transport by session ID when session is initialized
          // This avoids race conditions where requests might come in before the session is stored
          console.log(`Session initialized with ID: ${sessionId}`);
          transports[sessionId] = transport;
        }
      });

      // Connect the transport to the MCP server BEFORE handling the request
      const server = getServer();
      await server.connect(transport);
      await transport.handleRequest(req, res, req.body);
      return; // Already handled
    } else {
      // Invalid request - no session ID or not initialization request
      res.status(400).json({
        jsonrpc: '2.0',
        error: {
          code: -32000,
          message: 'Bad Request: No valid session ID provided',
        },
        id: null,
      });
      return;
    }

    // Handle the request with existing transport - no need to reconnect
    await transport.handleRequest(req, res, req.body);
  } catch (error) {
    console.error('Error handling MCP request:', error);
    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: '2.0',
        error: {
          code: -32603,
          message: 'Internal server error',
        },
        id: null,
      });
    }
  }
});

// Handle GET requests for SSE streams according to spec
app.get('/mcp', async (req: Request, res: Response) => {
  // Since this is a very simple example, we don't support GET requests for this server
  // The spec requires returning 405 Method Not Allowed in this case
  res.status(405).set('Allow', 'POST').send('Method Not Allowed');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`MCP Streamable HTTP Server listening on port ${PORT}`);
});

// Handle server shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down server...');
  process.exit(0);
});


================================================
FILE: src/examples/server/simpleSseServer.ts
================================================
import express, { Request, Response } from 'express';
import { McpServer } from '../../server/mcp.js';
import { SSEServerTransport } from '../../server/sse.js';
import { z } from 'zod';
import { CallToolResult } from '../../types.js';

/**
 * This example server demonstrates the deprecated HTTP+SSE transport 
 * (protocol version 2024-11-05). It mainly used for testing backward compatible clients.
 * 
 * The server exposes two endpoints:
 * - /mcp: For establishing the SSE stream (GET)
 * - /messages: For receiving client messages (POST)
 * 
 */

// Create an MCP server instance
const getServer = () => {
  const server = new McpServer({
    name: 'simple-sse-server',
    version: '1.0.0',
  }, { capabilities: { logging: {} } });

  server.tool(
    'start-notification-stream',
    'Starts sending periodic notifications',
    {
      interval: z.number().describe('Interval in milliseconds between notifications').default(1000),
      count: z.number().describe('Number of notifications to send').default(10),
    },
    async ({ interval, count }, { sendNotification }): Promise<CallToolResult> => {
      const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
      let counter = 0;

      // Send the initial notification
      await sendNotification({
        method: "notifications/message",
        params: {
          level: "info",
          data: `Starting notification stream with ${count} messages every ${interval}ms`
        }
      });

      // Send periodic notifications
      while (counter < count) {
        counter++;
        await sleep(interval);

        try {
          await sendNotification({
            method: "notifications/message",
            params: {
              level: "info",
              data: `Notification #${counter} at ${new Date().toISOString()}`
            }
          });
        }
        catch (error) {
          console.error("Error sending notification:", error);
        }
      }

      return {
        content: [
          {
            type: 'text',
            text: `Completed sending ${count} notifications every ${interval}ms`,
          }
        ],
      };
    }
  );
  return server;
};

const app = express();
app.use(express.json());

// Store transports by session ID
const transports: Record<string, SSEServerTransport> = {};

// SSE endpoint for establishing the stream
app.get('/mcp', async (req: Request, res: Response) => {
  console.log('Received GET request to /sse (establishing SSE stream)');

  try {
    // Create a new SSE transport for the client
    // The endpoint for POST messages is '/messages'
    const transport = new SSEServerTransport('/messages', res);

    // Store the transport by session ID
    const sessionId = transport.sessionId;
    transports[sessionId] = transport;

    // Set up onclose handler to clean up transport when closed
    transport.onclose = () => {
      console.log(`SSE transport closed for session ${sessionId}`);
      delete transports[sessionId];
    };

    // Connect the transport to the MCP server
    const server = getServer();
    await server.connect(transport);

    console.log(`Established SSE stream with session ID: ${sessionId}`);
  } catch (error) {
    console.error('Error establishing SSE stream:', error);
    if (!res.headersSent) {
      res.status(500).send('Error establishing SSE stream');
    }
  }
});

// Messages endpoint for receiving client JSON-RPC requests
app.post('/messages', async (req: Request, res: Response) => {
  console.log('Received POST request to /messages');

  // Extract session ID from URL query parameter
  // In the SSE protocol, this is added by the client based on the endpoint event
  const sessionId = req.query.sessionId as string | undefined;

  if (!sessionId) {
    console.error('No session ID provided in request URL');
    res.status(400).send('Missing sessionId parameter');
    return;
  }

  const transport = transports[sessionId];
  if (!transport) {
    console.error(`No active transport found for session ID: ${sessionId}`);
    res.status(404).send('Session not found');
    return;
  }

  try {
    // Handle the POST message with the transport
    await transport.handlePostMessage(req, res, req.body);
  } catch (error) {
    console.error('Error handling request:', error);
    if (!res.headersSent) {
      res.status(500).send('Error handling request');
    }
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Simple SSE Server (deprecated protocol version 2024-11-05) listening on port ${PORT}`);
});

// Handle server shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down server...');

  // Close all active transports to properly clean up resources
  for (const sessionId in transports) {
    try {
      console.log(`Closing transport for session ${sessionId}`);
      await transports[sessionId].close();
      delete transports[sessionId];
    } catch (error) {
      console.error(`Error closing transport for session ${sessionId}:`, error);
    }
  }
  console.log('Server shutdown complete');
  process.exit(0);
});


================================================
FILE: src/examples/server/simpleStatelessStreamableHttp.ts
================================================
import express, { Request, Response } from 'express';
import { McpServer } from '../../server/mcp.js';
import { StreamableHTTPServerTransport } from '../../server/streamableHttp.js';
import { z } from 'zod';
import { CallToolResult, GetPromptResult, ReadResourceResult } from '../../types.js';

const getServer = () => {
  // Create an MCP server with implementation details
  const server = new McpServer({
    name: 'stateless-streamable-http-server',
    version: '1.0.0',
  }, { capabilities: { logging: {} } });

  // Register a simple prompt
  server.prompt(
    'greeting-template',
    'A simple greeting prompt template',
    {
      name: z.string().describe('Name to include in greeting'),
    },
    async ({ name }): Promise<GetPromptResult> => {
      return {
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: `Please greet ${name} in a friendly manner.`,
            },
          },
        ],
      };
    }
  );

  // Register a tool specifically for testing resumability
  server.tool(
    'start-notification-stream',
    'Starts sending periodic notifications for testing resumability',
    {
      interval: z.number().describe('Interval in milliseconds between notifications').default(100),
      count: z.number().describe('Number of notifications to send (0 for 100)').default(10),
    },
    async ({ interval, count }, { sendNotification }): Promise<CallToolResult> => {
      const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
      let counter = 0;

      while (count === 0 || counter < count) {
        counter++;
        try {
          await sendNotification({
            method: "notifications/message",
            params: {
              level: "info",
              data: `Periodic notification #${counter} at ${new Date().toISOString()}`
            }
          });
        }
        catch (error) {
          console.error("Error sending notification:", error);
        }
        // Wait for the specified interval
        await sleep(interval);
      }

      return {
        content: [
          {
            type: 'text',
            text: `Started sending periodic notifications every ${interval}ms`,
          }
        ],
      };
    }
  );

  // Create a simple resource at a fixed URI
  server.resource(
    'greeting-resource',
    'https://example.com/greetings/default',
    { mimeType: 'text/plain' },
    async (): Promise<ReadResourceResult> => {
      return {
        contents: [
          {
            uri: 'https://example.com/greetings/default',
            text: 'Hello, world!',
          },
        ],
      };
    }
  );
  return server;
}

const app = express();
app.use(express.json());

app.post('/mcp', async (req: Request, res: Response) => {
  const server = getServer();
  try {
    const transport: StreamableHTTPServerTransport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
    });
    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
    res.on('close', () => {
      console.log('Request closed');
      transport.close();
      server.close();
    });
  } catch (error) {
    console.error('Error handling MCP request:', error);
    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: '2.0',
        error: {
          code: -32603,
          message: 'Internal server error',
        },
        id: null,
      });
    }
  }
});

app.get('/mcp', async (req: Request, res: Response) => {
  console.log('Received GET MCP request');
  res.writeHead(405).end(JSON.stringify({
    jsonrpc: "2.0",
    error: {
      code: -32000,
      message: "Method not allowed."
    },
    id: null
  }));
});

app.delete('/mcp', async (req: Request, res: Response) => {
  console.log('Received DELETE MCP request');
  res.writeHead(405).end(JSON.stringify({
    jsonrpc: "2.0",
    error: {
      code: -32000,
      message: "Method not allowed."
    },
    id: null
  }));
});


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`MCP Stateless Streamable HTTP Server listening on port ${PORT}`);
});

// Handle server shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down server...');
  process.exit(0);
});


================================================
FILE: src/examples/server/simpleStreamableHttp.ts
================================================
import express, { Request, Response } from 'express';
import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import { McpServer } from '../../server/mcp.js';
import { StreamableHTTPServerTransport } from '../../server/streamableHttp.js';
import { CallToolResult, GetPromptResult, isInitializeRequest, ReadResourceResult } from '../../types.js';
import { InMemoryEventStore } from '../shared/inMemoryEventStore.js';

// Create an MCP server with implementation details
const getServer = () => {
  const server = new McpServer({
    name: 'simple-streamable-http-server',
    version: '1.0.0',
  }, { capabilities: { logging: {} } });

  // Register a simple tool that returns a greeting
  server.tool(
    'greet',
    'A simple greeting tool',
    {
      name: z.string().describe('Name to greet'),
    },
    async ({ name }): Promise<CallToolResult> => {
      return {
        content: [
          {
            type: 'text',
            text: `Hello, ${name}!`,
          },
        ],
      };
    }
  );

  // Register a tool that sends multiple greetings with notifications (with annotations)
  server.tool(
    'multi-greet',
    'A tool that sends different greetings with delays between them',
    {
      name: z.string().describe('Name to greet'),
    },
    {
      title: 'Multiple Greeting Tool', 
      readOnlyHint: true,
      openWorldHint: false
    },
    async ({ name }, { sendNotification }): Promise<CallToolResult> => {
      const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

      await sendNotification({
        method: "notifications/message",
        params: { level: "debug", data: `Starting multi-greet for ${name}` }
      });

      await sleep(1000); // Wait 1 second before first greeting

      await sendNotification({
        method: "notifications/message",
        params: { level: "info", data: `Sending first greeting to ${name}` }
      });

      await sleep(1000); // Wait another second before second greeting

      await sendNotification({
        method: "notifications/message",
        params: { level: "info", data: `Sending second greeting to ${name}` }
      });

      return {
        content: [
          {
            type: 'text',
            text: `Good morning, ${name}!`,
          }
        ],
      };
    }
  );

  // Register a simple prompt
  server.prompt(
    'greeting-template',
    'A simple greeting prompt template',
    {
      name: z.string().describe('Name to include in greeting'),
    },
    async ({ name }): Promise<GetPromptResult> => {
      return {
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: `Please greet ${name} in a friendly manner.`,
            },
          },
        ],
      };
    }
  );

  // Register a tool specifically for testing resumability
  server.tool(
    'start-notification-stream',
    'Starts sending periodic notifications for testing resumability',
    {
      interval: z.number().describe('Interval in milliseconds between notifications').default(100),
      count: z.number().describe('Number of notifications to send (0 for 100)').default(50),
    },
    async ({ interval, count }, { sendNotification }): Promise<CallToolResult> => {
      const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
      let counter = 0;

      while (count === 0 || counter < count) {
        counter++;
        try {
          await sendNotification({
            method: "notifications/message",
            params: {
              level: "info",
              data: `Periodic notification #${counter} at ${new Date().toISOString()}`
            }
          });
        }
        catch (error) {
          console.error("Error sending notification:", error);
        }
        // Wait for the specified interval
        await sleep(interval);
      }

      return {
        content: [
          {
            type: 'text',
            text: `Started sending periodic notifications every ${interval}ms`,
          }
        ],
      };
    }
  );

  // Create a simple resource at a fixed URI
  server.resource(
    'greeting-resource',
    'https://example.com/greetings/default',
    { mimeType: 'text/plain' },
    async (): Promise<ReadResourceResult> => {
      return {
        contents: [
          {
            uri: 'https://example.com/greetings/default',
            text: 'Hello, world!',
          },
        ],
      };
    }
  );
  return server;
};

const app = express();
app.use(express.json());

// Map to store transports by session ID
const transports: { [sessionId: string]: StreamableHTTPServerTransport } = {};

app.post('/mcp', async (req: Request, res: Response) => {
  console.log('Received MCP request:', req.body);
  try {
    // Check for existing session ID
    const sessionId = req.headers['mcp-session-id'] as string | undefined;
    let transport: StreamableHTTPServerTransport;

    if (sessionId && transports[sessionId]) {
      // Reuse existing transport
      transport = transports[sessionId];
    } else if (!sessionId && isInitializeRequest(req.body)) {
      // New initialization request
      const eventStore = new InMemoryEventStore();
      transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: () => randomUUID(),
        eventStore, // Enable resumability
        onsessioninitialized: (sessionId) => {
          // Store the transport by session ID when session is initialized
          // This avoids race conditions where requests might come in before the session is stored
          console.log(`Session initialized with ID: ${sessionId}`);
          transports[sessionId] = transport;
        }
      });

      // Set up onclose handler to clean up transport when closed
      transport.onclose = () => {
        const sid = transport.sessionId;
        if (sid && transports[sid]) {
          console.log(`Transport closed for session ${sid}, removing from transports map`);
          delete transports[sid];
        }
      };

      // Connect the transport to the MCP server BEFORE handling the request
      // so responses can flow back through the same transport
      const server = getServer();
      await server.connect(transport);

      await transport.handleRequest(req, res, req.body);
      return; // Already handled
    } else {
      // Invalid request - no session ID or not initialization request
      res.status(400).json({
        jsonrpc: '2.0',
        error: {
          code: -32000,
          message: 'Bad Request: No valid session ID provided',
        },
        id: null,
      });
      return;
    }

    // Handle the request with existing transport - no need to reconnect
    // The existing transport is already connected to the server
    await transport.handleRequest(req, res, req.body);
  } catch (error) {
    console.error('Error handling MCP request:', error);
    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: '2.0',
        error: {
          code: -32603,
          message: 'Internal server error',
        },
        id: null,
      });
    }
  }
});

// Handle GET requests for SSE streams (using built-in support from StreamableHTTP)
app.get('/mcp', async (req: Request, res: Response) => {
  const sessionId = req.headers['mcp-session-id'] as string | undefined;
  if (!sessionId || !transports[sessionId]) {
    res.status(400).send('Invalid or missing session ID');
    return;
  }

  // Check for Last-Event-ID header for resumability
  const lastEventId = req.headers['last-event-id'] as string | undefined;
  if (lastEventId) {
    console.log(`Client reconnecting with Last-Event-ID: ${lastEventId}`);
  } else {
    console.log(`Establishing new SSE stream for session ${sessionId}`);
  }

  const transport = transports[sessionId];
  await transport.handleRequest(req, res);
});

// Handle DELETE requests for session termination (according to MCP spec)
app.delete('/mcp', async (req: Request, res: Response) => {
  const sessionId = req.headers['mcp-session-id'] as string | undefined;
  if (!sessionId || !transports[sessionId]) {
    res.status(400).send('Invalid or missing session ID');
    return;
  }

  console.log(`Received session termination request for session ${sessionId}`);

  try {
    const transport = transports[sessionId];
    await transport.handleRequest(req, res);
  } catch (error) {
    console.error('Error handling session termination:', error);
    if (!res.headersSent) {
      res.status(500).send('Error processing session termination');
    }
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`MCP Streamable HTTP Server listening on port ${PORT}`);
});

// Handle server shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down server...');

  // Close all active transports to properly clean up resources
  for (const sessionId in transports) {
    try {
      console.log(`Closing transport for session ${sessionId}`);
      await transports[sessionId].close();
      delete transports[sessionId];
    } catch (error) {
      console.error(`Error closing transport for session ${sessionId}:`, error);
    }
  }
  console.log('Server shutdown complete');
  process.exit(0);
});



================================================
FILE: src/examples/server/sseAndStreamableHttpCompatibleServer.ts
================================================
import express, { Request, Response } from 'express';
import { randomUUID } from "node:crypto";
import { McpServer } from '../../server/mcp.js';
import { StreamableHTTPServerTransport } from '../../server/streamableHttp.js';
import { SSEServerTransport } from '../../server/sse.js';
import { z } from 'zod';
import { CallToolResult, isInitializeRequest } from '../../types.js';
import { InMemoryEventStore } from '../shared/inMemoryEventStore.js';

/**
 * This example server demonstrates backwards compatibility with both:
 * 1. The deprecated HTTP+SSE transport (protocol version 2024-11-05)
 * 2. The Streamable HTTP transport (protocol version 2025-03-26)
 * 
 * It maintains a single MCP server instance but exposes two transport options:
 * - /mcp: The new Streamable HTTP endpoint (supports GET/POST/DELETE)
 * - /sse: The deprecated SSE endpoint for older clients (GET to establish stream)
 * - /messages: The deprecated POST endpoint for older clients (POST to send messages)
 */

const getServer = () => {
  const server = new McpServer({
    name: 'backwards-compatible-server',
    version: '1.0.0',
  }, { capabilities: { logging: {} } });

  // Register a simple tool that sends notifications over time
  server.tool(
    'start-notification-stream',
    'Starts sending periodic notifications for testing resumability',
    {
      interval: z.number().describe('Interval in milliseconds between notifications').default(100),
      count: z.number().describe('Number of notifications to send (0 for 100)').default(50),
    },
    async ({ interval, count }, { sendNotification }): Promise<CallToolResult> => {
      const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
      let counter = 0;

      while (count === 0 || counter < count) {
        counter++;
        try {
          await sendNotification({
            method: "notifications/message",
            params: {
              level: "info",
              data: `Periodic notification #${counter} at ${new Date().toISOString()}`
            }
          });
        }
        catch (error) {
          console.error("Error sending notification:", error);
        }
        // Wait for the specified interval
        await sleep(interval);
      }

      return {
        content: [
          {
            type: 'text',
            text: `Started sending periodic notifications every ${interval}ms`,
          }
        ],
      };
    }
  );
  return server;
};

// Create Express application
const app = express();
app.use(express.json());

// Store transports by session ID
const transports: Record<string, StreamableHTTPServerTransport | SSEServerTransport> = {};

//=============================================================================
// STREAMABLE HTTP TRANSPORT (PROTOCOL VERSION 2025-03-26)
//=============================================================================

// Handle all MCP Streamable HTTP requests (GET, POST, DELETE) on a single endpoint
app.all('/mcp', async (req: Request, res: Response) => {
  console.log(`Received ${req.method} request to /mcp`);

  try {
    // Check for existing session ID
    const sessionId = req.headers['mcp-session-id'] as string | undefined;
    let transport: StreamableHTTPServerTransport;

    if (sessionId && transports[sessionId]) {
      // Check if the transport is of the correct type
      const existingTransport = transports[sessionId];
      if (existingTransport instanceof StreamableHTTPServerTransport) {
        // Reuse existing transport
        transport = existingTransport;
      } else {
        // Transport exists but is not a StreamableHTTPServerTransport (could be SSEServerTransport)
        res.status(400).json({
          jsonrpc: '2.0',
          error: {
            code: -32000,
            message: 'Bad Request: Session exists but uses a different transport protocol',
          },
          id: null,
        });
        return;
      }
    } else if (!sessionId && req.method === 'POST' && isInitializeRequest(req.body)) {
      const eventStore = new InMemoryEventStore();
      transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: () => randomUUID(),
        eventStore, // Enable resumability
        onsessioninitialized: (sessionId) => {
          // Store the transport by session ID when session is initialized
          console.log(`StreamableHTTP session initialized with ID: ${sessionId}`);
          transports[sessionId] = transport;
        }
      });

      // Set up onclose handler to clean up transport when closed
      transport.onclose = () => {
        const sid = transport.sessionId;
        if (sid && transports[sid]) {
          console.log(`Transport closed for session ${sid}, removing from transports map`);
          delete transports[sid];
        }
      };

      // Connect the transport to the MCP server
      const server = getServer();
      await server.connect(transport);
    } else {
      // Invalid request - no session ID or not initialization request
      res.status(400).json({
        jsonrpc: '2.0',
        error: {
          code: -32000,
          message: 'Bad Request: No valid session ID provided',
        },
        id: null,
      });
      return;
    }

    // Handle the request with the transport
    await transport.handleRequest(req, res, req.body);
  } catch (error) {
    console.error('Error handling MCP request:', error);
    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: '2.0',
        error: {
          code: -32603,
          message: 'Internal server error',
        },
        id: null,
      });
    }
  }
});

//=============================================================================
// DEPRECATED HTTP+SSE TRANSPORT (PROTOCOL VERSION 2024-11-05)
//=============================================================================

app.get('/sse', async (req: Request, res: Response) => {
  console.log('Received GET request to /sse (deprecated SSE transport)');
  const transport = new SSEServerTransport('/messages', res);
  transports[transport.sessionId] = transport;
  res.on("close", () => {
    delete transports[transport.sessionId];
  });
  const server = getServer();
  await server.connect(transport);
});

app.post("/messages", async (req: Request, res: Response) => {
  const sessionId = req.query.sessionId as string;
  let transport: SSEServerTransport;
  const existingTransport = transports[sessionId];
  if (existingTransport instanceof SSEServerTransport) {
    // Reuse existing transport
    transport = existingTransport;
  } else {
    // Transport exists but is not a SSEServerTransport (could be StreamableHTTPServerTransport)
    res.status(400).json({
      jsonrpc: '2.0',
      error: {
        code: -32000,
        message: 'Bad Request: Session exists but uses a different transport protocol',
      },
      id: null,
    });
    return;
  }
  if (transport) {
    await transport.handlePostMessage(req, res, req.body);
  } else {
    res.status(400).send('No transport found for sessionId');
  }
});


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backwards compatible MCP server listening on port ${PORT}`);
  console.log(`
==============================================
SUPPORTED TRANSPORT OPTIONS:

1. Streamable Http(Protocol version: