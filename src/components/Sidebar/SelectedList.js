import { Button, Container, Row, ListGroup, Form } from "react-bootstrap";
import { useEffect } from "react";
import { useState } from "react";
import { BsTrashFill } from "react-icons/bs"
import CalendarModal from './ExportModal';

/**
 * SelectedList component for displaying the courses selected by the user.
 * Can delete courses from here, or copy the CRN codes of the selected courses for
 * use on actual course selection site.
 */
export default function SelectedList({selectedCourses, handleRemove}) {

    // Codes state used to hold the CRN's of the selectedCourses to be copied by the user.
    const [codes, setCodes] = useState('');

    // Each time selectedCourses changes, we update the list of codes accordingly.
    useEffect(() => {
        let res = '';
        for (const course of selectedCourses) {
            res += course.CRN;

            // A complicated line that basically means comma seperate the values.
            if (selectedCourses.length > 1 && course !== selectedCourses[selectedCourses.length - 1]) {res += ", ";}
        }
        setCodes(res);
    }, [selectedCourses]);

    return (
        <>
        <br></br>
        <Container>
            <Row>
                <ListGroup style={{overflow: "scroll", height: 198}}>
                {selectedCourses && selectedCourses.length > 0 ? (
                        selectedCourses.map((course) => (
                            <>
                                <ListGroup.Item className="align-items-left">
                                    <span className="float-start">{course.COURSE}<b>{course.TIMEBLOCK ==="TBA" ? " (TIME TBA)": ""}</b></span>
                                    <Button variant="outline-danger" className="float-end" onClick={() => handleRemove(course.CRN)}><BsTrashFill /></Button>
                                </ListGroup.Item>
                            </>
                        ))
                        ) : (
                        <h6>No courses selected!</h6>
                        )}
                </ListGroup>
            </Row>
            <hr></hr>
            <Row className="text-left">
                <h6>CRN Codes: </h6>
                <div className="d-grid gap-2">
                    <Form.Control type="text" placeholder="No courses selected yet." value={codes} readOnly/>
                    <Button className="btnBlock" variant="secondary" onClick={() => {navigator.clipboard.writeText(codes)}}>Copy to clipboard</Button>
                    <CalendarModal selectedCourses={selectedCourses} />
                </div>
            </Row> 
        </Container>
        </>
    )
}