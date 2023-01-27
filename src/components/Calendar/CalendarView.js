import {Tabs, Tab} from 'react-bootstrap/'
import Calendar from './Calendar';

/*
 * CalendarView component used to hold the two calendars for each semester.
 * seperated by a bootstrap tab to switch between views.
 * 
 */
export default function CalendarView({curCourse, delCourse, handleConflict}) {

    // Implemented solely because fullCalendar hates Bootstrap tabs.
    const handleSwitch = () => {
        setTimeout(() => window.dispatchEvent(new Event('resize')), 1);
    };

    // Semester prop passed to differentiate two calendars, that way courses go
    // to the correct calendar.
    return (
    <Tabs justify variant="tabs" defaultActiveKey="1" onSelect={handleSwitch}>
        <Tab eventKey="1" title="Sem 1">
            <div className="tab-content">
                <Calendar curCourse={curCourse} delCourse={delCourse} semester={1} handleConflict={handleConflict} />
            </div>
        </Tab>
        <Tab eventKey="2" title="Sem 2">
            <div className="tab-content">
                <Calendar curCourse={curCourse} delCourse={delCourse} semester={2} handleConflict={handleConflict} />
            </div>
        </Tab>
    </Tabs>
    );
}