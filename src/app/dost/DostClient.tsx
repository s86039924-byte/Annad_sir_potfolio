"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const ACAZDA_ORIGIN = "https://www.acadza.com";

function setCookie(name: string, value: string, days: number) {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "expires=" + d.toUTCString();

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
    const router = useRouter();

    const [showPopup, setShowPopup] = useState(false);
    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [iframeSrc, setIframeSrc] = useState<string | null>(null);

    const loginUrl = useMemo(
        () => `${ACAZDA_ORIGIN}/login?ref=rewise`,
        []
    );

    const signupUrl = (alpha: string, beta: string) =>
        `${ACAZDA_ORIGIN}/login?alpha=${encodeURIComponent(alpha)}&beta=${encodeURIComponent(beta)}`;

    const loadLoginIframe = () => setIframeSrc(loginUrl);

    const loadSignupIframe = (alpha: string, beta: string) =>
        setIframeSrc(signupUrl(alpha, beta));

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
        const phone = getCookie("phone");
        const pass = getCookie("password");

        if (phone && pass) {
            loadSignupIframe(phone, pass);
            setShowPopup(false);
        } else {
            loadLoginIframe();
            setShowPopup(true);
        }
    }, []);

    useEffect(() => {
        const onMessage = (event: MessageEvent) => {
            if (event.origin !== ACAZDA_ORIGIN) return;

            const action = (event.data as any)?.action;

            if (action === "logout" || action === "loginerror") {
                deleteCookie("phone");
                deleteCookie("password");
                loadLoginIframe();
                setShowPopup(true);
                setPassword("");
                setErrorMsg(
                    action === "loginerror"
                        ? "Login failed. Please check your credentials."
                        : null
                );
            }
        };

        window.addEventListener("message", onMessage);
        return () => window.removeEventListener("message", onMessage);
    }, []);

    return (
        <div className="dost-root">
            {showPopup && (
                <div className="popup">
                    <div className="popupContent">
                        {/* ❌ Close Button */}
                        <button
                            className="closeButton"
                            aria-label="Close"
                            onClick={() => router.push("/")}
                        >
                            ×
                        </button>

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

                        {errorMsg && <div className="error">{errorMsg}</div>}

                        <button onClick={saveData}>Submit</button>
                    </div>
                </div>
            )}

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
                    width: 100%;
                    height: 100vh;
                }

                .frame {
                    border: none;
                    width: 100%;
                    height: 100%;
                }

                .popup {
                    position: fixed;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.6);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                }

                .popupContent {
                    position: relative;
                    background: #fff;
                    padding: 30px 20px 20px;
                    border-radius: 10px;
                    width: 300px;
                    text-align: center;
                }

                .closeButton {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    width: 36px;
                    height: 30px;
                    background: #fff;
                    border: none;
                    font-size: 20px;
                    font-weight: bold;
                    color: #ff3b3b;
                    border-radius: 6px;
                    cursor: pointer;
                }

                .popupContent input {
                    width: 90%;
                    padding: 8px;
                    margin: 8px 0;
                }

                .popupContent button {
                    background: #007bff;
                    color: white;
                    padding: 10px 15px;
                    border-radius: 5px;
                    border: none;
                    cursor: pointer;
                }

                .error {
                    color: red;
                    font-size: 14px;
                }
            `}</style>
        </div>
    );
}
