import MyComponent from "./components/MyComponent";
import Button from "./components/button/Button";

function App() {
  return (
    <div>
      <MyComponent isActive isError />
      <Button type="primary">Click Me!</Button>
    </div>
  );
}

export default App;
