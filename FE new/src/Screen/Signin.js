import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import FileBase from "react-file-base64";
import '../Screen/signin.css';
import {loginUser, registerUser} from "../api/apiService";


export default function Signin() {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fileEnc, fileEncData] = useState(null);
    const [username, setusername] = useState("");
    const [role, setrole] = useState("");
    const [error, setError] = useState("");
    const regex = /\S+@\S+\.\S+/;

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const registrationHandler = async (e) => {
        e.preventDefault();
        if (email.trim().length === 0 || password.trim().length === 0 || username.trim().length === 0 || fileEnc.trim().length === 0) {
            setTimeout(() => {
                setError("");
            }, 5000);
            return setError("Please fill all the fields");
        } else if (password.trim().length < 6) {
            setTimeout(() => {
                setError("Time Out");
            }, 5000);
            return setError("Please use a valid password with at least 6 characters");
        } else if (!email.trim().match(regex)) {
            setTimeout(() => {
                setError("Time Out");
            }, 5000);
            return setError("Please provide valid email");
        } else {
            registerUser({email, password, fileEnc, role, username}).then((res) => {
                localStorage.setItem("authToken", res.data.token);
                window.location = `/profile`;
            }).catch((err) => {
                setError(err.response.data.desc);
                setTimeout(() => {
                    setError("");
                }, 5000);
            })
        }

    };


    const login = async (e) => {
        e.preventDefault();
        if (email.trim().length === 0 || password.trim().length === 0) {
            setTimeout(() => {
                setError("");
            }, 5000);
            return setError("Please fill all the fields");
        } else if (password.trim().length < 6) {
            setTimeout(() => {
                setError("");
            }, 5000);
            return alert("Please use a valid password");
        } else {
            loginUser({email, password}).then((res) => {
                localStorage.setItem("authToken", res.data.token);
                window.location = `/profile`;
            }).catch((err) => {
                setError(err.response.data.desc);
                setTimeout(() => {
                    setError("");
                }, 5000);
            })
        }
    };

    return (
        <div style={{backgroundColor: '#330A6A'}}>
            <Container>
                <Row>
                    <Col>
                        <div>

                            <img src="https://res.cloudinary.com/iplus/image/upload/v1678459363/test/new_tszsox.png"
                                 alt='cover' style={{float: 'right', width: '120%'}}/>
                        </div>

                    </Col>

                    <Col>
                        <div>
                            <img src="https://res.cloudinary.com/iplus/image/upload/v1678534187/test/logo_gxle55.png"
                                 alt='logo' style={{width: '85%', paddingTop: '13vh', paddingLeft: '35vh',}}/>
                        </div>
                        <div style={{paddingLeft: '5vh ', paddingTop: '3vh'}}>
                            <li class='li'><input class='input' type="checkbox" id="cb1"/>
                                <label class='label1' for="cb1" style={{width: '100%'}}>
                                    <Card style={{backgroundColor: '#330A6A', border: "2px solid #57B9DD"}}>
                                        <div style={{
                                            paddingTop: '1vh',
                                            paddingLeft: '1vh',
                                            paddingRight: '1vh',
                                            paddingBottom: '1vh'
                                        }}>
                                            <Row>
                                                <Col sm={4}><img
                                                    src='https://res.cloudinary.com/iplus/image/upload/v1678536815/test/user_izpqdu.png'
                                                    alt='user' style={{width: '160%'}}/></Col>
                                                <Col sm={8}>
                                                    <div style={{
                                                        paddingLeft: '1vh',
                                                        color: '#57B9DD',
                                                        paddingTop: '1vh'
                                                    }}>
                                                        <h5>Join as</h5>
                                                        <h5>Student</h5>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Card>
                                </label>
                            </li>
                            <li class='li'><input class='input' type="checkbox" id="cb2"/>
                                <label class='label1' for="cb2" style={{width: '100%'}}>
                                    <Card style={{backgroundColor: '#330A6A', border: "2px solid #57B9DD"}}>
                                        <div style={{
                                            paddingTop: '1vh',
                                            paddingLeft: '1vh',
                                            paddingRight: '1vh',
                                            paddingBottom: '1vh'
                                        }}>
                                            <Row>
                                                <Col sm={4}><img
                                                    src='https://res.cloudinary.com/iplus/image/upload/v1678536815/test/user_izpqdu.png'
                                                    alt='user' style={{width: '160%'}}/></Col>
                                                <Col sm={8}>
                                                    <div style={{
                                                        paddingLeft: '1vh',
                                                        color: '#57B9DD',
                                                        paddingTop: '1vh'
                                                    }}>
                                                        <h5>Join as</h5>
                                                        <h5>Teacher</h5>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Card>
                                </label>
                            </li>
                        </div>

                        <div>
                            <div
                                style={{paddingLeft: '5vh', color: '#57B9DD', paddingTop: '3vh', paddingBottom: '1vh'}}>
                                <h5>Do Not Have an Account : <Button variant="primary" onClick={handleShow} style={{
                                    backgroundColor: '#57B9DD',
                                    color: '#330A6A'
                                }}>
                                    Sign In From Here </Button>
                                </h5>

                                <Modal show={show} onHide={handleClose} animation={false}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Register to the System</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Card border="dark">
                                            <Card.Body>
                                                <Form onSubmit={registrationHandler}>
                                                    {error && <span className="error-message"
                                                                    style={{color: "red"}}>{error}</span>}


                                                    <Form.Group as={Col} md={12} controlId="email">
                                                        <Form.Label>Email address</Form.Label>
                                                        <Form.Control
                                                            type="email"
                                                            placeholder="email"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group as={Col} md={12} controlId="password">
                                                        <Form.Label>Password</Form.Label>
                                                        <Form.Control
                                                            type="password"
                                                            placeholder="Password"
                                                            minLength={6}
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                        />
                                                    </Form.Group>

                                                    <Form.Group as={Col} md={12} controlId="username">
                                                        <Form.Label>username</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="username"
                                                            minLength={6}
                                                            value={username}
                                                            onChange={(e) => setusername(e.target.value)}
                                                        />
                                                    </Form.Group>

                                                    <Form.Group as={Col} md={12} controlId="role">
                                                        <Form.Label>role</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="role"
                                                            minLength={6}
                                                            value={role}
                                                            onChange={(e) => setrole(e.target.value)}
                                                        />
                                                    </Form.Group>

                                                    <Form.Group controlId="fileupload">
                                                        <Form.Label>Profile Picture</Form.Label>
                                                        <h6>**Please do not exceed the amount of file size 25MB </h6>
                                                        <FileBase
                                                            type="file"
                                                            multiple={false}
                                                            onDone={({base64}) => {
                                                                fileEncData(base64);
                                                            }}
                                                        />
                                                    </Form.Group>
                                                    <div>
                                                        <div className="container">
                                                            <div className="form-group">


                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <br/>

                                                        <Form.Group as={Col} md={12} className="login-btn">
                                                            <div className="d-grid gap-2">
                                                                <Button style={{
                                                                    backgroundColor: "#5791b3",
                                                                    border: "#5791b3"
                                                                }} type="submit">
                                                                    Register
                                                                </Button>

                                                            </div>

                                                        </Form.Group>
                                                    </div>
                                                </Form>
                                            </Card.Body>
                                        </Card>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}
                                                style={{backgroundColor: '#57B9DD', color: 'white', border: '#57B9DD'}}>
                                            Close
                                        </Button>

                                    </Modal.Footer>
                                </Modal>
                            </div>
                            <div style={{paddingLeft: '5vh', paddingRight: '10vh'}}>
                                <Form onSubmit={login}>
                                    {error && <span className="error-message" style={{color: "red"}}>{error}</span>}

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Control type="email" placeholder="email" style={{
                                            backgroundColor: '#330A6A',
                                            border: "2px solid #57B9DD",
                                            color: 'white'
                                        }}
                                                      value={email}
                                                      onChange={(e) => setEmail(e.target.value)}
                                                      required
                                        />

                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Control type="password" placeholder="Password" style={{
                                            backgroundColor: '#330A6A',
                                            border: "2px solid #57B9DD",
                                            color: 'white'
                                        }}
                                                      minLength={6}
                                                      value={password}
                                                      onChange={(e) => setPassword(e.target.value)}
                                                      required
                                        />
                                    </Form.Group>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                                <Form.Check type="checkbox" label="Check me out"
                                                            style={{backgroundColor: '#330A6A', color: '#57B9DD'}}
                                                            required/>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <div style={{paddingLeft: '10vh'}}>
                                                <a href="/#" style={{color: '#57B9DD', float: 'left'}}><p>Forgot
                                                    Password?</p></a>
                                            </div>
                                        </Col>


                                    </Row>
                                    <div style={{paddingLeft: '3vh', paddingRight: '3vh'}}>
                                        <div className="d-grid gap-2">
                                            <Button size="lg" style={{backgroundColor: '#57B9DD', color: '#330A6A'}}
                                                    type="submit">
                                                Login
                                            </Button>
                                        </div>
                                    </div>
                                    <div style={{color: 'white', paddingTop: '2vh', paddingLeft: '30%'}}>
                                        Log in using your acount on
                                    </div>
                                    <div style={{paddingLeft: '45%', paddingTop: '2vh'}}>
                                        <a href='/#'>
                                            <svg width="41" height="40" viewBox="0 0 41 40" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                      d="M20.5 0C9.17717 0 0 8.955 0 20C0 31.045 9.17717 40 20.5 40C31.8211 40 41 31.045 41 20C41 8.955 31.8211 0 20.5 0ZM20.7392 31.6967C14.1313 31.6967 8.78083 26.4633 8.78083 20C8.78083 13.5367 14.1313 8.30333 20.7392 8.30333C23.9679 8.30333 26.6671 9.465 28.7376 11.3517L25.3653 14.6483V14.6417C24.1097 13.4717 22.5175 12.8717 20.7392 12.8717C16.7929 12.8717 13.5864 16.1317 13.5864 19.9933C13.5864 23.8517 16.7929 27.1217 20.7392 27.1217C24.3198 27.1217 26.7559 25.1183 27.2582 22.3683H20.7392V17.8067H31.9885C32.1389 18.59 32.2192 19.4067 32.2192 20.2633C32.2192 26.9467 27.646 31.6967 20.7392 31.6967Z"
                                                      fill="white"/>
                                            </svg>
                                        </a>
                                    </div>


                                </Form>
                            </div>
                        </div>


                    </Col>
                </Row>
            </Container>

        </div>
    );
}
