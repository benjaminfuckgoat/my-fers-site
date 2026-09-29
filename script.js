const themeButton = document.getElementById('theme-toggle');
const welcomeText = document.getElementById('welcome-text');
const nameInput = document.getElementById('name-input');
const saveNameButton = document.getElementById('save-name-btn');
const logoutButton = document.getElementById('logout-btn'); // Нашли новую кнопку

function updateWelcomeMessage() {
    const savedName = localStorage.getItem('user-name');
    const isDark = document.body.classList.contains('dark-theme');
    const emoji = isDark ? '🌙' : '☀️';
    
    if (savedName) {
        // Если имя есть в памяти
        welcomeText.textContent = `Привет, ${savedName}! ${emoji}`;
        logoutButton.style.display = 'block'; // ПОКАЗЫВАЕМ кнопку "Выйти"
    } else {
        // Если имени нет (Гость)
        welcomeText.textContent = `Привет, Гость! ${emoji}`;
        logoutButton.style.display = 'none'; // СКРЫВАЕМ кнопку "Выйти"
    }
}

// === ПРОВЕРКА ПРИ ЗАГРУЗКЕ СТРАНИЦЫ ===
if (localStorage.getItem('saved-theme') === 'dark') {
    document.body.classList.add('dark-theme');
    themeButton.textContent = 'Включить светлую тему';
}
updateWelcomeMessage();

// === ОБРАБОТКА КЛИКА ПО ПЕРЕКЛЮЧАТЕЛЮ ТЕМЫ ===
themeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    
    if (document.body.classList.contains('dark-theme')) {
        themeButton.textContent = 'Включить светлую тему';
        localStorage.setItem('saved-theme', 'dark');
    } else {
        themeButton.textContent = 'Включить тёмную тему';
        localStorage.setItem('saved-theme', 'light');
    }
    updateWelcomeMessage();
});

// === СОХРАНЕНИЕ ИМЕНИ ===
saveNameButton.addEventListener('click', () => {
    const userName = nameInput.value.trim();
    
    if (userName !== '') {
        localStorage.setItem('user-name', userName);
        updateWelcomeMessage();
        nameInput.value = '';
    } else {
        alert('Пожалуйста, введите имя перед сохранением! ✍️');
    }
});

// === НОВЫЙ ШАГ: НАЖАТИЕ НА КНОПКУ "ВЫЙТИ" ===
logoutButton.addEventListener('click', () => {
    // Удаляем конкретный ключ 'user-name' из памяти браузера
    localStorage.removeItem('user-name');
    
    // Обновляем интерфейс (кнопка исчезнет, имя сбросится на "Гость")
    updateWelcomeMessage();
});
