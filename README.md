# react-datetimecombo

A React date and time picker written in ES6 with elegance and performance in mind.


## Installation

Install using npm:
```sh
npm install --save @quipugmbh/react-datetimecombo
```


## Example Usage

```jsx
import DateTimeCombo from '@quipugmbh/react-datetimecombo'
import '@quipugmbh/react-datetimecombo/react-datetimecombo.css'
...

render: function() {
    return <DateTimeCombo 
        
        // Important: Set either value or defaultValue!
        
        //connect state value to use datetimecombo picker as a controlled component
        value={this.state.value}
        
        //or: use default value to use datetimecombo picker as an uncontrolled component
        defaultValue={moment()}                     

        // any format supported by moment.js (for example: "hh:mm a" for a 12 hour clock)
        dateTimeFormat="DD.MM.YYYY HH:mm"

        // hide the datepicker after a day is selected
        closeOnSelect={true}
        placeholder="Select a date..."

        // the picker calls this function for every year, month and day that are currently
        // displayed, passing a moment object and a granularity string
        isValidDate={ (date, granularity) =>
            granularity==='day'                     
            && date.isAfter(moment("1995-12-25"))
        }

        // callback on every date change
        onChange={date =>
            alert('Day changed to ' + date.format())
        }

        // prevent callback when changing months or years
        fireCallbackOnYearChange = false
	    fireCallbackOnMonthChange = false

        // disable weekends (Saturday and Sunday)
        disabledDaysOfWeek = {[5,6]}

        // disable specific dates
        disabledDates = {[ "2015-12-10, 2018-05-05"]}

        // format in which disabled dates are specified
        disabledDatesFormat="YYYY-MM-DD"            
    />;
}
```


**Please also import a copy of the [CSS stylesheet](https://raw.githubusercontent.com/gocedoko/react-datetimecombo/master/react-datetimecombo.css) in your application. Feel free to modify the styles according to your needs.**


## Developement
If you want to do developement:
1. git clone https://github.com/gocedoko/react-datetimecombo
2. cd react-datetimecombo
3. npm install
4. npm run dev

### [Changelog](CHANGELOG.md)

### [MIT Licensed](LICENSE.md)
