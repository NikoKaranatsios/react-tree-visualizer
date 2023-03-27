# react-tree-visualizer

react-tree-visualizer is a lightweight npm package that can be installed into any React application to generate a webpage for visualizing the application's component tree. The webpage is designed to be executed like a Storybook page, allowing developers to quickly navigate and understand the structure of their React application.

<br/>
<hr/>

## Installation

To install react-tree-visualizer, simply run the following command in your React application directory:

```
npm install react-tree-visualizer --save-dev
```

<br />
<hr />

## Usage

Once you've installed the package, you can use it to generate the component tree visualization webpage by importing and using the TreeVisualizer component in your React application:

```
import React from 'react';
import { TreeVisualizer } from 'react-tree-visualizer';

const MyComponent = () => {
    // your component code here
}

const App = () => {
    return (
        <div>
            <h1>My React App</h1>
            <TreeVisualizer component={MyComponent} />
        </div>
    );
};

export default App;
```

In this example, the TreeVisualizer component is used to visualize the component tree of the MyComponent component. The resulting webpage will display the component tree as a scrollable, nested list, with each component displaying its parent and children components. The webpage will also display the properties passed through each component.

<hr />

## Customization

react-tree-visualizer is highly customizable and allows developers to control the depth and detail of the displayed component tree. The TreeVisualizer component accepts several props that can be used to modify its behavior:

<ul>
<li>
component: The component to visualize (required).
</li>
<li>
maxDepth: The maximum depth to which the component tree will be visualized (default: Infinity).
</li>
<li>
showProps: Whether or not to display the properties passed through each 
component (default: true).
</li>
<li>
highlightColor: The color to use when highlighting a selected component (default: #FF5722).
</li>
</ul>

By modifying these props, developers can customize the visualization to their specific needs.

<br />
<hr />

## Conclusion

react-tree-visualizer is a simple and effective npm package for visualizing the component tree of a React application. By generating a nested list that displays the parent and children components of each component, as well as the properties passed through each component, developers can quickly gain insight into the structure of their React application.
