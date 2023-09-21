import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const ProfileForm = ()=>{
    const navigate = useNavigate();
    const auth = getAuth();

    const [formData , setFormData] = useState({
        name :auth.currentUser.displayName,
        email : auth.currentUser.email
    });

    const {name , email} = formData;

    const signedOutHandler = ()=>{
        auth.signOut();
        navigate('/');
    }

    const inputClass ='w-full mb-6 px-4 py-2 text-xl text-gray-600 bg-white border-transparent border-b-gray-300  rounded transition ease-in-out';


    return<div className="w-full md:w-[50%] mx-auto px-3">
        <form>
            <input type='text' id="name" value={name} disabled className={`${inputClass}`} />
            <input type='email' id="email" value={email} disabled className={`${inputClass}`} />
            <div className="flex justify-between whitespace-nowrap items-center font-bold mx-1">
                <p className="text-sm font-bold">Do you want change your name ? <span className="text-blue-500 text-lg cursor-pointer hover:text-blue-800 transition duration-200 ease-in-out'">Edit</span></p>
                <button type="button" 
                        onClick={signedOutHandler}
                        className="rounded-md px-6 py-2 bg-red-500
                        text-white hover:bg-red-700">
                    Sign out
                </button>
            </div>
        </form>
    </div>
}

export default ProfileForm;