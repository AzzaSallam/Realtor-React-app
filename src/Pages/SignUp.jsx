import React from 'react'

import SignUpForm from '../Component/SignUpForm';
import signInImg from'../assets/formImgs/64663.jpg';

const SignUp = (props)=> {

    const containerClass ='flex justify-center items-center flex-wrap px-6 py-12 max-w-6xl mx-auto';

    return (
        <section>
            <h1 className='text-4xl text-center my-6 mb-2 font-bold text-red-500'>Sign <span className='text-black'>Up</span></h1>
            <div className={`${containerClass}`}>
                <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6 '>
                    <img src={signInImg} alt='key' className='w-full rounded-3xl'/>
                </div>
                <SignUpForm/>
            </div>
        </section>
    );
};

export default SignUp;