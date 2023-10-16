import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import {getAuth} from 'firebase/auth';
import { useState } from "react";
import { toast } from "react-toastify";
import {v4 as uuidv4} from 'uuid';
import {db} from '../firebase';

import Spinner from '../Component/Spinner';
import { useNavigate } from "react-router";

const CreateListing = ()=>{
    const auth = getAuth();
    const navigate = useNavigate();
    // const [geoLocationEnabled , setGeoLocationEnabled] = useState(false);
    const[loading , setLoading] = useState(false);
    const [formData , setFormData] = useState({
        type:'rent',
        name:'',
        bedrooms: 1 ,
        bathrooms: 1 ,
        parking:false,
        furnished:false,
        address:"",
        description :"",
        offers :false,
        regprice:0,
        discprice:0,
        imgs:{},
        
    });

    const {type , name , bedrooms , bathrooms , parking , furnished ,address , description , 
            offers , regprice , discprice, imgs } = formData;

    const onChangeInputsHandler=(e)=>{
        let bool =null;
        if(e.target.value === 'true'){
            bool=true;
        }
        if(e.target.value === 'false'){
            bool = false;
        }
        //files
        if(e.target.files){
            setFormData((prevstate)=>({
                ...prevstate , 
                imgs :e.target.files
            }));
        }
        //text,boolean,number
        if(!e.target.files){
            setFormData((prevstate)=>({
                ...prevstate , 
                [e.target.id] : bool ?? e.target.value,
            }))
        }
    }

    const onSubmitHandler =async (e)=>{
        e.preventDefault();
        setLoading(true);
        if(+discprice >= +regprice){
            setLoading(false);
            toast.error("Discounted price needs to be less than regular price");
            return
        }
        if(imgs.length >6){
            setLoading(false);
            toast.error("Maximum 6 images are allowed");
            return;
        }


        const storeImgs = async (img)=>{
            return new Promise((resolve , reject )=>{
                const storage = getStorage();
                const filename = `${auth.currentUser.uid}-${img.name}-${uuidv4()} `;
                const storageRef =ref(storage , filename);
                const uploadImg = uploadBytesResumable(storageRef , img);
                uploadImg.on('state_changed', 
                    (snapshot) => {
                        // Observe state change events such as progress, pause, and resume
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                            case "paused":
                                console.log("Upload is paused");
                                break;
                            case "running":
                                console.log("Upload is running");
                            break;
                        }
                    }, 
                    (error) => {
                        // Handle unsuccessful uploads
                        reject(error)
                    }, 
                    () => {
                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                        getDownloadURL(uploadImg.snapshot.ref).then((downloadURL) => {
                            resolve(downloadURL);
                        });
                    }
                    );
            })
        }

        const imgUrls = await  Promise.all(
            [...imgs].map((img)=>storeImgs(img))
            ).catch((error)=>{
                    setLoading(false);
                    toast.error("Images not uploaded");
                    return;
                });

        const formDataCopy ={
            ...formData,
            imgUrls,
            timestamp :serverTimestamp(),
            userRef: auth.currentUser.uid,
        };
        delete formDataCopy.imgs;
        !formDataCopy.offers && delete formDataCopy.discprice;
        const docRef = await addDoc(collection(db , 'listings'),formDataCopy);
        setLoading(false);
        toast.success("Listing created");
        navigate(`/category/${formDataCopy.type}/${docRef.id}`)
    }


    

    if(loading){
        return <Spinner/>
    }

    const btnClass = 'px-7 py-3 rounded font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full';
    const inputClass ='w-full px-4 py-2 text-lg text-gray-700 bg-white border-transparent border-b-gray-400 rounded transition duration-150 ease-in-out focus:text-gray-700';


    return(
        <main className="max-w-md px-2 mx-auto">
            <h1 className='text-4xl text-center mt-5 font-bold text-red-500'>Create<span className='text-black'> Listing</span></h1>
            <form onSubmit={onSubmitHandler} className="mb-7">
                {/* Sale or rent btns */}
                <div>
                    <p className="text-lg font-bold mt-6 mb-2">Sell<span className="text-red-500"> / </span>Rent </p>
                    <div className="flex">
                        <button type="button" id='type' value="sale" onClick={onChangeInputsHandler} 
                                className={`mr-3 ${btnClass} ${type==='rent'? 'bg-white text-black' :'bg-slate-600 text-white' }`}>
                            sell
                        </button>
                        <button type="button" id='type' value="rent" onClick={onChangeInputsHandler} 
                                className={`ml-3 ${btnClass} ${type==='sale'? 'bg-white text-black' :'bg-slate-600 text-white' }`}>
                            Rent
                        </button>
                    </div>
                </div>
                {/* Name Input */}
                <div>
                    <p className="text-lg font-bold mt-5 mb-2">Name</p>
                    <input type="text" placeholder="Name (5-30)" value={name} maxLength='30' minLength='5' 
                    id="name" onChange={onChangeInputsHandler} required className={`${inputClass}`}/>
                </div>
                {/* Beds and Paths */}
                <div className="flex space-x-6 mb-6">
                    <div>
                        <p className="text-lg font-bold mt-6 mb-2">Bedrooms</p>
                        <input type="number" id="bedrooms" value={bedrooms} onChange={onChangeInputsHandler} min="1" max="50" required
                                className="w-full mr-3 px-4 py-2 text-lg text-center text-gray-700 bg-white border-transparent border-b-gray-400 rounded transition duration-150 ease-in-out focus:bg-white "/>
                    </div>
                    <div>
                    <p className="text-lg font-bold mt-6 mb-2 ml-3">Bathrooms</p>
                        <input type="number" id="bathrooms" value={bathrooms} onChange={onChangeInputsHandler} min='1' max='50' required 
                                className="w-full ml-3 px-4 py-2 text-lg text-center text-gray-700 bg-white border-transparent border-b-gray-400 rounded transition duration-150 ease-in-out focus:bg-white "/>
                    </div>
                </div>
                {/* Parking Spot */}
                <div>
                    <p className="text-lg font-bold mt-6 mb-2">Parking spot</p>
                    <div className="flex">
                        <button type="button" id='parking' value={true} onClick={onChangeInputsHandler} 
                                className={`mr-3 ${btnClass} ${!parking ? 'bg-white text-black' :'bg-slate-600 text-white' }`}>
                            Yes
                        </button>
                        <button type="button" id='parking' value={false} onClick={onChangeInputsHandler} 
                                className={`ml-3 ${btnClass} ${parking ? 'bg-white text-black' :'bg-slate-600 text-white' }`}>
                            No
                        </button>
                    </div>
                </div>
                {/* Furnished */}
                <div>
                    <p className="text-lg font-bold mt-6 mb-2">Furnished</p>
                    <div className="flex">
                        <button type="button" id='furnished' value={true} onClick={onChangeInputsHandler} 
                            className={`mr-3 ${btnClass} ${!furnished ? 'bg-white text-black' :'bg-slate-600 text-white' }`}>
                        Yes
                        </button>
                        <button type="button" id='furnished' value={false} onClick={onChangeInputsHandler} 
                            className={`ml-3 ${btnClass} ${furnished ? 'bg-white text-black' :'bg-slate-600 text-white' }`}>
                        No
                        </button>
                    </div>
                </div>
                {/* Address feild */}
                <div>
                    <p className="text-lg font-bold mt-5 mb-2">Address</p>
                    <textarea type="text" placeholder="Adddress" value={address} 
                    id="address" onChange={onChangeInputsHandler} required className={`${inputClass}`}/>
                </div>
                {/* GeoLocation Enable */}
                {/* {!geoLocationEnabled &&(
                    <div className="flex space-x-6">
                        <div>
                            <p className="text-lg font-bold mt-6 mb-2">Latitude</p>
                            <input type="number" id="latitude" value={latitude} onChange={onChangeInputsHandler} min='-90' max='90' required 
                                className="w-full mr-3 px-4 py-2 text-lg text-center text-gray-700 bg-white border-transparent border-b-gray-400 rounded transition duration-150 ease-in-out focus:bg-white "/>
                        </div>
                        <div>
                            <p className="text-lg font-bold mt-6 mb-2">Longitude</p>
                            <input type="number" id="longitude" value={longitude} onChange={onChangeInputsHandler} min='-180' max='180' required 
                                className="w-full mr-3 px-4 py-2 text-lg text-center text-gray-700 bg-white border-transparent border-b-gray-400 rounded transition duration-150 ease-in-out focus:bg-white "/>
                        </div>
                    </div>
                )} */}
                {/* Description feild */}
                <div>
                    <p className="text-lg font-bold mt-5 mb-2">Description</p>
                    <textarea type="text" placeholder="Description" value={description} 
                    id="description" onChange={onChangeInputsHandler} required className={`${inputClass}`}/>
                </div>
                {/* Offers */}
                <div>
                    <p className="text-lg font-bold mt-6 mb-2">Offers</p>
                    <div className="flex">
                        <button type="button" id='offers' value={true} onClick={onChangeInputsHandler} 
                                className={`mr-3 ${btnClass} ${!offers ? 'bg-white text-black' :'bg-slate-600 text-white' }`}>
                            Yes
                        </button>
                        <button type="button" id='offers' value={false} onClick={onChangeInputsHandler} 
                                className={`ml-3 ${btnClass} ${offers ? 'bg-white text-black' :'bg-slate-600 text-white' }`}>
                            No
                        </button>
                    </div>
                </div>
                {/* Regular price */}
                <div>
                    <p className="text-lg font-bold mt-6 mb-2">Regular Price</p>
                    <div className="flex space-x-6  items-center w-full">
                        <div>
                        <input type="number" id="regprice" value={regprice} onChange={onChangeInputsHandler} min='50' max='400000' required 
                                className="w-full mr-3 px-4 py-2 text-lg text-center text-gray-700 bg-white border-transparent border-b-gray-400 rounded transition duration-150 ease-in-out focus:bg-white "/>
                        </div>
                        {type==='rent' &&(
                            <div> 
                                <p className=" w-full whitespace-nowra text-red-500 font-bold font-lg">$ / Month</p>
                            </div>
                        )}
                    
                    </div>
                </div>
                {/* Discount Price If there are offers */}
                {offers &&(
                    <div>
                    <p className="text-lg font-bold mt-6 mb-2">Discounted Price</p>
                    <div className="flex space-x-6  items-center w-full">
                        <div>
                        <input type="number" id="discprice" value={discprice} onChange={onChangeInputsHandler} min='50' max='400000' required={offers} 
                                className="w-full mr-3 px-4 py-2 text-lg text-center text-gray-700 bg-white border-transparent border-b-gray-400 rounded transition duration-150 ease-in-out focus:bg-white "/>
                        </div>
                        {type==='rent' &&(
                            <div> 
                                <p className=" w-full whitespace-nowra text-red-500 font-bold font-lg">$ / Month</p>
                            </div>
                        )}
                    
                    </div>
                </div>
                )}
                {/* Upload images */}
                <div>
                <p className="text-lg font-bold mt-6 mb-2">Images</p>
                <p className="text-gray-600 text-sm">The first image will be the cover (max 6)</p>
                <input type="file" id="imgs" onChange={onChangeInputsHandler} accept=".jpg,.png ,.jpeg" multiple required 
                        className="w-full px-3 py-1.5 text-sm cursor-pointer text-gray-700 bg-white border border-b-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:border-transparent"/>
                </div>
                {/* Submit Button to create the listing */}
                <button type="submit" className="w-full mt-7 mb-4 px-7 py-3 bg-blue-600 text-white uppercase 
                        rounded shadow-md hover:shadow-lg hover:bg-blue-700 focus:shadow-lg 
                        focus:bg-blue-700 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                    Create listing
                </button>
            </form>
        </main>
    );
}

export default CreateListing;