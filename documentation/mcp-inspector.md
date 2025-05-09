Directory structure:
└── modelcontextprotocol-inspector/
    ├── README.md
    ├── CLAUDE.md
    ├── CODE_OF_CONDUCT.md
    ├── CONTRIBUTING.md
    ├── LICENSE
    ├── package.json
    ├── sample-config.json
    ├── SECURITY.md
    ├── .npmrc
    ├── .prettierignore
    ├── .prettierrc
    ├── cli/
    │   ├── package.json
    │   ├── tsconfig.json
    │   ├── scripts/
    │   │   ├── cli-tests.js
    │   │   └── make-executable.js
    │   └── src/
    │       ├── cli.ts
    │       ├── error-handler.ts
    │       ├── index.ts
    │       ├── transport.ts
    │       └── client/
    │           ├── connection.ts
    │           ├── index.ts
    │           ├── prompts.ts
    │           ├── resources.ts
    │           ├── tools.ts
    │           └── types.ts
    ├── client/
    │   ├── README.md
    │   ├── components.json
    │   ├── eslint.config.js
    │   ├── index.html
    │   ├── jest.config.cjs
    │   ├── package.json
    │   ├── postcss.config.js
    │   ├── tailwind.config.js
    │   ├── tsconfig.app.json
    │   ├── tsconfig.jest.json
    │   ├── tsconfig.json
    │   ├── tsconfig.node.json
    │   ├── vite.config.ts
    │   ├── .gitignore
    │   ├── bin/
    │   │   ├── client.js
    │   │   └── start.js
    │   ├── public/
    │   └── src/
    │       ├── App.css
    │       ├── App.tsx
    │       ├── index.css
    │       ├── main.tsx
    │       ├── vite-env.d.ts
    │       ├── __mocks__/
    │       │   └── styleMock.js
    │       ├── components/
    │       │   ├── ConsoleTab.tsx
    │       │   ├── DynamicJsonForm.tsx
    │       │   ├── History.tsx
    │       │   ├── JsonEditor.tsx
    │       │   ├── JsonView.tsx
    │       │   ├── ListPane.tsx
    │       │   ├── OAuthCallback.tsx
    │       │   ├── PingTab.tsx
    │       │   ├── PromptsTab.tsx
    │       │   ├── ResourcesTab.tsx
    │       │   ├── RootsTab.tsx
    │       │   ├── SamplingRequest.tsx
    │       │   ├── SamplingTab.tsx
    │       │   ├── Sidebar.tsx
    │       │   ├── ToolsTab.tsx
    │       │   ├── __tests__/
    │       │   │   ├── DynamicJsonForm.test.tsx
    │       │   │   ├── samplingRequest.test.tsx
    │       │   │   ├── samplingTab.test.tsx
    │       │   │   ├── Sidebar.test.tsx
    │       │   │   └── ToolsTab.test.tsx
    │       │   └── ui/
    │       │       ├── alert.tsx
    │       │       ├── button.tsx
    │       │       ├── checkbox.tsx
    │       │       ├── combobox.tsx
    │       │       ├── command.tsx
    │       │       ├── dialog.tsx
    │       │       ├── input.tsx
    │       │       ├── label.tsx
    │       │       ├── popover.tsx
    │       │       ├── select.tsx
    │       │       ├── tabs.tsx
    │       │       ├── textarea.tsx
    │       │       ├── toast.tsx
    │       │       ├── toaster.tsx
    │       │       └── tooltip.tsx
    │       ├── lib/
    │       │   ├── auth.ts
    │       │   ├── configurationTypes.ts
    │       │   ├── constants.ts
    │       │   ├── notificationTypes.ts
    │       │   ├── utils.ts
    │       │   └── hooks/
    │       │       ├── useCompletionState.ts
    │       │       ├── useConnection.ts
    │       │       ├── useDraggablePane.ts
    │       │       ├── useTheme.ts
    │       │       ├── useToast.ts
    │       │       └── __tests__/
    │       │           └── useConnection.test.tsx
    │       └── utils/
    │           ├── configUtils.ts
    │           ├── escapeUnicode.ts
    │           ├── jsonUtils.ts
    │           ├── oauthUtils.ts
    │           ├── schemaUtils.ts
    │           └── __tests__/
    │               ├── escapeUnicode.test.ts
    │               ├── jsonUtils.test.ts
    │               ├── oauthUtils.ts
    │               └── schemaUtils.test.ts
    ├── server/
    │   ├── package.json
    │   ├── tsconfig.json
    │   └── src/
    │       ├── index.ts
    │       └── mcpProxy.ts
    └── .github/
        └── workflows/
            └── main.yml


Files Content:

(Files content cropped to 300k characters, download full ingest to see more)
================================================
FILE: README.md
================================================
# MCP Inspector

The MCP inspector is a developer tool for testing and debugging MCP servers.

![MCP Inspector Screenshot](https://raw.githubusercontent.com/modelcontextprotocol/inspector/main/mcp-inspector.png)

## Running the Inspector

### Requirements

- Node.js: ^22.7.5

### From an MCP server repository

To inspect an MCP server implementation, there's no need to clone this repo. Instead, use `npx`. For example, if your server is built at `build/index.js`:

```bash
npx @modelcontextprotocol/inspector node build/index.js
```

You can pass both arguments and environment variables to your MCP server. Arguments are passed directly to your server, while environment variables can be set using the `-e` flag:

```bash
# Pass arguments only
npx @modelcontextprotocol/inspector node build/index.js arg1 arg2

# Pass environment variables only
npx @modelcontextprotocol/inspector -e key=value -e key2=$VALUE2 node build/index.js

# Pass both environment variables and arguments
npx @modelcontextprotocol/inspector -e key=value -e key2=$VALUE2 node build/index.js arg1 arg2

# Use -- to separate inspector flags from server arguments
npx @modelcontextprotocol/inspector -e key=$VALUE -- node build/index.js -e server-flag
```

The inspector runs both an MCP Inspector (MCPI) client UI (default port 6274) and an MCP Proxy (MCPP) server (default port 6277). Open the MCPI client UI in your browser to use the inspector. (These ports are derived from the T9 dialpad mapping of MCPI and MCPP respectively, as a mnemonic). You can customize the ports if needed:

```bash
CLIENT_PORT=8080 SERVER_PORT=9000 npx @modelcontextprotocol/inspector node build/index.js
```

For more details on ways to use the inspector, see the [Inspector section of the MCP docs site](https://modelcontextprotocol.io/docs/tools/inspector). For help with debugging, see the [Debugging guide](https://modelcontextprotocol.io/docs/tools/debugging).

### Authentication

The inspector supports bearer token authentication for SSE connections. Enter your token in the UI when connecting to an MCP server, and it will be sent in the Authorization header. You can override the header name using the input field in the sidebar.

### Security Considerations

The MCP Inspector includes a proxy server that can run and communicate with local MCP processes. The proxy server should not be exposed to untrusted networks as it has permissions to spawn local processes and can connect to any specified MCP server.

### Configuration

The MCP Inspector supports the following configuration settings. To change them, click on the `Configuration` button in the MCP Inspector UI:

| Setting                                 | Description                                                                                                  | Default |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------- |
| `MCP_SERVER_REQUEST_TIMEOUT`            | Timeout for requests to the MCP server (ms)                                                                  | 10000   |
| `MCP_REQUEST_TIMEOUT_RESET_ON_PROGRESS` | Reset timeout on progress notifications                                                                      | true    |
| `MCP_REQUEST_MAX_TOTAL_TIMEOUT`         | Maximum total timeout for requests sent to the MCP server (ms) (Use with progress notifications)             | 60000   |
| `MCP_PROXY_FULL_ADDRESS`                | Set this if you are running the MCP Inspector Proxy on a non-default address. Example: http://10.1.1.22:5577 | ""      |

These settings can be adjusted in real-time through the UI and will persist across sessions.

The inspector also supports configuration files to store settings for different MCP servers. This is useful when working with multiple servers or complex configurations:

```bash
npx @modelcontextprotocol/inspector --config path/to/config.json --server everything
```

Example server configuration file:

```json
{
  "mcpServers": {
    "everything": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-everything"],
      "env": {
        "hello": "Hello MCP!"
      }
    },
    "my-server": {
      "command": "node",
      "args": ["build/index.js", "arg1", "arg2"],
      "env": {
        "key": "value",
        "key2": "value2"
      }
    }
  }
}
```

### From this repository

If you're working on the inspector itself:

Development mode:

```bash
npm run dev
```

> **Note for Windows users:**
> On Windows, use the following command instead:
>
> ```bash
> npm run dev:windows
> ```

Production mode:

```bash
npm run build
npm start
```

### CLI Mode

CLI mode enables programmatic interaction with MCP servers from the command line, ideal for scripting, automation, and integration with coding assistants. This creates an efficient feedback loop for MCP server development.

```bash
npx @modelcontextprotocol/inspector --cli node build/index.js
```

The CLI mode supports most operations across tools, resources, and prompts. A few examples:

```bash
# Basic usage
npx @modelcontextprotocol/inspector --cli node build/index.js

# With config file
npx @modelcontextprotocol/inspector --cli --config path/to/config.json --server myserver

# List available tools
npx @modelcontextprotocol/inspector --cli node build/index.js --method tools/list

# Call a specific tool
npx @modelcontextprotocol/inspector --cli node build/index.js --method tools/call --tool-name mytool --tool-arg key=value --tool-arg another=value2

# List available resources
npx @modelcontextprotocol/inspector --cli node build/index.js --method resources/list

# List available prompts
npx @modelcontextprotocol/inspector --cli node build/index.js --method prompts/list

# Connect to a remote MCP server
npx @modelcontextprotocol/inspector --cli https://my-mcp-server.example.com

# Call a tool on a remote server
npx @modelcontextprotocol/inspector --cli https://my-mcp-server.example.com --method tools/call --tool-name remotetool --tool-arg param=value

# List resources from a remote server
npx @modelcontextprotocol/inspector --cli https://my-mcp-server.example.com --method resources/list
```

### UI Mode vs CLI Mode: When to Use Each

| Use Case                 | UI Mode                                                                   | CLI Mode                                                                                                                                             |
| ------------------------ | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Server Development**   | Visual interface for interactive testing and debugging during development | Scriptable commands for quick testing and continuous integration; creates feedback loops with AI coding assistants like Cursor for rapid development |
| **Resource Exploration** | Interactive browser with hierarchical navigation and JSON visualization   | Programmatic listing and reading for automation and scripting                                                                                        |
| **Tool Testing**         | Form-based parameter input with real-time response visualization          | Command-line tool execution with JSON output for scripting                                                                                           |
| **Prompt Engineering**   | Interactive sampling with streaming responses and visual comparison       | Batch processing of prompts with machine-readable output                                                                                             |
| **Debugging**            | Request history, visualized errors, and real-time notifications           | Direct JSON output for log analysis and integration with other tools                                                                                 |
| **Automation**           | N/A                                                                       | Ideal for CI/CD pipelines, batch processing, and integration with coding assistants                                                                  |
| **Learning MCP**         | Rich visual interface helps new users understand server capabilities      | Simplified commands for focused learning of specific endpoints                                                                                       |

## License

This project is licensed under the MIT License—see the [LICENSE](LICENSE) file for details.



================================================
FILE: CLAUDE.md
================================================
# MCP Inspector Development Guide

## Build Commands

- Build all: `npm run build`
- Build client: `npm run build-client`
- Build server: `npm run build-server`
- Development mode: `npm run dev` (use `npm run dev:windows` on Windows)
- Format code: `npm run prettier-fix`
- Client lint: `cd client && npm run lint`

## Code Style Guidelines

- Use TypeScript with proper type annotations
- Follow React functional component patterns with hooks
- Use ES modules (import/export) not CommonJS
- Use Prettier for formatting (auto-formatted on commit)
- Follow existing naming conventions:
  - camelCase for variables and functions
  - PascalCase for component names and types
  - kebab-case for file names
- Use async/await for asynchronous operations
- Implement proper error handling with try/catch blocks
- Use Tailwind CSS for styling in the client
- Keep components small and focused on a single responsibility

## Project Organization

The project is organized as a monorepo with workspaces:

- `client/`: React frontend with Vite, TypeScript and Tailwind
- `server/`: Express backend with TypeScript
- `bin/`: CLI scripts



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
# Contributing to Model Context Protocol Inspector

Thanks for your interest in contributing! This guide explains how to get involved.

## Getting Started

1. Fork the repository and clone it locally
2. Install dependencies with `npm install`
3. Run `npm run dev` to start both client and server in development mode
4. Use the web UI at http://127.0.0.1:6274 to interact with the inspector

## Development Process & Pull Requests

1. Create a new branch for your changes
2. Make your changes following existing code style and conventions. You can run `npm run prettier-check` and `npm run prettier-fix` as applicable.
3. Test changes locally by running `npm test`
4. Update documentation as needed
5. Use clear commit messages explaining your changes
6. Verify all changes work as expected
7. Submit a pull request
8. PRs will be reviewed by maintainers

## Code of Conduct

This project follows our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it before contributing.

## Security

If you find a security vulnerability, please refer to our [Security Policy](SECURITY.md) for reporting instructions.

## Questions?

Feel free to [open an issue](https://github.com/modelcontextprotocol/mcp-inspector/issues) for questions or create a discussion for general topics.

## License

By contributing, you agree that your contributions will be licensed under the MIT license.



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
  "name": "@modelcontextprotocol/inspector",
  "version": "0.12.0",
  "description": "Model Context Protocol inspector",
  "license": "MIT",
  "author": "Anthropic, PBC (https://anthropic.com)",
  "homepage": "https://modelcontextprotocol.io",
  "bugs": "https://github.com/modelcontextprotocol/inspector/issues",
  "type": "module",
  "bin": {
    "mcp-inspector": "cli/build/cli.js"
  },
  "files": [
    "client/bin",
    "client/dist",
    "server/build",
    "cli/build"
  ],
  "workspaces": [
    "client",
    "server",
    "cli"
  ],
  "scripts": {
    "build": "npm run build-server && npm run build-client && npm run build-cli",
    "build-server": "cd server && npm run build",
    "build-client": "cd client && npm run build",
    "build-cli": "cd cli && npm run build",
    "clean": "rimraf ./node_modules ./client/node_modules ./cli/node_modules ./build ./client/dist ./server/build ./cli/build ./package-lock.json && npm install",
    "dev": "concurrently \"cd client && npm run dev\" \"cd server && npm run dev\"",
    "dev:windows": "concurrently \"cd client && npm run dev\" \"cd server && npm run dev:windows\"",
    "start": "node client/bin/start.js",
    "start-server": "cd server && npm run start",
    "start-client": "cd client && npm run preview",
    "test": "npm run prettier-check && cd client && npm test",
    "test-cli": "cd cli && npm run test",
    "prettier-fix": "prettier --write .",
    "prettier-check": "prettier --check .",
    "prepare": "npm run build",
    "publish-all": "npm publish --workspaces --access public && npm publish --access public"
  },
  "dependencies": {
    "@modelcontextprotocol/inspector-cli": "^0.12.0",
    "@modelcontextprotocol/inspector-client": "^0.12.0",
    "@modelcontextprotocol/inspector-server": "^0.12.0",
    "@modelcontextprotocol/sdk": "^1.11.0",
    "concurrently": "^9.0.1",
    "shell-quote": "^1.8.2",
    "spawn-rx": "^5.1.2",
    "ts-node": "^10.9.2",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@types/jest": "^29.5.14",
    "@types/node": "^22.7.5",
    "@types/shell-quote": "^1.7.5",
    "jest-fixed-jsdom": "^0.0.9",
    "prettier": "3.3.3",
    "rimraf": "^6.0.1",
    "typescript": "^5.4.2"
  }
}



================================================
FILE: sample-config.json
================================================
{
  "mcpServers": {
    "everything": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-everything"],
      "env": {
        "HELLO": "Hello MCP!"
      }
    },
    "myserver": {
      "command": "node",
      "args": ["build/index.js", "arg1", "arg2"],
      "env": {
        "KEY": "value",
        "KEY2": "value2"
      }
    }
  }
}



================================================
FILE: SECURITY.md
================================================
# Security Policy
Thank you for helping us keep the inspector secure.

## Reporting Security Issues

This project is maintained by [Anthropic](https://www.anthropic.com/) as part of the Model Context Protocol project.

The security of our systems and user data is Anthropic’s top priority. We appreciate the work of security researchers acting in good faith in identifying and reporting potential vulnerabilities.

Our security program is managed on HackerOne and we ask that any validated vulnerability in this functionality be reported through their [submission form](https://hackerone.com/anthropic-vdp/reports/new?type=team&report_type=vulnerability).

## Vulnerability Disclosure Program

Our Vulnerability Program Guidelines are defined on our [HackerOne program page](https://hackerone.com/anthropic-vdp).



================================================
FILE: .npmrc
================================================
registry="https://registry.npmjs.org/"
@modelcontextprotocol:registry="https://registry.npmjs.org/"



================================================
FILE: .prettierignore
================================================
packages
server/build
CODE_OF_CONDUCT.md
SECURITY.md



================================================
FILE: .prettierrc
================================================



================================================
FILE: cli/package.json
================================================
{
  "name": "@modelcontextprotocol/inspector-cli",
  "version": "0.12.0",
  "description": "CLI for the Model Context Protocol inspector",
  "license": "MIT",
  "author": "Anthropic, PBC (https://anthropic.com)",
  "homepage": "https://modelcontextprotocol.io",
  "bugs": "https://github.com/modelcontextprotocol/inspector/issues",
  "main": "build/cli.js",
  "type": "module",
  "bin": {
    "mcp-inspector-cli": "build/cli.js"
  },
  "files": [
    "build"
  ],
  "scripts": {
    "build": "tsc",
    "postbuild": "node scripts/make-executable.js",
    "test": "node scripts/cli-tests.js"
  },
  "devDependencies": {},
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.11.0",
    "commander": "^13.1.0",
    "spawn-rx": "^5.1.2"
  }
}



================================================
FILE: cli/tsconfig.json
================================================
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "outDir": "./build",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "noUncheckedIndexedAccess": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "packages", "**/*.spec.ts", "build"]
}



================================================
FILE: cli/scripts/cli-tests.js
================================================
#!/usr/bin/env node

// Colors for output
const colors = {
  GREEN: "\x1b[32m",
  YELLOW: "\x1b[33m",
  RED: "\x1b[31m",
  BLUE: "\x1b[34m",
  ORANGE: "\x1b[33m",
  NC: "\x1b[0m", // No Color
};

import fs from "fs";
import path from "path";
import { execSync, spawn } from "child_process";
import os from "os";
import { fileURLToPath } from "url";

// Get directory paths with ESM compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Track test results
let PASSED_TESTS = 0;
let FAILED_TESTS = 0;
let SKIPPED_TESTS = 0;
let TOTAL_TESTS = 0;

console.log(
  `${colors.YELLOW}=== MCP Inspector CLI Test Script ===${colors.NC}`,
);
console.log(
  `${colors.BLUE}This script tests the MCP Inspector CLI's ability to handle various command line options:${colors.NC}`,
);
console.log(`${colors.BLUE}- Basic CLI mode${colors.NC}`);
console.log(`${colors.BLUE}- Environment variables (-e)${colors.NC}`);
console.log(`${colors.BLUE}- Config file (--config)${colors.NC}`);
console.log(`${colors.BLUE}- Server selection (--server)${colors.NC}`);
console.log(`${colors.BLUE}- Method selection (--method)${colors.NC}`);
console.log(
  `${colors.BLUE}- Tool-related options (--tool-name, --tool-arg)${colors.NC}`,
);
console.log(`${colors.BLUE}- Resource-related options (--uri)${colors.NC}`);
console.log(
  `${colors.BLUE}- Prompt-related options (--prompt-name, --prompt-args)${colors.NC}`,
);
console.log(`${colors.BLUE}- Logging options (--log-level)${colors.NC}\n`);

// Get directory paths
const SCRIPTS_DIR = __dirname;
const PROJECT_ROOT = path.join(SCRIPTS_DIR, "../../");
const BUILD_DIR = path.resolve(SCRIPTS_DIR, "../build");

// Define the test server command using npx
const TEST_CMD = "npx";
const TEST_ARGS = ["@modelcontextprotocol/server-everything"];

// Create output directory for test results
const OUTPUT_DIR = path.join(SCRIPTS_DIR, "test-output");
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Create a temporary directory for test files
const TEMP_DIR = fs.mkdirSync(path.join(os.tmpdir(), "mcp-inspector-tests"), {
  recursive: true,
});

process.on("exit", () => {
  try {
    fs.rmSync(TEMP_DIR, { recursive: true, force: true });
  } catch (err) {
    console.error(
      `${colors.RED}Failed to remove temp directory: ${err.message}${colors.NC}`,
    );
  }
});

// Use the existing sample config file
console.log(
  `${colors.BLUE}Using existing sample config file: ${PROJECT_ROOT}/sample-config.json${colors.NC}`,
);
try {
  const sampleConfig = fs.readFileSync(
    path.join(PROJECT_ROOT, "sample-config.json"),
    "utf8",
  );
  console.log(sampleConfig);
} catch (error) {
  console.error(
    `${colors.RED}Error reading sample config: ${error.message}${colors.NC}`,
  );
}

// Create an invalid config file for testing
const invalidConfigPath = path.join(TEMP_DIR, "invalid-config.json");
fs.writeFileSync(invalidConfigPath, '{\n  "mcpServers": {\n    "invalid": {');

// Function to run a basic test
async function runBasicTest(testName, ...args) {
  const outputFile = path.join(
    OUTPUT_DIR,
    `${testName.replace(/\//g, "_")}.log`,
  );

  console.log(`\n${colors.YELLOW}Testing: ${testName}${colors.NC}`);
  TOTAL_TESTS++;

  // Run the command and capture output
  console.log(
    `${colors.BLUE}Command: node ${BUILD_DIR}/cli.js ${args.join(" ")}${colors.NC}`,
  );

  try {
    // Create a write stream for the output file
    const outputStream = fs.createWriteStream(outputFile);

    // Spawn the process
    return new Promise((resolve) => {
      const child = spawn("node", [path.join(BUILD_DIR, "cli.js"), ...args], {
        stdio: ["ignore", "pipe", "pipe"],
      });

      // Pipe stdout and stderr to the output file
      child.stdout.pipe(outputStream);
      child.stderr.pipe(outputStream);

      // Also capture output for display
      let output = "";
      child.stdout.on("data", (data) => {
        output += data.toString();
      });
      child.stderr.on("data", (data) => {
        output += data.toString();
      });

      child.on("close", (code) => {
        outputStream.end();

        if (code === 0) {
          console.log(`${colors.GREEN}✓ Test passed: ${testName}${colors.NC}`);
          console.log(`${colors.BLUE}First few lines of output:${colors.NC}`);
          const firstFewLines = output
            .split("\n")
            .slice(0, 5)
            .map((line) => `  ${line}`)
            .join("\n");
          console.log(firstFewLines);
          PASSED_TESTS++;
          resolve(true);
        } else {
          console.log(`${colors.RED}✗ Test failed: ${testName}${colors.NC}`);
          console.log(`${colors.RED}Error output:${colors.NC}`);
          console.log(
            output
              .split("\n")
              .map((line) => `  ${line}`)
              .join("\n"),
          );
          FAILED_TESTS++;

          // Stop after any error is encountered
          console.log(
            `${colors.YELLOW}Stopping tests due to error. Please validate and fix before continuing.${colors.NC}`,
          );
          process.exit(1);
        }
      });
    });
  } catch (error) {
    console.error(
      `${colors.RED}Error running test: ${error.message}${colors.NC}`,
    );
    FAILED_TESTS++;
    process.exit(1);
  }
}

// Function to run an error test (expected to fail)
async function runErrorTest(testName, ...args) {
  const outputFile = path.join(
    OUTPUT_DIR,
    `${testName.replace(/\//g, "_")}.log`,
  );

  console.log(`\n${colors.YELLOW}Testing error case: ${testName}${colors.NC}`);
  TOTAL_TESTS++;

  // Run the command and capture output
  console.log(
    `${colors.BLUE}Command: node ${BUILD_DIR}/cli.js ${args.join(" ")}${colors.NC}`,
  );

  try {
    // Create a write stream for the output file
    const outputStream = fs.createWriteStream(outputFile);

    // Spawn the process
    return new Promise((resolve) => {
      const child = spawn("node", [path.join(BUILD_DIR, "cli.js"), ...args], {
        stdio: ["ignore", "pipe", "pipe"],
      });

      // Pipe stdout and stderr to the output file
      child.stdout.pipe(outputStream);
      child.stderr.pipe(outputStream);

      // Also capture output for display
      let output = "";
      child.stdout.on("data", (data) => {
        output += data.toString();
      });
      child.stderr.on("data", (data) => {
        output += data.toString();
      });

      child.on("close", (code) => {
        outputStream.end();

        // For error tests, we expect a non-zero exit code
        if (code !== 0) {
          console.log(
            `${colors.GREEN}✓ Error test passed: ${testName}${colors.NC}`,
          );
          console.log(`${colors.BLUE}Error output (expected):${colors.NC}`);
          const firstFewLines = output
            .split("\n")
            .slice(0, 5)
            .map((line) => `  ${line}`)
            .join("\n");
          console.log(firstFewLines);
          PASSED_TESTS++;
          resolve(true);
        } else {
          console.log(
            `${colors.RED}✗ Error test failed: ${testName} (expected error but got success)${colors.NC}`,
          );
          console.log(`${colors.RED}Output:${colors.NC}`);
          console.log(
            output
              .split("\n")
              .map((line) => `  ${line}`)
              .join("\n"),
          );
          FAILED_TESTS++;

          // Stop after any error is encountered
          console.log(
            `${colors.YELLOW}Stopping tests due to error. Please validate and fix before continuing.${colors.NC}`,
          );
          process.exit(1);
        }
      });
    });
  } catch (error) {
    console.error(
      `${colors.RED}Error running test: ${error.message}${colors.NC}`,
    );
    FAILED_TESTS++;
    process.exit(1);
  }
}

// Run all tests
async function runTests() {
  console.log(
    `\n${colors.YELLOW}=== Running Basic CLI Mode Tests ===${colors.NC}`,
  );

  // Test 1: Basic CLI mode with method
  await runBasicTest(
    "basic_cli_mode",
    TEST_CMD,
    ...TEST_ARGS,
    "--cli",
    "--method",
    "tools/list",
  );

  // Test 2: CLI mode with non-existent method (should fail)
  await runErrorTest(
    "nonexistent_method",
    TEST_CMD,
    ...TEST_ARGS,
    "--cli",
    "--method",
    "nonexistent/method",
  );

  // Test 3: CLI mode without method (should fail)
  await runErrorTest("missing_method", TEST_CMD, ...TEST_ARGS, "--cli");

  console.log(
    `\n${colors.YELLOW}=== Running Environment Variable Tests ===${colors.NC}`,
  );

  // Test 4: CLI mode with environment variables
  await runBasicTest(
    "env_variables",
    TEST_CMD,
    ...TEST_ARGS,
    "-e",
    "KEY1=value1",
    "-e",
    "KEY2=value2",
    "--cli",
    "--method",
    "tools/list",
  );

  // Test 5: CLI mode with invalid environment variable format (should fail)
  await runErrorTest(
    "invalid_env_format",
    TEST_CMD,
    ...TEST_ARGS,
    "-e",
    "INVALID_FORMAT",
    "--cli",
    "--method",
    "tools/list",
  );

  // Test 5b: CLI mode with environment variable containing equals sign in value
  await runBasicTest(
    "env_variable_with_equals",
    TEST_CMD,
    ...TEST_ARGS,
    "-e",
    "API_KEY=abc123=xyz789==",
    "--cli",
    "--method",
    "tools/list",
  );

  // Test 5c: CLI mode with environment variable containing base64-encoded value
  await runBasicTest(
    "env_variable_with_base64",
    TEST_CMD,
    ...TEST_ARGS,
    "-e",
    "JWT_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0=",
    "--cli",
    "--method",
    "tools/list",
  );

  console.log(
    `\n${colors.YELLOW}=== Running Config File Tests ===${colors.NC}`,
  );

  // Test 6: Using config file with CLI mode
  await runBasicTest(
    "config_file",
    "--config",
    path.join(PROJECT_ROOT, "sample-config.json"),
    "--server",
    "everything",
    "--cli",
    "--method",
    "tools/list",
  );

  // Test 7: Using config file without server name (should fail)
  await runErrorTest(
    "config_without_server",
    "--config",
    path.join(PROJECT_ROOT, "sample-config.json"),
    "--cli",
    "--method",
    "tools/list",
  );

  // Test 8: Using server name without config file (should fail)
  await runErrorTest(
    "server_without_config",
    "--server",
    "everything",
    "--cli",
    "--method",
    "tools/list",
  );

  // Test 9: Using non-existent config file (should fail)
  await runErrorTest(
    "nonexistent_config",
    "--config",
    "./nonexistent-config.json",
    "--server",
    "everything",
    "--cli",
    "--method",
    "tools/list",
  );

  // Test 10: Using invalid config file format (should fail)
  await runErrorTest(
    "invalid_config",
    "--config",
    invalidConfigPath,
    "--server",
    "everything",
    "--cli",
    "--method",
    "tools/list",
  );

  // Test 11: Using config file with non-existent server (should fail)
  await runErrorTest(
    "nonexistent_server",
    "--config",
    path.join(PROJECT_ROOT, "sample-config.json"),
    "--server",
    "nonexistent",
    "--cli",
    "--method",
    "tools/list",
  );

  console.log(
    `\n${colors.YELLOW}=== Running Tool-Related Tests ===${colors.NC}`,
  );

  // Test 12: CLI mode with tool call
  await runBasicTest(
    "tool_call",
    TEST_CMD,
    ...TEST_ARGS,
    "--cli",
    "--method",
    "tools/call",
    "--tool-name",
    "echo",
    "--tool-arg",
    "message=Hello",
  );

  // Test 13: CLI mode with tool call but missing tool name (should fail)
  await runErrorTest(
    "missing_tool_name",
    TEST_CMD,
    ...TEST_ARGS,
    "--cli",
    "--method",
    "tools/call",
    "--tool-arg",
    "message=Hello",
  );

  // Test 14: CLI mode with tool call but invalid tool args format (should fail)
  await runErrorTest(
    "invalid_tool_args",
    TEST_CMD,
    ...TEST_ARGS,
    "--cli",
    "--method",
    "tools/call",
    "--tool-name",
    "echo",
    "--tool-arg",
    "invalid_format",
  );

  // Test 15: CLI mode with multiple tool args
  await runBasicTest(
    "multiple_tool_args",
    TEST_CMD,
    ...TEST_ARGS,
    "--cli",
    "--method",
    "tools/call",
    "--tool-name",
    "add",
    "--tool-arg",
    "a=1",
    "b=2",
  );

  console.log(
    `\n${colors.YELLOW}=== Running Resource-Related Tests ===${colors.NC}`,
  );

  // Test 16: CLI mode with resource read
  await runBasicTest(
    "resource_read",
    TEST_CMD,
    ...TEST_ARGS,
    "--cli",
    "--method",
    "resources/read",
    "--uri",
    "test://static/resource/1",
  );

  // Test 17: CLI mode with resource read but missing URI (should fail)
  await runErrorTest(
    "missing_uri",
    TEST_CMD,
    ...TEST_ARGS,
    "--cli",
    "--method",
    "resources/read",
  );

  console.log(
    `\n${colors.YELLOW}=== Running Prompt-Related Tests ===${colors.NC}`,
  );

  // Test 18: CLI mode with prompt get
  await runBasicTest(
    "prompt_get",
    TEST_CMD,
    ...TEST_ARGS,
    "--cli",
    "--method",
    "prompts/get",
    "--prompt-name",
    "simple_prompt",
  );

  // Test 19: CLI mode with prompt get and args
  await runBasicTest(
    "prompt_get_with_args",
    TEST_CMD,
    ...TEST_ARGS,
    "--cli",
    "--method",
    "prompts/get",
    "--prompt-name",
    "complex_prompt",
    "--prompt-args",
    "temperature=0.7",
    "style=concise",
  );

  // Test 20: CLI mode with prompt get but missing prompt name (should fail)
  await runErrorTest(
    "missing_prompt_name",
    TEST_CMD,
    ...TEST_ARGS,
    "--cli",
    "--method",
    "prompts/get",
  );

  console.log(`\n${colors.YELLOW}=== Running Logging Tests ===${colors.NC}`);

  // Test 21: CLI mode with log level
  await runBasicTest(
    "log_level",
    TEST_CMD,
    ...TEST_ARGS,
    "--cli",
    "--method",
    "logging/setLevel",
    "--log-level",
    "debug",
  );

  // Test 22: CLI mode with invalid log level (should fail)
  await runErrorTest(
    "invalid_log_level",
    TEST_CMD,
    ...TEST_ARGS,
    "--cli",
    "--method",
    "logging/setLevel",
    "--log-level",
    "invalid",
  );

  console.log(
    `\n${colors.YELLOW}=== Running Combined Option Tests ===${colors.NC}`,
  );

  // Note about the combined options issue
  console.log(
    `${colors.BLUE}Testing combined options with environment variables and config file.${colors.NC}`,
  );

  // Test 23: CLI mode with config file, environment variables, and tool call
  await runBasicTest(
    "combined_options",
    "--config",
    path.join(PROJECT_ROOT, "sample-config.json"),
    "--server",
    "everything",
    "-e",
    "CLI_ENV_VAR=cli_value",
    "--cli",
    "--method",
    "tools/list",
  );

  // Test 24: CLI mode with all possible options (that make sense together)
  await runBasicTest(
    "all_options",
    "--config",
    path.join(PROJECT_ROOT, "sample-config.json"),
    "--server",
    "everything",
    "-e",
    "CLI_ENV_VAR=cli_value",
    "--cli",
    "--method",
    "tools/call",
    "--tool-name",
    "echo",
    "--tool-arg",
    "message=Hello",
    "--log-level",
    "debug",
  );

  // Print test summary
  console.log(`\n${colors.YELLOW}=== Test Summary ===${colors.NC}`);
  console.log(`${colors.GREEN}Passed: ${PASSED_TESTS}${colors.NC}`);
  console.log(`${colors.RED}Failed: ${FAILED_TESTS}${colors.NC}`);
  console.log(`${colors.ORANGE}Skipped: ${SKIPPED_TESTS}${colors.NC}`);
  console.log(`Total: ${TOTAL_TESTS}`);
  console.log(
    `${colors.BLUE}Detailed logs saved to: ${OUTPUT_DIR}${colors.NC}`,
  );

  console.log(`\n${colors.GREEN}All tests completed!${colors.NC}`);
}

// Run all tests
runTests().catch((error) => {
  console.error(
    `${colors.RED}Tests failed with error: ${error.message}${colors.NC}`,
  );
  process.exit(1);
});



================================================
FILE: cli/scripts/make-executable.js
================================================
/**
 * Cross-platform script to make a file executable
 */
import { promises as fs } from "fs";
import { platform } from "os";
import { execSync } from "child_process";
import path from "path";

const TARGET_FILE = path.resolve("build/cli.js");

async function makeExecutable() {
  try {
    // On Unix-like systems (Linux, macOS), use chmod
    if (platform() !== "win32") {
      execSync(`chmod +x "${TARGET_FILE}"`);
      console.log("Made file executable with chmod");
    } else {
      // On Windows, no need to make files "executable" in the Unix sense
      // Just ensure the file exists
      await fs.access(TARGET_FILE);
      console.log("File exists and is accessible on Windows");
    }
  } catch (error) {
    console.error("Error making file executable:", error);
    process.exit(1);
  }
}

makeExecutable();



================================================
FILE: cli/src/cli.ts
================================================
#!/usr/bin/env node

import { Command } from "commander";
import fs from "node:fs";
import path from "node:path";
import { dirname, resolve } from "path";
import { spawnPromise } from "spawn-rx";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

type Args = {
  command: string;
  args: string[];
  envArgs: Record<string, string>;
  cli: boolean;
};

type CliOptions = {
  e?: Record<string, string>;
  config?: string;
  server?: string;
  cli?: boolean;
};

type ServerConfig = {
  command: string;
  args?: string[];
  env?: Record<string, string>;
};

function handleError(error: unknown): never {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Unknown error";
  }

  console.error(message);

  process.exit(1);
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms, true));
}

async function runWebClient(args: Args): Promise<void> {
  const inspectorServerPath = resolve(
    __dirname,
    "../../",
    "server",
    "build",
    "index.js",
  );

  // Path to the client entry point
  const inspectorClientPath = resolve(
    __dirname,
    "../../",
    "client",
    "bin",
    "client.js",
  );

  const CLIENT_PORT: string = process.env.CLIENT_PORT ?? "6274";
  const SERVER_PORT: string = process.env.SERVER_PORT ?? "6277";

  console.log("Starting MCP inspector...");

  const abort = new AbortController();
  let cancelled: boolean = false;
  process.on("SIGINT", () => {
    cancelled = true;
    abort.abort();
  });

  let server: ReturnType<typeof spawnPromise>;
  let serverOk: unknown;

  try {
    server = spawnPromise(
      "node",
      [
        inspectorServerPath,
        ...(args.command ? [`--env`, args.command] : []),
        ...(args.args ? [`--args=${args.args.join(" ")}`] : []),
      ],
      {
        env: {
          ...process.env,
          PORT: SERVER_PORT,
          MCP_ENV_VARS: JSON.stringify(args.envArgs),
        },
        signal: abort.signal,
        echoOutput: true,
      },
    );

    // Make sure server started before starting client
    serverOk = await Promise.race([server, delay(2 * 1000)]);
  } catch (error) {}

  if (serverOk) {
    try {
      await spawnPromise("node", [inspectorClientPath], {
        env: { ...process.env, PORT: CLIENT_PORT },
        signal: abort.signal,
        echoOutput: true,
      });
    } catch (e) {
      if (!cancelled || process.env.DEBUG) throw e;
    }
  }
}

async function runCli(args: Args): Promise<void> {
  const projectRoot = resolve(__dirname, "..");
  const cliPath = resolve(projectRoot, "build", "index.js");

  const abort = new AbortController();

  let cancelled = false;

  process.on("SIGINT", () => {
    cancelled = true;
    abort.abort();
  });

  try {
    await spawnPromise("node", [cliPath, args.command, ...args.args], {
      env: { ...process.env, ...args.envArgs },
      signal: abort.signal,
      echoOutput: true,
    });
  } catch (e) {
    if (!cancelled || process.env.DEBUG) {
      throw e;
    }
  }
}

function loadConfigFile(configPath: string, serverName: string): ServerConfig {
  try {
    const resolvedConfigPath = path.isAbsolute(configPath)
      ? configPath
      : path.resolve(process.cwd(), configPath);

    if (!fs.existsSync(resolvedConfigPath)) {
      throw new Error(`Config file not found: ${resolvedConfigPath}`);
    }

    const configContent = fs.readFileSync(resolvedConfigPath, "utf8");
    const parsedConfig = JSON.parse(configContent);

    if (!parsedConfig.mcpServers || !parsedConfig.mcpServers[serverName]) {
      const availableServers = Object.keys(parsedConfig.mcpServers || {}).join(
        ", ",
      );
      throw new Error(
        `Server '${serverName}' not found in config file. Available servers: ${availableServers}`,
      );
    }

    const serverConfig = parsedConfig.mcpServers[serverName];

    return serverConfig;
  } catch (err: unknown) {
    if (err instanceof SyntaxError) {
      throw new Error(`Invalid JSON in config file: ${err.message}`);
    }

    throw err;
  }
}

function parseKeyValuePair(
  value: string,
  previous: Record<string, string> = {},
): Record<string, string> {
  const parts = value.split("=");
  const key = parts[0];
  const val = parts.slice(1).join("=");

  if (val === undefined || val === "") {
    throw new Error(
      `Invalid parameter format: ${value}. Use key=value format.`,
    );
  }

  return { ...previous, [key as string]: val };
}

function parseArgs(): Args {
  const program = new Command();

  const argSeparatorIndex = process.argv.indexOf("--");
  let preArgs = process.argv;
  let postArgs: string[] = [];

  if (argSeparatorIndex !== -1) {
    preArgs = process.argv.slice(0, argSeparatorIndex);
    postArgs = process.argv.slice(argSeparatorIndex + 1);
  }

  program
    .name("inspector-bin")
    .allowExcessArguments()
    .allowUnknownOption()
    .option(
      "-e <env>",
      "environment variables in KEY=VALUE format",
      parseKeyValuePair,
      {},
    )
    .option("--config <path>", "config file path")
    .option("--server <n>", "server name from config file")
    .option("--cli", "enable CLI mode");

  // Parse only the arguments before --
  program.parse(preArgs);

  const options = program.opts() as CliOptions;
  const remainingArgs = program.args;

  // Add back any arguments that came after --
  const finalArgs = [...remainingArgs, ...postArgs];

  // Validate that config and server are provided together
  if (
    (options.config && !options.server) ||
    (!options.config && options.server)
  ) {
    throw new Error(
      "Both --config and --server must be provided together. If you specify one, you must specify the other.",
    );
  }

  // If config file is specified, load and use the options from the file. We must merge the args
  // from the command line and the file together, or we will miss the method options (--method,
  // etc.)
  if (options.config && options.server) {
    const config = loadConfigFile(options.config, options.server);

    return {
      command: config.command,
      args: [...(config.args || []), ...finalArgs],
      envArgs: { ...(config.env || {}), ...(options.e || {}) },
      cli: options.cli || false,
    };
  }

  // Otherwise use command line arguments
  const command = finalArgs[0] || "";
  const args = finalArgs.slice(1);

  return {
    command,
    args,
    envArgs: options.e || {},
    cli: options.cli || false,
  };
}

async function main(): Promise<void> {
  process.on("uncaughtException", (error) => {
    handleError(error);
  });

  try {
    const args = parseArgs();

    if (args.cli) {
      runCli(args);
    } else {
      await runWebClient(args);
    }
  } catch (error) {
    handleError(error);
  }
}

main();



================================================
FILE: cli/src/error-handler.ts
================================================
function formatError(error: unknown): string {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Unknown error";
  }

  return message;
}

export function handleError(error: unknown): never {
  const errorMessage = formatError(error);
  console.error(errorMessage);

  process.exit(1);
}



================================================
FILE: cli/src/index.ts
================================================
#!/usr/bin/env node

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { Command } from "commander";
import {
  callTool,
  connect,
  disconnect,
  getPrompt,
  listPrompts,
  listResources,
  listResourceTemplates,
  listTools,
  LogLevel,
  McpResponse,
  readResource,
  setLoggingLevel,
  validLogLevels,
} from "./client/index.js";
import { handleError } from "./error-handler.js";
import { createTransport, TransportOptions } from "./transport.js";

type Args = {
  target: string[];
  method?: string;
  promptName?: string;
  promptArgs?: Record<string, string>;
  uri?: string;
  logLevel?: LogLevel;
  toolName?: string;
  toolArg?: Record<string, string>;
};

function createTransportOptions(target: string[]): TransportOptions {
  if (target.length === 0) {
    throw new Error(
      "Target is required. Specify a URL or a command to execute.",
    );
  }

  const [command, ...commandArgs] = target;

  if (!command) {
    throw new Error("Command is required.");
  }

  const isUrl = command.startsWith("http://") || command.startsWith("https://");

  if (isUrl && commandArgs.length > 0) {
    throw new Error("Arguments cannot be passed to a URL-based MCP server.");
  }

  return {
    transportType: isUrl ? "sse" : "stdio",
    command: isUrl ? undefined : command,
    args: isUrl ? undefined : commandArgs,
    url: isUrl ? command : undefined,
  };
}

async function callMethod(args: Args): Promise<void> {
  const transportOptions = createTransportOptions(args.target);
  const transport = createTransport(transportOptions);
  const client = new Client({
    name: "inspector-cli",
    version: "0.5.1",
  });

  try {
    await connect(client, transport);

    let result: McpResponse;

    // Tools methods
    if (args.method === "tools/list") {
      result = await listTools(client);
    } else if (args.method === "tools/call") {
      if (!args.toolName) {
        throw new Error(
          "Tool name is required for tools/call method. Use --tool-name to specify the tool name.",
        );
      }

      result = await callTool(client, args.toolName, args.toolArg || {});
    }
    // Resources methods
    else if (args.method === "resources/list") {
      result = await listResources(client);
    } else if (args.method === "resources/read") {
      if (!args.uri) {
        throw new Error(
          "URI is required for resources/read method. Use --uri to specify the resource URI.",
        );
      }

      result = await readResource(client, args.uri);
    } else if (args.method === "resources/templates/list") {
      result = await listResourceTemplates(client);
    }
    // Prompts methods
    else if (args.method === "prompts/list") {
      result = await listPrompts(client);
    } else if (args.method === "prompts/get") {
      if (!args.promptName) {
        throw new Error(
          "Prompt name is required for prompts/get method. Use --prompt-name to specify the prompt name.",
        );
      }

      result = await getPrompt(client, args.promptName, args.promptArgs || {});
    }
    // Logging methods
    else if (args.method === "logging/setLevel") {
      if (!args.logLevel) {
        throw new Error(
          "Log level is required for logging/setLevel method. Use --log-level to specify the log level.",
        );
      }

      result = await setLoggingLevel(client, args.logLevel);
    } else {
      throw new Error(
        `Unsupported method: ${args.method}. Supported methods include: tools/list, tools/call, resources/list, resources/read, resources/templates/list, prompts/list, prompts/get, logging/setLevel`,
      );
    }

    console.log(JSON.stringify(result, null, 2));
  } finally {
    try {
      await disconnect(transport);
    } catch (disconnectError) {
      throw disconnectError;
    }
  }
}

function parseKeyValuePair(
  value: string,
  previous: Record<string, string> = {},
): Record<string, string> {
  const parts = value.split("=");
  const key = parts[0];
  const val = parts.slice(1).join("=");

  if (val === undefined || val === "") {
    throw new Error(
      `Invalid parameter format: ${value}. Use key=value format.`,
    );
  }

  return { ...previous, [key as string]: val };
}

function parseArgs(): Args {
  const program = new Command();

  // Find if there's a -- in the arguments and split them
  const argSeparatorIndex = process.argv.indexOf("--");
  let preArgs = process.argv;
  let postArgs: string[] = [];

  if (argSeparatorIndex !== -1) {
    preArgs = process.argv.slice(0, argSeparatorIndex);
    postArgs = process.argv.slice(argSeparatorIndex + 1);
  }

  program
    .name("inspector-cli")
    .allowUnknownOption()
    .argument("<target...>", "Command and arguments or URL of the MCP server")
    //
    // Method selection
    //
    .option("--method <method>", "Method to invoke")
    //
    // Tool-related options
    //
    .option("--tool-name <toolName>", "Tool name (for tools/call method)")
    .option(
      "--tool-arg <pairs...>",
      "Tool argument as key=value pair",
      parseKeyValuePair,
      {},
    )
    //
    // Resource-related options
    //
    .option("--uri <uri>", "URI of the resource (for resources/read method)")
    //
    // Prompt-related options
    //
    .option(
      "--prompt-name <promptName>",
      "Name of the prompt (for prompts/get method)",
    )
    .option(
      "--prompt-args <pairs...>",
      "Prompt arguments as key=value pairs",
      parseKeyValuePair,
      {},
    )
    //
    // Logging options
    //
    .option(
      "--log-level <level>",
      "Logging level (for logging/setLevel method)",
      (value: string) => {
        if (!validLogLevels.includes(value as any)) {
          throw new Error(
            `Invalid log level: ${value}. Valid levels are: ${validLogLevels.join(", ")}`,
          );
        }

        return value as LogLevel;
      },
    );

  // Parse only the arguments before --
  program.parse(preArgs);

  const options = program.opts() as Omit<Args, "target">;
  let remainingArgs = program.args;

  // Add back any arguments that came after --
  const finalArgs = [...remainingArgs, ...postArgs];

  if (!options.method) {
    throw new Error(
      "Method is required. Use --method to specify the method to invoke.",
    );
  }

  return {
    target: finalArgs,
    ...options,
  };
}

async function main(): Promise<void> {
  process.on("uncaughtException", (error) => {
    handleError(error);
  });

  try {
    const args = parseArgs();
    await callMethod(args);
  } catch (error) {
    handleError(error);
  }
}

main();



================================================
FILE: cli/src/transport.ts
================================================
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";
import {
  getDefaultEnvironment,
  StdioClientTransport,
} from "@modelcontextprotocol/sdk/client/stdio.js";
import type { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import { findActualExecutable } from "spawn-rx";

export type TransportOptions = {
  transportType: "sse" | "stdio";
  command?: string;
  args?: string[];
  url?: string;
};

function createSSETransport(options: TransportOptions): Transport {
  const baseUrl = new URL(options.url ?? "");
  const sseUrl = new URL("/sse", baseUrl);

  return new SSEClientTransport(sseUrl);
}

function createStdioTransport(options: TransportOptions): Transport {
  let args: string[] = [];

  if (options.args !== undefined) {
    args = options.args;
  }

  const processEnv: Record<string, string> = {};

  for (const [key, value] of Object.entries(process.env)) {
    if (value !== undefined) {
      processEnv[key] = value;
    }
  }

  const defaultEnv = getDefaultEnvironment();

  const env: Record<string, string> = {
    ...processEnv,
    ...defaultEnv,
  };

  const { cmd: actualCommand, args: actualArgs } = findActualExecutable(
    options.command ?? "",
    args,
  );

  return new StdioClientTransport({
    command: actualCommand,
    args: actualArgs,
    env,
    stderr: "pipe",
  });
}

export function createTransport(options: TransportOptions): Transport {
  const { transportType } = options;

  try {
    if (transportType === "stdio") {
      return createStdioTransport(options);
    }

    if (transportType === "sse") {
      return createSSETransport(options);
    }

    throw new Error(`Unsupported transport type: ${transportType}`);
  } catch (error) {
    throw new Error(
      `Failed to create transport: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}



================================================
FILE: cli/src/client/connection.ts
================================================
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import type { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import { McpResponse } from "./types.js";

export const validLogLevels = [
  "trace",
  "debug",
  "info",
  "warn",
  "error",
] as const;

export type LogLevel = (typeof validLogLevels)[number];

export async function connect(
  client: Client,
  transport: Transport,
): Promise<void> {
  try {
    await client.connect(transport);
  } catch (error) {
    throw new Error(
      `Failed to connect to MCP server: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

export async function disconnect(transport: Transport): Promise<void> {
  try {
    await transport.close();
  } catch (error) {
    throw new Error(
      `Failed to disconnect from MCP server: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

// Set logging level
export async function setLoggingLevel(
  client: Client,
  level: LogLevel,
): Promise<McpResponse> {
  try {
    const response = await client.setLoggingLevel(level as any);
    return response;
  } catch (error) {
    throw new Error(
      `Failed to set logging level: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}



================================================
FILE: cli/src/client/index.ts
================================================
// Re-export everything from the client modules
export * from "./connection.js";
export * from "./prompts.js";
export * from "./resources.js";
export * from "./tools.js";
export * from "./types.js";



================================================
FILE: cli/src/client/prompts.ts
================================================
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { McpResponse } from "./types.js";

// List available prompts
export async function listPrompts(client: Client): Promise<McpResponse> {
  try {
    const response = await client.listPrompts();
    return response;
  } catch (error) {
    throw new Error(
      `Failed to list prompts: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

// Get a prompt
export async function getPrompt(
  client: Client,
  name: string,
  args?: Record<string, string>,
): Promise<McpResponse> {
  try {
    const response = await client.getPrompt({
      name,
      arguments: args || {},
    });

    return response;
  } catch (error) {
    throw new Error(
      `Failed to get prompt: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}



================================================
FILE: cli/src/client/resources.ts
================================================
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { McpResponse } from "./types.js";

// List available resources
export async function listResources(client: Client): Promise<McpResponse> {
  try {
    const response = await client.listResources();
    return response;
  } catch (error) {
    throw new Error(
      `Failed to list resources: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

// Read a resource
export async function readResource(
  client: Client,
  uri: string,
): Promise<McpResponse> {
  try {
    const response = await client.readResource({ uri });
    return response;
  } catch (error) {
    throw new Error(
      `Failed to read resource ${uri}: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

// List resource templates
export async function listResourceTemplates(
  client: Client,
): Promise<McpResponse> {
  try {
    const response = await client.listResourceTemplates();
    return response;
  } catch (error) {
    throw new Error(
      `Failed to list resource templates: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}



================================================
FILE: cli/src/client/tools.ts
================================================
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { McpResponse } from "./types.js";

type JsonSchemaType = {
  type: "string" | "number" | "integer" | "boolean" | "array" | "object";
  description?: string;
  properties?: Record<string, JsonSchemaType>;
  items?: JsonSchemaType;
};

export async function listTools(client: Client): Promise<McpResponse> {
  try {
    const response = await client.listTools();
    return response;
  } catch (error) {
    throw new Error(
      `Failed to list tools: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

function convertParameterValue(value: string, schema: JsonSchemaType): unknown {
  if (!value) {
    return value;
  }

  if (schema.type === "number" || schema.type === "integer") {
    return Number(value);
  }

  if (schema.type === "boolean") {
    return value.toLowerCase() === "true";
  }

  if (schema.type === "object" || schema.type === "array") {
    try {
      return JSON.parse(value);
    } catch (error) {
      return value;
    }
  }

  return value;
}

function convertParameters(
  tool: Tool,
  params: Record<string, string>,
): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  const properties = tool.inputSchema.properties || {};

  for (const [key, value] of Object.entries(params)) {
    const paramSchema = properties[key] as JsonSchemaType | undefined;

    if (paramSchema) {
      result[key] = convertParameterValue(value, paramSchema);
    } else {
      // If no schema is found for this parameter, keep it as string
      result[key] = value;
    }
  }

  return result;
}

export async function callTool(
  client: Client,
  name: string,
  args: Record<string, string>,
): Promise<McpResponse> {
  try {
    const toolsResponse = await listTools(client);
    const tools = toolsResponse.tools as Tool[];
    const tool = tools.find((t) => t.name === name);

    let convertedArgs: Record<string, unknown> = args;

    if (tool) {
      // Convert parameters based on the tool's schema
      convertedArgs = convertParameters(tool, args);
    }

    const response = await client.callTool({
      name: name,
      arguments: convertedArgs,
    });
    return response;
  } catch (error) {
    throw new Error(
      `Failed to call tool ${name}: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}



================================================
FILE: cli/src/client/types.ts
================================================
export type McpResponse = Record<string, unknown>;



================================================
FILE: client/README.md
================================================
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```



================================================
FILE: client/components.json
================================================
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/index.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}



================================================
FILE: client/eslint.config.js
================================================
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
);



================================================
FILE: client/index.html
================================================
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/mcp.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MCP Inspector</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>



================================================
FILE: client/jest.config.cjs
================================================
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-fixed-jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.css$": "<rootDir>/src/__mocks__/styleMock.js",
  },
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        jsx: "react-jsx",
        tsconfig: "tsconfig.jest.json",
      },
    ],
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  // Exclude directories and files that don't need to be tested
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/bin/",
    "\\.config\\.(js|ts|cjs|mjs)$",
  ],
  // Exclude the same patterns from coverage reports
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/bin/",
    "\\.config\\.(js|ts|cjs|mjs)$",
  ],
};



================================================
FILE: client/package.json
================================================
{
  "name": "@modelcontextprotocol/inspector-client",
  "version": "0.12.0",
  "description": "Client-side application for the Model Context Protocol inspector",
  "license": "MIT",
  "author": "Anthropic, PBC (https://anthropic.com)",
  "homepage": "https://modelcontextprotocol.io",
  "bugs": "https://github.com/modelcontextprotocol/inspector/issues",
  "type": "module",
  "bin": {
    "mcp-inspector-client": "./bin/start.js"
  },
  "files": [
    "bin",
    "dist"
  ],
  "scripts": {
    "dev": "vite --port 6274",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview --port 6274",
    "test": "jest --config jest.config.cjs",
    "test:watch": "jest --config jest.config.cjs --watch"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.11.0",
    "@radix-ui/react-checkbox": "^1.1.4",
    "@radix-ui/react-dialog": "^1.1.3",
    "@radix-ui/react-icons": "^1.3.0",
    "@radix-ui/react-label": "^2.1.0",
    "@radix-ui/react-popover": "^1.1.3",
    "@radix-ui/react-select": "^2.1.2",
    "@radix-ui/react-slot": "^1.1.0",
    "@radix-ui/react-tabs": "^1.1.1",
    "@radix-ui/react-toast": "^1.2.6",
    "@radix-ui/react-tooltip": "^1.1.8",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "cmdk": "^1.0.4",
    "lucide-react": "^0.447.0",
    "pkce-challenge": "^4.1.0",
    "prismjs": "^1.30.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-simple-code-editor": "^0.14.1",
    "serve-handler": "^6.1.6",
    "tailwind-merge": "^2.5.3",
    "tailwindcss-animate": "^1.0.7",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@eslint/js": "^9.11.1",
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.2.0",
    "@types/jest": "^29.5.14",
    "@types/node": "^22.7.5",
    "@types/prismjs": "^1.26.5",
    "@types/react": "^18.3.10",
    "@types/react-dom": "^18.3.0",
    "@types/serve-handler": "^6.1.4",
    "@vitejs/plugin-react": "^4.3.2",
    "autoprefixer": "^10.4.20",
    "co": "^4.6.0",
    "eslint": "^9.11.1",
    "eslint-plugin-react-hooks": "^5.1.0-rc.0",
    "eslint-plugin-react-refresh": "^0.4.12",
    "globals": "^15.9.0",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.13",
    "ts-jest": "^29.2.6",
    "typescript": "^5.5.3",
    "typescript-eslint": "^8.7.0",
    "vite": "^6.3.0"
  }
}



================================================
FILE: client/postcss.config.js
================================================
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};



================================================
FILE: client/tailwind.config.js
================================================
/** @type {import('tailwindcss').Config} */
import animate from "tailwindcss-animate";
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [animate],
};



================================================
FILE: client/tsconfig.app.json
================================================
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },

    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "resolveJsonModule": true,
    "types": ["jest", "@testing-library/jest-dom", "node"]
  },
  "include": ["src"]
}



================================================
FILE: client/tsconfig.jest.json
================================================
{
  "extends": "./tsconfig.app.json",
  "compilerOptions": {
    "jsx": "react-jsx",
    "esModuleInterop": true,
    "module": "ESNext",
    "moduleResolution": "node"
  },
  "include": ["src"]
}



================================================
FILE: client/tsconfig.json
================================================
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}



================================================
FILE: client/tsconfig.node.json
================================================
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}



================================================
FILE: client/vite.config.ts
================================================
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    minify: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});



================================================
FILE: client/.gitignore
================================================
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?



================================================
FILE: client/bin/client.js
================================================
#!/usr/bin/env node

import { join, dirname } from "path";
import { fileURLToPath } from "url";
import handler from "serve-handler";
import http from "http";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distPath = join(__dirname, "../dist");

const server = http.createServer((request, response) => {
  const handlerOptions = {
    public: distPath,
    rewrites: [{ source: "/**", destination: "/index.html" }],
    headers: [
      {
        // Ensure index.html is never cached
        source: "index.html",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, max-age=0",
          },
        ],
      },
      {
        // Allow long-term caching for hashed assets
        source: "assets/**",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ],
  };

  return handler(request, response, handlerOptions);
});

const port = process.env.PORT || 6274;
server.on("listening", () => {
  console.log(
    `🔍 MCP Inspector is up and running at http://127.0.0.1:${port} 🚀`,
  );
});
server.on("error", (err) => {
  if (err.message.includes(`EADDRINUSE`)) {
    console.error(
      `❌  MCP Inspector PORT IS IN USE at http://127.0.0.1:${port} ❌ `,
    );
  } else {
    throw err;
  }
});
server.listen(port);



================================================
FILE: client/bin/start.js
================================================
#!/usr/bin/env node

import { resolve, dirname } from "path";
import { spawnPromise } from "spawn-rx";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms, true));
}

async function main() {
  // Parse command line arguments
  const args = process.argv.slice(2);
  const envVars = {};
  const mcpServerArgs = [];
  let command = null;
  let parsingFlags = true;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (parsingFlags && arg === "--") {
      parsingFlags = false;
      continue;
    }

    if (parsingFlags && arg === "-e" && i + 1 < args.length) {
      const envVar = args[++i];
      const equalsIndex = envVar.indexOf("=");

      if (equalsIndex !== -1) {
        const key = envVar.substring(0, equalsIndex);
        const value = envVar.substring(equalsIndex + 1);
        envVars[key] = value;
      } else {
        envVars[envVar] = "";
      }
    } else if (!command) {
      command = arg;
    } else {
      mcpServerArgs.push(arg);
    }
  }

  const inspectorServerPath = resolve(
    __dirname,
    "../..",
    "server",
    "build",
    "index.js",
  );

  // Path to the client entry point
  const inspectorClientPath = resolve(
    __dirname,
    "../..",
    "client",
    "bin",
    "client.js",
  );

  const CLIENT_PORT = process.env.CLIENT_PORT ?? "6274";
  const SERVER_PORT = process.env.SERVER_PORT ?? "6277";

  console.log("Starting MCP inspector...");

  const abort = new AbortController();

  let cancelled = false;
  process.on("SIGINT", () => {
    cancelled = true;
    abort.abort();
  });
  let server, serverOk;
  try {
    server = spawnPromise(
      "node",
      [
        inspectorServerPath,
        ...(command ? [`--env`, command] : []),
        ...(mcpServerArgs ? [`--args=${mcpServerArgs.join(" ")}`] : []),
      ],
      {
        env: {
          ...process.env,
          PORT: SERVER_PORT,
          MCP_ENV_VARS: JSON.stringify(envVars),
        },
        signal: abort.signal,
        echoOutput: true,
      },
    );

    // Make sure server started before starting client
    serverOk = await Promise.race([server, delay(2 * 1000)]);
  } catch (error) {}

  if (serverOk) {
    try {
      await spawnPromise("node", [inspectorClientPath], {
        env: { ...process.env, PORT: CLIENT_PORT },
        signal: abort.signal,
        echoOutput: true,
      });
    } catch (e) {
      if (!cancelled || process.env.DEBUG) throw e;
    }
  }

  return 0;
}

main()
  .then((_) => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });




================================================
FILE: client/src/App.css
================================================
#root {
  margin: 0 auto;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

.card {
  padding: 2em;
}

.read-the-docs {
  color: #888;
}



================================================
FILE: client/src/App.tsx
================================================
import {
  ClientRequest,
  CompatibilityCallToolResult,
  CompatibilityCallToolResultSchema,
  CreateMessageResult,
  EmptyResultSchema,
  GetPromptResultSchema,
  ListPromptsResultSchema,
  ListResourcesResultSchema,
  ListResourceTemplatesResultSchema,
  ListToolsResultSchema,
  ReadResourceResultSchema,
  Resource,
  ResourceTemplate,
  Root,
  ServerNotification,
  Tool,
  LoggingLevel,
} from "@modelcontextprotocol/sdk/types.js";
import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useConnection } from "./lib/hooks/useConnection";
import { useDraggablePane } from "./lib/hooks/useDraggablePane";
import { StdErrNotification } from "./lib/notificationTypes";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  Files,
  FolderTree,
  Hammer,
  Hash,
  MessageSquare,
} from "lucide-react";

import { z } from "zod";
import "./App.css";
import ConsoleTab from "./components/ConsoleTab";
import HistoryAndNotifications from "./components/History";
import PingTab from "./components/PingTab";
import PromptsTab, { Prompt } from "./components/PromptsTab";
import ResourcesTab from "./components/ResourcesTab";
import RootsTab from "./components/RootsTab";
import SamplingTab, { PendingRequest } from "./components/SamplingTab";
import Sidebar from "./components/Sidebar";
import ToolsTab from "./components/ToolsTab";
import { DEFAULT_INSPECTOR_CONFIG } from "./lib/constants";
import { InspectorConfig } from "./lib/configurationTypes";
import { getMCPProxyAddress } from "./utils/configUtils";

const CONFIG_LOCAL_STORAGE_KEY = "inspectorConfig_v1";

const App = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [resourceTemplates, setResourceTemplates] = useState<
    ResourceTemplate[]
  >([]);
  const [resourceContent, setResourceContent] = useState<string>("");
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [promptContent, setPromptContent] = useState<string>("");
  const [tools, setTools] = useState<Tool[]>([]);
  const [toolResult, setToolResult] =
    useState<CompatibilityCallToolResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string | null>>({
    resources: null,
    prompts: null,
    tools: null,
  });
  const [command, setCommand] = useState<string>(() => {
    return localStorage.getItem("lastCommand") || "mcp-server-everything";
  });
  const [args, setArgs] = useState<string>(() => {
    return localStorage.getItem("lastArgs") || "";
  });

  const [sseUrl, setSseUrl] = useState<string>(() => {
    return localStorage.getItem("lastSseUrl") || "http://localhost:3001/sse";
  });
  const [transportType, setTransportType] = useState<
    "stdio" | "sse" | "streamable-http"
  >(() => {
    return (
      (localStorage.getItem("lastTransportType") as
        | "stdio"
        | "sse"
        | "streamable-http") || "stdio"
    );
  });
  const [logLevel, setLogLevel] = useState<LoggingLevel>("debug");
  const [notifications, setNotifications] = useState<ServerNotification[]>([]);
  const [stdErrNotifications, setStdErrNotifications] = useState<
    StdErrNotification[]
  >([]);
  const [roots, setRoots] = useState<Root[]>([]);
  const [env, setEnv] = useState<Record<string, string>>({});

  const [config, setConfig] = useState<InspectorConfig>(() => {
    const savedConfig = localStorage.getItem(CONFIG_LOCAL_STORAGE_KEY);
    if (savedConfig) {
      // merge default config with saved config
      const mergedConfig = {
        ...DEFAULT_INSPECTOR_CONFIG,
        ...JSON.parse(savedConfig),
      } as InspectorConfig;

      // update description of keys to match the new description (in case of any updates to the default config description)
      Object.entries(mergedConfig).forEach(([key, value]) => {
        mergedConfig[key as keyof InspectorConfig] = {
          ...value,
          label: DEFAULT_INSPECTOR_CONFIG[key as keyof InspectorConfig].label,
        };
      });

      return mergedConfig;
    }
    return DEFAULT_INSPECTOR_CONFIG;
  });
  const [bearerToken, setBearerToken] = useState<string>(() => {
    return localStorage.getItem("lastBearerToken") || "";
  });

  const [headerName, setHeaderName] = useState<string>(() => {
    return localStorage.getItem("lastHeaderName") || "";
  });

  const [pendingSampleRequests, setPendingSampleRequests] = useState<
    Array<
      PendingRequest & {
        resolve: (result: CreateMessageResult) => void;
        reject: (error: Error) => void;
      }
    >
  >([]);
  const nextRequestId = useRef(0);
  const rootsRef = useRef<Root[]>([]);

  const [selectedResource, setSelectedResource] = useState<Resource | null>(
    null,
  );
  const [resourceSubscriptions, setResourceSubscriptions] = useState<
    Set<string>
  >(new Set<string>());

  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [nextResourceCursor, setNextResourceCursor] = useState<
    string | undefined
  >();
  const [nextResourceTemplateCursor, setNextResourceTemplateCursor] = useState<
    string | undefined
  >();
  const [nextPromptCursor, setNextPromptCursor] = useState<
    string | undefined
  >();
  const [nextToolCursor, setNextToolCursor] = useState<string | undefined>();
  const progressTokenRef = useRef(0);

  const { height: historyPaneHeight, handleDragStart } = useDraggablePane(300);

  const {
    connectionStatus,
    serverCapabilities,
    mcpClient,
    requestHistory,
    makeRequest,
    sendNotification,
    handleCompletion,
    completionsSupported,
    connect: connectMcpServer,
    disconnect: disconnectMcpServer,
  } = useConnection({
    transportType,
    command,
    args,
    sseUrl,
    env,
    bearerToken,
    headerName,
    config,
    onNotification: (notification) => {
      setNotifications((prev) => [...prev, notification as ServerNotification]);
    },
    onStdErrNotification: (notification) => {
      setStdErrNotifications((prev) => [
        ...prev,
        notification as StdErrNotification,
      ]);
    },
    onPendingRequest: (request, resolve, reject) => {
      setPendingSampleRequests((prev) => [
        ...prev,
        { id: nextRequestId.current++, request, resolve, reject },
      ]);
    },
    getRoots: () => rootsRef.current,
  });

  useEffect(() => {
    localStorage.setItem("lastCommand", command);
  }, [command]);

  useEffect(() => {
    localStorage.setItem("lastArgs", args);
  }, [args]);

  useEffect(() => {
    localStorage.setItem("lastSseUrl", sseUrl);
  }, [sseUrl]);

  useEffect(() => {
    localStorage.setItem("lastTransportType", transportType);
  }, [transportType]);

  useEffect(() => {
    localStorage.setItem("lastBearerToken", bearerToken);
  }, [bearerToken]);

  useEffect(() => {
    localStorage.setItem("lastHeaderName", headerName);
  }, [headerName]);

  useEffect(() => {
    localStorage.setItem(CONFIG_LOCAL_STORAGE_KEY, JSON.stringify(config));
  }, [config]);

  // Auto-connect to previously saved serverURL after OAuth callback
  const onOAuthConnect = useCallback(
    (serverUrl: string) => {
      setSseUrl(serverUrl);
      setTransportType("sse");
      void connectMcpServer();
    },
    [connectMcpServer],
  );

  useEffect(() => {
    fetch(`${getMCPProxyAddress(config)}/config`)
      .then((response) => response.json())
      .then((data) => {
        setEnv(data.defaultEnvironment);
        if (data.defaultCommand) {
          setCommand(data.defaultCommand);
        }
        if (data.defaultArgs) {
          setArgs(data.defaultArgs);
        }
      })
      .catch((error) =>
        console.error("Error fetching default environment:", error),
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    rootsRef.current = roots;
  }, [roots]);

  useEffect(() => {
    if (!window.location.hash) {
      window.location.hash = "resources";
    }
  }, []);

  const handleApproveSampling = (id: number, result: CreateMessageResult) => {
    setPendingSampleRequests((prev) => {
      const request = prev.find((r) => r.id === id);
      request?.resolve(result);
      return prev.filter((r) => r.id !== id);
    });
  };

  const handleRejectSampling = (id: number) => {
    setPendingSampleRequests((prev) => {
      const request = prev.find((r) => r.id === id);
      request?.reject(new Error("Sampling request rejected"));
      return prev.filter((r) => r.id !== id);
    });
  };

  const clearError = (tabKey: keyof typeof errors) => {
    setErrors((prev) => ({ ...prev, [tabKey]: null }));
  };

  const sendMCPRequest = async <T extends z.ZodType>(
    request: ClientRequest,
    schema: T,
    tabKey?: keyof typeof errors,
  ) => {
    try {
      const response = await makeRequest(request, schema);
      if (tabKey !== undefined) {
        clearError(tabKey);
      }
      return response;
    } catch (e) {
      const errorString = (e as Error).message ?? String(e);
      if (tabKey !== undefined) {
        setErrors((prev) => ({
          ...prev,
          [tabKey]: errorString,
        }));
      }
      throw e;
    }
  };

  const listResources = async () => {
    const response = await sendMCPRequest(
      {
        method: "resources/list" as const,
        params: nextResourceCursor ? { cursor: nextResourceCursor } : {},
      },
      ListResourcesResultSchema,
      "resources",
    );
    setResources(resources.concat(response.resources ?? []));
    setNextResourceCursor(response.nextCursor);
  };

  const listResourceTemplates = async () => {
    const response = await sendMCPRequest(
      {
        method: "resources/templates/list" as const,
        params: nextResourceTemplateCursor
          ? { cursor: nextResourceTemplateCursor }
          : {},
      },
      ListResourceTemplatesResultSchema,
      "resources",
    );
    setResourceTemplates(
      resourceTemplates.concat(response.resourceTemplates ?? []),
    );
    setNextResourceTemplateCursor(response.nextCursor);
  };

  const readResource = async (uri: string) => {
    const response = await sendMCPRequest(
      {
        method: "resources/read" as const,
        params: { uri },
      },
      ReadResourceResultSchema,
      "resources",
    );
    setResourceContent(JSON.stringify(response, null, 2));
  };

  const subscribeToResource = async (uri: string) => {
    if (!resourceSubscriptions.has(uri)) {
      await sendMCPRequest(
        {
          method: "resources/subscribe" as const,
          params: { uri },
        },
        z.object({}),
        "resources",
      );
      const clone = new Set(resourceSubscriptions);
      clone.add(uri);
      setResourceSubscriptions(clone);
    }
  };

  const unsubscribeFromResource = async (uri: string) => {
    if (resourceSubscriptions.has(uri)) {
      await sendMCPRequest(
        {
          method: "resources/unsubscribe" as const,
          params: { uri },
        },
        z.object({}),
        "resources",
      );
      const clone = new Set(resourceSubscriptions);
      clone.delete(uri);
      setResourceSubscriptions(clone);
    }
  };

  const listPrompts = async () => {
    const response = await sendMCPRequest(
      {
        method: "prompts/list" as const,
        params: nextPromptCursor ? { cursor: nextPromptCursor } : {},
      },
      ListPromptsResultSchema,
      "prompts",
    );
    setPrompts(response.prompts);
    setNextPromptCursor(response.nextCursor);
  };

  const getPrompt = async (name: string, args: Record<string, string> = {}) => {
    const response = await sendMCPRequest(
      {
        method: "prompts/get" as const,
        params: { name, arguments: args },
      },
      GetPromptResultSchema,
      "prompts",
    );
    setPromptContent(JSON.stringify(response, null, 2));
  };

  const listTools = async () => {
    const response = await sendMCPRequest(
      {
        method: "tools/list" as const,
        params: nextToolCursor ? { cursor: nextToolCursor } : {},
      },
      ListToolsResultSchema,
      "tools",
    );
    setTools(response.tools);
    setNextToolCursor(response.nextCursor);
  };

  const callTool = async (name: string, params: Record<string, unknown>) => {
    try {
      const response = await sendMCPRequest(
        {
          method: "tools/call" as const,
          params: {
            name,
            arguments: params,
            _meta: {
              progressToken: progressTokenRef.current++,
            },
          },
        },
        CompatibilityCallToolResultSchema,
        "tools",
      );
      setToolResult(response);
    } catch (e) {
      const toolResult: CompatibilityCallToolResult = {
        content: [
          {
            type: "text",
            text: (e as Error).message ?? String(e),
          },
        ],
        isError: true,
      };
      setToolResult(toolResult);
    }
  };

  const handleRootsChange = async () => {
    await sendNotification({ method: "notifications/roots/list_changed" });
  };

  const sendLogLevelRequest = async (level: LoggingLevel) => {
    await sendMCPRequest(
      {
        method: "logging/setLevel" as const,
        params: { level },
      },
      z.object({}),
    );
    setLogLevel(level);
  };

  const clearStdErrNotifications = () => {
    setStdErrNotifications([]);
  };

  if (window.location.pathname === "/oauth/callback") {
    const OAuthCallback = React.lazy(
      () => import("./components/OAuthCallback"),
    );
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <OAuthCallback onConnect={onOAuthConnect} />
      </Suspense>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        connectionStatus={connectionStatus}
        transportType={transportType}
        setTransportType={setTransportType}
        command={command}
        setCommand={setCommand}
        args={args}
        setArgs={setArgs}
        sseUrl={sseUrl}
        setSseUrl={setSseUrl}
        env={env}
        setEnv={setEnv}
        config={config}
        setConfig={setConfig}
        bearerToken={bearerToken}
        setBearerToken={setBearerToken}
        headerName={headerName}
        setHeaderName={setHeaderName}
        onConnect={connectMcpServer}
        onDisconnect={disconnectMcpServer}
        stdErrNotifications={stdErrNotifications}
        logLevel={logLevel}
        sendLogLevelRequest={sendLogLevelRequest}
        loggingSupported={!!serverCapabilities?.logging || false}
        clearStdErrNotifications={clearStdErrNotifications}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto">
          {mcpClient ? (
            <Tabs
              defaultValue={
                Object.keys(serverCapabilities ?? {}).includes(
                  window.location.hash.slice(1),
                )
                  ? window.location.hash.slice(1)
                  : serverCapabilities?.resources
                    ? "resources"
                    : serverCapabilities?.prompts
                      ? "prompts"
                      : serverCapabilities?.tools
                        ? "tools"
                        : "ping"
              }
              className="w-full p-4"
              onValueChange={(value) => (window.location.hash = value)}
            >
              <TabsList className="mb-4 p-0">
                <TabsTrigger
                  value="resources"
                  disabled={!serverCapabilities?.resources}
                >
                  <Files className="w-4 h-4 mr-2" />
                  Resources
                </TabsTrigger>
                <TabsTrigger
                  value="prompts"
                  disabled={!serverCapabilities?.prompts}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Prompts
                </TabsTrigger>
                <TabsTrigger
                  value="tools"
                  disabled={!serverCapabilities?.tools}
                >
                  <Hammer className="w-4 h-4 mr-2" />
                  Tools
                </TabsTrigger>
                <TabsTrigger value="ping">
                  <Bell className="w-4 h-4 mr-2" />
                  Ping
                </TabsTrigger>
                <TabsTrigger value="sampling" className="relative">
                  <Hash className="w-4 h-4 mr-2" />
                  Sampling
                  {pendingSampleRequests.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {pendingSampleRequests.length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="roots">
                  <FolderTree className="w-4 h-4 mr-2" />
                  Roots
                </TabsTrigger>
              </TabsList>

              <div className="w-full">
                {!serverCapabilities?.resources &&
                !serverCapabilities?.prompts &&
                !serverCapabilities?.tools ? (
                  <>
                    <div className="flex items-center justify-center p-4">
                      <p className="text-lg text-gray-500">
                        The connected server does not support any MCP
                        capabilities
                      </p>
                    </div>
                    <PingTab
                      onPingClick={() => {
                        void sendMCPRequest(
                          {
                            method: "ping" as const,
                          },
                          EmptyResultSchema,
                        );
                      }}
                    />
                  </>
                ) : (
                  <>
                    <ResourcesTab
                      resources={resources}
                      resourceTemplates={resourceTemplates}
                      listResources={() => {
                        clearError("resources");
                        listResources();
                      }}
                      clearResources={() => {
                        setResources([]);
                        setNextResourceCursor(undefined);
                      }}
                      listResourceTemplates={() => {
                        clearError("resources");
                        listResourceTemplates();
                      }}
                      clearResourceTemplates={() => {
                        setResourceTemplates([]);
                        setNextResourceTemplateCursor(undefined);
                      }}
                      readResource={(uri) => {
                        clearError("resources");
                        readResource(uri);
                      }}
                      selectedResource={selectedResource}
                      setSelectedResource={(resource) => {
                        clearError("resources");
                        setSelectedResource(resource);
                      }}
                      resourceSubscriptionsSupported={
                        serverCapabilities?.resources?.subscribe || false
                      }
                      resourceSubscriptions={resourceSubscriptions}
                      subscribeToResource={(uri) => {
                        clearError("resources");
                        subscribeToResource(uri);
                      }}
                      unsubscribeFromResource={(uri) => {
                        clearError("resources");
                        unsubscribeFromResource(uri);
                      }}
                      handleCompletion={handleCompletion}
                      completionsSupported={completionsSupported}
                      resourceContent={resourceContent}
                      nextCursor={nextResourceCursor}
                      nextTemplateCursor={nextResourceTemplateCursor}
                      error={errors.resources}
                    />
                    <PromptsTab
                      prompts={prompts}
                      listPrompts={() => {
                        clearError("prompts");
                        listPrompts();
                      }}
                      clearPrompts={() => {
                        setPrompts([]);
                        setNextPromptCursor(undefined);
                      }}
                      getPrompt={(name, args) => {
                        clearError("prompts");
                        getPrompt(name, args);
                      }}
                      selectedPrompt={selectedPrompt}
                      setSelectedPrompt={(prompt) => {
                        clearError("prompts");
                        setSelectedPrompt(prompt);
                        setPromptContent("");
                      }}
                      handleCompletion={handleCompletion}
                      completionsSupported={completionsSupported}
                      promptContent={promptContent}
                      nextCursor={nextPromptCursor}
                      error={errors.prompts}
                    />
                    <ToolsTab
                      tools={tools}
                      listTools={() => {
                        clearError("tools");
                        listTools();
                      }}
                      clearTools={() => {
                        setTools([]);
                        setNextToolCursor(undefined);
                      }}
                      callTool={async (name, params) => {
                        clearError("tools");
                        setToolResult(null);
                        await callTool(name, params);
                      }}
                      selectedTool={selectedTool}
                      setSelectedTool={(tool) => {
                        clearError("tools");
                        setSelectedTool(tool);
                        setToolResult(null);
                      }}
                      toolResult={toolResult}
                      nextCursor={nextToolCursor}
                      error={errors.tools}
                    />
                    <ConsoleTab />
                    <PingTab
                      onPingClick={() => {
                        void sendMCPRequest(
                          {
                            method: "ping" as const,
                          },
                          EmptyResultSchema,
                        );
                      }}
                    />
                    <SamplingTab
                      pendingRequests={pendingSampleRequests}
                      onApprove={handleApproveSampling}
                      onReject={handleRejectSampling}
                    />
                    <RootsTab
                      roots={roots}
                      setRoots={setRoots}
                      onRootsChange={handleRootsChange}
                    />
                  </>
                )}
              </div>
            </Tabs>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-lg text-gray-500">
                Connect to an MCP server to start inspecting
              </p>
            </div>
          )}
        </div>
        <div
          className="relative border-t border-border"
          style={{
            height: `${historyPaneHeight}px`,
          }}
        >
          <div
            className="absolute w-full h-4 -top-2 cursor-row-resize flex items-center justify-center hover:bg-accent/50"
            onMouseDown={handleDragStart}
          >
            <div className="w-8 h-1 rounded-full bg-border" />
          </div>
          <div className="h-full overflow-auto">
            <HistoryAndNotifications
              requestHistory={requestHistory}
              serverNotifications={notifications}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;



================================================
FILE: client/src/index.css
================================================
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
}

body {
  margin: 0;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
}

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
    --radius: 0.5rem;
  }
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}



================================================
FILE: client/src/main.tsx
================================================
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "@/components/ui/toaster.tsx";
import App from "./App.tsx";
import "./index.css";
import { TooltipProvider } from "./components/ui/tooltip.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TooltipProvider>
      <App />
    </TooltipProvider>
    <Toaster />
  </StrictMode>,
);



================================================
FILE: client/src/vite-env.d.ts
================================================
/// <reference types="vite/client" />



================================================
FILE: client/src/__mocks__/styleMock.js
================================================
module.exports = {};



================================================
FILE: client/src/components/ConsoleTab.tsx
================================================
import { TabsContent } from "@/components/ui/tabs";

const ConsoleTab = () => (
  <TabsContent value="console" className="h-96">
    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg h-full font-mono text-sm overflow-auto">
      <div className="opacity-50">Welcome to MCP Client Console</div>
      {/* Console output would go here */}
    </div>
  </TabsContent>
);

export default ConsoleTab;



================================================
FILE: client/src/components/DynamicJsonForm.tsx
================================================
import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import JsonEditor from "./JsonEditor";
import { updateValueAtPath } from "@/utils/jsonUtils";
import { generateDefaultValue } from "@/utils/schemaUtils";
import type { JsonValue, JsonSchemaType } from "@/utils/jsonUtils";

interface DynamicJsonFormProps {
  schema: JsonSchemaType;
  value: JsonValue;
  onChange: (value: JsonValue) => void;
  maxDepth?: number;
}

const isSimpleObject = (schema: JsonSchemaType): boolean => {
  const supportedTypes = ["string", "number", "integer", "boolean", "null"];
  if (supportedTypes.includes(schema.type)) return true;
  if (schema.type !== "object") return false;
  return Object.values(schema.properties ?? {}).every((prop) =>
    supportedTypes.includes(prop.type),
  );
};

const DynamicJsonForm = ({
  schema,
  value,
  onChange,
  maxDepth = 3,
}: DynamicJsonFormProps) => {
  const isOnlyJSON = !isSimpleObject(schema);
  const [isJsonMode, setIsJsonMode] = useState(isOnlyJSON);
  const [jsonError, setJsonError] = useState<string>();
  // Store the raw JSON string to allow immediate feedback during typing
  // while deferring parsing until the user stops typing
  const [rawJsonValue, setRawJsonValue] = useState<string>(
    JSON.stringify(value ?? generateDefaultValue(schema), null, 2),
  );

  // Use a ref to manage debouncing timeouts to avoid parsing JSON
  // on every keystroke which would be inefficient and error-prone
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  // Debounce JSON parsing and parent updates to handle typing gracefully
  const debouncedUpdateParent = useCallback(
    (jsonString: string) => {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set a new timeout
      timeoutRef.current = setTimeout(() => {
        try {
          const parsed = JSON.parse(jsonString);
          onChange(parsed);
          setJsonError(undefined);
        } catch {
          // Don't set error during normal typing
        }
      }, 300);
    },
    [onChange, setJsonError],
  );

  // Update rawJsonValue when value prop changes
  useEffect(() => {
    if (!isJsonMode) {
      setRawJsonValue(
        JSON.stringify(value ?? generateDefaultValue(schema), null, 2),
      );
    }
  }, [value, schema, isJsonMode]);

  const handleSwitchToFormMode = () => {
    if (isJsonMode) {
      // When switching to Form mode, ensure we have valid JSON
      try {
        const parsed = JSON.parse(rawJsonValue);
        // Update the parent component's state with the parsed value
        onChange(parsed);
        // Switch to form mode
        setIsJsonMode(false);
      } catch (err) {
        setJsonError(err instanceof Error ? err.message : "Invalid JSON");
      }
    } else {
      // Update raw JSON value when switching to JSON mode
      setRawJsonValue(
        JSON.stringify(value ?? generateDefaultValue(schema), null, 2),
      );
      setIsJsonMode(true);
    }
  };

  const formatJson = () => {
    try {
      const jsonStr = rawJsonValue.trim();
      if (!jsonStr) {
        return;
      }
      const formatted = JSON.stringify(JSON.parse(jsonStr), null, 2);
      setRawJsonValue(formatted);
      debouncedUpdateParent(formatted);
      setJsonError(undefined);
    } catch (err) {
      setJsonError(err instanceof Error ? err.message : "Invalid JSON");
    }
  };

  const renderFormFields = (
    propSchema: JsonSchemaType,
    currentValue: JsonValue,
    path: string[] = [],
    depth: number = 0,
  ) => {
    if (
      depth >= maxDepth &&
      (propSchema.type === "object" || propSchema.type === "array")
    ) {
      // Render as JSON editor when max depth is reached
      return (
        <JsonEditor
          value={JSON.stringify(
            currentValue ?? generateDefaultValue(propSchema),
            null,
            2,
          )}
          onChange={(newValue) => {
            try {
              const parsed = JSON.parse(newValue);
              handleFieldChange(path, parsed);
              setJsonError(undefined);
            } catch (err) {
              setJsonError(err instanceof Error ? err.message : "Invalid JSON");
            }
          }}
          error={jsonError}
        />
      );
    }

    switch (propSchema.type) {
      case "string":
        return (
          <Input
            type="text"
            value={(currentValue as string) ?? ""}
            onChange={(e) => {
              const val = e.target.value;
              // Allow clearing non-required fields by setting undefined
              // This preserves the distinction between empty string and unset
              if (!val && !propSchema.required) {
                handleFieldChange(path, undefined);
              } else {
                handleFieldChange(path, val);
              }
            }}
            placeholder={propSchema.description}
            required={propSchema.required}
          />
        );
      case "number":
        return (
          <Input
            type="number"
            value={(currentValue as number)?.toString() ?? ""}
            onChange={(e) => {
              const val = e.target.value;
              // Allow clearing non-required number fields
              // This preserves the distinction between 0 and unset
              if (!val && !propSchema.required) {
                handleFieldChange(path, undefined);
              } else {
                const num = Number(val);
                if (!isNaN(num)) {
                  handleFieldChange(path, num);
                }
              }
            }}
            placeholder={propSchema.description}
            required={propSchema.required}
          />
        );
      case "integer":
        return (
          <Input
            type="number"
            step="1"
            value={(currentValue as number)?.toString() ?? ""}
            onChange={(e) => {
              const val = e.target.value;
              // Allow clearing non-required integer fields
              // This preserves the distinction between 0 and unset
              if (!val && !propSchema.required) {
                handleFieldChange(path, undefined);
              } else {
                const num = Number(val);
                // Only update if it's a valid integer
                if (!isNaN(num) && Number.isInteger(num)) {
                  handleFieldChange(path, num);
                }
              }
            }}
            placeholder={propSchema.description}
            required={propSchema.required}
          />
        );
      case "boolean":
        return (
          <Input
            type="checkbox"
            checked={(currentValue as boolean) ?? false}
            onChange={(e) => handleFieldChange(path, e.target.checked)}
            className="w-4 h-4"
            required={propSchema.required}
          />
        );
      default:
        return null;
    }
  };

  const handleFieldChange = (path: string[], fieldValue: JsonValue) => {
    if (path.length === 0) {
      onChange(fieldValue);
      return;
    }

    try {
      const newValue = updateValueAtPath(value, path, fieldValue);
      onChange(newValue);
    } catch (error) {
      console.error("Failed to update form value:", error);
      onChange(value);
    }
  };

  const shouldUseJsonMode =
    schema.type === "object" &&
    (!schema.properties || Object.keys(schema.properties).length === 0);

  useEffect(() => {
    if (shouldUseJsonMode && !isJsonMode) {
      setIsJsonMode(true);
    }
  }, [shouldUseJsonMode, isJsonMode]);

  return (
    <div className="space-y-4">
      <div className="flex justify-end space-x-2">
        {isJsonMode && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={formatJson}
          >
            Format JSON
          </Button>
        )}
        {!isOnlyJSON && (
          <Button variant="outline" size="sm" onClick={handleSwitchToFormMode}>
            {isJsonMode ? "Switch to Form" : "Switch to JSON"}
          </Button>
        )}
      </div>

      {isJsonMode ? (
        <JsonEditor
          value={rawJsonValue}
          onChange={(newValue) => {
            // Always update local state
            setRawJsonValue(newValue);

            // Use the debounced function to attempt parsing and updating parent
            debouncedUpdateParent(newValue);
          }}
          error={jsonError}
        />
      ) : // If schema type is object but value is not an object or is empty, and we have actual JSON data,
      // render a simple representation of the JSON data
      schema.type === "object" &&
        (typeof value !== "object" ||
          value === null ||
          Object.keys(value).length === 0) &&
        rawJsonValue &&
        rawJsonValue !== "{}" ? (
        <div className="space-y-4 border rounded-md p-4">
          <p className="text-sm text-gray-500">
            Form view not available for this JSON structure. Using simplified
            view:
          </p>
          <pre className="bg-gray-50 dark:bg-gray-800 dark:text-gray-100 p-4 rounded text-sm overflow-auto">
            {rawJsonValue}
          </pre>
          <p className="text-sm text-gray-500">
            Use JSON mode for full editing capabilities.
          </p>
        </div>
      ) : (
        renderFormFields(schema, value)
      )}
    </div>
  );
};

export default DynamicJsonForm;



================================================
FILE: client/src/components/History.tsx
================================================
import { ServerNotification } from "@modelcontextprotocol/sdk/types.js";
import { useState } from "react";
import JsonView from "./JsonView";

const HistoryAndNotifications = ({
  requestHistory,
  serverNotifications,
}: {
  requestHistory: Array<{ request: string; response?: string }>;
  serverNotifications: ServerNotification[];
}) => {
  const [expandedRequests, setExpandedRequests] = useState<{
    [key: number]: boolean;
  }>({});
  const [expandedNotifications, setExpandedNotifications] = useState<{
    [key: number]: boolean;
  }>({});

  const toggleRequestExpansion = (index: number) => {
    setExpandedRequests((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleNotificationExpansion = (index: number) => {
    setExpandedNotifications((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="bg-card overflow-hidden flex h-full">
      <div className="flex-1 overflow-y-auto p-4 border-r">
        <h2 className="text-lg font-semibold mb-4">History</h2>
        {requestHistory.length === 0 ? (
          <p className="text-sm text-gray-500 italic">No history yet</p>
        ) : (
          <ul className="space-y-3">
            {requestHistory
              .slice()
              .reverse()
              .map((request, index) => (
                <li
                  key={index}
                  className="text-sm text-foreground bg-secondary p-2 rounded"
                >
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() =>
                      toggleRequestExpansion(requestHistory.length - 1 - index)
                    }
                  >
                    <span className="font-mono">
                      {requestHistory.length - index}.{" "}
                      {JSON.parse(request.request).method}
                    </span>
                    <span>
                      {expandedRequests[requestHistory.length - 1 - index]
                        ? "▼"
                        : "▶"}
                    </span>
                  </div>
                  {expandedRequests[requestHistory.length - 1 - index] && (
                    <>
                      <div className="mt-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-semibold text-blue-600">
                            Request:
                          </span>
                        </div>

                        <JsonView
                          data={request.request}
                          className="bg-background"
                        />
                      </div>
                      {request.response && (
                        <div className="mt-2">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-semibold text-green-600">
                              Response:
                            </span>
                          </div>
                          <JsonView
                            data={request.response}
                            className="bg-background"
                          />
                        </div>
                      )}
                    </>
                  )}
                </li>
              ))}
          </ul>
        )}
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <h2 className="text-lg font-semibold mb-4">Server Notifications</h2>
        {serverNotifications.length === 0 ? (
          <p className="text-sm text-gray-500 italic">No notifications yet</p>
        ) : (
          <ul className="space-y-3">
            {serverNotifications
              .slice()
              .reverse()
              .map((notification, index) => (
                <li
                  key={index}
                  className="text-sm text-foreground bg-secondary p-2 rounded"
                >
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleNotificationExpansion(index)}
                  >
                    <span className="font-mono">
                      {serverNotifications.length - index}.{" "}
                      {notification.method}
                    </span>
                    <span>{expandedNotifications[index] ? "▼" : "▶"}</span>
                  </div>
                  {expandedNotifications[index] && (
                    <div className="mt-2">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-purple-600">
                          Details:
                        </span>
                      </div>
                      <JsonView
                        data={JSON.stringify(notification, null, 2)}
                        className="bg-background"
                      />
                    </div>
                  )}
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HistoryAndNotifications;



================================================
FILE: client/src/components/JsonEditor.tsx
================================================
import { useState, useEffect } from "react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-json";
import "prismjs/themes/prism.css";

interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const JsonEditor = ({
  value,
  onChange,
  error: externalError,
}: JsonEditorProps) => {
  const [editorContent, setEditorContent] = useState(value || "");
  const [internalError, setInternalError] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    setEditorContent(value || "");
  }, [value]);

  const handleEditorChange = (newContent: string) => {
    setEditorContent(newContent);
    setInternalError(undefined);
    onChange(newContent);
  };

  const displayError = internalError || externalError;

  return (
    <div className="relative">
      <div
        className={`border rounded-md ${
          displayError
            ? "border-red-500"
            : "border-gray-200 dark:border-gray-800"
        }`}
      >
        <Editor
          value={editorContent}
          onValueChange={handleEditorChange}
          highlight={(code) =>
            Prism.highlight(code, Prism.languages.json, "json")
          }
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 14,
            backgroundColor: "transparent",
            minHeight: "100px",
          }}
          className="w-full"
        />
      </div>
      {displayError && (
        <p className="text-sm text-red-500 mt-1">{displayError}</p>
      )}
    </div>
  );
};

export default JsonEditor;



================================================
FILE: client/src/components/JsonView.tsx
================================================
import { useState, memo, useMemo, useCallback, useEffect } from "react";
import type { JsonValue } from "@/utils/jsonUtils";
import clsx from "clsx";
import { Copy, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/lib/hooks/useToast";
import { getDataType, tryParseJson } from "@/utils/jsonUtils";

interface JsonViewProps {
  data: unknown;
  name?: string;
  initialExpandDepth?: number;
  className?: string;
  withCopyButton?: boolean;
  isError?: boolean;
}

const JsonView = memo(
  ({
    data,
    name,
    initialExpandDepth = 3,
    className,
    withCopyButton = true,
    isError = false,
  }: JsonViewProps) => {
    const { toast } = useToast();
    const [copied, setCopied] = useState(false);

    useEffect(() => {
      let timeoutId: NodeJS.Timeout;
      if (copied) {
        timeoutId = setTimeout(() => {
          setCopied(false);
        }, 500);
      }
      return () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
    }, [copied]);

    const normalizedData = useMemo(() => {
      return typeof data === "string"
        ? tryParseJson(data).success
          ? tryParseJson(data).data
          : data
        : data;
    }, [data]);

    const handleCopy = useCallback(() => {
      try {
        navigator.clipboard.writeText(
          typeof normalizedData === "string"
            ? normalizedData
            : JSON.stringify(normalizedData, null, 2),
        );
        setCopied(true);
      } catch (error) {
        toast({
          title: "Error",
          description: `There was an error coping result into the clipboard: ${error instanceof Error ? error.message : String(error)}`,
          variant: "destructive",
        });
      }
    }, [toast, normalizedData]);

    return (
      <div className={clsx("p-4 border rounded relative", className)}>
        {withCopyButton && (
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2"
            onClick={handleCopy}
          >
            {copied ? (
              <CheckCheck className="size-4 dark:text-green-700 text-green-600" />
            ) : (
              <Copy className="size-4 text-foreground" />
            )}
          </Button>
        )}
        <div className="font-mono text-sm transition-all duration-300">
          <JsonNode
            data={normalizedData as JsonValue}
            name={name}
            depth={0}
            initialExpandDepth={initialExpandDepth}
            isError={isError}
          />
        </div>
      </div>
    );
  },
);

JsonView.displayName = "JsonView";

interface JsonNodeProps {
  data: JsonValue;
  name?: string;
  depth: number;
  initialExpandDepth: number;
  isError?: boolean;
}

const JsonNode = memo(
  ({
    data,
    name,
    depth = 0,
    initialExpandDepth,
    isError = false,
  }: JsonNodeProps) => {
    const [isExpanded, setIsExpanded] = useState(depth < initialExpandDepth);
    const [typeStyleMap] = useState<Record<string, string>>({
      number: "text-blue-600",
      boolean: "text-amber-600",
      null: "text-purple-600",
      undefined: "text-gray-600",
      string: "text-green-600 group-hover:text-green-500",
      error: "text-red-600 group-hover:text-red-500",
      default: "text-gray-700",
    });
    const dataType = getDataType(data);

    const renderCollapsible = (isArray: boolean) => {
      const items = isArray
        ? (data as JsonValue[])
        : Object.entries(data as Record<string, JsonValue>);
      const itemCount = items.length;
      const isEmpty = itemCount === 0;

      const symbolMap = {
        open: isArray ? "[" : "{",
        close: isArray ? "]" : "}",
        collapsed: isArray ? "[ ... ]" : "{ ... }",
        empty: isArray ? "[]" : "{}",
      };

      if (isEmpty) {
        return (
          <div className="flex items-center">
            {name && (
              <span className="mr-1 text-gray-600 dark:text-gray-400">
                {name}:
              </span>
            )}
            <span className="text-gray-500">{symbolMap.empty}</span>
          </div>
        );
      }

      return (
        <div className="flex flex-col">
          <div
            className="flex items-center mr-1 rounded cursor-pointer group hover:bg-gray-800/10 dark:hover:bg-gray-800/20"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {name && (
              <span className="mr-1 text-gray-600 dark:text-gray-400 dark:group-hover:text-gray-100 group-hover:text-gray-400">
                {name}:
              </span>
            )}
            {isExpanded ? (
              <span className="text-gray-600 dark:text-gray-400 dark:group-hover:text-gray-100 group-hover:text-gray-400">
                {symbolMap.open}
              </span>
            ) : (
              <>
                <span className="text-gray-600 dark:group-hover:text-gray-100 group-hover:text-gray-400">
                  {symbolMap.collapsed}
                </span>
                <span className="ml-1 text-gray-700 dark:group-hover:text-gray-100 group-hover:text-gray-400">
                  {itemCount} {itemCount === 1 ? "item" : "items"}
                </span>
              </>
            )}
          </div>
          {isExpanded && (
            <>
              <div className="pl-2 ml-4 border-l border-gray-200 dark:border-gray-800">
                {isArray
                  ? (items as JsonValue[]).map((item, index) => (
                      <div key={index} className="my-1">
                        <JsonNode
                          data={item}
                          name={`${index}`}
                          depth={depth + 1}
                          initialExpandDepth={initialExpandDepth}
                        />
                      </div>
                    ))
                  : (items as [string, JsonValue][]).map(([key, value]) => (
                      <div key={key} className="my-1">
                        <JsonNode
                          data={value}
                          name={key}
                          depth={depth + 1}
                          initialExpandDepth={initialExpandDepth}
                        />
                      </div>
                    ))}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                {symbolMap.close}
              </div>
            </>
          )}
        </div>
      );
    };

    const renderString = (value: string) => {
      const maxLength = 100;
      const isTooLong = value.length > maxLength;

      if (!isTooLong) {
        return (
          <div className="flex mr-1 rounded hover:bg-gray-800/20">
            {name && (
              <span className="mr-1 text-gray-600 dark:text-gray-400">
                {name}:
              </span>
            )}
            <pre
              className={clsx(
                isError ? typeStyleMap.error : typeStyleMap.string,
                "break-all whitespace-pre-wrap",
              )}
            >
              "{value}"
            </pre>
          </div>
        );
      }

      return (
        <div className="flex mr-1 rounded group hover:bg-gray-800/20">
          {name && (
            <span className="mr-1 text-gray-600 dark:text-gray-400 dark:group-hover:text-gray-100 group-hover:text-gray-400">
              {name}:
            </span>
          )}
          <pre
            className={clsx(
              isError ? typeStyleMap.error : typeStyleMap.string,
              "cursor-pointer break-all whitespace-pre-wrap",
            )}
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? "Click to collapse" : "Click to expand"}
          >
            {isExpanded ? `"${value}"` : `"${value.slice(0, maxLength)}..."`}
          </pre>
        </div>
      );
    };

    switch (dataType) {
      case "object":
      case "array":
        return renderCollapsible(dataType === "array");
      case "string":
        return renderString(data as string);
      default:
        return (
          <div className="flex items-center mr-1 rounded hover:bg-gray-800/20">
            {name && (
              <span className="mr-1 text-gray-600 dark:text-gray-400">
                {name}:
              </span>
            )}
            <span className={typeStyleMap[dataType] || typeStyleMap.default}>
              {data === null ? "null" : String(data)}
            </span>
          </div>
        );
    }
  },
);

JsonNode.displayName = "JsonNode";

export default JsonView;



================================================
FILE: client/src/components/ListPane.tsx
================================================
import { Button } from "./ui/button";

type ListPaneProps<T> = {
  items: T[];
  listItems: () => void;
  clearItems: () => void;
  setSelectedItem: (item: T) => void;
  renderItem: (item: T) => React.ReactNode;
  title: string;
  buttonText: string;
  isButtonDisabled?: boolean;
};

const ListPane = <T extends object>({
  items,
  listItems,
  clearItems,
  setSelectedItem,
  renderItem,
  title,
  buttonText,
  isButtonDisabled,
}: ListPaneProps<T>) => (
  <div className="bg-card rounded-lg shadow">
    <div className="p-4 border-b border-gray-200 dark:border-gray-800">
      <h3 className="font-semibold dark:text-white">{title}</h3>
    </div>
    <div className="p-4">
      <Button
        variant="outline"
        className="w-full mb-4"
        onClick={listItems}
        disabled={isButtonDisabled}
      >
        {buttonText}
      </Button>
      <Button
        variant="outline"
        className="w-full mb-4"
        onClick={clearItems}
        disabled={items.length === 0}
      >
        Clear
      </Button>
      <div className="space-y-2 overflow-y-auto max-h-96">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
            onClick={() => setSelectedItem(item)}
          >
            {renderItem(item)}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ListPane;



================================================
FILE: client/src/components/OAuthCallback.tsx
================================================
import { useEffect, useRef } from "react";
import { InspectorOAuthClientProvider } from "../lib/auth";
import { SESSION_KEYS } from "../lib/constants";
import { auth } from "@modelcontextprotocol/sdk/client/auth.js";
import { useToast } from "@/lib/hooks/useToast";
import {
  generateOAuthErrorDescription,
  parseOAuthCallbackParams,
} from "@/utils/oauthUtils.ts";

interface OAuthCallbackProps {
  onConnect: (serverUrl: string) => void;
}

const OAuthCallback = ({ onConnect }: OAuthCallbackProps) => {
  const { toast } = useToast();
  const hasProcessedRef = useRef(false);

  useEffect(() => {
    const handleCallback = async () => {
      // Skip if we've already processed this callback
      if (hasProcessedRef.current) {
        return;
      }
      hasProcessedRef.current = true;

      const notifyError = (description: string) =>
        void toast({
          title: "OAuth Authorization Error",
          description,
          variant: "destructive",
        });

      const params = parseOAuthCallbackParams(window.location.search);
      if (!params.successful) {
        return notifyError(generateOAuthErrorDescription(params));
      }

      const serverUrl = sessionStorage.getItem(SESSION_KEYS.SERVER_URL);
      if (!serverUrl) {
        return notifyError("Missing Server URL");
      }

      let result;
      try {
        // Create an auth provider with the current server URL
        const serverAuthProvider = new InspectorOAuthClientProvider(serverUrl);

        result = await auth(serverAuthProvider, {
          serverUrl,
          authorizationCode: params.code,
        });
      } catch (error) {
        console.error("OAuth callback error:", error);
        return notifyError(`Unexpected error occurred: ${error}`);
      }

      if (result !== "AUTHORIZED") {
        return notifyError(
          `Expected to be authorized after providing auth code, got: ${result}`,
        );
      }

      // Finally, trigger auto-connect
      toast({
        title: "Success",
        description: "Successfully authenticated with OAuth",
        variant: "default",
      });
      onConnect(serverUrl);
    };

    handleCallback().finally(() => {
      window.history.replaceState({}, document.title, "/");
    });
  }, [toast, onConnect]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg text-gray-500">Processing OAuth callback...</p>
    </div>
  );
};

export default OAuthCallback;



================================================
FILE: client/src/components/PingTab.tsx
================================================
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const PingTab = ({ onPingClick }: { onPingClick: () => void }) => {
  return (
    <TabsContent value="ping">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 flex justify-center items-center">
          <Button
            onClick={onPingClick}
            className="font-bold py-6 px-12 rounded-full"
          >
            Ping Server
          </Button>
        </div>
      </div>
    </TabsContent>
  );
};

export default PingTab;



================================================
FILE: client/src/components/PromptsTab.tsx
================================================
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";

import {
  ListPromptsResult,
  PromptReference,
  ResourceReference,
} from "@modelcontextprotocol/sdk/types.js";
import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import ListPane from "./ListPane";
import { useCompletionState } from "@/lib/hooks/useCompletionState";
import JsonView from "./JsonView";

export type Prompt = {
  name: string;
  description?: string;
  arguments?: {
    name: string;
    description?: string;
    required?: boolean;
  }[];
};

const PromptsTab = ({
  prompts,
  listPrompts,
  clearPrompts,
  getPrompt,
  selectedPrompt,
  setSelectedPrompt,
  handleCompletion,
  completionsSupported,
  promptContent,
  nextCursor,
  error,
}: {
  prompts: Prompt[];
  listPrompts: () => void;
  clearPrompts: () => void;
  getPrompt: (name: string, args: Record<string, string>) => void;
  selectedPrompt: Prompt | null;
  setSelectedPrompt: (prompt: Prompt | null) => void;
  handleCompletion: (
    ref: PromptReference | ResourceReference,
    argName: string,
    value: string,
  ) => Promise<string[]>;
  completionsSupported: boolean;
  promptContent: string;
  nextCursor: ListPromptsResult["nextCursor"];
  error: string | null;
}) => {
  const [promptArgs, setPromptArgs] = useState<Record<string, string>>({});
  const { completions, clearCompletions, requestCompletions } =
    useCompletionState(handleCompletion, completionsSupported);

  useEffect(() => {
    clearCompletions();
  }, [clearCompletions, selectedPrompt]);

  const handleInputChange = async (argName: string, value: string) => {
    setPromptArgs((prev) => ({ ...prev, [argName]: value }));

    if (selectedPrompt) {
      requestCompletions(
        {
          type: "ref/prompt",
          name: selectedPrompt.name,
        },
        argName,
        value,
      );
    }
  };

  const handleGetPrompt = () => {
    if (selectedPrompt) {
      getPrompt(selectedPrompt.name, promptArgs);
    }
  };

  return (
    <TabsContent value="prompts">
      <div className="grid grid-cols-2 gap-4">
        <ListPane
          items={prompts}
          listItems={listPrompts}
          clearItems={() => {
            clearPrompts();
            setSelectedPrompt(null);
          }}
          setSelectedItem={(prompt) => {
            setSelectedPrompt(prompt);
            setPromptArgs({});
          }}
          renderItem={(prompt) => (
            <>
              <span className="flex-1">{prompt.name}</span>
              <span className="text-sm text-gray-500">
                {prompt.description}
              </span>
            </>
          )}
          title="Prompts"
          buttonText={nextCursor ? "List More Prompts" : "List Prompts"}
          isButtonDisabled={!nextCursor && prompts.length > 0}
        />

        <div className="bg-card rounded-lg shadow">
          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
            <h3 className="font-semibold">
              {selectedPrompt ? selectedPrompt.name : "Select a prompt"}
            </h3>
          </div>
          <div className="p-4">
            {error ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : selectedPrompt ? (
              <div className="space-y-4">
                {selectedPrompt.description && (
                  <p className="text-sm text-gray-600">
                    {selectedPrompt.description}
                  </p>
                )}
                {selectedPrompt.arguments?.map((arg) => (
                  <div key={arg.name}>
                    <Label htmlFor={arg.name}>{arg.name}</Label>
                    <Combobox
                      id={arg.name}
                      placeholder={`Enter ${arg.name}`}
                      value={promptArgs[arg.name] || ""}
                      onChange={(value) => handleInputChange(arg.name, value)}
                      onInputChange={(value) =>
                        handleInputChange(arg.name, value)
                      }
                      options={completions[arg.name] || []}
                    />

                    {arg.description && (
                      <p className="text-xs text-gray-500 mt-1">
                        {arg.description}
                        {arg.required && (
                          <span className="text-xs mt-1 ml-1">(Required)</span>
                        )}
                      </p>
                    )}
                  </div>
                ))}
                <Button onClick={handleGetPrompt} className="w-full">
                  Get Prompt
                </Button>
                {promptContent && (
                  <JsonView data={promptContent} withCopyButton={false} />
                )}
              </div>
            ) : (
              <Alert>
                <AlertDescription>
                  Select a prompt from the list to view and use it
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </div>
    </TabsContent>
  );
};

export default PromptsTab;



================================================
FILE: client/src/components/ResourcesTab.tsx
================================================
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Combobox } from "@/components/ui/combobox";
import { TabsContent } from "@/components/ui/tabs";
import {
  ListResourcesResult,
  Resource,
  ResourceTemplate,
  ListResourceTemplatesResult,
  ResourceReference,
  PromptReference,
} from "@modelcontextprotocol/sdk/types.js";
import { AlertCircle, ChevronRight, FileText, RefreshCw } from "lucide-react";
import ListPane from "./ListPane";
import { useEffect, useState } from "react";
import { useCompletionState } from "@/lib/hooks/useCompletionState";
import JsonView from "./JsonView";

const ResourcesTab = ({
  resources,
  resourceTemplates,
  listResources,
  clearResources,
  listResourceTemplates,
  clearResourceTemplates,
  readResource,
  selectedResource,
  setSelectedResource,
  resourceSubscriptionsSupported,
  resourceSubscriptions,
  subscribeToResource,
  unsubscribeFromResource,
  handleCompletion,
  completionsSupported,
  resourceContent,
  nextCursor,
  nextTemplateCursor,
  error,
}: {
  resources: Resource[];
  resourceTemplates: ResourceTemplate[];
  listResources: () => void;
  clearResources: () => void;
  listResourceTemplates: () => void;
  clearResourceTemplates: () => void;
  readResource: (uri: string) => void;
  selectedResource: Resource | null;
  setSelectedResource: (resource: Resource | null) => void;
  handleCompletion: (
    ref: ResourceReference | PromptReference,
    argName: string,
    value: string,
  ) => Promise<string[]>;
  completionsSupported: boolean;
  resourceContent: string;
  nextCursor: ListResourcesResult["nextCursor"];
  nextTemplateCursor: ListResourceTemplatesResult["nextCursor"];
  error: string | null;
  resourceSubscriptionsSupported: boolean;
  resourceSubscriptions: Set<string>;
  subscribeToResource: (uri: string) => void;
  unsubscribeFromResource: (uri: string) => void;
}) => {
  const [selectedTemplate, setSelectedTemplate] =
    useState<ResourceTemplate | null>(null);
  const [templateValues, setTemplateValues] = useState<Record<string, string>>(
    {},
  );

  const { completions, clearCompletions, requestCompletions } =
    useCompletionState(handleCompletion, completionsSupported);

  useEffect(() => {
    clearCompletions();
  }, [clearCompletions]);

  const fillTemplate = (
    template: string,
    values: Record<string, string>,
  ): string => {
    return template.replace(
      /{([^}]+)}/g,
      (_, key) => values[key] || `{${key}}`,
    );
  };

  const handleTemplateValueChange = async (key: string, value: string) => {
    setTemplateValues((prev) => ({ ...prev, [key]: value }));

    if (selectedTemplate?.uriTemplate) {
      requestCompletions(
        {
          type: "ref/resource",
          uri: selectedTemplate.uriTemplate,
        },
        key,
        value,
      );
    }
  };

  const handleReadTemplateResource = () => {
    if (selectedTemplate) {
      const uri = fillTemplate(selectedTemplate.uriTemplate, templateValues);
      readResource(uri);
      // We don't have the full Resource object here, so we create a partial one
      setSelectedResource({ uri, name: uri } as Resource);
    }
  };

  return (
    <TabsContent value="resources">
      <div className="grid grid-cols-3 gap-4">
        <ListPane
          items={resources}
          listItems={listResources}
          clearItems={() => {
            clearResources();
            // Condition to check if selected resource is not resource template's resource
            if (!selectedTemplate) {
              setSelectedResource(null);
            }
          }}
          setSelectedItem={(resource) => {
            setSelectedResource(resource);
            readResource(resource.uri);
            setSelectedTemplate(null);
          }}
          renderItem={(resource) => (
            <div className="flex items-center w-full">
              <FileText className="w-4 h-4 mr-2 flex-shrink-0 text-gray-500" />
              <span className="flex-1 truncate" title={resource.uri.toString()}>
                {resource.name}
              </span>
              <ChevronRight className="w-4 h-4 flex-shrink-0 text-gray-400" />
            </div>
          )}
          title="Resources"
          buttonText={nextCursor ? "List More Resources" : "List Resources"}
          isButtonDisabled={!nextCursor && resources.length > 0}
        />

        <ListPane
          items={resourceTemplates}
          listItems={listResourceTemplates}
          clearItems={() => {
            clearResourceTemplates();
            // Condition to check if selected resource is resource template's resource
            if (selectedTemplate) {
              setSelectedResource(null);
            }
            setSelectedTemplate(null);
          }}
          setSelectedItem={(template) => {
            setSelectedTemplate(template);
            setSelectedResource(null);
            setTemplateValues({});
          }}
          renderItem={(template) => (
            <div className="flex items-center w-full">
              <FileText className="w-4 h-4 mr-2 flex-shrink-0 text-gray-500" />
              <span className="flex-1 truncate" title={template.uriTemplate}>
                {template.name}
              </span>
              <ChevronRight className="w-4 h-4 flex-shrink-0 text-gray-400" />
            </div>
          )}
          title="Resource Templates"
          buttonText={
            nextTemplateCursor ? "List More Templates" : "List Templates"
          }
          isButtonDisabled={!nextTemplateCursor && resourceTemplates.length > 0}
        />

        <div className="bg-card rounded-lg shadow">
          <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
            <h3
              className="font-semibold truncate"
              title={selectedResource?.name || selectedTemplate?.name}
            >
              {selectedResource
                ? selectedResource.name
                : selectedTemplate
                  ? selectedTemplate.name
                  : "Select a resource or template"}
            </h3>
            {selectedResource && (
              <div className="flex row-auto gap-1 justify-end w-2/5">
                {resourceSubscriptionsSupported &&
                  !resourceSubscriptions.has(selectedResource.uri) && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => subscribeToResource(selectedResource.uri)}
                    >
                      Subscribe
                    </Button>
                  )}
                {resourceSubscriptionsSupported &&
                  resourceSubscriptions.has(selectedResource.uri) && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        unsubscribeFromResource(selectedResource.uri)
                      }
                    >
                      Unsubscribe
                    </Button>
                  )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => readResource(selectedResource.uri)}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>
            )}
          </div>
          <div className="p-4">
            {error ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : selectedResource ? (
              <JsonView
                data={resourceContent}
                className="bg-gray-50 dark:bg-gray-800 p-4 rounded text-sm overflow-auto max-h-96 text-gray-900 dark:text-gray-100"
              />
            ) : selectedTemplate ? (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  {selectedTemplate.description}
                </p>
                {selectedTemplate.uriTemplate
                  .match(/{([^}]+)}/g)
                  ?.map((param) => {
                    const key = param.slice(1, -1);
                    return (
                      <div key={key}>
                        <Label htmlFor={key}>{key}</Label>
                        <Combobox
                          id={key}
                          placeholder={`Enter ${key}`}
                          value={templateValues[key] || ""}
                          onChange={(value) =>
                            handleTemplateValueChange(key, value)
                          }
                          onInputChange={(value) =>
                            handleTemplateValueChange(key, value)
                          }
                          options={completions[key] || []}
                        />
                      </div>
                    );
                  })}
                <Button
                  onClick={handleReadTemplateResource}
                  disabled={Object.keys(templateValues).length === 0}
                >
                  Read Resource
                </Button>
              </div>
            ) : (
              <Alert>
                <AlertDescription>
                  Select a resource or template from the list to view its
                  contents
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </div>
    </TabsContent>
  );
};

export default ResourcesTab;



================================================
FILE: client/src/components/RootsTab.tsx
================================================
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { Root } from "@modelcontextprotocol/sdk/types.js";
import { Plus, Minus, Save } from "lucide-react";

const RootsTab = ({
  roots,
  setRoots,
  onRootsChange,
}: {
  roots: Root[];
  setRoots: React.Dispatch<React.SetStateAction<Root[]>>;
  onRootsChange: () => void;
}) => {
  const addRoot = () => {
    setRoots((currentRoots) => [...currentRoots, { uri: "file://", name: "" }]);
  };

  const removeRoot = (index: number) => {
    setRoots((currentRoots) => currentRoots.filter((_, i) => i !== index));
  };

  const updateRoot = (index: number, field: keyof Root, value: string) => {
    setRoots((currentRoots) =>
      currentRoots.map((root, i) =>
        i === index ? { ...root, [field]: value } : root,
      ),
    );
  };

  const handleSave = () => {
    onRootsChange();
  };

  return (
    <TabsContent value="roots">
      <div className="space-y-4">
        <Alert>
          <AlertDescription>
            Configure the root directories that the server can access
          </AlertDescription>
        </Alert>

        {roots.map((root, index) => (
          <div key={index} className="flex gap-2 items-center">
            <Input
              placeholder="file:// URI"
              value={root.uri}
              onChange={(e) => updateRoot(index, "uri", e.target.value)}
              className="flex-1"
            />
            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeRoot(index)}
            >
              <Minus className="h-4 w-4" />
            </Button>
          </div>
        ))}

        <div className="flex gap-2">
          <Button variant="outline" onClick={addRoot}>
            <Plus className="h-4 w-4 mr-2" />
            Add Root
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </TabsContent>
  );
};

export default RootsTab;



================================================
FILE: client/src/components/SamplingRequest.tsx
================================================
import { Button } from "@/components/ui/button";
import JsonView from "./JsonView";
import { useMemo, useState } from "react";
import {
  CreateMessageResult,
  CreateMessageResultSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { PendingRequest } from "./SamplingTab";
import DynamicJsonForm from "./DynamicJsonForm";
import { useToast } from "@/lib/hooks/useToast";
import { JsonSchemaType, JsonValue } from "@/utils/jsonUtils";

export type SamplingRequestProps = {
  request: PendingRequest;
  onApprove: (id: number, result: CreateMessageResult) => void;
  onReject: (id: number) => void;
};

const SamplingRequest = ({
  onApprove,
  request,
  onReject,
}: SamplingRequestProps) => {
  const { toast } = useToast();

  const [messageResult, setMessageResult] = useState<JsonValue>({
    model: "stub-model",
    stopReason: "endTurn",
    role: "assistant",
    content: {
      type: "text",
      text: "",
    },
  });

  const contentType = (
    (messageResult as { [key: string]: JsonValue })?.content as {
      [key: string]: JsonValue;
    }
  )?.type;

  const schema = useMemo(() => {
    const s: JsonSchemaType = {
      type: "object",
      description: "Message result",
      properties: {
        model: {
          type: "string",
          default: "stub-model",
          description: "model name",
        },
        stopReason: {
          type: "string",
          default: "endTurn",
          description: "Stop reason",
        },
        role: {
          type: "string",
          default: "endTurn",
          description: "Role of the model",
        },
        content: {
          type: "object",
          properties: {
            type: {
              type: "string",
              default: "text",
              description: "Type of content",
            },
          },
        },
      },
    };

    if (contentType === "text" && s.properties) {
      s.properties.content.properties = {
        ...s.properties.content.properties,
        text: {
          type: "string",
          default: "",
          description: "text content",
        },
      };
      setMessageResult((prev) => ({
        ...(prev as { [key: string]: JsonValue }),
        content: {
          type: contentType,
          text: "",
        },
      }));
    } else if (contentType === "image" && s.properties) {
      s.properties.content.properties = {
        ...s.properties.content.properties,
        data: {
          type: "string",
          default: "",
          description: "Base64 encoded image data",
        },
        mimeType: {
          type: "string",
          default: "",
          description: "Mime type of the image",
        },
      };
      setMessageResult((prev) => ({
        ...(prev as { [key: string]: JsonValue }),
        content: {
          type: contentType,
          data: "",
          mimeType: "",
        },
      }));
    }

    return s;
  }, [contentType]);

  const handleApprove = (id: number) => {
    const validationResult = CreateMessageResultSchema.safeParse(messageResult);
    if (!validationResult.success) {
      toast({
        title: "Error",
        description: `There was an error validating the message result: ${validationResult.error.message}`,
        variant: "destructive",
      });
      return;
    }

    onApprove(id, validationResult.data);
  };

  return (
    <div
      data-testid="sampling-request"
      className="flex gap-4 p-4 border rounded-lg space-y-4"
    >
      <div className="flex-1 bg-gray-50 dark:bg-gray-800 dark:text-gray-100 p-2 rounded">
        <JsonView data={JSON.stringify(request.request)} />
      </div>
      <form className="flex-1 space-y-4">
        <div className="space-y-2">
          <DynamicJsonForm
            schema={schema}
            value={messageResult}
            onChange={(newValue: JsonValue) => {
              setMessageResult(newValue);
            }}
          />
        </div>
        <div className="flex space-x-2 mt-1">
          <Button type="button" onClick={() => handleApprove(request.id)}>
            Approve
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => onReject(request.id)}
          >
            Reject
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SamplingRequest;



================================================
FILE: client/src/components/SamplingTab.tsx
================================================
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TabsContent } from "@/components/ui/tabs";
import {
  CreateMessageRequest,
  CreateMessageResult,
} from "@modelcontextprotocol/sdk/types.js";
import SamplingRequest from "./SamplingRequest";

export type PendingRequest = {
  id: number;
  request: CreateMessageRequest;
};

export type Props = {
  pendingRequests: PendingRequest[];
  onApprove: (id: number, result: CreateMessageResult) => void;
  onReject: (id: number) => void;
};

const SamplingTab = ({ pendingRequests, onApprove, onReject }: Props) => {
  return (
    <TabsContent value="sampling">
      <div className="h-96">
        <Alert>
          <AlertDescription>
            When the server requests LLM sampling, requests will appear here for
            approval.
          </AlertDescription>
        </Alert>
        <div className="mt-4 space-y-4">
          <h3 className="text-lg font-semibold">Recent Requests</h3>
          {pendingRequests.map((request) => (
            <SamplingRequest
              key={request.id}
              request={request}
              onApprove={onApprove}
              onReject={onReject}
            />
          ))}
          {pendingRequests.length === 0 && (
            <p className="text-gray-500">No pending requests</p>
          )}
        </div>
      </div>
    </TabsContent>
  );
};

export default SamplingTab;



================================================
FILE: client/src/components/Sidebar.tsx
================================================
import { useState } from "react";
import {
  Play,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Bug,
  Github,
  Eye,
  EyeOff,
  RotateCcw,
  Settings,
  HelpCircle,
  RefreshCwOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StdErrNotification } from "@/lib/notificationTypes";
import {
  LoggingLevel,
  LoggingLevelSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { InspectorConfig } from "@/lib/configurationTypes";
import { ConnectionStatus } from "@/lib/constants";
import useTheme from "../lib/hooks/useTheme";
import { version } from "../../../package.json";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface SidebarProps {
  connectionStatus: ConnectionStatus;
  transportType: "stdio" | "sse" | "streamable-http";
  setTransportType: (type: "stdio" | "sse" | "streamable-http") => void;
  command: string;
  setCommand: (command: string) => void;
  args: string;
  setArgs: (args: string) => void;
  sseUrl: string;
  setSseUrl: (url: string) => void;
  env: Record<string, string>;
  setEnv: (env: Record<string, string>) => void;
  bearerToken: string;
  setBearerToken: (token: string) => void;
  headerName?: string;
  setHeaderName?: (name: string) => void;
  onConnect: () => void;
  onDisconnect: () => void;
  stdErrNotifications: StdErrNotification[];
  clearStdErrNotifications: () => void;
  logLevel: LoggingLevel;
  sendLogLevelRequest: (level: LoggingLevel) => void;
  loggingSupported: boolean;
  config: InspectorConfig;
  setConfig: (config: InspectorConfig) => void;
}

const Sidebar = ({
  connectionStatus,
  transportType,
  setTransportType,
  command,
  setCommand,
  args,
  setArgs,
  sseUrl,
  setSseUrl,
  env,
  setEnv,
  bearerToken,
  setBearerToken,
  headerName,
  setHeaderName,
  onConnect,
  onDisconnect,
  stdErrNotifications,
  clearStdErrNotifications,
  logLevel,
  sendLogLevelRequest,
  loggingSupported,
  config,
  setConfig,
}: SidebarProps) => {
  const [theme, setTheme] = useTheme();
  const [showEnvVars, setShowEnvVars] = useState(false);
  const [showBearerToken, setShowBearerToken] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [shownEnvVars, setShownEnvVars] = useState<Set<string>>(new Set());

  return (
    <div className="w-80 bg-card border-r border-border flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center">
          <h1 className="ml-2 text-lg font-semibold">
            MCP Inspector v{version}
          </h1>
        </div>
      </div>

      <div className="p-4 flex-1 overflow-auto">
        <div className="space-y-4">
          <div className="space-y-2">
            <label
              className="text-sm font-medium"
              htmlFor="transport-type-select"
            >
              Transport Type
            </label>
            <Select
              value={transportType}
              onValueChange={(value: "stdio" | "sse" | "streamable-http") =>
                setTransportType(value)
              }
            >
              <SelectTrigger id="transport-type-select">
                <SelectValue placeholder="Select transport type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stdio">STDIO</SelectItem>
                <SelectItem value="sse">SSE</SelectItem>
                <SelectItem value="streamable-http">Streamable HTTP</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {transportType === "stdio" ? (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="command-input">
                  Command
                </label>
                <Input
                  id="command-input"
                  placeholder="Command"
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  className="font-mono"
                />
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-medium"
                  htmlFor="arguments-input"
                >
                  Arguments
                </label>
                <Input
                  id="arguments-input"
                  placeholder="Arguments (space-separated)"
                  value={args}
                  onChange={(e) => setArgs(e.target.value)}
                  className="font-mono"
                />
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="sse-url-input">
                  URL
                </label>
                <Input
                  id="sse-url-input"
                  placeholder="URL"
                  value={sseUrl}
                  onChange={(e) => setSseUrl(e.target.value)}
                  className="font-mono"
                />
              </div>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  onClick={() => setShowBearerToken(!showBearerToken)}
                  className="flex items-center w-full"
                  data-testid="auth-button"
                  aria-expanded={showBearerToken}
                >
                  {showBearerToken ? (
                    <ChevronDown className="w-4 h-4 mr-2" />
                  ) : (
                    <ChevronRight className="w-4 h-4 mr-2" />
                  )}
                  Authentication
                </Button>
                {showBearerToken && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Header Name</label>
                    <Input
                      placeholder="Authorization"
                      onChange={(e) =>
                        setHeaderName && setHeaderName(e.target.value)
                      }
                      data-testid="header-input"
                      className="font-mono"
                      value={headerName}
                    />
                    <label
                      className="text-sm font-medium"
                      htmlFor="bearer-token-input"
                    >
                      Bearer Token
                    </label>
                    <Input
                      id="bearer-token-input"
                      placeholder="Bearer Token"
                      value={bearerToken}
                      onChange={(e) => setBearerToken(e.target.value)}
                      data-testid="bearer-token-input"
                      className="font-mono"
                      type="password"
                    />
                  </div>
                )}
              </div>
            </>
          )}
          {transportType === "stdio" && (
            <div className="space-y-2">
              <Button
                variant="outline"
                onClick={() => setShowEnvVars(!showEnvVars)}
                className="flex items-center w-full"
                data-testid="env-vars-button"
                aria-expanded={showEnvVars}
              >
                {showEnvVars ? (
                  <ChevronDown className="w-4 h-4 mr-2" />
                ) : (
                  <ChevronRight className="w-4 h-4 mr-2" />
                )}
                Environment Variables
              </Button>
              {showEnvVars && (
                <div className="space-y-2">
                  {Object.entries(env).map(([key, value], idx) => (
                    <div key={idx} className="space-y-2 pb-4">
                      <div className="flex gap-2">
                        <Input
                          aria-label={`Environment variable key ${idx + 1}`}
                          placeholder="Key"
                          value={key}
                          onChange={(e) => {
                            const newKey = e.target.value;
                            const newEnv = Object.entries(env).reduce(
                              (acc, [k, v]) => {
                                if (k === key) {
                                  acc[newKey] = value;
                                } else {
                                  acc[k] = v;
                                }
                                return acc;
                              },
                              {} as Record<string, string>,
                            );
                            setEnv(newEnv);
                            setShownEnvVars((prev) => {
                              const next = new Set(prev);
                              if (next.has(key)) {
                                next.delete(key);
                                next.add(newKey);
                              }
                              return next;
                            });
                          }}
                          className="font-mono"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="h-9 w-9 p-0 shrink-0"
                          onClick={() => {
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            const { [key]: _removed, ...rest } = env;
                            setEnv(rest);
                          }}
                        >
                          ×
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        <Input
                          aria-label={`Environment variable value ${idx + 1}`}
                          type={shownEnvVars.has(key) ? "text" : "password"}
                          placeholder="Value"
                          value={value}
                          onChange={(e) => {
                            const newEnv = { ...env };
                            newEnv[key] = e.target.value;
                            setEnv(newEnv);
                          }}
                          className="font-mono"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-9 w-9 p-0 shrink-0"
                          onClick={() => {
                            setShownEnvVars((prev) => {
                              const next = new Set(prev);
                              if (next.has(key)) {
                                next.delete(key);
                              } else {
                                next.add(key);
                              }
                              return next;
                            });
                          }}
                          aria-label={
                            shownEnvVars.has(key) ? "Hide value" : "Show value"
                          }
                          aria-pressed={shownEnvVars.has(key)}
                          title={
                            shownEnvVars.has(key) ? "Hide value" : "Show value"
                          }
                        >
                          {shownEnvVars.has(key) ? (
                            <Eye className="h-4 w-4" aria-hidden="true" />
                          ) : (
                            <EyeOff className="h-4 w-4" aria-hidden="true" />
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    className="w-full mt-2"
                    onClick={() => {
                      const key = "";
                      const newEnv = { ...env };
                      newEnv[key] = "";
                      setEnv(newEnv);
                    }}
                  >
                    Add Environment Variable
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Configuration */}
          <div className="space-y-2">
            <Button
              variant="outline"
              onClick={() => setShowConfig(!showConfig)}
              className="flex items-center w-full"
              data-testid="config-button"
              aria-expanded={showConfig}
            >
              {showConfig ? (
                <ChevronDown className="w-4 h-4 mr-2" />
              ) : (
                <ChevronRight className="w-4 h-4 mr-2" />
              )}
              <Settings className="w-4 h-4 mr-2" />
              Configuration
            </Button>
            {showConfig && (
              <div className="space-y-2">
                {Object.entries(config).map(([key, configItem]) => {
                  const configKey = key as keyof InspectorConfig;
                  return (
                    <div key={key} className="space-y-2">
                      <div className="flex items-center gap-1">
                        <label
                          className="text-sm font-medium text-green-600 break-all"
                          htmlFor={`${configKey}-input`}
                        >
                          {configItem.label}
                        </label>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            {configItem.description}
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      {typeof configItem.value === "number" ? (
                        <Input
                          id={`${configKey}-input`}
                          type="number"
                          data-testid={`${configKey}-input`}
                          value={configItem.value}
                          onChange={(e) => {
                            const newConfig = { ...config };
                            newConfig[configKey] = {
                              ...configItem,
                              value: Number(e.target.value),
                            };
                            setConfig(newConfig);
                          }}
                          className="font-mono"
                        />
                      ) : typeof configItem.value === "boolean" ? (
                        <Select
                          data-testid={`${configKey}-select`}
                          value={configItem.value.toString()}
                          onValueChange={(val) => {
                            const newConfig = { ...config };
                            newConfig[configKey] = {
                              ...configItem,
                              value: val === "true",
                            };
                            setConfig(newConfig);
                          }}
                        >
                          <SelectTrigger id={`${configKey}-input`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="true">True</SelectItem>
                            <SelectItem value="false">False</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          id={`${configKey}-input`}
                          data-testid={`${configKey}-input`}
                          value={configItem.value}
                          onChange={(e) => {
                            const newConfig = { ...config };
                            newConfig[configKey] = {
                              ...configItem,
                              value: e.target.value,
                            };
                            setConfig(newConfig);
                          }}
                          className="font-mono"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="space-y-2">
            {connectionStatus === "connected" && (
              <div className="grid grid-cols-2 gap-4">
                <Button
                  data-testid="connect-button"
                  onClick={() => {
                    onDisconnect();
                    onConnect();
                  }}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  {transportType === "stdio" ? "Restart" : "Reconnect"}
                </Button>
                <Button onClick={onDisconnect}>
                  <RefreshCwOff className="w-4 h-4 mr-2" />
                  Disconnect
                </Button>
              </div>
            )}
            {connectionStatus !== "connected" && (
              <Button className="w-full" onClick={onConnect}>
                <Play className="w-4 h-4 mr-2" />
                Connect
              </Button>
            )}

            <div className="flex items-center justify-center space-x-2 mb-4">
              <div
                className={`w-2 h-2 rounded-full ${(() => {
                  switch (connectionStatus) {
                    case "connected":
                      return "bg-green-500";
                    case "error":
                      return "bg-red-500";
                    case "error-connecting-to-proxy":
                      return "bg-red-500";
                    default:
                      return "bg-gray-500";
                  }
                })()}`}
              />
              <span className="text-sm text-gray-600">
                {(() => {
                  switch (connectionStatus) {
                    case "connected":
                      return "Connected";
                    case "error":
                      return "Connection Error, is your MCP server running?";
                    case "error-connecting-to-proxy":
                      return "Error Connecting to MCP Inspector Proxy - Check Console logs";
                    default:
                      return "Disconnected";
                  }
                })()}
              </span>
            </div>

            {loggingSupported && connectionStatus === "connected" && (
              <div className="space-y-2">
                <label
                  className="text-sm font-medium"
                  htmlFor="logging-level-select"
                >
                  Logging Level
                </label>
                <Select
                  value={logLevel}
                  onValueChange={(value: LoggingLevel) =>
                    sendLogLevelRequest(value)
                  }
                >
                  <SelectTrigger id="logging-level-select">
                    <SelectValue placeholder="Select logging level" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(LoggingLevelSchema.enum).map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {stdErrNotifications.length > 0 && (
              <>
                <div className="mt-4 border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium">
                      Error output from MCP server
                    </h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearStdErrNotifications}
                      className="h-8 px-2"
                    >
                      Clear
                    </Button>
                  </div>
                  <div className="mt-2 max-h-80 overflow-y-auto">
                    {stdErrNotifications.map((notification, index) => (
                      <div
                        key={index}
                        className="text-sm text-red-500 font-mono py-2 border-b border-gray-200 last:border-b-0"
                      >
                        {notification.params.content}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="p-4 border-t">
        <div className="flex items-center justify-between">
          <Select
            value={theme}
            onValueChange={(value: string) =>
              setTheme(value as "system" | "light" | "dark")
            }
          >
            <SelectTrigger className="w-[100px]" id="theme-select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="system">System</SelectItem>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" title="Inspector Documentation" asChild>
              <a
                href="https://modelcontextprotocol.io/docs/tools/inspector"
                target="_blank"
                rel="noopener noreferrer"
              >
                <CircleHelp className="w-4 h-4 text-foreground" />
              </a>
            </Button>
            <Button variant="ghost" title="Debugging Guide" asChild>
              <a
                href="https://modelcontextprotocol.io/docs/tools/debugging"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Bug className="w-4 h-4 text-foreground" />
              </a>
            </Button>
            <Button
              variant="ghost"
              title="Report bugs or contribute on GitHub"
              asChild
            >
              <a
                href="https://github.com/modelcontextprotocol/inspector"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-4 h-4 text-foreground" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;



================================================
FILE: client/src/components/ToolsTab.tsx
================================================
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import DynamicJsonForm from "./DynamicJsonForm";
import type { JsonValue, JsonSchemaType } from "@/utils/jsonUtils";
import { generateDefaultValue } from "@/utils/schemaUtils";
import {
  CallToolResultSchema,
  CompatibilityCallToolResult,
  ListToolsResult,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import { Loader2, Send } from "lucide-react";
import { useEffect, useState } from "react";
import ListPane from "./ListPane";
import JsonView from "./JsonView";

const ToolsTab = ({
  tools,
  listTools,
  clearTools,
  callTool,
  selectedTool,
  setSelectedTool,
  toolResult,
  nextCursor,
}: {
  tools: Tool[];
  listTools: () => void;
  clearTools: () => void;
  callTool: (name: string, params: Record<string, unknown>) => Promise<void>;
  selectedTool: Tool | null;
  setSelectedTool: (tool: Tool | null) => void;
  toolResult: CompatibilityCallToolResult | null;
  nextCursor: ListToolsResult["nextCursor"];
  error: string | null;
}) => {
  const [params, setParams] = useState<Record<string, unknown>>({});
  const [isToolRunning, setIsToolRunning] = useState(false);

  useEffect(() => {
    const params = Object.entries(
      selectedTool?.inputSchema.properties ?? [],
    ).map(([key, value]) => [
      key,
      generateDefaultValue(value as JsonSchemaType),
    ]);
    setParams(Object.fromEntries(params));
  }, [selectedTool]);

  const renderToolResult = () => {
    if (!toolResult) return null;

    if ("content" in toolResult) {
      const parsedResult = CallToolResultSchema.safeParse(toolResult);
      if (!parsedResult.success) {
        return (
          <>
            <h4 className="font-semibold mb-2">Invalid Tool Result:</h4>
            <JsonView data={toolResult} />
            <h4 className="font-semibold mb-2">Errors:</h4>
            {parsedResult.error.errors.map((error, idx) => (
              <JsonView data={error} key={idx} />
            ))}
          </>
        );
      }
      const structuredResult = parsedResult.data;
      const isError = structuredResult.isError ?? false;

      return (
        <>
          <h4 className="font-semibold mb-2">
            Tool Result:{" "}
            {isError ? (
              <span className="text-red-600 font-semibold">Error</span>
            ) : (
              <span className="text-green-600 font-semibold">Success</span>
            )}
          </h4>
          {structuredResult.content.map((item, index) => (
            <div key={index} className="mb-2">
              {item.type === "text" && (
                <JsonView data={item.text} isError={isError} />
              )}
              {item.type === "image" && (
                <img
                  src={`data:${item.mimeType};base64,${item.data}`}
                  alt="Tool result image"
                  className="max-w-full h-auto"
                />
              )}
              {item.type === "resource" &&
                (item.resource?.mimeType?.startsWith("audio/") ? (
                  <audio
                    controls
                    src={`data:${item.resource.mimeType};base64,${item.resource.blob}`}
                    className="w-full"
                  >
                    <p>Your browser does not support audio playback</p>
                  </audio>
                ) : (
                  <JsonView data={item.resource} />
                ))}
            </div>
          ))}
        </>
      );
    } else if ("toolResult" in toolResult) {
      return (
        <>
          <h4 className="font-semibold mb-2">Tool Result (Legacy):</h4>

          <JsonView data={toolResult.toolResult} />
        </>
      );
    }
  };

  return (
    <TabsContent value="tools">
      <div className="grid grid-cols-2 gap-4">
        <ListPane
          items={tools}
          listItems={listTools}
          clearItems={() => {
            clearTools();
            setSelectedTool(null);
          }}
          setSelectedItem={setSelectedTool}
          renderItem={(tool) => (
            <>
              <span className="flex-1">{tool.name}</span>
              <span className="text-sm text-gray-500 text-right">
                {tool.description}
              </span>
            </>
          )}
          title="Tools"
          buttonText={nextCursor ? "List More Tools" : "List Tools"}
          isButtonDisabled={!nextCursor && tools.length > 0}
        />

        <div className="bg-card rounded-lg shadow">
          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
            <h3 className="font-semibold">
              {selectedTool ? selectedTool.name : "Select a tool"}
            </h3>
          </div>
          <div className="p-4">
            {selectedTool ? (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  {selectedTool.description}
                </p>
                {Object.entries(selectedTool.inputSchema.properties ?? []).map(
                  ([key, value]) => {
                    const prop = value as JsonSchemaType;
                    return (
                      <div key={key}>
                        <Label
                          htmlFor={key}
                          className="block text-sm font-medium text-gray-700"
                        >
                          {key}
                        </Label>
                        {prop.type === "boolean" ? (
                          <div className="flex items-center space-x-2 mt-2">
                            <Checkbox
                              id={key}
                              name={key}
                              checked={!!params[key]}
                              onCheckedChange={(checked: boolean) =>
                                setParams({
                                  ...params,
                                  [key]: checked,
                                })
                              }
                            />
                            <label
                              htmlFor={key}
                              className="text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                              {prop.description || "Toggle this option"}
                            </label>
                          </div>
                        ) : prop.type === "string" ? (
                          <Textarea
                            id={key}
                            name={key}
                            placeholder={prop.description}
                            value={(params[key] as string) ?? ""}
                            onChange={(e) =>
                              setParams({
                                ...params,
                                [key]: e.target.value,
                              })
                            }
                            className="mt-1"
                          />
                        ) : prop.type === "object" || prop.type === "array" ? (
                          <div className="mt-1">
                            <DynamicJsonForm
                              schema={{
                                type: prop.type,
                                properties: prop.properties,
                                description: prop.description,
                                items: prop.items,
                              }}
                              value={
                                (params[key] as JsonValue) ??
                                generateDefaultValue(prop)
                              }
                              onChange={(newValue: JsonValue) => {
                                setParams({
                                  ...params,
                                  [key]: newValue,
                                });
                              }}
                            />
                          </div>
                        ) : prop.type === "number" ||
                          prop.type === "integer" ? (
                          <Input
                            type="number"
                            id={key}
                            name={key}
                            placeholder={prop.description}
                            value={(params[key] as string) ?? ""}
                            onChange={(e) =>
                              setParams({
                                ...params,
                                [key]: Number(e.target.value),
                              })
                            }
                            className="mt-1"
                          />
                        ) : (
                          <div className="mt-1">
                            <DynamicJsonForm
                              schema={{
                                type: prop.type,
                                properties: prop.properties,
                                description: prop.description,
                                items: prop.items,
                              }}
                              value={params[key] as JsonValue}
                              onChange={(newValue: JsonValue) => {
                                setParams({
                                  ...params,
                                  [key]: newValue,
                                });
                              }}
                            />
                          </div>
                        )}
                      </div>
                    );
                  },
                )}
                <Button
                  onClick={async () => {
                    try {
                      setIsToolRunning(true);
                      await callTool(selectedTool.name, params);
                    } finally {
                      setIsToolRunning(false);
                    }
                  }}
                  disabled={isToolRunning}
                >
                  {isToolRunning ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Running...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Run Tool
                    </>
                  )}
                </Button>
                {toolResult && renderToolResult()}
              </div>
            ) : (
              <Alert>
                <AlertDescription>
                  Select a tool from the list to view its details and run it
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </div>
    </TabsContent>
  );
};

export default ToolsTab;



================================================
FILE: client/src/components/__tests__/DynamicJsonForm.test.tsx
================================================
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, jest } from "@jest/globals";
import DynamicJsonForm from "../DynamicJsonForm";
import type { JsonSchemaType } from "@/utils/jsonUtils";

describe("DynamicJsonForm String Fields", () => {
  const renderForm = (props = {}) => {
    const defaultProps = {
      schema: {
        type: "string" as const,
        description: "Test string field",
      } satisfies JsonSchemaType,
      value: undefined,
      onChange: jest.fn(),
    };
    return render(<DynamicJsonForm {...defaultProps} {...props} />);
  };

  describe("Type Validation", () => {
    it("should handle numeric input as string type", () => {
      const onChange = jest.fn();
      renderForm({ onChange });

      const input = screen.getByRole("textbox");
      fireEvent.change(input, { target: { value: "123321" } });

      expect(onChange).toHaveBeenCalledWith("123321");
      // Verify the value is a string, not a number
      expect(typeof onChange.mock.calls[0][0]).toBe("string");
    });

    it("should render as text input, not number input", () => {
      renderForm();
      const input = screen.getByRole("textbox");
      expect(input).toHaveProperty("type", "text");
    });
  });
});

describe("DynamicJsonForm Integer Fields", () => {
  const renderForm = (props = {}) => {
    const defaultProps = {
      schema: {
        type: "integer" as const,
        description: "Test integer field",
      } satisfies JsonSchemaType,
      value: undefined,
      onChange: jest.fn(),
    };
    return render(<DynamicJsonForm {...defaultProps} {...props} />);
  };

  describe("Basic Operations", () => {
    it("should render number input with step=1", () => {
      renderForm();
      const input = screen.getByRole("spinbutton");
      expect(input).toHaveProperty("type", "number");
      expect(input).toHaveProperty("step", "1");
    });

    it("should pass integer values to onChange", () => {
      const onChange = jest.fn();
      renderForm({ onChange });

      const input = screen.getByRole("spinbutton");
      fireEvent.change(input, { target: { value: "42" } });

      expect(onChange).toHaveBeenCalledWith(42);
      // Verify the value is a number, not a string
      expect(typeof onChange.mock.calls[0][0]).toBe("number");
    });

    it("should not pass string values to onChange", () => {
      const onChange = jest.fn();
      renderForm({ onChange });

      const input = screen.getByRole("spinbutton");
      fireEvent.change(input, { target: { value: "abc" } });

      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe("Edge Cases", () => {
    it("should handle non-numeric input by not calling onChange", () => {
      const onChange = jest.fn();
      renderForm({ onChange });

      const input = screen.getByRole("spinbutton");
      fireEvent.change(input, { target: { value: "abc" } });

      expect(onChange).not.toHaveBeenCalled();
    });
  });
});

describe("DynamicJsonForm Complex Fields", () => {
  const renderForm = (props = {}) => {
    const defaultProps = {
      schema: {
        type: "object",
        properties: {
          // The simplified JsonSchemaType does not accept oneOf fields
          // But they exist in the more-complete JsonSchema7Type
          nested: { oneOf: [{ type: "string" }, { type: "integer" }] },
        },
      } as unknown as JsonSchemaType,
      value: undefined,
      onChange: jest.fn(),
    };
    return render(<DynamicJsonForm {...defaultProps} {...props} />);
  };

  describe("Basic Operations", () => {
    it("should render textbox and autoformat button, but no switch-to-form button", () => {
      renderForm();
      const input = screen.getByRole("textbox");
      expect(input).toHaveProperty("type", "textarea");
      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(1);
      expect(buttons[0]).toHaveProperty("textContent", "Format JSON");
    });

    it("should pass changed values to onChange", () => {
      const onChange = jest.fn();
      renderForm({ onChange });

      const input = screen.getByRole("textbox");
      fireEvent.change(input, {
        target: { value: `{ "nested": "i am string" }` },
      });

      // The onChange handler is debounced when using the JSON view, so we need to wait a little bit
      waitFor(() => {
        expect(onChange).toHaveBeenCalledWith(`{ "nested": "i am string" }`);
      });
    });
  });
});



================================================
FILE: client/src/components/__tests__/samplingRequest.test.tsx
================================================
import { render, screen, fireEvent } from "@testing-library/react";
import SamplingRequest from "../SamplingRequest";
import { PendingRequest } from "../SamplingTab";

const mockRequest: PendingRequest = {
  id: 1,
  request: {
    method: "sampling/createMessage",
    params: {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: "What files are in the current directory?",
          },
        },
      ],
      systemPrompt: "You are a helpful file system assistant.",
      includeContext: "thisServer",
      maxTokens: 100,
    },
  },
};

describe("Form to handle sampling response", () => {
  const mockOnApprove = jest.fn();
  const mockOnReject = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call onApprove with correct text content when Approve button is clicked", () => {
    render(
      <SamplingRequest
        request={mockRequest}
        onApprove={mockOnApprove}
        onReject={mockOnReject}
      />,
    );

    // Click the Approve button
    fireEvent.click(screen.getByRole("button", { name: /approve/i }));

    // Assert that onApprove is called with the correct arguments
    expect(mockOnApprove).toHaveBeenCalledWith(mockRequest.id, {
      model: "stub-model",
      stopReason: "endTurn",
      role: "assistant",
      content: {
        type: "text",
        text: "",
      },
    });
  });

  it("should call onReject with correct request id when Reject button is clicked", () => {
    render(
      <SamplingRequest
        request={mockRequest}
        onApprove={mockOnApprove}
        onReject={mockOnReject}
      />,
    );

    // Click the Approve button
    fireEvent.click(screen.getByRole("button", { name: /Reject/i }));

    // Assert that onApprove is called with the correct arguments
    expect(mockOnReject).toHaveBeenCalledWith(mockRequest.id);
  });
});



================================================
FILE: client/src/components/__tests__/samplingTab.test.tsx
================================================
import { render, screen } from "@testing-library/react";
import { Tabs } from "@/components/ui/tabs";
import SamplingTab, { PendingRequest } from "../SamplingTab";

describe("Sampling tab", () => {
  const mockOnApprove = jest.fn();
  const mockOnReject = jest.fn();

  const renderSamplingTab = (pendingRequests: PendingRequest[]) =>
    render(
      <Tabs defaultValue="sampling">
        <SamplingTab
          pendingRequests={pendingRequests}
          onApprove={mockOnApprove}
          onReject={mockOnReject}
        />
      </Tabs>,
    );

  it("should render 'No pending requests' when there are no pending requests", () => {
    renderSamplingTab([]);
    expect(
      screen.getByText(
        "When the server requests LLM sampling, requests will appear here for approval.",
      ),
    ).toBeTruthy();
    expect(screen.findByText("No pending requests")).toBeTruthy();
  });

  it("should render the correct number of requests", () => {
    renderSamplingTab(
      Array.from({ length: 5 }, (_, i) => ({
        id: i,
        request: {
          method: "sampling/createMessage",
          params: {
            messages: [
              {
                role: "user",
                content: {
                  type: "text",
                  text: "What files are in the current directory?",
                },
              },
            ],
            systemPrompt: "You are a helpful file system assistant.",
            includeContext: "thisServer",
            maxTokens: 100,
          },
        },
      })),
    );
    expect(screen.getAllByTestId("sampling-request").length).toBe(5);
  });
});



================================================
FILE: client/src/components/__tests__/Sidebar.test.tsx
================================================
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, beforeEach, jest } from "@jest/globals";
import Sidebar from "../Sidebar";
import { DEFAULT_INSPECTOR_CONFIG } from "@/lib/constants";
import { InspectorConfig } from "@/lib/configurationTypes";
import { TooltipProvider } from "@/components/ui/tooltip";

// Mock theme hook
jest.mock("../../lib/hooks/useTheme", () => ({
  __esModule: true,
  default: () => ["light", jest.fn()],
}));

describe("Sidebar Environment Variables", () => {
  const defaultProps = {
    connectionStatus: "disconnected" as const,
    transportType: "stdio" as const,
    setTransportType: jest.fn(),
    command: "",
    setCommand: jest.fn(),
    args: "",
    setArgs: jest.fn(),
    sseUrl: "",
    setSseUrl: jest.fn(),
    env: {},
    setEnv: jest.fn(),
    bearerToken: "",
    setBearerToken: jest.fn(),
    onConnect: jest.fn(),
    onDisconnect: jest.fn(),
    stdErrNotifications: [],
    clearStdErrNotifications: jest.fn(),
    logLevel: "info" as const,
    sendLogLevelRequest: jest.fn(),
    loggingSupported: true,
    config: DEFAULT_INSPECTOR_CONFIG,
    setConfig: jest.fn(),
  };

  const renderSidebar = (props = {}) => {
    return render(
      <TooltipProvider>
        <Sidebar {...defaultProps} {...props} />
      </TooltipProvider>,
    );
  };

  const openEnvVarsSection = () => {
    const button = screen.getByTestId("env-vars-button");
    fireEvent.click(button);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Basic Operations", () => {
    it("should add a new environment variable", () => {
      const setEnv = jest.fn();
      renderSidebar({ env: {}, setEnv });

      openEnvVarsSection();

      const addButton = screen.getByText("Add Environment Variable");
      fireEvent.click(addButton);

      expect(setEnv).toHaveBeenCalledWith({ "": "" });
    });

    it("should remove an environment variable", () => {
      const setEnv = jest.fn();
      const initialEnv = { TEST_KEY: "test_value" };
      renderSidebar({ env: initialEnv, setEnv });

      openEnvVarsSection();

      const removeButton = screen.getByRole("button", { name: "×" });
      fireEvent.click(removeButton);

      expect(setEnv).toHaveBeenCalledWith({});
    });

    it("should update environment variable value", () => {
      const setEnv = jest.fn();
      const initialEnv = { TEST_KEY: "test_value" };
      renderSidebar({ env: initialEnv, setEnv });

      openEnvVarsSection();

      const valueInput = screen.getByDisplayValue("test_value");
      fireEvent.change(valueInput, { target: { value: "new_value" } });

      expect(setEnv).toHaveBeenCalledWith({ TEST_KEY: "new_value" });
    });

    it("should toggle value visibility", () => {
      const initialEnv = { TEST_KEY: "test_value" };
      renderSidebar({ env: initialEnv });

      openEnvVarsSection();

      const valueInput = screen.getByDisplayValue("test_value");
      expect(valueInput).toHaveProperty("type", "password");

      const toggleButton = screen.getByRole("button", { name: /show value/i });
      fireEvent.click(toggleButton);

      expect(valueInput).toHaveProperty("type", "text");
    });
  });

  describe("Authentication", () => {
    const openAuthSection = () => {
      const button = screen.getByTestId("auth-button");
      fireEvent.click(button);
    };

    it("should update bearer token", () => {
      const setBearerToken = jest.fn();
      renderSidebar({
        bearerToken: "",
        setBearerToken,
        transportType: "sse", // Set transport type to SSE
      });

      openAuthSection();

      const tokenInput = screen.getByTestId("bearer-token-input");
      fireEvent.change(tokenInput, { target: { value: "new_token" } });

      expect(setBearerToken).toHaveBeenCalledWith("new_token");
    });

    it("should update header name", () => {
      const setHeaderName = jest.fn();
      renderSidebar({
        headerName: "Authorization",
        setHeaderName,
        transportType: "sse",
      });

      openAuthSection();

      const headerInput = screen.getByTestId("header-input");
      fireEvent.change(headerInput, { target: { value: "X-Custom-Auth" } });

      expect(setHeaderName).toHaveBeenCalledWith("X-Custom-Auth");
    });

    it("should clear bearer token", () => {
      const setBearerToken = jest.fn();
      renderSidebar({
        bearerToken: "existing_token",
        setBearerToken,
        transportType: "sse", // Set transport type to SSE
      });

      openAuthSection();

      const tokenInput = screen.getByTestId("bearer-token-input");
      fireEvent.change(tokenInput, { target: { value: "" } });

      expect(setBearerToken).toHaveBeenCalledWith("");
    });

    it("should properly render bearer token input", () => {
      const { rerender } = renderSidebar({
        bearerToken: "existing_token",
        transportType: "sse", // Set transport type to SSE
      });

      openAuthSection();

      // Token input should be a password field
      const tokenInput = screen.getByTestId("bearer-token-input");
      expect(tokenInput).toHaveProperty("type", "password");

      // Update the token
      fireEvent.change(tokenInput, { target: { value: "new_token" } });

      // Rerender with updated token
      rerender(
        <TooltipProvider>
          <Sidebar
            {...defaultProps}
            bearerToken="new_token"
            transportType="sse"
          />
        </TooltipProvider>,
      );

      // Token input should still exist after update
      expect(screen.getByTestId("bearer-token-input")).toBeInTheDocument();
    });

    it("should maintain token visibility state after update", () => {
      const { rerender } = renderSidebar({
        bearerToken: "existing_token",
        transportType: "sse", // Set transport type to SSE
      });

      openAuthSection();

      // Token input should be a password field
      const tokenInput = screen.getByTestId("bearer-token-input");
      expect(tokenInput).toHaveProperty("type", "password");

      // Update the token
      fireEvent.change(tokenInput, { target: { value: "new_token" } });

      // Rerender with updated token
      rerender(
        <TooltipProvider>
          <Sidebar
            {...defaultProps}
            bearerToken="new_token"
            transportType="sse"
          />
        </TooltipProvider>,
      );

      // Token input should still exist after update
      expect(screen.getByTestId("bearer-token-input")).toBeInTheDocument();
    });

    it("should maintain header name when toggling auth section", () => {
      renderSidebar({
        headerName: "X-API-Key",
        transportType: "sse",
      });

      // Open auth section
      openAuthSection();

      // Verify header name is displayed
      const headerInput = screen.getByTestId("header-input");
      expect(headerInput).toHaveValue("X-API-Key");

      // Close auth section
      const authButton = screen.getByTestId("auth-button");
      fireEvent.click(authButton);

      // Reopen auth section
      fireEvent.click(authButton);

      // Verify header name is still preserved
      expect(screen.getByTestId("header-input")).toHaveValue("X-API-Key");
    });

    it("should display default header name when not specified", () => {
      renderSidebar({
        headerName: undefined,
        transportType: "sse",
      });

      openAuthSection();

      const headerInput = screen.getByTestId("header-input");
      expect(headerInput).toHaveAttribute("placeholder", "Authorization");
    });
  });

  describe("Key Editing", () => {
    it("should maintain order when editing first key", () => {
      const setEnv = jest.fn();
      const initialEnv = {
        FIRST_KEY: "first_value",
        SECOND_KEY: "second_value",
        THIRD_KEY: "third_value",
      };
      renderSidebar({ env: initialEnv, setEnv });

      openEnvVarsSection();

      const firstKeyInput = screen.getByDisplayValue("FIRST_KEY");
      fireEvent.change(firstKeyInput, { target: { value: "NEW_FIRST_KEY" } });

      expect(setEnv).toHaveBeenCalledWith({
        NEW_FIRST_KEY: "first_value",
        SECOND_KEY: "second_value",
        THIRD_KEY: "third_value",
      });
    });

    it("should maintain order when editing middle key", () => {
      const setEnv = jest.fn();
      const initialEnv = {
        FIRST_KEY: "first_value",
        SECOND_KEY: "second_value",
        THIRD_KEY: "third_value",
      };
      renderSidebar({ env: initialEnv, setEnv });

      openEnvVarsSection();

      const middleKeyInput = screen.getByDisplayValue("SECOND_KEY");
      fireEvent.change(middleKeyInput, { target: { value: "NEW_SECOND_KEY" } });

      expect(setEnv).toHaveBeenCalledWith({
        FIRST_KEY: "first_value",
        NEW_SECOND_KEY: "second_value",
        THIRD_KEY: "third_value",
      });
    });

    it("should maintain order when editing last key", () => {
      const setEnv = jest.fn();
      const initialEnv = {
        FIRST_KEY: "first_value",
        SECOND_KEY: "second_value",
        THIRD_KEY: "third_value",
      };
      renderSidebar({ env: initialEnv, setEnv });

      openEnvVarsSection();

      const lastKeyInput = screen.getByDisplayValue("THIRD_KEY");
      fireEvent.change(lastKeyInput, { target: { value: "NEW_THIRD_KEY" } });

      expect(setEnv).toHaveBeenCalledWith({
        FIRST_KEY: "first_value",
        SECOND_KEY: "second_value",
        NEW_THIRD_KEY: "third_value",
      });
    });

    it("should maintain order during key editing", () => {
      const setEnv = jest.fn();
      const initialEnv = {
        KEY1: "value1",
        KEY2: "value2",
      };
      renderSidebar({ env: initialEnv, setEnv });

      openEnvVarsSection();

      // Type "NEW_" one character at a time
      const key1Input = screen.getByDisplayValue("KEY1");
      "NEW_".split("").forEach((char) => {
        fireEvent.change(key1Input, {
          target: { value: char + "KEY1".slice(1) },
        });
      });

      // Verify the last setEnv call maintains the order
      const lastCall = setEnv.mock.calls[
        setEnv.mock.calls.length - 1
      ][0] as Record<string, string>;
      const entries = Object.entries(lastCall);

      // The values should stay with their original keys
      expect(entries[0][1]).toBe("value1"); // First entry should still have value1
      expect(entries[1][1]).toBe("value2"); // Second entry should still have value2
    });
  });

  describe("Multiple Operations", () => {
    it("should maintain state after multiple key edits", () => {
      const setEnv = jest.fn();
      const initialEnv = {
        FIRST_KEY: "first_value",
        SECOND_KEY: "second_value",
      };
      const { rerender } = renderSidebar({ env: initialEnv, setEnv });

      openEnvVarsSection();

      // First key edit
      const firstKeyInput = screen.getByDisplayValue("FIRST_KEY");
      fireEvent.change(firstKeyInput, { target: { value: "NEW_FIRST_KEY" } });

      // Get the updated env from the first setEnv call
      const updatedEnv = setEnv.mock.calls[0][0] as Record<string, string>;

      // Rerender with the updated env
      rerender(
        <TooltipProvider>
          <Sidebar {...defaultProps} env={updatedEnv} setEnv={setEnv} />
        </TooltipProvider>,
      );

      // Second key edit
      const secondKeyInput = screen.getByDisplayValue("SECOND_KEY");
      fireEvent.change(secondKeyInput, { target: { value: "NEW_SECOND_KEY" } });

      // Verify the final state matches what we expect
      expect(setEnv).toHaveBeenLastCalledWith({
        NEW_FIRST_KEY: "first_value",
        NEW_SECOND_KEY: "second_value",
      });
    });

    it("should maintain visibility state after key edit", () => {
      const initialEnv = { TEST_KEY: "test_value" };
      const { rerender } = renderSidebar({ env: initialEnv });

      openEnvVarsSection();

      // Show the value
      const toggleButton = screen.getByRole("button", { name: /show value/i });
      fireEvent.click(toggleButton);

      const valueInput = screen.getByDisplayValue("test_value");
      expect(valueInput).toHaveProperty("type", "text");

      // Edit the key
      const keyInput = screen.getByDisplayValue("TEST_KEY");
      fireEvent.change(keyInput, { target: { value: "NEW_KEY" } });

      // Rerender with updated env
      rerender(
        <TooltipProvider>
          <Sidebar {...defaultProps} env={{ NEW_KEY: "test_value" }} />
        </TooltipProvider>,
      );

      // Value should still be visible
      const updatedValueInput = screen.getByDisplayValue("test_value");
      expect(updatedValueInput).toHaveProperty("type", "text");
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty key", () => {
      const setEnv = jest.fn();
      const initialEnv = { TEST_KEY: "test_value" };
      renderSidebar({ env: initialEnv, setEnv });

      openEnvVarsSection();

      const keyInput = screen.getByDisplayValue("TEST_KEY");
      fireEvent.change(keyInput, { target: { value: "" } });

      expect(setEnv).toHaveBeenCalledWith({ "": "test_value" });
    });

    it("should handle special characters in key", () => {
      const setEnv = jest.fn();
      const initialEnv = { TEST_KEY: "test_value" };
      renderSidebar({ env: initialEnv, setEnv });

      openEnvVarsSection();

      const keyInput = screen.getByDisplayValue("TEST_KEY");
      fireEvent.change(keyInput, { target: { value: "TEST-KEY@123" } });

      expect(setEnv).toHaveBeenCalledWith({ "TEST-KEY@123": "test_value" });
    });

    it("should handle unicode characters", () => {
      const setEnv = jest.fn();
      const initialEnv = { TEST_KEY: "test_value" };
      renderSidebar({ env: initialEnv, setEnv });

      openEnvVarsSection();

      const keyInput = screen.getByDisplayValue("TEST_KEY");
      fireEvent.change(keyInput, { target: { value: "TEST_🔑" } });

      expect(setEnv).toHaveBeenCalledWith({ "TEST_🔑": "test_value" });
    });

    it("should handle very long key names", () => {
      const setEnv = jest.fn();
      const initialEnv = { TEST_KEY: "test_value" };
      renderSidebar({ env: initialEnv, setEnv });

      openEnvVarsSection();

      const keyInput = screen.getByDisplayValue("TEST_KEY");
      const longKey = "A".repeat(100);
      fireEvent.change(keyInput, { target: { value: longKey } });

      expect(setEnv).toHaveBeenCalledWith({ [longKey]: "test_value" });
    });
  });

  describe("Configuration Operations", () => {
    const openConfigSection = () => {
      const button = screen.getByTestId("config-button");
      fireEvent.click(button);
    };

    it("should update MCP server request timeout", () => {
      const setConfig = jest.fn();
      renderSidebar({ config: DEFAULT_INSPECTOR_CONFIG, setConfig });

      openConfigSection();

      const timeoutInput = screen.getByTestId(
        "MCP_SERVER_REQUEST_TIMEOUT-input",
      );
      fireEvent.change(timeoutInput, { target: { value: "5000" } });

      expect(setConfig).toHaveBeenCalledWith(
        expect.objectContaining({
          MCP_SERVER_REQUEST_TIMEOUT: {
            label: "Request Timeout",
            description: "Timeout for requests to the MCP server (ms)",
            value: 5000,
          },
        }),
      );
    });

    it("should update MCP server proxy address", () => {
      const setConfig = jest.fn();
      renderSidebar({ config: DEFAULT_INSPECTOR_CONFIG, setConfig });

      openConfigSection();

      const proxyAddressInput = screen.getByTestId(
        "MCP_PROXY_FULL_ADDRESS-input",
      );
      fireEvent.change(proxyAddressInput, {
        target: { value: "http://localhost:8080" },
      });

      expect(setConfig).toHaveBeenCalledWith(
        expect.objectContaining({
          MCP_PROXY_FULL_ADDRESS: {
            label: "Inspector Proxy Address",
            description:
              "Set this if you are running the MCP Inspector Proxy on a non-default address. Example: http://10.1.1.22:5577",
            value: "http://localhost:8080",
          },
        }),
      );
    });

    it("should update max total timeout", () => {
      const setConfig = jest.fn();
      renderSidebar({ config: DEFAULT_INSPECTOR_CONFIG, setConfig });

      openConfigSection();

      const maxTotalTimeoutInput = screen.getByTestId(
        "MCP_REQUEST_MAX_TOTAL_TIMEOUT-input",
      );
      fireEvent.change(maxTotalTimeoutInput, {
        target: { value: "10000" },
      });

      expect(setConfig).toHaveBeenCalledWith(
        expect.objectContaining({
          MCP_REQUEST_MAX_TOTAL_TIMEOUT: {
            label: "Maximum Total Timeout",
            description:
              "Maximum total timeout for requests sent to the MCP server (ms) (Use with progress notifications)",
            value: 10000,
          },
        }),
      );
    });

    it("should handle invalid timeout values entered by user", () => {
      const setConfig = jest.fn();
      renderSidebar({ config: DEFAULT_INSPECTOR_CONFIG, setConfig });

      openConfigSection();

      const timeoutInput = screen.getByTestId(
        "MCP_SERVER_REQUEST_TIMEOUT-input",
      );
      fireEvent.change(timeoutInput, { target: { value: "abc1" } });

      expect(setConfig).toHaveBeenCalledWith(
        expect.objectContaining({
          MCP_SERVER_REQUEST_TIMEOUT: {
            label: "Request Timeout",
            description: "Timeout for requests to the MCP server (ms)",
            value: 0,
          },
        }),
      );
    });

    it("should maintain configuration state after multiple updates", () => {
      const setConfig = jest.fn();
      const { rerender } = renderSidebar({
        config: DEFAULT_INSPECTOR_CONFIG,
        setConfig,
      });

      openConfigSection();
      // First update
      const timeoutInput = screen.getByTestId(
        "MCP_SERVER_REQUEST_TIMEOUT-input",
      );
      fireEvent.change(timeoutInput, { target: { value: "5000" } });

      // Get the updated config from the first setConfig call
      const updatedConfig = setConfig.mock.calls[0][0] as InspectorConfig;

      // Rerender with the updated config
      rerender(
        <TooltipProvider>
          <Sidebar
            {...defaultProps}
            config={updatedConfig}
            setConfig={setConfig}
          />
        </TooltipProvider>,
      );

      // Second update
      const updatedTimeoutInput = screen.getByTestId(
        "MCP_SERVER_REQUEST_TIMEOUT-input",
      );
      fireEvent.change(updatedTimeoutInput, { target: { value: "3000" } });

      // Verify the final state matches what we expect
      expect(setConfig).toHaveBeenLastCalledWith(
        expect.objectContaining({
          MCP_SERVER_REQUEST_TIMEOUT: {
            label: "Request Timeout",
            description: "Timeout for requests to the MCP server (ms)",
            value: 3000,
          },
        }),
      );
    });
  });
});



================================================
FILE: client/src/components/__tests__/ToolsTab.test.tsx
================================================
import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, jest } from "@jest/globals";
import "@testing-library/jest-dom";
import ToolsTab from "../ToolsTab";
import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { Tabs } from "@/components/ui/tabs";

describe("ToolsTab", () => {
  const mockTools: Tool[] = [
    {
      name: "tool1",
      description: "First tool",
      inputSchema: {
        type: "object" as const,
        properties: {
          num: { type: "number" as const },
        },
      },
    },
    {
      name: "tool3",
      description: "Integer tool",
      inputSchema: {
        type: "object" as const,
        properties: {
          count: { type: "integer" as const },
        },
      },
    },
    {
      name: "tool2",
      description: "Second tool",
      inputSchema: {
        type: "object" as const,
        properties: {
          num: { type: "number" as const },
        },
      },
    },
  ];

  const defaultProps = {
    tools: mockTools,
    listTools: jest.fn(),
    clearTools: jest.fn(),
    callTool: jest.fn(async () => {}),
    selectedTool: null,
    setSelectedTool: jest.fn(),
    toolResult: null,
    nextCursor: "",
    error: null,
  };

  const renderToolsTab = (props = {}) => {
    return render(
      <Tabs defaultValue="tools">
        <ToolsTab {...defaultProps} {...props} />
      </Tabs>,
    );
  };

  it("should reset input values when switching tools", async () => {
    const { rerender } = renderToolsTab({
      selectedTool: mockTools[0],
    });

    // Enter a value in the first tool's input
    const input = screen.getByRole("spinbutton") as HTMLInputElement;
    await act(async () => {
      fireEvent.change(input, { target: { value: "42" } });
    });
    expect(input.value).toBe("42");

    // Switch to second tool
    rerender(
      <Tabs defaultValue="tools">
        <ToolsTab {...defaultProps} selectedTool={mockTools[2]} />
      </Tabs>,
    );

    // Verify input is reset
    const newInput = screen.getByRole("spinbutton") as HTMLInputElement;
    expect(newInput.value).toBe("");
  });

  it("should handle integer type inputs", async () => {
    renderToolsTab({
      selectedTool: mockTools[1], // Use the tool with integer type
    });

    const input = screen.getByRole("spinbutton", {
      name: /count/i,
    }) as HTMLInputElement;
    expect(input).toHaveProperty("type", "number");
    fireEvent.change(input, { target: { value: "42" } });
    expect(input.value).toBe("42");

    const submitButton = screen.getByRole("button", { name: /run tool/i });
    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(defaultProps.callTool).toHaveBeenCalledWith(mockTools[1].name, {
      count: 42,
    });
  });

  it("should disable button and change text while tool is running", async () => {
    // Create a promise that we can resolve later
    let resolvePromise: ((value: unknown) => void) | undefined;
    const mockPromise = new Promise((resolve) => {
      resolvePromise = resolve;
    });

    // Mock callTool to return our promise
    const mockCallTool = jest.fn().mockReturnValue(mockPromise);

    renderToolsTab({
      selectedTool: mockTools[0],
      callTool: mockCallTool,
    });

    const submitButton = screen.getByRole("button", { name: /run tool/i });
    expect(submitButton.getAttribute("disabled")).toBeNull();

    // Click the button and verify immediate state changes
    await act(async () => {
      fireEvent.click(submitButton);
    });

    // Verify button is disabled and text changed
    expect(submitButton.getAttribute("disabled")).not.toBeNull();
    expect(submitButton.textContent).toBe("Running...");

    // Resolve the promise to simulate tool completion
    await act(async () => {
      if (resolvePromise) {
        await resolvePromise({});
      }
    });

    expect(submitButton.getAttribute("disabled")).toBeNull();
  });
});



================================================
FILE: client/src/components/ui/alert.tsx
================================================
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };



================================================
FILE: client/src/components/ui/button.tsx
================================================
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };



================================================
FILE: client/src/components/ui/checkbox.tsx
================================================
"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };



================================================
FILE: client/src/components/ui/combobox.tsx
================================================
import React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ComboboxProps {
  value: string;
  onChange: (value: string) => void;
  onInputChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  emptyMessage?: string;
  id?: string;
}

export function Combobox({
  value,
  onChange,
  onInputChange,
  options = [],
  placeholder = "Select...",
  emptyMessage = "No results found.",
  id,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = React.useCallback(
    (option: string) => {
      onChange(option);
      setOpen(false);
    },
    [onChange],
  );

  const handleInputChange = React.useCallback(
    (value: string) => {
      onInputChange(value);
    },
    [onInputChange],
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-controls={id}
          className="w-full justify-between"
        >
          {value || placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command shouldFilter={false} id={id}>
          <CommandInput
            placeholder={placeholder}
            value={value}
            onValueChange={handleInputChange}
          />
          <CommandEmpty>{emptyMessage}</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option}
                value={option}
                onSelect={() => handleSelect(option)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === option ? "opacity-100" : "opacity-0",
                  )}
                />
                {option}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}



================================================
FILE: client/src/components/ui/command.tsx
================================================
import * as React from "react";
import { type DialogProps } from "@radix-ui/react-dialog";
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className,
    )}
    {...props}
  />
));
Command.displayName = CommandPrimitive.displayName;

const CommandDialog = ({ children, ...props }: DialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
};

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    <MagnifyingGlassIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  </div>
));

CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
));

CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="py-6 text-center text-sm"
    {...props}
  />
));

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className,
    )}
    {...props}
  />
));

CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 h-px bg-border", className)}
    {...props}
  />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      className,
    )}
    {...props}
  />
));

CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
};
CommandShortcut.displayName = "CommandShortcut";

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};



================================================
FILE: client/src/components/ui/dialog.tsx
================================================
"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { Cross2Icon } from "@radix-ui/react-icons";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <Cross2Icon className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className,
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};



================================================
FILE: client/src/components/ui/input.tsx
================================================
import * as React from "react";

import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };



================================================
FILE: client/src/components/ui/label.tsx
================================================
import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };



================================================
FILE: client/src/components/ui/popover.tsx
================================================
import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "@/lib/utils";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverAnchor = PopoverPrimitive.Anchor;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };



================================================
FILE: client/src/components/ui/select.tsx
================================================
import * as React from "react";
import {
  CaretSortIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import * as SelectPrimitive from "@radix-ui/react-select";

import { cn } from "@/lib/utils";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 hover:border-[#646cff] hover:border-1",
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <CaretSortIcon className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className,
    )}
    {...props}
  >
    <ChevronUpIcon />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className,
    )}
    {...props}
  >
    <ChevronDownIcon />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <CheckIcon className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};



================================================
FILE: client/src/components/ui/tabs.tsx
================================================
import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-muted data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };



================================================
FILE: client/src/components/ui/textarea.tsx
================================================
import * as React from "react";

import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };



================================================
FILE: client/src/components/ui/toast.tsx
================================================
import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Cross2Icon } from "@radix-ui/react-icons";

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className,
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive:
          "destructive group border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className,
    )}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className,
    )}
    toast-close=""
    {...props}
  >
    <Cross2Icon className="h-4 w-4" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold [&+div]:text-xs", className)}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};



================================================
FILE: client/src/components/ui/toaster.tsx
================================================
import { useToast } from "@/lib/hooks/useToast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}



================================================
FILE: client/src/components/ui/tooltip.tsx
================================================
"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-tooltip-content-transform-origin]",
      className,
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };



================================================
FILE: client/src/lib/auth.ts
================================================
import { OAuthClientProvider } from "@modelcontextprotocol/sdk/client/auth.js";
import {
  OAuthClientInformationSchema,
  OAuthClientInformation,
  OAuthTokens,
  OAuthTokensSchema,
} from "@modelcontextprotocol/sdk/shared/auth.js";
import { SESSION_KEYS, getServerSpecificKey } from "./constants";

export class InspectorOAuthClientProvider implements OAuthClientProvider {
  constructor(private serverUrl: string) {
    // Save the server URL to session storage
    sessionStorage.setItem(SESSION_KEYS.SERVER_URL, serverUrl);
  }

  get redirectUrl() {
    return window.location.origin + "/oauth/callback";
  }

  get clientMetadata() {
    return {
      redirect_uris: [this.redirectUrl],
      token_endpoint_auth_method: "none",
      grant_types: ["authorization_code", "refresh_token"],
      response_types: ["code"],
      client_name: "MCP Inspector",
      client_uri: "https://github.com/modelcontextprotocol/inspector",
    };
  }

  async clientInformation() {
    const key = getServerSpecificKey(
      SESSION_KEYS.CLIENT_INFORMATION,
      this.serverUrl,
    );
    const value = sessionStorage.getItem(key);
    if (!value) {
      return undefined;
    }

    return await OAuthClientInformationSchema.parseAsync(JSON.parse(value));
  }

  saveClientInformation(clientInformation: OAuthClientInformation) {
    const key = getServerSpecificKey(
      SESSION_KEYS.CLIENT_INFORMATION,
      this.serverUrl,
    );
    sessionStorage.setItem(key, JSON.stringify(clientInformation));
  }

  async tokens() {
    const key = getServerSpecificKey(SESSION_KEYS.TOKENS, this.serverUrl);
    const tokens = sessionStorage.getItem(key);
    if (!tokens) {
      return undefined;
    }

    return await OAuthTokensSchema.parseAsync(JSON.parse(tokens));
  }

  saveTokens(tokens: OAuthTokens) {
    const key = getServerSpecificKey(SESSION_KEYS.TOKENS, this.serverUrl);
    sessionStorage.setItem(key, JSON.stringify(tokens));
  }

  redirectToAuthorization(authorizationUrl: URL) {
    window.location.href = authorizationUrl.href;
  }

  saveCodeVerifier(codeVerifier: string) {
    const key = getServerSpecificKey(
      SESSION_KEYS.CODE_VERIFIER,
      this.serverUrl,
    );
    sessionStorage.setItem(key, codeVerifier);
  }

  codeVerifier() {
    const key = getServerSpecificKey(
      SESSION_KEYS.CODE_VERIFIER,
      this.serverUrl,
    );
    const verifier = sessionStorage.getItem(key);
    if (!verifier) {
      throw new Error("No code verifier saved for session");
    }

    return verifier;
  }

  clear() {
    sessionStorage.removeItem(
      getServerSpecificKey(SESSION_KEYS.CLIENT_INFORMATION, this.serverUrl),
    );
    sessionStorage.removeItem(
      getServerSpecificKey(SESSION_KEYS.TOKENS, this.serverUrl),
    );
    sessionStorage.removeItem(
      getServerSpecificKey(SESSION_KEYS.CODE_VERIFIER, this.serverUrl),
    );
  }
}



================================================
FILE: client/src/lib/configurationTypes.ts
================================================
export type ConfigItem = {
  label: string;
  description: string;
  value: string | number | boolean;
};

/**
 * Configuration interface for the MCP Inspector, including settings for the MCP Client,
 * Proxy Server, and Inspector UI/UX.
 *
 * Note: Configuration related to which MCP Server to use or any other MCP Server
 * specific settings are outside the scope of this interface as of now.
 */
export type InspectorConfig = {
  /**
   * Maximum time in milliseconds to wait for a response from the MCP server before timing out.
   */
  MCP_SERVER_REQUEST_TIMEOUT: ConfigItem;

  /**
   * Whether to reset the timeout on progress notifications. Useful for long-running operations that send periodic progress updates.
   * Refer: https://spec.modelcontextprotocol.io/specification/2025-03-26/basic/utilities/progress/#progress-flow
   */
  MCP_REQUEST_TIMEOUT_RESET_ON_PROGRESS: ConfigItem;

  /**
   * Maximum total time in milliseconds to wait for a response from the MCP server before timing out. Used in conjunction with MCP_SERVER_REQUEST_TIMEOUT_RESET_ON_PROGRESS.
   * Refer: https://spec.modelcontextprotocol.io/specification/2025-03-26/basic/utilities/progress/#progress-flow
   */
  MCP_REQUEST_MAX_TOTAL_TIMEOUT: ConfigItem;

  /**
   * The full address of the MCP Proxy Server, in case it is running on a non-default address. Example: http://10.1.1.22:5577
   */
  MCP_PROXY_FULL_ADDRESS: ConfigItem;
};



================================================
FILE: client/src/lib/constants.ts
================================================
import { InspectorConfig } from "./configurationTypes";

// OAuth-related session storage keys
export const SESSION_KEYS = {
  CODE_VERIFIER: "mcp_code_verifier",
  SERVER_URL: "mcp_server_url",
  TOKENS: "mcp_tokens",
  CLIENT_INFORMATION: "mcp_client_information",
} as const;

// Generate server-specific session storage keys
export const getServerSpecificKey = (
  baseKey: string,
  serverUrl?: string,
): string => {
  if (!serverUrl) return baseKey;
  return `[${serverUrl}] ${baseKey}`;
};

export type ConnectionStatus =
  | "disconnected"
  | "connected"
  | "error"
  | "error-connecting-to-proxy";

export const DEFAULT_MCP_PROXY_LISTEN_PORT = "6277";

/**
 * Default configuration for the MCP Inspector, Currently persisted in local_storage in the Browser.
 * Future plans: Provide json config file + Browser local_storage to override default values
 **/
export const DEFAULT_INSPECTOR_CONFIG: InspectorConfig = {
  MCP_SERVER_REQUEST_TIMEOUT: {
    label: "Request Timeout",
    description: "Timeout for requests to the MCP server (ms)",
    value: 10000,
  },
  MCP_REQUEST_TIMEOUT_RESET_ON_PROGRESS: {
    label: "Reset Timeout on Progress",
    description: "Reset timeout on progress notifications",
    value: true,
  },
  MCP_REQUEST_MAX_TOTAL_TIMEOUT: {
    label: "Maximum Total Timeout",
    description:
      "Maximum total timeout for requests sent to the MCP server (ms) (Use with progress notifications)",
    value: 60000,
  },
  MCP_PROXY_FULL_ADDRESS: {
    label: "Inspector Proxy Address",
    description:
      "Set this if you are running the MCP Inspector Proxy on a non-default address. Example: http://10.1.1.22:5577",
    value: "",
  },
} as const;



================================================
FILE: client/src/lib/notificationTypes.ts
================================================
import {
  NotificationSchema as BaseNotificationSchema,
  ClientNotificationSchema,
  ServerNotificationSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

export const StdErrNotificationSchema = BaseNotificationSchema.extend({
  method: z.literal("notifications/stderr"),
  params: z.object({
    content: z.string(),
  }),
});

export const NotificationSchema = ClientNotificationSchema.or(
  StdErrNotificationSchema,
)
  .or(ServerNotificationSchema)
  .or(BaseNotificationSchema);

export type StdErrNotification = z.infer<typeof StdErrNotificationSchema>;
export type Notification = z.infer<typeof NotificationSchema>;



================================================
FILE: client/src/lib/utils.ts
================================================
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}



================================================
FILE: client/src/lib/hooks/useCompletionState.ts
================================================
import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import {
  ResourceReference,
  PromptReference,
} from "@modelcontextprotocol/sdk/types.js";

interface CompletionState {
  completions: Record<string, string[]>;
  loading: Record<string, boolean>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function debounce<T extends (...args: any[]) => PromiseLike<void>>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      void func(...args);
    }, wait);
  };
}

export function useCompletionState(
  handleCompletion: (
    ref: ResourceReference | PromptReference,
    argName: string,
    value: string,
    signal?: AbortSignal,
  ) => Promise<string[]>,
  completionsSupported: boolean = true,
  debounceMs: number = 300,
) {
  const [state, setState] = useState<CompletionState>({
    completions: {},
    loading: {},
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  const cleanup = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  const clearCompletions = useCallback(() => {
    cleanup();
    setState({
      completions: {},
      loading: {},
    });
  }, [cleanup]);

  const requestCompletions = useMemo(() => {
    return debounce(
      async (
        ref: ResourceReference | PromptReference,
        argName: string,
        value: string,
      ) => {
        if (!completionsSupported) {
          return;
        }

        cleanup();

        const abortController = new AbortController();
        abortControllerRef.current = abortController;

        setState((prev) => ({
          ...prev,
          loading: { ...prev.loading, [argName]: true },
        }));

        try {
          const values = await handleCompletion(
            ref,
            argName,
            value,
            abortController.signal,
          );

          if (!abortController.signal.aborted) {
            setState((prev) => ({
              ...prev,
              completions: { ...prev.completions, [argName]: values },
              loading: { ...prev.loading, [argName]: false },
            }));
          }
        } catch {
          if (!abortController.signal.aborted) {
            setState((prev) => ({
              ...prev,
              loading: { ...prev.loading, [argName]: false },
            }));
          }
        } finally {
          if (abortControllerRef.current === abortController) {
            abortControllerRef.current = null;
          }
        }
      },
      debounceMs,
    );
  }, [handleCompletion, completionsSupported, cleanup, debounceMs]);

  // Clear completions when support status changes
  useEffect(() => {
    if (!completionsSupported) {
      clearCompletions();
    }
  }, [completionsSupported, clearCompletions]);

  return {
    ...state,
    clearCompletions,
    requestCompletions,
    completionsSupported,
  };
}



================================================
FILE: client/src/lib/hooks/useConnection.ts
================================================
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import {
  SSEClientTransport,
  SseError,
  SSEClientTransportOptions,
} from "@modelcontextprotocol/sdk/client/sse.js";
import {
  StreamableHTTPClientTransport,
  StreamableHTTPClientTransportOptions,
} from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import {
  ClientNotification,
  ClientRequest,
  CreateMessageRequestSchema,
  ListRootsRequestSchema,
  ResourceUpdatedNotificationSchema,
  LoggingMessageNotificationSchema,
  Request,
  Result,
  ServerCapabilities,
  PromptReference,
  ResourceReference,
  McpError,
  CompleteResultSchema,
  ErrorCode,
  CancelledNotificationSchema,
  ResourceListChangedNotificationSchema,
  ToolListChangedNotificationSchema,
  PromptListChangedNotificationSchema,
  Progress,
} from "@modelcontextprotocol/sdk/types.js";
import { RequestOptions } from "@modelcontextprotocol/sdk/shared/protocol.js";
import { useState } from "react";
import { useToast } from "@/lib/hooks/useToast";
import { z } from "zod";
import { ConnectionStatus } from "../constants";
import { Notification, StdErrNotificationSchema } from "../notificationTypes";
import { auth } from "@modelcontextprotocol/sdk/client/auth.js";
import { InspectorOAuthClientProvider } from "../auth";
import packageJson from "../../../package.json";
import {
  getMCPProxyAddress,
  getMCPServerRequestMaxTotalTimeout,
  resetRequestTimeoutOnProgress,
} from "@/utils/configUtils";
import { getMCPServerRequestTimeout } from "@/utils/configUtils";
import { InspectorConfig } from "../configurationTypes";

interface UseConnectionOptions {
  transportType: "stdio" | "sse" | "streamable-http";
  command: string;
  args: string;
  sseUrl: string;
  env: Record<string, string>;
  bearerToken?: string;
  headerName?: string;
  config: InspectorConfig;
  onNotification?: (notification: Notification) => void;
  onStdErrNotification?: (notification: Notification) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onPendingRequest?: (request: any, resolve: any, reject: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getRoots?: () => any[];
}

export function useConnection({
  transportType,
  command,
  args,
  sseUrl,
  env,
  bearerToken,
  headerName,
  config,
  onNotification,
  onStdErrNotification,
  onPendingRequest,
  getRoots,
}: UseConnectionOptions) {
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>("disconnected");
  const { toast } = useToast();
  const [serverCapabilities, setServerCapabilities] =
    useState<ServerCapabilities | null>(null);
  const [mcpClient, setMcpClient] = useState<Client | null>(null);
  const [requestHistory, setRequestHistory] = useState<
    { request: string; response?: string }[]
  >([]);
  const [completionsSupported, setCompletionsSupported] = useState(true);

  const pushHistory = (request: object, response?: object) => {
    setRequestHistory((prev) => [
      ...prev,
      {
        request: JSON.stringify(request),
        response: response !== undefined ? JSON.stringify(response) : undefined,
      },
    ]);
  };

  const makeRequest = async <T extends z.ZodType>(
    request: ClientRequest,
    schema: T,
    options?: RequestOptions & { suppressToast?: boolean },
  ): Promise<z.output<T>> => {
    if (!mcpClient) {
      throw new Error("MCP client not connected");
    }
    try {
      const abortController = new AbortController();

      // prepare MCP Client request options
      const mcpRequestOptions: RequestOptions = {
        signal: options?.signal ?? abortController.signal,
        resetTimeoutOnProgress:
          options?.resetTimeoutOnProgress ??
          resetRequestTimeoutOnProgress(config),
        timeout: options?.timeout ?? getMCPServerRequestTimeout(config),
        maxTotalTimeout:
          options?.maxTotalTimeout ??
          getMCPServerRequestMaxTotalTimeout(config),
      };

      // If progress notifications are enabled, add an onprogress hook to the MCP Client request options
      // This is required by SDK to reset the timeout on progress notifications
      if (mcpRequestOptions.resetTimeoutOnProgress) {
        mcpRequestOptions.onprogress = (params: Progress) => {
          // Add progress notification to `Server Notification` window in the UI
          if (onNotification) {
            onNotification({
              method: "notification/progress",
              params,
            });
          }
        };
      }

      let response;
      try {
        response = await mcpClient.request(request, schema, mcpRequestOptions);

        pushHistory(request, response);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        pushHistory(request, { error: errorMessage });
        throw error;
      }

      return response;
    } catch (e: unknown) {
      if (!options?.suppressToast) {
        const errorString = (e as Error).message ?? String(e);
        toast({
          title: "Error",
          description: errorString,
          variant: "destructive",
        });
      }
      throw e;
    }
  };

  const handleCompletion = async (
    ref: ResourceReference | PromptReference,
    argName: string,
    value: string,
    signal?: AbortSignal,
  ): Promise<string[]> => {
    if (!mcpClient || !completionsSupported) {
      return [];
    }

    const request: ClientRequest = {
      method: "completion/complete",
      params: {
        argument: {
          name: argName,
          value,
        },
        ref,
      },
    };

    try {
      const response = await makeRequest(request, CompleteResultSchema, {
        signal,
        suppressToast: true,
      });
      return response?.completion.values || [];
    } catch (e: unknown) {
      // Disable completions silently if the server doesn't support them.
      // See https://github.com/modelcontextprotocol/specification/discussions/122
      if (e instanceof McpError && e.code === ErrorCode.MethodNotFound) {
        setCompletionsSupported(false);
        return [];
      }

      // Unexpected errors - show toast and rethrow
      toast({
        title: "Error",
        description: e instanceof Error ? e.message : String(e),
        variant: "destructive",
      });
      throw e;
    }
  };

  const sendNotification = async (notification: ClientNotification) => {
    if (!mcpClient) {
      const error = new Error("MCP client not connected");
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }

    try {
      await mcpClient.notification(notification);
      // Log successful notifications
      pushHistory(notification);
    } catch (e: unknown) {
      if (e instanceof McpError) {
        // Log MCP protocol errors
        pushHistory(notification, { error: e.message });
      }
      toast({
        title: "Error",
        description: e instanceof Error ? e.message : String(e),
        variant: "destructive",
      });
      throw e;
    }
  };

  const checkProxyHealth = async () => {
    try {
      const proxyHealthUrl = new URL(`${getMCPProxyAddress(config)}/health`);
      const proxyHealthResponse = await fetch(proxyHealthUrl);
      const proxyHealth = await proxyHealthResponse.json();
      if (proxyHealth?.status !== "ok") {
        throw new Error("MCP Proxy Server is not healthy");
      }
    } catch (e) {
      console.error("Couldn't connect to MCP Proxy Server", e);
      throw e;
    }
  };

  const handleAuthError = async (error: unknown) => {
    if (error instanceof SseError && error.code === 401) {
      // Create a new auth provider with the current server URL
      const serverAuthProvider = new InspectorOAuthClientProvider(sseUrl);

      const result = await auth(serverAuthProvider, { serverUrl: sseUrl });
      return result === "AUTHORIZED";
    }

    return false;
  };

  const connect = async (_e?: unknown, retryCount: number = 0) => {
    const client = new Client<Request, Notification, Result>(
      {
        name: "mcp-inspector",
        version: packageJson.version,
      },
      {
        capabilities: {
          sampling: {},
          roots: {
            listChanged: true,
          },
        },
      },
    );

    try {
      await checkProxyHealth();
    } catch {
      setConnectionStatus("error-connecting-to-proxy");
      return;
    }

    try {
      // Inject auth manually instead of using SSEClientTransport, because we're
      // proxying through the inspector server first.
      const headers: HeadersInit = {};

      // Create an auth provider with the current server URL
      const serverAuthProvider = new InspectorOAuthClientProvider(sseUrl);

      // Use manually provided bearer token if available, otherwise use OAuth tokens
      const token =
        bearerToken || (await serverAuthProvider.tokens())?.access_token;
      if (token) {
        const authHeaderName = headerName || "Authorization";
        headers[authHeaderName] = `Bearer ${token}`;
      }

      // Create appropriate transport
      let transportOptions:
        | StreamableHTTPClientTransportOptions
        | SSEClientTransportOptions;

      let mcpProxyServerUrl;
      switch (transportType) {
        case "stdio":
          mcpProxyServerUrl = new URL(`${getMCPProxyAddress(config)}/stdio`);
          mcpProxyServerUrl.searchParams.append("command", command);
          mcpProxyServerUrl.searchParams.append("args", args);
          mcpProxyServerUrl.searchParams.append("env", JSON.stringify(env));
          transportOptions = {
            authProvider: serverAuthProvider,
            eventSourceInit: {
              fetch: (
                url: string | URL | globalThis.Request,
                init: RequestInit | undefined,
              ) => fetch(url, { ...init, headers }),
            },
            requestInit: {
              headers,
            },
          };
          break;

        case "sse":
          mcpProxyServerUrl = new URL(`${getMCPProxyAddress(config)}/sse`);
          mcpProxyServerUrl.searchParams.append("url", sseUrl);
          transportOptions = {
            authProvider: serverAuthProvider,
            eventSourceInit: {
              fetch: (
                url: string | URL | globalThis.Request,
                init: RequestInit | undefined,
              ) => fetch(url, { ...init, headers }),
            },
            requestInit: {
              headers,
            },
          };
          break;

        case "streamable-http":
          mcpProxyServerUrl = new URL(`${getMCPProxyAddress(config)}/mcp`);
          mcpProxyServerUrl.searchParams.append("url", sseUrl);
          transportOptions = {
            authProvider: serverAuthProvider,
            eventSourceInit: {
              fetch: (
                url: string | URL | globalThis.Request,
                init: RequestInit | undefined,
              ) => fetch(url, { ...init, headers }),
            },
            requestInit: {
              headers,
            },
            // TODO these should be configurable...
            reconnectionOptions: {
              maxReconnectionDelay: 30000,
              initialReconnectionDelay: 1000,
              reconnectionDelayGrowFactor: 1.5,
              maxRetries: 2,
            },
          };
          break;
      }
      (mcpProxyServerUrl as URL).searchParams.append(
        "transportType",
        transportType,
      );

      const clientTransport =
        transportType === "streamable-http"
          ? new StreamableHTTPClientTransport(mcpProxyServerUrl as URL, {
              sessionId: undefined,
              ...transportOptions,
            })
          : new SSEClientTransport(mcpProxyServerUrl as URL, transportOptions);

      if (onNotification) {
        [
          CancelledNotificationSchema,
          LoggingMessageNotificationSchema,
          ResourceUpdatedNotificationSchema,
          ResourceListChangedNotificationSchema,
          ToolListChangedNotificationSchema,
          PromptListChangedNotificationSchema,
        ].forEach((notificationSchema) => {
          client.setNotificationHandler(notificationSchema, onNotification);
        });

        client.fallbackNotificationHandler = (
          notification: Notification,
        ): Promise<void> => {
          onNotification(notification);
          return Promise.resolve();
        };
      }

      if (onStdErrNotification) {
        client.setNotificationHandler(
          StdErrNotificationSchema,
          onStdErrNotification,
        );
      }

      let capabilities;
      try {
        await client.connect(clientTransport);

        capabilities = client.getServerCapabilities();
        const initializeRequest = {
          method: "initialize",
        };
        pushHistory(initializeRequest, {
          capabilities,
          serverInfo: client.getServerVersion(),
          instructions: client.getInstructions(),
        });
      } catch (error) {
        console.error(
          `Failed to connect to MCP Server via the MCP Inspector Proxy: ${mcpProxyServerUrl}:`,
          error,
        );
        const shouldRetry = await handleAuthError(error);
        if (shouldRetry) {
          return connect(undefined, retryCount + 1);
        }

        if (error instanceof SseError && error.code === 401) {
          // Don't set error state if we're about to redirect for auth
          return;
        }
        throw error;
      }
      setServerCapabilities(capabilities ?? null);
      setCompletionsSupported(true); // Reset completions support on new connection

      if (onPendingRequest) {
        client.setRequestHandler(CreateMessageRequestSchema, (request) => {
          return new Promise((resolve, reject) => {
            onPendingRequest(request, resolve, reject);
          });
        });
      }

      if (getRoots) {
        client.setRequestHandler(ListRootsRequestSchema, async () => {
          return { roots: getRoots() };
        });
      }

      setMcpClient(client);
      setConnectionStatus("connected");
    } catch (e) {
      console.error(e);
      setConnectionStatus("error");
    }
  };

  const disconnect = async () => {
    await mcpClient?.close();
    const authProvider = new InspectorOAuthClientProvider(sseUrl);
    authProvider.clear();
    setMcpClient(null);
    setConnectionStatus("disconnected");
    setCompletionsSupported(false);
    setServerCapabilities(null);
  };

  return {
    connectionStatus,
    serverCapabilities,
    mcpClient,
    requestHistory,
    makeRequest,
    sendNotification,
    handleCompletion,
    completionsSupported,
    connect,
    disconnect,
  };
}



================================================
FILE: client/src/lib/hooks/useDraggablePane.ts
================================================
import { useCallback, useEffect, useRef, useState } from "react";

export function useDraggablePane(initialHeight: number) {
  const [height, setHeight] = useState(initialHeight);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartY = useRef<number>(0);
  const dragStartHeight = useRef<number>(0);

  const handleDragStart = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true);
      dragStartY.current = e.clientY;
      dragStartHeight.current = height;
      document.body.style.userSelect = "none";
    },
    [height],
  );

  const handleDragMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaY = dragStartY.current - e.clientY;
      const newHeight = Math.max(
        100,
        Math.min(800, dragStartHeight.current + deltaY),
      );
      setHeight(newHeight);
    },
    [isDragging],
  );

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    document.body.style.userSelect = "";
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleDragMove);
      window.addEventListener("mouseup", handleDragEnd);
      return () => {
        window.removeEventListener("mousemove", handleDragMove);
        window.removeEventListener("mouseup", handleDragEnd);
      };
    }
  }, [isDragging, handleDragMove, handleDragEnd]);

  return {
    height,
    isDragging,
    handleDragStart,
  };
}



================================================
FILE: client/src/lib/hooks/useTheme.ts
================================================
import { useCallback, useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark" | "system";

const useTheme = (): [Theme, (mode: Theme) => void] => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    return savedTheme || "system";
  });

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)",
    );
    const handleDarkModeChange = (e: MediaQueryListEvent) => {
      if (theme === "system") {
        updateDocumentTheme(e.matches ? "dark" : "light");
      }
    };

    const updateDocumentTheme = (newTheme: "light" | "dark") => {
      document.documentElement.classList.toggle("dark", newTheme === "dark");
    };

    // Set initial theme based on current mode
    if (theme === "system") {
      updateDocumentTheme(darkModeMediaQuery.matches ? "dark" : "light");
    } else {
      updateDocumentTheme(theme);
    }

    darkModeMediaQuery.addEventListener("change", handleDarkModeChange);

    return () => {
      darkModeMediaQuery.removeEventListener("change", handleDarkModeChange);
    };
  }, [theme]);

  const setThemeWithSideEffect = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme !== "system") {
      document.documentElement.classList.toggle("dark", newTheme === "dark");
    }
  }, []);
  return useMemo(
    () => [theme, setThemeWithSideEffect],
    [theme, setThemeWithSideEffect],
  );
};

export default useTheme;



================================================
FILE: client/src/lib/hooks/useToast.ts
================================================
"use client";

// Inspired by react-hot-toast library
import * as React from "react";

import type { ToastActionElement, ToastProps } from "@/components/ui/toast";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

const enum ActionType {
  ADD_TOAST = "ADD_TOAST",
  UPDATE_TOAST = "UPDATE_TOAST",
  DISMISS_TOAST = "DISMISS_TOAST",
  REMOVE_TOAST = "REMOVE_TOAST",
}

type Action =
  | {
      type: ActionType.ADD_TOAST;
      toast: ToasterToast;
    }
  | {
      type: ActionType.UPDATE_TOAST;
      toast: Partial<ToasterToast>;
    }
  | {
      type: ActionType.DISMISS_TOAST;
      toastId?: ToasterToast["id"];
    }
  | {
      type: ActionType.REMOVE_TOAST;
      toastId?: ToasterToast["id"];
    };

interface State {
  toasts: ToasterToast[];
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: ActionType.REMOVE_TOAST,
      toastId: toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case ActionType.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t,
        ),
      };

    case ActionType.DISMISS_TOAST: {
      const { toastId } = action;

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t,
        ),
      };
    }
    case ActionType.REMOVE_TOAST:
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
};

const listeners: Array<(state: State) => void> = [];

let memoryState: State = { toasts: [] };

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

type Toast = Omit<ToasterToast, "id">;

function toast({ ...props }: Toast) {
  const id = genId();

  const update = (props: ToasterToast) =>
    dispatch({
      type: ActionType.UPDATE_TOAST,
      toast: { ...props, id },
    });
  const dismiss = () =>
    dispatch({ type: ActionType.DISMISS_TOAST, toastId: id });

  dispatch({
    type: ActionType.ADD_TOAST,
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });

  return {
    id: id,
    dismiss,
    update,
  };
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) =>
      dispatch({ type: ActionType.DISMISS_TOAST, toastId }),
  };
}

export { useToast, toast };



================================================
FILE: client/src/lib/hooks/__tests__/useConnection.test.tsx
================================================
import { renderHook, act } from "@testing-library/