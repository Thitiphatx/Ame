import { Button, Card, CardBody, CardFooter, Skeleton } from "@nextui-org/react"

export default function Loading() {
    const data = [1,2,3,4,5,6];
    return (
        <div className="w-full">
            <div className="w-full h-64 shadow-[inset_0px_-40px_40px_0px_#000000] absolute">
            </div>
            <Skeleton isLoaded={false}>
                <div className="relative z-0 w-full h-64">
                    asd
                </div>
            </Skeleton>

            <div className="max-w-screen-xl mx-auto px-5 grid md:grid-cols-3 lg:grid-cols-5 grid-rows-1 gap-2">
                <div className="flex flex-col gap-5 w-full -translate-y-20">
                    <Skeleton isLoaded={false} className="rounded-lg">
                        <div className="w-full h-80 shadow-md rounded-lg">
                        </div>
                    </Skeleton>
                    <Skeleton isLoaded={false} className="rounded-lg">
                        <Button variant="shadow">Add to favorite</Button>
                    </Skeleton>
                </div>
                <div className="md:col-span-2 lg:col-span-4 p-5 space-y-5">
                    <Skeleton isLoaded={false} className="rounded-lg">
                        <h1 className="text-xl font-bold">placeholder</h1>
                    </Skeleton>
                    <Skeleton isLoaded={false} className="rounded-lg">
                    <small className="italic">placeholder</small>
                    </Skeleton>
                    <Skeleton isLoaded={false} className="rounded-lg">
                        <p>placeholder</p>
                        <p>placeholder</p>
                        <p>placeholder</p>
                        <p>placeholder</p>
                        <p>placeholder</p>
                    </Skeleton>
                </div>
            </div>
            <div className="max-w-screen-xl mx-auto px-5">
                <div className="w-full flex items-center justify-between py-5">
                    <h5 className="font-bold text-lg">Episodes</h5>
                </div>
                <div>
                    <div className="flex gap-2">
                        {data.map((ep, index)=> (
                            <Card isPressable key={index} className="min-w-40">
                                <CardBody className="p-0">
                                    <Skeleton isLoaded={false} className="rounded-lg">
                                        <div className="relative object-cover h-24 w-full rounded-lg">
                                        </div>
                                    </Skeleton>
                                </CardBody>
                                <CardFooter className="p-2 flex flex-col justify-start items-start gap-1">
                                    <Skeleton isLoaded={false} className="rounded-lg h-4">
                                        <h3 className="truncate text-sm w-full">title placeholder{ep}</h3>
                                    </Skeleton>
                                    <Skeleton isLoaded={false} className="rounded-lg h-4">
                                        <small className="font-bold">Episode {ep}</small>
                                    </Skeleton>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}