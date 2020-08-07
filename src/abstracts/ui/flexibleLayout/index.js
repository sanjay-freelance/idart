import React, {useState} from "react";
import LayoutNode from './LayoutNode'


export default function FlexibleLayout(props){

	const {config, children} = props;
	const [expansionType , setExpansionType] = useState('normal');
	const [expansionPath , setExpansionPath] = useState(null);



	function expandHandler(path, expandType){
		setExpansionPath(path);
		setExpansionType(expandType);

	}

	return (
		<LayoutNode config={config}
								expansionType={expansionType}
								expansionPath={expansionPath}
								onExpand={expandHandler}>
			{children}
		</LayoutNode>
	);


}

