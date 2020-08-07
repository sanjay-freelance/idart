import React, {useEffect, useState} from "react";
import FlexibleLayout from '../../abstracts/ui/flexibleLayout';
import {legacy, basic} from './metaData'

/* Dynamically Added Child under Panel*/
import StockTable from "../stockTable";
import SymbolStats from "../symbolStats";

export default function StockLayout(props){
	const {type} = props;
	const config = type == 'legacy' ? legacy : basic;

	return (
		<FlexibleLayout config={config}>
			<StockTable/>
			<SymbolStats/>
		</FlexibleLayout>
	)
}

