import React, {useState} from "react";
import StockLayout from 'components/layout'
import {SocketProvider} from 'context/provider'
import "./style.css"

export default function StockMarket(){
	const [layout, setLayout] = useState('legacy');

	function layoutClickHandler(event){
		setLayout(event.target.name);
	}

	return (
	<SocketProvider>
		<div className='app-container'>
			<div className='app-header'>
				<div>
					<img className='logo' src='static/img/infini-web-logo.png'/>
				</div>
				<div className='app-controllers'>
					<button name='legacy' onClick={layoutClickHandler}>Legacy</button>
					<button name='basic' onClick={layoutClickHandler}>Basic</button>
					<button name='advanced' onClick={layoutClickHandler}>Advanced</button>
				</div>
			</div>
			<div className='layout-container'>
				<StockLayout type={layout}/>
			</div>
		</div>
	</SocketProvider>
	)
}