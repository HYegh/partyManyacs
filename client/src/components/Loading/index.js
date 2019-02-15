import React from 'react'
import './loading.css'
import { Icon } from 'antd'
const Loading = () => {
	return (
		<div className="overlay" >
			<Icon style={{fontSize:"200px"}} type='loading'/>
		</div>
	)
}

export default Loading