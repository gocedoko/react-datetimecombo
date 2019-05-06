'use strict';

import React from 'react';

class DateTimePickerYears extends React.Component {
	render() {
		return <div key='cdtYears' className='cdtYears'>
			<div key='prev' className='cdtPrev' onClick={()=>this.props.addTime( -10, 'years' )}> </div>
			{this.renderYears()}
			<div key='next' className='cdtNext' onClick={()=>this.props.addTime( 10, 'years' )}> </div>
		</div>;
	}

	renderYears() {
		const selectedDate = this.props.selectedDate || this.props.moment(),
			year = selectedDate.year(), 
			firstShownYear = parseInt( year / 10, 10 ) * 10
		let years = [];

		years = Array.from({ length: 10 }, ( e, i ) => 
			({
				key : firstShownYear + i, 
				className : "cdtYear",
				"data-value" : firstShownYear + i, 
				onClick : e => this.props.updateSelectedDate(
									parseInt( e.target.getAttribute('data-value'), 10 ), 
									'year'),
				disable() {
					this.className += ' cdtDisabled'
					this.onClick = null;
				}
			})
		);

		years[year - firstShownYear].className += " cdtActive";

		if (this.props.isValidDate)
			years.forEach(yearObj => 
				!this.props.isValidDate(this.props.moment([yearObj.key, 1, 1]), 'year') && yearObj.disable());
		
		if (this.props.validateYears)
			this.props.validateYears(years);

			if (this.props.styleYears)
			this.props.styleYears(years);

		return years.map(props => delete props.disable
						&& <div {...props}> {props.key} </div>);
	}
};

export default DateTimePickerYears;