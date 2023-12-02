import logo from "../assets/Logo.png"

export default function Navbar({activePage}) {
    return(
        <div className="p-5 border-b border-fuchsia-100/20 flex flex-col md:flex-row md:justify-between">
            <img src={logo} alt="logo" className="w-[6rem]" />

            <div className=" flex flex-col md:flex-row mt-6 gap-4">
                <a href="/" className={`${activePage == 'home' ? "text-fuchsia-200" : "text-black"}`}>Home</a>
                <a href="/contact" className={`${activePage == 'contact' ? "text-fuchsia-200" : "text-black"}`}>Contact</a>
                {activePage}
            </div>

        </div>
    )
}