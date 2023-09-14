import React from 'react';
import { useNavigate } from 'react-router';
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

import { FcGoogle } from "react-icons/fc";
import { toast } from 'react-toastify';


export default function AuthButton() {

        const navigate = useNavigate();
        
        const googleAuthHandler = async()=>{
                try{
                        const auth = getAuth();
                        const provider = new GoogleAuthProvider();
                        const result = await signInWithPopup(auth , provider);
                        const user = result.user;
                        
                        //check if user exist 

                        const docRef = doc(db , 'users' , user.uid);
                        const docSnap = await getDoc(docRef);

                        if(!docSnap.exists()){
                                await setDoc(docRef , {
                                        name:user.displayName,
                                        email:user.email, 
                                        timestamp: serverTimestamp()
                                });
                        }
                        toast.success("Sign up with Google was successful");
                        navigate("/");

                }catch(error){
                        toast.error("Could not authorize with Google !");
                        console.log(error)
                }
        }

        return<form>

                <div className='flex items-center before:border-t before:flex-1 before:border-gray-300
                                        after:border-t after:flex-1 after:border-gray-300'>
                <p className='text-center font-semibold mx-4'>OR</p>
                </div>

                <button onClick={googleAuthHandler} type='button' 
                className='flex items-center justify-center w-full px-7 py-3 my-4 text-sm
                text-white bg-red-700 font-medium rounded 
                shadow-md hover:bg-red-800 transition duration-150 ease-in-out
                active:bg-red-900 uppercase'
                ><FcGoogle className='bg-white mr-1 text-2xl rounded-full'/> Continue with google</button>
        </form>
}
