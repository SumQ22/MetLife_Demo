import axios from "axios"
import { Component } from "react"
import { Button, Col, Form, Modal, ModalBody, ModalHeader, Row } from "reactstrap"

type MyProps ={
    isOpen : boolean
    toggle
}

export class CreateStudentModal extends Component<MyProps> {

    handleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData(event.target)
        

        const student = {
            firstName : data.get("firstName"),
            lastName : data.get("lastName"),
            age : data.get("age"),
        }

        axios.post("http://localhost:8081/create", student)
        this.props.toggle();

        window.location.reload();
    }

    render() {
        return(
            <Modal isOpen = {this.props.isOpen} toggle= {this.props.toggle}>
                <ModalHeader toggle= {this.props.toggle}>
                    Add Student to Hub
                </ModalHeader>
                <ModalBody>

                    <Form onSubmit = {this.handleSubmit}>
                        <Row>
                            <Col>
                            <label>
                                First Name
                            </label>
                            </Col>
                            <Col>
                            <input id="firstName" name="firstName" type="text" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <label>
                                Last Name
                            </label>
                            </Col>
                            <Col>
                            <input id="lastName" name="lastName" type="text" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <label>
                                Age
                            </label>
                            </Col>
                            <Col>
                            <input id="age" name="age" type="number" />
                            </Col>
                        </Row>
                        <Button color ="primary">
                            Add Entry                           
                        </Button>
                    </Form>

                

                </ModalBody>
                
            </Modal>
        )
    }

}