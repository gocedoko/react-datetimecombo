'use strict';

import React from 'react';

class DateTimePickerTimeUnits extends React.Component {
	render() {
		const numShownUnits = 6;
		const timeUnitDisplayName = this.props.timeUnit.charAt(0).toUpperCase() + this.props.timeUnit.slice(1);
		const timeUnitValue = this.props.selectedDate[this.props.timeUnit](),
			  firstShownTimeUnit = parseInt( timeUnitValue / numShownUnits, 10 ) * numShownUnits,
			  maxValue = this.props.timeUnit === 'hour' ? 24 : 60 ;

		let timeUnits = [];

		timeUnits = Array.from({ length: numShownUnits }, ( e, i ) => 
			({
				key : firstShownTimeUnit + i, 
				className : "cdt" + timeUnitDisplayName,
				"data-value" : firstShownTimeUnit + i, 
				onClick : e => this.props.updateSelectedDate(
									parseInt( e.target.getAttribute('data-value'), 10 ), 
									this.props.timeUnit),
				disable() {
					this.className += ' cdtDisabled'
					this.onClick = null;
				}
			})
		);

		timeUnits[(timeUnitValue - firstShownTimeUnit)%numShownUnits].className += " cdtActive";

		if (this.props.isValidTime)
			timeUnits.forEach(timeUnitObj => 
				!this.props.isValidTime(this.props.moment([timeUnitObj.key, 1, 1]), this.props.timeUnit) && timeUnitObj.disable());
		
		if (this.props['validate' + timeUnitDisplayName] )
			this.props['validate' + timeUnitDisplayName](timeUnits);

		return <div className={'cdtTimeUnits' + (this.props.showDatePicker ? (this.props.timeUnit === 'hour' ? ' cdtHoursLeftPadding':''): ' cdtTimeOnly')}>
			<div key={timeUnitDisplayName} className={ 'cdt' + timeUnitDisplayName } >
				{timeUnitDisplayName.charAt(0)}
			</div>

			<div key='prev' 
				 className={ 'cdtPrev' }
				 onClick={()=>timeUnitValue>=numShownUnits && this.props.addTime( -numShownUnits, this.props.timeUnit + 's' )} /> 
			

			{ timeUnits.map(props => delete props.disable && <div {...props}> {props.key} </div>) }

			<div key='next' 
				 className={ 'cdtNext' }
				 onClick={()=>timeUnitValue<maxValue-numShownUnits && this.props.addTime( numShownUnits, this.props.timeUnit + 's' )} />
		</div>;
	}
};

export default DateTimePickerTimeUnits;