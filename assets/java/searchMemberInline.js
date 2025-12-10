// ...existing code...
(() => {
const searchInput = document.querySelector('.px-4.py-3 input[placeholder*="Cari nama"]');
const memberContainer = document.querySelector('.bg-white.dark\\:bg-gray-900\\/50.rounded-xl');
const filterRadios = document.querySelectorAll('input[name="filter-group"]');

if (!searchInput || !memberContainer) return;

const getMemberItems = () => Array.from(memberContainer.children).filter(n => n.nodeType === 1);

function applyFilters(searchQuery, statusFilter) {
const sq = searchQuery.trim().toLowerCase();
const items = getMemberItems();

items.forEach(item => {
    const nameEl = item.querySelector('p.text-base.font-medium');
    const idEl = item.querySelector('p.text-sm');
    const statusEl = item.querySelector('div.text-xs.font-medium');

    const name = (nameEl?.textContent || '').toLowerCase();
    const id = (idEl?.textContent || '').toLowerCase();
    const status = statusEl?.textContent.trim() || '';


    const matchesSearch = sq === '' || name.includes(sq) || id.includes(sq);


    const matchesStatus = statusFilter === 'Semua' || status === statusFilter;

if (matchesSearch && matchesStatus) {
    item.style.display = '';
    item.classList.add('ring-2', 'ring-primary/60');
    } else {
    item.style.display = 'none';
    item.classList.remove('ring-2', 'ring-primary/60');
    }
    });
}


function debounce(fn, wait = 200) {
    let t;
    return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
    };
}

const currentFilter = () => {
    const checked = document.querySelector('input[name="filter-group"]:checked');
    return checked?.value || 'Semua';
};

const debouncedFilter = debounce(() => {
    applyFilters(searchInput.value, currentFilter());
}, 150);


searchInput.addEventListener('input', debouncedFilter);

  // Event listener untuk filter radio buttons
filterRadios.forEach(radio => {
    radio.addEventListener('change', () => {
    applyFilters(searchInput.value, currentFilter());
    });
});

  // Clear search dengan Escape
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
    searchInput.value = '';
    applyFilters('', currentFilter());
    searchInput.blur();
    }
});

  // Re-apply filter saat list berubah (item baru ditambahkan)
const observer = new MutationObserver(() => {
    applyFilters(searchInput.value, currentFilter());
});
observer.observe(memberContainer, { childList: true });
})();