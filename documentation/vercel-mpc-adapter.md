Directory structure:
└── mcp-adapter/
    ├── README.md
    ├── CHANGELOG.md
    ├── package.json
    ├── tsconfig.json
    ├── tsup.config.ts
    ├── .gitignore
    ├── example/
    │   └── route.ts
    └── src/
        ├── index.ts
        └── next/
            ├── index.ts
            ├── mcp-api-handler.ts
            └── server-response-adapter.ts


Files Content:

================================================
FILE: packages/mcp-adapter/README.md
================================================
# @vercel/mcp-adapter

A Vercel adapter for the Model Context Protocol (MCP), enabling real-time communication between your applications and AI models. Currently supports Next.js with more framework adapters coming soon.

## Installation

```bash
npm install @vercel/mcp-adapter
# or
yarn add @vercel/mcp-adapter
# or
pnpm add @vercel/mcp-adapter
```

## Next.js Usage

1. Create an API route for MCP communication:

```typescript
// app/api/[transport]/route.ts
import { createMcpHandler } from '@vercel/mcp-adapter';
const handler = createMcpHandler(
  server => {
    server.tool(
      'roll_dice',
      'Rolls an N-sided die',
      { sides: z.number().int().min(2) },
      async ({ sides }) => {
        const value = 1 + Math.floor(Math.random() * sides);
        return {
          content: [{ type: 'text', text: `🎲 You rolled a ${value}!` }],
        };
      }
    );
  },
  {
    // Optional server options
  },
  {
    // Optional configuration
    redisUrl: process.env.REDIS_URL,
    // The endpoint path that that the createMcpHandler is hosted on
    // If /api/[transport]/route.ts, then /api/mcp
    streamableHttpEndpoint: '/api/mcp',
    sseEndpoint: '/api/sse',
    sseMessageEndpoint: '/api/message',
    maxDuration: 60,
    verboseLogs: true,
  }
);
export { handler as GET, handler as POST };
```

2. Use the MCP client in your application:

```typescript
// app/components/YourComponent.tsx
import { McpClient } from '@modelcontextprotocol/sdk/client';

const client = new McpClient({
  transport: new SSEClientTransport('/api/sse'),
});

// Use the client to make requests
const result = await client.request('yourMethod', { param: 'value' });
```

## Configuration Options

The `initializeMcpApiHandler` function accepts the following configuration options:

```typescript
interface Config {
  redisUrl?: string; // Redis connection URL for pub/sub
  streamableHttpEndpoint?: string; // Endpoint for streamable HTTP transport
  sseEndpoint?: string; // Endpoint for SSE transport
  sseMessageEndpoint?: string; // Endpoint for SSE message transport
  maxDuration?: number; // Maximum duration for SSE connections in seconds
}
```

## Features

- **Framework Support**: Currently supports Next.js with more framework adapters coming soon
- **Multiple Transport Options**: Supports both Streamable HTTP and Server-Sent Events (SSE) transports
- **Redis Integration**: For SSE transport resumability
- **TypeScript Support**: Full TypeScript support with type definitions

## Requirements

- Next.js 13 or later (for Next.js adapter)
- Node.js 18 or later
- Redis (optional, for SSE transport)

## License

MIT



================================================
FILE: packages/mcp-adapter/CHANGELOG.md
================================================
# @vercel/mcp-adapter

## 0.2.4

### Patch Changes

- update readme with consistent docs ([#13309](https://github.com/vercel/vercel/pull/13309))

- Fix message endpoint not being settable ([#13311](https://github.com/vercel/vercel/pull/13311))

## 0.2.3

### Patch Changes

- Update readme and example ([#13307](https://github.com/vercel/vercel/pull/13307))

## 0.2.2

### Patch Changes

- Correct file output ([#13305](https://github.com/vercel/vercel/pull/13305))

## 0.2.1

### Patch Changes

- add in repository to readme and fix up example ([#13298](https://github.com/vercel/vercel/pull/13298))

## 0.2.0

### Minor Changes

- Publish initial version of mcp adapter ([#13290](https://github.com/vercel/vercel/pull/13290))

### Patch Changes

- make package public and fix default args passed in ([#13294](https://github.com/vercel/vercel/pull/13294))



================================================
FILE: packages/mcp-adapter/package.json
================================================
{
  "name": "@vercel/mcp-adapter",
  "version": "0.2.4",
  "description": "Vercel MCP Adapter for Next.js and other frameworks",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.js"
    },
    "./next": {
      "types": "./dist/next/index.d.ts",
      "import": "./dist/next/index.js",
      "require": "./dist/next/index.js"
    }
  },
  "files": [
    "dist"
  ],
  "repository": {
    "directory": "packages/mcp-adapter",
    "type": "git",
    "url": "git+https://github.com/vercel/vercel.git"
  },
  "bugs": {
    "url": "https://github.com/vercel/vercel/issues"
  },
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
    "test": "jest"
  },
  "keywords": [
    "mcp",
    "vercel",
    "next.js",
    "ai"
  ],
  "author": "Vercel",
  "license": "Apache-2.0",
  "dependencies": {},
  "devDependencies": {
    "@types/node": "^22.15.8",
    "tsup": "^8.0.0",
    "typescript": "^5.0.0"
  },
  "peerDependencies": {
    "next": ">=13.0.0",
    "@modelcontextprotocol/sdk": "^1.10.2",
    "redis": "^4.6.0"
  },
  "packageManager": "pnpm@10.7.0+sha1.66453f13fbf9078d3db193718206a8d738afdbdb",
  "publishConfig": {
    "access": "public"
  }
}



================================================
FILE: packages/mcp-adapter/tsconfig.json
================================================
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "declaration": true,
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.test.ts"]
}



================================================
FILE: packages/mcp-adapter/tsup.config.ts
================================================
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/next/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
});



================================================
FILE: packages/mcp-adapter/.gitignore
================================================
node_modules
dist



================================================
FILE: packages/mcp-adapter/example/route.ts
================================================
import createMcpRouteHandler from '../dist/next/index';

const handler = createMcpRouteHandler(
  server => {
    server.tool('echo', 'Echo a message', {}, async () => {
      return {
        content: [
          {
            type: 'text',
            text: 'Hello, world!',
          },
        ],
      };
    });
  },
  // Optional: Comes from the McpServer.options
  {
    capabilities: {},
  },
  // Optional: Comes from the createMcpRouteHandler config
  {
    streamableHttpEndpoint: '/mcp',
    sseEndpoint: '/sse',
    sseMessageEndpoint: '/message',
    redisUrl: process.env.REDIS_URL,
  }
);

export { handler as GET, handler as POST };



================================================
FILE: packages/mcp-adapter/src/index.ts
================================================
// Re-export the Next.js adapter
export { default as createMcpHandler } from './next';



================================================
FILE: packages/mcp-adapter/src/next/index.ts
================================================
import { type Config, initializeMcpApiHandler } from './mcp-api-handler';
import { createServerResponseAdapter } from './server-response-adapter';
import type { ServerOptions } from '@modelcontextprotocol/sdk/server/index.js';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

/**
 * Creates a MCP handler that can be used to handle MCP requests.
 * @param initializeServer - A function that initializes the MCP server. Use this to access the server instance and register tools, prompts, and resources.
 * @param serverOptions - Options for the MCP server.
 * @param config - Configuration for the MCP handler.
 * @returns A function that can be used to handle MCP requests.
 */
export default function createMcpRouteHandler(
  initializeServer: (server: McpServer) => void,
  serverOptions?: ServerOptions,
  config?: Config
): (request: Request) => Promise<Response> {
  const mcpHandler = initializeMcpApiHandler(
    initializeServer,
    serverOptions,
    config
  );
  return (request: Request) => {
    return createServerResponseAdapter(request.signal, res => {
      mcpHandler(request, res);
    });
  };
}



================================================
FILE: packages/mcp-adapter/src/next/mcp-api-handler.ts
================================================
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import {
  type IncomingHttpHeaders,
  IncomingMessage,
  ServerResponse,
} from 'node:http';
import { createClient } from 'redis';
import { Socket } from 'node:net';
import { Readable } from 'node:stream';
import type { ServerOptions } from '@modelcontextprotocol/sdk/server/index.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import type { BodyType } from './server-response-adapter';
import assert from 'node:assert';

interface SerializedRequest {
  requestId: string;
  url: string;
  method: string;
  body: BodyType;
  headers: IncomingHttpHeaders;
}

type LogLevel = 'log' | 'error' | 'warn' | 'info' | 'debug';

function createLogger(verboseLogs = false) {
  return {
    log: (...args: unknown[]) => {
      if (verboseLogs) console.log(...args);
    },
    error: (...args: unknown[]) => {
      if (verboseLogs) console.error(...args);
    },
    warn: (...args: unknown[]) => {
      if (verboseLogs) console.warn(...args);
    },
    info: (...args: unknown[]) => {
      if (verboseLogs) console.info(...args);
    },
    debug: (...args: unknown[]) => {
      if (verboseLogs) console.debug(...args);
    },
  };
}
/**
 * Configuration for the MCP handler.
 * @property redisUrl - The URL of the Redis instance to use for the MCP handler.
 * @property streamableHttpEndpoint - The endpoint to use for the streamable HTTP transport.
 * @property sseEndpoint - The endpoint to use for the SSE transport.
 * @property verboseLogs - If true, enables console logging.
 */
export type Config = {
  /**
   * The URL of the Redis instance to use for the MCP handler.
   * @default process.env.REDIS_URL || process.env.KV_URL
   */
  redisUrl?: string;
  /**
   * The endpoint to use for the streamable HTTP transport.
   * @default "/mcp"
   */
  streamableHttpEndpoint?: string;
  /**
   * The endpoint to use for the SSE transport.
   * @default "/sse"
   */
  sseEndpoint?: string;
  /**
   * The endpoint to use for the SSE messages transport.
   * @default "/message"
   */
  sseMessageEndpoint?: string;
  /**
   * The maximum duration of an MCP request in seconds.
   * @default 60
   */
  maxDuration?: number;
  /**
   * If true, enables console logging.
   * @default false
   */
  verboseLogs?: boolean;
};

export function initializeMcpApiHandler(
  initializeServer: (server: McpServer) => void,
  serverOptions: ServerOptions = {},
  config: Config = {
    redisUrl: process.env.REDIS_URL || process.env.KV_URL,
    streamableHttpEndpoint: '/mcp',
    sseEndpoint: '/sse',
    sseMessageEndpoint: '/message',
    maxDuration: 60,
    verboseLogs: false,
  }
) {
  const {
    redisUrl,
    streamableHttpEndpoint,
    sseEndpoint,
    sseMessageEndpoint,
    maxDuration,
    verboseLogs,
  } = config;
  const logger = createLogger(verboseLogs);
  const redis = createClient({
    url: redisUrl,
  });
  const redisPublisher = createClient({
    url: redisUrl,
  });
  redis.on('error', err => {
    logger.error('Redis error', err);
  });
  redisPublisher.on('error', err => {
    logger.error('Redis error', err);
  });
  const redisPromise = Promise.all([redis.connect(), redisPublisher.connect()]);

  let servers: McpServer[] = [];

  let statelessServer: McpServer;
  const statelessTransport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
  });
  return async function mcpApiHandler(req: Request, res: ServerResponse) {
    await redisPromise;
    const url = new URL(req.url || '', 'https://example.com');
    if (url.pathname === streamableHttpEndpoint) {
      if (req.method === 'GET') {
        logger.log('Received GET MCP request');
        res.writeHead(405).end(
          JSON.stringify({
            jsonrpc: '2.0',
            error: {
              code: -32000,
              message: 'Method not allowed.',
            },
            id: null,
          })
        );
        return;
      }
      if (req.method === 'DELETE') {
        logger.log('Received DELETE MCP request');
        res.writeHead(405).end(
          JSON.stringify({
            jsonrpc: '2.0',
            error: {
              code: -32000,
              message: 'Method not allowed.',
            },
            id: null,
          })
        );
        return;
      }

      if (req.method === 'POST') {
        logger.log('Got new MCP connection', req.url, req.method);

        if (!statelessServer) {
          statelessServer = new McpServer(
            {
              name: 'mcp-typescript server on vercel',
              version: '0.1.0',
            },
            serverOptions
          );

          initializeServer(statelessServer);
          await statelessServer.connect(statelessTransport);
        }

        // Parse the request body
        let bodyContent: BodyType;
        const contentType = req.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          bodyContent = await req.json();
        } else {
          bodyContent = await req.text();
        }

        const incomingRequest = createFakeIncomingMessage({
          method: req.method,
          url: req.url,
          headers: Object.fromEntries(req.headers),
          body: bodyContent,
        });
        await statelessTransport.handleRequest(incomingRequest, res);
      }
    } else if (url.pathname === sseEndpoint) {
      logger.log('Got new SSE connection');
      assert(sseMessageEndpoint, 'sseMessageEndpoint is required');
      const transport = new SSEServerTransport(sseMessageEndpoint, res);
      const sessionId = transport.sessionId;
      const server = new McpServer(
        {
          name: 'mcp-typescript server on vercel',
          version: '0.1.0',
        },
        serverOptions
      );
      initializeServer(server);

      servers.push(server);

      server.server.onclose = () => {
        logger.log('SSE connection closed');
        servers = servers.filter(s => s !== server);
      };

      let logs: {
        type: LogLevel;
        messages: string[];
      }[] = [];
      // This ensures that we logs in the context of the right invocation since the subscriber
      // is not itself invoked in request context.

      // eslint-disable-next-line no-inner-declarations
      function logInContext(severity: LogLevel, ...messages: string[]) {
        logs.push({
          type: severity,
          messages,
        });
      }

      // Handles messages originally received via /message
      const handleMessage = async (message: string) => {
        logger.log('Received message from Redis', message);
        logInContext('log', 'Received message from Redis', message);
        const request = JSON.parse(message) as SerializedRequest;

        // Make in IncomingMessage object because that is what the SDK expects.
        const req = createFakeIncomingMessage({
          method: request.method,
          url: request.url,
          headers: request.headers,
          body: request.body, // This could already be an object from earlier parsing
        });
        const syntheticRes = new ServerResponse(req);
        let status = 100;
        let body = '';
        syntheticRes.writeHead = (statusCode: number) => {
          status = statusCode;
          return syntheticRes;
        };
        syntheticRes.end = (b: unknown) => {
          body = b as string;
          return syntheticRes;
        };
        await transport.handlePostMessage(req, syntheticRes);

        await redisPublisher.publish(
          `responses:${sessionId}:${request.requestId}`,
          JSON.stringify({
            status,
            body,
          })
        );

        if (status >= 200 && status < 300) {
          logInContext(
            'log',
            `Request ${sessionId}:${request.requestId} succeeded: ${body}`
          );
        } else {
          logInContext(
            'error',
            `Message for ${sessionId}:${request.requestId} failed with status ${status}: ${body}`
          );
        }
      };

      const interval = setInterval(() => {
        for (const log of logs) {
          logger[log.type](...log.messages);
        }
        logs = [];
      }, 100);

      await redis.subscribe(`requests:${sessionId}`, handleMessage);
      logger.log(`Subscribed to requests:${sessionId}`);

      let timeout: NodeJS.Timeout;
      let resolveTimeout: (value: unknown) => void;
      const waitPromise = new Promise(resolve => {
        resolveTimeout = resolve;
        timeout = setTimeout(
          () => {
            resolve('max duration reached');
          },
          (maxDuration ?? 60) * 1000
        );
      });

      // eslint-disable-next-line no-inner-declarations
      async function cleanup() {
        clearTimeout(timeout);
        clearInterval(interval);
        await redis.unsubscribe(`requests:${sessionId}`, handleMessage);
        logger.log('Done');
        res.statusCode = 200;
        res.end();
      }
      req.signal.addEventListener('abort', () =>
        resolveTimeout('client hang up')
      );

      await server.connect(transport);
      const closeReason = await waitPromise;
      logger.log(closeReason);
      await cleanup();
    } else if (url.pathname === sseMessageEndpoint) {
      logger.log('Received message');

      const body = await req.text();
      let parsedBody: BodyType;
      try {
        parsedBody = JSON.parse(body);
      } catch (e) {
        parsedBody = body;
      }

      const sessionId = url.searchParams.get('sessionId') || '';
      if (!sessionId) {
        res.statusCode = 400;
        res.end('No sessionId provided');
        return;
      }
      const requestId = crypto.randomUUID();
      const serializedRequest: SerializedRequest = {
        requestId,
        url: req.url || '',
        method: req.method || '',
        body: parsedBody,
        headers: Object.fromEntries(req.headers.entries()),
      };

      // Handles responses from the /sse endpoint.
      await redis.subscribe(`responses:${sessionId}:${requestId}`, message => {
        clearTimeout(timeout);
        const response = JSON.parse(message) as {
          status: number;
          body: string;
        };
        res.statusCode = response.status;
        res.end(response.body);
      });

      // Queue the request in Redis so that a subscriber can pick it up.
      // One queue per session.
      await redisPublisher.publish(
        `requests:${sessionId}`,
        JSON.stringify(serializedRequest)
      );
      logger.log(`Published requests:${sessionId}`, serializedRequest);

      const timeout = setTimeout(async () => {
        await redis.unsubscribe(`responses:${sessionId}:${requestId}`);
        res.statusCode = 408;
        res.end('Request timed out');
      }, 10 * 1000);

      res.on('close', async () => {
        clearTimeout(timeout);
        await redis.unsubscribe(`responses:${sessionId}:${requestId}`);
      });
    } else {
      res.statusCode = 404;
      res.end('Not found');
    }
  };
}

// Define the options interface
interface FakeIncomingMessageOptions {
  method?: string;
  url?: string;
  headers?: IncomingHttpHeaders;
  body?: BodyType;
  socket?: Socket;
}

// Create a fake IncomingMessage
function createFakeIncomingMessage(
  options: FakeIncomingMessageOptions = {}
): IncomingMessage {
  const {
    method = 'GET',
    url = '/',
    headers = {},
    body = null,
    socket = new Socket(),
  } = options;

  // Create a readable stream that will be used as the base for IncomingMessage
  const readable = new Readable();
  readable._read = (): void => {}; // Required implementation

  // Add the body content if provided
  if (body) {
    if (typeof body === 'string') {
      readable.push(body);
    } else if (Buffer.isBuffer(body)) {
      readable.push(body);
    } else {
      // Ensure proper JSON-RPC format
      const bodyString = JSON.stringify(body);
      readable.push(bodyString);
    }
    readable.push(null); // Signal the end of the stream
  } else {
    readable.push(null); // Always end the stream even if no body
  }

  // Create the IncomingMessage instance
  const req = new IncomingMessage(socket);

  // Set the properties
  req.method = method;
  req.url = url;
  req.headers = headers;

  // Copy over the stream methods
  req.push = readable.push.bind(readable);
  req.read = readable.read.bind(readable);
  // @ts-expect-error
  req.on = readable.on.bind(readable);
  req.pipe = readable.pipe.bind(readable);

  return req;
}



================================================
FILE: packages/mcp-adapter/src/next/server-response-adapter.ts
================================================
import { EventEmitter } from 'node:events';
import type { ServerResponse } from 'node:http';

type WriteheadArgs = {
  statusCode: number;
  headers?: Record<string, string>;
};

// biome-ignore lint/suspicious/noExplicitAny: Not deterministic
export type BodyType = string | Buffer | Record<string, any> | null;

type EventListener = (...args: unknown[]) => void;

/**
 * Anthropic's MCP API requires a server response object. This function
 * creates a fake server response object that can be used to pass to the MCP API.
 */
export function createServerResponseAdapter(
  signal: AbortSignal,
  fn: (re: ServerResponse) => Promise<void> | void
): Promise<Response> {
  let writeHeadResolver: (v: WriteheadArgs) => void;
  const writeHeadPromise = new Promise<WriteheadArgs>(resolve => {
    writeHeadResolver = resolve;
  });

  return new Promise(resolve => {
    let controller: ReadableStreamController<Uint8Array> | undefined;
    let shouldClose = false;
    let wroteHead = false;

    const writeHead = (
      statusCode: number,
      headers?: Record<string, string>
    ) => {
      if (typeof headers === 'string') {
        throw new Error('Status message of writeHead not supported');
      }
      wroteHead = true;
      writeHeadResolver({
        statusCode,
        headers,
      });
      return fakeServerResponse;
    };

    const bufferedData: Uint8Array[] = [];

    const write = (
      chunk: Buffer | string,
      encoding?: BufferEncoding
    ): boolean => {
      if (encoding) {
        throw new Error('Encoding not supported');
      }
      if (chunk instanceof Buffer) {
        throw new Error('Buffer not supported');
      }
      if (!wroteHead) {
        writeHead(200);
      }
      if (!controller) {
        bufferedData.push(new TextEncoder().encode(chunk as string));
        return true;
      }
      controller.enqueue(new TextEncoder().encode(chunk as string));
      return true;
    };

    const eventEmitter = new EventEmitter();

    const fakeServerResponse = {
      writeHead,
      write,
      end: (data?: Buffer | string) => {
        if (data) {
          write(data);
        }

        if (!controller) {
          shouldClose = true;
          return fakeServerResponse;
        }
        try {
          controller.close();
        } catch {
          /* May be closed on tcp layer */
        }
        return fakeServerResponse;
      },
      on: (event: string, listener: EventListener) => {
        eventEmitter.on(event, listener);
        return fakeServerResponse;
      },
    };

    signal.addEventListener('abort', () => {
      eventEmitter.emit('close');
    });

    void fn(fakeServerResponse as ServerResponse);

    void (async () => {
      const head = await writeHeadPromise;

      const response = new Response(
        new ReadableStream({
          start(c) {
            controller = c;
            for (const chunk of bufferedData) {
              controller.enqueue(chunk);
            }
            if (shouldClose) {
              controller.close();
            }
          },
        }),
        {
          status: head.statusCode,
          headers: head.headers,
        }
      );

      resolve(response);
    })();
  });
}


