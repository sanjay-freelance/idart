import React from "react";

import {useGetActiveSymbolFromStore} from 'context/consumer'

export default function SymbolStats(props){
	const activeSymbol = useGetActiveSymbolFromStore();
	if(!activeSymbol){
		return null;
	}
	const {name, price, change, status} = activeSymbol;

	return (
	<div>
		<div><label>Name</label> : <span>{name}</span></div>
		<div><label>Price</label> : <span>{price}</span></div>
		<div><label>Change</label> : <span>{change}</span></div>
		<div><label>Status</label> : <span>{status}</span></div>
	</div>
	)
}