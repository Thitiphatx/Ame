"use client"
import { AnilistIcon, LogoutIcon } from "@/app/icons";
import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function ProfileCard() {
    const { data: session } = useSession();
    return (
        <Card radius="sm">
            <CardBody className="flex flex-col justify-center items-center gap-2">
                <Image alt={session?.user?.name ?? ""} src={session?.user?.image ?? ""} radius="sm"/>
                <h1 className="font-bold text-xl">{session?.user?.name}</h1>
            </CardBody>
            <CardFooter className="flex flex-col justify-center items-center">
                {!session && <Button onClick={()=> signIn("anilist")} size="lg" radius="sm" className="text-small font-bold bg-black hover:bg-primary">Login with <AnilistIcon /></Button>}
                {session && <Button onClick={()=> signOut()} size="lg" radius="sm" className="text-small font-bold bg-black hover:bg-danger">Log out <LogoutIcon /></Button>}
            </CardFooter>
        </Card>
    )
}
