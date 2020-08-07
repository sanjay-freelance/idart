import React, {useState} from 'react';
import  { Wrapper, Table, Row, Cell } from './styledElements';

function Sticky (props){
	const {children, ...restProps} = props;
	return (
		<Wrapper {...restProps}>
			<Table>{children}</Table>
		</Wrapper>
	);
}

const firstHeaderCellStyle = {
	zIndex: 1
};

function SortToggle(props){
	const {onSort, col, sortedCol} = props;
	const [asc, setAsc] = useState(true)

	function onClickHandler(event){
		event.preventDefault();
		setAsc(!asc);
		onSort(col, !asc);
	}

	const isLastSortedColumn = sortedCol == col;
	const code = isLastSortedColumn ? (asc ? 8593 : 8595) : null;

	const sortIcon = code ? String.fromCharCode(code) : (String.fromCharCode(8593) + String.fromCharCode(8595));

	return <button className='sticky-table-sort-button' onClick={onClickHandler}>{sortIcon}</button>
}

function TH(props){
	const {defaultCols, cols, colMetaData, sortedCol, onSort} = props;

	const colsUI = cols ? cols.map((col, index)=>{
		if(defaultCols && defaultCols.indexOf(col) == -1){
			return null;
		}
		const style = index == 0 ? firstHeaderCellStyle : null;
		const sortIcon = (colMetaData[col] && colMetaData[col]['sortable']) ?  <SortToggle onSort={onSort} col={col} sortedCol={sortedCol}/> : null;
		return <Cell className='sticky-table-header' style={style} key={index}>{col} {sortIcon}</Cell>
	}) :  null;

	return (
	<Row >
		{colsUI}
	</Row>
	);
}

function TR(props){
	const { defaultCols, cols, row, colMetaData, onSelect} = props;

	const colsUI = cols ? cols.map((col, index)=>{
		if(defaultCols && defaultCols.indexOf(col) == -1){
			return null;
		}
		const formatter = colMetaData[col] ? colMetaData[col]['formatter'] : null;
		const cellValue = row[col];
		const formattedValue= formatter ? formatter(cellValue) : cellValue;
		return <Cell key={index}>{formattedValue}</Cell>
	}) :  null;

	function clickHandler(event){

		onSelect && onSelect(row)
	}

	return (
	<Row onClick={clickHandler}>
		{colsUI}
	</Row>
	);
}


function compare(prop, isAsc){

	return (a, b)=>{
		const aPropValue = a[prop];
		const bPropValue = b[prop];
		if(aPropValue < aPropValue){
			return isAsc ? -1 : 1;
		}else if(aPropValue > bPropValue){
			return isAsc ? 1 : -1;
		}else{
			return 0;
		}
	}

}
export default function StickyTable(props){
	const {defaultCols, cols, rows, colMetaData, onSelect } = props;
	const [sortedCol, setSortedCol] = useState('');
	//todo: replace with ref
	const [asc, setAsc] = useState(null);

	function sortHandler(col, isAsc){
		setSortedCol(col);
		setAsc(isAsc)
	}

	let sortedRows = null;
	if(sortedCol){
		sortedRows = rows.slice();
		sortedRows.sort(compare(sortedCol, asc))
	} else {
		sortedRows = rows;
	}


	const rowsUI = sortedRows.map((row, index)=>{
		return (
		<TR defaultCols={defaultCols} cols={cols} row={row} key={index} colMetaData={colMetaData} onSelect={onSelect}/>
		)
	});

	return (
	<Sticky>
		<TH  defaultCols={defaultCols} cols={cols} colMetaData={colMetaData} onSort={sortHandler} sortedCol={sortedCol}/>
		{rowsUI}
	</Sticky>
	);

}
