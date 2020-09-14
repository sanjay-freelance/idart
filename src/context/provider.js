import React, {createContext, useEffect, useReducer} from "react";
import  reducer, {actionCreators} from "./reducers";
import  {store} from "./reducers/store";
import  {SocketService} from "abstracts/service";

const stockUrl = 'ws://stocks.mnet.website/';

const DataContext = createContext(store);



function SocketProvider(props){
	const { children } = props;
	const { setSymbols, setActiveSymbol: activeSymbolSetter } = actionCreators;
	const [globalState, dispatch] = useReducer(reducer, store);

	useEffect( () => {
		SocketService('symWS', stockUrl, (result)=>{
			if(result){
				const resultAsArrayOfObjects = result.map((symbolArray)=>{
					return {
						name:symbolArray[0] ,
						price: symbolArray[1],
						change: 0,
						status: 'same'
					}
				})
				dispatch(setSymbols(resultAsArrayOfObjects))
			}
		})
	}, []);

	function setActiveSymbol(symbolName){
		dispatch(activeSymbolSetter(symbolName))
	}

	const context = { ...globalState, setActiveSymbol };
	return (
	<DataContext.Provider value={context}>
		{children}
	</DataContext.Provider>
	)
}



export {
	// provider
	SocketProvider,
	// consumers
	DataContext
}