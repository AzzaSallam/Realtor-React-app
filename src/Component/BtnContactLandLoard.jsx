import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { toast } from "react-toastify";

const BtnContactLandLoard =({listing , userRef})=>{

    const [contactLandloard , setContactLandloard] = useState(false);
    const [landlord , setLandlord]= useState(null);
    const [message , setMessage]= useState("");

    useEffect(()=>{
        async function contactLandloard(){
            const docRef = doc(db , 'users' , userRef);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
                setLandlord(docSnap.data());
            }else{
                toast.error("Could not get landlord data");
            }
        }
        contactLandloard();
    },[userRef])

    const onChangeHandller=(e)=>{
        setMessage(e.target.value);
    }

    const btnClass = "w-full ml-1 sm:ml-0 bg-blue-600 text-white uppercase px-7 py-3 font-medium text-sm rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg text-center transition duration-150 ease-in-out";

    return(
        <div >
            {!contactLandloard && <button onClick={()=>{setContactLandloard(true)}}
                className={`${btnClass} mt-6`} >
                Contact Landlord
            </button>}

            {contactLandloard && landlord !== null &&(
                <div className="flex flex-col w-full mt-4"> 
                    <p className="font-semibold text-blue-700">Contact {landlord.name} for the {listing.name.toLowerCase()}</p>
                    <textarea name="message" id="message"  rows="2" value={message} onChange={onChangeHandller}
                                className="w-full mt-2 mb-5 text-gray-700 text-xl px-4 py-2 bg-white border-gray-600 
                                rounded transition duration-150  ease-in-out focus:text-gray-700 ">
                    </textarea>
                    <a href={`mailto:${landlord.email}?Subject=${listing.name}&body=${message}`}>
                        <button type="button" className={`${btnClass}`}>Send Message</button>
                    </a>
                </div>
            )}
        </div>
)}
export default BtnContactLandLoard;