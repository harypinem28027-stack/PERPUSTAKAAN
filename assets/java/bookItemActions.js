
(() => {
const listContainer = document.querySelector('.flex.flex-col.px-4.pb-24');
if (!listContainer) {
    console.warn('List container tidak ditemukan');
    return;
}

const modal = document.getElementById('bookActionModal');
const actionTitle = document.getElementById('actionTitle');
const actionAuthor = document.getElementById('actionAuthor');
const closeActionModal = document.getElementById('closeActionModal');
const cancelActionBtn = document.getElementById('cancelActionBtn');
const toggleStatusBtn = document.getElementById('toggleStatusBtn');
const deleteBookBtn = document.getElementById('deleteBookBtn');


if (!modal || !actionTitle || !actionAuthor) {
    console.warn('Modal elements tidak lengkap');
    return;
}

let currentItem = null;

function openModalForItem(item) {
    currentItem = item;
    const titleEl = item.querySelector('p.text-base.font-semibold') || item.querySelector('p');
    const authorEl = item.querySelector('p.text-sm') || item.querySelectorAll('p')[1];
    
    actionTitle.textContent = titleEl ? titleEl.textContent.trim() : 'Tanpa judul';
    actionAuthor.textContent = authorEl ? authorEl.textContent.trim() : '';
    
    const badge = item.querySelector('div.inline-flex');
    const isAvailable = badge && /tersedia/i.test(badge.textContent);
    toggleStatusBtn.textContent = isAvailable ? 'Tandai Dipinjam' : 'Tandai Tersedia';
    
    modal.classList.remove('hidden');
}

function closeModal() {
    modal.classList.add('hidden');
    currentItem = null;
}


listContainer.addEventListener('click', (e) => {
    let node = e.target;
    while (node && node !== listContainer) {
    if (node.parentElement === listContainer) break;
    node = node.parentElement;
    }
    if (!node || node === listContainer) return;
    openModalForItem(node);
});

toggleStatusBtn?.addEventListener('click', () => {
    if (!currentItem) return;
    
    let badge = currentItem.querySelector('div.inline-flex');
    if (!badge) {
    badge = document.createElement('div');
    badge.className = 'mt-1 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium';
    currentItem.querySelector('.flex.flex-col')?.appendChild(badge);
    }

    const cur = badge.textContent.trim().toLowerCase();
    if (cur.includes('tersedia')) {
    badge.textContent = 'Dipinjam';
    badge.classList.remove('bg-green-100', 'text-green-800', 'dark:bg-green-900/50', 'dark:text-green-300');
    badge.classList.add('bg-red-100', 'text-red-800', 'dark:bg-red-900/50', 'dark:text-red-300');
    toggleStatusBtn.textContent = 'Tandai Tersedia';
    } else {
    badge.textContent = 'Tersedia';
    badge.classList.remove('bg-red-100', 'text-red-800', 'dark:bg-red-900/50', 'dark:text-red-300');
    badge.classList.add('bg-green-100', 'text-green-800', 'dark:bg-green-900/50', 'dark:text-green-300');
    toggleStatusBtn.textContent = 'Tandai Dipinjam';
    }

    closeModal();
});


deleteBookBtn?.addEventListener('click', () => {
    if (!currentItem) return;
    if (confirm('Yakin ingin menghapus buku ini?')) {
    currentItem.remove();
    closeModal();
    }
});


closeActionModal?.addEventListener('click', closeModal);
cancelActionBtn?.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});


const observer = new MutationObserver(() => {

});
observer.observe(listContainer, { childList: true });
})();
