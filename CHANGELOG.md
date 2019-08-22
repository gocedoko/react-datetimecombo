Changelog
=========
## 0.1.15
- Fix error "Unable to get property getBoundingClientRect of undefined".

## 0.1.13
- Add 'scrollParent' property. This should be a ref to the first scroll parent, If set, the calendar picker will have a fixed position that will be updated when this parent is scrolled. When the calendar is used inside a div with scrollbars then the picker will be shown clipped inside. Setting the 'scrollParent' property to this div will solves the problem.

## 0.1.12
- Add styleYears, styleMonths and styleDays functions which allow for styling of individual years, months or days in the calendar picker, correspondingly.

## 0.1.11
- Add property style={cdtInput: {}, cdtPicker:{}}, passing the corresponding style properties inline to the Input field and the Calender Picker respectively.

## 0.1.9
- Fix small bug: when changing the hour, minutes or seconds, the callback was not fired

## 0.1.8
- Change input box value, only when a day is selected. Also if **fireCallbackOnYearChange** and **fireCallbackOnMonthChange** are set, then the input box value will be also updated when a year or a month is changed accordingly

## 0.1.7
- Fix onChange callback when a day is clicked

## 0.1.4
- Add calendar icon in the input box.
- Add image loader in webpack, so that the datetime.png icon can be loaded from the css in the example.

## 0.1.3
- Add properties **fireCallbackOnYearChange** and **fireCallbackOnMonthChange**. When one is set to true, the onChange callback is fired when a year or a month has changed. Otherwise the callback is fired only when the day and/or the time has changed.

## 0.1.0
- This is the first commit but the code is fully functional. Further refinements of the interface and the documentation are on the way.

