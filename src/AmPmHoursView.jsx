'use strict';

import React from 'react';

class DateTimePickerAmPmHours extends React.Component {
	render() {
		const numShownUnits = 6;
		const hour24 = this.props.selectedDate['hour'](),
			  timeUnitValue = !(hour24%12) ? 12 : hour24%12, // hours in 12-hour clock
			  pm = hour24 >= 12,
			  firstShownTimeUnit = timeUnitValue < numShownUnits+1 ? 1 : 7;
		let timeUnits = [];

		timeUnits = Array.from({ length: numShownUnits }, ( e, i ) => 
			({
				key : firstShownTimeUnit + i, 
				className : "cdtHour",
				"data-value" : firstShownTimeUnit + i=== 12 ? pm*12 : (firstShownTimeUnit + i + (pm * 12)) % 24, 
				onClick : e => this.props.updateSelectedDate(
									parseInt( e.target.getAttribute('data-value'), 10 ), 
									this.props.timeUnit),
				disable() {
					this.className += ' cdtDisabled'
					this.onClick = null;
				}
			})
		);

		timeUnits[timeUnitValue - firstShownTimeUnit].className += " cdtActive";

		if (this.props.isValidTime)
			timeUnits.forEach(timeUnitObj => 
				!this.props.isValidTime(this.props.moment([timeUnitObj.key, 1, 1]), this.props.timeUnit) && timeUnitObj.disable());
		
		if (this.props['validateHour'] )
			this.props['validateHour'](timeUnits);

		return <div className={'cdtTimeUnits' + (this.props.showDatePicker ? ' cdtHoursLeftPadding' : ' cdtTimeOnly')}>
			<div key={'Hour'} className={ 'cdtHour' } >
				H
			</div>

			<div key='prev' 
				 className={ 'cdtPrev' }
				 onClick={()=>timeUnitValue>numShownUnits && this.props.addTime( timeUnitValue===12 ? numShownUnits : -numShownUnits, 'hours' )} /> 
			

			{ timeUnits.map(props => delete props.disable && <div {...props}> {props.key} </div>) }

			<div key='next' 
				 className={ 'cdtNext' }
				 onClick={()=>timeUnitValue<=12-numShownUnits && this.props.addTime( timeUnitValue===6 ? -numShownUnits : numShownUnits, 'hours' )} />

			<div key='am' 
						 className={'cdtHour' + (pm ? '' : ' cdtActive')}
						 onClick={()=>this.props.updateSelectedDate(
												timeUnitValue%12, 
												'hour')} >
					am </div>

			<div key='pm' 
						 className={'cdtHour' + (pm ? ' cdtActive' : '')}
						 onClick={()=>this.props.updateSelectedDate(
												timeUnitValue%12+12, 
												'hour')} >
					pm </div>
		</div>;
	}
};

export default DateTimePickerAmPmHours;