const searchInput = document.getElementById('search');
const results = document.getElementById('results');

let debounceTimeout;

searchInput.addEventListener('input', () => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => performSearch(searchInput.value), 300);
});

async function performSearch(query) {
    const response = await fetch('/search', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({search: query.trim()})
    });

    const data = await response.text();
    results.innerHTML = data;
}

// Initially load all users
document.addEventListener('DOMContentLoaded', () => performSearch(''));
