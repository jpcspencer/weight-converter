import { McpUseProvider, useWidget, type WidgetMetadata } from "mcp-use/react";
import { z } from "zod";

const propsSchema = z.object({
  value: z.number(),
  fromUnit: z.enum(["kg", "lb"]),
  toUnit: z.enum(["kg", "lb"]),
  converted: z.number(),
});

export const widgetMetadata: WidgetMetadata = {
  description: "Display a kg <-> lb weight conversion result",
  props: propsSchema,
  exposeAsTool: false,
};

type Props = z.infer<typeof propsSchema>;

export default function WeightConverter() {
  const { props, isPending } = useWidget<Props>();

  if (isPending) {
    return (
      <McpUseProvider autoSize>
        <div style={{ padding: 24, textAlign: "center" }}>Converting...</div>
      </McpUseProvider>
    );
  }

  const { value, fromUnit, toUnit, converted } = props;

  return (
    <McpUseProvider autoSize>
      <div
        style={{
          padding: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 40, fontWeight: 700 }}>{value}</div>
          <div style={{ fontSize: 14, opacity: 0.7, textTransform: "uppercase" }}>
            {fromUnit}
          </div>
        </div>
        <div style={{ fontSize: 28, opacity: 0.5 }}>=</div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 40, fontWeight: 700 }}>{converted}</div>
          <div style={{ fontSize: 14, opacity: 0.7, textTransform: "uppercase" }}>
            {toUnit}
          </div>
        </div>
      </div>
    </McpUseProvider>
  );
}
