'use strict';

import React from 'react';

class DateTimePickerDays extends React.Component {
	render(){
		return <div className='cdtDays'>
			<table>
				<thead>
					<tr>
						{Array.from({ length: 7 }, ( e, i ) => 
							<th key={i}>
								{this.props.selectedDate.localeData()._weekdaysMin
										[(i+Number(!this.props.weekStartsOnSunday))%7]}
							</th>)}
					</tr>
				</thead>
				<tbody>
					{this.renderDays()}
				</tbody>
			</table>
		</div>;
	}

	renderDays( ) {
		const day = this.props.selectedDate.date(),
			  month = this.props.selectedDate.month(),
			  year = this.props.selectedDate.year(),
			  daysInMonth = this.props.selectedDate.daysInMonth(),
			  dayInWeekOfThe1st = this.props.moment(this.props.selectedDate.valueOf()).date(0).day(),
			  today = this.props.moment();
		let days = [];

		days = Array.from({ length: daysInMonth }, ( e, i ) => 
			({
				key : i+1, 
				className : "cdtDay",
				"data-value" : i+1, 
				disabled :  this.props.disabledDaysOfWeek.indexOf((dayInWeekOfThe1st+i)%7) !== -1
							||
							! this.props.isValidDate( this.props.moment([year, month, i+1]), 'day' ),
				onClick : e => this.props.updateSelectedDate(
									parseInt( e.target.getAttribute('data-value'), 10 ), 
									'date'),
			})
		);

		days[day-1].className += " cdtActive";

		if (year === today.year() && month === today.month())
			days[today.date()-1].className += " cdtToday";
		
		if (this.props.validateDays)
			this.props.validateDays(year, month, days);

		// insert empty cells before the 1st day of the month
		let weeks = [Array.from({ length:  dayInWeekOfThe1st}, (e,i) => <td key={'empty'+i}></td>)];
		
		if (this.props.disabledDates[year] && this.props.disabledDates[year][month])
			this.props.disabledDates[year][month].forEach(ind => days[ind-1].disabled=true);

		days.forEach((day, ind) => 
		{
			if (day.disabled) 
			{
				day.className += ' cdtDisabled'
				day.onClick = null;
			}
			delete day.disable, day.disabled;
			
			const weekNum = parseInt((ind + dayInWeekOfThe1st)/7);
			if (!weeks[weekNum]) 
				weeks.push([]);

			weeks[weekNum].push(<td {...day}> {day.key} </td>);
		});

		// make sure that calendar always has 6 rows
		if (weeks.length === 5) weeks.push([<td key={'empty'}></td>]);

		return weeks.map((week, ind) => <tr key={'week'+ind}>{week}</tr>);
	}
};


export default DateTimePickerDays;
