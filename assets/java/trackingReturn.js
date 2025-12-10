// ...existing code...
(() => {
const itemsContainer = document.querySelector('.flex.flex-col.gap-4.px-4.pb-4');

if (!itemsContainer) {
    console.warn('Items container tidak ditemukan');
    return;
}

function getItems() {
    return Array.from(itemsContainer.children).filter(n => 
    n.nodeType === 1 && n.classList.contains('flex') && n.classList.contains('flex-col')
    );
}

function createReturnModal(item) {
    const bookTitle = item.querySelector('p.text-base.font-semibold')?.textContent.trim() || 'Buku';
    const memberInfo = item.querySelector('p.text-text-secondary-light.dark\\:text-text-secondary-dark')?.textContent.trim() || 'Anggota';
    
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/50';
    modal.innerHTML = `
    <div class="w-[92%] max-w-md bg-card-light dark:bg-card-dark rounded-xl p-4">
        <div class="flex items-start justify-between mb-4">
        <div>
            <h3 class="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark">${escapeHtml(bookTitle)}</h3>
            <p class="text-sm text-text-secondary-light dark:text-text-secondary-dark">${escapeHtml(memberInfo)}</p>
        </div>
        <button class="closeModal text-text-secondary-light dark:text-text-secondary-dark">
            <span class="material-symbols-outlined">close</span>
        </button>
        </div>

        <div class="space-y-3 mb-4">
        <div>
            <label class="text-sm font-medium text-text-primary-light dark:text-text-primary-dark block mb-2">Tanggal Pengembalian</label>
            <input type="date" class="returnDate w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-card-light dark:bg-gray-700 text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div>
            <label class="text-sm font-medium text-text-primary-light dark:text-text-primary-dark block mb-2">Catatan (Opsional)</label>
            <textarea class="returnNote w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-card-light dark:bg-gray-700 text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Kondisi buku, dll..." rows="3"></textarea>
        </div>
        </div>

        <div class="flex gap-2">
        <button class="cancelModal flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-text-primary-light dark:text-text-primary-dark font-semibold">
            Batal
        </button>
        <button class="confirmReturn flex-1 px-4 py-2 rounded-lg bg-primary text-white font-semibold">
            Tandai Kembali
        </button>
        </div>
    </div>
    `;

    return modal;
}

function removeItem(item) {
    item.style.opacity = '0.5';
    item.style.textDecoration = 'line-through';
    
    const btn = item.querySelector('button');
    if (btn) {
    btn.disabled = true;
    btn.textContent = '✓ Sudah Dikembalikan';
    btn.classList.remove('bg-primary', 'bg-primary/20', 'dark:bg-primary/30');
    btn.classList.add('bg-green-100', 'dark:bg-green-900/50', 'text-green-800', 'dark:text-green-300');
    }
}

function undoItem(item) {
    item.style.opacity = '1';
    item.style.textDecoration = 'none';
    
    const btn = item.querySelector('button');
    if (btn) {
    btn.disabled = false;
    const isOverdue = item.querySelector('p.text-accent-red') !== null;
    if (isOverdue) {
        btn.textContent = 'Tandai Kembali';
        btn.classList.remove('bg-green-100', 'dark:bg-green-900/50', 'text-green-800', 'dark:text-green-300');
        btn.classList.add('bg-primary');
    } else {
        btn.textContent = 'Tandai Kembali';
        btn.classList.remove('bg-green-100', 'dark:bg-green-900/50', 'text-green-800', 'dark:text-green-300');
        btn.classList.add('bg-primary/20', 'dark:bg-primary/30', 'text-primary');
    }
    }
}


itemsContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;

    
    let item = btn.closest('.flex.flex-col.gap-4');
    if (!item || item === itemsContainer) return;

    
    if (btn.disabled || btn.textContent.includes('Sudah')) {
    if (confirm('Batalkan penandaan pengembalian?')) {
        undoItem(item);
    }
    return;
    }

    
    const modal = createReturnModal(item);
    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('.closeModal');
    const cancelBtn = modal.querySelector('.cancelModal');
    const confirmBtn = modal.querySelector('.confirmReturn');
    const dateInput = modal.querySelector('.returnDate');
    const noteInput = modal.querySelector('.returnNote');

    
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;

    function closeModal() {
    modal.remove();
    }

    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);

    confirmBtn.addEventListener('click', () => {
    const returnDate = dateInput.value;
    const note = noteInput.value.trim();

    if (!returnDate) {
        alert('Tanggal pengembalian harus diisi');
        return;
    }

    
    removeItem(item);
    
    
    console.log('Buku dikembalikan:', {
        tanggalPengembalian: returnDate,
        catatan: note,
        item: item.textContent
    });

    closeModal();
    });

    modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
    });
});

function escapeHtml(str) {
    return str.replace(/[&<>"']/g, (m) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
    }[m]));
}
})();
