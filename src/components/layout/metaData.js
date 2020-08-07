const legacy = {
	id: 'root',
	splitType: 'column',
	size: 900,
	nodes: [
		{
			id: 'rootOne',
			type: 'split',
			splitType: 'row',
			size: 300,
			nodes: [
				{
					id: 'tablePanel',
					type: 'panel',
					title: 'Table',
					child: {
						index: 0,
					},
				},
				{
					id: 'rootOneOne',
					type: 'split',
					splitType: 'column',
					size: 300,
					nodes: [
						{
							id: 'symChartPanel',
							type: 'panel',
							title: 'Symbol Line Chart'
						},
						{
							id: 'scripStatsPanel',
							type: 'panel',
							title: 'Script Stats',
							fixed: false,
							child: {
								index: 1,
							},
						}
					]
				}
			]
		},
		{
			id: 'rootTwo',
			type: 'split',
			splitType: 'row',
			size: 480,
			nodes: [
				{
					id: 'anaPanel',
					type: 'panel',
					title: 'Analysis'
				},
				{
					id: 'anaChartPanel',
					type: 'panel',
					title: 'Chart'
				}
			]
		}
	]
};

const basic = {
	id: 'root',
	splitType: 'column',
	size: 1100,
	nodes: [
		{
			id: 'rootOne',
			type: 'split',
			splitType: 'row',
			size: 500,
			nodes: [
				{
					id: 'chart',
					type: 'panel',
					title: 'Line Chart'
				},
				{
					id: 'scripStatsPanel',
					type: 'panel',
					title: 'Script Stats',
					child: {
						index: 1,
					},
				}
			]
		},
		{
			id: 'table',
			type: 'panel',
			title: 'Symbols',
			child: {
				index: 0,
				props: {
					defaultCols: ['name', 'price', 'change' ]
				}
			}
		},

	]

}






export {
	legacy,
	basic
}