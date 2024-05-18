import Image from "next/image"

export const Navbar = () => {
  return (
    <header className="w-full absolute flex items-center backdrop-blur-xl font-bold p-5 shadow-lg rounded-xl">
        <div className="flex items-center">
            <Image
                src="/assets/images/deer.png"
                alt="DuoMingo Logo"
                width={50}
                height={50}
            />
            <h1 className="text-3xl text-white tracking-tighter">DuoMingo</h1>
        </div>
    </header>
  )
}