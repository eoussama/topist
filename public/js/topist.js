/**
 * The topist control's script.
 */

// Waiting for the window to load.
window.addEventListener('load', function () {

	// Getting the host container.
	var topistEntriesContainer = document.getElementById('topist-entries-entainer');

	if (topistEntriesContainer) {
		var
			topistCounter = document.getElementById('topist-counter'),
			formTopist = document.getElementById('form-topist');

		var topistEntriesNumber = parseInt(topistCounter.value);

		topistCounter.addEventListener('change', function () {
			topistEntriesNumber = parseInt(topistCounter.value);

			updateEntryInputs();
		});

		formTopist.addEventListener('submit', function (e) {
			e.preventDefault();

			var
				topist = {
					topic: document.getElementById('topic-title').value,
					description: document.getElementById('topic-description').value,
					date: new Date(),
					user: 'admin',
					upvotes: 0,
					downvotes: 0,
					views: 0,
					entries: getEntries()
				},
				xhr = new XMLHttpRequest();

			xhr.open("POST", '/topist', true);
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.send(`topist=${JSON.stringify(topist)}`);
			window.location = '/';
		});

		formTopist.addEventListener('reset', function () {
			topistEntriesNumber = 10;
			updateEntryInputs();
		});

		function updateEntryInputs() {
			topistEntriesContainer.innerHTML = "";

			for (var i = 0; i < topistEntriesNumber; i++) {
				topistEntriesContainer.innerHTML += `
                    <nav class="level">
                        <div class="level-left">
                            <div class="level-item has-text-centered">
                                <div class="topbox-pos pos-${i + 1}">
                                    <span class="value">${i + 1}</span>
                                </div>
                            </div>
                        </div>
                        <div class="level-right">
                            <div class="level-item has-text-centered">
                                <div class="tile is-ancestor">
                                    <div class="tile is-vertical is-parent">
                                        <div class="tile is-child box">
                                            <p class="control">
                                                <input class="input" data-entry-title="${i + 1}" type="text" placeholder="*Entry title" required>
                                            </p>
                                        </div>
                                        <div class="tile is-child box">
                                            <p class="control">
                                                <input class="input" data-entry-subtitle="${i + 1}" type="text" placeholder="Entry subtitle">
                                            </p>
                                        </div>
                                        <div class="tile is-child box">
                                            <p class="control">
                                                <input class="input" data-entry-picture="${i + 1}" type="url" placeholder="Entry picture url">
                                            </p>
                                        </div>
                                    </div>
                                    <div class="tile is-vertical is-parent">
                                        
                                        <div class="tile is-child box">
                                            <p class="control">
                                                <textarea data-entry-description="${i + 1}" class="textarea" placeholder="Entry description"></textarea>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                    ${i === topistEntriesNumber - 1 ? '' : '<hr>'}`;
			}
		}

		function getEntries() {
			var _entries = [];

			for (var i = 0; i < topistEntriesNumber; i++) {
				_entries.push({
					position: i + 1,
					title: document.querySelector(`[data-entry-title="${i + 1}"]`).value,
					subtitle: document.querySelector(`[data-entry-subtitle="${i + 1}"]`).value,
					picture: document.querySelector(`[data-entry-picture="${i + 1}"]`).value,
					description: document.querySelector(`[data-entry-description="${i + 1}"]`).value
				});
			}

			return _entries;
		}

		updateEntryInputs();
	}
});
