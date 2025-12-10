// ...existing code...
(() => {
    const input = document.querySelector('.flex.items-center.gap-2.p-4 input');
    const listContainer = document.querySelector('.flex.flex-col.px-4.pb-24');
    if (!input || !listContainer) return;

    const getItems = () => Array.from(listContainer.children).filter(n => n.nodeType === 1);

    function applyFilter(q) {
    const ql = q.trim().toLowerCase();
    const items = getItems();
    if (!ql) {
        items.forEach(it => {
        it.style.display = '';
        it.classList.remove('ring-2','ring-primary/60');
        it.style.opacity = '';
        });
        return;
    }

    let found = 0;
    items.forEach(it => {
        const titleEl = it.querySelector('p.text-base.font-semibold') || it.querySelector('p');
        const authorEl = it.querySelector('p.text-sm') || (it.querySelectorAll('p')[1] || null);
        const text = ((titleEl?.textContent || '') + ' ' + (authorEl?.textContent || '')).toLowerCase();

        if (text.includes(ql)) {
        found++;
        it.style.display = '';
        it.style.opacity = '';
        it.classList.add('ring-2','ring-primary/60');
        } else {
        it.style.display = 'none';
        it.classList.remove('ring-2','ring-primary/60');
        }
    });


    const first = getItems().find(it => it.style.display !== 'none');
    if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function debounce(fn, wait = 200) {
    let t;
    return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn(...args), wait);
    };
    }

    const debouncedFilter = debounce(e => applyFilter(e.target.value), 150);
    input.addEventListener('input', debouncedFilter);


    input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        input.value = '';
        applyFilter('');
        input.blur();
    }
    });

    const obs = new MutationObserver(() => applyFilter(input.value || ''));
    obs.observe(listContainer, { childList: true });
})();