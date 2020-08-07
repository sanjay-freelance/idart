// actions
const SYMBOLS = "SYMBOLS";
const ACTIVE_SYMBOL = "ACTIVE_SYMBOL";

// action creators // these are dispatched by sending the return type of action creators
function setSymbols(data){
	return {
		type: SYMBOLS,
		data: data
	}
}

function setActiveSymbol(symbolName){
	return {
		type: ACTIVE_SYMBOL,
		data: symbolName
	}
}

function isNewSymbol(symbols, newSymbol){
	const symbolFound = symbols.some( symbol => symbol.name === newSymbol.name);
	return !symbolFound
}

function updateSymbols(state, newSymbols){
	const symbolsCopy = state.symbols.slice();
	for(let i = 0; i < newSymbols.length; i++){
		const newSym = newSymbols[i];
		if(isNewSymbol(symbolsCopy,newSym)){
			symbolsCopy.push(newSym);
		} else {
			const symbolToUpdate = symbolsCopy.find((symbol)=>{
				return symbol.name === newSym.name;
			});

			if(symbolToUpdate.price > newSym.price){
				symbolToUpdate.status = 'down'
			} else if(symbolToUpdate.price < newSym.price){
				symbolToUpdate.status = 'up'
			} else {
				symbolToUpdate.status = 'same'
			}
			symbolToUpdate.change = newSym.price - symbolToUpdate.price;
			symbolToUpdate.price = newSym.price;
		}
	}
	return Object.assign({}, state,{
		symbols: symbolsCopy
	});
}

function updateActiveSymbol(state, activeSymbolName){
	const symbols = state.symbols;
	const activeSymbol = symbols.find((symbol)=>{
		return symbol.name == activeSymbolName
	});

	return Object.assign({}, state,{
		activeSymbol: activeSymbol
	});

}

// reducer
export default function reducer(state, action){
	const {type, data} = action;
	switch (type) {
		case SYMBOLS:
			return updateSymbols(state, data)
		case ACTIVE_SYMBOL:
			return updateActiveSymbol(state, data)
	}
}


export const actionCreators = {
	setSymbols,
	setActiveSymbol
};
