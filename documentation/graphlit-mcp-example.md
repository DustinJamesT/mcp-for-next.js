================================================
FILE: README.md
================================================
[![npm version](https://badge.fury.io/js/graphlit-mcp-server.svg)](https://badge.fury.io/js/graphlit-mcp-server)
[![smithery badge](https://smithery.ai/badge/@graphlit/graphlit-mcp-server)](https://smithery.ai/server/@graphlit/graphlit-mcp-server)

# Model Context Protocol (MCP) Server for Graphlit Platform

## Overview

The Model Context Protocol (MCP) Server enables integration between MCP clients and the Graphlit service. This document outlines the setup process and provides a basic example of using the client.

Ingest anything from Slack, Discord, websites, Google Drive, email, Jira, Linear or GitHub into a Graphlit project - and then search and retrieve relevant knowledge within an MCP client like Cursor, Windsurf, Goose or Cline.

Your Graphlit project acts as a searchable, and RAG-ready knowledge base across all your developer and product management tools.

Documents (PDF, DOCX, PPTX, etc.) and HTML web pages will be extracted to Markdown upon ingestion. Audio and video files will be transcribed upon ingestion.

Web crawling and web search are built-in as MCP tools, with no need to integrate other tools like Firecrawl, Exa, etc. separately.

You can read more about the MCP Server use cases and features on our [blog](https://www.graphlit.com/blog/graphlit-mcp-server).

Watch our latest [YouTube video](https://www.youtube.com/watch?v=Or-QqonvcAs&t=4s) on using the Graphlit MCP Server with the Goose MCP client.

For any questions on using the MCP Server, please join our [Discord](https://discord.gg/ygFmfjy3Qx) community and post on the #mcp channel.

<a href="https://glama.ai/mcp/servers/fscrivteod">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/fscrivteod/badge" alt="graphlit-mcp-server MCP server" />
</a>


## Tools

### Retrieval

- Query Contents
- Query Collections
- Query Feeds
- Query Conversations
- Retrieve Relevant Sources
- Retrieve Similar Images
- Visually Describe Image

### RAG

- Prompt LLM Conversation

### Extraction

- Extract Structured JSON from Text

### Publishing

- Publish as Audio (ElevenLabs Audio)
- Publish as Image (OpenAI Image Generation)

### Ingestion

- Files
- Web Pages
- Messages
- Posts
- Emails
- Issues
- Text
- Memory (Short-Term)

### Data Connectors

- Microsoft Outlook email
- Google Mail
- Notion
- Reddit
- Linear
- Jira
- GitHub Issues
- Google Drive
- OneDrive
- SharePoint
- Dropbox
- Box
- GitHub
- Slack
- Microsoft Teams
- Discord
- Twitter/X
- Podcasts (RSS)

### Web

- Web Crawling
- Web Search (including Podcast Search)
- Web Mapping
- Screenshot Page

### Notifications

- Slack
- Email
- Webhook
- Twitter/X

### Operations

- Configure Project
- Create Collection
- Add Contents to Collection
- Remove Contents from Collection
- Delete Collection(s)
- Delete Feed(s)
- Delete Content(s)
- Delete Conversation(s)
- Is Feed Done?
- Is Content Done?

### Enumerations

- List Slack Channels
- List Microsoft Teams Teams
- List Microsoft Teams Channels
- List SharePoint Libraries
- List SharePoint Folders
- List Linear Projects
- List Notion Databases

## Resources

- Project
- Contents
- Feeds
- Collections (of Content)
- Workflows
- Conversations
- Specifications

## Prerequisites

Before you begin, ensure you have the following:

- Node.js installed on your system (recommended version 18.x or higher).
- An active account on the [Graphlit Platform](https://portal.graphlit.dev) with access to the API settings dashboard.

## Configuration

The Graphlit MCP Server supports environment variables to be set for authentication and configuration:

- `GRAPHLIT_ENVIRONMENT_ID`: Your environment ID.
- `GRAPHLIT_ORGANIZATION_ID`: Your organization ID.
- `GRAPHLIT_JWT_SECRET`: Your JWT secret for signing the JWT token.

You can find these values in the API settings dashboard on the [Graphlit Platform](https://portal.graphlit.dev).

## Installation

### Installing via VS Code

For quick installation, use one of the one-click install buttons below:

[![Install with NPX in VS Code](https://img.shields.io/badge/VS_Code-NPM-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=graphlit&inputs=%5B%7B%22type%22%3A%22promptString%22%2C%22id%22%3A%22organization_id%22%2C%22description%22%3A%22Graphlit%20Organization%20ID%22%2C%22password%22%3Atrue%7D%2C%7B%22type%22%3A%22promptString%22%2C%22id%22%3A%22environment_id%22%2C%22description%22%3A%22Graphlit%20Environment%20ID%22%2C%22password%22%3Atrue%7D%2C%7B%22type%22%3A%22promptString%22%2C%22id%22%3A%22jwt_secret%22%2C%22description%22%3A%22Graphlit%20JWT%20Secret%22%2C%22password%22%3Atrue%7D%5D&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22graphlit-mcp-server%22%5D%2C%22env%22%3A%7B%22GRAPHLIT_ORGANIZATION_ID%22%3A%22%24%7Binput%3Aorganization_id%7D%22%2C%22GRAPHLIT_ENVIRONMENT_ID%22%3A%22%24%7Binput%3Aenvironment_id%7D%22%2C%22GRAPHLIT_JWT_SECRET%22%3A%22%24%7Binput%3Ajwt_secret%7D%22%7D%7D) [![Install with NPX in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-NPM-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=graphlit&inputs=%5B%7B%22type%22%3A%22promptString%22%2C%22id%22%3A%22organization_id%22%2C%22description%22%3A%22Graphlit%20Organization%20ID%22%2C%22password%22%3Atrue%7D%2C%7B%22type%22%3A%22promptString%22%2C%22id%22%3A%22environment_id%22%2C%22description%22%3A%22Graphlit%20Environment%20ID%22%2C%22password%22%3Atrue%7D%2C%7B%22type%22%3A%22promptString%22%2C%22id%22%3A%22jwt_secret%22%2C%22description%22%3A%22Graphlit%20JWT%20Secret%22%2C%22password%22%3Atrue%7D%5D&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22graphlit-mcp-server%22%5D%2C%22env%22%3A%7B%22GRAPHLIT_ORGANIZATION_ID%22%3A%22%24%7Binput%3Aorganization_id%7D%22%2C%22GRAPHLIT_ENVIRONMENT_ID%22%3A%22%24%7Binput%3Aenvironment_id%7D%22%2C%22GRAPHLIT_JWT_SECRET%22%3A%22%24%7Binput%3Ajwt_secret%7D%22%7D%7D&quality=insiders)

For manual installation, add the following JSON block to your User Settings (JSON) file in VS Code. You can do this by pressing `Ctrl + Shift + P` and typing `Preferences: Open User Settings (JSON)`.

Optionally, you can add it to a file called `.vscode/mcp.json` in your workspace. This will allow you to share the configuration with others.

> Note that the `mcp` key is not needed in the `.vscode/mcp.json` file.

```json
{
  "mcp": {
    "inputs": [
      {
        "type": "promptString",
        "id": "organization_id",
        "description": "Graphlit Organization ID",
        "password": true
      },
      {
        "type": "promptString",
        "id": "environment_id",
        "description": "Graphlit Environment ID",
        "password": true
      },
      {
        "type": "promptString",
        "id": "jwt_secret",
        "description": "Graphlit JWT Secret",
        "password": true
      }
    ],
    "servers": {
      "graphlit": {
        "command": "npx",
        "args": ["-y", "graphlit-mcp-server"],
        "env": {
          "GRAPHLIT_ORGANIZATION_ID": "${input:organization_id}",
          "GRAPHLIT_ENVIRONMENT_ID": "${input:environment_id}",
          "GRAPHLIT_JWT_SECRET": "${input:jwt_secret}"
        }
      }
    }
  }
}
```

### Installing via Windsurf

To install graphlit-mcp-server in Windsurf IDE application, Cline should use NPX:

```bash
npx -y graphlit-mcp-server
```

Your mcp_config.json file should be configured similar to:

```
{
    "mcpServers": {
        "graphlit-mcp-server": {
            "command": "npx",
            "args": [
                "-y",
                "graphlit-mcp-server"
            ],
            "env": {
                "GRAPHLIT_ORGANIZATION_ID": "your-organization-id",
                "GRAPHLIT_ENVIRONMENT_ID": "your-environment-id",
                "GRAPHLIT_JWT_SECRET": "your-jwt-secret",
            }
        }
    }
}
```

### Installing via Cline

To install graphlit-mcp-server in Cline IDE application, Cline should use NPX:

```bash
npx -y graphlit-mcp-server
```

Your cline_mcp_settings.json file should be configured similar to:

```
{
    "mcpServers": {
        "graphlit-mcp-server": {
            "command": "npx",
            "args": [
                "-y",
                "graphlit-mcp-server"
            ],
            "env": {
                "GRAPHLIT_ORGANIZATION_ID": "your-organization-id",
                "GRAPHLIT_ENVIRONMENT_ID": "your-environment-id",
                "GRAPHLIT_JWT_SECRET": "your-jwt-secret",
            }
        }
    }
}
```

### Installing via Cursor

To install graphlit-mcp-server in Cursor IDE application, Cursor should use NPX:

```bash
npx -y graphlit-mcp-server
```

Your mcp.json file should be configured similar to:

```
{
    "mcpServers": {
        "graphlit-mcp-server": {
            "command": "npx",
            "args": [
                "-y",
                "graphlit-mcp-server"
            ],
            "env": {
                "GRAPHLIT_ORGANIZATION_ID": "your-organization-id",
                "GRAPHLIT_ENVIRONMENT_ID": "your-environment-id",
                "GRAPHLIT_JWT_SECRET": "your-jwt-secret",
            }
        }
    }
}
```

### Installing via Smithery

To install graphlit-mcp-server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@graphlit/graphlit-mcp-server):

```bash
npx -y @smithery/cli install @graphlit/graphlit-mcp-server --client claude
```

### Installing manually

To use the Graphlit MCP Server in any MCP client application, use:

```
{
    "mcpServers": {
        "graphlit-mcp-server": {
            "command": "npx",
            "args": [
                "-y",
                "graphlit-mcp-server"
            ],
            "env": {
                "GRAPHLIT_ORGANIZATION_ID": "your-organization-id",
                "GRAPHLIT_ENVIRONMENT_ID": "your-environment-id",
                "GRAPHLIT_JWT_SECRET": "your-jwt-secret",
            }
        }
    }
}
```

Optionally, you can configure the credentials for data connectors, such as Slack, Google Email and Notion. 
Only GRAPHLIT_ORGANIZATION_ID, GRAPHLIT_ENVIRONMENT_ID and GRAPHLIT_JWT_SECRET are required.

```
{
    "mcpServers": {
        "graphlit-mcp-server": {
            "command": "npx",
            "args": [
                "-y",
                "graphlit-mcp-server"
            ],
            "env": {
                "GRAPHLIT_ORGANIZATION_ID": "your-organization-id",
                "GRAPHLIT_ENVIRONMENT_ID": "your-environment-id",
                "GRAPHLIT_JWT_SECRET": "your-jwt-secret",
                "SLACK_BOT_TOKEN": "your-slack-bot-token",
                "DISCORD_BOT_TOKEN": "your-discord-bot-token",
                "TWITTER_TOKEN": "your-twitter-token",
                "GOOGLE_EMAIL_REFRESH_TOKEN": "your-google-refresh-token",
                "GOOGLE_EMAIL_CLIENT_ID": "your-google-client-id",
                "GOOGLE_EMAIL_CLIENT_SECRET": "your-google-client-secret",
                "LINEAR_API_KEY": "your-linear-api-key",
                "GITHUB_PERSONAL_ACCESS_TOKEN": "your-github-pat",
                "JIRA_EMAIL": "your-jira-email",
                "JIRA_TOKEN": "your-jira-token",
                "NOTION_API_KEY": "your-notion-api-key"
            }
        }
    }
}
```

NOTE: when running 'npx' on Windows, you may need to explicitly call npx via the command prompt.

```
"command": "C:\\Windows\\System32\\cmd.exe /c npx"
```

## Support

Please refer to the [Graphlit API Documentation](https://docs.graphlit.dev/).

For support with the Graphlit MCP Server, please submit a [GitHub Issue](https://github.com/graphlit/graphlit-mcp-server/issues).  

For further support with the Graphlit Platform, please join our [Discord](https://discord.gg/ygFmfjy3Qx) community.



================================================
FILE: azure-pipelines.yml
================================================
trigger:
  branches:
    include:
      - main

name: $(Date:yyyyMMdd)$(Rev:rrr)

pool:
  vmImage: "ubuntu-latest"

steps:
  - task: NodeTool@0
    inputs:
      versionSpec: "20.x"
    displayName: "Install Node.js"

  - script: |
      npm install
      npm run build
      npm version 1.0.$(Build.BuildNumber) --no-git-tag-version --allow-same-version
    displayName: "Install dependencies and build"

  - task: CopyFiles@2
    inputs:
      SourceFolder: "$(Build.SourcesDirectory)"
      Contents: "README.md"
      TargetFolder: "$(Build.ArtifactStagingDirectory)/build"

  - task: CopyFiles@2
    inputs:
      SourceFolder: "$(Build.SourcesDirectory)"
      Contents: "LICENSE"
      TargetFolder: "$(Build.ArtifactStagingDirectory)/build"

  - task: Npm@1
    inputs:
      command: publish
      publishRegistry: useExternalRegistry
      publishEndpoint: "NPM"



================================================
FILE: Dockerfile
================================================
# Generated by https://smithery.ai. See: https://smithery.ai/docs/config#dockerfile
FROM node:lts-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install --production --ignore-scripts

# Copy app source code
COPY . .

# Build the project
RUN npm run build

# Expose port if needed (adjust if your server listens on a port)
# EXPOSE 3000

# Start the server
CMD ["node", "build/index.js"]



================================================
FILE: glama.json
================================================
{
  "$schema": "https://glama.ai/mcp/schemas/server.json",
  "maintainers": [
    "kirk-marple"
  ]
}



================================================
FILE: LICENSE
================================================
MIT License

Copyright (c) 2025 Unstruk Data Inc.

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
  "name": "graphlit-mcp-server",
  "version": "1.0.0",
  "description": "Graphlit MCP Server",
  "type": "module",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/graphlit/graphlit-mcp-server.git"
  },
  "contributors": [
    "Kirk Marple (https://github.com/kirk-marple)"
  ],
  "bin": {
    "graphlit-mcp-server": "build/index.js"
  },
  "files": [
    "build"
  ],
  "engines": {
    "node": ">=18.0.0"
  },
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "watch": "tsc --watch",
    "inspector": "npx @modelcontextprotocol/inspector node build/index.js"
  },
  "keywords": [
    "Graphlit",
    "API",
    "LLM",
    "AI",
    "RAG",
    "OpenAI",
    "PDF",
    "parsing",
    "preprocessing",
    "memory",
    "agents",
    "agent tools",
    "retrieval",
    "web scraping",
    "knowledge graph",
    "MCP"
  ],
  "author": "Unstruk Data Inc.",
  "license": "MIT",
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.10.2",
    "graphlit-client": "^1.0.20250508001"
  },
  "devDependencies": {
    "@types/mime-types": "^2.1.4",
    "typescript": "^5.8.2"
  }
}



================================================
FILE: smithery.yaml
================================================
# Smithery configuration file: https://smithery.ai/docs/config#smitheryyaml

startCommand:
  type: stdio
  configSchema:
    # JSON Schema defining the configuration options for the MCP.
    type: object
    required:
      - organizationId
      - environmentId
      - jwtSecret
    properties:
      organizationId:
        type: string
        default: your-organization-id
        description: Graphlit organization ID
      environmentId:
        type: string
        default: your-environment-id
        description: Graphlit environment ID
      jwtSecret:
        type: string
        default: your-jwt-secret
        description: JWT secret for signing tokens
      slackBotToken:
        type: string
        default: ""
        description: Slack bot token (optional)
      discordBotToken:
        type: string
        default: ""
        description: Discord bot token (optional)
      googleEmailRefreshToken:
        type: string
        default: ""
        description: Google Email refresh token (optional)
      googleEmailClientId:
        type: string
        default: ""
        description: Google Email Client ID (optional)
      googleEmailClientSecret:
        type: string
        default: ""
        description: Google Email Client Secret (optional)
      linearApiKey:
        type: string
        default: ""
        description: Linear API Key (optional)
      githubPersonalAccessToken:
        type: string
        default: ""
        description: GitHub Personal Access Token (optional)
      jiraEmail:
        type: string
        default: ""
        description: Jira email (optional)
      jiraToken:
        type: string
        default: ""
        description: Jira token (optional)
      notionApiKey:
        type: string
        default: ""
        description: Notion API Key (optional)
      twitterConsumerApiKey:
        type: string
        default: ""
        description: Twitter Consumer API Key (optional)        
      twitterConsumerApiSecret:
        type: string
        default: ""
        description: Twitter Consumer API Secret (optional)        
      twitterAccessTokenKey:
        type: string
        default: ""
        description: Twitter Access Token Key (optional)        
      twitterAccessTokenSecret:
        type: string
        default: ""
        description: Twitter Access Token Secret (optional)        
  commandFunction:
    # A JS function that produces the CLI command based on the given config to start the MCP on stdio.
    |-
    (config) => ({
      command: 'node',
      args: ['build/index.js'],
      env: {
        GRAPHLIT_ORGANIZATION_ID: config.organizationId,
        GRAPHLIT_ENVIRONMENT_ID: config.environmentId,
        GRAPHLIT_JWT_SECRET: config.jwtSecret,
        SLACK_BOT_TOKEN: config.slackBotToken || '',
        DISCORD_BOT_TOKEN: config.discordBotToken || '',
        GOOGLE_EMAIL_REFRESH_TOKEN: config.googleEmailRefreshToken || '',
        GOOGLE_EMAIL_CLIENT_ID: config.googleEmailClientId || '',
        GOOGLE_EMAIL_CLIENT_SECRET: config.googleEmailClientSecret || '',
        LINEAR_API_KEY: config.linearApiKey || '',
        GITHUB_PERSONAL_ACCESS_TOKEN: config.githubPersonalAccessToken || '',
        JIRA_EMAIL: config.jiraEmail || '',
        JIRA_TOKEN: config.jiraToken || '',
        NOTION_API_KEY: config.notionApiKey || '',
        TWITTER_CONSUMER_API_KEY: config.twitterConsumerApiKey || '',
        TWITTER_CONSUMER_API_SECRET: config.twitterConsumerApiSecret || '',
        TWITTER_ACCESS_TOKEN_KEY: config.twitterAccessTokenKey || '',
        TWITTER_ACCESS_TOKEN_SECRET: config.twitterAccessTokenSecret || '',
      }
    })
  exampleConfig:
    organizationId: your-organization-id
    environmentId: your-environment-id
    jwtSecret: your-jwt-secret
    slackBotToken: example-slack-bot-token
    discordBotToken: example-discord-bot-token
    googleEmailRefreshToken: example-google-refresh-token
    googleEmailClientId: example-google-client-id
    googleEmailClientSecret: example-google-client-secret
    linearApiKey: example-linear-api-key
    githubPersonalAccessToken: example-github-pat
    jiraEmail: example-jira-email
    jiraToken: example-jira-token
    notionApiKey: example-notion-api-key,
    twitterConsumerApiKey: example-twitter-consumer-api-key
    twitterConsumerApiSecret: example-twitter-consumer-api-secret
    twitterAccessTokenKey: example-twitter-access-token-key
    twitterAccessTokenSecret: example-twitter-access-token-secret



================================================
FILE: tsconfig.json
================================================
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "Node16",
    "moduleResolution": "Node16",
    "outDir": "./build",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "declarationMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}


================================================
FILE: .env.example
================================================
GRAPHLIT_ORGANIZATION_ID=
GRAPHLIT_ENVIRONMENT_ID=
GRAPHLIT_JWT_SECRET=

SLACK_BOT_TOKEN=

DISCORD_BOT_TOKEN=

TWITTER_TOKEN=

MICROSOFT_TEAMS_CLIENT_ID=
MICROSOFT_TEAMS_CLIENT_SECRET=
MICROSOFT_TEAMS_REFRESH_TOKEN=

GOOGLE_EMAIL_REFRESH_TOKEN=
GOOGLE_EMAIL_CLIENT_ID=
GOOGLE_EMAIL_CLIENT_SECRET=

LINEAR_API_KEY=

GITHUB_PERSONAL_ACCESS_TOKEN=

JIRA_EMAIL=
JIRA_TOKEN=

NOTION_API_KEY=

GOOGLE_DRIVE_FOLDER_ID=
GOOGLE_DRIVE_REFRESH_TOKEN=
GOOGLE_DRIVE_CLIENT_ID=
GOOGLE_DRIVE_CLIENT_SECRET=
GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON=

ONEDRIVE_FOLDER_ID=
ONEDRIVE_REFRESH_TOKEN=
ONEDRIVE_CLIENT_ID=
ONEDRIVE_CLIENT_SECRET=

SHAREPOINT_ACCOUNT_NAME=
SHAREPOINT_REFRESH_TOKEN=
SHAREPOINT_CLIENT_ID=
SHAREPOINT_CLIENT_SECRET=

DROPBOX_APP_KEY=
DROPBOX_APP_SECRET=
DROPBOX_REFRESH_TOKEN=
DROPBOX_REDIRECT_URI=

BOX_CLIENT_ID=
BOX_CLIENT_SECRET=
BOX_REFRESH_TOKEN=
BOX_REDIRECT_URI=

TWITTER_CONSUMER_API_KEY=
TWITTER_CONSUMER_API_SECRET=
TWITTER_ACCESS_TOKEN_KEY=
TWITTER_ACCESS_TOKEN_SECRET=


================================================
FILE: src/index.ts
================================================
#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerResources } from "./resources.js";
import { registerTools } from './tools.js';

const DEFAULT_INSTRUCTIONS = `
You are provided a set of MCP tools and resources that integrate with the [Graphlit](https://www.graphlit.com) Platform.

To use each of the Graphlit MCP tools, there may be environment variables which are required to be configured in your MCP client. These are described in the description for each tool.
These must be configured in the MCP client YAML or JSON configuration file before you can use the tools. *Do not* set these directly in your Terminal or shell environment.

Graphlit is an LLM-enabled knowledge API platform, which supports these resources:
- project: container for ingested contents, which can be configured with a default workflow
- contents: all ingested files, web pages, messages, etc.; also includes short-term 'memory' contents
- feeds: data connectors which ingest contents
- collections: named groups of contents
- conversations: chat message history of LLM conversation, which uses RAG pipeline for content retrieval
- workflows: how content is handled during the ingestion process
- specifications: LLM configuration presets, used by workflows and conversations

Identifiers for all resources are unique within the Graphlit project, and are formatted as GUIDs.

You have access to one and only one Graphlit project, which can optionally be configured with a workflow to guide the document preparation and entity extraction of ingested content. 
The Graphlit project is non-deletable, but you can create and delete contents, feeds, collections, conversations, specifications and workflows within the project.

You can query the Graphlit project resource for the credits used, LLM tokens used, and the available project quota. By default, credits cost USD$0.10, and are discounted on higher paid tiers.

With this Graphlit MCP Server, you can ingest anything from Slack, Discord, websites, Notion, Google Drive, email, Jira, Linear or GitHub into a Graphlit project - and then search and retrieve relevant knowledge within an MCP client like Cursor, Windsurf or Cline.

Documents (PDF, DOCX, PPTX, etc.) and HTML web pages will be extracted to Markdown upon ingestion. Audio and video files will be transcribed upon ingestion.

## Best Practices:
1. Always look for matching resources before you try to call any tools.
For example, "have i configured any graphlit workflows?", you should check for workflow resources before trying to call any other tools.
2. Don't use 'retrieveSources' to locate contents, when you have already added the contents into a collection. In that case, first retrieve the collection resource, which contains the content resources.
3. Only call the 'configureProject' tool when the user explicitly asks to configure their Graphlit project defaults.
4. Never infer, guess at or hallucinate any URLs. Always retrieve the latest content resources in order to get downloadable URLs.
5. Use 'ingestMemory' to save short-term memories, such as temporary notes or intermediate state for research. Use 'ingestText' to store long-term knowledge, such as Markdown results from research.
6. Always use 'PODSCAN' web search type when searching for podcast episodes, podcast appearances, etc.
7. Prioritize using feeds, rather than 'ingestUrl', when you want to ingest a website. Feeds are more efficient and faster than using 'ingestUrl'.
If you receive a request to ingest a GitHub URL, use the 'ingestGitHubFiles' tool to ingest the repository, rather than using 'ingestUrl'.
Always attempt to use the most-specific tool for the task at hand.

## Short-term vs Long-term Memory:
You can perform scatter-gather operations where you save short-term memories after each workflow step, and then gather relevant memories prior to the moving onto the next step. 
Leverage short-term memories when evaluating the results of a workflow step, and then use long-term memories to store the final results of your workflow.
You can collect memories in collections, and then use the 'queryContents' tool to retrieve the 'memory' contents by the collection. This will help you to keep track of your progress and avoid losing any important information.

If you have any trouble with this Graphlit MCP Server, join our [Discord](https://discord.gg/ygFmfjy3Qx) community for support.
`

export const server = new McpServer({
  name: "Graphlit MCP Server",
  version: "1.0.0"
}, {
  instructions: DEFAULT_INSTRUCTIONS
});

registerResources(server);
registerTools(server);

async function runServer() {
  try {
    console.error('Attempting to start Graphlit MCP Server.');

    const transport = new StdioServerTransport();
    await server.connect(transport);

    console.error('Successfully started Graphlit MCP Server.');
  } 
  catch (error) {
    console.error('Failed to start Graphlit MCP Server.', error);

    process.exit(1);
  }
}

runServer().catch((error) => {
  console.error('Failed to start Graphlit MCP Server.', error);
  
  process.exit(1);
});


================================================
FILE: src/resources.ts
================================================
import { Graphlit } from "graphlit-client";
import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { 
    ContentTypes, 
    ContentFilter, 
    ConversationFilter,
    EntityState,
    GetContentQuery, 
    GetConversationQuery,
} from "graphlit-client/dist/generated/graphql-types.js";

export function registerResources(server: McpServer) {
    server.resource(
      "Conversations list: Returns list of conversation resources.",
      new ResourceTemplate("conversations://", {
        list: async (extra) => {
          const client = new Graphlit();
          
          const filter: ConversationFilter = { 
          };

          try {
            const response = await client.queryConversations(filter);
            
            return {
              resources: (response.conversations?.results || [])
                .filter(content => content !== null)
                .map(conversation => ({
                  name: conversation.name,
                  uri: `conversations://${conversation.id}`,
                  mimeType: 'text/markdown'
                }))
            };
          } catch (error) {
            console.error("Error fetching conversation list:", error);
            return { resources: [] };
          }
        }
      }),
      async (uri, variables) => {
        return {
          contents: []
        };
      }
    );
    
    server.resource(
      "Conversation: Returns LLM conversation messages. Accepts conversation resource URI, i.e. conversations://{id}, where 'id' is a conversation identifier.",
      new ResourceTemplate("conversations://{id}", { list: undefined }),
      async (uri: URL, variables) => {
        const id = variables.id as string;
        const client = new Graphlit();
        
        try {
          const response = await client.getConversation(id);

          const content = response.conversation;
          
          return {
            contents: [
              {
                uri: uri.toString(),
                text: formatConversation(response),
                mimeType: 'text/markdown'
              }
            ]
          };    
        } catch (error) {
          console.error("Error fetching conversation:", error);
          return {
            contents: []
          };
        }
      }
    );

    server.resource(
        "Feeds: Returns list of feed resources.",
        new ResourceTemplate("feeds://", {
          list: async (extra) => {
            const client = new Graphlit();
            
            try {
              const response = await client.queryFeeds();
              
              return {
                resources: (response.feeds?.results || [])
                  .filter(feed => feed !== null)
                  .map(feed => ({
                    name: feed.name,
                    uri: `feeds://${feed.id}`
                  }))
              };
            } catch (error) {
              console.error("Error fetching feed list:", error);
              return { resources: [] };
            }
          }
        }),
        async (uri, variables) => {
          return {
            contents: []
          };
        }
      );
      
      server.resource(
        "Feed: Returns feed metadata. Accepts content resource URI, i.e. feeds://{id}, where 'id' is a feed identifier.",
        new ResourceTemplate("feeds://{id}", { list: undefined }),
        async (uri: URL, variables) => {
          const id = variables.id as string;
          const client = new Graphlit();
          
          try {
            const response = await client.getFeed(id);
      
            return {
              contents: [
                {
                  uri: uri.toString(),
                  text: JSON.stringify({ 
                    id: response.feed?.id, 
                    name: response.feed?.name,
                    type: response.feed?.type,
                    readCount: response.feed?.readCount,
                    creationDate: response.feed?.creationDate,
                    lastReadDate: response.feed?.lastReadDate,
                    state: response.feed?.state,
                    error: response.feed?.error
                  }, null, 2),
                  mimeType: 'application/json'
                }
              ]
            };
          } catch (error) {
            console.error("Error fetching feed:", error);
            return {
              contents: []
            };
          }
        }
      );
      
      server.resource(
        "Collections: Returns list of collection resources.",
        new ResourceTemplate("collections://", {
          list: async (extra) => {
            const client = new Graphlit();
            
            try {
              const response = await client.queryCollections();
              
              return {
                resources: (response.collections?.results || [])
                  .filter(collection => collection !== null)
                  .map(collection => ({
                    name: collection.name,
                    uri: `collections://${collection.id}`
                  }))
              };
            } catch (error) {
              console.error("Error fetching collection list:", error);
              return { resources: [] };
            }
          }
        }),
        async (uri, variables) => {
          return {
            contents: []
          };
        }
      );
      
      server.resource(
        "Collection: Returns collection metadata and list of content resources. Accepts collection resource URI, i.e. collections://{id}, where 'id' is a collection identifier.",
        new ResourceTemplate("collections://{id}", { list: undefined }),
        async (uri: URL, variables) => {
          const id = variables.id as string;
          const client = new Graphlit();
          
          try {
            const response = await client.getCollection(id);
            return {
              contents: [
                {
                  uri: uri.toString(),
                  text: JSON.stringify({
                    id: response.collection?.id,
                    name: response.collection?.name,
                    contents: (response.collection?.contents || [])
                      .filter(content => content !== null)
                      .map(content => `contents://${content.id}`)
                  }, null, 2),
                  mimeType: 'application/json'
                }
              ]
            };
          } catch (error) {
            console.error("Error fetching collection:", error);
            return {
              contents: []
            };
          }
        }
      );
      
      server.resource(
        "Contents list: Returns list of content resources.",
        new ResourceTemplate("contents://", {
          list: async (extra) => {
            const client = new Graphlit();
            
            const filter: ContentFilter = { 
              states: [EntityState.Finished], // filter on finished contents only
            };

            try {
              const response = await client.queryContents(filter);
              
              return {
                resources: (response.contents?.results || [])
                  .filter(content => content !== null)
                  .map(content => ({
                    name: content.name,
                    description: content.description || '',
                    uri: `contents://${content.id}`,
                    mimeType: content.mimeType || 'text/markdown'
                  }))
              };
            } catch (error) {
              console.error("Error fetching content list:", error);
              return { resources: [] };
            }
          }
        }),
        async (uri, variables) => {
          return {
            contents: []
          };
        }
      );
      
      server.resource(
        "Content: Returns content metadata and complete Markdown text. Accepts content resource URI, i.e. contents://{id}, where 'id' is a content identifier.",
        new ResourceTemplate("contents://{id}", { list: undefined }),
        async (uri: URL, variables) => {
          const id = variables.id as string;
          const client = new Graphlit();
          
          try {
            const response = await client.getContent(id);

            const content = response.content;
            
            return {
              contents: [
                {
                  uri: uri.toString(),
                  text: formatContent(response),
                  mimeType: 'text/markdown'
                }
              ]
            };    
          } catch (error) {
            console.error("Error fetching content:", error);
            return {
              contents: []
            };
          }
        }
      );

      server.resource(
        "Workflows: Returns list of workflow resources.",
        new ResourceTemplate("workflows://", {
          list: async (extra) => {
            const client = new Graphlit();
            
            try {
              const response = await client.queryWorkflows();
              
              return {
                resources: (response.workflows?.results || [])
                  .filter(workflow => workflow !== null)
                  .map(workflow => ({
                    name: workflow.name,
                    uri: `workflows://${workflow.id}`
                  }))
              };
            } catch (error) {
              console.error("Error fetching workflow list:", error);
              return { resources: [] };
            }
          }
        }),
        async (uri, variables) => {
          return {
            contents: []
          };
        }
      );
      
      server.resource(
        "Workflow: Returns workflow metadata. Accepts workflow resource URI, i.e. workflows://{id}, where 'id' is a workflow identifier.",
        new ResourceTemplate("workflows://{id}", { list: undefined }),
        async (uri: URL, variables) => {
          const id = variables.id as string;
          const client = new Graphlit();
          
          try {
            const response = await client.getWorkflow(id);
            return {
              contents: [
                {
                  uri: uri.toString(),
                  text: JSON.stringify(response.workflow, null, 2),
                  mimeType: 'application/json'
                }
              ]
            };
          } catch (error) {
            console.error("Error fetching workflow:", error);
            return {
              contents: []
            };
          }
        }
      );

      server.resource(
        "Specifications: Returns list of specification resources.",
        new ResourceTemplate("specifications://", {
          list: async (extra) => {
            const client = new Graphlit();
            
            try {
              const response = await client.querySpecifications();
              
              return {
                resources: (response.specifications?.results || [])
                  .filter(specification => specification !== null)
                  .map(specification => ({
                    name: specification.name,
                    uri: `specifications://${specification.id}`
                  }))
              };
            } catch (error) {
              console.error("Error fetching specification list:", error);
              return { resources: [] };
            }
          }
        }),
        async (uri, variables) => {
          return {
            contents: []
          };
        }
      );
            
      server.resource(
        "Specification: Returns specification metadata. Accepts specification resource URI, i.e. specifications://{id}, where 'id' is a specification identifier.",
        new ResourceTemplate("specifications://{id}", { list: undefined }),
        async (uri: URL, variables) => {
          const id = variables.id as string;
          const client = new Graphlit();
          
          try {
            const response = await client.getSpecification(id);
            return {
              contents: [
                {
                  uri: uri.toString(),                  
                  text: JSON.stringify(response.specification, null, 2),
                  mimeType: 'application/json'
                }
              ]
            };
          } catch (error) {
            console.error("Error fetching specification:", error);
            return {
              contents: []
            };
          }
        }
      );
            
      server.resource(
        "Project: Returns current Graphlit project metadata including credits and LLM tokens used in the last day, available quota, and default content workflow. Accepts project resource URI, i.e. projects://{id}, where 'id' is a project identifier.",
        new ResourceTemplate("projects://", { list: undefined }),
        async (uri: URL, variables) => {
          const id = variables.id as string;
          const client = new Graphlit();
          
          try {
            const startDate = new Date(Date.now() - 24 * 60 * 60 * 1000);  // 1 day ago
            const duration = "P1D";  // ISO duration for 1 day

            const cresponse = await client.queryProjectCredits(startDate.toISOString(), duration);
            const credits = cresponse?.credits;

            const tresponse = await client.queryProjectTokens(startDate.toISOString(), duration);
            const tokens = tresponse?.tokens;

            const response = await client.getProject();

            return {
              contents: [
                {
                  uri: uri.toString(),
                  text: JSON.stringify({
                    name: response.project?.name,
                    workflow: response.project?.workflow,
                    quota: response.project?.quota,
                    credits: credits,
                    tokens: tokens,
                  }, null, 2),
                  mimeType: 'application/json'
                }
              ]
            };
          } catch (error) {
            console.error("Error fetching project:", error);
            return {
              contents: []
            };
          }
        }
      );
  }

function formatConversation(response: GetConversationQuery): string {
  const results: string[] = [];

  const conversation = response.conversation;

  if (!conversation) {
    return "";
  }

  // Basic conversation details
  results.push(`**Conversation ID:** ${conversation.id}`);

  // Messages
  if (conversation.messages?.length) {
    conversation.messages.forEach(message => {
      results.push(`${message?.role}:\n${message?.message}` || '');

      if (message?.citations?.length) {
        message.citations.forEach(citation => {
          results.push(`**Cited Source [${citation?.index}]**: contents://${citation?.content?.id}`);
          results.push(`**Cited Text**:\n${citation?.text || ''}`);
        });
      }

      results.push("\n---\n");
    });
  }

  return results.join('\n');
}

function formatContent(response: GetContentQuery): string {
  const results: string[] = [];

  const content = response.content;

  if (!content) {
    return "";
  }

  // Basic content details
  results.push(`**Content ID:** ${content.id}`);

  if (content.type === ContentTypes.File) {
    results.push(`**File Type:** [${content.fileType}]`);
    results.push(`**File Name:** ${content.fileName}`);
  } else {
    results.push(`**Type:** [${content.type}]`);
    if (content.type !== ContentTypes.Page && content.type !== ContentTypes.Email) {
      results.push(`**Name:** ${content.name}`);
    }
  }

  // Optional metadata
  
  //
  // REVIEW: Not sure if source URI is useful for MCP client
  //
  //if (content.uri) results.push(`**URI:** ${content.uri}`);

  if (content.masterUri) results.push(`**Downloadable Original:** ${content.masterUri}`);
  if (content.imageUri) results.push(`**Downloadable Image:** ${content.imageUri}`);
  if (content.audioUri) results.push(`**Downloadable Audio:** ${content.audioUri}`);

  if (content.creationDate) results.push(`**Ingestion Date:** ${content.creationDate}`);
  if (content.originalDate) results.push(`**Author Date:** ${content.originalDate}`);

  // Issue details
  if (content.issue) {
    const issue = content.issue;
    const issueAttributes = [
      ["Title", issue.title],
      ["Identifier", issue.identifier],
      ["Type", issue.type],
      ["Project", issue.project],
      ["Team", issue.team],
      ["Status", issue.status],
      ["Priority", issue.priority],
    ];
    results.push(...issueAttributes
      .filter(([_, value]) => value)
      .map(([label, value]) => `**${label}:** ${value}`));

    if (issue.labels?.length) {
      results.push(`**Labels:** ${issue.labels.join(', ')}`);
    }
  }

  // Email details
  if (content.email) {
    const email = content.email;
    const formatRecipient = (r: any) => `${r.name} <${r.email}>`;

    const emailAttributes = [
      ["Subject", email.subject],
      ["Sensitivity", email.sensitivity],
      ["Priority", email.priority],
      ["Importance", email.importance],
      ["Labels", email.labels?.join(', ')],
      ["To", email.to?.map(formatRecipient).join(', ')],
      ["From", email.from?.map(formatRecipient).join(', ')],
      ["CC", email.cc?.map(formatRecipient).join(', ')],
      ["BCC", email.bcc?.map(formatRecipient).join(', ')],
    ];
    results.push(...emailAttributes
      .filter(([_, value]) => value)
      .map(([label, value]) => `**${label}:** ${value}`));
  }

  // Document details
  if (content.document) {
    const doc = content.document;
    if (doc.title) results.push(`**Title:** ${doc.title}`);
    if (doc.author) results.push(`**Author:** ${doc.author}`);
  }

  // Audio details
  if (content.audio) {
    const audio = content.audio;
    if (audio.title) results.push(`**Title:** ${audio.title}`);
    if (audio.author) results.push(`**Host:** ${audio.author}`);
    if (audio.episode) results.push(`**Episode:** ${audio.episode}`);
    if (audio.series) results.push(`**Series:** ${audio.series}`);
  }

  // Image details
  if (content.image) {
    const image = content.image;
    if (image.description) results.push(`**Description:** ${image.description}`);
    if (image.software) results.push(`**Software:** ${image.software}`);
    if (image.make) results.push(`**Make:** ${image.make}`);
    if (image.model) results.push(`**Model:** ${image.model}`);
  }

  // Collections
  if (content.collections) {
    results.push(...content.collections
      .filter(collection => collection !== null)
      .slice(0, 100)
      .map(collection => `**Collection [${collection.name}]:** collections://${collection.id}`));
  }

  // Parent Content
  if (content.parent) {
    results.push(`**Parent Content:** contents://${content.parent.id}`);
  }

  // Child Content(s)
  if (content.children) {
    results.push(...content.children
      .filter(child => child !== null)
      .slice(0, 100)
      .map(child => `**Child Content:** contents://${child.id}`));
  }

  // Links
  if (content.links && content.type === ContentTypes.Page) {
    results.push(...content.links
      .slice(0, 1000)
      .map(link => `**${link.linkType} Link:** ${link.uri}`));
  }

  // Observations
  if (content.observations) {
    results.push(...content.observations
      .filter(observation => observation !== null)
      .filter(observation => observation.observable !== null)
      .slice(0, 100)
      .map(observation => `**${observation.type}:** ${observation.type.toLowerCase()}s://${observation.observable.id}`));
  }

  // Content
  if (content.pages?.length) {
    content.pages.forEach(page => {
      if (page.chunks?.length) {
        results.push(`**Page #${(page.index || 0) + 1}:**`);
        results.push(...(page.chunks?.filter(chunk => chunk?.text).map(chunk => chunk?.text || '') || []));
        results.push("\n---\n");
      }
    });
  }

  if (content.segments?.length) {
    content.segments.forEach(segment => {
      results.push(`**Transcript Segment [${segment.startTime}-${segment.endTime}]:**`);
      results.push(segment.text || '');
      results.push("\n---\n");
    });
  }

  if (content.frames?.length) {
    content.frames.forEach(frame => {
      results.push(`**Frame #${(frame.index || 0) + 1}:**`);
      results.push(frame.text || '');
      results.push("\n---\n");
    });
  }

  if (!content.pages?.length && 
      !content.segments?.length && 
      !content.frames?.length && 
      content.markdown) {
    results.push(content.markdown);
    results.push("\n");
  }

  return results.join('\n');
}



================================================
FILE: src/tools.ts
================================================
import fs from 'fs';
import path from 'path';
import mime from 'mime-types';
import { Graphlit, Types } from "graphlit-client";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { 
  ConversationFilter,
  CollectionFilter,
  ContentFilter, 
  ContentTypes, 
  FeedFilter,
  FeedServiceTypes, 
  EmailListingTypes, 
  SearchServiceTypes, 
  FeedListingTypes, 
  FeedTypes, 
  NotionTypes,
  RerankingModelServiceTypes, 
  RetrievalStrategyTypes, 
  GoogleDriveAuthenticationTypes,
  SharePointAuthenticationTypes, 
  FileTypes,
  TextTypes,
  SearchTypes,
  ContentPublishingServiceTypes,
  ContentPublishingFormats,
  ElevenLabsModels,
  IntegrationServiceTypes,
  TwitterListingTypes,
  ConversationSearchTypes,
  PromptStrategyTypes,
  OpenAiImageModels
} from "graphlit-client/dist/generated/graphql-types.js";

export function registerTools(server: McpServer) {
    server.tool(
    "configureProject",
    `Configures the default content workflow and conversation specification for the Graphlit project.
    Only needed if user asks to configure the project defaults. *Do not* call unless specifically asked for by the user.
    To reset the project configuration to 'factory state', assign False or null to all parameters.
    Optionally accepts whether to configure the default specification for LLM conversations. Defaults to using OpenAI GPT-4o, if not assigned.
    Optionally accepts whether to enable high-quality document and web page preparation using a vision LLM. Defaults to using Azure AI Document Intelligence for document preparation, if not assigned.
    Optionally accepts whether to enable entity extraction using LLM into the knowledge graph. Defaults to no entity extraction, if not assigned.
    Optionally accepts the preferred model provider service type, i.e. Anthropic, OpenAI, Google. Defaults to Anthropic if not provided.
    Returns the project identifier.`,
    { 
        modelServiceType: z.nativeEnum(Types.ModelServiceTypes).optional().default(Types.ModelServiceTypes.Anthropic).describe("Preferred model provider service type for all specifications, i.e. Anthropic, OpenAI, Google. Defaults to Anthropic if not provided."),
        configureConversationSpecification: z.boolean().optional().default(false).describe("Whether to configure the default specification for LLM conversations. Defaults to False."),
        configurePreparationSpecification: z.boolean().optional().default(false).describe("Whether to configure high-quality document and web page preparation using vision LLM. Defaults to False."),
        configureExtractionSpecification: z.boolean().optional().default(false).describe("Whether to configure entity extraction using LLM into the knowledge graph. Defaults to False."),
    },
    async ({ modelServiceType, configureConversationSpecification, configurePreparationSpecification, configureExtractionSpecification }) => {
        const client = new Graphlit();

        var preparationSpecificationId;
        var extractionSpecificationId;
        var completionSpecificationId;
        var workflowId;

        switch (modelServiceType)
        {
            case Types.ModelServiceTypes.Anthropic:
            case Types.ModelServiceTypes.Google:
            case Types.ModelServiceTypes.OpenAi:
                break;
            default:
                throw new Error(`Unsupported model service type [${modelServiceType}].`);
        }

        if (configureConversationSpecification) {
            var sresponse = await client.upsertSpecification({
                name: "MCP Default Specification: Completion",
                type: Types.SpecificationTypes.Completion,
                serviceType: modelServiceType,
                anthropic: modelServiceType == Types.ModelServiceTypes.Anthropic ? {
                    model: Types.AnthropicModels.Claude_3_7Sonnet
                } : undefined,
                openAI: modelServiceType == Types.ModelServiceTypes.OpenAi ? {
                    model: Types.OpenAiModels.Gpt4OChat_128K
                } : undefined,
                google: modelServiceType == Types.ModelServiceTypes.Google ? {
                    model: Types.GoogleModels.Gemini_2_0Flash
                } : undefined,
                searchType: ConversationSearchTypes.Hybrid,
                strategy: {
                    embedCitations: true,
                },
                promptStrategy: {
                    type: PromptStrategyTypes.OptimizeSearch, // optimize for similarity search
                },
                retrievalStrategy: {
                    type: RetrievalStrategyTypes.Section // expand chunk to section
                },
                rerankingStrategy: {
                    serviceType: RerankingModelServiceTypes.Cohere,
                }
            });

            completionSpecificationId = sresponse.upsertSpecification?.id;
        }

        if (configurePreparationSpecification) {
            var sresponse = await client.upsertSpecification({
                name: "MCP Default Specification: Preparation",
                type: Types.SpecificationTypes.Preparation,
                serviceType: modelServiceType,
                anthropic: modelServiceType == Types.ModelServiceTypes.Anthropic ? {
                    model: Types.AnthropicModels.Claude_3_7Sonnet,
                    enableThinking: true,
                } : undefined,
                openAI: modelServiceType == Types.ModelServiceTypes.OpenAi ? {
                    model: Types.OpenAiModels.Gpt4O_128K
                } : undefined,
                google: modelServiceType == Types.ModelServiceTypes.Google ? {
                    model: Types.GoogleModels.Gemini_2_5ProPreview
                } : undefined,
            });

            preparationSpecificationId = sresponse.upsertSpecification?.id;
        }

        if (configureExtractionSpecification) {
            var sresponse = await client.upsertSpecification({
                name: "MCP Default Specification: Extraction",
                type: Types.SpecificationTypes.Extraction,
                serviceType: modelServiceType,
                anthropic: modelServiceType == Types.ModelServiceTypes.Anthropic ? {
                    model: Types.AnthropicModels.Claude_3_7Sonnet
                } : undefined,
                openAI: modelServiceType == Types.ModelServiceTypes.OpenAi ? {
                    model: Types.OpenAiModels.Gpt4O_128K
                } : undefined,
                google: modelServiceType == Types.ModelServiceTypes.Google ? {
                    model: Types.GoogleModels.Gemini_2_0Flash
                } : undefined,
            });

            extractionSpecificationId = sresponse.upsertSpecification?.id;
        }

        const wresponse = await client.upsertWorkflow({ 
            name: "MCP Default Workflow", 
            preparation: preparationSpecificationId !== undefined ? {
                jobs: [ {
                    connector: {
                        type: Types.FilePreparationServiceTypes.ModelDocument,
                        modelDocument: {
                            specification: { id: preparationSpecificationId } 
                        }
                    }
                } ]
            } : undefined,
            extraction: extractionSpecificationId !== undefined ? { 
                jobs: [ { 
                    connector: { 
                        type: Types.EntityExtractionServiceTypes.ModelText, 
                        modelText: { 
                            specification: { id: extractionSpecificationId } 
                        } 
                    }
                }, { 
                    connector: { 
                        type: Types.EntityExtractionServiceTypes.ModelImage, 
                        modelImage: { 
                            specification: { id: extractionSpecificationId } 
                        } 
                    }
                } ]
            } : undefined
        });

        workflowId = wresponse.upsertWorkflow?.id;

        try {
        const response = await client.updateProject({ 
            specification: completionSpecificationId !== undefined ? { id: completionSpecificationId } : undefined,
            workflow: workflowId !== undefined ? { id: workflowId } : undefined

        });

        return {
            content: [{
            type: "text",
            text: JSON.stringify({ id: response.updateProject?.id }, null, 2)
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
    
    // Simple ISO duration parser
    function parseDuration(durationStr: string): number {
        const match = durationStr.match(
            /^P(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/
        );
    
        if (!match) {
            throw new Error(`Invalid ISO 8601 duration: ${durationStr}`);
        }
    
        const [, days, hours, minutes, seconds] = match.map(Number);
    
        const totalMs =
            (days || 0) * 24 * 60 * 60 * 1000 +
            (hours || 0) * 60 * 60 * 1000 +
            (minutes || 0) * 60 * 1000 +
            (seconds || 0) * 1000;
    
        return totalMs;
    }

    server.tool(
    "queryProjectUsage",
    `Queries project usage records.
    Usage record name describes the operation, i.e. 'Prompt completion', 'Text embedding', 'GraphQL', 'Entity Event'.
    'GraphQL' usage records are used for GraphQL operations, i.e. 'queryContents', 'retrieveSources', 'askGraphlit', etc.
    'Entity Event' usage records are used for async compute operations.
    'Text embedding' usage records are used for text embedding operations.
    'Prompt completion' usage records are used for LLM prompt completion operations, i.e. when using 'promptConversation'.
    'Data extraction' usage records are used for data extraction operations, using LLMs to extract knowledge graph entities.
    Look at 'metric' field for the type of metric captured in the usage record, i.e. BYTES, TOKENS, UNITS, REQUESTS.
    Look for 'credits' field which describes how many credits were charged by the operation.
    Look for 'promptTokens', 'completionTokens' and (total) 'tokens' fields which describe the number of tokens used by the operation.
    Look for 'request', 'response' and 'variables' fields which describe the GraphQL operation.
    Look for 'count' for the number of units used by the operation, for example, number of pages processed by document preparation.
    Accepts an optional recency filter for usage records 'in last' timespan.
    Returns a list of usage records, which describe the billable audit log of all Graphlit API operations.`,
    { 
        inLast: z.string().optional().default("PT1H").describe("Recency filter for usage records 'in last' timespan, optional. Defaults to PT1H. Should be ISO 8601 format, for example, 'PT1H' for last hour, 'P1D' for last day, 'P7D' for last week, 'P30D' for last month. Doesn't support weeks or months explicitly."),
    },
    async ({ inLast }) => {
        const client = new Graphlit();

        try {
        const durationMs = parseDuration(inLast);
        const startDate = new Date(Date.now() - durationMs);            

        let offset = 0;
        const limit = 1000;
        const usage: any[] = [];

        while (true) {
            const response = await client.queryProjectUsage(startDate, inLast, [], [], offset, limit);
            const usageBatch = response.usage ?? [];
        
            for (const record of usageBatch) {
                if (record)
                {
                    const remappedRecord: any = {
                        date: record.date,
                        name: record.name,
                        metric: record.metric,
                        credits: record.credits,
                        count: record.count,
                        duration: record.duration,
                        entityType: record.entityType,
                        entityId: record.entityId,
                        ownerId: record.ownerId,
                        workflow: record.workflow,
                        contentType: record.contentType,
                        fileType: record.fileType,
                        uri: record.uri,
                        modelService: record.modelService,
                        modelName: record.modelName,
                        //prompt: record.prompt,
                        promptTokens: record.promptTokens,
                        //completion: record.completion,
                        completionTokens: record.completionTokens,
                        tokens: record.tokens,
                        operation: record.operation,
                    };
                    
                    // Remove any fields that are "", null, or undefined
                    for (const key of Object.keys(remappedRecord)) {
                        const value = remappedRecord[key];
                        if (value === "" || value === null || value === undefined) {
                            delete remappedRecord[key];
                        }
                    }
                    
                    usage.push(remappedRecord);
                }
            }
                    
            if (usageBatch.length < limit) {
                // No more pages
                break;
            }
        
            offset += limit;
        }
        
        return {
            content: [{
                type: "text",
                text: JSON.stringify(usage, null, 2)
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

    server.tool(
    "askGraphlit",
    `Ask questions about using the Graphlit Platform, or specifically about the Graphlit API or SDKs.
    When the user asks about how to use the Graphlit API or SDKs, use this tool to provide a code sample in Python, TypeScript or C#.
    Accepts an LLM user prompt.
    Returns the LLM prompt completion in Markdown format.`,
    { 
        prompt: z.string().describe("LLM user prompt.")
    },
    async ({ prompt }) => {
        const client = new Graphlit();

        try {
        const response = await client.askGraphlit(prompt);
        
        const message = response.askGraphlit?.message;
        
        return {
            content: [{
            type: "text",
            text: JSON.stringify(message, null, 2)
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
 
    server.tool(
    "promptConversation",
    `Prompts an LLM conversation about your entire Graphlit knowledge base. 
    Uses hybrid vector search based on user prompt for locating relevant content sources. Uses LLM to complete the user prompt with the configured LLM.
    Maintains conversation history between 'user' and LLM 'assistant'. 
    Prefer 'promptConversation' when the user intends to start or continue an ongoing conversation about the entire Graphlit knowledge base.
    Similar to 'retrieveSources' but does not perform content metadata filtering.
    Accepts an LLM user prompt and optional conversation identifier. Will either create a new conversation or continue an existing one.
    Will use the default specification for LLM conversations, which is optionally configured with the 'configureProject' tool.
    Returns the conversation identifier, completed LLM message, and any citations from the LLM response.`,
    { 
        prompt: z.string().describe("User prompt."),
        conversationId: z.string().optional().describe("Conversation identifier, optional."),
    },
    async ({ prompt, conversationId }) => {
        const client = new Graphlit();

        try {
        const response = await client.promptConversation(prompt, conversationId);

        return {
            content: [{
            type: "text",
            text: JSON.stringify({ 
                id: response.promptConversation?.conversation?.id, 
                message: response.promptConversation?.message?.message, 
                citations: response.promptConversation?.message?.citations,
            }, null, 2)
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

    server.tool(
    "retrieveSources",
    `Retrieve relevant content sources from Graphlit knowledge base. Do *not* use for retrieving content by content identifier - retrieve content resource instead, with URI 'contents://{id}'.
    Accepts an LLM user prompt for content retrieval. For best retrieval quality, provide only key words or phrases from the user prompt, which will be used to create text embeddings for a vector search query.
    Only use when there is a valid LLM user prompt for content retrieval, otherwise use 'queryContents'. For example 'recent content' is not a useful user prompt, since it doesn't reference the text in the content.
    Only use for 'one shot' retrieval of content sources, i.e. when the user is not interested in having a conversation about the content.
    Accepts an optional ingestion recency filter (defaults to null, meaning all time), and optional content type and file type filters.
    Also accepts optional feed and collection identifiers to filter content by.
    Returns the ranked content sources, including their content resource URI to retrieve the complete Markdown text.`,
    { 
        prompt: z.string().describe("LLM user prompt for content retrieval."),
        inLast: z.string().optional().describe("Recency filter for content ingested 'in last' timespan, optional. Should be ISO 8601 format, for example, 'PT1H' for last hour, 'P1D' for last day, 'P7D' for last week, 'P30D' for last month. Doesn't support weeks or months explicitly."),
        type: z.nativeEnum(ContentTypes).optional().describe("Content type filter, optional. One of: Email, Event, File, Issue, Message, Page, Post, Text."),
        fileType: z.nativeEnum(FileTypes).optional().describe("File type filter, optional. One of: Animation, Audio, Code, Data, Document, Drawing, Email, Geometry, Image, Package, PointCloud, Shape, Video."),
        feeds: z.array(z.string()).optional().describe("Feed identifiers to filter content by, optional."),
        collections: z.array(z.string()).optional().describe("Collection identifiers to filter content by, optional.")
    },
    async ({ prompt, type, fileType, inLast, feeds, collections }) => {
        const client = new Graphlit();

        try {
        const filter: ContentFilter = { 
            searchType: SearchTypes.Hybrid,
            feeds: feeds?.map(feed => ({ id: feed })),
            collections: collections?.map(collection => ({ id: collection })),
            createdInLast: inLast, 
            types: type ? [type] : null, 
            fileTypes: fileType ? [fileType] : null
        };

        const response = await client.retrieveSources(prompt, filter, undefined, 
        { 
            type: RetrievalStrategyTypes.Chunk, 
            disableFallback: true
        }, 
        { 
            serviceType: RerankingModelServiceTypes.Cohere 
        });
        
        const sources = response.retrieveSources?.results || [];
        
        return {
            content: sources
            .filter(source => source !== null)
            .map(source => ({
                type: "text",
                mimeType: "application/json",
                text: JSON.stringify({ 
                id: source.content?.id, 
                relevance: source.relevance,
                resourceUri: `contents://${source.content?.id}`, 
                text: source.text, 
                mimeType: "text/markdown"
                }, null, 2)
            }))
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

    const PointFilter = z.object({
        latitude: z.number().min(-90).max(90)
            .describe("The latitude, must be between -90 and 90."),
        longitude: z.number().min(-180).max(180)
            .describe("The longitude, must be between -180 and 180."),
        distance: z.number().optional()
            .describe("The distance radius (in meters)."),
    });

    //
    // REVIEW: MCP clients don't handle Base64-encoded data very well,
    // will often exceed the LLM context window to return from the tool
    // so, we only can support similar images by URL
    server.tool(
    "retrieveImages",
    `Retrieve images from Graphlit knowledge base. Provides image-specific retrieval when image similarity search is desired.
    Do *not* use for retrieving content by content identifier - retrieve content resource instead, with URI 'contents://{id}'.
    Accepts image URL. Image will be used for similarity search using image embeddings.
    Accepts optional geo-location filter for search by latitude, longitude and optional distance radius. Images taken with GPS enabled are searchable by geo-location.
    Also accepts optional recency filter (defaults to null, meaning all time), and optional feed and collection identifiers to filter images by.
    Returns the matching images, including their content resource URI to retrieve the complete Markdown text.`,
    { 
        url: z.string().describe("URL of image which will be used for similarity search using image embeddings."),
        inLast: z.string().optional().describe("Recency filter for images ingested 'in last' timespan, optional. Should be ISO 8601 format, for example, 'PT1H' for last hour, 'P1D' for last day, 'P7D' for last week, 'P30D' for last month. Doesn't support weeks or months explicitly."),
        feeds: z.array(z.string()).optional().describe("Feed identifiers to filter images by, optional."),
        collections: z.array(z.string()).optional().describe("Collection identifiers to filter images by, optional."),
        location: PointFilter.optional().describe("Geo-location filter for search by latitude, longitude and optional distance radius."),
        limit: z.number().optional().default(100).describe("Limit the number of images to be returned. Defaults to 100.")
    },
    async ({ url, inLast, feeds, collections, location, limit }) => {
        const client = new Graphlit();

        var data;
        var mimeType;

        if (url) {
            const fetchResponse = await fetch(url);
            if (!fetchResponse.ok) {
                throw new Error(`Failed to fetch data from ${url}: ${fetchResponse.statusText}`);
            }
            const arrayBuffer = await fetchResponse.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
        
            data = buffer.toString('base64');
            mimeType = fetchResponse.headers.get('content-type') || 'application/octet-stream';
        }

        try {
        const filter: ContentFilter = { 
            imageData: data,
            imageMimeType: mimeType,
            searchType: SearchTypes.Vector,
            feeds: feeds?.map(feed => ({ id: feed })),
            collections: collections?.map(collection => ({ id: collection })),
            location: location,
            createdInLast: inLast, 
            types: [ContentTypes.File], 
            fileTypes: [FileTypes.Image],
            limit: limit
        };
        const response = await client.queryContents(filter);
        
        const contents = response.contents?.results || [];
        
        return {
            content: contents
            .filter(content => content !== null)
            .map(content => ({
                type: "text",
                mimeType: "application/json",
                text: JSON.stringify({ 
                    id: content.id, 
                    relevance: content.relevance,
                    fileName: content.fileName,                    
                    resourceUri: `contents://${content.id}`, 
                    uri: content.imageUri, 
                    mimeType: content.mimeType
                }, null, 2)
            }))
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

    server.tool(
    "extractText",
    `Extracts JSON data from text using LLM.
    Accepts text to be extracted, and JSON schema which describes the data which will be extracted. JSON schema needs be of type 'object' and include 'properties' and 'required' fields.
    Optionally accepts text prompt which is provided to LLM to guide data extraction. Defaults to 'Extract data using the tools provided'.
    Returns extracted JSON from text.`,
    { 
        text: z.string().describe("Text to be extracted with LLM."),
        schema: z.string().describe("JSON schema which describes the data which will be extracted. JSON schema needs be of type 'object' and include 'properties' and 'required' fields."),
        prompt: z.string().optional().describe("Text prompt which is provided to LLM to guide data extraction, optional.")
    },
    async ({ text, schema, prompt }) => {
        const client = new Graphlit();

        const DEFAULT_NAME = "extract_json"
        const DEFAULT_PROMPT = `
        Extract data using the tools provided.
        `

        try {           
            const response = await client.extractText(prompt || DEFAULT_PROMPT, text, [{ name: DEFAULT_NAME, schema: schema }]);

            return {
              content: [{
                type: "text",
                text: JSON.stringify(response.extractText ? response.extractText.filter(item => item !== null).map(item => item.value) : [], null, 2)
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

    server.tool(
    "createCollection",
    `Create a collection.
    Accepts a collection name, and optional list of content identifiers to add to collection.
    Returns the collection identifier`,
    { 
        name: z.string().describe("Collection name."),
        contents: z.array(z.string()).optional().describe("Content identifiers to add to collection, optional.")
    },
    async ({ name, contents }) => {
        const client = new Graphlit();

        try {
        const response = await client.createCollection({ 
            name: name, 
            contents: contents?.map(content => ({ id: content })), 
        });
                
        return {
            content: [{
            type: "text",
            text: JSON.stringify({ id: response.createCollection?.id }, null, 2)
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

    server.tool(
    "addContentsToCollection",
    `Add contents to a collection.
    Accepts a collection identifier and a list of content identifiers to add to collection.
    Returns the collection identifier.`,
    { 
        id: z.string().describe("Collection identifier."),
        contents: z.array(z.string()).describe("Content identifiers to add to collection.")
    },
    async ({ id, contents }) => {
        const client = new Graphlit();

        try {
        const response = await client.addContentsToCollections(
            contents?.map(content => ({ id: content })),
            [{ id: id }]
        );
                
        return {
            content: [{
            type: "text",
            text: JSON.stringify({ id: id }, null, 2)
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

    server.tool(
    "removeContentsFromCollection",
    `Remove contents from collection.
    Accepts a collection identifier and a list of content identifiers to remove from collection.
    Returns the collection identifier.`,
    { 
        id: z.string().describe("Collection identifier."),
        contents: z.array(z.string()).describe("Content identifiers to remove from collection.")
    },
    async ({ id, contents }) => {
        const client = new Graphlit();

        try {
        const response = await client.removeContentsFromCollection(
            contents?.map(content => ({ id: content })),
            { id: id }
        );
                
        return {
            content: [{
            type: "text",
            text: JSON.stringify({ id: response.removeContentsFromCollection?.id }, null, 2)
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

    server.tool(
    "deleteContent",
    `Deletes content from Graphlit knowledge base.
    Accepts content identifier.
    Returns the content identifier and content state, i.e. Deleted.`,
    { 
        id: z.string().describe("Content identifier."),
    },
    async ({ id }) => {
        const client = new Graphlit();

        try {
        const response = await client.deleteContent(id);
                
        return {
            content: [{
            type: "text",
            text: JSON.stringify(response.deleteContent, null, 2)
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

    server.tool(
    "deleteConversation",
    `Deletes conversation from Graphlit knowledge base.
    Accepts conversation identifier.
    Returns the conversation identifier and content state, i.e. Deleted.`,
    { 
        id: z.string().describe("Conversation identifier."),
    },
    async ({ id }) => {
        const client = new Graphlit();

        try {
        const response = await client.deleteConversation(id);
                
        return {
            content: [{
            type: "text",
            text: JSON.stringify(response.deleteConversation, null, 2)
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

    server.tool(
    "deleteCollection",
    `Deletes collection from Graphlit knowledge base.
    Does *not* delete the contents in the collection, only the collection itself.
    Accepts collection identifier.
    Returns the collection identifier and collection state, i.e. Deleted.`,
    { 
        id: z.string().describe("Collection identifier."),
    },
    async ({ id }) => {
        const client = new Graphlit();

        try {
        const response = await client.deleteCollection(id);
                
        return {
            content: [{
            type: "text",
            text: JSON.stringify(response.deleteCollection, null, 2)
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

    server.tool(
    "deleteFeed",
    `Deletes feed from Graphlit knowledge base.
    *Does* delete the contents in the feed, in addition to the feed itself.
    Accepts feed identifier.
    Returns the feed identifier and feed state, i.e. Deleted.`,
    { 
        id: z.string().describe("Feed identifier."),
    },
    async ({ id }) => {
        const client = new Graphlit();

        try {
        const response = await client.deleteFeed(id);
                
        return {
            content: [{
            type: "text",
            text: JSON.stringify(response.deleteFeed, null, 2)
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

    server.tool(
    "deleteFeeds",
    `Deletes feeds from Graphlit knowledge base.
    *Does* delete the contents in the feed, in addition to the feed itself.
    Accepts optional feed type filter to limit the feeds which will be deleted.
    Also accepts optional limit of how many feeds to delete, defaults to 100.
    Returns the feed identifiers and feed state, i.e. Deleted.`,
    { 
        feedType: z.nativeEnum(FeedTypes).optional().describe("Feed type filter, optional. One of: Discord, Email, Intercom, Issue, MicrosoftTeams, Notion, Reddit, Rss, Search, Site, Slack, Web, YouTube, Zendesk."),
        limit: z.number().optional().default(100).describe("Limit the number of feeds to be deleted. Defaults to 100.")
    },
    async ({ feedType, limit }) => {
        const client = new Graphlit();

        try {
        const filter: FeedFilter = { 
            types: feedType ? [feedType] : null, 
            limit: limit
        };                

        const response = await client.deleteAllFeeds(filter, true);
                
        return {
            content: [{
            type: "text",
            text: JSON.stringify(response.deleteAllFeeds, null, 2)
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

    server.tool(
    "deleteCollections",
    `Deletes collections from Graphlit knowledge base.
    Does *not* delete the contents in the collections, only the collections themselves.
    Accepts optional limit of how many collections to delete, defaults to 100.
    Returns the collection identifiers and collection state, i.e. Deleted.`,
    { 
        limit: z.number().optional().default(100).describe("Limit the number of collections to be deleted. Defaults to 100.")
    },
    async ({ limit }) => {
        const client = new Graphlit();

        try {
        const filter: CollectionFilter = { 
            limit: limit
        };                

        const response = await client.deleteAllCollections(filter, true);
                
        return {
            content: [{
            type: "text",
            text: JSON.stringify(response.deleteAllCollections, null, 2)
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

    server.tool(
    "deleteConversations",
    `Deletes conversations from Graphlit knowledge base.
    Accepts optional limit of how many conversations to delete, defaults to 100.
    Returns the conversation identifiers and conversation state, i.e. Deleted.`,
    { 
        limit: z.number().optional().default(100).describe("Limit the number of conversations to be deleted. Defaults to 100.")
    },
    async ({ limit }) => {
        const client = new Graphlit();

        try {
        const filter: ConversationFilter = { 
            limit: limit
        };                

        const response = await client.deleteAllConversations(filter, true);
                
        return {
            content: [{
            type: "text",
            text: JSON.stringify(response.deleteAllConversations, null, 2)
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
    
    server.tool(
    "deleteContents",
    `Deletes contents from Graphlit knowledge base.
    Accepts optional content type and file type filters to limit the contents which will be deleted.
    Also accepts optional limit of how many contents to delete, defaults to 1000.
    Returns the content identifiers and content state, i.e. Deleted.`,
    { 
        contentType: z.nativeEnum(ContentTypes).optional().describe("Content type filter, optional. One of: Email, Event, File, Issue, Message, Page, Post, Text."),
        fileType: z.nativeEnum(FileTypes).optional().describe("File type filter, optional. One of: Animation, Audio, Code, Data, Document, Drawing, Email, Geometry, Image, Package, PointCloud, Shape, Video."),
        limit: z.number().optional().default(1000).describe("Limit the number of contents to be deleted. Defaults to 1000.")
    },
    async ({ contentType, fileType, limit }) => {
        const client = new Graphlit();

        try {
        const filter: ContentFilter = { 
            types: contentType ? [contentType] : null, 
            fileTypes: fileType ? [fileType] : null,
            limit: limit
        };                

        const response = await client.deleteAllContents(filter, true);
                
        return {
            content: [{
            type: "text",
            text: JSON.stringify(response.deleteAllContents, null, 2)
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

    server.tool(
    "queryContents",
    `Query contents from Graphlit knowledge base. Do *not* use for retrieving content by content identifier - retrieve content resource instead, with URI 'contents://{id}'.
    Accepts optional content name, content type and file type for metadata filtering.
    Accepts optional hybrid vector search query.
    Accepts optional recency filter (defaults to null, meaning all time), and optional feed and collection identifiers to filter images by.
    Accepts optional geo-location filter for search by latitude, longitude and optional distance radius. Images and videos taken with GPS enabled are searchable by geo-location.
    Returns the matching contents, including their content resource URI to retrieve the complete Markdown text.`,
    { 
        name: z.string().optional().describe("Textual match on content name."),
        query: z.string().optional().describe("Search query."),
        type: z.nativeEnum(ContentTypes).optional().describe("Filter by content type."),
        fileType: z.nativeEnum(FileTypes).optional().describe("Filter by file type."),
        inLast: z.string().optional().describe("Recency filter for content ingested 'in last' timespan, optional. Should be ISO 8601 format, for example, 'PT1H' for last hour, 'P1D' for last day, 'P7D' for last week, 'P30D' for last month. Doesn't support weeks or months explicitly."),
        feeds: z.array(z.string()).optional().describe("Feed identifiers to filter contents by, optional."),
        collections: z.array(z.string()).optional().describe("Collection identifiers to filter contents by, optional."),
        location: PointFilter.optional().describe("Geo-location filter for search by latitude, longitude and optional distance radius."),
        limit: z.number().optional().default(100).describe("Limit the number of contents to be returned. Defaults to 100.")
    },
    async ({ name, query, type, fileType, inLast, feeds, collections, location, limit }) => {
        const client = new Graphlit();

        try {
        const filter: ContentFilter = { 
            name: name,
            search: query,
            searchType: SearchTypes.Hybrid,
            types: type !== undefined ? [ type ] : undefined,
            fileTypes: fileType !== undefined ? [ fileType ] : undefined,
            feeds: feeds?.map(feed => ({ id: feed })),
            collections: collections?.map(collection => ({ id: collection })),
            location: location,
            createdInLast: inLast,
            limit: limit
        };
        const response = await client.queryContents(filter);
        
        const contents = response.contents?.results || [];
        
        return {
            content: contents
            .filter(content => content !== null)
            .map(content => ({
                type: "text",
                mimeType: "application/json",
                text: JSON.stringify({ 
                    id: content.id, 
                    relevance: content.relevance,
                    fileName: content.fileName,
                    resourceUri: `contents://${content.id}`, 
                    uri: content.imageUri, 
                    mimeType: content.mimeType
                }, null, 2)
            }))
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
    
    server.tool(
    "queryCollections",
    `Query collections from Graphlit knowledge base. Do *not* use for retrieving collection by collection identifier - retrieve collection resource instead, with URI 'collections://{id}'.
    Accepts optional collection name for metadata filtering.
    Returns the matching collections, including their collection resource URI to retrieve the collection contents.`,
    { 
        name: z.string().optional().describe("Textual match on collection name."),
        limit: z.number().optional().default(100).describe("Limit the number of collections to be returned. Defaults to 100.")
    },
    async ({ name, limit }) => {
        const client = new Graphlit();

        try {
        const filter: CollectionFilter = { 
            name: name,
            limit: limit
        };
        const response = await client.queryCollections(filter);
        
        const collections = response.collections?.results || [];
        
        return {
            content: collections
            .filter(collection => collection !== null)
            .map(collection => ({
                type: "text",
                mimeType: "application/json",
                text: JSON.stringify({ 
                    id: collection.id, 
                    relevance: collection.relevance,
                    resourceUri: `collections://${collection.id}`
                }, null, 2)
            }))
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

    server.tool(
    "queryFeeds",
    `Query feeds from Graphlit knowledge base. Do *not* use for retrieving feed by feed identifier - retrieve feed resource instead, with URI 'feeds://{id}'.
    Accepts optional feed name and feed type for metadata filtering.
    Returns the matching feeds, including their feed resource URI to retrieve the feed contents.`,
    { 
        name: z.string().optional().describe("Textual match on feed name."),
        type: z.nativeEnum(FeedTypes).optional().describe("Filter by feed type."),
        limit: z.number().optional().default(100).describe("Limit the number of feeds to be returned. Defaults to 100.")
    },
    async ({ name, type, limit }) => {
        const client = new Graphlit();

        try {
        const filter: FeedFilter = { 
            name: name,
            types: type !== undefined ? [ type ] : undefined,
            limit: limit
        };
        const response = await client.queryFeeds(filter);
        
        const feeds = response.feeds?.results || [];
        
        return {
            content: feeds
            .filter(feed => feed !== null)
            .map(feed => ({
                type: "text",
                mimeType: "application/json",
                text: JSON.stringify({ 
                    id: feed.id, 
                    relevance: feed.relevance,
                    resourceUri: `feeds://${feed.id}`
                }, null, 2)
            }))
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

    server.tool(
    "queryConversations",
    `Query conversations from Graphlit knowledge base. Do *not* use for retrieving conversation by conversation identifier - retrieve conversation resource instead, with URI 'conversations://{id}'.
    Accepts optional hybrid vector search query.
    Accepts optional recency filter (defaults to null, meaning all time).
    Returns the matching conversations, including their conversation resource URI to retrieve the complete conversation message history.`,
    { 
        query: z.string().optional().describe("Search query."),
        inLast: z.string().optional().describe("Recency filter for conversations created 'in last' timespan, optional. Should be ISO 8601 format, for example, 'PT1H' for last hour, 'P1D' for last day, 'P7D' for last week, 'P30D' for last month. Doesn't support weeks or months explicitly."),
        limit: z.number().optional().default(100).describe("Limit the number of conversations to be returned. Defaults to 100.")
    },
    async ({ query, inLast, limit }) => {
        const client = new Graphlit();

        try {
        const filter: ConversationFilter = { 
            search: query,
            searchType: SearchTypes.Hybrid,
            createdInLast: inLast,
            limit: limit
        };
        const response = await client.queryConversations(filter);
        
        const conversations = response.conversations?.results || [];
        
        return {
            content: conversations
            .filter(conversation => conversation !== null)
            .map(conversation => ({
                type: "text",
                mimeType: "application/json",
                text: JSON.stringify({ 
                    id: conversation.id, 
                    relevance: conversation.relevance,
                    resourceUri: `conversations://${conversation.id}`
                }, null, 2)
            }))
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

    server.tool(
    "isContentDone",
    `Check if content has completed asynchronous ingestion.
    Accepts a content identifier which was returned from one of the non-feed ingestion tools, like ingestUrl.
    Returns whether the content is done or not.`,
    { 
        id: z.string().describe("Content identifier."),
    },
    async ({ id}) => {
        const client = new Graphlit();

        try {
        const response = await client.isContentDone(id);
                
        return {
            content: [{
            type: "text",
            text: JSON.stringify({ done: response.isContentDone?.result }, null, 2)
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

    server.tool(
    "isFeedDone",
    `Check if an asynchronous feed has completed ingesting all the available content.
    Accepts a feed identifier which was returned from one of the ingestion tools, like ingestGoogleDriveFiles.
    Returns whether the feed is done or not.`,
    { 
        id: z.string().describe("Feed identifier."),
    },
    async ({ id}) => {
        const client = new Graphlit();

        try {
        const response = await client.isFeedDone(id);
                
        return {
            content: [{
            type: "text",
            text: JSON.stringify({ done: response.isFeedDone?.result }, null, 2)
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

    /*
    server.tool(
    "listMicrosoftTeamsTeams",
    `Lists available Microsoft Teams teams.
    Requires environment variables to be configured: MICROSOFT_TEAMS_CLIENT_ID, MICROSOFT_TEAMS_CLIENT_SECRET, MICROSOFT_TEAMS_REFRESH_TOKEN.
    Returns a list of Microsoft Teams teams, where the team identifier can be used with listMicrosoftTeamsChannels to enumerate Microsoft Teams channels.`,
    { 
    },
    async ({ }) => {
        const client = new Graphlit();

        try {
        const clientId = process.env.MICROSOFT_TEAMS_CLIENT_ID;
        if (!clientId) {
            console.error("Please set MICROSOFT_TEAMS_CLIENT_ID environment variable.");
            process.exit(1);
        }

        const clientSecret = process.env.MICROSOFT_TEAMS_CLIENT_SECRET;
        if (!clientSecret) {
            console.error("Please set MICROSOFT_TEAMS_CLIENT_SECRET environment variable.");
            process.exit(1);
        }

        const refreshToken = process.env.MICROSOFT_TEAMS_REFRESH_TOKEN;
        if (!refreshToken) {
            console.error("Please set MICROSOFT_TEAMS_REFRESH_TOKEN environment variable.");
            process.exit(1);
        }

        // REVIEW: client ID/secret not exposed in SDK
        const response = await client.queryMicrosoftTeamsTeams({
            //clientId: clientId,
            //clientSecret: clientSecret,
            refreshToken: refreshToken,
        });

        return {
            content: [{
            type: "text",
            text: JSON.stringify(response.microsoftTeamsTeams?.results, null, 2)
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

    server.tool(
    "listMicrosoftTeamsChannels",
    `Lists available Microsoft Teams channels.
    Requires environment variables to be configured: MICROSOFT_TEAMS_CLIENT_ID, MICROSOFT_TEAMS_CLIENT_SECRET, MICROSOFT_TEAMS_REFRESH_TOKEN.
    Returns a list of Microsoft Teams channels, where the channel identifier can be used with ingestMicrosoftTeamsMessages to ingest messages into Graphlit knowledge base.`,
    { 
        teamId: z.string().describe("Microsoft Teams team identifier.")
    },
    async ({ teamId }) => {
        const client = new Graphlit();

        try {
        const clientId = process.env.MICROSOFT_TEAMS_CLIENT_ID;
        if (!clientId) {
            console.error("Please set MICROSOFT_TEAMS_CLIENT_ID environment variable.");
            process.exit(1);
        }

        const clientSecret = process.env.MICROSOFT_TEAMS_CLIENT_SECRET;
        if (!clientSecret) {
            console.error("Please set MICROSOFT_TEAMS_CLIENT_SECRET environment variable.");
            process.exit(1);
        }

        const refreshToken = process.env.MICROSOFT_TEAMS_REFRESH_TOKEN;
        if (!refreshToken) {
            console.error("Please set MICROSOFT_TEAMS_REFRESH_TOKEN environment variable.");
            process.exit(1);
        }

        // REVIEW: client ID/secret not exposed in SDK
        const response = await client.queryMicrosoftTeamsChannels({
            //clientId: clientId,
            //clientSecret: clientSecret,
            refreshToken: refreshToken,
        }, teamId);

        return {
            content: [{
            type: "text",
            text: JSON.stringify(response.microsoftTeamsChannels?.results, null, 2)
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
    */

    server.tool(
    "listNotionDatabases",
    `Lists available Notion databases.
    Requires environment variable to be configured: NOTION_API_KEY.
    Returns a list of Notion databases, where the database identifier can be used with ingestNotionPages to ingest pages into Graphlit knowledge base.`,
    { 
    },
    async ({ }) => {
        const client = new Graphlit();

        try {
        const token = process.env.NOTION_API_KEY;
        if (!token) {
            console.error("Please set NOTION_API_KEY environment variable.");
            process.exit(1);
        }
    
        const response = await client.queryNotionDatabases({
            token: token
        });

        return {
            content: [{
            type: "text",
            text: JSON.stringify(response.notionDatabases?.results, null, 2)
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

    server.tool(
    "listLinearProjects",
    `Lists available Linear projects.
    Requires environment variable to be configured: LINEAR_API_KEY.
    Returns a list of Linear projects, where the project name can be used with ingestLinearIssues to ingest issues into Graphlit knowledge base.`,
    { 
    },
    async ({ }) => {
        const client = new Graphlit();

        try {
        const apiKey = process.env.LINEAR_API_KEY;
        if (!apiKey) {
            console.error("Please set LINEAR_API_KEY environment variable.");
            process.exit(1);
        }

        const response = await client.queryLinearProjects({
            key: apiKey
        });

        return {
            content: [{
            type: "text",
            text: JSON.stringify(response.linearProjects?.results, null, 2)
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

    server.tool(
    "listSlackChannels",
    `Lists available Slack channels.
    Requires environment variable to be configured: SLACK_BOT_TOKEN.
    Returns a list of Slack channels, where the channel name can be used with ingestSlackMessages to ingest messages into Graphlit knowledge base.`,
    { 
    },
    async ({ }) => {
        const client = new Graphlit();

        try {
        const botToken = process.env.SLACK_BOT_TOKEN;
        if (!botToken) {
            console.error("Please set SLACK_BOT_TOKEN environment variable.");
            process.exit(1);
        }

        const response = await client.querySlackChannels({
            token: botToken
        });

        return {
            content: [{
            type: "text",
            text: JSON.stringify(response.slackChannels?.results, null, 2)
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

    server.tool(
    "listSharePointLibraries",
    `Lists available SharePoint libraries.
    Requires environment variables to be configured: SHAREPOINT_CLIENT_ID, SHAREPOINT_CLIENT_SECRET, SHAREPOINT_REFRESH_TOKEN.
    Returns a list of SharePoint libraries, where the selected libraryId can be used with listSharePointFolders to enumerate SharePoint folders in a library.`,
    { 
    },
    async ({ }) => {
        const client = new Graphlit();

        try {
        const clientId = process.env.SHAREPOINT_CLIENT_ID;
        if (!clientId) {
            console.error("Please set SHAREPOINT_CLIENT_ID environment variable.");
            process.exit(1);
        }

        const clientSecret = process.env.SHAREPOINT_CLIENT_SECRET;
        if (!clientSecret) {
            console.error("Please set SHAREPOINT_CLIENT_SECRET environment variable.");
            process.exit(1);
        }

        const refreshToken = process.env.SHAREPOINT_REFRESH_TOKEN;
        if (!refreshToken) {
            console.error("Please set SHAREPOINT_REFRESH_TOKEN environment variable.");
            process.exit(1);
        }

        const response = await client.querySharePointLibraries({
            authenticationType: SharePointAuthenticationTypes.User,
            clientId: clientId,
            clientSecret: clientSecret,
            refreshToken: refreshToken,
        });

        return {
            content: [{
            type: "text",
            text: JSON.stringify(response.sharePointLibraries?.results, null, 2)
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

    server.tool(
    "listSharePointFolders",
    `Lists available SharePoint folders.
    Requires environment variables to be configured: SHAREPOINT_CLIENT_ID, SHAREPOINT_CLIENT_SECRET, SHAREPOINT_REFRESH_TOKEN.
    Returns a list of SharePoint folders, which can be used with ingestSharePointFiles to ingest files into Graphlit knowledge base.`,
    { 
        libraryId: z.string().describe("SharePoint library identifier.")
    },
    async ({ libraryId }) => {
        const client = new Graphlit();

        try {
        const clientId = process.env.SHAREPOINT_CLIENT_ID;
        if (!clientId) {
            console.error("Please set SHAREPOINT_CLIENT_ID environment variable.");
            process.exit(1);
        }

        const clientSecret = process.env.SHAREPOINT_CLIENT_SECRET;
        if (!clientSecret) {
            console.error("Please set SHAREPOINT_CLIENT_SECRET environment variable.");
            process.exit(1);
        }

        const refreshToken = process.env.SHAREPOINT_REFRESH_TOKEN;
        if (!refreshToken) {
            console.error("Please set SHAREPOINT_REFRESH_TOKEN environment variable.");
            process.exit(1);
        }

        const response = await client.querySharePointFolders({
            authenticationType: SharePointAuthenticationTypes.User,
            clientId: clientId,
            clientSecret: clientSecret,
            refreshToken: refreshToken,
            }, libraryId);

        return {
            content: [{
            type: "text",
            text: JSON.stringify(response.sharePointFolders?.results, null, 2)
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

    server.tool(
    "ingestSharePointFiles",
    `Ingests files from SharePoint library into Graphlit knowledge base.
    Accepts a SharePoint libraryId and an optional folderId to ingest files from a specific SharePoint folder.
    Libraries can be enumerated with listSharePointLibraries and library folders with listSharePointFolders.
    Requires environment variables to be configured: SHAREPOINT_ACCOUNT_NAME, SHAREPOINT_CLIENT_ID, SHAREPOINT_CLIENT_SECRET, SHAREPOINT_REFRESH_TOKEN.
    Accepts an optional read limit for the number of files to ingest.
    Executes asynchronously, creates SharePoint feed, and returns the feed identifier.`,
    { 
        libraryId: z.string().describe("SharePoint library identifier."),
        folderId: z.string().optional().describe("SharePoint folder identifier, optional."),
        readLimit: z.number().optional().describe("Number of files to ingest, optional. Defaults to 100.")
    },
    async ({ libraryId, folderId, readLimit }) => {
        const client = new Graphlit();

        try {
        const accountName = process.env.SHAREPOINT_ACCOUNT_NAME;
        if (!accountName) {
            console.error("Please set SHAREPOINT_ACCOUNT_NAME environment variable.");
            process.exit(1);
        }

        const clientId = process.env.SHAREPOINT_CLIENT_ID;
        if (!clientId) {
            console.error("Please set SHAREPOINT_CLIENT_ID environment variable.");
            process.exit(1);
        }

        const clientSecret = process.env.SHAREPOINT_CLIENT_SECRET;
        if (!clientSecret) {
            console.error("Please set SHAREPOINT_CLIENT_SECRET environment variable.");
            process.exit(1);
        }

        const refreshToken = process.env.SHAREPOINT_REFRESH_TOKEN;
        if (!refreshToken) {
            console.error("Please set SHAREPOINT_REFRESH_TOKEN environment variable.");
            process.exit(1);
        }

        const response = await client.createFeed({
            name: `SharePoint`,
            type: FeedTypes.Site,
            site: {
            type: FeedServiceTypes.SharePoint,
            sharePoint: {
                authenticationType: SharePointAuthenticationTypes.User,
                accountName: accountName,
                clientId: clientId,
                clientSecret: clientSecret,
                refreshToken: refreshToken,
                libraryId: libraryId,
                folderId: folderId
            },
            isRecursive: true,
            readLimit: readLimit || 100
            }
        });

        return {
            content: [{
            type: "text",
            text: JSON.stringify({ id: response.createFeed?.id }, null, 2)
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

    server.tool(
    "ingestOneDriveFiles",
    `Ingests files from OneDrive into Graphlit knowledge base.
    Accepts optional OneDrive folder identifier, and an optional read limit for the number of files to ingest.
    If no folder identifier provided, ingests files from root OneDrive folder.
    Requires environment variables to be configured: ONEDRIVE_CLIENT_ID, ONEDRIVE_CLIENT_SECRET, ONEDRIVE_REFRESH_TOKEN.
    Executes asynchronously, creates OneDrive feed, and returns the feed identifier.`,
    { 
        folderId: z.string().optional().describe("OneDrive folder identifier, optional."),
        readLimit: z.number().optional().describe("Number of files to ingest, optional. Defaults to 100.")
    },
    async ({ folderId, readLimit }) => {
        const client = new Graphlit();

        try {
        const clientId = process.env.ONEDRIVE_CLIENT_ID;
        if (!clientId) {
            console.error("Please set ONEDRIVE_CLIENT_ID environment variable.");
            process.exit(1);
        }

        const clientSecret = process.env.ONEDRIVE_CLIENT_SECRET;
        if (!clientSecret) {
            console.error("Please set ONEDRIVE_CLIENT_SECRET environment variable.");
            process.exit(1);
        }

        const refreshToken = process.env.ONEDRIVE_REFRESH_TOKEN;
        if (!refreshToken) {
            console.error("Please set ONEDRIVE_REFRESH_TOKEN environment variable.");
            process.exit(1);
        }

        const response = await client.createFeed({
            name: `OneDrive`,
            type: FeedTypes.Site,
            site: {
            type: FeedServiceTypes.OneDrive,
            oneDrive: {
                folderId: folderId,
                clientId: clientId,
                clientSecret: clientSecret,
                refreshToken: refreshToken,
            },
            isRecursive: true,
            readLimit: readLimit || 100
            }
        });

        return {
            content: [{
            type: "text",
            text: JSON.stringify({ id: response.createFeed?.id }, null, 2)
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

    server.tool(
    "ingestGoogleDriveFiles",
    `Ingests files from Google Drive into Graphlit knowledge base.
    Accepts optional Google Drive folder identifier, and an optional read limit for the number of files to ingest.
    For example, with Google Drive URI (https://drive.google.com/drive/u/0/folders/32tzhRD12KDh2hXABY8OZRFv7Smy8WBkQ), the folder identifier is 32tzhRD12KDh2hXABY8OZRFv7Smy8WBkQ.
    If no folder identifier provided, ingests files from root Google Drive folder.
    Requires environment variables to be configured: GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON -or- GOOGLE_DRIVE_CLIENT_ID, GOOGLE_DRIVE_CLIENT_SECRET, GOOGLE_DRIVE_REFRESH_TOKEN.
    If service account JSON is provided, uses service account authentication. Else, uses user authentication.
    Executes asynchronously, creates Google Drive feed, and returns the feed identifier.`,
    { 
        folderId: z.string().optional().describe("Google Drive folder identifier, optional."),
        readLimit: z.number().optional().describe("Number of files to ingest, optional. Defaults to 100.")
    },
    async ({ folderId, readLimit }) => {
        const client = new Graphlit();

        try {
        var clientId;
        var clientSecret;
        var refreshToken;
        var authenticationType = GoogleDriveAuthenticationTypes.ServiceAccount;

        const serviceAccountJson = process.env.GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON;

        if (!serviceAccountJson) {
            authenticationType = GoogleDriveAuthenticationTypes.User;

            clientId = process.env.GOOGLE_DRIVE_CLIENT_ID;
            if (!clientId) {
                console.error("Please set GOOGLE_DRIVE_CLIENT_ID environment variable.");
                process.exit(1);
            }

            clientSecret = process.env.GOOGLE_DRIVE_CLIENT_SECRET;
            if (!clientSecret) {
                console.error("Please set GOOGLE_DRIVE_CLIENT_SECRET environment variable.");
                process.exit(1);
            }

            refreshToken = process.env.GOOGLE_DRIVE_REFRESH_TOKEN;
            if (!refreshToken) {
                console.error("Please set GOOGLE_DRIVE_REFRESH_TOKEN environment variable.");
                process.exit(1);
            }
        }

        const response = await client.createFeed({
            name: `Google Drive`,
            type: FeedTypes.Site,
            site: {
                type: FeedServiceTypes.GoogleDrive,
                googleDrive: {
                    authenticationType: authenticationType,
                    folderId: folderId,
                    clientId: clientId,
                    clientSecret: clientSecret,
                    refreshToken: refreshToken,
                    serviceAccountJson: serviceAccountJson,
                },
                isRecursive: true,
                readLimit: readLimit || 100
            }
        });

        return {
            content: [{
            type: "text",
            text: JSON.stringify({ id: response.createFeed?.id }, null, 2)
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

    server.tool(
    "ingestDropboxFiles",
    `Ingests files from Dropbox into Graphlit knowledge base.
    Accepts optional relative path to Dropbox folder (i.e. /Pictures), and an optional read limit for the number of files to ingest.
    If no path provided, ingests files from root Dropbox folder.
    Requires environment variables to be configured: DROPBOX_APP_KEY, DROPBOX_APP_SECRET, DROPBOX_REDIRECT_URI, DROPBOX_REFRESH_TOKEN.
    Executes asynchronously, creates Dropbox feed, and returns the feed identifier.`,
    { 
        path: z.string().optional().describe("Relative path to Dropbox folder, optional."),
        readLimit: z.number().optional().describe("Number of files to ingest, optional. Defaults to 100.")
    },
    async ({ path, readLimit }) => {
        const client = new Graphlit();

        try {
        const appKey = process.env.DROPBOX_APP_KEY;
        if (!appKey) {
            console.error("Please set DROPBOX_APP_KEY environment variable.");
            process.exit(1);
        }

        const appSecret = process.env.DROPBOX_APP_SECRET;
        if (!appSecret) {
            console.error("Please set DROPBOX_APP_SECRET environment variable.");
            process.exit(1);
        }

        const redirectUri = process.env.DROPBOX_REDIRECT_URI;
        if (!redirectUri) {
            console.error("Please set DROPBOX_REDIRECT_URI environment variable.");
            process.exit(1);
        }

        const refreshToken = process.env.DROPBOX_REFRESH_TOKEN;
        if (!refreshToken) {
            console.error("Please set DROPBOX_REFRESH_TOKEN environment variable.");
            process.exit(1);
        }

        const response = await client.createFeed({
            name: `Dropbox`,
            type: FeedTypes.Site,
            site: {
            type: FeedServiceTypes.Dropbox,
            dropbox: {
                path: path,
                appKey: appKey,
                appSecret: appSecret,
                redirectUri: redirectUri,
                refreshToken: refreshToken,
            },
            isRecursive: true,
            readLimit: readLimit || 100
            }
        });

        return {
            content: [{
            type: "text",
            text: JSON.stringify({ id: response.createFeed?.id }, null, 2)
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

    server.tool(
    "ingestBoxFiles",
    `Ingests files from Box into Graphlit knowledge base.
    Accepts optional Box folder identifier, and an optional read limit for the number of files to ingest.
    If no folder identifier provided, ingests files from root Box folder (i.e. "0").
    Folder identifier can be inferred from Box URL. https://app.box.com/folder/123456 -> folder identifier is "123456".
    Requires environment variables to be configured: BOX_CLIENT_ID, BOX_CLIENT_SECRET, BOX_REDIRECT_URI, BOX_REFRESH_TOKEN.
    Executes asynchronously, creates Box feed, and returns the feed identifier.`,
    { 
        folderId: z.string().optional().default("0").describe("Box folder identifier, optional. Defaults to root folder."),
        readLimit: z.number().optional().describe("Number of files to ingest, optional. Defaults to 100.")
    },
    async ({ folderId, readLimit }) => {
        const client = new Graphlit();

        try {
        const clientId = process.env.BOX_CLIENT_ID;
        if (!clientId) {
            console.error("Please set BOX_CLIENT_ID environment variable.");
            process.exit(1);
        }

        const clientSecret = process.env.BOX_CLIENT_SECRET;
        if (!clientSecret) {
            console.error("Please set BOX_CLIENT_SECRET environment variable.");
            process.exit(1);
        }

        const redirectUri = process.env.BOX_REDIRECT_URI;
        if (!redirectUri) {
            console.error("Please set BOX_REDIRECT_URI environment variable.");
            process.exit(1);
        }

        const refreshToken = process.env.BOX_REFRESH_TOKEN;
        if (!refreshToken) {
            console.error("Please set BOX_REFRESH_TOKEN environment variable.");
            process.exit(1);
        }

        const response = await client.createFeed({
            name: `Box`,
            type: FeedTypes.Site,
            site: {
            type: FeedServiceTypes.Box,
            box: {
                folderId: folderId,
                clientId: clientId,
                clientSecret: clientSecret,
                redirectUri: redirectUri,
                refreshToken: refreshToken,
            },
            isRecursive: true,
            readLimit: readLimit || 100
            }
        });

        return {
            content: [{
            type: "text",
            text: JSON.stringify({ id: response.createFeed?.id }, null, 2)
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

    server.tool(
    "ingestGitHubFiles",
    `Ingests files from GitHub repository into Graphlit knowledge base.
    Accepts GitHub repository owner and repository name and an optional read limit for the number of files to ingest.
    For example, for GitHub repository (https://github.com/openai/tiktoken), 'openai' is the repository owner, and 'tiktoken' is the repository name.
    Requires environment variable to be configured: GITHUB_PERSONAL_ACCESS_TOKEN.
    Executes asynchronously, creates GitHub feed, and returns the feed identifier.`,
    { 
        repositoryName: z.string().describe("GitHub repository name."),
        repositoryOwner: z.string().describe("GitHub repository owner."),
        readLimit: z.number().optional().describe("Number of files to ingest, optional. Defaults to 100.")
    },
    async ({ repositoryOwner, repositoryName, readLimit }) => {
        const client = new Graphlit();

        try {
        const personalAccessToken = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;
        if (!personalAccessToken) {
            console.error("Please set GITHUB_PERSONAL_ACCESS_TOKEN environment variable.");
            process.exit(1);
        }

        const response = await client.createFeed({
            name: `GitHub`,
            type: FeedTypes.Site,
            site: {
            type: FeedServiceTypes.GitHub,
            github: {
                repositoryOwner: repositoryOwner,
                repositoryName: repositoryName,
                personalAccessToken: personalAccessToken
            },
            isRecursive: true,
            readLimit: readLimit || 100
            }
        });

        return {
            content: [{
            type: "text",
            text: JSON.stringify({ id: response.createFeed?.id }, null, 2)
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

    server.tool(
    "ingestNotionPages",
    `Ingests pages from Notion database into Graphlit knowledge base.
    Accepts Notion database identifier and an optional read limit for the number of pages to ingest.
    You can list the available Notion database identifiers with listNotionDatabases.
    Or, for a Notion URL, https://www.notion.so/Example/Engineering-Wiki-114abc10cb38487e91ec906fc6c6f350, 'Engineering-Wiki-114abc10cb38487e91ec906fc6c6f350' is an example of a Notion database identifier.
    Requires environment variable to be configured: NOTION_API_KEY.
    Executes asynchronously, creates Notion feed, and returns the feed identifier.`,
    { 
        databaseId: z.string().describe("Notion database identifier."),
        readLimit: z.number().optional().describe("Number of pages to ingest, optional. Defaults to 100.")
    },
    async ({ databaseId, readLimit }) => {
        const client = new Graphlit();

        try {
        const token = process.env.NOTION_API_KEY;
        if (!token) {
            console.error("Please set NOTION_API_KEY environment variable.");
            process.exit(1);
        }

        const response = await client.createFeed({
            name: `Notion`,
            type: FeedTypes.Notion,
            notion: {
            type: NotionTypes.Database,
            identifiers: [databaseId],
            token: token,
            readLimit: readLimit || 100
            }
        });

        return {
            content: [{
            type: "text",
            text: JSON.stringify({ id: response.createFeed?.id }, null, 2)
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

    server.tool(
    "ingestMicrosoftTeamsMessages",
    `Ingests messages from Microsoft Teams channel into Graphlit knowledge base.
    Accepts Microsoft Teams team identifier and channel identifier, and an optional read limit for the number of messages to ingest.
    Requires environment variables to be configured: MICROSOFT_TEAMS_CLIENT_ID, MICROSOFT_TEAMS_CLIENT_SECRET, MICROSOFT_TEAMS_REFRESH_TOKEN.
    Executes asynchronously, creates Microsoft Teams feed, and returns the feed identifier.`,
    { 
        teamId: z.string().describe("Microsoft Teams team identifier."),
        channelId: z.string().describe("Microsoft Teams channel identifier."),
        readLimit: z.number().optional().describe("Number of messages to ingest, optional. Defaults to 100.")
    },
    async ({ teamId, channelId, readLimit }) => {
        const client = new Graphlit();

        try {
        const clientId = process.env.MICROSOFT_TEAMS_CLIENT_ID;
        if (!clientId) {
            console.error("Please set MICROSOFT_TEAMS_CLIENT_ID environment variable.");
            process.exit(1);
        }

        const clientSecret = process.env.MICROSOFT_TEAMS_CLIENT_SECRET;
        if (!clientSecret) {
            console.error("Please set MICROSOFT_TEAMS_CLIENT_SECRET environment variable.");
            process.exit(1);
        }

        const refreshToken = process.env.MICROSOFT_TEAMS_REFRESH_TOKEN;
        if (!refreshToken) {
            console.error("Please set MICROSOFT_TEAMS_REFRESH_TOKEN environment variable.");
            process.exit(1);
        }

        const response = await client.createFeed({
            name: `Microsoft Teams [${teamId}/${channelId}]`,
            type: FeedTypes.MicrosoftTeams,
            microsoftTeams: {
            type: FeedListingTypes.Past,
            clientId: clientId,
            clientSecret: clientSecret,
            refreshToken: refreshToken,
            channelId: channelId,
            teamId: teamId,
            readLimit: readLimit || 100
            }
        });

        return {
            content: [{
            type: "text",
            text: JSON.stringify({ id: response.createFeed?.id }, null, 2)
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

    server.tool(
    "ingestSlackMessages",
    `Ingests messages from Slack channel into Graphlit knowledge base.
    Accepts Slack channel name and an optional read limit for the number of messages to ingest.
    Requires environment variable to be configured: SLACK_BOT_TOKEN.
    Executes asynchronously, creates Slack feed, and returns the feed identifier.`,
    { 
        channelName: z.string().describe("Slack channel name."),
        readLimit: z.number().optional().describe("Number of messages to ingest, optional. Defaults to 100.")
    },
    async ({ channelName, readLimit }) => {
        const client = new Graphlit();

        try {
        const botToken = process.env.SLACK_BOT_TOKEN;
        if (!botToken) {
            console.error("Please set SLACK_BOT_TOKEN environment variable.");
            process.exit(1);
        }

        const response = await client.createFeed({
            name: `Slack [${channelName}]`,
            type: FeedTypes.Slack,
            slack: {
            type: FeedListingTypes.Past,
            channel: channelName,
            token: botToken,
            includeAttachments: true,
            readLimit: readLimit || 100
            }
        });

        return {
            content: [{
            type: "text",
            text: JSON.stringify({ id: response.createFeed?.id }, null, 2)
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

    server.tool(
    "ingestDiscordMessages",
    `Ingests messages from Discord channel into Graphlit knowledge base.
    Accepts Discord channel name and an optional read limit for the number of messages to ingest.
    Requires environment variable to be configured: DISCORD_BOT_TOKEN.
    Executes asynchronously, creates Discord feed, and returns the feed identifier.`,
    { 
        channelName: z.string().describe("Discord channel name."),
        readLimit: z.number().optional().describe("Number of messages to ingest, optional. Defaults to 100.")
    },
    async ({ channelName, readLimit }) => {
        const client = new Graphlit();

        try {
        const botToken = process.env.DISCORD_BOT_TOKEN;
        if (!botToken) {
            console.error("Please set DISCORD_BOT_TOKEN environment variable.");
            process.exit(1);
        }

        const response = await client.createFeed({
            name: `Discord [${channelName}]`,
            type: FeedTypes.Discord,
            discord: {
            type: FeedListingTypes.Past,
            channel: channelName,
            token: botToken,
            includeAttachments: true,
            readLimit: readLimit || 100
            }
        });

        return {
            content: [{
            type: "text",
            text: JSON.stringify({ id: response.createFeed?.id }, null, 2)
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

    server.tool(
    "ingestTwitterPosts",
    `Ingests posts by user from Twitter/X into Graphlit knowledge base.
    Accepts Twitter/X user name, without the leading @ symbol, and an optional read limit for the number of posts to ingest.
    Requires environment variable to be configured: TWITTER_TOKEN.
    Executes asynchronously, creates Twitter feed, and returns the feed identifier.`,
    { 
        userName: z.string().describe("Twitter/X user name, without the leading @ symbol, i.e. 'graphlit'."),
        readLimit: z.number().optional().describe("Number of posts to ingest, optional. Defaults to 100.")
    },
    async ({ userName, readLimit }) => {
        const client = new Graphlit();

        try {
        const token = process.env.TWITTER_TOKEN;
        if (!token) {
            console.error("Please set TWITTER_TOKEN environment variable.");
            process.exit(1);
        }

        const response = await client.createFeed({
            name: `Twitter [${userName}]`,
            type: FeedTypes.Twitter,
            twitter: {
                type: TwitterListingTypes.Posts,
                userName: userName,
                token: token,
                includeAttachments: true,
                readLimit: readLimit || 100
            }
        });

        return {
            content: [{
            type: "text",
            text: JSON.stringify({ id: response.createFeed?.id }, null, 2)
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

    server.tool(
    "ingestTwitterSearch",
    `Searches for recent posts from Twitter/X, and ingests them into Graphlit knowledge base.
    Accepts search query, and an optional read limit for the number of posts to ingest.
    Requires environment variable to be configured: TWITTER_TOKEN.
    Executes asynchronously, creates Twitter feed, and returns the feed identifier.`,
    { 
        query: z.string().describe("Search query"),
        readLimit: z.number().optional().describe("Number of posts to ingest, optional. Defaults to 100.")
    },
    async ({ query, readLimit }) => {
        const client = new Graphlit();

        try {
        const token = process.env.TWITTER_TOKEN;
        if (!token) {
            console.error("Please set TWITTER_TOKEN environment variable.");
            process.exit(1);
        }

        const response = await client.createFeed({
            name: `Twitter [${query}]`,
            type: FeedTypes.Twitter,
            twitter: {
                type: TwitterListingTypes.RecentSearch,
                query: query,
                token: token,
                includeAttachments: true,
                readLimit: readLimit || 100
            }
        });

        return {
            content: [{
            type: "text",
            text: JSON.stringify({ id: response.createFeed?.id }, null, 2)
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

    server.tool(
    "ingestRedditPosts",
    `Ingests posts from Reddit subreddit into Graphlit knowledge base.
    Accepts a subreddit name and an optional read limit for the number of posts to ingest.
    Executes asynchronously, creates Reddit feed, and returns the feed identifier.`,
    { 
        subredditName: z.string().describe("Subreddit name."),
        readLimit: z.number().optional().describe("Number of posts to ingest, optional. Defaults to 100.")
    },
    async ({ subredditName, readLimit }) => {
        const client = new Graphlit();

        try {
        const response = await client.createFeed({
            name: `Reddit [${subredditName}]`,
            type: FeedTypes.Reddit,
            reddit: {
            subredditName: subredditName,
            readLimit: readLimit || 100
            }
        });

        return {
            content: [{
            type: "text",
            text: JSON.stringify({ id: response.createFeed?.id }, null, 2)
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

    server.tool(
    "ingestGoogleEmail",
    `Ingests emails from Google Email account into Graphlit knowledge base.
    Accepts an optional read limit for the number of emails to ingest.
    Requires environment variables to be configured: GOOGLE_EMAIL_CLIENT_ID, GOOGLE_EMAIL_CLIENT_SECRET, GOOGLE_EMAIL_REFRESH_TOKEN.
    Executes asynchronously, creates Google Email feed, and returns the feed identifier.`,
    { 
        readLimit: z.number().optional().describe("Number of emails to ingest, optional. Defaults to 100.")
    },
    async ({ readLimit }) => {
        const client = new Graphlit();

        try {
        const clientId = process.env.GOOGLE_EMAIL_CLIENT_ID;
        if (!clientId) {
            console.error("Please set GOOGLE_EMAIL_CLIENT_ID environment variable.");
            process.exit(1);
        }

        const clientSecret = process.env.GOOGLE_EMAIL_CLIENT_SECRET;
        if (!clientSecret) {
            console.error("Please set GOOGLE_EMAIL_CLIENT_SECRET environment variable.");
            process.exit(1);
        }

        const refreshToken = process.env.GOOGLE_EMAIL_REFRESH_TOKEN;
        if (!refreshToken) {
            console.error("Please set GOOGLE_EMAIL_REFRESH_TOKEN environment variable.");
            process.exit(1);
        }

        const response = await client.createFeed({
            name: `Google Email`,
            type: FeedTypes.Email,
            email: {
            type: FeedServiceTypes.GoogleEmail,
            google: {
                type: EmailListingTypes.Past,
                refreshToken: refreshToken,
                clientId: clientId,
                clientSecret: clientSecret,
            },
            includeAttachments: true,
            readLimit: readLimit || 100
            }
        });

        return {
            content: [{
            type: "text",
            text: JSON.stringify({ id: response.createFeed?.id }, null, 2)
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

    server.tool(
    "ingestMicrosoftEmail",
    `Ingests emails from Microsoft Email account into Graphlit knowledge base.
    Accepts an optional read limit for the number of emails to ingest.
    Requires environment variables to be configured: MICROSOFT_EMAIL_CLIENT_ID, MICROSOFT_EMAIL_CLIENT_SECRET, MICROSOFT_EMAIL_REFRESH_TOKEN.
    Executes asynchronously, creates Microsoft Email feed, and returns the feed identifier.`,
    { 
        readLimit: z.number().optional().describe("Number of emails to ingest, optional. Defaults to 100.")
    },
    async ({ readLimit }) => {
        const client = new Graphlit();

        try {
        const clientId = process.env.MICROSOFT_EMAIL_CLIENT_ID;
        if (!clientId) {
            console.error("Please set MICROSOFT_EMAIL_CLIENT_ID environment variable.");
            process.exit(1);
        }

        const clientSecret = process.env.MICROSOFT_EMAIL_CLIENT_SECRET;
        if (!clientSecret) {
            console.error("Please set MICROSOFT_EMAIL_CLIENT_SECRET environment variable.");
            process.exit(1);
        }

        const refreshToken = process.env.MICROSOFT_EMAIL_REFRESH_TOKEN;
        if (!refreshToken) {
            console.error("Please set MICROSOFT_EMAIL_REFRESH_TOKEN environment variable.");
            process.exit(1);
        }

        const response = await client.createFeed({
            name: `Microsoft Email`,
            type: FeedTypes.Email,
            email: {
            type: FeedServiceTypes.MicrosoftEmail,
            microsoft: {
                type: EmailListingTypes.Past,
                refreshToken: refreshToken,
                clientId: clientId,
                clientSecret: clientSecret,
            },
            includeAttachments: true,
            readLimit: readLimit || 100
            }
        });

        return {
            content: [{
            type: "text",
            text: JSON.stringify({ id: response.createFeed?.id }, null, 2)
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

    server.tool(
    "ingestLinearIssues",
    `Ingests issues from Linear project into Graphlit knowledge base.
    Accepts Linear project name and an optional read limit for the number of issues to ingest.
    Requires environment variable to be configured: LINEAR_API_KEY.
    Executes asynchronously, creates Linear issue feed, and returns the feed identifier.`,
    { 
        projectName: z.string().describe("Linear project name."),
        readLimit: z.number().optional().describe("Number of issues to ingest, optional. Defaults to 100.")
    },
    async ({ projectName, readLimit }) => {
        const client = new Graphlit();

        try {
        const apiKey = process.env.LINEAR_API_KEY;
        if (!apiKey) {
            console.error("Please set LINEAR_API_KEY environment variable.");
            process.exit(1);
        }

        const response = await client.createFeed({
            name: `Linear [${projectName}]`,
            type: FeedTypes.Issue,
            issue: {
            type: FeedServiceTypes.Linear,
            linear: {
                project: projectName,
                key: apiKey
            },
            includeAttachments: true,
            readLimit: readLimit || 100
            }
        });

        return {
            content: [{
            type: "text",
            text: JSON.stringify({ id: response.createFeed?.id }, null, 2)
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

    server.tool(
    "ingestGitHubIssues",
    `Ingests issues from GitHub repository into Graphlit knowledge base.
    Accepts GitHub repository owner and repository name and an optional read limit for the number of issues to ingest.
    For example, for GitHub repository (https://github.com/openai/tiktoken), 'openai' is the repository owner, and 'tiktoken' is the repository name.
    Requires environment variable to be configured: GITHUB_PERSONAL_ACCESS_TOKEN.
    Executes asynchronously, creates GitHub issue feed, and returns the feed identifier.`,
    { 
        repositoryName: z.string().describe("GitHub repository name."),
        repositoryOwner: z.string().describe("GitHub repository owner."),
        readLimit: z.number().optional().describe("Number of issues to ingest, optional. Defaults to 100.")
    },
    async ({ repositoryName, repositoryOwner, readLimit }) => {
        const client = new Graphlit();

        try {
        const personalAccessToken = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;
        if (!personalAccessToken) {
            console.error("Please set GITHUB_PERSONAL_ACCESS_TOKEN environment variable.");
            process.exit(1);
        }

        const response = await client.createFeed({
            name: `GitHub [${repositoryOwner}/${repositoryName}]`,
            type: FeedTypes.Issue,
            issue: {
            type: FeedServiceTypes.GitHubIssues,
            github: {
                repositoryName: repositoryName,
                repositoryOwner: repositoryOwner,
                personalAccessToken: personalAccessToken
            },
            includeAttachments: true,
            readLimit: readLimit || 100
            }
        });

        return {
            content: [{
            type: "text",
            text: JSON.stringify({ id: response.createFeed?.id }, null, 2)
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

    server.tool(
    "ingestJiraIssues",
    `Ingests issues from Atlassian Jira repository into Graphlit knowledge base.
    Accepts Atlassian Jira server URL and project name, and an optional read limit for the number of issues to ingest.
    Requires environment variables to be configured: JIRA_EMAIL, JIRA_TOKEN.
    Executes asynchronously, creates Atlassian Jira issue feed, and returns the feed identifier.`,
    { 
        url: z.string().describe("Atlassian Jira server URL."),
        projectName: z.string().describe("Atlassian Jira project name."),
        readLimit: z.number().optional().describe("Number of issues to ingest, optional. Defaults to 100.")
    },
    async ({ url, projectName, readLimit }) => {
        const client = new Graphlit();

        try {
        const email = process.env.JIRA_EMAIL;
        if (!email) {
            console.error("Please set JIRA_EMAIL environment variable.");
            process.exit(1);
        }

        const token = process.env.JIRA_TOKEN;
        if (!token) {
            console.error("Please set JIRA_TOKEN environment variable.");
            process.exit(1);
        }

        const response = await client.createFeed({
            name: `Jira [${projectName}]`,
            type: FeedTypes.Issue,
            issue: {
            type: FeedServiceTypes.AtlassianJira,
            jira: {
                uri: url,
                project: projectName,
                email: email,
                token: token,
            },
            includeAttachments: true,
            readLimit: readLimit || 100
            }
        });

        return {
            content: [{
            type: "text",
            text: JSON.stringify({ id: response.createFeed?.id }, null, 2)
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

    server.tool(
    "webCrawl",
    `Crawls web pages from web site into Graphlit knowledge base.
    Accepts a URL and an optional read limit for the number of pages to crawl.
    Uses sitemap.xml to discover pages to be crawled from website.
    Executes asynchronously and returns the feed identifier.`,
    { 
        url: z.string().describe("Web site URL."),
        readLimit: z.number().optional().describe("Number of web pages to ingest, optional. Defaults to 100.")
    },
    async ({ url, readLimit }) => {
        const client = new Graphlit();

        try {
        const response = await client.createFeed({
            name: `Web [${url}]`,
            type: FeedTypes.Web,
            web: {
            uri: url,
            readLimit: readLimit || 100
            }
        });

        return {
            content: [{
            type: "text",
            text: JSON.stringify({ id: response.createFeed?.id }, null, 2)
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

    server.tool(
    "webMap",
    `Enumerates the web pages at or beneath the provided URL using web sitemap. 
    Does *not* ingest web pages into Graphlit knowledge base.
    Accepts web site URL as string.
    Returns list of mapped URIs from web site.`,
    { 
        url: z.string().describe("Web site URL.")
    },
    async ({ url }) => {
        const client = new Graphlit();

        try {
        const response = await client.mapWeb(url);

        return {
            content: [{
            type: "text",
            text: JSON.stringify(response.mapWeb?.results, null, 2)
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

    server.tool(
    "webSearch",
    `Performs web or podcast search based on search query. Can search for web pages or anything about podcasts (i.e. episodes, topics, guest appearances). 
    Format the search query as what would be entered into a Google search. You can use site filtering in the search query, like 'site:twitter.com'.    
    Accepts search query as string, and optional search service type.    
    Prefer calling this tool over using 'curl' directly for any web search.
    Use 'PODSCAN' search service type to search podcasts.
    Does *not* ingest pages or podcast episodes into Graphlit knowledge base.  
    When searching podcasts, *don't* include the term 'podcast' or 'episode' in the search query - that would be redundant.
    Search service types: Tavily (web pages), Exa (web pages) and Podscan (podcasts). Defaults to Exa.
    Returns URL, title and relevant Markdown text from resulting web pages or podcast episode descriptions.`,
    { 
        query: z.string().describe("Search query."),
        searchService: z.nativeEnum(SearchServiceTypes).optional().default(SearchServiceTypes.Exa).describe("Search service type (Tavily, Exa, Podscan). Defaults to Exa."),
        limit: z.number().optional().default(10).describe("Limit the number of search hits to be returned. Defaults to 10.")
    },
    async ({ query, searchService, limit }) => {
        const client = new Graphlit();

        try {
        const response = await client.searchWeb(query, searchService, limit);

        return {
            content: [{
            type: "text",
            text: JSON.stringify(response.searchWeb?.results, null, 2)
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

    server.tool(
    "ingestRSS",
    `Ingests posts from RSS feed into Graphlit knowledge base.
    For podcast RSS feeds, audio will be downloaded, transcribed and ingested into Graphlit knowledge base.
    Accepts RSS URL and an optional read limit for the number of posts to read.
    Executes asynchronously and returns the feed identifier.`,
    { 
        url: z.string().describe("RSS URL."),
        readLimit: z.number().optional().describe("Number of issues to posts, optional. Defaults to 25.")
    },
    async ({ url, readLimit }) => {
        const client = new Graphlit();

        try {
        const response = await client.createFeed({
            name: `RSS [${url}]`,
            type: FeedTypes.Rss,
            rss: {
            uri: url,
            readLimit: readLimit || 25
            }
        });

        return {
            content: [{
            type: "text",
            text: JSON.stringify({ id: response.createFeed?.id }, null, 2)
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

    server.tool(
    "ingestUrl",
    `Ingests content from URL into Graphlit knowledge base.
    Can scrape a single web page, and can ingest individual Word documents, PDFs, audio recordings, videos, images, or any other unstructured data.
    Do *not* use for crawling a web site, which is done with 'webCrawl' tool.
    Executes asynchronously and returns the content identifier.`,
    { 
        url: z.string().describe("URL to ingest content from.")
    },
    async ({ url }) => {
        const client = new Graphlit();

        try {
        const response = await client.ingestUri(url);

        return {
            content: [{
            type: "text",
            text: JSON.stringify({ id: response.ingestUri?.id }, null, 2)
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

    server.tool(
    "ingestText",
    `Ingests text as content into Graphlit knowledge base.
    Accepts the text itself, and an optional text type (Plain, Markdown, Html). Defaults to Markdown text type.
    Optionally accepts the content name and an identifier for an existing content object. Will overwrite existing content, if provided.
    Can use for storing the output from LLM or other tools as content resources, which can be later searched or retrieved.
    Executes *synchronously* and returns the content identifier.`,
    { 
        name: z.string().optional().describe("Name for the content object, optional."),
        text: z.string().describe("Text content to ingest."),
        textType: z.nativeEnum(TextTypes).optional().default(TextTypes.Markdown).describe("Text type (Plain, Markdown, Html). Defaults to Markdown."),
        id: z.string().optional().describe("Optional content identifier. Will overwrite existing content, if provided.")
    },
    async ({ name, text, textType, id }) => {
        const client = new Graphlit();

        try {
        const response = await client.ingestText(text, name, textType, undefined, id, true);

        return {
            content: [{
            type: "text",
            text: JSON.stringify({ id: response.ingestText?.id }, null, 2)
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

    server.tool(
    "ingestMemory",
    `Ingests short-term textual memory as content into Graphlit knowledge base.
    Accepts an optional text type (Plain, Markdown, Html). Defaults to Markdown text type. Optionally accepts the content name.
    Will automatically be entity extracted into a knowledge graph.
    Use for storing short-term memories about the user or agent, which can be later searched or retrieved. Memories are transient and will be deleted after a period of time.
    Can use 'queryContents' or 'retrieveSources' tools to search for memories, by specifying the 'MEMORY' content type.
    Executes asynchronously and returns the content identifier.`,
    { 
        name: z.string().optional().describe("Name for the content object."),
        text: z.string().describe("Textual memory to ingest, i.e. 'Kirk likes raccoons' or 'Graphlit is based in Seattle'"),
        textType: z.nativeEnum(TextTypes).optional().default(TextTypes.Markdown).describe("Text type (Plain, Markdown, Html). Defaults to Markdown."),
        timeToLive: z.string().optional().describe("Time to live for ingested memory. Should be ISO 8601 format, for example, 'PT1H' for one hour, 'P1D' for one day, 'P7D' for one week, 'P30D' for one month. Doesn't support weeks or months explicitly."),
    },
    async ({ name, text, textType, timeToLive }) => {
        const client = new Graphlit();

        try {
        // TODO: need to add TTL parameter when available
        const response = await client.ingestMemory(text, name, textType);

        return {
            content: [{
            type: "text",
            text: JSON.stringify({ id: response.ingestMemory?.id }, null, 2)
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

    server.tool(
    "ingestFile",
    `Ingests local file into Graphlit knowledge base.
    Accepts the path to the file in the local filesystem.
    Can use for storing *large* long-term textual memories or the output from LLM or other tools as content resources, which can be later searched or retrieved.
    Executes asynchronously and returns the content identifier.`,
    { 
        filePath: z.string().describe("Path to the file in the local filesystem.")
    },
    async ({ filePath }) => {
        const client = new Graphlit();

        try {
        const fileName = path.basename(filePath);
        const mimeType = mime.lookup(fileName) || 'application/octet-stream';
        
        const fileData = fs.readFileSync(filePath);
        const base64Data = fileData.toString('base64');

        const response = await client.ingestEncodedFile(fileName, base64Data, mimeType);

        return {
            content: [{
            type: "text",
            text: JSON.stringify({ id: response.ingestEncodedFile?.id }, null, 2)
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

    server.tool(
    "screenshotPage",
    `Screenshots web page from URL.
    Executes *synchronously* and returns the content identifier.`,
    { 
        url: z.string().describe("Web page URL.")
    },
    async ({ url }) => {
        const client = new Graphlit();

        try {
        const response = await client.screenshotPage(url, undefined, true);
       
        return {
            content: [
            {
                type: "text",
                text: JSON.stringify({ id: response.screenshotPage?.id }, null, 2)
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

    server.tool(
    "describeImageUrl",
    `Prompts vision LLM and returns completion. 
    Does *not* ingest image into Graphlit knowledge base.
    Accepts image URL as string.
    Returns Markdown text from LLM completion.`,
    { 
        prompt: z.string().describe("Prompt for image description."),
        url: z.string().describe("Image URL.")
    },
    async ({ prompt, url }) => {
        const client = new Graphlit();

        try {
        const response = await client.describeImage(prompt, url);

        return {
            content: [{
            type: "text",
            text: JSON.stringify({ message: response.describeImage?.message }, null, 2)
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

    server.tool(
    "describeImageContent",
    `Prompts vision LLM and returns description of image content. 
    Accepts content identifier as string, and optional prompt for image description.
    Returns Markdown text from LLM completion.`,
    { 
        id: z.string().describe("Content identifier."),
        prompt: z.string().optional().describe("Prompt for image description, optional."),
    },
    async ({ prompt, id }) => {
        const client = new Graphlit();

        const DEFAULT_PROMPT = `
        Conduct a thorough analysis of the screenshot, with a particular emphasis on the textual content and any included imagery. 
        Provide a detailed examination of the text, highlighting key points and dissecting technical terms, named entities, and data presentations that contribute to the understanding of the subject matter. 
        Discuss how the technical language and the named entities relate to the overarching topic and objectives of the webpage. 
        Also, describe how the visual elements, such as color schemes, imagery, and branding elements like logos and taglines, support the textual message and enhance the viewer's comprehension of the content. 
        Assess the readability and organization of the content, and evaluate how these aspects facilitate the visitor's navigation and learning experience. Refrain from delving into the specifics of the user interface design but focus on the communication effectiveness and coherence of visual and textual elements. 
        Finally, offer a comprehensive view of the website's ability to convey its message and fulfill its intended commercial, educational, or promotional role, considering the target audience's perspective and potential engagement with the content.

        Carefully examine the image for any text it contains and extract as Markdown text. 
        In cases where the image contains no extractable text or only text that is not useful for understanding, don't extract any text. 
        Focus on including text that contributes significantly to understanding the image, such as titles, headings, key phrases, important data points, or labels. 
        Exclude any text that is not relevant or does not add value to the comprehension of the image. 
        Ensure to transcribe the text completely, without truncating with ellipses.
        `;

        try {
        const cresponse = await client.getContent(id);
        const content = cresponse.content;

        if (content?.imageUri != null)
        {
            const response = await client.describeImage(prompt || DEFAULT_PROMPT, content.imageUri);

            return {
            content: [{
                type: "text",
                text: JSON.stringify({ message: response.describeImage?.message }, null, 2)
            }]
            };
        }
        else {
            return {
            content: [{
                type: "text",
                text: JSON.stringify({ }, null, 2)
            }]
            };
        }
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

    server.tool(
    "publishAudio",
    `Publishes text as audio format, and ingests into Graphlit knowledge base.
    Accepts a name for the content object, the text itself, and an optional text type (Plain, Markdown, Html). Defaults to Markdown text type.
    Optionally accepts an ElevenLabs voice identifier.
    You *must* retrieve the content resource to get the downloadable audio URL for this published audio.
    Executes *synchronously* and returns the content identifiers.`,
    { 
        name: z.string().describe("Name for the content object."),
        text: z.string().describe("Text content to publish."),
        textType: z.nativeEnum(TextTypes).optional().default(TextTypes.Markdown).describe("Text type (Plain, Markdown, Html). Defaults to Markdown."),
        voice: z.string().optional().default("HqW11As4VRPkApNPkAZp").describe("ElevenLabs voice identifier, optional."),
    },
    async ({ name, text, textType, voice }) => {
        const client = new Graphlit();

        const type = ContentPublishingServiceTypes.ElevenLabsAudio;
        const format = ContentPublishingFormats.Mp3;
        const model = ElevenLabsModels.FlashV2_5;

        try {
        const response = await client.publishText(text, textType, { type: type, format: format, elevenLabs: { model: model, voice: voice } }, name, undefined, true);

        const contents = response.publishText?.contents?.map(content => content ? ({ id: content.id }) : null).filter(Boolean);

        return {
            content: [{
            type: "text",
            text: JSON.stringify(contents, null, 2)
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

    server.tool(
    "publishImage",
    `Publishes text as image format, and ingests into Graphlit knowledge base.
    Accepts a name for the content object.
    Also, accepts a prompt for image generation. For example, 'Create a cartoon image of a raccoon, saying "I Love Graphlit"'.
    You *must* retrieve the content resource to get the downloadable image URL for this published image.
    Executes *synchronously* and returns the content identifiers.`,
    { 
        name: z.string().describe("Name for the content object."),
        prompt: z.string().describe("Prompt for image generation."),
        count: z.number().optional().default(1).describe("Number of images to generate, optional. Defaults to 1."),
    },
    async ({ name, prompt, count }) => {
        const client = new Graphlit();

        const type = ContentPublishingServiceTypes.OpenAiImage;
        const format = ContentPublishingFormats.Png;
        const model = OpenAiImageModels.GptImage_1;

        try {
        const response = await client.publishText(prompt, TextTypes.Markdown, { type: type, format: format, openAIImage: { model: model, count: count } }, name, undefined, true);

        const contents = response.publishText?.contents?.map(content => content ? ({ id: content.id }) : null).filter(Boolean);

        return {
            content: [{
            type: "text",
            text: JSON.stringify(contents, null, 2)
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
    
    server.tool(
    "sendWebHookNotification",
    `Sends a webhook notification to the provided URL.
    Accepts the webhook URL.
    Also accepts the text to be sent with the webhook, and an optional text type (Plain, Markdown, Html). Defaults to Markdown text type.
    Returns true if the notification was successfully sent, or false otherwise.`,
    { 
        url: z.string().describe("Webhook URL."),
        text: z.string().describe("Text to send."),
        textType: z.nativeEnum(TextTypes).optional().default(TextTypes.Markdown).describe("Text type (Plain, Markdown, Html). Defaults to Markdown."),
    },
    async ({ text, textType, url }) => {
        const client = new Graphlit();

        try {
        const response = await client.sendNotification({ type: IntegrationServiceTypes.WebHook, uri: url }, text, textType);

        return {
            content: [{
            type: "text",
            text: JSON.stringify({ success: response.sendNotification?.result }, null, 2)
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

    server.tool(
    "sendSlackNotification",
    `Sends a Slack notification to the provided Slack channel.
    Accepts the Slack channel name.
    Also accepts the text for the Slack message, and an optional text type (Plain, Markdown, Html). Defaults to Markdown text type.
    Hint: In Slack Markdown, images are displayed by simply putting the URL in angle brackets like <https://example.com/image.jpg> instead of using the traditional Markdown image syntax ![alt text](url). 
    Requires environment variable to be configured: SLACK_BOT_TOKEN.
    Returns true if the notification was successfully sent, or false otherwise.`,
    { 
        channelName: z.string().describe("Slack channel name."),
        text: z.string().describe("Text to send."),
        textType: z.nativeEnum(TextTypes).optional().default(TextTypes.Markdown).describe("Text type (Plain, Markdown, Html). Defaults to Markdown."),
    },
    async ({ text, textType, channelName }) => {
        const botToken = process.env.SLACK_BOT_TOKEN;
        if (!botToken) {
            console.error("Please set SLACK_BOT_TOKEN environment variable.");
            process.exit(1);
        }

        const client = new Graphlit();

        try {
        const response = await client.sendNotification({ type: IntegrationServiceTypes.Slack, slack: { token: botToken, channel: channelName } }, text, textType);

        return {
            content: [{
            type: "text",
            text: JSON.stringify({ success: response.sendNotification?.result }, null, 2)
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

    server.tool(
    "sendTwitterNotification",
    `Posts a tweet from the configured user account.
    Accepts the plain text for the tweet.
    Tweet text rules: allowed - plain text, @mentions, #hashtags, URLs (auto-shortened), line breaks (\n).  
    Not allowed - markdown, HTML tags, rich text, or custom styles.
    Requires environment variables to be configured: TWITTER_CONSUMER_API_KEY, TWITTER_CONSUMER_API_SECRET, TWITTER_ACCESS_TOKEN_KEY, TWITTER_ACCESS_TOKEN_SECRET.
    Returns true if the notification was successfully sent, or false otherwise.`,
    { 
        text: z.string().describe("Text to send."),
    },
    async ({ text }) => {
        const consumerKey = process.env.TWITTER_CONSUMER_API_KEY;
        if (!consumerKey) {
            console.error("Please set TWITTER_CONSUMER_API_KEY environment variable.");
            process.exit(1);
        }

        const consumerSecret = process.env.TWITTER_CONSUMER_API_SECRET;
        if (!consumerSecret) {
            console.error("Please set TWITTER_CONSUMER_API_SECRET environment variable.");
            process.exit(1);
        }

        const accessTokenKey = process.env.TWITTER_ACCESS_TOKEN_KEY;
        if (!accessTokenKey) {
            console.error("Please set TWITTER_ACCESS_TOKEN_KEY environment variable.");
            process.exit(1);
        }

        const accessTokenSecret = process.env.TWITTER_ACCESS_TOKEN_SECRET;
        if (!accessTokenSecret) {
            console.error("Please set TWITTER_ACCESS_TOKEN_SECRET environment variable.");
            process.exit(1);
        }

        const client = new Graphlit();

        try {
        const response = await client.sendNotification({ type: IntegrationServiceTypes.Twitter, 
            twitter: { 
                consumerKey: consumerKey, 
                consumerSecret: consumerSecret,
                accessTokenKey: accessTokenKey,
                accessTokenSecret: accessTokenSecret,
            } }, text, TextTypes.Plain);

        return {
            content: [{
            type: "text",
            text: JSON.stringify({ success: response.sendNotification?.result }, null, 2)
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

    server.tool(
    "sendEmailNotification",
    `Sends an email notification to the provided email address(es).
    Accepts the email subject and a list of email 'to' addresses.
    Email addresses should be in RFC 5322 format. i.e. Alice Wonderland <alice@wonderland.net>, or alice@wonderland.net
    Also accepts the text for the email, and an optional text type (Plain, Markdown, Html). Defaults to Markdown text type.
    Requires environment variable to be configured: FROM_EMAIL_ADDRESS.
    Returns true if the notification was successfully sent, or false otherwise.`,
    { 
        subject: z.string().describe("Email subject."),
        to: z.array(z.string()).describe("Email address(es) to send the notification to."),
        text: z.string().describe("Text to send."),
        textType: z.nativeEnum(TextTypes).optional().default(TextTypes.Markdown).describe("Text type (Plain, Markdown, Html). Defaults to Markdown."),
    },
    async ({ text, textType, subject, to }) => {
        const from = process.env.FROM_EMAIL_ADDRESS;
        if (!from) {
            console.error("Please set FROM_EMAIL_ADDRESS environment variable.");
            process.exit(1);
        }

        const client = new Graphlit();

        try {
        const response = await client.sendNotification({ type: IntegrationServiceTypes.Email, email: { subject, from, to } }, text, textType);

        return {
            content: [{
            type: "text",
            text: JSON.stringify({ success: response.sendNotification?.result }, null, 2)
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

