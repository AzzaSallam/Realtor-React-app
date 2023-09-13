import { useLocation , useNavigate } from 'react-router';
import React from 'react'

import logoimg from '../assets/logo/Screenshot 2023-09-12 042318.png';

export default function MainHeader() {

    const location = useLocation();
    const navigate = useNavigate();

    const matchLocation = (curRouter)=>{
        if(curRouter === location.pathname){
            return true;
        };
    }

    const activeClass = `${'text-black  border-b-[3px]  border-b-red-500  transition duration-300 ease-out hover:ease-in'}`;

    return (
        <div className='bg-white border-b shadow-sm sticky top-0 z-50 '>
            <header className='flex justify-between items-center px-3 max-w-6xl mx-auto'>
                <div>
                    <img src={logoimg} alt='logo' className='h-8 cursor-pointer' onClick={()=>navigate('/')}/>
                </div>
                <div>
                    <ul className='flex space-x-10 font-semibold text-gray-500 text-lg'>
                        <li onClick={()=>navigate('/')} className={`py-5 cursor-pointer hover:text-black ${matchLocation('/') && activeClass}`}>Home</li>
                        <li onClick={()=>navigate('/offers')} className={`py-5 cursor-pointer hover:text-black ${matchLocation('/offers') && activeClass}`}>Offers</li>
                        <li onClick={()=>navigate('/sign-in')} className={`py-5 cursor-pointer hover:text-black ${matchLocation('/sign-in') && activeClass}`}>Sign in</li>
                    </ul>
                </div>
            </header>
        </div>
    );
};
