"use client";

import React, { useEffect, useMemo, useState } from "react";

const ACAZDA_ORIGIN = "https://www.acadza.com";

function setCookie(name: string, value: string, days: number) {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "expires=" + d.toUTCString();

    // NOTE:
    // - Secure cookies require https
    // - SameSite=Strict may prevent some cross-site behaviors, but matches your HTML
    document.cookie =
        `${name}=${encodeURIComponent(value)};` +
        `${expires};path=/;Secure;SameSite=Strict`;
}

function getCookie(name: string) {
    const cname = name + "=";
    const decoded = decodeURIComponent(document.cookie || "");
    const parts = decoded.split(";");

    for (let i = 0; i < parts.length; i++) {
        const c = parts[i].trim();
        if (c.indexOf(cname) === 0) return c.substring(cname.length);
    }
    return "";
}

function deleteCookie(name: string) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export default function DostClient() {
    const [showPopup, setShowPopup] = useState(false);
    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const [iframeSrc, setIframeSrc] = useState<string | null>(null);

    const loginUrl = useMemo(() => `${ACAZDA_ORIGIN}/login?ref=rewise`, []);

    const signupUrl = (alpha: string, beta: string) =>
        `${ACAZDA_ORIGIN}/login?alpha=${encodeURIComponent(alpha)}&beta=${encodeURIComponent(beta)}`;

    const loadLoginIframe = () => {
        setIframeSrc(loginUrl);
    };

    const loadSignupIframe = (alpha: string, beta: string) => {
        setIframeSrc(signupUrl(alpha, beta));
    };

    const saveData = () => {
        const phone = loginId.trim();
        const pass = password.trim();

        setErrorMsg(null);

        if (!phone || !pass) {
            setErrorMsg("Please enter login id and password.");
            return;
        }

        setCookie("phone", phone, 7);
        setCookie("password", pass, 7);

        loadSignupIframe(phone, pass);
        setShowPopup(false);
    };

    useEffect(() => {
        // On initial load: if cookies exist => auto login, else show popup + load login page
        const phone = getCookie("phone");
        const pass = getCookie("password");

        if (phone && pass) {
            loadSignupIframe(phone, pass);
            setShowPopup(false);
        } else {
            loadLoginIframe();
            setShowPopup(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const onMessage = (event: MessageEvent) => {
            // Security: only accept messages from acadza.com
            if (event.origin !== ACAZDA_ORIGIN) return;

            const action = (event.data as any)?.action;

            if (action === "logout") {
                deleteCookie("phone");
                deleteCookie("password");
                loadLoginIframe();
                setShowPopup(true);
                setErrorMsg(null);
                setPassword("");
            }

            if (action === "loginerror") {
                deleteCookie("phone");
                deleteCookie("password");
                loadLoginIframe();
                setShowPopup(true);
                setErrorMsg("Login failed. Please check your credentials.");
                setPassword("");
            }
        };

        window.addEventListener("message", onMessage);
        return () => window.removeEventListener("message", onMessage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="dost-root">
            {/* Popup */}
            {showPopup ? (
                <div className="popup">
                    <div className="popupContent">
                        <h3>Enter Details</h3>

                        <input
                            type="text"
                            placeholder="Login ID"
                            value={loginId}
                            onChange={(e) => setLoginId(e.target.value)}
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") saveData();
                            }}
                        />

                        {errorMsg ? <div className="error">{errorMsg}</div> : null}

                        <button onClick={saveData}>Submit</button>
                    </div>
                </div>
            ) : null}

            {/* Iframe */}
            {iframeSrc && (
                <iframe
                    className="frame"
                    src={iframeSrc}
                    allowFullScreen
                    title="Rewise Dost"
                />
            )}


            <style jsx>{`
        .dost-root {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100vh;
          font-family: Arial, sans-serif;
        }

        .frame {
          border: none;
          width: 100%;
          height: 100%;
          display: block;
        }

        .popup {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .popupContent {
          background: #fff;
          padding: 20px;
          border-radius: 10px;
          width: 300px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
          text-align: center;
        }

        .popupContent input {
          width: 90%;
          padding: 8px;
          margin: 8px 0;
          border: 1px solid #ccc;
          border-radius: 5px;
          outline: none;
        }

        .popupContent button {
          background: #007bff;
          color: white;
          padding: 10px 15px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .popupContent button:hover {
          background: #0056b3;
        }

        .error {
          color: red;
          font-size: 14px;
          margin-top: 5px;
        }
      `}</style>
        </div>
    );
}