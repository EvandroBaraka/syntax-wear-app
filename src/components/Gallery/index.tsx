import Homem from "@/assets/images/galeria-homem.jpg";
import TenisRoxo from "@/assets/images/galeria-tenis-roxo.jpg";
import Modelo from "@/assets/images/galeria-modelo.jpg";
import TenisColorido from "@/assets/images/galeria-tenis-colorido.jpg";
import TenisPreto from "@/assets/images/galeria-tenis-branco-e-preto.jpg";
import TenisCinza from "@/assets/images/galeria-tenis-cinza.jpg";
import styles from "./Gallery.module.css";
import { Overlay } from "../Overlay";
import { Button } from "../Button";

export const Gallery = () => {
    return (
        <section>
            <div className={`${styles.galleryGrid} container`}>
                {/* Imagem do modelo masculino - highlight */}
                <div
                    className={`${styles.galleryItem} ${styles.highlight} relative rounded-[20px] overflow-hidden`}
                >
                    <img
                        className="w-full h-full object-cover"
                        src={Homem}
                        alt="Modelo masculino Krypton One"
                    />

                    <Overlay
                        title="Kripton One"
                        subtitle="Estilo urbano com atitude"
                        className="inset-0 justify-center"
                    >
                        <Button variant="secondary">Feminino</Button>
                        <Button variant="secondary">Masculino</Button>
                    </Overlay>
                </div>

                {/* Imagem do tenis preto e branco */}
                <div
                    className={`${styles.galleryItem} ${styles.sneakerWhite} relative rounded-[20px] overflow-hidden`}
                >
                    <img
                        className="w-full h-full object-cover"
                        src={TenisPreto}
                        alt="Tenis preto e branco"
                    />
                </div>

                {/* Imagem da modelo feminina */}
                <div
                    className={`${styles.galleryItem} ${styles.model} relative rounded-[20px] overflow-hidden`}
                >
                    <img
                        className="w-full h-full object-cover"
                        src={Modelo}
                        alt="Modelo feminina"
                    />
                </div>

                {/* Imagem do tenis colorido */}
                <div
                    className={`${styles.galleryItem} ${styles.sneakerColor} relative rounded-[20px] overflow-hidden`}
                >
                    <img
                        className="w-full h-full object-cover"
                        src={TenisColorido}
                        alt="Tenis colorido"
                    />
                </div>

                {/* Imagem do tenis cinza */}
                <div
                    className={`${styles.galleryItem} ${styles.sneakerSilver} relative rounded-[20px] overflow-hidden`}
                >
                    <img
                        className="w-full h-full object-cover"
                        src={TenisCinza}
                        alt="Tenis cinza"
                    />
                </div>

                {/* Imagem do tenis roxo */}
                <div
                    className={`${styles.galleryItem} ${styles.sneakerPurple} relative rounded-[20px] overflow-hidden`}
                >
                    <img
                        className="w-full h-full object-cover"
                        src={TenisRoxo}
                        alt="Tenis roxo"
                    />
                </div>
            </div>
        </section>
    );
};
