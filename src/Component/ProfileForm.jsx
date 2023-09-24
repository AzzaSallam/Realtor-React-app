import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { db } from "../firebase";

const ProfileForm = ()=>{
    const navigate = useNavigate();
    const auth = getAuth();
    const [changeDetail , setChangeDetail] = useState(false);
    const [formData , setFormData] = useState({
        name :auth.currentUser.displayName,
        email : auth.currentUser.email
    });

    const {name , email} = formData;

    const signedOutHandler = ()=>{
        auth.signOut();
        navigate('/');
    }

    const onChangeHandler=(e)=>{
        setFormData((prevState)=>({
            ...prevState , 
            [e.target.id] : e.target.value,
        }))
    }

    const onSubmit =async ()=>{
        try {
            if(auth.currentUser.displayName !== name){
                //update display name in firebase auth
                await updateProfile(auth.currentUser , {
                    displayName:name,
                });
                //update name in fire store 
                const docRef = doc(db,'users' , auth.currentUser.uid);
                await updateDoc(docRef , {
                    name
                }); 
            }
            toast.success("Profile details updated");
        } catch (error) {
            toast.error("Could not update profile details");
        }
    }

    const inputClass ='w-full mb-6 px-4 py-2 text-xl text-gray-600 bg-white border-transparent border-b-gray-300  rounded transition ease-in-out';


    return<div className="w-full md:w-[50%] mx-auto px-3">
        <form>
            <input type='text' id="name" 
                    value={name} disabled={!changeDetail} 
                    onChange={onChangeHandler} 
                    className={` ${inputClass} ${changeDetail && 'bg-red-200 focus:bg-red-100 focus:outline-0'} `} />
            <input type='email' id="email" value={email} disabled className={`${inputClass}`} />
            <div className="flex justify-between whitespace-nowrap items-center font-bold mx-1">
                <p className="text-sm font-bold">Do you want change your name ?  
                    <span onClick={()=>{changeDetail && onSubmit();
                                    setChangeDetail((prevState)=>!prevState)
                                        }
                                    } 
                            className="text-blue-500 text-lg cursor-pointer hover:text-blue-800 
                                        transition duration-200 ease-in-out'">
                        {changeDetail ? ' Apply change' : ' Edit'}
                    </span>
                </p>
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