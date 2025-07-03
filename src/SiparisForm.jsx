import { useState } from "react";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SiparisForm.css";

const SiparisForm = () => {
  const navigate = useNavigate();

  const pizzaFiyati = 85.5; //ilk pizza fiyatı
  const malzemeFiyati = 5; //her eklenen malzeme adedi fiyatı

  //Seçilen boyut için state tanımlaması
  const [boyut, setBoyut] = useState("");

  //Seçilen hamur seçeneği için state tanımlaması
  const [hamur, setHamur] = useState("");

  //Seçilen ekstra malzemelerin tutuldugu (boş bir array) state tanımlaması
  const [ekstralar, setEkstralar] = useState([]);

  //Müşteri notu için state tanımlaması
  const [not, setNot] = useState("");

  //Toplam sipariş edilen pizza adedi state tanımlaması(default değeri 1)
  const [adet, setAdet] = useState(1);

  //Ekstra malzemelerin toplam fiyatı hesaplaması
  const toplamEkstra = ekstralar.length * malzemeFiyati;

  //Toplam fiyat hesaplaması
  const toplamFiyat = (pizzaFiyati + toplamEkstra) * adet;

  //Ekstra malzeme seçimi yönetimi için handlechange fonks yazalım
  const handleMalzemeChange = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;

    if (checked) {
      if (ekstralar.length >= 10) {
        alert("En fazla 10 malzeme seçebilirsiniz!");
        e.target.checked = false;
      } else {
        setEkstralar([...ekstralar, value]);
      }
    } else {
      setEkstralar(ekstralar.filter((item) => item !== value));
    }
  };

  const handleSubmit = async () => {
    const siparis = {
      boyut,
      hamur,
      ekstralar,
      not,
      adet,
      toplamFiyat,
    };

    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        siparis
      ); // örnek test API
      console.log("Sipariş gönderildi:", response.data);
      navigate("/success");
    } catch (err) {
      console.error("Sipariş gönderilemedi:", err);
      console.log(err.response);
      alert("Sipariş gönderilemedi, lütfen tekrar deneyin.");
    }
  };

  return (
    <div>
      {/* ÜST KIRMIZI BÖLÜM */}
      <div className="header">
        <h1 className="header-title">Teknolojik Yemekler</h1>
        <p className="header-path">
          <Link to="/" className="breadcrumb-link">
            Anasayfa
          </Link>{" "}
          &gt; Seçenekler - <strong>Sipariş Oluştur</strong>
        </p>
      </div>

      {/* BEYAZ FORM ALANI */}
      <div className="order-form">
        {/* Ürün Bilgisi */}
        <h2 className="order-title">Position Absolute Acı Pizza</h2>
        <p className="price">{pizzaFiyati.toFixed(2)}₺</p>
        <p className="description">
          Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı
          pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli
          diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun
          ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak,
          düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli
          lezzetli bir yemektir. Küçük bir pizzaya bazen pizzetta denir.
        </p>

        {/* Boyut Seç */}
        <div className="form-row">
          <div className="form-section">
            <label>Boyut Seç *</label>
            <div className="options">
              <label>
                <input
                  type="radio"
                  name="size"
                  value="Küçük"
                  onChange={(e) => setBoyut(e.target.value)}
                />{" "}
                Küçük
              </label>
              <label>
                <input
                  type="radio"
                  name="size"
                  value="Orta"
                  onChange={(e) => setBoyut(e.target.value)}
                />{" "}
                Orta
              </label>
              <label>
                <input
                  type="radio"
                  name="size"
                  value="Büyük"
                  onChange={(e) => setBoyut(e.target.value)}
                />{" "}
                Büyük
              </label>
            </div>
          </div>

          {/* Hamur Seç */}
          <div className="form-section">
            <label>Hamur Seç *</label>
            <select
              className="dropdown"
              onChange={(e) => setHamur(e.target.value)}
            >
              <option value="">Hamur Kalınlığı</option>
              <option value="İnce">İnce</option>
              <option value="Normal">Normal</option>
              <option value="Kalın">Kalın</option>
            </select>
          </div>
        </div>

        {/* Ek Malzemeler */}
        <div className="form-section">
          <label>Ek Malzemeler (En fazla 10 malzeme seçebilirsiniz. 5₺)</label>
          <div className="extras">
            {[
              "Pepperoni",
              "Sosis",
              "Kanada Jambonu",
              "Tavuk Izgara",
              "Soğan",
              "Domates",
              "Mısır",
              "Sucuk",
              "Jalepeno",
              "Sarımsak",
              "Biber",
              "Ananas",
              "Kabak",
            ].map((item, i) => (
              <label key={i}>
                <input
                  type="checkbox"
                  value={item}
                  onChange={handleMalzemeChange}
                />{" "}
                {item}
              </label>
            ))}
          </div>
        </div>

        {/* Sipariş Notu */}
        <div className="form-section">
          <p className="note-title">Sipariş Notu</p>
          <input
            type="text"
            className="note-input"
            placeholder="Siparişine eklemek istediğin bir not var mı?"
            value={not}
            onChange={(e) => setNot(e.target.value)}
          />
        </div>

        {/* Adet ve Toplam */}
        <div className="form-section order-controls">
          {/* Adet Seçimi */}
          <div className="quantity">
            <button onClick={() => setAdet(Math.max(1, adet - 1))}>-</button>
            {/*1den büyük sayı varsa onu seçsin diye Math.max metodu kullandım*/}
            <span>{adet}</span>
            <button onClick={() => setAdet(adet + 1)}>+</button>
          </div>

          {/* Sipariş Özeti */}
          <div className="total">
            <p>Seçimler: {toplamEkstra.toFixed(2)}₺</p>{" "}
            {/*virgülden sonra 2 basamak göstermesi için toFixed komutu kullandım */}
            <p>
              <strong>Toplam: {toplamFiyat.toFixed(2)}₺</strong>
            </p>
          </div>
        </div>

        {/* Sipariş Ver Butonu */}
        <button className="submit-order" onClick={handleSubmit}>
          SİPARİŞ VER
        </button>
      </div>
    </div>
  );
};

export default SiparisForm; // SiparisForm bileşenini dışarı aktarıyoruz
