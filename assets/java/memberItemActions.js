(() => {
  const memberContainer = document.querySelector('.bg-white.dark\\:bg-gray-900\\/50.rounded-xl');
  const modal = document.createElement('div');
  modal.id = 'memberActionModal';
  modal.className = 'hidden fixed inset-0 z-60 flex items-center justify-center bg-black/50';
  modal.innerHTML = `
    <div class="w-[92%] max-w-md bg-white dark:bg-gray-800 rounded-xl p-4">
      <div class="flex items-start justify-between">
        <div>
          <h3 id="actionMemberTitle" class="text-lg font-semibold text-[#1C1C1E] dark:text-white">Nama Anggota</h3>
          <p id="actionMemberId" class="text-sm text-[#8E8E93] dark:text-gray-400">ID: 123456789</p>
        </div>
        <button id="closeMemberActionModal" class="text-[#8E8E93] dark:text-gray-400">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <div class="mt-4 flex gap-2">
        <button id="toggleMemberStatusBtn" class="flex-1 px-4 py-2 rounded-lg bg-yellow-500 text-white font-semibold">
          Ubah Status
        </button>
        <button id="deleteMemberBtn" class="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white font-semibold">
          Hapus
        </button>
      </div>

      <button id="cancelMemberActionBtn" class="mt-3 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-[#1C1C1E] dark:text-white font-semibold">
        Batal
      </button>
    </div>
  `;
  document.body.appendChild(modal);

  const closeBtn = document.getElementById('closeMemberActionModal');
  const cancelBtn = document.getElementById('cancelMemberActionBtn');
  const toggleStatusBtn = document.getElementById('toggleMemberStatusBtn');
  const deleteBtn = document.getElementById('deleteMemberBtn');
  const actionTitle = document.getElementById('actionMemberTitle');
  const actionId = document.getElementById('actionMemberId');

  let currentItem = null;

  function openModal(item) {
    currentItem = item;
    const nameEl = item.querySelector('p.text-base.font-medium');
    const idEl = item.querySelector('p.text-sm');
    actionTitle.textContent = nameEl ? nameEl.textContent.trim() : 'Tanpa nama';
    actionId.textContent = idEl ? idEl.textContent.trim() : 'ID: -';
    
    const statusEl = item.querySelector('div.text-xs.font-medium');
    const isAktif = statusEl && /aktif/i.test(statusEl.textContent);
    toggleStatusBtn.textContent = isAktif ? 'Tandai Nonaktif' : 'Tandai Aktif';
    
    modal.classList.remove('hidden');
  }

  function closeModal() {
    modal.classList.add('hidden');
    currentItem = null;
  }

  
  memberContainer.addEventListener('click', (e) => {
    let node = e.target;
    while (node && node !== memberContainer) {
      if (node.parentElement === memberContainer) break;
      node = node.parentElement;
    }
    if (!node || node === memberContainer) return;
    openModal(node);
  });

  
  toggleStatusBtn.addEventListener('click', () => {
    if (!currentItem) return;
    let statusEl = currentItem.querySelector('div.text-xs.font-medium');
    if (!statusEl) return;

    const isAktif = /aktif/i.test(statusEl.textContent);
    if (isAktif) {
      statusEl.textContent = 'Nonaktif';
      statusEl.classList.remove('text-green-800', 'dark:text-green-300', 'bg-green-100', 'dark:bg-green-900/50');
      statusEl.classList.add('text-red-800', 'dark:text-red-300', 'bg-red-100', 'dark:bg-red-900/50');
    } else {
      statusEl.textContent = 'Aktif';
      statusEl.classList.remove('text-red-800', 'dark:text-red-300', 'bg-red-100', 'dark:bg-red-900/50');
      statusEl.classList.add('text-green-800', 'dark:text-green-300', 'bg-green-100', 'dark:bg-green-900/50');
    }
    closeModal();
  });

  
  deleteBtn.addEventListener('click', () => {
    if (!currentItem) return;
    currentItem.remove();
    closeModal();
  });

  closeBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
})();