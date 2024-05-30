"use client";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "@/context";
import { LoginDto } from "@/types";

type LoginForm = {
  Email: string;
  Password: string;
};

export const LoginForm = () => {
  const schema = yup.object().shape({
    Email: yup
      .string()
      .email("Email is not valid")
      .required("Email is required"),
    Password: yup.string().required("Password is required").min(6),
  });

  const router = useRouter();
  const { login } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      const ok = await login(data as LoginDto);
      console.log(ok); 
      if (ok) router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className="flex flex-col gap-y-5 w-96 h-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        type="email"
        placeholder="Email"
        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        {...register("Email")}
      />
      {errors.Email && (
        <span className="text-red-500 text-sm font-light -mt-3">
          {errors.Email.message}
        </span>
      )}
      <input
        type="password"
        placeholder="Password"
        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        {...register("Password")}
      />
      {errors.Email && (
        <span className="text-red-500 text-sm font-light -mt-3">
          {errors.Email.message}
        </span>
      )}
      <button className="p-3 bg-purple-700 text-white rounded-lg font-semibold tracking-wider hover:bg-opacity-80 transition-all duration-300 ease-in-out">
        Login
      </button>
      <div className="w-full text-end">
        <Link href="/auth/register">
          <span className="text-sm font-light text-center text-purple-700  tracking-tighter hover:underline">
            Don{"'"}t have an account? Register
          </span>
        </Link>
      </div>
    </form>
  );
};
