import React from "react";
import {ColumnSplitPane, RowSplitPane} from "../resizablePane";


export default function SplitPane(props){
	const {type, children, size} = props;

	if(type == 'column'){
		return (
		<ColumnSplitPane splitWidth={size}>
			{children}
		</ColumnSplitPane>
		);
	} else if (type == 'row'){
		return (
		<RowSplitPane splitHeight={size}>
			{children}
		</RowSplitPane>
		);
	}


}