import React, {useContext, useEffect,useState} from 'react';
import {DataContext} from './provider';


function useGetSymbols(){
	const {symbols, setActiveSymbol} = useContext(DataContext);
	return [symbols,setActiveSymbol];
}

function useGetActiveSymbolFromStore(){
	const {activeSymbol} = useContext(DataContext);
	return activeSymbol;
}

function useGetSymbolFromStore(symbolName){
	const {symbols} = useContext(DataContext);
	const totalSymbols =  symbols.length;

	let symbol;

	for (let i=0; i < totalSymbols; i++){
		symbol = symbols[i];
		if(symbol.name === symbolName){
			return symbol;
		}
	}
}

export {
	useGetSymbols,
	useGetSymbolFromStore,
	useGetActiveSymbolFromStore
}