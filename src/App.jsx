import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import StarCard from "./components/StarCard";
import { cards } from "./data/cards";
import "./styles/global.css";
import PrizeBanner from "./components/PrizeBanner";

function App() {
    const [selectedCard, setSelectedCard] = useState(null);
    const [confirmedCard, setConfirmedCard] = useState(null);

    const handleSelect = (card) => {
        setSelectedCard(card);
        setConfirmedCard(null);
    };

    const handleCancel = () => {
        setSelectedCard(null);
        setConfirmedCard(null);
    };

    const handleConfirm = () => {
        if (selectedCard) {
            setConfirmedCard(selectedCard);
        }
    };

    const isConfirmed =
        selectedCard && confirmedCard && selectedCard.id === confirmedCard.id;

    const shuffledCards = [...cards].sort(() => Math.random() - 0.5);

    return (
        <main className="app">
            <header className="top-bar">
                <div className="brand">
                    <span className="brand-title">STARCARD</span>
                    <span className="brand-subtitle">İlham Veren Yıldızlar</span>
                </div>
                <p className="slogan">Ashâbım yıldızlar gibidir. Hangisine tâbi olsanız hidayete erersiniz.</p>
            </header>
            <PrizeBanner />

            <section className={`card-grid ${selectedCard ? "dimmed" : ""}`}>
                {shuffledCards.map((card) => (
                    <StarCard
                        key={card.id}
                        card={card}
                        variant="grid"
                        onSelect={handleSelect}
                    />
                ))}
            </section>


            <AnimatePresence>
                {selectedCard && (
                    <motion.div
                        className="modal-overlay"
                        onClick={handleCancel}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="modal-sheet"
                            onClick={(event) => event.stopPropagation()}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <StarCard
                                card={selectedCard}
                                variant="modal"
                                isConfirmed={Boolean(isConfirmed)}
                                onConfirm={handleConfirm}
                                onCancel={handleCancel}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>


        </main>
    );
}

export default App;