import React , {useState} from 'react';
import { Link } from 'react-router-dom';

import AuthButton from './AuthButton';


export default function ForgotPassForm() {
    const [enteredEmail , setEnteredEmail]=useState('');

    const emailChangeHandler =(event)=>{
        setEnteredEmail(event.target.value);
    }

    const onSubmitHandler=(e)=>{
        e.preventDefault();
}

    const inputClass ='w-full mb-6 px-4 py-2 text-xl text-gray-600 bg-white border-transparent border-b-gray-300  rounded transition ease-in-out';

    return <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
        <form onSubmit={onSubmitHandler}>
            <input type='email' 
                    placeholder='email@email.com' 
                    onChange={emailChangeHandler}
                    id='email' 
                    value={enteredEmail} 
                    className={`${inputClass}`}
            />
            
            <div className='flex justify-between flex-nowrap text-sm font-semibold mx-3 my-2 '>
                <p>Don't have an account? <Link to='/sign-up' className='text-blue-500 hover:text-blue-800 transition duration-200 ease-in-out'>Register</Link></p>
                <p><Link to='/sign-in' className='text-red-500 hover:text-red-700'>Sign in instead?</Link></p>
            </div>
            <button type='submit' 
                        className='w-full px-7 py-3 my-4 text-sm
                        text-white bg-blue-600 font-medium rounded 
                        shadow-md hover:bg-blue-700 transition duration-150 ease-in-out
                        active:bg-blue-800 uppercase'
                > Send reset email 
            </button>

            <AuthButton/>
        </form>
    </div>
};