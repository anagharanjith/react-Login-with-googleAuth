import React, { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginPage() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [userInputs, setUserInputs] = useState({ email: "", password: "" });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        const emailRegex = /\b[A-Za-z0-9._%+-]+@gmail\.com\b/;
        const minLength = 8;

        if (userInputs.email && userInputs.password) {
            if (!emailRegex.test(userInputs.email)) {
                toast.warning("Please enter a valid Gmail address.");
                return;
            }

            if (userInputs.password.length < minLength) {
                toast.warning("Password must be at least 8 characters long.");
                return;
            }

            setTimeout(() => {
                navigate('/dash');
                toast.success("Login Successful");
            }, 2000);

            setUserInputs({ email: '', password: '' });
        } else {
            toast.warning("Please fill all fields.");
        }
    };

    return (
        <>
            <div className="mainDiv">
                <div style={{marginTop:'30px'}} className="d-flex flex-column align-items-center">
                    <div className='form-control w-25 shadow bg-light'>
                        <h2 className="mt-3 text-center text-info">HEyy!!!</h2>
                        <h4 className='mt-1 text-center' style={{ fontFamily: "Playfair Display" }}>Welcome</h4>
                        <p className='text-center' style={{ fontFamily: 'PT Sans' }}>Enter your email and password to access your account</p>
                        <div className=" justify-content-center d-flex mt-4">
                            <GoogleLogin
                                onSuccess={credentialResponse => {
                                    const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
                                    console.log(credentialResponseDecoded);
                                    setTimeout(() => {
                                        navigate('/dash');
                                    }, 2000);
                                    toast.success("Login Successful");
                                }}
                                onError={() => {
                                    console.log('Login Failed');
                                    toast.error("Google Login Failed");
                                }}
                            />
                        </div>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <h5 className='text-center'>or</h5>
                                <Form.Control style={{ borderColor: '#2b2b2b' }} type="email" placeholder="Enter your email" value={userInputs.email} onChange={e => setUserInputs({ ...userInputs, email: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <InputGroup>
                                    <Form.Control
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        style={{ borderColor: '#2b2b2b' }}
                                        value={userInputs.password}
                                        onChange={e => setUserInputs({ ...userInputs, password: e.target.value })}
                                    />
                                    <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
                                        {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                                    </Button>
                                </InputGroup>
                            </Form.Group>
                        </Form>
                        <div className="d-flex flex-column justify-content-between align-items-center mt-1">
                            <label className="mb-1" style={{ fontSize: '12px', fontFamily: 'PT Sans' }}>
                                <input type="checkbox" className="me-2" />
                                Remember me
                            </label>
                            <a href="/forgot-password" className="mb-1" style={{ fontSize: '12px', fontFamily: 'PT Sans' }}>
                                Forgot password?
                            </a>
                        </div>

                        <div className="justify-content-center d-flex mt-2">
                            <button onClick={handleLogin} className='btn btn-primary'>Sign in</button>
                        </div>
                        <div className="SignUpDiv">
                            <p style={{ fontFamily: 'PT Sans' }} className='mt-4'>Don't have an account?<b>SignUp</b> </p>
                        </div>
                    </div>
                </div>
                <ToastContainer position='top-center' theme='colored' autoClose={3000} />
            </div>
        </>
    );
}

export default LoginPage;
