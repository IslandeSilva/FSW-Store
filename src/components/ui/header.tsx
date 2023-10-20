"use client";

import { HomeIcon, ListOrderedIcon, LogInIcon, LogOutIcon, MenuIcon, Percent, PercentCircle, ShoppingCartIcon } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetClose } from "./sheet";
import { signIn, useSession, signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";

const Header = () => {

    const {status, data} = useSession();

    const handleLoginClick = async () => {
        await signIn();
    };

    const handleLogoutClick = async () => {
        await signOut();
    };


    return ( 
    
    <Card className="flex items-center justify-between p-[1.875rem]">

        <Sheet>
            <SheetTrigger asChild>
                <Button size="icon" variant="outline">
                    <MenuIcon />
                </Button> 
            </SheetTrigger>

            <SheetContent side="left">
                <SheetHeader className="text-left text-lg font-semibold">
                    Menu
                </SheetHeader>

                {status ==="authenticated" && data?.user && (
                   <div className="flex flex-col">
                    <div className="flex items-center gap-2 py-4">
                     <Avatar>
                        <AvatarFallback>
                            {data.user.name ?.[0].toUpperCase()}
                        </AvatarFallback>
                        {data.user.image && <AvatarImage src={data.user.image}/>}

                    </Avatar>
                    <div className="flex flex-col">
                    <p className="font-medium">{data.user.name}</p>
                    <p className="text-sm opacity-75">Boas compras!</p>
                    </div>
                    </div>
                    <Separator />
                   </div>
                )}
                
                   
            <div className="mt-4 flex flex-col gap-2">
                {status === "unauthenticated" && (
                    <Button onClick={handleLoginClick} variant="outline" className="w-full justify-start gap-2">
                    <LogInIcon size={16}/>
                        Fazer Login
                    </Button>
              )}
                {status ==="authenticated" && (
                    <Button onClick={handleLogoutClick} variant="outline" className="w-full justify-start gap-2">
                    <LogOutIcon size={16}/>
                        Fazer Logout
                    </Button>
              )}

                <SheetClose asChild>
                <Link href="/">
                <Button variant="outline" className="w-full justify-start gap-2">
                <HomeIcon />
                    Inicio
                </Button></Link>
                </SheetClose>

                <SheetClose asChild>
                <Button variant="outline" className="w-full justify-start gap-2">
                <Percent size={16} />
                    Ofertas
                </Button>
                </SheetClose>

                <SheetClose asChild>
                <Link href="/catalog">
                <Button variant="outline" className="w-full justify-start gap-2">
                <ListOrderedIcon />
                    Catálogo
                </Button>
                </Link>
                </SheetClose>

                

            </div>

            </SheetContent>

        </Sheet>

        <Link href="/">
            <h1 className="font-semibold text-lg">
            <span className="text-primary">FSW</span> Store</h1>
        </Link>

        <Button size="icon" variant="outline">
            <ShoppingCartIcon />
        </Button> 
    </Card>
    );
};
 
export default Header;