import React, {useState} from 'react';
import COURSE_LIST from '../../assets/data/courses.json';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import { Container} from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

/**
 * CourseList component to display the availabile courses for any given student.
 */
export default function CourseList({selectedCourses, handleAdd}) {

    // name and foundCourses handle the search functionality of courseList.
    const [name, setName] = useState('');
    const [foundCourses, setFoundCourses] = useState(COURSE_LIST);

    const filter = (e) => {
        const kwd = e.target.value;

        // Filters for courses whose course code or title STARTS WITH the query put in the search bar.
        if (kwd !== '') {
            const res = COURSE_LIST.filter((course) => {
                return course.COURSE.toLowerCase().startsWith(kwd.toLowerCase()) || 
                       course.TITLE.toLowerCase().startsWith(kwd.toLowerCase()) ||
                       course.COURSE.toLowerCase().startsWith((kwd.slice(0, 4) + " " + kwd.slice(4)).toLowerCase());
            });
            setFoundCourses(res);
        } else {

            // Otherwise no search has been made; display th entire list
            setFoundCourses(COURSE_LIST);
        }

        setName(kwd);
    }

    // Populate each item in the list as a bootstrap accordion.
    // This holds the data about each course and a button to add it to the selectedCourses list.
    return (
        <Container style={{padding: 10}}>
            <Form.Control 
            type="search" 
            placeholder="Search by code or name" 
            value={name}
            onChange={filter}
            className="input"
            />
            <br></br>
            <div className="course_list" style={{overflow: "scroll", height: 330}}>
                <Accordion>
                    {foundCourses && foundCourses.length > 0 ? (
                    foundCourses.map((course) => (
                        <>
                            <Accordion.Item key={course.CRN} eventKey={course.CRN}>
                                <Accordion.Header>{course.COURSE}</Accordion.Header> 
                                <Accordion.Body>
                                    <Container style={{"textAlign": "left"}}>
                                        <Row>
                                            <h6><b>{course.TITLE}</b></h6>
                                        </Row>
                                        <Row>
                                            <Col sm={4}>Prof:</Col>
                                            <Col sm={8}>{course.PROFS}</Col>
                                        </Row>
                                        <Row>
                                            <Col sm={4}>Room:</Col>
                                            <Col sm={8}>{course.ROOM? course.ROOM: "Online"}</Col>
                                        </Row>
                                        <Row>
                                            <Col sm={4}>Term:</Col>
                                            <Col sm={8}>{course.TERM}</Col>
                                        </Row>
                                        <br></br>
                                        <Row className='gy-5'>
                                            <Button variant="outline-primary" size="md" onClick={() => handleAdd(course)}>
                                                Add
                                            </Button>
                                        </Row>
                                    </Container>
                                </Accordion.Body>
                            </Accordion.Item>
                        </>
                    ))
                    ) : (
                    <h4>No results found.</h4>
                    )}
                </Accordion>
            </div>
        </Container>
      );
};