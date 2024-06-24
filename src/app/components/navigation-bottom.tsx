"use client"

import { useState } from "react";
import { HomeFillIcon, HomeOutlineIcon, SearchFillIcon, SearchOutlineIcon, UserFillIcon, UserOutlineIcon } from "../icons"
import { NavigationPage } from "../types";
import { redirect, useRouter } from "next/navigation";

export default function NavigationBottom() {
    const [currentPage, setCurrentPage] = useState<NavigationPage>("/");
    const router = useRouter();
    const links = [
        {
            path: "/",
            icon: {
                outline: <HomeOutlineIcon />,
                fill: <HomeFillIcon />
            }
        },
        {
            path: "/search",
            icon: {
                outline: <SearchOutlineIcon />,
                fill: <SearchFillIcon />
            }
        },
        {
            path: "/user",
            icon: {
                outline: <UserOutlineIcon />,
                fill: <UserFillIcon />
            }
        },
    ]

    const switchPage = (page: NavigationPage)=> {
        setCurrentPage(page);
        router.push(page);
    }


    return (
        <div className="fixed bottom-0 left-0 w-full flex flex-row items-center bg-background z-50">
            {links.map((item)=> (
                <div key={item.path} className={`w-full p-5 flex flex-col justify-center items-center cursor-pointer ${(currentPage === item.path) && `border-t-1`}`} onClick={()=> switchPage(item.path)}>
                    {currentPage !== item.path && item.icon.outline}
                    {currentPage === item.path && item.icon.fill}
                </div>
            ))}
        </div>
    )
}
