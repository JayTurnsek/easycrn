import { Nav, Modal, Button } from "react-bootstrap";
import { useState } from "react";

/**
 * About section Modal component.
 */
export default function AboutSection() {

    // show state controls the Modal showing or not.
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    return (
        <>
            <Nav.Link onClick={handleOpen}>About</Nav.Link>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>About EasyCRN</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>My name is Jay and I am a student at StFX. The course selection system is pretty unintuitive, so I wanted to make something to make that process easier. Enjoy :)</p>
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