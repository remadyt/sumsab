import React, { useState } from "react";
import snsWebSdk from "@sumsub/websdk";

const App: React.FC = () => {
    const [token, setToken] = useState<string>(""); // Состояние для токена
    const [sdkInitialized, setSdkInitialized] = useState<boolean>(false); // Состояние для управления инициализацией SDK

    const handleLaunchSdk = () => {
        if (!token) {
            alert("Введите токен!");
            return;
        }

        // Инициализация WebSDK
        const snsWebSdkInstance = snsWebSdk
            .init(token, () => Promise.resolve(token))
            .withConf({
                lang: "en",
                theme: "dark",
            })
            .withOptions({ adaptIframeHeight: true })
            .on("idCheck.onStepCompleted", (payload) => {
                console.log("Шаг завершен:", payload);
            })
            .on("idCheck.onError", (error) => {
                console.error("Ошибка:", error);
            })
            .build();

        snsWebSdkInstance.launch("#sumsub-websdk-container");
        setSdkInitialized(true);
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "80vh",
                width: "100vw",
                fontFamily: "Arial",
                flexDirection: "column",
                textAlign: "center",
            }}
        >
            <h1>SumSub</h1>

            {!sdkInitialized && (
                <div style={{marginBottom: "20px"}}>
                    <input
                        type="text"
                        placeholder="Введите Access Token"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        style={{
                            padding: "10px",
                            marginBottom: "10px", // Отступ снизу
                            display: sdkInitialized ? "none" : "block",
                        }}
                    />
                    <button
                        onClick={handleLaunchSdk}
                        style={{
                            cursor: "pointer",
                            backgroundColor: "#007BFF",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                        }}
                        disabled={sdkInitialized}
                    >
                        {sdkInitialized ? "SDK Запущен" : "Запустить SDK"}
                    </button>
                </div>
            )}

            <div
                id="sumsub-websdk-container"
                style={{
                    display: sdkInitialized ? "block" : "none",
                    width: "100%",
                    height: "90vh",
                }}
            />
        </div>
    );
};

export default App;
