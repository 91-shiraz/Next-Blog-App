import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-teal-950 px-8 py-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link href="/">
            <h1 className="text-white text-2xl font-bold tracking-wide">BLOG APP</h1>
          </Link>
          <ul className="flex space-x-4">
            <li>
              <Link href="/Components/Users/Signup">
                <p className="text-white">SIGNUP</p>
              </Link>
            </li>
            <li>
              <Link href="/Components/Users/Login">
                <p className="text-white">LOGIN</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
