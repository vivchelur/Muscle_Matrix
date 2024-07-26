import '../stylesheets/login.css'
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import logo from '../assets/MuscleMatrixLogoWhite.png'


export function Login() {

    return(<div className='login-body'>
        <div className='text-center'>
            <Image src={logo} className='mm_logo'/>
            <h1 className='title'>Muscle</h1>
            <h1 className='title2'>Matrix</h1>
        </div>

        <div className='app_info'>
            <p>Ditch the paper notebooks and unorganized spreadsheets. With the muscle matrix app, you can keep track of all your exercises and weights with ease while tracking your progress over time.</p>
        </div>

        <div className='user_info'>
            <input placeholder='Username' className='login_credentials'></input>
            <input type='password' placeholder='Password' className='login_credentials'></input>
            <button className='login_button'>Log in</button>
        </div>

        <div className='create_account'>
            <p>Don't have an account?</p>
            <Link to='/signup'>
                <p>Create One</p>
            </Link>
        </div>

    </div>);
}