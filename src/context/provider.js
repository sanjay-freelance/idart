import React, {createContext, useEffect, useReducer} from "react";
import  reducer, {actionCreators} from "./reducers";
import  {store} from "./reducers/store";
import  {SocketService} from "abstracts/service";

const stockUrl = 'wss://stocks.mnet.website/';

const DataContext = createContext(store);

/*function ServiceProvider(props){
	const { children, service, getter, params = {}, reducer } = props;
	const [globalState, dispatch] = useReducer(reducer, store);

	// Use effect to pull data and setup the store
	// Note that we are passing an Array as second parameter to tell
	// React only fire the effect on mount
	useEffect( () => {
		service[getter](...params).then((result)=>{
			if(result){
				dispatch(actionCreators[setter](result))
			}
		})
	}, [getter, params]);

	const context = { ...globalState, dispatch };
	return (
	<DataContext.Provider value={context}>
		{children}
	</DataContext.Provider>
	)
}*/

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