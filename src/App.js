/* global chrome */
import { useState, useEffect } from "react";
import "./App.css";

function App() {
    const [selectedText, setSelectedText] = useState("");
    const [verificationResult, setVerificationResult] = useState("");

    useEffect(() => {
        // `chrome.tabs` API를 사용하여 현재 활성화된 탭의 정보를 가져옵니다.
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            try {
                if (chrome.runtime.lastError) {
                    // 쿼리 자체에서 오류가 발생한 경우
                    setSelectedText("현재 탭 정보를 가져올 수 없습니다.");
                    console.error("tabs.query error:", chrome.runtime.lastError.message);
                    return;
                }

                if (!tabs || tabs.length === 0 || !tabs[0].id) {
                    setSelectedText("이 페이지에서는 기능을 사용할 수 없습니다.");
                    return;
                }
                const tabId = tabs[0].id;

                chrome.scripting.executeScript(
                    {
                        target: { tabId: tabId },
                        func: () => window.getSelection().toString(),
                    },
                    (injectionResults) => {
                        if (chrome.runtime.lastError) {
                            // 스크립트 실행 권한이 없는 페이지(chrome:// 등)인 경우
                            setSelectedText("이 페이지의 텍스트는 가져올 수 없습니다.");
                            console.warn("Script injection failed:", chrome.runtime.lastError.message);
                            return;
                        }

                        // 스크립트 실행 결과가 있고, 결과값(선택된 텍스트)이 비어있지 않은 경우
                        if (injectionResults && injectionResults[0] && injectionResults[0].result) {
                            setSelectedText(injectionResults[0].result);
                        }
                    }
                );
            } catch (e) {
                setSelectedText("알 수 없는 오류가 발생했습니다.");
                console.error("An unexpected error occurred:", e);
            }
        });
    }, []);

    const handleVerification = () => {
        // TODO: 실제 검증 로직 구현 필요
        setVerificationResult(`'${selectedText}'\n\n위 내용에 대한 검증이 완료되었습니다.`);
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>AI 기반 의료·약품 정보 검증 시스템</h1>
            </header>

            <main className="content-area">
                <div className="card">
                    <h2 className="card-title">선택한 내용</h2>
                    <p className="selected-text">{selectedText}</p>
                </div>

                <button
                    className="verify-button"
                    onClick={handleVerification}
                >
                    검증
                </button>

                <div className="card result-card">
                    <h2 className="card-title">검증 결과</h2>
                    <p className="result-text">{verificationResult}</p>
                </div>
            </main>
        </div>
    );
}

export default App;
