"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import Link from "next/link";
import { SiteLogo } from "@/components/svg";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {Icon} from "@iconify/react";
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";
import {signIn} from "next-auth/react";
import googleIcon from "@/public/images/auth/google.png";
import Image from "next/image";
import GithubIcon from "@/public/images/auth/github.png";
import facebook from "@/public/images/auth/facebook.png";
import twitter from "@/public/images/auth/twitter.png";

const schema = z.object({
    email: z.string().email({ message: "Your email is invalid." }),
    password: z.string().min(4),
});

const LoginForm = () => {
    const [isPending, startTransition] = React.useTransition();
    const [passwordType, setPasswordType] = React.useState("password");
    const isDesktop2xl = useMediaQuery("(max-width: 1530px)");

    const togglePasswordType = () => {
        if (passwordType === "text") {
            setPasswordType("password");
        } else if (passwordType === "password") {
            setPasswordType("text");
        }
    };
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        mode: "all",
        defaultValues: {
            email: "dashtail@codeshaper.net",
            password: "password",
        },
    });
    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const onSubmit = (data: any) => {
        console.log(data);
    }

    return (
        <div className="w-full py-10">
            <Link href="/dashboard" className="inline-block">
                <SiteLogo className="h-10 w-10 2xl:w-14 2xl:h-14 text-primary"/>
            </Link>
            <div className="2xl:mt-8 mt-6 2xl:text-3xl text-2xl font-bold text-default-900">
                Hey, Hello 👋
            </div>
            <div className="2xl:text-lg text-base text-default-600 mt-2 leading-6">
                Enter the information you entered while registering.
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-5 2xl:mt-7">
                <div>
                    <Label htmlFor="email" className="mb-2 font-medium text-default-600">
                        Email{" "}
                    </Label>
                    <Input
                        disabled={isPending}
                        {...register("email")}
                        type="email"
                        id="email"
                        className={cn("", {
                            "border-destructive": errors.email,
                        })}
                        size={!isDesktop2xl ? "xl" : "lg"}
                    />
                </div>
                {errors.email && (
                    <div className=" text-destructive mt-2">{errors.email.message}</div>
                )}

                <div className="mt-3.5">
                    <Label
                        htmlFor="password"
                        className="mb-2 font-medium text-default-600"
                    >
                        {" "}
                        Password{" "}
                    </Label>
                    <div className="relative">
                        <Input
                            disabled={isPending}
                            {...register("password")}
                            type={passwordType}
                            id="password"
                            className="peer "
                            size={!isDesktop2xl ? "xl" : "lg"}
                            placeholder=" "
                        />

                        <div
                            className="absolute top-1/2 -translate-y-1/2 ltr:right-4 rtl:left-4 cursor-pointer"
                            onClick={togglePasswordType}
                        >
                            {passwordType === "password" ? (
                                <Icon
                                    icon="heroicons:eye"
                                    className="w-5 h-5 text-default-400"
                                />
                            ) : (
                                <Icon
                                    icon="heroicons:eye-slash"
                                    className="w-5 h-5 text-default-400"
                                />
                            )}
                        </div>
                    </div>
                </div>
                {errors.password && (
                    <div className=" text-destructive mt-2">
                        {errors.password.message}
                    </div>
                )}

                <div className="mt-5  mb-8 flex flex-wrap gap-2">
                    <div className="flex-1 flex  items-center gap-1.5 ">
                        <Checkbox
                            size="sm"
                            className="border-default-300 mt-[1px]"
                            id="isRemebered"
                        />
                        <Label
                            htmlFor="isRemebered"
                            className="text-sm text-default-600 cursor-pointer whitespace-nowrap"
                        >
                            Remember me
                        </Label>
                    </div>
                    <Link href="/auth/forgot2" className="flex-none text-sm text-primary">
                        Forget Password?
                    </Link>
                </div>
                <Button
                    className="w-full"
                    disabled={isPending}
                    size={!isDesktop2xl ? "lg" : "md"}
                >
                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                    {isPending ? "Loading..." : "Sign In"}
                </Button>
            </form>
            <div className="mt-5 2xl:mt-8 flex flex-wrap justify-center gap-4">
                <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    className="rounded-full  border-default-300 hover:bg-transparent"
                    disabled={isPending}
                    onClick={() =>
                        signIn("google", {
                            callbackUrl: "/dashboard",
                        })
                    }
                >
                    <Image src={googleIcon} alt="google" className="w-5 h-5"/>
                </Button>
                <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    className="rounded-full  border-default-300 hover:bg-transparent"
                    disabled={isPending}
                    onClick={() =>
                        signIn("github", {
                            callbackUrl: "/dashboard",
                            redirect: false,
                        })
                    }
                >
                    <Image src={GithubIcon} alt="google" className="w-5 h-5"/>
                </Button>
                <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    className="rounded-full border-default-300 hover:bg-transparent"
                >
                    <Image src={facebook} alt="google" className="w-5 h-5"/>
                </Button>
                <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    className="rounded-full  border-default-300 hover:bg-transparent"
                >
                    <Image src={twitter} alt="google" className="w-5 h-5"/>
                </Button>
            </div>
            <div className="mt-5 2xl:mt-8 text-center text-base text-default-600">
                Don't have an account?{" "}
                <Link href="/auth/register2" className="text-primary">
                    {" "}
                    Sign Up{" "}
                </Link>
            </div>
        </div>
    )
}

export default LoginForm;