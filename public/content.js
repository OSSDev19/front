let popup = null;
let originalPopupRect = null;

function showPopup(selection) {
    const selectedText = selection.toString().trim();
    if (selectedText.length === 0) return;

    if (popup) {
        popup.remove();
        popup = null;
    }

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    popup = document.createElement("div");
    popup.id = "text-verifier-popup";

    originalPopupRect = {
        left: rect.left + rect.width / 2,
        top: rect.top,
        width: 100,
    };

    popup.style.left = `${originalPopupRect.left + window.scrollX}px`;
    popup.style.top = `${originalPopupRect.top + window.scrollY - 10}px`;

    const button = document.createElement("button");
    button.textContent = "검증";
    popup.appendChild(button);

    document.body.appendChild(popup);

    button.addEventListener("click", function (event) {
        event.stopPropagation();
        showLoadingAnimation(selectedText);
    });
}

function showLoadingAnimation(selectedText) {
    if (!popup) return;

    popup.innerHTML = `
        <div class="loader-container">
            <div class="loader"></div>
        </div>
    `;

    setTimeout(() => {
        showVerificationResult(selectedText);
    }, 1500);
}

function showVerificationResult(selectedText) {
    if (!popup) return;

    const newWidth = 350;
    popup.style.width = `${newWidth}px`;

    const isSafe = Math.random() > 0.5;
    const resultType = isSafe ? "safe" : "unsafe";
    const title = isSafe ? "신뢰할 수 있는 정보" : "주의가 필요한 정보";
    const description = isSafe
        ? "이 정보는 여러 신뢰할 수 있는 출처에서 검증되었습니다."
        : "이 정보는 논란의 여지가 있거나, 검증되지 않은 출처의 내용을 포함하고 있을 수 있습니다.";

    popup.innerHTML = `
        <div class="verification-result ${resultType}">
            <button class="close-button" type="button">&times;</button>
            <h3>${title}</h3>
            <p class="selected-text">"${selectedText}"</p>
            <p>${description}</p>
        </div>
    `;

    popup.querySelector(".close-button").addEventListener("click", (e) => {
        e.stopPropagation();
        if (popup) {
            popup.remove();
            popup = null;
        }
    });
}

document.addEventListener("mouseup", function (event) {
    setTimeout(() => {
        const selection = window.getSelection();
        if (selection && selection.toString().trim().length > 0) {
            if (popup && popup.contains(selection.anchorNode)) {
                return;
            }
            showPopup(selection);
        }
    }, 1);
});

document.addEventListener("mousedown", function (event) {
    if (popup && !popup.contains(event.target)) {
        popup.remove();
        popup = null;
    }
});
