import IconMenu from "@/assets/images/icone-menu.png";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import type { NavLink } from "../Header";
import { IoMdClose } from "react-icons/io";

interface MenuMobileProps {
    navLink: NavLink[];
}

export const MenuMobile = ({ navLink }: MenuMobileProps) => {
    const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

    return (
        <>
            <button
                className="cursor-pointer"
                onClick={() => setMenuIsOpen(!menuIsOpen)}
            >
                <img src={IconMenu} alt="Icone menu" />
            </button>

            {/* Overlay escurecido quando o carrinho estiver aberto */}
            <div
                className={`${menuIsOpen ? "visible bg-black/70" : "bg-transparent invisible"} fixed top-0 bottom-0 left-0 right-0 transition-all duration-600 ease-in-out z-30`}
                onClick={() => setMenuIsOpen(false)}
            >
                {/* Carrinho de compras */}
                <div
                    className={`${menuIsOpen ? "translate-x-0" : "-translate-x-full"} absolute top-0 bottom-0 bg-white pt-6 transition-all duration-500 ease-in-out w-full`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <header className="bg-black p-5 text-white">
                        <nav className="flex justify-between">
                            <Link
                                to={"/sign-in"}
                                className="flex items-center gap-3"
                            >
                                <FaRegUserCircle className="h-6 w-6" />
                                <p>Olá! Faça seu login</p>
                            </Link>
                            <IoMdClose className="cursor-pointer text-2xl" onClick={() => setMenuIsOpen(false)} />
                        </nav>
                    </header>

                    <ul className="flex flex-col gap-3 p-4 overflow-y-auto scrollbar-hide h-[calc(100%-140px)]">
                        {navLink.map((link) => (
                            <li key={link.name}>
                                <Link
                                    to={link.href}
                                    onClick={() => setMenuIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}

                        <li>
                            <Link
                                to="/our-stores"
                                onClick={() => setMenuIsOpen(false)}
                            >
                                Nossas Lojas
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/about"
                                onClick={() => setMenuIsOpen(false)}
                            >
                                Sobre
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};
