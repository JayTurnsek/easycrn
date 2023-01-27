import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import TIMEBLOCK_DATA from '../../assets/data/timeblocks.json';
import { createEvents } from 'ics';
import { BsGoogle, BsMicrosoft, BsApple, BsArrowDownCircle } from 'react-icons/bs';

/**
 * CalendarModal component used to add courses to .ics file for export.
 */
export default function CalendarModal({selectedCourses}) {

    // show state controls the Modal showing or not.
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    // function used to save ICS file of selected courses
    const saveIcs = (courses) => {
        let events = []
        for(const course of courses) {

            // get timeblocks of current course
            var filtered = TIMEBLOCK_DATA.filter(timeblock => course.TIMEBLOCK.split("/").includes(timeblock.ID));
            for (const timeblock of filtered) {

                // Convert JSON data to suitible input for the ics library
                let [startH, startM] = timeblock.START.split(":");
                let [endH, endM] = timeblock.END.split(":");
                let [start, end] = [[], []]
                let recur = ''

                // Depends on term.
                if (course.TERM === "1ST") {
                    start = [2022, 9, (5 + (timeblock.DAY - 1)), parseInt(startH) + 1, parseInt(startM)]
                    end = [2022, 9, (5 + (timeblock.DAY - 1)), parseInt(endH) + 1, parseInt(endM)]
                    recur = "FREQ=WEEKLY;INTERVAL=1;UNTIL=20221206T000000Z"
                }
                else if (course.TERM === "2ND") {
                    start = [2023, 1, (2 + (timeblock.DAY - 1)), parseInt(startH), parseInt(startM)]
                    end = [2023, 1, (2 + (timeblock.DAY - 1)), parseInt(endH), parseInt(endM)]
                    recur = "FREQ=WEEKLY;INTERVAL=1;UNTIL=20230405T000000Z"
                }
                else {
                    start = [2022, 9, (5 + (timeblock.DAY - 1)), parseInt(startH), parseInt(startM)]
                    end = [2022, 9, (5 + (timeblock.DAY - 1)), parseInt(endH), parseInt(endM)]
                    recur = "FREQ=WEEKLY;INTERVAL=1;UNTIL=20230405T000000Z"
                }
                
                // Build actual event, add to events
                let curEvent = {
                    start: start,
                    end: end,
                    title: course.COURSE,
                    location: course.ROOM === null? "Online": course.ROOM,
                    recurrenceRule: recur
                }
                events.push(curEvent);
                
            }
        }
        
        // convert to .ics format
        let {error, value} = createEvents(events);

        // save file to user's system
        const a = document.createElement('a')
        const blob = new Blob([value], {type: 'ics'})
        const url = URL.createObjectURL(blob)
        a.setAttribute('href', url)
        a.setAttribute('download', 'easyCRNcalendar.ics')
        a.click()
        
    }

    return (
        <>
            <Button className="btnBlock" variant="secondary" onClick={handleOpen}>Save to Calendar</Button>

            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Export to Google/Outlook/Apple Calendar</Modal.Title>
                </Modal.Header>
                
                <Modal.Body className="p2">
                    <Button onClick={() => saveIcs(selectedCourses)}><BsArrowDownCircle /> Download my course calendar</Button>
                    <hr />
                    <h5>Guides to add to Calendar:</h5>
                    <Button className="m-1" href="https://support.google.com/calendar/answer/37118?hl=en&co=GENIE.Platform%3DDesktop" target="_blank"><BsGoogle /> Google Calendar</Button>
                    <Button className="m-1" href="https://support.microsoft.com/en-us/office/import-calendars-into-outlook-8e8364e1-400e-4c0f-a573-fe76b5a2d379" target="_blank"><BsMicrosoft /> Outlook Calendar</Button>
                    <Button className="m-1" href="https://support.apple.com/en-ca/guide/calendar/icl1023/mac" target="_blank"><BsApple /> Apple Calendar</Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
};