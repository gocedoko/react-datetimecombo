import React from 'react';

import YearsView from './src/YearsView.jsx';
import MonthsView from './src/MonthsView.jsx';
import DaysView from './src/DaysView.jsx';
import TimeUnitsView from './src/TimeUnitsView.jsx';
import AmPmHoursView from './src/AmPmHoursView.jsx';

import moment from 'moment';
import PropTypes from 'prop-types';

import onClickOutside from 'react-onclickoutside';


class DateTimeCombo extends React.Component {

	constructor(props) {
	    super(props);	    

		this.getDateTimeState = this.getDateTimeState.bind(this);
		this.getDisabledDatesState = this.getDisabledDatesState.bind(this);
		this.getDateTimeFormatState = this.getDateTimeFormatState.bind(this);
		this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
		this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
		this.onInputKey = this.onInputKey.bind(this);
		this.addTime = this.addTime.bind(this);
		this.updateSelectedDate = this.updateSelectedDate.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
		this.openCalendar = this.openCalendar.bind(this);
		this.closeCalendar = this.closeCalendar.bind(this);
		this.onInputKey = this.onInputKey.bind(this);
		this.moment = props.moment;

	    this.state = Object.assign(this.getDateTimeState( props ), this.getDisabledDatesState( props ), this.getDateTimeFormatState( props ));
  	}

	getDateTimeState( props ) {
		const date = props.value || props.defaultValue;
		let selectedDate, inputValue ;

		if ( date && typeof date === 'string' )
			selectedDate = this.moment( date, props.dateTimeFormat );
		else if ( date )
			selectedDate = this.moment( date );
			
		if ( selectedDate )
			inputValue = selectedDate.format(props.dateTimeFormat);
		else if ( date.isValid && !date.isValid() )
			inputValue = '';
		else
			inputValue = date || '';

		return {
			selectedDate: selectedDate,
			inputValue: inputValue,
			open: (this.state && this.state.open) || props.open || !this.props.showInputField
		}
	}


	getDisabledDatesState( props ){
		let newDisabledDates = {};
		props.disabledDates.forEach(dDate => 
		{
			dDate = this.moment(dDate, props.disabledDatesFormat);
			if (!newDisabledDates[dDate.year()]) newDisabledDates[dDate.year()] = {};
			if (!newDisabledDates[dDate.year()][dDate.month()]) newDisabledDates[dDate.year()][dDate.month()] = [];
			newDisabledDates[dDate.year()][dDate.month()].push(dDate.date());
		});
		return {
			disabledDates: newDisabledDates
		}
	}

	getDateTimeFormatState( props ){
		const showDatePicker = Boolean(props.dateTimeFormat.match(/[YyMDdLQXxGgWwE]/)),
			  showAmPmHoursPicker = Boolean(props.dateTimeFormat.match(/([Aa]|LT)/)),
			  showHoursPicker = Boolean(props.dateTimeFormat.match(/([Hhk]|LT)/)) && !showAmPmHoursPicker,
			  showMinutesPicker = Boolean(props.dateTimeFormat.match(/([m]|LT)/)),
			  showSecondsPicker = Boolean(props.dateTimeFormat.match(/([s]|LTS)/));


		return {
			showDatePicker: showDatePicker,
			showHoursPicker: showHoursPicker,
			showAmPmHoursPicker: showAmPmHoursPicker,
			showMinutesPicker: showMinutesPicker,
			showSecondsPicker: showSecondsPicker
		};
	}

	componentWillReceiveProps( nextProps ) {
		this.moment.locale(nextProps.locale);

		if ( this.props.value !== nextProps.value )
			this.setState( this.getDateTimeState( nextProps ) );

		if (this.props.disabledDates.length !== nextProps.disabledDates.length)
			this.setState( this.getDisabledDatesState( nextProps ) );

		if (this.props.dateTimeFormat !== nextProps.dateTimeFormat)
			this.setState( this.getDateTimeFormatState( nextProps ) );
	}

	shouldComponentUpdate(nextProps, nextState) {
        return (this.state.open || nextState.open) 
			|| (this.props.disabledDates.length !== nextProps.disabledDates.length)
			|| (this.props.value !== nextProps.value)
			|| (this.props.disabled !== nextProps.disabled);
    }


	onInputChange( e ) {
		const value 		= e.target === null ? e : e.target.value
		let dateTimeValue = this.moment( value, this.props.dateTimeFormat, true );

		// Allow emptying input box to delete value
		if (!value)
			this.setState({ selectedDate: null, inputValue: ""}, 
				() => this.props.onChange( null ))
		// Whenever the input box contains a valid date, update the calendar
		else if (dateTimeValue.isValid())
			this.setState({ selectedDate: dateTimeValue,
							inputValue: dateTimeValue.format( this.props.dateTimeFormat )}, 
				() => this.props.onChange( dateTimeValue ))
		// Allow invalid dates while editing input box 
		else this.setState({ inputValue: value })
	}

	onInputKey( e ) {
		if ( e.which === 9 && this.props.closeOnTab ) {
			this.closeCalendar();
		}
	}

	addTime( amount, type ) {
		const newDate = this.moment(this.state.selectedDate.valueOf())[ 'add' ]( amount, type );
		this.setState({
			selectedDate: newDate,
			inputValue: newDate.format( this.props.dateTimeFormat )
		})
	}

	updateSelectedDate (value, partOfDate){
		const selectedDate = this.state.selectedDate || this.moment(),
			newDate = this.moment(selectedDate.valueOf())[partOfDate]( value ),
			updateInputAndfireOnChange = (this.props.fireCallbackOnYearChange && partOfDate==="year") 
				|| (this.props.fireCallbackOnMonthChange && partOfDate==="month") 
				|| partOfDate==="date" || partOfDate==="hour" || partOfDate==="minute" || partOfDate==="second"

		this.setState({
			selectedDate: newDate,
			inputValue: updateInputAndfireOnChange 
							? newDate.format( this.props.dateTimeFormat ) 
							: this.state.inputValue,
			open: !(this.props.closeOnSelect && partOfDate==='date')
		}, () => updateInputAndfireOnChange && this.props.onChange( newDate ))
	}
	
	openCalendar( e ) {

		let formattedValue = moment(this.state.inputValue).format(this.props.dateTimeFormat);
		let inputValue = this.state.inputValue && this.state.inputValue === formattedValue ? formattedValue : "";
		let selectedValue = inputValue ? moment(inputValue) : this.moment();

		if ( !this.state.open ) {
			this.setState({ 
				open: true, 
				selectedDate: selectedValue,
				inputValue: inputValue
			}, function() {
				this.props.onFocus( e );
			});
		}
	}

	closeCalendar() {
		this.setState({ 
			...this.getDateTimeState(this.props),
			open: false
		})
	}

	handleClickOutside() {
		if ( this.state.open && !this.props.open ) 
			this.closeCalendar();
	}

	render() {
		let className = 'cdt ' + this.props.className;
		let inputClassName = this.props.inputClassName;
		
		if ( !this.props.showInputField )
			className += ' cdtStatic';
		else if (this.state.open)
			inputClassName += ' cdtOpen';

		const commonViewProps = 
		{
			isValidDate : this.props.isValidDate,
			isValidTime : this.props.isValidTime,
			selectedDate : this.state.selectedDate,
			updateSelectedDate : this.updateSelectedDate,
			addTime : this.addTime,
			dateTimeFormat : this.props.dateTimeFormat,
			moment : this.moment,
			disabledDates: this.state.disabledDates,
			disabledDaysOfWeek : this.props.disabledDaysOfWeek,
			showDatePicker : this.state.showDatePicker,
		}

		return <div className={className}>
				{
					this.props.showInputField && 
						<input 
							type='text'
							className={'cdtInput ' + inputClassName}
							style={this.props.style.cdtInput}
							placeholder={this.props.placeholder}
							disabled={this.props.disabled}
							onClick= {this.openCalendar}
							onFocus= {this.openCalendar}
							onChange= {this.onInputChange}
							onKeyDown= {this.onInputKey}
							value= {this.state.inputValue} 
							{...this.props.inputProps}
						/>
				}

				{ 
					this.state.open &&
						<div 
							key='cdtPicker' 
							className='cdtPicker' 
							style={this.props.style.cdtPicker}
							> 
								<div className='cdtRow'>
								{ 
									this.state.showDatePicker &&
										[
										<YearsView 
											key='cdtYears'
											validateYears={this.props.validateYears} 
											styleYears={this.props.styleYears} 
											{...commonViewProps}
										/>,
										<MonthsView
											key='cdtMonths'
											validateMonths={this.props.validateMonths} 
											styleMonths={this.props.styleMonths} 
											{...commonViewProps}
										/>,
										<DaysView
											key='cdtDays'
											validateDays={this.props.validateDays} 
											styleDays={this.props.styleDays} 
											{...commonViewProps}
										/>
										]
								}
									
								{ 
									this.state.showHoursPicker && 
										<TimeUnitsView
											timeUnit='hour'
											validateTimeUnits={this.props.validateHours} 
											{...commonViewProps}
										/> 
								}

								{ 
									this.state.showAmPmHoursPicker && 
										<AmPmHoursView
											timeUnit='hour'
											validateTimeUnits={this.props.validateHours} 
											{...commonViewProps}
										/> 
								}

								{ 
									this.state.showMinutesPicker && 
										<TimeUnitsView
											timeUnit='minute'
											validateTimeUnits={this.props.validateMinutes} 
											{...commonViewProps}
										/>
								}

								{ 
									this.state.showSecondsPicker && 
										<TimeUnitsView
											timeUnit='second'
											validateTimeUnits={this.props.validateSeconds} 
											{...commonViewProps}
										/>
								}
							</div>
						</div>
				}
				</div> ;
	}
};

DateTimeCombo.propTypes= {
	//value: PropTypes.object | PropTypes.string,
	//defaultValue: PropTypes.object | PropTypes.string,

	//moment: PropTypes.function,
	locale: PropTypes.string,
	//dateFormat: PropTypes.string | PropTypes.bool,
	//timeFormat: PropTypes.string | PropTypes.bool,
	
	className: PropTypes.string,
	showInputField: PropTypes.bool,
	inputClassName: PropTypes.string,
	inputProps: PropTypes.object,
	placeholder: PropTypes.string,

	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
	onChange: PropTypes.func,

	fireCallbackOnYearChange: PropTypes.any,
	fireCallbackOnMonthChange: PropTypes.any,
	
	disabledDaysOfWeek: PropTypes.array,
	disabledDates: PropTypes.array,
	disabledDatesFormat: PropTypes.string,

	isValidDate: PropTypes.func,
	isValidTime: PropTypes.func,
	
	validateDays: PropTypes.func,
	validateMonths: PropTypes.func,
	validateYears: PropTypes.func,
	validateHours: PropTypes.func,
	validateMinutes: PropTypes.func,
	validateSeconds: PropTypes.func,
	
	closeOnSelect: PropTypes.bool,
	closeOnTab: PropTypes.bool
}


DateTimeCombo.defaultProps = {
	defaultValue: '',

	moment: moment,
	locale: 'en-gb',
	dateTimeFormat: 'YYYY-MM-DD HH:mm',
	
	className: '',
	style: {
		cdtInput: {},
		cdtPicker: {}
	},
	showInputField: true,
	inputClassName: '',
	inputProps: {},
	placeholder: '',
			
	onFocus: () => {},
	onBlur: () => {},
	onChange: () => {},

	fireCallbackOnYearChange: false,
	fireCallbackOnMonthChange: false,

	disabledDaysOfWeek : [],
	disabledDates: [],
	disabledDatesFormat: 'YYYY-MM-DD',

	isValidDate: () => true,

	closeOnSelect: true,
	closeOnTab: true,
}


export default onClickOutside(DateTimeCombo);
