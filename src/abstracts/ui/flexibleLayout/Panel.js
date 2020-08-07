import React, {useEffect, useRef, useState} from "react";

//todo:`panel needs to be exported so that the child inside this can have controls in panel
export default function Panel(props){
	const {children, title, onExpand, panelId, expandable} = props;

	const [widthExpanded, setWidthExpanded] = useState(false);
	const [heightExpanded, setHeightExpanded] = useState(false);



	function expandClickHandler(expandType){

		console.log(title, ' Handler',expandType, widthExpanded);

		if(expandType === 'width'){
			setWidthExpanded(!widthExpanded);
			if(!widthExpanded ){
				onExpand && onExpand([panelId], expandType );
			} else {
				onExpand && onExpand([panelId], 'normal');
			}
		} else {
			setHeightExpanded(!heightExpanded);
			if(!heightExpanded ){
				onExpand && onExpand([panelId], expandType);
			} else {
				onExpand && onExpand([panelId], 'normal');
			}
		}

	}

	//console.log(title, ' widthExpanded:', widthExpanded)

	const expandableIcons = expandable ? (
		<>
			<div className='panel-settings-icon' onClick={()=>expandClickHandler('height')}>
				{widthExpanded ? <span>&#8597;</span> : <span>&#8645;</span>}
			</div>
			<div className='panel-settings-icon' onClick={()=>expandClickHandler('width')}>
				{widthExpanded ? <span>&#8596;</span> : <span>&#8646;</span>}
			</div>
		</>
	) : null;

	return (
		<div className='panel'>
			<div className='panel-header'>
				<div className='panel-header-controls'>
					{title}
					<div className='empty-div'></div>
					{expandableIcons}
				</div>
			</div>
			<div className='panel-container'>
				{children}
			</div>
		</div>
	)
}