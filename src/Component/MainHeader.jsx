import {  useLocation , useNavigate } from 'react-router';
import React, { useEffect, useState } from 'react';
import {getAuth, onAuthStateChanged} from 'firebase/auth';

import logoimg from '../assets/logo/Screenshot 2023-09-12 042318.png';

export default function MainHeader() {
    const [pageState , setPageState] = useState('Sign in');
    const location = useLocation();
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(()=>{
        onAuthStateChanged(auth , (user)=>{
            if(user){
                setPageState("Profile")
            }else{
                setPageState("Sign in")
            }
        })
    }, [auth] )

    const matchLocation = (curRouter)=>{
        if(curRouter === location.pathname){
            return true;
        };
    }

    const activeClass = `${'text-black  border-b-[3px] border-b-red-500  transition duration-300 ease-out hover:ease-in'}`;

    return (
        <div className='bg-white border-b shadow-sm sticky top-0 z-40 '>
            <header className='flex justify-between items-center px-3 max-w-6xl mx-auto'>
                <div>
                    <img src={logoimg} alt='logo' className='h-5 lg:h-7 cursor-pointer' onClick={()=>navigate('/')}/>
                </div>
                <div>
                    <ul className='flex space-x-10  font-semibold text-gray-500 text-sm lg:text-lg'>
                        <li onClick={()=>navigate('/')} className={`py-3 cursor-pointer hover:text-black ${matchLocation('/') && activeClass}`}>Home</li>
                        <li onClick={()=>navigate('/offers')} className={`py-3 cursor-pointer hover:text-black ${matchLocation('/offers') && activeClass}`}>Offers</li>
                        <li onClick={()=>navigate('/profile')} className={`py-3 cursor-pointer hover:text-black ${(matchLocation('/sign-in')||matchLocation('/profile')) && activeClass}`}>{pageState}</li>
                    </ul>
                </div>
            </header>
        </div>
    );
};
