"use client"

import FavoriteListCard from "@/app/components/user/favorite-list-card";
import ProfileCard from "@/app/components/user/profile-card";
import { AnilistIcon } from "@/app/icons";
import { Button, Image } from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Page() {
    const { data: session } = useSession();
    return (
        <div className="w-full bg-red-500">
            <ProfileCard />
            <FavoriteListCard />
        </div>
    )
}
