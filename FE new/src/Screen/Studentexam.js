import React, { useState, useEffect } from "react";
import SideNavBar from "../Component/Sidebar";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { Avatar } from 'antd';
import {getProfile, startExam} from "../api/apiService";

export default function Studentexam() {
    const [image, setimage] = useState("");
    const [username, setusername] = useState("");
    const [email, setemail] = useState("");
    const [role, setrole] = useState("");
    const [id, setid] = useState([]);
    const logOutHandler = () => {
        localStorage.removeItem("authToken");
        window.location = "/";
    };

    // const handleStartExamClick = () => {
    //     startExam()
    //         .then((res) => {
    //             console.log(res)
    //         })
    //         .catch((err) => {
    //             console.log("Start Exam error ", err);
    //         });
    // };

    useEffect(() => {
        getProfile().then((response)=> {
            console.log(response.data.profile);
            setusername(response.data.profile.username);
            setemail(response.data.profile.email);
            setimage(response.data.profile.profilePicture.imageSecURL);
            setrole(response.data.profile.role);
            setid(response.data.profile.id);
        }). catch((err)=> {
            console.log("Get Profile error ", err);
        })

    }, []);

    return (
        <div>
            <Row>
                <Col sm={2}>
                    <SideNavBar />
                </Col>
                <Col sm={10}>
                    <div style={{ paddingLeft: '2vh', paddingTop: '8vh' }}>
                        <div style={{ paddingLeft: '30vh' }}>
                            <p style={{ fontSize: '30px' }}>
                                <Avatar size={140} icon={<img src={image} alt="post" />} />
                                &nbsp; <b>Hello {username}</b></p>
                            <h6>Login from {email} & Role: {role}</h6>
                        </div>
                        <div style={{ paddingTop: '2vh', paddingLeft: '30vh', paddingRight: '45vh' }}>
                            <Card style={{ backgroundColor: '#330A6A', borderRadius: '18px' }}>
                                <div style={{ paddingLeft: '6vh', paddingTop: '4vh', paddingBottom: '3vh' }}>
                                    <h3 style={{ color: 'white' }}>Please select your exam and click on Attempt to begin.</h3>
                                </div>
                                <div style={{ paddingLeft: '30%', paddingRight: '30vh', paddingBottom: '4vh', paddingTop: '5vh' }}>
                                    <Form>
                                        <Row>
                                            <Form.Group className="mb-3" style={{ borderRadius: '18px' }}>
                                                <Form.Select style={{ borderRadius: '18px', backgroundColor: '#D8B7FA' }}>
                                                    <option>Select Exam</option>
                                                    <option> Exam 1</option>
                                                    <option>Exam 2</option>
                                                    <option>Exam 3</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Row>
                                        <div style={{ paddingLeft: '20%', paddingTop: '8vh' }}>
                                        <a href="/Exampaper" style={{ backgroundColor: '#8FE5FF', color: 'black', paddingLeft: '7vh', paddingRight: '7vh', borderRadius: '18px', textDecoration: 'none' }} >
                                            <Button variant="primary" size="lm">
                                                Start Exam
                                            </Button>
                                            </a>
                                        </div>
                                    </Form>
                                </div>
                            </Card>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}



