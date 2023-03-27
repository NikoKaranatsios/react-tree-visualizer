import React, { useState } from "react";

interface Props {
  component: React.ComponentType<any>;
  maxDepth?: number;
  showProps?: boolean;
  highlightColor?: string;
}

interface ComponentNode {
  props: any;
  children?: ComponentNode[];
}

/**
 * @param Component a React component class or function from which to extract children
 * @param depth the current depth of the tree
 * @param maxDepth the maximum depth of the tree
 * @returns returns a ComponentNode object
 *
 * @description this function recursively extracts children from a React component
 */
const createComponentTree = (
  Component: React.ComponentType<any>,
  depth: number,
  maxDepth: number
): ComponentNode => {
  if (depth > maxDepth) return <></>;

  const props = Component.defaultProps ? { ...Component.defaultProps } : {};
  return {
    props,
    children: getChildren(Component, depth + 1, maxDepth),
  };
};

/**
 *
 * @param Component a React component class or function from which to extract children
 * @param depth the current depth of the tree
 * @param maxDepth the maximum depth of the tree
 * @returns returns an array of ComponentNode objects
 *
 * @description this function recursively extracts children from a React component
 */
const getChildren = (
  Component: React.ComponentType<any>,
  depth: number,
  maxDepth: number
): ComponentNode[] => {
  if (!Component || !Component.prototype || !Component.prototype.render)
    return [];

  const children: ComponentNode[] = [];
  // create a new instance of the component
  const component = React.createElement(Component);
  if (!component) return [];

  React.Children.forEach(component.props.children, (child: any) => {
    if (!child) return;
    if (typeof child.type === "string") return; // skip HTML tags

    const childComponent = createComponentTree(child, depth, maxDepth);

    if (!childComponent) return;

    children.push(childComponent);
  });

  if (depth === maxDepth) return children;
  if (depth === 1000) return children;

  return children;
};

/**
 *
 * @param Component a React component class or function from which to extract children
 * @param maxDepth the maximum depth of the tree
 * @param showProps whether to show the props of each component
 * @param highlightColor the color to highlight the selected component
 *
 * @description this component renders a tree of React components
 *
 * @returns returns a React component
 */
const TreeVisualizer: React.FC<Props> = ({
  component: Component,
  maxDepth = Infinity,
  showProps = true,
  highlightColor = "#FF5722",
}) => {
  const [selectedNode, setSelectedNode] = useState<ComponentNode>();

  const handleNodeClick = (node: ComponentNode) => {
    setSelectedNode(node);
  };

  const renderTree = (node: ComponentNode, depth: number): JSX.Element => {
    if (!node) return <></>;
    const { props, children } = node;

    const isLeaf = !children || children.length === 0;
    const isHighlighted = node === selectedNode;

    const label = `${"test"}${showProps ? `(${JSON.stringify(props)})` : ""}`;
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
