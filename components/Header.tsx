import Link from "next/link"

function Header() {
    return (
        <header className="flex flex-wrap justify-between items-center px-4 py-2">
            {/* top row */}
            <Link href={"/"}
                className="text-2xl font-bold text-blue-500 hover:opacity-50 cursor-pointer mx-auto sm:mx-0 capitalize"
            >
                shoplio
            </Link>
        </header>
    )
}

export default Header
