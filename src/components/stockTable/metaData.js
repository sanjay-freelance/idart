

const headers = [
	'name',
	'price',
'status',
'change'
];

const colMetaData = {
	'name': {
		sortable: true
	},
	'price': {
		sortable: true,
		formatter: (val)=>{
			const num = val.toFixed(2);
			return num + '$'
		}
	},
	'change': {
		sortable: true,
		formatter: (val)=>{
			const num = val.toFixed(2);
			return num + '$'
		}
	}
};



export {
	headers,
	colMetaData
}