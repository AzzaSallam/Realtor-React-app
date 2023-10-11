import spinner from '../assets/svg/spinner.svg';

const Spinner = ()=>{
    return<div className='bg-black bg-opacity-70 fixed flex justify-center items-center z-45 left-0 right-0 top-0 bottom-0'>
        <div>
            <img src={spinner} alt='Loadings....' className='h-24'/>
        </div>
    </div>
}

export default Spinner;