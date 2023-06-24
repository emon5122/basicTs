"use client";
import { schema } from "@/shared/validations/userSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const FormPage = () => {
    const formSchema = schema;
    formSchema.refine((data) => {
        data.password === data.confirmPassword,
            { message: "Passwords do not match", path: ["confirmPassword"] };
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(formSchema) });
    return (
        <>
            <form
                className="flex flex-col gap-2 m-6 border-2 border-gray-300 p-4 rounded-md"
                onSubmit={handleSubmit(async (data) => {
                    return await axios.post("/api/signup", data);
                })}
            >
                <div className="grid grid-cols-6">
                    <label className="col-span-2">First Name: </label>
                    <input
                        className="col-span-4 border border-gray-300/60 p-1 rounded-md"
                        placeholder="Istiak Hassan"
                        {...register("firstName")}
                    />
                </div>
                {errors.firstName && (
                    <p>{JSON.stringify(errors.firstName.message)}</p>
                )}
                <div className="grid grid-cols-6">
                    <label className="col-span-2">Last Name: </label>
                    <input
                        className="col-span-4 border border-gray-300/60 p-1 rounded-md"
                        type="text"
                        placeholder="Emon"
                        {...register("lastName")}
                    />
                </div>
                {errors.lastName && (
                    <p>{JSON.stringify(errors.lastName.message)}</p>
                )}
                <div className="grid grid-cols-6">
                    <label className="col-span-2">Email: </label>
                    <input
                        className="col-span-4 border border-gray-300/60 p-1 rounded-md"
                        placeholder="abc@xyz.com"
                        type="email"
                        {...register("email")}
                    />
                </div>
                {errors.email && <p>{JSON.stringify(errors.email.message)}</p>}
                <div className="grid grid-cols-6">
                    <label className="col-span-2">Password: </label>
                    <input
                        className="col-span-4 border border-gray-300/60 p-1 rounded-md"
                        type="password"
                        {...register("password")}
                    />
                </div>
                {errors.password && (
                    <p>{JSON.stringify(errors.password.message)}</p>
                )}
                <div className="grid grid-cols-6">
                    <label className="col-span-2">Confirm Password: </label>
                    <input
                        className="col-span-4 border border-gray-300/60 p-1 rounded-md"
                        type="password"
                        {...register("confirmPassword")}
                    />
                </div>
                {errors.confirmPassword && (
                    <p>{JSON.stringify(errors.confirmPassword.message)}</p>
                )}
                <button
                    className="bg-blue-500 text-white p-2 rounded-md w-64 self-center"
                    type="submit"
                >
                    Submit
                </button>
            </form>
        </>
    );
};

export default FormPage;
