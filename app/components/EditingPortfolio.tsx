import ScrollObserver from "./ScrollObserver";
import Navbar from "./Navbar";
import Hero from "./Hero";
import ProofBand from "./ProofBand";
import Cases from "./Cases";
import SelectedEdits from "./SelectedEdits";
import Sobre from "./Sobre";
import BehanceGrid from "./BehanceGrid";
import Contato from "./Contato";
import Footer from "./Footer";
import styles from "./PortfolioPage.module.css";

export default function EditingPortfolio() {
    return (
        <main className={styles.main}>
            <ScrollObserver />
            <Navbar />
            <div className={styles.content}>
                <Hero />
                <ProofBand />
                <Cases />
                <SelectedEdits />
                <Sobre />
                <div id="outros-trabalhos" style={{ padding: "0 0 6rem 0" }}>
                    <BehanceGrid />
                </div>
                <Contato />
                <Footer />
            </div>
        </main>
    );
}
