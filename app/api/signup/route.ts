import { schema } from "@/shared/validations/userSchema";
import { NextResponse } from "next/server";

export const POST =async (req: Request)=>{
return NextResponse.json(schema.safeParse(await req.json()), {status:200})
}

