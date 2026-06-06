import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
interface MCP_RESULT {
  content: Array<{
    type: "text" | "image";
    text: string;
  }>;
}
export class MCP_ClLIENT {
  private client: Client;
  constructor() {
    this.client = new Client({
      name: "langchain client",
      version: "1.0.1",
    });
  }
  async connect() {
    const transport = new StdioClientTransport({
      command: "npx",
      args: ["tsx", "src/mcp.ts"],
    });
    await this.client.connect(transport);
  }
  async getTools() {
    return await this.client.listTools();
  }
  async callTool(name: string, args: any) {
    const res = await this.client.callTool({
      name,
      arguments: args,
    });
    const result = res as MCP_RESULT;

    return result.content[0].text;
  }
}
