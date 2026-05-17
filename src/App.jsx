import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import StarCard from "./components/StarCard";
import PrizeBanner from "./components/PrizeBanner";
import ContestInfo from "./components/ContestInfo";
import ParticipationForm from "./components/ParticipationForm";
import { cards } from "./data/cards";
import "./styles/global.css";

function App() {
    const [selectedCard, setSelectedCard] = useState(null);
    const [confirmedCard, setConfirmedCard] = useState(null);
    const [step, setStep] = useState("info");
    const [studentName, setStudentName] = useState("");
    const [mentorName, setMentorName] = useState("");

    const isFormValid = Boolean(studentName.trim() && mentorName.trim());
    const showRewards = step !== "info";
    const showCards = step === "cards";

    const handleJoin = () => {
        setStep("rewards");
    };

    const handleShowCards = () => {
        if (isFormValid) {
            setStep("cards");
        }
    };

    const handleSelect = (card) => {
        if (!isFormValid) {
            return;
        }
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

    const shuffledCards = useMemo(
        () => [...cards].sort(() => Math.random() - 0.5),
        []
    );

    const whatsappNumber = "+41779179855";
    const selectedName = selectedCard?.revealName?.trim() || "Starcard";
    const selectedSource = selectedCard?.source?.trim() || "kaynak belirtilmedi";
    const whatsappMessage = `Merhaba Oğuzhan abi, benim adım ${studentName.trim()}.
${mentorName.trim()} abinin öğrencisiyim.
Yarışmaya katılıyorum ve benim seçtiğim yıldız: ${selectedName}.
Katılımcı sayısına beni de dahil edebilir misin?
Ayrıca kaynak olarak 
${selectedSource} 
linkini kullanacağım.

Ayrıca, tüm Sahabelere bu PDF den ulasabilecegimi biliyorum
www.abc.com/sahabeler.pdf
Teşekkürler!
`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        whatsappMessage
    )}`;

    return (
        <main className="app">
            {step !== "cards" && (
                <header className="top-bar">
                    <div className="brand">
                        <span className="brand-title">STARCARD</span>
                        <span className="brand-subtitle">İlham Veren Yıldızlar</span>
                    </div>
                    <p className="slogan">
                        Ashâbım yıldızlar gibidir. Hangisine tâbi olsanız hidayete
                        erersiniz.
                    </p>
                </header>
            )}

            {step === "info" && <ContestInfo onJoin={handleJoin} />}

            {showRewards && step !== "cards" && (
                <>
                    <PrizeBanner />
                    <ParticipationForm
                        studentName={studentName}
                        mentorName={mentorName}
                        onStudentNameChange={setStudentName}
                        onMentorNameChange={setMentorName}
                        onShowCards={handleShowCards}
                        isFormValid={isFormValid}
                    />
                </>
            )}

            {showCards && (
                <section className={`card-grid ${selectedCard ? "dimmed" : ""}`}>
                    {shuffledCards.map((card) => (
                        <StarCard
                            key={card.id}
                            card={card}
                            variant="grid"
                            onSelect={handleSelect}
                            disabled={!isFormValid}
                        />
                    ))}
                </section>
            )}

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
                                whatsappUrl={whatsappUrl}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </main>
    );
}

export default App;