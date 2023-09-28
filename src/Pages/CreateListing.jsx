import { useState } from "react";

const CreateListing = ()=>{

    const [formData , setFormData] = useState({
        type:'rent',
        name:'',
        bedrooms:1,
        bathrooms:1,
        parking:false,
        furnished:false,
        address:"",
        description :"",
        offers :false,
        regprice:0,
        discprice:0
    });
    const {type , name ,bedrooms , bathrooms , parking , furnished , address , description , offers , regprice , discprice} = formData;

    const onChange=()=>{

    }

    const btnClass = 'px-7 py-3 rounded font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full';
    const inputClass ='w-full px-4 py-2 text-lg text-gray-700 bg-white border-transparent border-b-gray-400 rounded transition duration-150 ease-in-out focus:text-gray-700';


    return(
        <main className="max-w-md px-2 mx-auto">
            <h1 className='text-4xl text-center mt-5 font-bold text-red-500'>Create<span className='text-black'> Listing</span></h1>
            <form className="mb-7">
                {/* Sale or rent btns */}
                <div>
                    <p className="text-lg font-bold mt-6 mb-2">Sell<span className="text-red-500"> / </span>Rent </p>
                    <div className="flex">
                        <button type="button" id='type' value="sale" onClick={onChange} 
                                className={`mr-3 ${btnClass} ${type==='rent'? 'bg-white text-black' :'bg-slate-600 text-white' }`}>
                            sell
                        </button>
                        <button type="button" id='type' value="sale" onClick={onChange} 
                                className={`ml-3 ${btnClass} ${type==='sale'? 'bg-white text-black' :'bg-slate-600 text-white' }`}>
                            Rent
                        </button>
                    </div>
                </div>
                {/* Name Input */}
                <div>
                    <p className="text-lg font-bold mt-5 mb-2">Name</p>
                    <input type="text" placeholder="Name (5-30)" value={name} maxLength='30' minLength='5' 
                    id="name" onChange={onChange} required className={`${inputClass}`}/>
                </div>
                {/* Beds and Paths */}
                <div className="flex space-x-6 mb-6">
                    <div>
                        <p className="text-lg font-bold mt-6 mb-2">Bedrooms</p>
                        <input type="number" id="beds" value={bedrooms} onChange={onChange} min='1' max='50' required 
                                className="w-full mr-3 px-4 py-2 text-lg text-center text-gray-700 bg-white border-transparent border-b-gray-400 rounded transition duration-150 ease-in-out focus:bg-white "/>
                    </div>
                    <div>
                    <p className="text-lg font-bold mt-6 mb-2 ml-3">Bathrooms</p>
                        <input type="number" id="baths" value={bathrooms} onChange={onChange} min='1' max='50' required 
                                className="w-full ml-3 px-4 py-2 text-lg text-center text-gray-700 bg-white border-transparent border-b-gray-400 rounded transition duration-150 ease-in-out focus:bg-white "/>
                    </div>
                </div>
                {/* Parking Spot */}
                <div>
                    <p className="text-lg font-bold mt-6 mb-2">Parking spot</p>
                    <div className="flex">
                        <button type="button" id='parking' value={true} onClick={onChange} 
                                className={`mr-3 ${btnClass} ${!parking ? 'bg-white text-black' :'bg-slate-600 text-white' }`}>
                            Yes
                        </button>
                        <button type="button" id='parking' value={false} onClick={onChange} 
                                className={`ml-3 ${btnClass} ${parking ? 'bg-white text-black' :'bg-slate-600 text-white' }`}>
                            No
                        </button>
                    </div>
                </div>
                {/* Furnished */}
                <div>
                    <p className="text-lg font-bold mt-6 mb-2">Furnished</p>
                    <div className="flex">
                        <button type="button" id='furnished' value={true} onClick={onChange} 
                            className={`mr-3 ${btnClass} ${!furnished ? 'bg-white text-black' :'bg-slate-600 text-white' }`}>
                        Yes
                        </button>
                        <button type="button" id='furnished' value={false} onClick={onChange} 
                            className={`ml-3 ${btnClass} ${furnished ? 'bg-white text-black' :'bg-slate-600 text-white' }`}>
                        No
                        </button>
                    </div>
                </div>
                {/* Address feild */}
                <div>
                    <p className="text-lg font-bold mt-5 mb-2">Address</p>
                    <textarea type="text" placeholder="Adddress" value={address} 
                    id="address" onChange={onChange} required className={`${inputClass}`}/>
                </div>
                {/* Description feild */}
                <div>
                    <p className="text-lg font-bold mt-5 mb-2">Description</p>
                    <textarea type="text" placeholder="Description" value={description} 
                    id="description" onChange={onChange} required className={`${inputClass}`}/>
                </div>
                {/* Offers */}
                <div>
                    <p className="text-lg font-bold mt-6 mb-2">Offers</p>
                    <div className="flex">
                        <button type="button" id='offers' value={true} onClick={onChange} 
                                className={`mr-3 ${btnClass} ${!offers ? 'bg-white text-black' :'bg-slate-600 text-white' }`}>
                            Yes
                        </button>
                        <button type="button" id='offers' value={false} onClick={onChange} 
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
                        <input type="number" id="regprice" value={regprice} onChange={onChange} min='50' max='400000' required 
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
                        <input type="number" id="discprice" value={discprice} onChange={onChange} min='50' max='400000' required={offers} 
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
                <input type="file" id="img" onChange={onChange} accept=".jpg,.png ,.jpeg" multiple required 
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