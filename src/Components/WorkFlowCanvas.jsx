import React, { useState, useCallback, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  MiniMap,
  Controls,
  Background,
} from "react-flow-renderer";

const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "Start Node" },
    position: { x: 250, y: 5 },
  },
  {
    id: "2",
    type: "default",
    data: { label: "Another Node" },
    position: { x: 100, y: 100 },
  },
];

const initialEdges = [];

const WorkflowCanvas = () => {
  const [nodes, setNodes] = useState(() => {
    const savedNodes = localStorage.getItem("workflow-nodes");
    return savedNodes ? JSON.parse(savedNodes) : initialNodes;
  });

  const [edges, setEdges] = useState(() => {
    const savedEdges = localStorage.getItem("workflow-edges");
    return savedEdges ? JSON.parse(savedEdges) : initialEdges;
  });

  // Save nodes and edges to localStorage on change
  useEffect(() => {
    localStorage.setItem("workflow-nodes", JSON.stringify(nodes));
  }, [nodes]);

  useEffect(() => {
    localStorage.setItem("workflow-edges", JSON.stringify(edges));
  }, [edges]);

  const onConnect = useCallback(
    (params) => {
      const sourceNode = nodes.find((node) => node.id === params.source);
      const targetNode = nodes.find((node) => node.id === params.target);

      if (
        (sourceNode.type === "input" && targetNode.type === "default") ||
        (sourceNode.type === "default" && targetNode.type === "output")
      ) {
        setEdges((eds) => addEdge(params, eds));
      } else {
        alert("Invalid connection. Ensure proper node connections.");
      }
    },
    [nodes]
  );

  const handleRunWorkflow = () => {
    const inputNode = nodes.find((node) => node.type === "input");
    const defaultNode = nodes.find((node) => node.type === "default");
    const outputNode = nodes.find((node) => node.type === "output");

    if (!inputNode || !defaultNode || !outputNode) {
      alert("Workflow is incomplete. Ensure all nodes are connected.");
      return;
    }

    alert(
      `Workflow executed!\nInput: ${inputNode.data.label}\nDefault Node: ${defaultNode.data.label}\nOutput: ${outputNode.data.label}`
    );
  };

  const validateNodePositions = (nodes) => {
    return nodes.map((node) => ({
      ...node,
      position: {
        x: node.position?.x || 0,
        y: node.position?.y || 0,
      },
    }));
  };

  return (
    <ReactFlowProvider>
      <div style={{ height: "90vh", border: "1px solid #ccc", position: "relative" }}>
        <ReactFlow
          nodes={validateNodePositions(nodes)}
          edges={edges}
          onNodesChange={setNodes}
          onEdgesChange={setEdges}
          onConnect={onConnect}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
        <button
          onClick={handleRunWorkflow}
          style={{
            position: "absolute",
            bottom: 20,
            left: 20,
            padding: "10px 20px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Run Workflow
        </button>
      </div>
    </ReactFlowProvider>
  );
};

export default WorkflowCanvas;
