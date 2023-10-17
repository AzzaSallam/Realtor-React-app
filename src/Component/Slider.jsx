import {collection, getDocs, limit, orderBy, query} from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from 'swiper';
import {EffectFade , Autoplay,Navigation,Pagination} from "swiper/modules";
import "swiper/css/bundle";

import Spinner from '../Component/Spinner';

const Slider = ()=>{

    const [listings , setListings] = useState(null);
    const [loading , setLoading] = useState(true);
    SwiperCore.use([Autoplay, Navigation, Pagination]);
    const navigate = useNavigate();
    useEffect(()=>{
        async function fetchListing(){
            //get refrence
            const listingRef = collection(db , 'listings');
            //Create Query
            const q = query(listingRef , orderBy('timestamp' , 'desc') , limit(5));
            //execute the query (get docs from the query)
            const docSnap = await getDocs(q);
            let listingsarr = [];
            docSnap.forEach((doc) => {
                return listingsarr.push({
                    id: doc.id,
                    data : doc.data()
                });
            });
            setListings(listingsarr);
            setLoading(false);
        }
        fetchListing();
    },[ listings])

    if(loading){
        return <Spinner/>
    }

    if(listings.length === 0){
        return <></>
    }

    return(
        listings && (
            <>
                <Swiper slidesPerView={1} navigation pagination={{type : 'progressbar'}} effect='fade'
                        modules={[EffectFade]} autoplay={{delay : 3000}}>
                {listings.map(({id , data})=>(
                    <SwiperSlide key={id} onClick={()=> navigate(`/category/${data.type}/${id}`)}>
                        <div className='relative w-full h-[400px] overflow-hidden' style={{
                                background: `url(${data.imgUrls[0]}) center , no-repeat`,
                                backgroundSize :'cover'
                        }}>
                        </div>
                        <p className='text-[#f1faee] absolute top-3 left-2 font-medium max-w-[90%] bg-[#457b9d]
                                        shadow-lg opacity-90 p-2 rounded-br-3xl'>
                            {data.name}
                        </p>
                        <p className='text-[#f1faee] absolute bottom-3 left-2 font-medium max-w-[90%] bg-[#e63946]
                                        shadow-lg opacity-90 p-2 rounded-tr-3xl'>
                            ${data.discprice ?? data.regprice}
                            {data.type === 'rent' && ' / month'}
                        </p>
                    </SwiperSlide>
                ))}
                </Swiper>
            </>
        )
    )
}

export default Slider;