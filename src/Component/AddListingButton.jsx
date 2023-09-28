import { Link } from "react-router-dom";
import{FcHome} from 'react-icons/fc';

const AddlistingButton = ()=>{

    const btnClass = 'w-full bg-blue-600 text-white uppercase mt-6 px-5 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800';

    return(
        <button type="submit" className={`${btnClass}`}> 
            <Link to='/create-listing' className="flex justify-center items-center ">
                <FcHome className="mr-3 bg-red-300 text-3xl rounded-full p-1 border-2"/>
                Sell or rent your home
            </Link>
        </button>
    )
}

export default AddlistingButton;