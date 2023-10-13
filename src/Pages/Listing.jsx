import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {doc, getDoc} from 'firebase/firestore';
import { db } from "../firebase";
import Spinner from "../Component/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from 'swiper';
import {EffectFade , Autoplay,Navigation,Pagination} from "swiper/modules";
import "swiper/css/bundle";
import {FaShare} from 'react-icons/fa'

import ListingInfo from "../Component/ListingInfo";

const Listing =()=>{
    const params = useParams();
    const [listing , setListing] = useState(null);
    const [loading , setLoading] = useState(true);
    const [copyLink , setCopyLink] = useState(false);
    SwiperCore.use([Autoplay, Navigation, Pagination]);
    useEffect(()=>{
        async function fetchListing() {
            const docRef = doc(db , 'listings' , params.listingId);
            const snapDoc = await getDoc(docRef);
            if(snapDoc.exists()){
                setListing(snapDoc.data());
                setLoading(false);
            }
        }
        fetchListing();
    },[params.listingId]);

    if(loading){
        return <Spinner/>
    }
    return(
        <main>
            <Swiper slidesPerView={1} navigation pagination={{ type: "progressbar" }} effect="fade" modules={[EffectFade]} autoplay={{ delay: 3000 }}>
                {listing.imgUrls.map((url , index)=>(
                    <SwiperSlide key={index}>
                        <div className="relative w-full overflow-hidden h-[400px]" style={{background: `url(${listing.imgUrls[index]}) center no-repeat`,backgroundSize: "cover"}}>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="fixed top-[13%] right-[3%] z-10 bg-white cursor-pointer border-2 border-gray-400 rounded-full w-12 h-12 flex justify-center items-center"
                onClick={()=>{navigator.clipboard.writeText(window.location.href);
                            setCopyLink(true);
                            setTimeout(()=>{
                                setCopyLink(false);
                            },3000)
                }} >
                <FaShare className="text-lg text-slate-500"/>
            </div>
            {copyLink && <p className="fixed top-[23%] right-[5%] font-semibold border-2 border-gray-400 rounded-lg text-slate-600 p-2 bg-white z-10">Link Copied</p>}
            <ListingInfo listing={listing} />
        </main>
    )
}

export default Listing;