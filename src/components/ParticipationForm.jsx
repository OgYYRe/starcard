import "./ParticipationForm.css";

function ParticipationForm({
    studentName,
    mentorName,
    onStudentNameChange,
    onMentorNameChange,
    onShowCards,
    isFormValid
}) {
    return (
        <section className="participation">
            <div className="participation__header">
                <h4>Katılım Bilgileri</h4>
                <span>Kart seçebilmek için bilgilerini doldur.</span>
            </div>
            <div className="participation__fields">
                <label className="form-field">
                    <span>Adın</span>
                    <input
                        type="text"
                        placeholder="Örn. Ahmet"
                        value={studentName}
                        onChange={(event) => onStudentNameChange(event.target.value)}
                    />
                </label>
                <label className="form-field">
                    <span>Hangi abinin öğrencisisin?</span>
                    <input
                        type="text"
                        placeholder="Örn. Oğuzhan"
                        value={mentorName}
                        onChange={(event) => onMentorNameChange(event.target.value)}
                    />
                </label>
            </div>
            {!isFormValid && (
                <p className="form-hint">Kart seçebilmek için iki alanı da doldurmalısın.</p>
            )}
            <button
                type="button"
                className="participation__button"
                onClick={onShowCards}
                disabled={!isFormValid}
            >
                Kartları Gör
            </button>
        </section>
    );
}

export default ParticipationForm;

