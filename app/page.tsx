"use client";
import { create } from "zustand";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";

const Home = () => {
    const userData = z.object({
        id: z.number(),
        name: z.string(),
        email: z.string().email().toLowerCase(),
        username: z.string().toLowerCase(),
        phone: z.string(),
        website: z.string().transform((url) => {
            return `https://${url}`;
        }),
        company: z.object({
            name: z.string(),
            catchPhrase: z.string(),
            bs: z.string(),
        }),
        address: z.object({
            street: z.string(),
            suite: z.string(),
            city: z.string(),
            zipcode: z.string(),
            geo: z.object({
                lat: z.string(),
                lng: z.string(),
            }),
        }),
    });
    type user = z.infer<typeof userData>;
    interface Ustore {
        users: user[];
        setUser: (users: user[]) => void;
    }
    const userStore = create<Ustore>((set) => ({
        users: [],
        setUser: (users) => set({ users }),
    }));

    const usersData = z.array(userData);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            const { data: dt } = await axios.get(
                "https://jsonplaceholder.typicode.com/users"
            );
            // console.log(userStore.getState());
            return usersData.parse(dt);
        },
    });

    const content = (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-8">
            {data &&
                data.map((user) => {
                    return (
                        <div
                            key={user.id}
                            className="border border-red-700 p-4"
                        >
                            <div className="mb-4">
                                <div className="text-lg font-bold mb-2 justify-center flex">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        className="lucide lucide-user-circle text-red-900"
                                    >
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <circle cx="12" cy="10" r="3"></circle>
                                        <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path>
                                    </svg>
                                </div>
                                <div className="mb-1">
                                    Username: {user.username}
                                </div>
                                <div className="mb-1">Name: {user.name}</div>
                                <div className="mb-1">
                                    Email:
                                    <a href={`mailto:${user.email}`}>
                                        {user.email}
                                    </a>
                                </div>
                                <div className="mb-1">
                                    Phone:
                                    <a href={`tel:${user.phone}`}>
                                        {user.phone}
                                    </a>
                                </div>
                                <div className="mb-1">
                                    Website:
                                    <Link href={user.website}>
                                        {user.website}
                                    </Link>
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="text-lg font-bold mb-2 flex justify-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        className="lucide lucide-map text-red-900"
                                    >
                                        <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon>
                                        <line
                                            x1="9"
                                            x2="9"
                                            y1="3"
                                            y2="18"
                                        ></line>
                                        <line
                                            x1="15"
                                            x2="15"
                                            y1="6"
                                            y2="21"
                                        ></line>
                                    </svg>
                                </div>
                                <div className="mb-1">
                                    Street: {user.address.street}
                                </div>
                                <div className="mb-1">
                                    Suite: {user.address.suite}
                                </div>
                                <div className="mb-1">
                                    City: {user.address.city}
                                </div>
                                <div className="mb-1">
                                    ZIP: {user.address.zipcode}
                                </div>
                                <div className="ml-4">
                                    <div className="text-lg font-bold mb-1 flex justify-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            className="lucide lucide-map-pin text-red-900"
                                        >
                                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                                            <circle
                                                cx="12"
                                                cy="10"
                                                r="3"
                                            ></circle>
                                        </svg>
                                    </div>
                                    <div>Lat: {user.address.geo.lat}</div>
                                    <div>Long: {user.address.geo.lng}</div>
                                </div>
                            </div>
                            <div className="mb-4">
                                <div className="text-lg font-bold mb-2 flex justify-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        className="lucide lucide-briefcase text-red-900"
                                    >
                                        <rect
                                            width="20"
                                            height="14"
                                            x="2"
                                            y="7"
                                            rx="2"
                                            ry="2"
                                        ></rect>
                                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                                    </svg>
                                </div>
                                <div className="mb-1">
                                    Company Name: {user.company.name}
                                </div>
                                <div className="mb-1">
                                    Company Catch Phrase:{" "}
                                    {user.company.catchPhrase}
                                </div>
                                <div className="mb-1">
                                    Company BS: {user.company.bs}
                                </div>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
    if (!isLoading && !isError) {
        return content;
    } else {
        return <div>{JSON.stringify(error)}</div>;
    }
};
export default Home;
