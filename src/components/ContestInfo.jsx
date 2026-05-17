import "./ContestInfo.css";

function ContestInfo({ onJoin }) {
    return (
        <section className="contest-info">
            <div className="contest-info__content">
                <h3>Yarışma Bilgileri</h3>
                <p>
                    Ödül havuzu katılımcı sayısına göre büyür. Yarışmaya katılmak için
                    önce bilgilerini gir, ardından yıldız kartını seç.
                </p>
                <div className="contest-info__table">
                    <h4>Ödül Tablosu</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Katılımcı</th>
                                <th>1.</th>
                                <th>2.</th>
                                <th>3.</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>5-9 kişi</td>
                                <td>100 CHF</td>
                                <td>60 CHF</td>
                                <td>40 CHF</td>
                            </tr>
                            <tr>
                                <td>10-14 kişi</td>
                                <td>200 CHF</td>
                                <td>120 CHF</td>
                                <td>80 CHF</td>
                            </tr>
                            <tr>
                                <td>15+ kişi</td>
                                <td>300 CHF</td>
                                <td>180 CHF</td>
                                <td>120 CHF</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <button type="button" className="contest-info__button" onClick={onJoin}>
                Yarışmaya Katıl
            </button>
        </section>
    );
}

export default ContestInfo;
