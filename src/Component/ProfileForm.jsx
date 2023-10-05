import { getAuth, updateProfile } from "firebase/auth";
import { collection, doc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { db } from "../firebase";

import AddlistingButton from "./AddListingButton";
import ListingItem from "./ListingsItem";

const ProfileForm = ()=>{
    const navigate = useNavigate();
    const auth = getAuth();
    const [changeDetail , setChangeDetail] = useState(false);
    const [listings , setListings]=  useState(null);
    const [loading , setLoading] = useState(true);
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


    useEffect(()=>{
        async function fetchUserListings(){
            const listingRef = collection(db , 'listings');
            const q = query(
                listingRef ,
                where("userRef" , '==', auth.currentUser.uid),
                orderBy('timestamp' , 'desc')
            );
            const querySnap = await getDocs(q);
            let listings = [];
            querySnap.forEach(doc => {
                return listings.push({
                    id:doc.id,
                    data : doc.data()
                })
            });
            setListings(listings);
            setLoading(false);
        }

        fetchUserListings();
    },[auth.currentUser.uid])


    const inputClass ='w-full mb-6 px-4 py-2 text-xl text-gray-600 bg-white border-transparent border-b-gray-300  rounded transition ease-in-out';


    return<div className="w-full mt-5 px-3">
        <section className="max-w-6xl mx-auto flex justify-center items-center ">
            <form >
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
                <AddlistingButton/>
            </form>
        </section>
        {!loading && listings.length >0 &&(
            <div className="max-w-7xl px-3 mt-6 mx-auto">
                <h1 className=' text-4xl text-center  font-semibold text-red-500'>List<span className='text-black'>ings</span></h1>
                <ul className="mt-6 mb-6 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                    {listings.map((listing)=>(
                        <ListingItem key={listing.id} id={listing.id} listing={listing.data}/>
                    ))}
                </ul>
            </div>
        )}
    </div>
}

export default ProfileForm;