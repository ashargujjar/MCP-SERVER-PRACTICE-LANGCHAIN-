import { ChatOpenAI } from "@langchain/openai";
import dotenv from "dotenv";
import { createAgent, DynamicStructuredTool } from "langchain";
import { MCP_ClLIENT } from "./client.js";
import z from "zod";
dotenv.config();
const mcp = new MCP_ClLIENT();
await mcp.connect();
// Tools
const getAllEmployeesTool = new DynamicStructuredTool({
  name: "getAllEmployees",
  description: "Get all employees from the company",

  schema: z.object({}),

  func: async () => {
    return await mcp.callTool("GetAllEmployees", {});
  },
});
const getEmployeeByIdTool = new DynamicStructuredTool({
  name: "getEmployeeById",
  description: "Get an employee by their id",

  schema: z.object({
    id: z.string(),
  }),

  func: async ({ id }) => {
    return await mcp.callTool("GetEmployById", { id });
  },
});
const employeesByDepartmentTool = new DynamicStructuredTool({
  name: "employeesByDepartment",
  description: "Get employees working in a specific department",

  schema: z.object({
    department: z.string(),
  }),

  func: async ({ department }) => {
    return await mcp.callTool("EmployeesByDepartment", {
      department,
    });
  },
});
//  LLM
const llm = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  temperature: 0,
  model: "gpt-4o-mini",
});
const agent = createAgent({
  model: llm,
  tools: [employeesByDepartmentTool, getAllEmployeesTool, getEmployeeByIdTool],
});
// invoking the agent
const result = await agent.invoke({
  messages: [
    {
      role: "user",
      content: " i want users of department: Engineering",
    },
  ],
});
// LOGGING OUT

console.log("Full Result messages", result.messages);
console.log("Result....", result.messages.at(-1)?.content);
