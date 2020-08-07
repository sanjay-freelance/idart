import React, {useState, useEffect} from "react";
import SplitPane from "./SplitPane";
import Panel from "./Panel";


// 0 - no, 1 - sibling
function skipSibling(splitType, expansionType) {
	if(expansionType === 'normal'){
		return 0;
	}
	// Expansion Type Width or Height

	// If Split Type is column and expansion type is width we skip the sibling
	if(splitType == 'column' && expansionType === 'width') {
		return 1
	}
	if (splitType == 'row' && expansionType === 'height'){
		return 1;
	}

	return 0
}

function getChildExpansionType(shouldSkipSibling, expansionPath, splitType,  expansionType , id){
	if(!expansionPath){
		return expansionType;
	}

	if(expansionPath.indexOf(id) == -1){ // Node that's not part of the Expansion Path
		return 'normal'
	}

	// sibling to rendered is the container that holds the Expansion Initiator
	if(shouldSkipSibling && expansionType == 'width' && splitType == 'row' && expansionPath.indexOf(id) == 1){
		return 'normal'
	}

	return expansionType;
}


export default function LayoutNode(props){
	const {config, onExpand, expansionPath, expansionType, children} = props;
	const {id, splitType, size, nodes } = config;


	function expandHandler(path, expandType){
		path.push(id);
		return onExpand(path,expandType)
	}


	const shouldSkipSibling = skipSibling( splitType, expansionType);
	const childrenUI = nodes ? nodes.map((node, index)=>{
		const {type, id:nodeId} = node;

		if(shouldSkipSibling){
			if(expansionPath.indexOf(nodeId) == -1){ // sibling to be Skipped
				return null;
			}
		}

		const childExpansionType = getChildExpansionType(shouldSkipSibling, expansionPath, splitType, expansionType, nodeId);


		if(type == 'split'){
			return <LayoutNode key={nodeId}
												 config={node}
												 expansionPath={expansionPath}
												 expansionType={childExpansionType}
												 onExpand={expandHandler}>
				{children}
			</LayoutNode>
		} else {
			const {title, child, fixed} = node;
			let childUI = null;
			if(child){
				const {index:childIndex, props:childProps} = child;
				if(childIndex !== undefined){
					let ChildComponent = children[childIndex];
					childUI = childProps ? React.cloneElement(ChildComponent, childProps) : ChildComponent;
				}
			}

			return (
				<Panel key={nodeId}
							 title={id + title}
							 panelId={nodeId}
							 expandable={!fixed}
							 onExpand={fixed? null : expandHandler }>
					{childUI}
				</Panel>
			)
		}

	}) : null;

	return (
	<SplitPane type={splitType} size={size} layoutId={id}>
		{childrenUI}
	</SplitPane>
	);
}