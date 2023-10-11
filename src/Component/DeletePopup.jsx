const DeletePopup =(props)=>{


    return(
        <div onClick={props.onClick} className='bg-black bg-opacity-30 z-50 fixed top-0 left-0 bottom-0 right-0'>
            <div className='absolute bg-white p-6 min-w-max  max-w-fit h-40 rounded-md flex flex-col items-center justify-center top-[50%] left-[50%]' style={{transform: "translate(-50%,-50%)"}}>
                <h1 className="font-bold mt-2">Are you sure you want to delete this listing ?  </h1>
                <div className="flex  items-center mt-6">
                    <button onClick={props.onConfirm}  className="rounded-md mr-5 font-semibold px-6 py-2 bg-red-500 text-white hover:bg-red-600 hover:shadow-md">
                        Delete
                    </button>
                    <button onClick={props.onClick} className="rounded-md ml-5 px-6 py-2 font-semibold bg-blue-500 text-white hover:bg-blue-600 hover:shadow-md">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )

}

export default DeletePopup ;