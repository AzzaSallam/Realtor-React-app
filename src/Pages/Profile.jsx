import React from 'react'
import ProfileForm from '../Component/ProfileForm';

const Profile = ()=> {
    return (
        <main>
            <h1 className='text-4xl text-center mt-5 font-bold text-red-500'>My<span className='text-black'> Profile</span></h1>
            <section className="max-w-6xl mx-auto flex justify-center items-center ">
            <ProfileForm/>
            </section>
        </main>
    );
};

export default Profile;