
import React, { Component } from 'react'
//import { Link } from 'react-router-dom'
import Reactcal, { DecadeView } from 'react-calendar'
import Redirect from 'react-router-dom/Redirect';
import { Container, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ReactDOM from 'react-dom'

class Calendar extends Component {

  constructor(props) {
    super(props)

    this.state = {
      date: new Date(),
      daysOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      appConfig: {
        title: 'Choose an Appointment',
        instructions: 'Simply click the day of your desired appointment, lock in your time-slow by clicking Select, and hit "Continue"',
        listItems: ['8:00am', '9:15am', '1:10pm', '2:20pm'],
        closed: 'Sorry, our clinic is closed on Saturdays and Sundays'
      },
      time: ""
    }
    this.onClickDay = this.onClickDay.bind(this)
    this.renderFormattedDateLabel = this.renderFormattedDateLabel.bind(this)
    this.createCalendarAppointnments = this.createCalendarAppointnments.bind(this)
    this.onTimeClick = this.onTimeClick.bind(this)
    this.isDisabled = this.isDisabled.bind(this)
  }

  componentDidMount() {
    let date = this.state.date
    this.renderFormattedDateLabel(date)
    this.setUpdateData();
  }

  setUpdateData() {
    console.log("inside update data:", this.props)
    const dateProps = (this.props.appointment.date).split('-')
    const year = dateProps[0]
    const month = dateProps[1]
    const day = dateProps[2]
    if (this.props.appointment != undefined) {
      this.setState({
        date: new Date(year, month - 1, day, 0, 0, 0),
        time: this.props.appointment.time
      })
      this.renderFormattedDateLabel(new Date(year, month - 1, day, 0, 0, 0))
    }
  }

  renderFormattedDateLabel(date) {
    this.setState({ formattedDate: `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}` })
  }

  onClickDay(date) {
    
    this.setState({ date })
    this.renderFormattedDateLabel(date)

  }

  createCalendarAppointnments = () => {
    let calendarAppts = []
    this.state.appConfig.listItems.map((item, index) => {
      const day = this.state.daysOfWeek[this.state.date.getDay()]
      if (day === 'Monday' || day === 'Tuesday' || day === 'Wednesday' || day === 'Thursday' || day === 'Friday')
        calendarAppts.push(<div><button className='btn selector' onClick={this.onTimeClick} value={item}>Book on {day}, at {item}</button></div>)

    })
    if (calendarAppts.length > 0) {
      return calendarAppts
    } else {
      return (<p>{this.state.appConfig.closed}</p>)
    }
  }

  onTimeClick = e => {
    e.preventDefault()
    let aptTime = e.target.value
    this.setState({ time: aptTime })
  }

  isDisabled() {
    let today = this.state.date
    let time = this.state.time
    const day = this.state.daysOfWeek[today.getDay()]
    if (day === 'Sunday' || day === 'Saturday' || time === "")
      return true;
  }

  render() {
    let today = this.state.date
    const onSelectAppt = e => {
      e.preventDefault()
      let apptDate = `${today.getFullYear()}/${today.getMonth()}/${today.getDate()}`
      let apptTime = this.state.time
      this.props.updateApptDate(apptDate, apptTime)
    }


    let calendar = <Reactcal onClickDay={this.onClickDay} value={this.state.date} onClosedDayClick={this.onClosedDayClick} />
    const day = this.state.daysOfWeek[today.getDay()]
    const formattedDate = this.state.formattedDate

    return (<div className='row cal'>
      <div className='col-md-6 main'>
        

          <h1>{this.state.appConfig.title}</h1>
          <p>{this.state.appConfig.instructions}</p>
          <div className='main'>
          <div className='calendar'>
            {calendar}
          </div>

          <div className='appts'><form onSubmit={onSelectAppt}>
            <h3>Available appointments on {day}, {formattedDate}</h3>
            {this.createCalendarAppointnments()}

            <Link to={{ pathname: '/bookingQuestionnaire', state: this.state }}><button className='aptbtn-details btn right' type="submit" disabled={this.isDisabled()} >Continue</button></Link>
            <Link to={{ pathname: '/home', state: this.state }}><button className='btn btn-primary right'  >Cancel</button></Link>
          </form>
          </div>
          </div>
      </div>
    </div>
    )
  }
}

export default Calendar
