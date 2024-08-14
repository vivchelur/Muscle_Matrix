import '../stylesheets/login.css'
import Image from 'react-bootstrap/Image';
import { Link, useNavigate } from 'react-router-dom';
import { signUp, confirmSignUp, getCurrentUser } from 'aws-amplify/auth';
import { useEffect, useState } from 'react';
import axios from 'axios';
import logowhite from '../assets/MuscleMatrixLogoWhite.png'

export function SignUp(props) {

    const isAuthenticated = props.isAuthenticated;
    const setIsAuthenticated = props.setIsAuthenticated;

    const [username, setUsername] = useState("");
    const [emailAuthentication, setEmailAuthentication] = useState(false);

    const [signUpError, setSignUpError] = useState(false);
    const [signUpMessage, setSignUpMessage] = useState("");
    const [verificationError, setVerificationError] = useState(false);

    const navigate = useNavigate();

    const client = props.client;

    async function signup() {
        const email = document.getElementById('email').value;
        setUsername(document.getElementById('username').value);
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmpassword').value;

        if(email === "" || username === "" || password === "" || confirmPassword === "") {
            setSignUpError(true);
            setSignUpMessage("Please fill in all fields!");
            return;
        }
        if(password !== confirmPassword) {
            setSignUpError(true);
            setSignUpMessage("Passwords do not match.");
            return;
        }

        try {
            const {isSignUpComplete, userId, nextStep} = await signUp({
                username,
                password,
                options: {
                    userAttributes: {
                        email
                    }
                }
            });
            setEmailAuthentication(true);
        } catch(error) {
            setSignUpError(true);
            if(error.message === 'Invalid email address format.') {
                setSignUpMessage("Invalid email adress.");
            } else if(error.message === "User already exists") {
                setSignUpMessage("User already exists! Please try again.");
            } else if(error.message.includes("Password did not conform with policy")) {
                setSignUpMessage("Password not long enough.")
            }
        }
    }

    async function verify() {
        const confirmationCode = document.getElementById('verification').value;

        try {
            const { isSignUpComplete, nextStep } = await confirmSignUp({
              username,
              confirmationCode
            });
            addUserToDatabase();
            navigate('/')
          } catch (error) {
            setVerificationError(true);
          }
    }

    async function checkLoggedIn() {
        try {
            const { username, userId, signInDetails } = await getCurrentUser();
            navigate('/');
        } catch(error) {
            setIsAuthenticated(false);
        }
    }

    useEffect(() => {
        checkLoggedIn();
    }, [])

    async function addUserToDatabase() {
        const body = {
            'username': username,
            'exercises': [],
            'workouts': [],
          }
        try {
            const response = await client.current.post('/user', body);
            console.log(response);
        } catch(error) {
            console.log(error);
        }
    };
      



    return(<>
        <div className='login-body'></div>
        <div className='overlay'></div>
        
        <div className='text-center'>
            <Image src={logowhite} className='mm_logo'/>
            <h1 className='title'>Muscle Matrix</h1>
        </div>

        <div className='user_info' style={{display: emailAuthentication ? 'none':'flex'}}>
        <input type='email' placeholder='Email' className='login_credentials' id='email' onClick={() => setSignUpError(false)}></input>
            <input placeholder='Username' className='login_credentials' id='username' onClick={() => setSignUpError(false)}></input>
            <input type='password' placeholder='Password' className='login_credentials' id='password' onClick={() => setSignUpError(false)}></input>
            <input type='password' placeholder='Confirm Password' className='login_credentials' id='confirmpassword' onClick={() => setSignUpError(false)}></input>
            <p className='error_message' style={{display: signUpError ? 'block':'none'}}>{signUpMessage}</p>
            <button className='login_button' onClick={signup}>Sign up</button>
        </div>

        <div className='verification' style={{display: emailAuthentication ? 'flex':'none'}}>
            <p className='verification-message'>Enter verification code:</p>
            <input type='text' className='login_credentials' style={{fontSize:'30px', textAlign:'center'}} id='verification' onClick={() => setVerificationError(false)}></input>
            <p className='error_message' style={{display: verificationError ? 'block':'none'}}>Incorrect verification code.</p>
            <button className='login_button' onClick={verify}>Verify</button>
        </div>

        <div className='create_account' style={{display: emailAuthentication ? 'none':'block'}}>
            <p>Already have an account?</p>
            <Link to='/'>
                <p>Log in</p>
            </Link>
        </div>

    </>);

}