import '../stylesheets/login.css'
import Image from 'react-bootstrap/Image';
import { useState, useEffect } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { signIn, getCurrentUser } from 'aws-amplify/auth';
import logowhite from '../assets/MuscleMatrixLogoWhite.png'

export function Login(props) {

    const setIsAuthenticated = props.setIsAuthenticated;
    const setUsername = props.setUsername;

    const [loginError, setLoginError] = useState(false);

    const navigate = useNavigate();

    async function login() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        try {
            const {isSignedIn, nextStep} = await signIn({username, password});
            setIsAuthenticated(true);
            setUsername(username);
            setNewSession(true);
            navigate('/today');
        } catch(error) {
            setLoginError(true);
        }
    }

    async function checkLoggedIn() {
        try {
            const { username, userId, signInDetails } = await getCurrentUser();
            setIsAuthenticated(true);
            setNewSession(false);
            navigate('/today')
        } catch(error) {
            setIsAuthenticated(false);
        }
    }

    useEffect(() => {
        checkLoggedIn();
    }, [])

    return(<div className='login-body'>
        <div className='text-center'>
            <Image src={logowhite} className='mm_logo'/>
            <h1 className='title'>Muscle</h1>
            <h1 className='title2'>Matrix</h1>
        </div>

        <div className='app_info'>
            <p>Ditch the paper notebooks and unorganized spreadsheets. With the muscle matrix app, you can keep track of all your exercises and weights with ease while tracking your progress over time.</p>
        </div>

        <div className='user_info'>
            <input placeholder='Username' className='login_credentials' id='username' onClick={() => setLoginError(false)}></input>
            <input type='password' placeholder='Password' className='login_credentials' id='password' onClick={() => setLoginError(false)}></input>
            <p className='error_message' style={{display: loginError ? 'block':'none'}}>Invalid credentials! Please try again.</p>
            <button className='login_button' onClick={login}>Log in</button>
        </div>

        <div className='create_account'>
            <p>Don't have an account?</p>
            <Link to='/signup'>
                <p>Create One</p>
            </Link>
        </div>

    </div>);
}