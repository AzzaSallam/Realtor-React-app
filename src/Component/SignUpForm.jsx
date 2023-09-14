import React , {useState} from 'react';
import { Link , useNavigate} from 'react-router-dom';
import { getAuth , createUserWithEmailAndPassword , updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import {db} from '../firebase';

import { AiFillEye , AiFillEyeInvisible } from "react-icons/ai";
import { toast } from 'react-toastify';

import AuthButton from './AuthButton';


export default function SignUpForm() {
    const navigate = useNavigate();
    const [showPassword , setShoePassword]=useState(false);

    const [formData , setFormData]=useState({
        name:"",
        email:"",
        password:""
    });

        const {name ,email , password} = formData;

    const emailChangeHandler =(event)=>{
        setFormData((prev)=>({
            ...prev,
            [event.target.id] : event.target.value,
        }));
    }

    const showPasswordHandler = ()=>{
        setShoePassword((prevState)=>!prevState);
    }

    const onSubmitHandler= async (e)=>{
        e.preventDefault();
        try{
            const auth = getAuth();
            const userCredential =await createUserWithEmailAndPassword(auth , email , password);
            updateProfile(auth.currentUser , {
                displayName: name
            });
            const user = userCredential.user;
            const formDataCopy = {...formData};
            delete formDataCopy.password;
            formDataCopy.timestamp = serverTimestamp();
            await setDoc(doc(db , 'users' , user.uid) , formDataCopy);
            toast.success("Sign up was successful");
            navigate('/');
        }catch(error){
            toast.error("Something went wrong.!");
        }
    }



    const inputClass ='w-full mb-6 px-4 py-2 text-xl text-gray-600 bg-white border-transparent border-b-gray-300  rounded transition ease-in-out';
    const passwordIconClass ='absolute right-3 top-3 text-xl cursor-pointer transition ease-in-out'; 


    return <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
        <form onSubmit={onSubmitHandler}>
            <input type='text' 
                    placeholder='Full name' 
                    onChange={emailChangeHandler}
                    id='name' 
                    value={name} 
                    className={`${inputClass}`}
            />
            <input type='email' 
                    placeholder='email@email.com' 
                    onChange={emailChangeHandler}
                    id='email' 
                    value={email} 
                    className={`${inputClass}`}
            />
            <div className='relative mb-5'>
                <input type={showPassword ? 'text' : 'password'} 
                        placeholder='your password' 
                        onChange={emailChangeHandler}
                        id='password' 
                        value={password} 
                        className={`${inputClass}`}
                />
                {showPassword ?
                    <AiFillEye onClick={showPasswordHandler} className={`${passwordIconClass} text-red-700`} />
                    : <AiFillEyeInvisible onClick={showPasswordHandler} className={`${passwordIconClass} gray-red-700`}/> 
                }
            </div>
            <div className='flex justify-between flex-nowrap text-sm font-semibold mx-3 my-2 '>
                <p>have an account? <Link to='/sign-in' className='text-blue-500 hover:text-blue-800 transition duration-200 ease-in-out'>Sign in</Link></p>
                <p><Link to='/forgot-password' className='text-red-500 hover:text-red-700'>Forgot password?</Link></p>
            </div>
            {/* Buttons Form */}
            <div> 
                <button type='submit' 
                className='w-full px-7 py-3 my-4 text-sm
                text-white bg-blue-600 font-medium rounded 
                shadow-md hover:bg-blue-700 transition duration-150 ease-in-out
                active:bg-blue-800 uppercase'
                > Sign up </button>

                <AuthButton/>
            </div>
        </form>
    </div>
};