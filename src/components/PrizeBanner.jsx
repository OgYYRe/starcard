import "./PrizeBanner.css";

function PrizeBanner() {
    const participantCount = 9;
    // Cemal Sadullah,
    // Ammar Abdullah abi,
    // Saffet Muhammed,
    // Mustafa MuhammedR. abi,
    // Ensar MuhammedR. abi,
    // Suat Sadullah abi
    // Muhammed Siddik, MuhammedR abi.
    // Halil Mustafa A.
    // Haci Sadullah

    const maxParticipants = 15;
    const cappedCount = Math.min(Math.max(participantCount, 0), maxParticipants);
    const progressPercent = Math.round((cappedCount / maxParticipants) * 100);

    const nextThresholdNote =
        participantCount < 5
            ? `İlk ödül seviyesinin açılması için ${5 - participantCount} kişi daha gerekli.`
            : participantCount < 10
              ? `Sonraki ödül seviyesinin açılması için ${10 - participantCount} kişi daha gerekli.`
              : participantCount < 15
                ? `Sonraki ödül seviyesinin açılması için ${15 - participantCount} kişi daha gerekli.`
                : "Maksimum ödül barajına ulaşıldı.";

    const rewards =
        participantCount >= 15
            ? [300, 180, 120]
            : participantCount >= 10
              ? [200, 120, 80]
              : participantCount >= 5
                ? [100, 60, 40]
                : null;

    const statusLabel =
        participantCount < 5
            ? "Ödüller henüz aktif değil"
            : participantCount < 10
              ? "Ödül seviyesi: 5-9 kişi"
              : participantCount < 15
                ? "Ödül seviyesi: 10-14 kişi"
                : "Ödül seviyesi: 15+ kişi";

    return (
        <section className="prize-banner">
            <div className="prize-banner__glow" aria-hidden="true" />
            <div className="prize-banner__content">
                <header className="prize-banner__header">
                    <h2 className="prize-banner__title">Bilgi Yarışması Ödülleri</h2>
                    <p className="prize-banner__subtitle">
                        Katılımcı sayısı arttıkça ödül havuzu büyür
                    </p>
                </header>

                <div className="prize-banner__progress">
                    <div
                        className="progress-track"
                        role="progressbar"
                        aria-valuenow={cappedCount}
                        aria-valuemin={0}
                        aria-valuemax={maxParticipants}
                    >
                        <div
                            className="progress-fill"
                            style={{ width: `${progressPercent}%` }}
                        />
                        <span className="progress-marker" style={{ left: "33.33%" }}>
                            <span>5</span>
                        </span>
                        <span className="progress-marker" style={{ left: "66.66%" }}>
                            <span>10</span>
                        </span>
                        <span className="progress-marker" style={{ left: "100%" }}>
                            <span>15</span>
                        </span>
                    </div>
                    <div className="progress-meta">
                        <span>
                            Katılımcı: <strong>{participantCount}</strong>
                        </span>
                        <span>{statusLabel}</span>
                    </div>
                </div>

                {!rewards ? (
                    <div className="prize-banner__inactive">
                        <p>Ödüller henüz aktif değil.</p>
                        <p className="muted">5 kişiye ulaşınca ödüller başlar.</p>
                        {nextThresholdNote && (
                            <p className="next-level">{nextThresholdNote}</p>
                        )}
                    </div>
                ) : (
                    <div className="prize-cards">
                        <article className="prize-card secondary">
                            <p className="prize-card__place">2.</p>
                            <h3 className="prize-card__title">İkincilik</h3>
                            <p className="prize-card__value">{rewards[1]} CHF</p>
                        </article>
                        <article className="prize-card primary">
                            <p className="prize-card__place">1.</p>
                            <h3 className="prize-card__title">Birincilik</h3>
                            <p className="prize-card__value">{rewards[0]} CHF</p>
                        </article>
                        <article className="prize-card tertiary">
                            <p className="prize-card__place">3.</p>
                            <h3 className="prize-card__title">Üçüncülük</h3>
                            <p className="prize-card__value">{rewards[2]} CHF</p>
                        </article>
                    </div>
                )}

                {rewards && nextThresholdNote && (
                    <p className="next-level">{nextThresholdNote}</p>
                )}
            </div>




        </section>
    );
}

export default PrizeBanner;
