"use client"

import Loading from "@/app/(pages)/(home)/loading";
import { AnimeListResponse } from "@/app/types";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

interface AnimeCardListParams {
    identity: {
        id: string,
        title: string,
    };
    items: AnimeListResponse[]
}

export default function AnimeCardList({ identity, items }: AnimeCardListParams) {
    const router = useRouter();

    return (
        <div className="w-full">
            <h1 className="font-bold uppercase">{identity.title}</h1>
            <div className="flex space-x-4 w-full overflow-x-scroll scroll-smooth snap-x">
                {items.map((item)=> (
                    <Card isPressable key={item.id} className="min-w-52 space-y-3 cursor-pointer transition scale-95 hover:scale-100 snap-start" onClick={()=> router.push(`/anime/${item.id}`)}>
                        <CardBody className="p-0">
                            <Image width={"100%"} className="object-cover h-72 rounded-lg" alt={item.title.userPreferred} src={item.coverImage.large}/>
                        </CardBody>
                        <CardFooter className="w-full flex flex-col items-start justify-start">
                            <h2 className="truncate font-bold w-full text-left">{item.title.userPreferred}</h2>
                            <small>{item.episodes ? `Episodes ${item.episodes}` : `On going`}</small>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}