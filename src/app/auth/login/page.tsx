import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-slate-50">
      <div className="bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form className="flex flex-col gap-y-5 mt-5 w-96 h-full">
          <input
            type="email"
            placeholder="Email"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
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
      </div>
    </div>
  );
}
