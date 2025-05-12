import * as React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "@/lib/utils";

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = {
  light: "",
  dark: ".dark",
};

const ChartContext = React.createContext(null);

function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
}

function ChartContainer({ id, className, children, config, ...props }) {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

const ChartStyle = ({ id, config }) => {
  const colorConfig = Object.entries(config).filter(
    ([, config]) => config.theme || config.color
  );

  if (!colorConfig.length) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color = itemConfig.theme?.[theme] || itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  );
};

const ChartTooltip = RechartsPrimitive.Tooltip;

function ChartTooltipContent({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload;
  let details = null;
  if (d) {
    if (d.name === "Cap" && d.inventorySizes) {
      details = Object.entries(d.inventorySizes)
        .map(([size, count]) => `${size}: ${count} pcs`)
        .join(", ");
    } else if (d.name === "Tassel" && d.inventoryColors) {
      details = Object.entries(d.inventoryColors)
        .map(([color, count]) => `${color}: ${count} pcs`)
        .join(", ");
    } else if (d.name === "Gown" && d.inventorySizes) {
      details = Object.entries(d.inventorySizes)
        .map(([size, count]) => `${size}: ${count} pcs`)
        .join(", ");
    } else if (d.name === "Hood" && d.inventoryColors) {
      details = Object.entries(d.inventoryColors)
        .map(([color, count]) => `${color}: ${count} pcs`)
        .join(", ");
    }
  }
  return (
    <div className="bg-white border rounded-lg px-3 py-2 text-xs shadow-xl min-w-[8rem]">
      <div className="font-bold mb-1" style={{ color: d?.color }}>
        {d?.name}
      </div>
      {details && <div className="text-gray-700 mb-1">{details}</div>}
      <div className="font-bold text-lg">{d?.count} pcs</div>
    </div>
  );
}

const ChartLegend = RechartsPrimitive.Legend;

const ChartLegendContent = ({
  className = "bg-red-500",
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey,
}) => {
  const { config } = useChart();

  if (!payload?.length) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4 mt-7", // Changed mt-4 to mt-2 for margin top
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      )}
    >
      {payload.map((item) => {
        const key = `${nameKey || item.dataKey || "value"}`;
        const itemConfig = getPayloadConfigFromPayload(config, item, key);

        return (
          <div
            key={item.value}
            className={cn(
              "[&>svg]:text-muted-foreground flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3"
            )}
          >
            {itemConfig?.icon && !hideIcon ? (
              <itemConfig.icon />
            ) : (
              <div
                className="h-2 w-2  shrink-0 rounded-[2px]"
                style={{
                  backgroundColor: item.color,
                }}
              />
            )}
            {itemConfig?.label}
          </div>
        );
      })}
    </div>
  );
};

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(config, payload, key) {
  if (typeof payload !== "object" || payload === null) {
    return undefined;
  }

  const payloadPayload =
    "payload" in payload &&
    typeof payload.payload === "object" &&
    payload.payload !== null
      ? payload.payload
      : undefined;

  let configLabelKey = key;

  if (key in payload && typeof payload[key] === "string") {
    configLabelKey = payload[key];
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key] === "string"
  ) {
    configLabelKey = payloadPayload[key];
  }

  return configLabelKey in config ? config[configLabelKey] : config[key];
}

// Custom tooltip for RadialBarChart (for use in RadialChart)
function CustomRadialTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;
  // The data object for the current segment (all categories)
  const data = payload[0]?.payload;
  if (!data) return null;
  // Support for cap, tassel, gown, hood
  const config = {
    cap: { label: "Cap", color: "hsl(var(--chart-1))" },
    tassel: { label: "Tassel", color: "hsl(var(--chart-2))" },
    gown: { label: "Gown", color: "hsl(var(--chart-3))" },
    hood: { label: "Hood", color: "hsl(var(--chart-4))" },
  };
  return (
    <div className="bg-white border rounded-lg px-2 animate-fade-in py-2 t mt-12 text-xs shadow-xl min-w-[8rem]">
      <ul className="space-y-3">
        {Object.keys(config).map((key) => (
          <li key={key} className="flex items-center gap-2">
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{ background: config[key].color }}
            ></span>
            <span className="font-semibold text-gray-900">
              {config[key].label}: {data[key]?.toLocaleString() || 0} pcs
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  CustomRadialTooltip,
};
