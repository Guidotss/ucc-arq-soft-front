import { useContext } from "react";
import Link from "next/link";
import { AuthContext } from "@/context";

export const NavbarButtons = ({ pathName }: Readonly<{ pathName: string }>) => {
  const { user } = useContext(AuthContext);
  console.log(user);

  if (pathName === "/") {
    return !user ? (
      <Link href="/auth/login">
        <p className="navbar-button">Get Started</p>
      </Link>
    ) : (
      <Link href="/dashboard">
        <p className="navbar-button">Dashboard</p>
      </Link>
    );
  }

  if (pathName.includes("auth/login")) {
    return (
      <Link href="/auth/register">
        <p className="navbar-button">Register</p>
      </Link>
    );
  }

  if (pathName.includes("auth/register")) {
    return (
      <Link href="/auth/login">
        <p className="navbar-button">Login</p>
      </Link>
    );
  }

  return null;
};
