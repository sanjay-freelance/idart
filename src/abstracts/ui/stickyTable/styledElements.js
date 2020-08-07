import styled from "styled-components";

var getBorder = (props) => `${props.borderWidth === undefined ? '2px' : (props.borderWidth || '0px')} solid ${props.borderColor || '#e5e5e5'}`


const Table = styled('div').attrs(() => ({
	className: 'sticky-table'
}))`
  white-space: nowrap;
  display: table;
  box-sizing: border-box;
`;

Table.displayName = 'Table';

const Cell = styled('div').attrs(() => ({
	className: 'sticky-table-cell'
}))`
  display: table-cell;
  box-sizing: border-box;
  padding: 0.5rem 0.75rem;
`;

Cell.displayName = 'Cell';

const Row = styled('div').attrs(() => ({
	className: 'sticky-table-row'
}))`
  display: table-row;
  cursor: pointer;
`;

Row.displayName = 'Row';

const Wrapper = styled('div').attrs(() => ({
	className: 'sticky-table-wrapper'
}))`
  position: relative;
  overflow: auto;
  height: 100%;
  box-sizing: border-box;

  & ${Row}:nth-child(-n+1) ${Cell} {
    position: -webkit-sticky;
    position: sticky;
    top: 0px;
  }
  
  & ${Row} ${Cell}:nth-child(-n+1) {
    position: -webkit-sticky;
    position: sticky;
    left: 0px;
    border-right: ${getBorder};
  }
`;

Wrapper.displayName = 'Wrapper';

export {
	Wrapper,
	Table,
	Row,
	Cell
}