import Link from "next/link";

export const RegisterForm = () => {
  return (
    <form className="flex flex-col gap-y-5 mt-5 w-96 h-full">
      <input
        type="text"
        placeholder="Name"
        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
      />
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
