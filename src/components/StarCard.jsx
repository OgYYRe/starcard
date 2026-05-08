import "./StarCard.css";
import { motion } from "framer-motion";

function StarCard({
    card,
    variant = "grid",
    isConfirmed = false,
    onSelect,
    onConfirm,
    onCancel
}) {
    const name = card.revealName?.trim();
    const text = card.revealText?.trim();
    const shareMessage =
        name || text
            ? `Benim kartım: ${name || "Starcard"}. ${text || ""}`.trim()
            : "Starcard seçimim.";
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;
    const mailUrl = `mailto:?subject=${encodeURIComponent(
        "Starcard Seçimim"
    )}&body=${encodeURIComponent(shareMessage)}`;

    const hasTitle = Boolean(card.title?.trim());
    const hasTraits = Boolean(card.traits?.length);
    const hasOverlay = hasTitle || hasTraits;
    const hasReveal = Boolean(name || text);

    const cardVisual = (
        <div
            className={`star-card ${variant === "modal" ? "modal-card" : ""} ${
                isConfirmed ? "flipped" : ""
            }`}
        >
            <div className="card-inner">
                <div className={`card-face card-front ${hasTraits ? "" : "empty"}`}>
                    <div
                        className={`card-art ${
                            card.frontImage ? "" : "placeholder"
                        }`}
                        style={
                            card.frontImage
                                ? { backgroundImage: `url(${card.frontImage})` }
                                : undefined
                        }
                    >
                        {hasOverlay && (
                            <div className="card-overlay">
                                {hasTitle && (
                                    <h2 className="card-title">{card.title}</h2>
                                )}
                                {hasTraits && (
                                    <ul className="traits">
                                        {card.traits.map((trait, index) => (
                                            <li key={index}>{trait}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div className={`card-face card-back ${hasReveal ? "" : "empty"}`}>
                    <div
                        className={`card-art ${
                            card.revealImage ? "" : "placeholder"
                        }`}
                        style={
                            card.revealImage
                                ? { backgroundImage: `url(${card.revealImage})` }
                                : undefined
                        }
                    >
                        {hasReveal && (
                            <div className="card-overlay reveal">
                                {name && <h2>{name}</h2>}
                                {text && <p>{text}</p>}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    if (variant === "grid") {
        return (
            <motion.button
                type="button"
                className="card-wrap"
                whileHover={{ scale: 1.05, y: -10 }}
                onClick={() => onSelect(card)}
            >
                {cardVisual}
            </motion.button>
        );
    }

    return (
        <div className="modal-card-wrap">
            <button
                type="button"
                className="close-button"
                onClick={onCancel}
                aria-label="Kapat"
            >
                ×
            </button>
            {cardVisual}
            {!isConfirmed ? (
                <div className="modal-actions">
                    <button type="button" className="action-button" onClick={onConfirm}>
                        Seç
                    </button>
                    <button
                        type="button"
                        className="action-button ghost"
                        onClick={onCancel}
                    >
                        Vazgeç
                    </button>
                </div>
            ) : (
                <div className="modal-actions">
                    <a
                        className="action-button"
                        href={whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                    >
                        WhatsApp ile gönder
                    </a>
                    <a className="action-button ghost" href={mailUrl}>
                        Mail ile gönder
                    </a>
                </div>
            )}
        </div>
    );
}

export default StarCard;

