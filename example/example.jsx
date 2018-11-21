import React from 'react'
import ReactDOM from 'react-dom'
import DateTimeCombo from '../DateTimeCombo.jsx'
import moment from 'moment'

import './react-datetimecombo.css'

class DateTimeComboTest extends React.Component {

	constructor(props) {
		super(props)
		this.state = {time: moment()}
	}

	render(){
		if (this.state.time)
			console.log("Datetime in state: " + this.state.time.format("DD.MM.YYYY"))

		return <span>
			<small>Controlled</small>
			<DateTimeCombo 
				value={this.state.time}
				onChange={v => this.setState({time: v})}
				disabledDaysOfWeek = {[5,6]}
			/>

			<br/>

			<small>Uncontrolled</small>
			<DateTimeCombo />
		</span>
		
		
	}

}

ReactDOM.render(<DateTimeComboTest 

/>, 
	document.getElementById('datetimecombo')
);
