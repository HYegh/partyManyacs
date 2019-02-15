import React, {Component} from 'react';
import 'ant-design-pro/dist/ant-design-pro.css';
import Exception from 'ant-design-pro/lib/Exception';


export default class NotFound extends Component {
	componentDidMount(){
		console.log("404")
		// this.props.changeHeader('eror')
	}
	
  render() {
    return (
      <Exception
        type='404'
        desc='SORRY, PAGE NOT FOUND'
      />
    )
  }
}
