import { Card } from "@nextui-org/react";

export default function FavoriteListCard() {
    const item = [1,2,3,4,5,6,7,78,2,2,1,2,3,4,5,1,2,3,4,2]
    return (
        <div className="grid grid-cols-6 gap-10">
            {item.map((item)=> (
                <Card className="w-full h-80">
                
                </Card>
            ))}
        </div>
    )
}
