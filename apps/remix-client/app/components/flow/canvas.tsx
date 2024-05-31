import { type ReactNode, useCallback, type FC } from "react";
import ReactFlow, {
	type Connection,
	addEdge,
	useEdgesState,
	useNodesState,
	type NodeProps,
} from "reactflow";
import { MainNode } from "./node";
import type { Edge, NodeType, Node } from "./utils";

interface NodeCanvasProps {
	initNodes: Node[];
	initEdges: Edge[];
	children?: ReactNode;
}

type NodeFunction = FC<NodeProps>;
const nodeTypes: Record<NodeType, NodeFunction> = {
	factionNode: MainNode,
	characterNode: MainNode,
	noteNode: MainNode,
	sessionNode: MainNode,
};

export function NodeCanvas({ initNodes, initEdges, children }: NodeCanvasProps) {
	// These are prototype state managers from React Node; consider using zustand
	// when the design in finalised
	const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);

	// basic handler for connecting nodes
	const onConnect = useCallback(
		(params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
		[setEdges],
	);

	return (
		<div className="w-full h-full relative">
			<div className="absolute w-fit h-fit top-4 right-4 z-50">{children}</div>
			<div className="z-0 w-full h-full">
				<ReactFlow
					nodes={nodes}
					edges={edges}
					onNodesChange={onNodesChange}
					onEdgesChange={onEdgesChange}
					onConnect={onConnect}
					nodeTypes={nodeTypes}
				/>
			</div>
		</div>
	);
}
