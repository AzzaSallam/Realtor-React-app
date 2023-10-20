import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import { toast } from 'react-toastify';
import Spinner from '../Component/Spinner';
import ListingItem from '../Component/ListingsItem';
import { useParams } from 'react-router-dom';

const Category = ()=> {

    const[loading , setLoading] = useState(true);
    const[listings , setListings]= useState(null);
    const [lastListing , setLastListing] = useState(null);
    const params = useParams();

    useEffect(()=>{
        async function fetchListings() {
            try {
                const listingRef = collection(db , 'listings');
                const q = query(listingRef , 
                        where('type' , '==' , params.categoryName) , 
                        orderBy('timestamp' , 'desc') , 
                        limit(8));
                const querySnap =await getDocs(q);
                const lastListingVisible = querySnap.docs[querySnap.docs.length - 1];
                setLastListing(lastListingVisible);
                const listingsarr=[];
                querySnap.forEach((doc)=>{
                    return listingsarr.push({
                        id : doc.id,
                        data : doc.data(),
                    });
                });
                setListings(listingsarr);
                setLoading(false);
            } catch (error) {
                toast.error("Could not fetch listing");
            }
        }
        fetchListings();
    },[params.categoryName]);

    //fetch more function
    const fetchMoreListings =async ()=>{
        try {
            const listingRef = collection(db , 'listings');
            const q = query(listingRef , where('type' , '==' , params.categoryName) , 
                            orderBy('timestamp' , 'desc') , limit(4));
            const querySnap = getDocs(q);
            const lastListingVisible = querySnap.docs[ querySnap.docs.length - 1 ];
            lastListing(lastListingVisible);
            const listingsarr = [];
            querySnap.forEach((doc)=>{
                return listingsarr.push({
                    id : doc.id,
                    data : doc.data()
                })
            })
            setListings((prevState)=>[...prevState , ...listingsarr]);
            setLoading(false)
        } catch (error) {
            toast.error("There are no more listing");
        }
    }

    return (
        <div className='max-w-6xl mx-auto px-3'>
            <h1 className='text-4xl text-center my-7 mb-2 font-bold text-red-500'>
                {params.categoryName === 'rent' ? 'Places fot rent' 
                                                : 'places for sale'}
            </h1>
            {loading ? (
                <Spinner/>
            ) : listings && listings.length >0 ? (
                <>
                    <main>
                        <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
                            {listings.map((listing)=>(
                                <ListingItem key={listing.id} id={listing.id} listing={listing.data}/>
                            ))}
                        </ul>
                    </main>
                    {lastListing && (
                        <div className='flex justify-center items-center'>
                            <button onClick={fetchMoreListings}
                                    className='bg-white px-3 py-2 text-gray-700 border border-gray-300
                                                my-6 hover:border-slate-600 rounded transition duration-150 ease-in-out'>
                                Load more
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <p>There are no current offers</p>
            )
            }
        </div>
    );
};

export default Category;