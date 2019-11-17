/**
 * The main script.
 */

// Waiting for the window to load.
window.addEventListener('load', function () {

	var lists = document.querySelectorAll('div.tops-box');

	if (lists) {

		// Adding a click handler.
		lists.forEach((list) => {
			list.addEventListener('click', function () {
				window.location = `/topist/${list.dataset.id}`);
		});
	}
});
