import { Tabs, Tab, Badge } from 'react-bootstrap'
import CourseList from './CourseList'
import SelectedList from './SelectedList'
import React from 'react'

/**
 * Sidebar component for holding information such as the course list and selected courses.
 */
export default function Sidebar({selectedCourses, handleAdd, handleRemove}) {

    // The weird stuff in selected tab is just to handle a badge by the title
    // to keep track of how many courses you have added thus far.
    return (
        <Tabs justify variant="tabs" defaultActiveKey="List">
            <Tab eventKey="List" title="List">
                <Tab.Content>
                    <div className="tab-content">
                    <CourseList selectedCourses={selectedCourses} handleAdd={handleAdd} />
                    </div>
                </Tab.Content>
            </Tab>
            <Tab bg="primary" eventKey="Selected" title={
                <>
                Selected
                {selectedCourses && selectedCourses.length > 0 ? (
                    <>
                    &nbsp;
                    <Badge pill bg="primary">{selectedCourses.length}</Badge>
                    </>
                ) : (<></>)}
                </>
            }>
                <Tab.Content>
                    <div className="tab-content">
                        <SelectedList selectedCourses={selectedCourses} handleRemove={handleRemove}/>
                    </div>
                </Tab.Content>
            </Tab>
        </Tabs>
    )
}