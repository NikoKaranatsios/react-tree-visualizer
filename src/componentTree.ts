import React from "react";

export interface ComponentNode {
  id: string;
  label: string;
  props: Record<string, unknown>;
  children: ComponentNode[];
}

function displayName(type: React.ReactElement["type"] | symbol): string {
  if (typeof type === "string") return type;
  if (type === React.Fragment) return "Fragment";
  if (typeof type === "function") return (type as { displayName?: string }).displayName || type.name || "Anonymous";
  return (type as { displayName?: string }).displayName || "Component";
}

/** Inspect declared JSX without executing components, hooks or React internals. */
export function createComponentTree(
  component: React.ComponentType<any> | React.ReactElement,
  maxDepth = Infinity
): ComponentNode | null {
  const limit = Number.isNaN(maxDepth) ? Infinity : Math.max(0, Math.floor(maxDepth));
  const root = React.isValidElement(component) ? component : React.createElement(component);
  function visit(element: React.ReactElement, depth: number, id: string): ComponentNode {
    const props = element.props as Record<string, unknown> & { children?: React.ReactNode };
    const children: ComponentNode[] = [];
    if (depth < limit && depth < 100) {
      React.Children.toArray(props.children).forEach((child, index) => {
        if (React.isValidElement(child)) {
          children.push(visit(child, depth + 1, `${id}/${child.key ?? index}`));
        }
      });
    }
    const { children: _children, ...ownProps } = props;
    return { id, label: displayName(element.type), props: ownProps, children };
  }
  return visit(root, 0, "root");
}

export function formatProps(props: Record<string, unknown>): string {
  const seen = new WeakSet<object>();
  try {
    return JSON.stringify(props, (_key, value) => {
      if (typeof value === "bigint") return `${value}n`;
      if (typeof value === "function") return `[Function ${value.name || "anonymous"}]`;
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) return "[Circular]";
        seen.add(value);
      }
      return value;
    });
  } catch {
    return "[Props unavailable]";
  }
}
