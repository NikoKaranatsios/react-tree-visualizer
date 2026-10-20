import React, { useState } from "react";
import { createComponentTree, formatProps, type ComponentNode } from "./componentTree";

interface Props {
  component: React.ComponentType<any> | React.ReactElement;
  maxDepth?: number;
  showProps?: boolean;
  highlightColor?: string;
}

export const TreeVisualizer: React.FC<Props> = ({
  component,
  maxDepth = Infinity,
  showProps = true,
  highlightColor = "#FF5722",
}) => {
  const [selectedId, setSelectedId] = useState<string>();
  const componentTree = createComponentTree(component, maxDepth);
  if (!componentTree) return null;

  const renderTree = (node: ComponentNode): JSX.Element => (
    <div key={node.id} style={{ marginLeft: 20 }}>
      <button
        type="button"
        aria-pressed={node.id === selectedId}
        onClick={() => setSelectedId(node.id)}
        style={node.id === selectedId ? { fontWeight: "bold", color: highlightColor } : {}}
      >
        {node.label}{showProps ? `(${formatProps(node.props)})` : ""}
      </button>
      {node.children.map(renderTree)}
    </div>
  );

  return <div style={{ padding: 20 }}>
    <h2>Component Tree Visualizer</h2>
    {renderTree(componentTree)}
  </div>;
};

export default TreeVisualizer;
