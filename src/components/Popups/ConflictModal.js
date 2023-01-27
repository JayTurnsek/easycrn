import { Modal, Button } from "react-bootstrap";
import { BsFillExclamationTriangleFill } from 'react-icons/bs';
import { IconContext } from "react-icons";
/**
 * About section Modal component.
 */
export default function ConflictModal({showConflict, title, handleClose}) {

    return (
        <>
            <Modal show={showConflict} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <IconContext.Provider
                            value={{ color: "#c92a2a", size: '30px', margin: "2px" }}
                        >
                            <BsFillExclamationTriangleFill /> 
                              {" "}<b>Conflict detected!</b>
                        </IconContext.Provider>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Conflict detected with course: {title}</p>
                    <p>Please remove {title} or choose another course.</p>
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