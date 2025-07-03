import "./Success.css";
import React, { useEffect } from "react";
import {useNavigate} from "react-router-dom";

const Success = () => {
    const navigate = useNavigate();
    //sayfayı 5 saniye sonra otomatik yönlendirelim
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/");
        }, 5000);

        return () => clearTimeout(timer);
    },[navigate]);

    return (
        <div className="success-page">
            <h1 className="logo">Teknolojik Yemekler</h1>
            <h2 className="message">TEBRİKLER! <br />SİPARİŞİNİZ ALINDI! </h2>
        </div>
    )
}

export default Success;