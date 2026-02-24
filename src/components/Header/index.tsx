import Logo from "@/assets/images/logo.png";
import IconUser from "@/assets/images/icon-user.png";
import IconAbout from "@/assets/images/icon-about.png";
import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "../ShoppingCart";
import { MenuMobile } from "../MenuMobile";
import { useState, useEffect } from "react";

export interface NavLink {
    name: string;
    href: string;
}

const navLinks: NavLink[] = [
    { name: "Masculino", href: "/products/category/masculino" },
    { name: "Feminino", href: "/products/category/feminino" },
    { name: "Outlet", href: "/products/category/outlet" },
];

export const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="relative">
            <header className={`fixed left-0 right-0 z-10 mx-10 text-[#333333] transition-all duration-50 ${isScrolled ? "top-0" : "top-5"}`}>
                <div
                    className={`bg-white max-w-330 mx-auto flex justify-between items-center py-3 px-7 rounded-2xl transition-all duration-50 ${
                        isScrolled ? "shadow-md mt-0" : "mt-5"
                    }`}
                >
                    <Link to="/">
                        <img
                            src={Logo}
                            alt="Logo SyntaxWear"
                            className="w-32 md:w-36"
                        />
                    </Link>

                    <nav className="hidden lg:block">
                        <ul className="flex gap-10">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.href}>{link.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <nav>
                        <ul className="flex gap-4 md:gap-10 items-center">
                            <li className="hidden lg:block">
                                <Link to="/our-stores">Nossas Lojas</Link>
                            </li>
                            <li className="hidden lg:block">
                                <Link to="/about">Sobre</Link>
                            </li>
                            <li className="lg:hidden">
                                <MenuMobile navLink={navLinks}/>
                            </li>
                            <li className="hidden lg:block">
                                <Link to="/sign-in">
                                    <img
                                        src={IconUser}
                                        alt="ícone de Usuário"
                                    />
                                </Link>
                            </li>
                            <li className="hidden lg:block">
                                <Link to="/about">
                                    <img src={IconAbout} alt="ícone de Sobre" />
                                </Link>
                            </li>
                            <li>
                                <ShoppingCart />
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        </div>
    );
};
