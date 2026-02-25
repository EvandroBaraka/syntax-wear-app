import { Link } from "@tanstack/react-router";

interface MenuItem {
    label: string;
    to: string;
    params?: Record<string, string>;
}

interface MenuSection {
    title: string;
    items: MenuItem[];
}

const menus: MenuSection[] = [
    {
        title: "Masculino",
        items: [
            { label: "Casual", to: "/products/category/$category", params: { category: "Casual" } },
            { label: "Esporte", to: "/products/category/$category", params: { category: "Esporte" } },
            { label: "Moderno", to: "/products/category/$category", params: { category: "Moderno" } },
            { label: "Futurista", to: "/products/category/$category", params: { category: "Futurista" } },
        ],
    },
    {
        title: "Feminino",
        items: [
            { label: "Casual", to: "/products/category/$category", params: { category: "Casual" } },
            { label: "Esporte", to: "/products/category/$category", params: { category: "Esporte" } },
            { label: "Moderno", to: "/products/category/$category", params: { category: "Moderno" } },
            { label: "Futurista", to: "/products/category/$category", params: { category: "Futurista" } },
        ],
    },
    {
        title: "Outlet",
        items: [
            { label: "Masculino", to: "/products/category/$category", params: { category: "Masculino" } },
            { label: "Feminino", to: "/products/category/$category", params: { category: "Feminino" } },
        ],
    },
    {
        title: "Sobre",
        items: [
            { label: "Quem Somos", to: "/about" },
            { label: "Nossas Lojas", to: "/our-stores" },
        ],
    },
];

export const MenuItems = () => {
    return (
        <div className="flex flex-col sm:flex-row gap-8 ">
            {menus.map(({ title, items }) => (
                <nav key={title}>
                    <ul className="flex flex-col gap-4">
                        <li>
                            <p className="font-normal text-surface-alt text-xl">
                                {title}
                            </p>
                        </li>
                        {items.map((item) => (
                            <li key={item.label}>
                                <Link
                                    to={item.to as any}
                                    params={item.params as any}
                                    className="font-medium hover:text-text-tertiary transition-colors text-xl"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            ))}
        </div>
    );
};
