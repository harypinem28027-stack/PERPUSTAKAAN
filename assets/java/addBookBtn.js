const addBookBtn = document.getElementById('addBookBtn');
const addBookModal = document.getElementById('addBookModal');
const closeModal = document.getElementById('closeModal');
const cancelBtn = document.getElementById('cancelBtn');
const addBookForm = document.getElementById('addBookForm');
const bookLinkInput = document.getElementById('bookLink');
const bookTitleInput = document.getElementById('bookTitle');
const bookAuthorInput = document.getElementById('bookAuthor');

// Buka Modal
addBookBtn.addEventListener('click', () => {
    addBookModal.classList.remove('hidden');
});

// Tutup Modal
const closeModalFunction = () => {
    addBookModal.classList.add('hidden');
    addBookForm.reset();
};

closeModal.addEventListener('click', closeModalFunction);
cancelBtn.addEventListener('click', closeModalFunction);

// Tutup Modal saat klik di luar
addBookModal.addEventListener('click', (e) => {
    if (e.target === addBookModal) {
    closeModalFunction();
    }
});

// Submit Form
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const bookLink = bookLinkInput.value;
    const bookTitle = bookTitleInput.value;
    const bookAuthor = bookAuthorInput.value;

    const newBookItem = document.createElement('div');
    newBookItem.className = 'flex items-center gap-4 bg-white dark:bg-gray-800/50 rounded-xl p-3 min-h-[88px] justify-between shadow-sm';
    newBookItem.innerHTML = `
    <div class="flex items-center gap-4">
        <div class="bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-lg w-14 h-auto shrink-0"
        style="background-image: url('${bookLink}');">
        </div>
        <div class="flex flex-col justify-center">
        <p class="text-[#1C1C1E] dark:text-white text-base font-semibold leading-normal line-clamp-1">${bookTitle}</p>
        <p class="text-[#8E8E93] dark:text-gray-400 text-sm font-normal leading-normal line-clamp-2">${bookAuthor}</p>
        <div class="mt-1 inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/50 px-2 py-0.5 text-xs font-medium text-green-800 dark:text-green-300">
            Tersedia
        </div>
        </div>
    </div>
    <div class="shrink-0 text-[#8E8E93] dark:text-gray-500">
        <span class="material-symbols-outlined">chevron_right</span>
    </div>
    `;

    document.querySelector('.flex.flex-col.px-4.pb-24').appendChild(newBookItem);
    closeModalFunction();
    alert(`Buku "${bookTitle}" berhasil ditambahkan!`);
});