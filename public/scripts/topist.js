window.addEventListener('load', () => {
    const topistEntriesContainer = document.getElementById('topist-entries-entainer');
    
    if(topistEntriesContainer) {
        const
            topistCounter = document.getElementById('topist-counter'),
            formTopist = document.getElementById('form-topist');

        var topistEntriesNumber = parseInt(topistCounter.value);

        topistCounter.addEventListener('change', () => {
            topistEntriesNumber = parseInt(topistCounter.value);

            updateEntryInputs();
        });

        formTopist.addEventListener('submit', (e) => {
            e.preventDefault();

            const
                topist = {
                    _id: 'fgdfgdf-hjghhdd',
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
  
            xhr.addEventListener('load', () => {
                if(this.status == 200) {
                    console.log('request sent!');
                }
            });
                
            xhr.open("POST", '/topist', true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(`topist=${JSON.stringify(topist)}`);
        });

        formTopist.addEventListener('reset', () => {
            topistEntriesNumber = 10;
            updateEntryInputs();
        });

        function updateEntryInputs() {
            topistEntriesContainer.innerHTML = "";

            for(let i = 0; i<topistEntriesNumber; i++) {
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

            for(let i = 0; i<topistEntriesNumber; i++) {
                _entries.push({
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