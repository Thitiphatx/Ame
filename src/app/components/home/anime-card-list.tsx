"use client"

import { AnimeListResponse } from "@/app/types";
import { Card, CardFooter, Chip, ScrollShadow, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { FreeMode, Grid } from "swiper/modules";

export default function AnimeCardList() {
    const [data, setData] = useState<AnimeListResponse[]>([]);
    const [error, setError] = useState();
    const router = useRouter();

    useEffect(()=> {
        const fetchData = async ()=> {
            try {
                const res = await fetch(`/api/anilist/animelist`);
                const list = await res.json();
                setData(list);
            } catch (error: any) {
                setError(error.message);
            }
        }
        fetchData();
    }, [])

    return (
        <>
        <div className="w-full">
            <h1 className="font-bold uppercase">trending</h1>
        </div>
        <div className="flex space-x-4 pb-4 w-full overflow-x-scroll scroll-smooth snap-x">
            {data.map((item)=> (
                <div key={item.id} className="min-w-52 space-y-3 cursor-pointer transition scale-95 hover:scale-100 snap-start" onClick={()=> router.push(`/anime/${item.id}`)}>
                    <div className="w-full h-72">
                        <img className="object-cover w-full h-full rounded-lg" alt={item.title.userPreferred} src={item.coverImage.large}/>
                    </div>
                    <div className="w-full">
                        <h2 className="truncate font-bold">{item.title.userPreferred}</h2>
                        <small>{item.episodes && `Episodes ${item.episodes}`}</small>
                    </div>
                </div>
            ))}
        </div>
        </>

        
        
    )
}