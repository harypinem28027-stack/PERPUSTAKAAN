// ...existing code...
(() => {
const searchInput = document.querySelector('.px-4.py-3 input[placeholder*="Cari buku"]');
const filterLinks = document.querySelectorAll('.flex.gap-3.px-4.pb-4 a');
const itemsContainer = document.querySelector('.flex.flex-col.gap-4.px-4.pb-4');

if (!searchInput || !itemsContainer) {
    console.warn('Search input atau container tidak ditemukan');
    return;
}

  // Ambil semua item (list items)
const getItems = () => Array.from(itemsContainer.children).filter(n => n.nodeType === 1);

  // Debounce function
function debounce(fn, wait = 200) {
    let t;
    return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
    };
}


function applyFilters(searchQuery, filterType) {
    const sq = searchQuery.trim().toLowerCase();
    const items = getItems();
    let visibleCount = 0;

    items.forEach(item => {
    const bookTitle = item.querySelector('p.text-base.font-semibold')?.textContent.toLowerCase() || '';
    const memberInfo = item.querySelector('p.text-text-secondary-light')?.textContent.toLowerCase() || '';
    const statusText = item.textContent.toLowerCase();

    
    const matchesSearch = sq === '' || bookTitle.includes(sq) || memberInfo.includes(sq);

    
    let matchesFilter = true;
    if (filterType === 'terlambat') {
        matchesFilter = statusText.includes('terlambat');
    } else if (filterType === 'hari-ini') {
        matchesFilter = statusText.includes('jatuh tempo hari ini');
    }
    

    if (matchesSearch && matchesFilter) {
        item.style.display = '';
        visibleCount++;
    } else {
        item.style.display = 'none';
    }
    });

    
    if (visibleCount === 0 && items.length > 0) {
    if (!document.getElementById('noResultsMsg')) {
        const noResults = document.createElement('div');
        noResults.id = 'noResultsMsg';
        noResults.className = 'text-center py-8 text-text-secondary-light dark:text-text-secondary-dark';
        noResults.innerHTML = '<p class="text-base">Tidak ada hasil yang cocok</p>';
        itemsContainer.appendChild(noResults);
    }
    } else {
    const noResultsMsg = document.getElementById('noResultsMsg');
    if (noResultsMsg) noResultsMsg.remove();
    }
}


function getCurrentFilter() {
    const params = new URLSearchParams(window.location.search);
    return params.get('filter') || 'semua';
}


function updateActiveChip(filterType) {
    filterLinks.forEach(link => {
    const href = link.getAttribute('href');
    const isActive = href.includes(`filter=${filterType}`);
    
    if (isActive) {
        link.classList.remove('bg-card-light', 'dark:bg-card-dark', 'hover:bg-gray-100', 'dark:hover:bg-gray-800');
        link.classList.add('bg-primary');
        link.querySelector('p').classList.remove('text-text-primary-light', 'dark:text-text-primary-dark');
        link.querySelector('p').classList.add('text-white');
    } else {
        link.classList.remove('bg-primary');
        link.classList.add('bg-card-light', 'dark:bg-card-dark', 'hover:bg-gray-100', 'dark:hover:bg-gray-800');
        link.querySelector('p').classList.remove('text-white');
        link.querySelector('p').classList.add('text-text-primary-light', 'dark:text-text-primary-dark');
    }
    });
}


const currentFilter = getCurrentFilter();
updateActiveChip(currentFilter);
applyFilters(searchInput.value, currentFilter);


const debouncedSearch = debounce(() => {
    applyFilters(searchInput.value, getCurrentFilter());
}, 150);

searchInput.addEventListener('input', debouncedSearch);


filterLinks.forEach(link => {
    link.addEventListener('click', (e) => {
    e.preventDefault();
    const href = link.getAttribute('href');
    const params = new URLSearchParams(href.split('?')[1]);
    const filterType = params.get('filter');
    
    updateActiveChip(filterType);
    applyFilters(searchInput.value, filterType);
    
    
    window.history.pushState({}, '', href);
    });
});


searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
    searchInput.value = '';
    applyFilters('', getCurrentFilter());
    searchInput.blur();
    }
});


const observer = new MutationObserver(() => {
    applyFilters(searchInput.value, getCurrentFilter());
});
observer.observe(itemsContainer, { childList: true });
})();
