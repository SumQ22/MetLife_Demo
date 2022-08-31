
import {Component, ReactNode} from "react";
//import { Navbar } from "react-bootstrap";

//import Navbar from "reactstrap/es/Navbar";

import { Button, Card, CardBody, CardFooter, CardText, CardTitle, Col, Container, Navbar, NavbarBrand, Row } from "reactstrap";
import {
    IoSchoolOutline,
    IoPersonAdd,
    IoPersonCircle,
} from "react-icons/io5";
import axios from "axios";
import { CreateStudentModal } from "./CreateStudentModal";


interface MyState {
    isOpen : boolean;
    students: [];

}

export class FrontPage extends Component<{}, MyState> {

    state : MyState = {
        isOpen : false,
        students: [],
    };

    componentDidMount () {
        axios.get('https://springboot-studentdemo-app.herokuapp.com/list') //https://springboot-studentdemo-app.herokuapp.com, http://localhost:8081
        .then(res => {
            const students = res.data

            this.setState({students})
        })
    }

    toggle = () => {
        this.setState((prevState) => ({isOpen: !prevState.isOpen}));
    }

    render(): ReactNode {
        
        return(
            <div>
                <Navbar color= "secondary" light mb-2>
                    <NavbarBrand className= "text-white">
                        {/* <IoSchoolOutline className = "font-size-xxl"/> */}
                        <span className= "center-text"> TCS - Sumier Qadiri</span>

                    </NavbarBrand>
                </Navbar>

                <Container className="mt-3">
                    <Row>
                        <Col md={{ offset: 3, size: 6 }} sm="12">
                            
                        <h1 className="h1">
                        <IoSchoolOutline className = "font-size-xxl"/>
                             STUDENT MANAGMENT HUB
                        </h1>
                        </Col>

                    </Row>
                </Container>

                <CreateStudentModal isOpen = {this.state.isOpen} toggle = {this.toggle}></CreateStudentModal>

                <Container className="mt=3">
                    <Row>
                        <Col sm="12">
                            {/* <Button block color="success" onClick= {this.toggle}>
                                <span className="font-size-l">
                                    Add Student to List
                                </span>
                            </Button> */}
                        </Col>
                    </Row>
                </Container>

                <Container>
                    <Row>
                        <Col sm="4">
                            <Card body>
                                <CardTitle tag="h5">
                                    <IoPersonAdd className="font-size-xl" /> Student

                                    
                                </CardTitle>
                                <CardText>
                                    Submit Student to List Here
                                </CardText>
                                <Button block color="success" onClick= {this.toggle}>Add Student Entry</Button>
                                <Button block color="primary" onClick= {window.location.reload}>Render List</Button>
                            </Card>
                        </Col>
                    </Row>
                </Container>

                <Container className="mt-4">
                    {this.state.students.map(student => renderStudent(student))}
                </Container>
            </div>
        );
    }



}

function renderStudent(st) {
  
    return (
        <Row>
            <Col sm="12">
                <Card body color = "light">
                    <CardTitle tag="h5">
                        <IoPersonCircle className="font-size-xl" /> {st.firstName + " " + st.lastName}
                    </CardTitle>
                    <CardBody>
                        <Row>
                            <Col sm="4" className="text-center">
                                <span className="font-weight-bold">Age: </span>
                                <span> {st.age} </span>
                            </Col>
                        </Row>
                    </CardBody>
                    <CardFooter>
                        <Row>
                            {/* <Col sm-6>
                                <Button block outline color="primary"> Edit </Button>
                            </Col> */}
                            <Col sm-6>
                                <Button block color="danger" onClick={() => deleteStudent(st.id)}> Delete Student </Button>
                            </Col>
                        </Row>
                    </CardFooter>
                </Card>
            </Col>
        </Row>
    )
}
function deleteStudent(id: any): void {
    axios.post(`https://springboot-studentdemo-app.herokuapp.com/delete/${id}`) //https://springboot-studentdemo-app.herokuapp.com, http://localhost:8081
    window.location.reload();
}

