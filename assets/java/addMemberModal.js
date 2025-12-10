(() => {
  const addBtn = document.getElementById('addMemberBtn');
  const memberContainer = document.querySelector('.bg-white.dark\\:bg-gray-900\\/50.rounded-xl');
  
  console.log('Add Button found:', !!addBtn);
  console.log('Member Container found:', !!memberContainer);
  
  if (!addBtn || !memberContainer) return;

  // Buat modal HTML
  const modalHTML = `
    <div id="addMemberModal" class="hidden fixed inset-0 z-50 flex items-end bg-black/50">
      <div class="w-full bg-white dark:bg-gray-800 rounded-t-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-[#1C1C1E] dark:text-white">Tambah Anggota Baru</h2>
          <button id="closeAddMemberModal" class="text-[#8E8E93] dark:text-gray-400">
            <span class="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>
        
        <form id="addMemberForm" class="space-y-4">
          <div class="space-y-2">
            <label class="text-sm font-semibold text-[#1C1C1E] dark:text-white">Nama Anggota</label>
            <input type="text" id="memberNameInput" placeholder="Masukkan nama anggota" 
              class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-[#1C1C1E] dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" required />
          </div>
          
          <div class="space-y-2">
            <label class="text-sm font-semibold text-[#1C1C1E] dark:text-white">ID Anggota (Otomatis)</label>
            <input type="text" id="memberIdInput" placeholder="ID akan di-generate otomatis" 
              class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-[#1C1C1E] dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" readonly />
          </div>

          <div class="space-y-2">
            <label class="text-sm font-semibold text-[#1C1C1E] dark:text-white">Status</label>
            <select id="memberStatusInput" class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-[#1C1C1E] dark:text-white focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="Aktif">Aktif</option>
              <option value="Nonaktif">Nonaktif</option>
            </select>
          </div>

          <div class="space-y-2">
            <label class="text-sm font-semibold text-[#1C1C1E] dark:text-white">Avatar URL (Opsional)</label>
            <input type="url" id="memberAvatarInput" placeholder="https://example.com/avatar.jpg" 
              class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-[#1C1C1E] dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" />
            <p class="text-xs text-gray-500 dark:text-gray-400">Kosongkan untuk menggunakan avatar default</p>
          </div>
          
          <div class="flex gap-2 pt-4">
            <button type="button" id="cancelAddMemberBtn" class="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-[#1C1C1E] dark:text-white font-semibold">
              Batal
            </button>
            <button type="submit" class="flex-1 px-4 py-2 rounded-lg bg-primary text-white font-semibold">
              Tambah Anggota
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);

  const modal = document.getElementById('addMemberModal');
  const closeBtn = document.getElementById('closeAddMemberModal');
  const cancelBtn = document.getElementById('cancelAddMemberBtn');
  const form = document.getElementById('addMemberForm');
  const nameInput = document.getElementById('memberNameInput');
  const idInput = document.getElementById('memberIdInput');
  const statusSelect = document.getElementById('memberStatusInput');
  const avatarInput = document.getElementById('memberAvatarInput');

  function generateId() {
    return Math.floor(100000000 + Math.random() * 900000000).toString();
  }

  function openModal() {
    modal.classList.remove('hidden');
    idInput.value = generateId();
    setTimeout(() => nameInput.focus(), 50);
  }

  function closeModal() {
    modal.classList.add('hidden');
    form.reset();
    idInput.value = '';
  }

  addBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  nameInput.addEventListener('input', () => {
    if (!idInput.value) {
      idInput.value = generateId();
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = (nameInput.value || '').trim();
    const id = (idInput.value || '').trim();
    const status = statusSelect.value;
    const avatar = (avatarInput.value || '').trim() || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;

    if (!name || !id) {
      alert('Nama dan ID harus diisi');
      return;
    }

    const statusBgColor = status === 'Aktif' 
      ? 'bg-green-100 dark:bg-green-900/50' 
      : 'bg-red-100 dark:bg-red-900/50';
    const statusTextColor = status === 'Aktif'
      ? 'text-green-800 dark:text-green-300'
      : 'text-red-800 dark:text-red-300';

    const newMember = document.createElement('div');
    newMember.className = 'flex items-center gap-4 bg-transparent px-4 min-h-[72px] py-3 justify-between';
    newMember.innerHTML = `
      <div class="flex items-center gap-4 overflow-hidden">
        <img class="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-14 object-cover"
          src="${avatar}" alt="${escapeHtml(name)}" />
        <div class="flex flex-col justify-center overflow-hidden">
          <p class="text-[#111418] dark:text-white text-base font-medium leading-normal truncate">${escapeHtml(name)}</p>
          <p class="text-[#617589] dark:text-gray-400 text-sm font-normal leading-normal truncate">ID: ${escapeHtml(id)}</p>
        </div>
      </div>
      <div class="shrink-0">
        <div class="flex items-center justify-center">
          <div class="text-xs font-medium ${statusTextColor} ${statusBgColor} px-3 py-1 rounded-full">
            ${status}
          </div>
        </div>
      </div>
    `;

    memberContainer.appendChild(newMember);
    closeModal();
  });

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, (m) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[m]));
  }
})();
