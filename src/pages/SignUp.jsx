import '../stylesheets/login.css'
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';

export function SignUp() {

    return(<div className='login-body'>
        
        <div className='text-center'>
            <Image src="src/assets/MuscleMatrixLogoWhite.png" className='mm_logo'/>
            <h1 className='title'>Muscle Matrix</h1>
        </div>

        <div className='user_info'>
        <input type='email' placeholder='Email' className='login_credentials'></input>
            <input placeholder='Username' className='login_credentials'></input>
            <input type='password' placeholder='Password' className='login_credentials'></input>
            <input type='password' placeholder='Confirm Password' className='login_credentials'></input>
            <button className='login_button'>Sign up</button>
        </div>

        <div className='create_account'>
            <p>Already have an account?</p>
            <Link to='/'>
                <p>Log in</p>
            </Link>
        </div>

    </div>);

}