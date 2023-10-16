import {FaMapMarkerAlt ,FaBed , FaBath , FaParking , FaChair} from 'react-icons/fa';
import BtnContactLandLoard from './BtnContactLandLoard';
import { getAuth } from 'firebase/auth';

const ListingInfo =({listing})=>{

    const auth = getAuth();

    return(
        <div className="m-4 max-w-6xl flex flex-col md:flex-row lg:mx-auto p-4 rounded-lg shadow-lg bg-white lg:space-x-5 ">
            <div className=" w-full pr-2 mb-2 ">
                <p className="font-bold text-2xl mb-3 text-blue-900">
                    {listing.name} - $ {listing.offers? listing.discprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                                    : listing.regprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    {listing.type === 'rent'? " / month" : "" }
                </p>
                <p className='flex items-center font-semibold'>
                    <FaMapMarkerAlt className='text-green-700 mr-1'/>
                    {listing.address}
                </p>
                <div className='flex items-center mt-3 space-x-4 w-[75%] justify-start'>
                    <p className='bg-red-800 font-semibold w-full max-w-[200px] rounded-md p-1 text-white text-center shadow-lg'>
                        {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                    </p>
                    {listing.offers && (
                    <p className='bg-green-800 font-semibold w-full max-w-[200px] rounded-md p-1 text-white text-center shadow-lg'>
                        $ {+listing.regprice - +listing.discprice}  discount
                    </p>
                    )}
                </div>
                <p className='mt-3 mb-3'>
                    <span className='font-semibold'>Description - </span>
                    {listing.description}
                </p>
                <ul className='flex items-center space-x-2 sm:space-x-10 text-sm font-semibold '>
                    <li className='flex items-center whitespace-nowrap'>
                        <FaBed className='text-lg mr-1'/>
                        {+listing.bedrooms >1 ? `${listing.bedrooms} Beds ` : '1 Bed'}
                    </li>
                    <li className='flex items-center whitespace-nowrap'>
                        <FaBath className='text-lg mr-1'/>
                        {+listing.bathrooms >1 ? `${listing.bathrooms} Baths ` : '1 Bath'}
                    </li>
                    <li className='flex items-center whitespace-nowrap'>
                        <FaParking className='text-lg mr-1'/>
                        {listing.parking ? 'Parking spot' : 'No Parking'}
                    </li>
                    <li className='flex items-center whitespace-nowrap'>
                        <FaChair className='text-lg mr-1'/>
                        {listing.furnished ? 'Furnished' : 'Not Furnished'}
                    </li>
                </ul>
                {listing.userRef !== auth.currentUser?.uid && <BtnContactLandLoard listing={listing} userRef={listing.userRef}/>}
            </div>
            <div className="bg-blue-300 w-full h-[200px] lg[400px] z-10 overflow-x-hidden">
            </div>
        </div>
)}

export default ListingInfo;