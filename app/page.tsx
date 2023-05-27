"use server";
import { auth, currentUser } from "@clerk/nextjs";

export default async function Home() {
    const obj = auth();
    const user = await currentUser();
    return (
        <div>
            {JSON.stringify(obj)} &&&& {JSON.stringify(user)}
        </div>
    );
}
