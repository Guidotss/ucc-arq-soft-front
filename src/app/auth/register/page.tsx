import { RegisterForm } from "@/components";

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-slate-50">
      <div className="bg-white p-10 rounded-lg shadow-lg lg:mt-20 2xl:mt-0">
        <h1 className="text-2xl font-bold text-center">Register</h1>
        <RegisterForm />
      </div>
    </div>
  );
}
