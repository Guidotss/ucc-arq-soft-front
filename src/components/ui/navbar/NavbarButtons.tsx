import Link from "next/link";

export const NavbarButtons = ({ pathName }: Readonly<{ pathName: string }>) => {
  if (pathName === "/") {
    return (
      <Link href="/auth/login">
        <p className="navbar-button">Get Started</p>
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
