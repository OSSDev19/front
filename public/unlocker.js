/**
 * This script re-enables text selection, right-clicking, and copying.
 * It is designed to work inside iframes, like those on Naver Blog.
 */
(function () {
    "use strict";

    const eventsToStop = ["contextmenu", "selectstart", "dragstart", "copy", "cut"];

    const stopEvent = (e) => {
        e.stopImmediatePropagation();
        return false;
    };

    // Block events at the capture phase to ensure they are caught first.
    eventsToStop.forEach((event) => {
        window.addEventListener(event, stopEvent, true);
    });

    // Nullify properties on document and body
    // This helps against older techniques.
    try {
        if (document.body) {
            eventsToStop.forEach((event) => {
                document.body[`on${event}`] = null;
            });
        }
        eventsToStop.forEach((event) => {
            document[`on${event}`] = null;
        });
    } catch (e) {
        // ignore
    }

    // Forcefully apply user-select styles to all elements.
    // This is the most effective way for CSS-based blocking.
    const style = document.createElement("style");
    style.innerHTML = `
      *, *::before, *::after {
        -webkit-user-select: text !important;
        -moz-user-select: text !important;
        -ms-user-select: text !important;
        user-select: text !important;
      }
    `;

    // Append the style to the head to ensure it's applied.
    // Use requestAnimationFrame to wait for the document head to be available.
    requestAnimationFrame(() => {
        document.documentElement.appendChild(style);
    });
})();
