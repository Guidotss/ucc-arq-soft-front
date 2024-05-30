"use client";
import { useContext } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "@/context";
import { useRouter } from "next/navigation";
import { RegisterDto } from "@/types";

type RegisterForm = {
  Username: string;
  Email: string;
  Password: string;
};

export const RegisterForm = () => {
  const schema = yup.object().shape({
    Username: yup.string().required("Name is required"),
    Email: yup
      .string()
      .email("Email is not valid")
      .required("Email is required"),
      Password: yup.string().required("Password is required").min(6),
  });

  const router = useRouter();
  const { register } = useContext(AuthContext);
  const {
    register: rhfRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      const ok = await register(data as RegisterDto);
      if (ok) router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className="flex flex-col gap-y-5 mt-5 w-96 h-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        type="text"
        placeholder="Name"
        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        {...rhfRegister("Username")}
      />
      {errors.Username && (
        <span className="text-red-500 text-sm font-light -mt-3">
          {errors.Username.message}
        </span>
      )}
      <input
        type="email"
        placeholder="Email"
        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        {...rhfRegister("Email")}
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
        {...rhfRegister("Password")}
      />
      {errors.Password && (
        <span className="text-red-500 text-sm font-light -mt-3">
          {errors.Password.message}
        </span>
      )}
      <button className="p-3 bg-purple-700 text-white rounded-lg font-semibold tracking-wider hover:bg-opacity-80 transition-all duration-300 ease-in-out">
        Register
      </button>
      <div className="w-full text-end">
        <Link href="/auth/login">
          <span className="text-sm font-light text-center text-purple-700  tracking-tighter hover:underline">
            Already have an account? Login
          </span>
        </Link>
      </div>
    </form>
  );
};
