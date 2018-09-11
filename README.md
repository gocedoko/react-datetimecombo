# react-datetimecombo

A React date and time picker written in ES6 with elegance and performance in mind.


## Installation

Install using npm:
```sh
npm install --save react-datetimecombo
```


## Example Usage

```jsx
import DateTimeCombo from 'react-datetimecombo';
...

render: function() {
    return <DateTimeCombo 
        
                                                    // Important: Set either value or defaultValue!

        value={state.value}                         //connect app state value to use datetimecombo picker as a controlled component
        defaultValue={moment()}                     //or: use default value to use datetimecombo picker as an uncontrolled component


        dateTimeFormat="DD.MM.YYYY HH:mm"           // any format supported by moment.js (for example: "hh:mm a" for a 12 hour clock)

        closeOnSelect={true}                        // hide the datepicker after a day is selected
        placeholder="Select a date..."

        isValidDate={ (date, granularity) =>        // the picker calls this function for every year, month and day that are currently
            granularity==='day'                     // displayed, passing a moment object and a granularity string
            && date.isAfter(moment("1995-12-25"));
        }

        onChange={date =>                           // callback on every date change
            alert('Day changed to ' + date.format())
        }      

        disabledDaysOfWeek={[5,6]}                  // disable weekends (Saturday and Sunday)
        disabledDates =                             // disable specific dates
            {[ "2015-12-10, 2018-05-05"]}
        disabledDatesFormat="YYYY-MM-DD"            // format in which disabled dates are specified

    />;
}
```


**Please also import a copy of the [CSS stylesheet](https://github.com/gocedoko/react-datetimecombo/blob/master/css/react-datetimecombo.css) in your application. Feel free to modify the styles according to your needs.**


## Developement
If you want to do developement:
1. git clone https://github.com/gocedoko/react-datetimecombo
2. cd react-datetimecombo
3. npm install
4. npm run dev

### [Changelog](CHANGELOG.md)

### [MIT Licensed](LICENSE.md)
