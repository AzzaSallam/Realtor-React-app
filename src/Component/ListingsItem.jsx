import Moment from "react-moment";
import { Link } from "react-router-dom";
import {MdLocationOn} from 'react-icons/md';
import {MdEdit} from 'react-icons/md';
import {FaTrash} from 'react-icons/fa';
import { useState } from "react";
import DeletePopup from "./DeletePopup";


const ListingItem = ({listing , id  , onConfirmDelete ,onEdit})=>{

    const [popup , setPopup] = useState(false);

    const popDeleted =(prevState)=>{
        setPopup(!prevState);
    }


    return<div>
        <li className="relative  m-[10px] bg-white shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150 ">
            <Link className="contant" to={`/category/${listing.type}/${id}`}>
            <img className=" h-[170px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in" src={listing.imgUrls[0]} loading="lazy" alt=""/>
            <Moment className="absolute top-2 left-2 bg-[#3377cc] text-white uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg" fromNow>{listing.timestamp?.toDate()}</Moment>
            <div className="w-full p-[10px]">
                <div className="flex items-center space-x-1">
                    <MdLocationOn className="h-4 w-4 text-green-600"/>
                    <p className="font-semibold text-sm mb-[2px] text-gray-600 truncate">{listing.address}</p>
                </div>
                <p className="font-semibold m-0 text-xl truncate">{listing.name}</p>
                {listing.offers && <del className="text-xs mt-2 font-semibold text-red-500">${listing.offers &&listing.regprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</del> }
                <div className="flex text-[#457b9d]  font-semibold">
                    { 
                        listing.offers ? (<p>${listing.discprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")  } </p>)
                                        :  (<p>${listing.regprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")  }</p>)
                    }
                    {listing.type === 'rent' && (<p>    /month</p>)}
                </div>
                <div className="flex items-center mt-[10px] space-x-3">
                    <div className="flex items-center space-x-1">
                        <p className="font-bold text-xs">{listing.bedrooms >1 ? `${listing.bedrooms} Beds ` : '1 Bed' }</p>
                    </div>
                    <div className="flex items-center space-x-1">
                        <p className="font-bold text-xs">{listing.bathrooms >1 ? `${listing.bathrooms} Baths ` : '1 Bath' }</p>
                    </div>
                </div>
            </div>
            </Link>
            {onConfirmDelete && <FaTrash className="absolute bottom-5 right-4 text-red-500 h-[15px] cursor-pointer" 
                                onClick={()=>setPopup(true)}
                        />
            }
            {onEdit && <MdEdit className="absolute bottom-5 right-11 text-blue-600 h-4 cursor-pointer" 
                                onClick={()=>onEdit(listing.id)}/>}
        </li>
        {/* popup to confirm deleted an item */}
        {popup && <DeletePopup onClick={popDeleted} onConfirm={()=>onConfirmDelete(listing.id)} />}
    </div>
}

export default ListingItem;