import React from 'react'
import ReactDOM from 'react-dom'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })



import DateTimeCombo from '../DateTimeCombo'

it('Renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<DateTimeCombo />, div)
});


describe('When no parameters are specified', () => {
    it('should only render an input field', () => {
        const wrapper = Enzyme.render(<DateTimeCombo />)
        expect(wrapper.is('.cdt')).toBe(true)
        expect(wrapper.length).toBe(1)
        expect(wrapper.children.length).toBe(1)
        expect(wrapper.find("input").length).toBe(1)
    });
});
