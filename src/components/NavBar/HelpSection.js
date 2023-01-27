import { Nav, Modal, Button } from "react-bootstrap";
import { useState } from "react";

/**
 * Help section Modal component.
 */
export default function HelpSection() {

    // show state controls the Modal showing or not.
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    return (
        <>
            <Nav.Link onClick={handleOpen}>Help</Nav.Link>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>How to use EasyCRN: </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Step 1:</h5>
                    Browse for your desired courses, from either the Course List or search.
                    <hr />
                    <h5>Step 2:</h5>
                    Add to your schedule, building your courses found in  the 'Selected' tab.
                    <hr />
                    <h5>Step 3:</h5>
                    Copy your course codes for the coming semester and add them to Banner!
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