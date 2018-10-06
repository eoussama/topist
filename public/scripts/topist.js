window.addEventListener('load', () => {
    const topistEntriesContainer = document.getElementById('topist-entries-entainer');
    
    if(topistEntriesContainer) {
        const topistCounter = document.getElementById('topist-counter');
        var topistEntriesNumber = parseInt(topistCounter.value);

        topistCounter.addEventListener('change', () => {
            topistEntriesNumber = parseInt(topistCounter.value);

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
                                <p class="control">
                                    <input class="input" type="text" placeholder="*Entry title" required>
                                </p>
                            </div>
                            <div class="level-item has-text-centered">
                                <p class="control">
                                    <input class="input" type="text" placeholder="Entry subtitle">
                                </p>
                            </div>
                            <div class="level-item has-text-centered">
                                <p class="control">
                                    <input class="input" type="url" placeholder="*Entry picture url" required>
                                </p>
                            </div>
                        </div>
                    </nav>
                    ${i === topistEntriesNumber - 1 ? '' : '<hr>'}`;
            }
        }

        updateEntryInputs();
    }
});