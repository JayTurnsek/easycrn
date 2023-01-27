import './App.css';
import React, {useState} from 'react';
import NavBar from './components/NavBar/navBar';
import CalendarView from './components/Calendar/CalendarView';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from './components/Sidebar/Sidebar';
import { Card } from 'react-bootstrap';
import "../src/fonts/futur.ttf";
import timeblocks from './assets/data/timeblocks.json';
import ConflictModal from './components/Popups/ConflictModal';

/**
 * Main app function for EasyCRN. Utilizes Bootstrap and FullCalendar to display a better view of the
 * courses registered by the user, with adding/removing functionality and the ability to copy the CRN codes for
 * use in banner.
 * 
 * Author: Jay Turnsek 
 * TODO: rebuild with default case fixed
 */
function App() {

  // States explained:
  // occupiedTimes is an extention of selectedCourses; it holds all the timeslots
  // that are occupied in the calendar.
  //
  // selectedCourses holds the course objects of all those selected
  //
  // curCourse holds the course we want to add to selected courses
  //
  // delCourse holds the CRN (id) of the course we want to delete.
  //
  // showConflict controls the popup to let the user know there is a course conflict
  //
  // conflictTitle is the name of the course conflicted with.
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [occupiedTimes, setOccupiedTimes] = useState([]);
  const [curCourse, setCurCourse] = useState({});
  const [delCourse, setDelCourse] = useState(0);
  const [showConflict, setShowConflict] = useState(false);
  const [conflictTitle, setConflictTitle] = useState("");

  // Functions to handle the opening/closing of the conflict popup
  const handleClose = () => setShowConflict(false);
  const handleOpen = () => setShowConflict(true);
 
  /**
   * Used to add a new course to the selected courses list.
   * @param {*} course the course we want to add.
   */
  const handleAdd = (course) => {

    // first we check for course conflicts.
    let [conflict, title] = conflictOccured(course);

    // If no conflicts, add this course to those selected, then set
    // curCourse to it so that the calendar can update.
    if (!selectedCourses.includes(course) && !conflict) {

      // update occupiedTimes
      let newOccupiedTimes = occupiedTimes;
      for (const t of getTimes(course)) {newOccupiedTimes.push(t)}
      setOccupiedTimes(newOccupiedTimes)

      // update other states used in the courseList and the calendar(s).
      setSelectedCourses([...selectedCourses, course]);
      setCurCourse(course);

    }
    else {

      // There is a close conflict, so we do NOT add the course,
      // and we launch the conflict popup.
      setCurCourse(null);
      setConflictTitle(title);
      handleOpen();
    }
  }

  /**
   * Handles the removal of a course from the selected courses.
   * @param {*} crn is the course code of the course to be removed.
   */
  const handleRemove = (crn) => {

    // Remove course matching CRN from selected courses.
    let newSelectedCourses = selectedCourses.filter(item => item.CRN !== crn);
    setSelectedCourses(newSelectedCourses);
    let newOccupiedTimes = occupiedTimes.filter(item => item.crn !== crn);
    setOccupiedTimes(newOccupiedTimes);

    // delCourse here handles the selected courses list,
    // as well as delete events from calendar with matching id.
    // curCourse is set to null for the logic to allow 
    // readding the last previously added course.
    setDelCourse(crn);
    setCurCourse(null);
  }

  /**
   * Function for checking for conflicts in the calendar given a specific course.
   * @param {Object} course is the course that we are trying to add
   * @returns true if a conflict occurs, false otherwise.
   */
  const conflictOccured = (course) => {
    let addTimes = getTimes(course);
    for (const addTime of addTimes) {
      for (const time of occupiedTimes) {
        if (addTime.end >= time.start && addTime.start <= time.end && (time.day === addTime.day) && (time.term.some(t => addTime.term.includes(t)))) {
          return [true, time.title];
          }
      }
    }
    return [false, null];
  }

  /**
   * Function to get the time slots from any given course. Used in adding to occupiedTimes and 
   * when adding a new course.
   * 
   * @param {course} course we are grabbing the times from
   * @returns {Object} with course title, crn code, start time, end time, day(s), and it's term.
   */
  const getTimes = (course) => {
    let times = course.TIMEBLOCK.split("/");
    let out = [];
    for (let i = 0; i < times.length; i++) {
      if (times[i] !== "TBA") {
        let curTime = timeblocks.filter(function(timeblocks) {return (timeblocks['ID'] === times[i]);})[0];
        out.push({
          title: course.COURSE,
          crn: course.CRN,
          start: timeToDecimal(curTime.START),
          end: timeToDecimal(curTime.END),
          day: curTime.DAY,
          term: termToArr(course.TERM)
        })
      }
    }
    return out;

    /**
     * Converts a time string in HH:MM to a decimal representation. Ex. "10:15" -> 10.25.
     * @param {string} t is the HH:MM string 
     * @returns {float} of the converted time.
     */
    function timeToDecimal(t) {
      t = t.split(':');
      return parseInt(t[0], 10)*1 + parseInt(t[1], 10)/60;
    }  

    /**
     * Turns a term string into an array of the semesters it occupies. Ex. "FULL" -> [1, 2]
     * @param {string} term converted
     * @returns {Array[int]} An array of the semesters it occupies.
     */
    function termToArr(term) {
      let res = []
      switch(term) {
        case("1ST"): 
          res = [1];
          break
        case("2ND"):
          res = [2];
          break
        default:
          res = [1, 2];
          break
      }
      return res;
    }
  }


  return (
    <div className="App bg-dark">
      <NavBar />
      <br></br>
      <ConflictModal showConflict={showConflict} title={conflictTitle} handleClose={handleClose} />
      <Container bg="dark">
        <Row>
          <Col sm={8}>
            <Card bg="light">
                  <Card.Body>
                    <Card.Title className="text-primary"><b>My Schedule</b></Card.Title>
                    <CalendarView curCourse={curCourse} delCourse={delCourse} />
                  </Card.Body>
            </Card>
          </Col>
          <Col sm={4}>
            <Card bg="light">
                <Card.Body>
                  <Card.Title className="text-primary"><b>Courses</b></Card.Title>
                  <Sidebar selectedCourses={selectedCourses} handleAdd={handleAdd} handleRemove={handleRemove} />
                </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <br></br>
    </div>
  );
}

export default App;
