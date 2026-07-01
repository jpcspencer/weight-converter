import { MCPServer, text, widget } from "mcp-use/server";
import { z } from "zod";

const server = new MCPServer({
  name: "weight-converter",
  title: "Weight Converter",
  version: "1.0.0",
  description: "Convert weights between kilograms and pounds for weightlifting",
  instructions:
    "Use convert-weight to convert a weight between kilograms (kg) and pounds (lb) for weightlifting purposes.",
  baseUrl: process.env.MCP_URL || "http://localhost:3000",
  favicon: "favicon.ico",
  websiteUrl: "https://mcp-use.com",
  icons: [
    {
      src: "icon.svg",
      mimeType: "image/svg+xml",
      sizes: ["512x512"],
    },
  ],
});

const KG_PER_LB = 0.45359237;

server.tool(
  {
    name: "convert-weight",
    title: "Convert weight",
    description:
      "Convert a weight between kilograms (kg) and pounds (lb), useful for weightlifting",
    schema: z.object({
      value: z.number().positive().describe("The weight value to convert"),
      fromUnit: z
        .enum(["kg", "lb"])
        .describe("The unit of the input value: 'kg' or 'lb'"),
    }),
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      openWorldHint: false,
    },
    outputSchema: z.object({
      value: z.number(),
      fromUnit: z.enum(["kg", "lb"]),
      toUnit: z.enum(["kg", "lb"]),
      converted: z.number(),
    }),
    widget: {
      name: "weight-converter",
      invoking: "Converting...",
      invoked: "Converted",
    },
  },
  async ({ value, fromUnit }) => {
    const toUnit = fromUnit === "kg" ? "lb" : "kg";
    const converted =
      fromUnit === "kg" ? value / KG_PER_LB : value * KG_PER_LB;
    const rounded = Math.round(converted * 100) / 100;

    return widget({
      props: { value, fromUnit, toUnit, converted: rounded },
      output: text(`${value} ${fromUnit} = ${rounded} ${toUnit}`),
    });
  }
);

server.listen().then(() => {
  console.log(`Server running`);
});
