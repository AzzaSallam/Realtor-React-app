import { Link } from "react-router-dom";
import ListingItem from "./ListingsItem";

const PlacesRent = ({onRent})=>{

    return(
        <div className="m-2 mb-6">
            <h1 className="font-semibold px-3 text-2xl mt-6 text-red-500">Places for rent</h1>
            <Link to='/category/rent'>
                <p className="px-3 text-sm font-semibold cursor-pointer text-blue-600 
                            hover:text-blue-800 transition duration-150 ease-in-out">
                    Show more places for rent
                </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {onRent.map((listing) =>(
                    <ListingItem key={listing.id} listing={listing.data} id={listing.id}/>
                    ))}
            </ul>
        </div>
    )
}

export default PlacesRent;