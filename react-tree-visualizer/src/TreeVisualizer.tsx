import React, { useState } from "react";
import ErrorComponent from "./ErrorComponent";

interface Props {
  component: React.ComponentType<any>;
  maxDepth?: number;
  showProps?: boolean;
  highlightColor?: string;
}

interface ComponentNode {
  type: string;
  props: any;
  children?: ComponentNode[];
}

const createComponentTree = (
  Component: React.ComponentType<any>,
  depth: number,
  maxDepth: number
): ComponentNode => {
  if (depth > maxDepth) return <ErrorComponent />;

  const props = Component.defaultProps ? { ...Component.defaultProps } : {};

  return {
    type: typeof Component,
    props,
    children: getChildren(Component, depth + 1, maxDepth),
  };
};

const getChildren = (
  Component: React.ComponentType<any>,
  depth: number,
  maxDepth: number
): ComponentNode[] => {
  if (!Component || !Component.prototype || !Component.prototype.render)
    throw Error("Component must be a class component");

  const children: Array<JSX.Element> = [];
  const component = new Component();
  const renderOutput = component.render();

  if (!renderOutput) return null;

  React.Children.forEach(renderOutput.props.children, (child: any) => {
    if (!child) return;
    if (typeof child.type === "string") return; // skip HTML tags
    const childComponent = createComponentTree(child.type, depth, maxDepth);
    if (!childComponent) return;
    children.push(childComponent);
  });

  return children;
};

const TreeVisualizer: React.FC<Props> = ({
  component: Component,
  maxDepth = Infinity,
  showProps = true,
  highlightColor = "#FF5722",
}) => {
  const [selectedNode, setSelectedNode] = useState<ComponentNode>(null);

  const handleNodeClick = (node: ComponentNode) => {
    setSelectedNode(node);
  };

  const renderTree = (node: ComponentNode, depth: number): JSX.Element => {
    if (!node) return null;
    const { displayName, props, children } = node;

    const isLeaf = !children || children.length === 0;
    const isHighlighted = node === selectedNode;

    const label = `${displayName}${
      showProps ? `(${JSON.stringify(props)})` : ""
    }`;
    const labelStyle = isHighlighted
      ? { fontWeight: "bold", color: highlightColor }
      : {};

    return (
      <div style={{ marginLeft: 20 }}>
        <div onClick={() => handleNodeClick(node)} style={labelStyle}>
          {isLeaf ? label : `${label}:`}
        </div>
        {children && children.map((child) => renderTree(child, depth + 1))}
      </div>
    );
  };

  const componentTree = createComponentTree(Component, 0, maxDepth);
  if (!componentTree) return null;

  return (
    <div style={{ padding: 20 }}>
      <h2>Component Tree Visualizer</h2>
      {renderTree(componentTree, 0)}
    </div>
  );
};

export default TreeVisualizer;
