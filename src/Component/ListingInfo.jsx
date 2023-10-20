import {FaMapMarkerAlt ,FaBed , FaBath , FaParking , FaChair} from 'react-icons/fa';
import BtnContactLandLoard from './BtnContactLandLoard';
import { getAuth } from 'firebase/auth';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';


const ListingInfo =({listing})=>{

    const auth = getAuth();
    const position = [26.7  , 30.75];



    return(
        <div className="m-4 max-w-6xl flex flex-col md:flex-row lg:mx-auto p-5 rounded-lg shadow-lg bg-white lg:space-x-5 ">
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
                <ul className='flex items-center space-x-2 flex-wrap sm:space-x-10 text-sm font-semibold '>
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
            <div className="w-full mt-4 md:mt-1 ml-2 h-[200px] md:h-[400px] rounded  z-10 overflow-x-hidden">
                <MapContainer center={position} 
                                zoom={6} scrollWheelZoom={false}
                                style={{height:'100%' , with:'100%'}}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>

            </div>
        </div>
)}

export default ListingInfo;