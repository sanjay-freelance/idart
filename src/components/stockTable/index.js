
import StickyTable from "../../abstracts/ui/stickyTable";
import React from "react";
//todo replace style components
import './style.css'
import {headers, colMetaData} from "./metaData";
import {useGetSymbols} from "context/consumer";

export default function StockTable(props){
	const {defaultCols} = props;
	const [symbols, setActiveSymbol] = useGetSymbols();

	function selectHandler(row){
		setActiveSymbol(row['name']);
	}
	//console.log(symbols);
	return <StickyTable  defaultCols={defaultCols}
											 cols={headers}
											 rows={symbols}
											 colMetaData={colMetaData}
											 onSelect={selectHandler}
	/>
}

