"use client";
import { create } from "zustand";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Home = () => {
    const userData = z.object({
        id: z.number(),
        name: z.string(),
        email: z.string().email(),
    });
    type user = z.infer<typeof userData>;
    interface Ustore {
        users: user[];
        setUser: (users: user[]) => void;
    }
    const UserStore = create<Ustore>((set) => ({
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
            const res = usersData.parse(dt);
            // UserStore((state) => state.setUser(res));
            return res;
        },
    });
    if (!isLoading && !isError) {
        return data.map((user) => {
            return (
                <div key={user.id}>
                    <h1>Name: {user.name}</h1>
                    <h2>email: {user.email}</h2>
                </div>
            );
        });
    } else {
        return <div>{JSON.stringify(error)}</div>;
    }
};
export default Home;
