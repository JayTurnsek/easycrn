import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import timeblocks from '../../assets/data/timeblocks.json'
import React from 'react';

/**
 * Calendar component for holding the events of selected courses.
 */
export default class Calendar extends React.Component {

    // Get reference so we can access the fullCalendar API
    calendarRef = React.createRef();
    componentDidUpdate(prevProps) {
        let api = this.calendarRef.current.getApi();
        
        // Because the props change when we delete a course,
        // We had to set the curCourse to null in handleRemove.
        // This block only runs if we have a new course added.
        if (this.props.curCourse !== null) {

            // Logic to only add the course to the calendar of it's semester
            let term = [];
            switch(this.props.curCourse.TERM){
                case("1ST"): 
                    term = [1];
                    break
                case("2ND"): 
                    term = [2];
                    break
                default:
                    term = [1, 2];
                    break
            };
            

            if (term.includes(this.props.semester)) {

                // Add a new event at each timeblock the course has.
                // ex. L1/L2 would book two events at the L1 and l2 timeblocks.
                let times = this.props.curCourse.TIMEBLOCK.split("/");
                for (let i = 0; i < times.length; i++) {

                    // Do not add to calendar, but add to course list; we dont know the timeblocks yet.
                    if (times[i] === "TBA") {
                        break
                    }

                    // Could be faster. Maybe a dict initialized instead of filtering the json?
                    let curTime = timeblocks.filter(function(timeblocks) {return (timeblocks['ID'] === times[i]);})[0];
                    api.addEvent({
                        title: this.props.curCourse.COURSE,
                        daysOfWeek: [ curTime['DAY'] ],
                        startTime: curTime['START'],
                        endTime: curTime['END'],
                        id: this.props.curCourse.CRN
                    });
                }
            }
        }

        // If we have a new delCourse, just delete all events with the course's CRN
        // Until none are left with that CRN.
        if (prevProps.delCourse !== this.props.delCourse) {
            while (api.getEventById(this.props.delCourse)) {
                api.getEventById(this.props.delCourse).remove();
            }
        }

        function addCourseToCalendar() {

        }

        function deleteCourseFromCalendar() {

        }
    }

    // Initializes a fullCalendar object with a very specific 
    // WeekView configuration. That way, it doesnt matter which
    // week in the semester we are in. The courses remain the same.
    render() {
        return (
        <FullCalendar
            plugins={[ timeGridPlugin ]}
            themeSystem='bootstrap5'
            dayHeaderFormat={{weekday: 'short'}}
            ref={this.calendarRef}
            initialView="timeGridWeek"
            slotMinTime="8:00:00"
            slotMaxTime="22:00:00"
            allDaySlot={false}
            hiddenDays={[0, 6]}
            headerToolbar={{
                start: '',
                center: '',
                end: ''
            }}
            height={416}
            eventColor={'#003365'}
            eventOverlap={false}
        />
        )
    }
}