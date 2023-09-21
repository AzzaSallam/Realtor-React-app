import React from 'react'
import ProfileForm from '../Component/ProfileForm';

const Profile = ()=> {
    return (
        <>
            <h1 className='text-4xl text-center my-7 font-bold text-red-500'>My<span className='text-black'> Profile</span></h1>
            <section className="max-w-6xl mx-auto ">
            <ProfileForm/>
            </section>
        </>
    );
};

export default Profile;