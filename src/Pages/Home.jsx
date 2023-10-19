import { useEffect, useState } from 'react';
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';

import { db } from '../firebase';
import Slider from '../Component/Slider';
import OffersSection from '../Component/OffersSection';
import PlacesRent from '../Component/PlacesRent';
import PlacesSale from '../Component/PlacesSale';

const Home = ()=> {
    const [offersListings , setOffersListings] = useState(null);
    const [rentListings , setRentListings] = useState(null);
    const [saleListings , setSaleListings] = useState(null);

//Fetching Offers Listings
    useEffect(()=>{
        async function fetchOffersListings() {
            try {
                const listingRef =collection (db , 'listings');
                const q = query(listingRef , where('offers' , '==' , true) , orderBy("timestamp" , "desc") , limit(4));
                const querySnap = await getDocs(q);
                const listings =[];
                querySnap.forEach((doc)=>{
                    return listings.push({
                        id:doc.id ,
                        data : doc.data(),
                    });
                });
                setOffersListings(listings);
            } catch (error) {
                console.log(error) 
            }
        }
        fetchOffersListings();
    },[offersListings])

//Fetching Places for Rent 
    useEffect(()=>{
        async function fetchRentListings() {
            try {
                const listingRef = collection(db , 'listings');
                const q = query(listingRef , where('type' , '==' , 'rent') , orderBy('timestamp' , 'desc') , limit(4));
                const querySnap = await getDocs(q);
                const listings=[];
                querySnap.forEach((doc)=>{
                    return listings.push({
                        id:doc.id,
                        data : doc.data()
                    });
                });
                setRentListings(listings);
            } catch (error) {
                console.log(error);
            }
        }
        fetchRentListings();
    },[rentListings])

//Fetching Places for Sale 
    useEffect(()=>{
        async function fetchSalePlaces() {
            try {
                const listingRef = collection(db , 'listings');
                const q = query(listingRef , where('type' , '==' , 'sale') , orderBy('timestamp' , 'desc') , limit(4));
                const querySnap = await getDocs(q);
                const listings=[];
                querySnap.forEach((doc)=>{
                    return listings.push({
                        id:doc.id,
                        data : doc.data()
                    });
                });
                setSaleListings(listings);
            } catch (error) {
                console.log(error);
            }
        }
        fetchSalePlaces();
    },[saleListings])


    return (
        <div>
            <Slider/>
            {/* Offers Section */}
            <div className='max-w-6xl mx-auto pt-4 space-y-6'>
                {offersListings && offersListings.length >0 && <OffersSection onOffer={offersListings}/>}
                {rentListings && rentListings.length >0 && <PlacesRent onRent={rentListings}/>}
                {saleListings && saleListings.length >0 && <PlacesSale onSale={saleListings}/>}
            </div>
        </div>
    );
};

export default Home;
