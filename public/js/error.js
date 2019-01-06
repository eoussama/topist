/**
 * The error page' script.
 */

// Waiting for the window to load.
window.addEventListener('load', () => {

    // Getting the back button.
    const backBtn = document.getElementById("btn-back");

    // Invoking a click event on the button.
    backBtn.addEventListener('click', () => {

        // Reverting the browser's history back.
        window.history.back();
    });
});
