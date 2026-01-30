import IconInstagram from "@/assets/images/icon-instagram.png";
import iconWhatsapp from "@/assets/images/icon-whatsapp.png";
import IconTiktok from "@/assets/images/icon-tiktok.png";
import IconFacebook from "@/assets/images/icon-facebook.png";

const socilMediaLinks = [
    { href: "#", icon: IconInstagram, name: "Instagram" },
    { href: "#", icon: iconWhatsapp, name: "WhatsApp" },
    { href: "#", icon: IconTiktok, name: "TikTok" },
    { href: "#", icon: IconFacebook, name: "Facebook" },
];

export const SocialLinks = () => {
    return (
        <div>
            <p className="mb-4 text-xl font-medium text-surface-alt">
                Redes Sociais
            </p>
            <ul className="flex gap-5">
                {socilMediaLinks.map(({ href, icon, name }) => (
                    <li key={name}>
                        <a href={href}>
                            <img src={icon} alt={name} />
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};
