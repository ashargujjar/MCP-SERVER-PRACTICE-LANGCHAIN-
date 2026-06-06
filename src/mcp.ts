import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio";
import z, { json } from "zod";
const server = new McpServer({
  name: "Employ server",
  version: "1.0.0",
});
const employees = [
  {
    id: "1",
    name: "Ahmed Khan",
    position: "Software Engineer",
    department: "Engineering",
    salary: 120000,
  },
  {
    id: "2",
    name: "Sara Malik",
    position: "Product Manager",
    department: "Product",
    salary: 150000,
  },
  {
    id: "3",
    name: "Usman Ali",
    position: "Data Analyst",
    department: "Analytics",
    salary: 95000,
  },
  {
    id: "4",
    name: "Fatima Noor",
    position: "UI/UX Designer",
    department: "Design",
    salary: 110000,
  },
  {
    id: "5",
    name: "Bilal Hassan",
    position: "Backend Developer",
    department: "Engineering",
    salary: 130000,
  },
];
// -----tools -----
server.registerTool(
  "GetAllEmployees",
  {
    description: "Get the all employees data",
  },
  async () => {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(employees),
        },
      ],
    };
  },
);
server.registerTool(
  "GetEmployById",
  {
    description: "Get the specific employ by the id",
    inputSchema: {
      id: z.string().describe("id of the employ"),
    },
  },
  async ({ id }) => {
    const employee = employees.find((e) => e.id == id);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(employee),
        },
      ],
    };
  },
);
server.registerTool(
  "EmployeesByDepartment",
  {
    description: "Get employees by department name",
    inputSchema: {
      department: z.string().describe("name of the department"),
    },
  },
  async ({ department }) => {
    const employee = employees.filter((x) => x.department == department);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(employee),
        },
      ],
    };
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);
