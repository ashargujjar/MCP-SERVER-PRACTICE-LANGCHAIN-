MCP + LangChain Employee Directory (Practice Project)

This is a simple practice project built to understand how Model Context Protocol (MCP) works with LangChain agents using TypeScript.

The project simulates an Employee Directory System where an AI agent can fetch employee data using MCP tools.

🚀 Tech Stack
TypeScript
Node.js
MCP SDK (Model Context Protocol)
LangChain
Zod
OpenAI GPT-4o-mini
tsx (for running TypeScript directly)
📁 Project Structure
src/
 ├── mcp.ts        # MCP server (employee tools)
 ├── client.ts     # MCP client wrapper
 ├── agent.ts      # LangChain agent using MCP tools
🧩 Features

The MCP server provides the following tools:

1. Get All Employees

Returns the full list of employees.

2. Get Employee by ID

Fetch a single employee using their ID.

3. Get Employees by Department

Filter employees based on department name.

⚙️ How It Works
1. MCP Server

The MCP server exposes tools like:

GetAllEmployees
GetEmployById
EmployeesByDepartment

These tools return employee data stored in memory.

2. MCP Client

The client:

Connects to MCP server using StdioClientTransport
Calls tools using callTool()
Returns results to LangChain tools
3. LangChain Agent

The agent:

Receives user input
Decides which tool to use
Calls MCP tools through LangChain wrappers
Returns final answer using GPT-4o-mini
💬 Example Queries

You can ask the agent:

Show all employees
Get employee with id 3
Show employees from Engineering department
🛠️ Installation
npm install
▶️ Run Project
Start Agent
npx tsx src/agent.ts
🔐 Environment Variables

Create a .env file:

OPENAI_API_KEY=your_api_key_here
🧠 Learning Outcome

After building this project, you will understand:

How MCP servers expose tools
How MCP clients call tools
How LangChain agents use external tools
How AI agents decide which tool to use automatically
Basic agentic AI architecture in TypeScript
Test Response:
input:    in agent.ts file   content: " i want users of department: Engineering",
OUTPUT:
<img width="1006" height="403" alt="image" src="https://github.com/user-attachments/assets/ef62294c-fd12-4090-94bb-05b05052d2b6" />



