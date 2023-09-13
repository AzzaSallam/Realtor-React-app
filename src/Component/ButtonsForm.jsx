import React from 'react'
import { FcGoogle } from "react-icons/fc";


export default function ButtonsForm() {

        return<form >
                <button type='submit' 
                        className='w-full px-7 py-3 my-4 text-sm
                        text-white bg-blue-600 font-medium rounded 
                        shadow-md hover:bg-blue-700 transition duration-150 ease-in-out
                        active:bg-blue-800 uppercase'
                > Sign in </button>

                <div className='flex items-center before:border-t before:flex-1 before:border-gray-300
                                                after:border-t after:flex-1 after:border-gray-300'>
                <p className='text-center font-semibold mx-4'>OR</p>
                </div>

                <button type='submit' 
                        className='flex items-center justify-center w-full px-7 py-3 my-4 text-sm
                        text-white bg-red-700 font-medium rounded 
                        shadow-md hover:bg-red-800 transition duration-150 ease-in-out
                        active:bg-red-900 uppercase'
                ><FcGoogle className='bg-white mr-1 text-2xl rounded-full'/> Continue with google</button>
        </form>
}
