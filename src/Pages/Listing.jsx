import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {doc, getDoc} from 'firebase/firestore';
import { db } from "../firebase";
import Spinner from "../Component/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from 'swiper';
import {EffectFade , Autoplay,Navigation,Pagination} from "swiper/modules";
import "swiper/css/bundle";

const Listing =()=>{
    const params = useParams();
    const [listing , setListing] = useState(null);
    const [loading , setLoading] = useState(true);
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
                        <div className="w-full overflow-hidden h-[400px]" style={{background: `url(${listing.imgUrls[index]}) center no-repeat`,backgroundSize: "cover"}}>

                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </main>
    )
}

export default Listing;