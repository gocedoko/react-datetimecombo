'use strict';

import React from 'react';

class DateTimePickerMonths extends React.Component {
	render(){
		return <div className='cdtMonths'>
			{this.renderMonths()}
		</div>;
	}

	renderMonths() {
		const selectedDate = this.props.selectedDate || this.props.moment()
		const [month, year] = [selectedDate.month(), selectedDate.year()]
		let months = []

		months = Array.from({ length: 12 }, ( e, i ) => 
			({
				key : i, 
				className : "cdtMonth",
				"data-value" : i, 
				onClick : e => this.props.updateSelectedDate(
									parseInt( e.target.getAttribute('data-value'), 10 ), 
									'month'),
				disable() {
					this.className += ' cdtDisabled'
					this.onClick = null;
				}
			})
		);

		months[month].className += " cdtActive";

		if (this.props.isValidDate)
			months.forEach(monthObj => 
				!this.props.isValidDate(this.props.moment([year, monthObj.key, 1]), 'month') && monthObj.disable());
		
		if (this.props.validateMonths)
			this.props.validateMonths(year, months);

		return months.map(props => delete props.disable
						&& <div {...props}> 
								{ capitalize(this.props.moment.monthsShort(props.key)) } 
							</div>);
	}
};

const capitalize = str => str.charAt( 0 ).toUpperCase() + str.slice( 1, 3 ).toLowerCase();

export default DateTimePickerMonths;
