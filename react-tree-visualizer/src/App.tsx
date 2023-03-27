import TreeVisualizer from "./TreeVisualizer";

const MyChildComponent = ({ text }: { text: string }) => {
  return (
    <div>
      <h1>My Child Component</h1>
      <p>{text}</p>
    </div>
  );
};

const MyComponent = () => {
  return (
    <div>
      <h1>My Component</h1>
      <p>Some text</p>
      <MyChildComponent text={"this is the child component"} />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <TreeVisualizer
        component={MyComponent}
        maxDepth={2}
        showProps={true}
        highlightColor={"#FF5722"}
      />
    </div>
  );
}

export default App;
