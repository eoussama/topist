/**
 * The error page' script.
 */

// Waiting for the window to load.
window.addEventListener('load', function () {

	// Getting the back button.
	var backBtn = document.getElementById("btn-back");

	// Invoking a click event on the button.
	backBtn.addEventListener('click', function () {

		// Reverting the browser's history back.
		window.history.back();
	});
});
