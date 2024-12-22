import React from "react";
import './App.css'
import WorkflowCanvas from "./Components/WorkFlowCanvas";

const App = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "20px" }}>Drag-and-Drop Workflow</h1>
      <WorkflowCanvas />
    </div>
  );
};

export default App;
