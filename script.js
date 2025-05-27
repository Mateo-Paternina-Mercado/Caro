// Variables globales
let currentSlide = 0;
let currentModalImage = 0;
let isSlideshow = false;
let slideshowInterval;
let effectsEnabled = true;
let musicEnabled = false;
let timeSpent = 0;
let visitCount = 1;
let likedPhotos = new Set();
let currentMessageIndex = 0;

// Sistema de música
let currentSongIndex = 0;
let currentAudio = null;
let isPlaying = false;

// PLAYLIST - AQUÍ PUEDES AGREGAR MÁS CANCIONES
const playlist = [
    {
        id: 'song0',
        title: {
            en: 'Romantic Melody',
            es: 'Melodía Romántica'
        },
        artist: {
            en: 'For Caro',
            es: 'Para Caro'
        }
    }
    // AGREGAR MÁS CANCIONES AQUÍ:
    // {
    //     id: 'song1',
    //     title: {
    //         en: 'Love Song',
    //         es: 'Canción de Amor'
    //     },
    //     artist: {
    //         en: 'Special Moments',
    //         es: 'Momentos Especiales'
    //     }
    // },
    // {
    //     id: 'song2',
    //     title: {
    //         en: 'Sweet Dreams',
    //         es: 'Dulces Sueños'
    //     },
    //     artist: {
    //         en: 'Night Melody',
    //         es: 'Melodía Nocturna'
    //     }
    // }
];

// Sistema de internacionalización
const translations = {
    en: {
        loading: "Loading something special...",
        visit: "Visit #",
        subtitle: "A very special person",
        "main-message": "Each photo tells a story, each smile brightens the day. You are someone incredibly special and these images are just a small reflection of how wonderful you are. Thank you for being you, Caro. ✨",
        caption1: "Natural Beauty ♡",
        caption2: "Infinite Sweetness ♡",
        caption3: "Perfect Smile ♡",
        caption4: "Pure Elegance ♡",
        caption5: "Unique Style ♡",
        "photo-title1": "Natural Beauty ♡",
        "photo-desc1": "A smile that lights up everything",
        perfect: "✨ Perfect",
        "photo-title2": "Infinite Sweetness ♡",
        "photo-desc2": "Tenderness in every gesture",
        adorable: "🥰 Adorable",
        "photo-title3": "Perfect Smile ♡",
        "photo-desc3": "Pure happiness",
        radiant: "😊 Radiant",
        "photo-title4": "Pure Elegance ♡",
        "photo-desc4": "Natural sophistication",
        queen: "👑 Queen",
        "photo-title5": "Unique Style ♡",
        "photo-desc5": "Authentic personality",
        unique: "🌟 Unique",
        "special-moments": "Special Moments",
        spring: "Spring",
        "spring-msg": "Like flowers that bloom, your beauty is natural and unique",
        shine: "You Shine",
        "shine-msg": "You are the brightest star wherever you are",
        valuable: "Valuable",
        "valuable-msg": "Your friendship is a treasure I value every day",
        "memory-timeline": "Memory Timeline",
        "first-meeting": "First meeting",
        "first-meeting-desc": "The day I met an incredible person",
        "special-moments-timeline": "Special moments",
        "special-moments-desc": "Every conversation, every shared laugh",
        today: "Today",
        "today-desc": "Celebrating how wonderful you are",
        "footer-message": "With much love and appreciation 💕",
        photos: "💝 Photos:",
        "time-spent": "⏰ Time on page:",
        "love-level": "💕 Love level:",
        like: "Like",
        liked: "Liked",
        "current-song": "Now Playing",
        "music-paused": "Music Paused",
        "no-music": "No Music"
    },
    es: {
        loading: "Cargando algo especial...",
        visit: "Visita #",
        subtitle: "Una persona muy especial",
        "main-message": "Cada foto cuenta una historia, cada sonrisa ilumina el día. Eres alguien increíblemente especial y estas imágenes son solo un pequeño reflejo de lo maravillosa que eres. Gracias por ser tú, Caro. ✨",
        caption1: "Belleza Natural ♡",
        caption2: "Dulzura Infinita ♡",
        caption3: "Sonrisa Perfecta ♡",
        caption4: "Elegancia Pura ♡",
        caption5: "Estilo Único ♡",
        "photo-title1": "Belleza Natural ♡",
        "photo-desc1": "Una sonrisa que ilumina todo",
        perfect: "✨ Perfecta",
        "photo-title2": "Dulzura Infinita ♡",
        "photo-desc2": "Ternura en cada gesto",
        adorable: "🥰 Adorable",
        "photo-title3": "Sonrisa Perfecta ♡",
        "photo-desc3": "Felicidad pura",
        radiant: "😊 Radiante",
        "photo-title4": "Elegancia Pura ♡",
        "photo-desc4": "Sofisticación natural",
        queen: "👑 Reina",
        "photo-title5": "Estilo Único ♡",
        "photo-desc5": "Personalidad auténtica",
        unique: "🌟 Única",
        "special-moments": "Momentos Especiales",
        spring: "Primavera",
        "spring-msg": "Como las flores que florecen, tu belleza es natural y única",
        shine: "Brillas",
        "shine-msg": "Eres la estrella más brillante en cualquier lugar donde estés",
        valuable: "Valiosa",
        "valuable-msg": "Tu amistad es un tesoro que valoro cada día",
        "memory-timeline": "Línea de Recuerdos",
        "first-meeting": "Primer encuentro",
        "first-meeting-desc": "El día que conocí a una persona increíble",
        "special-moments-timeline": "Momentos especiales",
        "special-moments-desc": "Cada conversación, cada risa compartida",
        today: "Hoy",
        "today-desc": "Celebrando lo maravillosa que eres",
        "footer-message": "Con mucho cariño y aprecio 💕",
        photos: "💝 Fotos:",
        "time-spent": "⏰ Tiempo en la página:",
        "love-level": "💕 Nivel de cariño:",
        like: "Me gusta",
        liked: "Te gusta",
        "current-song": "Reproduciendo",
        "music-paused": "Música Pausada",
        "no-music": "Sin Música"
    }
};

let currentLanguage = 'en';

// Mensajes dinámicos en ambos idiomas
const dynamicMessages = {
    en: [
        "Each photo tells a story, each smile brightens the day. You are someone incredibly special and these images are just a small reflection of how wonderful you are. Thank you for being you, Caro. ✨",
        "Your smile is like a ray of sunshine that lights up even the grayest days. Every moment with you is a gift I treasure. 💕",
        "In a world full of ordinary people, you shine with a unique and special light. Your authenticity is inspiring. 🌟",
        "Each photograph captures not only your outer beauty, but also the warmth of your heart and the purity of your soul. 💖"
    ],
    es: [
        "Cada foto cuenta una historia, cada sonrisa ilumina el día. Eres alguien increíblemente especial y estas imágenes son solo un pequeño reflejo de lo maravillosa que eres. Gracias por ser tú, Caro. ✨",
        "Tu sonrisa es como un rayo de sol que ilumina incluso los días más grises. Cada momento contigo es un regalo que atesoro. 💕",
        "En un mundo lleno de personas ordinarias, tú brillas con una luz única y especial. Tu autenticidad es inspiradora. 🌟",
        "Cada fotografía captura no solo tu belleza exterior, sino también la calidez de tu corazón y la pureza de tu alma. 💖"
    ]
};

const photoData = [
    {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/caro1.jpg-uST8HPlZHebkwz334OTiyrqkZ6aY7Y.jpeg",
        title: "Belleza Natural ♡",
        description: "Una sonrisa que ilumina todo",
        likes: 127
    },
    {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/caro2.jpg-CFLet9wGWy3gEoeamwY9InzTFngjci.jpeg",
        title: "Dulzura Infinita ♡",
        description: "Ternura en cada gesto",
        likes: 156
    },
    {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/caro3.jpg-0AYcJQDX0611oWhQhgGb9xAeRQGgVa.jpeg",
        title: "Sonrisa Perfecta ♡",
        description: "Felicidad pura",
        likes: 203
    },
    {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/caro4.jpg-o9YRE2rArKJnyKjWN3QD6UVfKcEeje.jpeg",
        title: "Elegancia Pura ♡",
        description: "Sofisticación natural",
        likes: 189
    },
    {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/caro5.jpg-QUAnkEKFoGw6atjyhbpEHEsINUL9nM.jpeg",
        title: "Estilo Único ♡",
        description: "Personalidad auténtica",
        likes: 174
    }
];

// Crear estrellas animadas
function createStars() {
    const starsContainer = document.querySelector('.stars');
    const numberOfStars = 100;
    
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = Math.random() * 3 + 1 + 'px';
        star.style.height = star.style.width;
        star.style.animationDelay = Math.random() * 3 + 's';
        starsContainer.appendChild(star);
    }
}

// Crear corazones flotantes
function createHeart() {
    if (!effectsEnabled) return;
    
    const heartsContainer = document.querySelector('.hearts');
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '♡';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
    heart.style.fontSize = (Math.random() * 10 + 15) + 'px';
    heart.style.color = `hsl(${Math.random() * 60 + 300}, 70%, 70%)`;
    heartsContainer.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 6000);
}

// Crear pétalos
function createPetal() {
    if (!effectsEnabled) return;
    
    const petalsContainer = document.querySelector('.petals');
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.style.left = Math.random() * 100 + '%';
    petal.style.animationDuration = (Math.random() * 3 + 5) + 's';
    petal.style.animationDelay = Math.random() * 2 + 's';
    petalsContainer.appendChild(petal);
    
    setTimeout(() => {
        petal.remove();
    }, 8000);
}

// Crear burbujas
function createBubble() {
    if (!effectsEnabled) return;
    
    const bubblesContainer = document.querySelector('.bubbles');
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    const size = Math.random() * 20 + 10;
    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';
    bubble.style.left = Math.random() * 100 + '%';
    bubble.style.animationDuration = (Math.random() * 5 + 5) + 's';
    bubblesContainer.appendChild(bubble);
    
    setTimeout(() => {
        bubble.remove();
    }, 10000);
}

// Canvas de ondas
function initializeWaveCanvas() {
    const canvas = document.getElementById('waveCanvas');
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    let time = 0;
    
    function drawWaves() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, 'rgba(255, 105, 180, 0.1)');
        gradient.addColorStop(0.5, 'rgba(255, 179, 217, 0.2)');
        gradient.addColorStop(1, 'rgba(255, 20, 147, 0.1)');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        
        for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            for (let x = 0; x < canvas.width; x++) {
                const y = canvas.height / 2 + Math.sin((x + time + i * 100) * 0.01) * (30 + i * 20);
                if (x === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();
        }
        
        time += 2;
        requestAnimationFrame(drawWaves);
    }
    
    drawWaves();
}

// Función para cambiar idioma
function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'es' : 'en';
    updateLanguage();
    saveUserPreferences();
}

// Función para actualizar todos los textos
function updateLanguage() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });

    // Actualizar atributos especiales
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const newText = translations[currentLanguage]['subtitle'];
        typingText.setAttribute('data-text', newText);
        restartTypingAnimation(typingText, newText);
    }

    // Actualizar título principal
    const titleLetters = document.querySelectorAll('.title .letter');
    const newTitle = currentLanguage === 'en' ? 'For Caro ♡' : 'Para Caro ♡';
    titleLetters.forEach((letter, index) => {
        if (index < newTitle.length) {
            letter.textContent = newTitle[index];
        }
    });

    // Actualizar idioma del documento
    document.documentElement.lang = currentLanguage;

    updateMusicDisplay();
}

// Función para reiniciar la animación de escritura
function restartTypingAnimation(element, text) {
    element.style.animation = 'none';
    element.textContent = '';
    
    setTimeout(() => {
        element.style.animation = 'typing 3s steps(40, end), blink-caret 0.75s step-end infinite';
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        typeWriter();
    }, 100);
}

// Función para ocultar el loader
function hideLoader() {
    const loader = document.getElementById('loader');
    loader.style.opacity = '0';
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500);
}

// Función para abrir modal
function openModal(src, index) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    
    currentModalImage = index;
    
    modal.style.display = 'block';
    modalImg.src = src;
    modalTitle.textContent = photoData[index].title;
    modalDescription.textContent = photoData[index].description;
    
    document.body.style.overflow = 'hidden';
    
    // Animación de entrada
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

// Función para cerrar modal
function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

function navigateModal(direction) {
    currentModalImage += direction;
    
    if (currentModalImage >= photoData.length) {
        currentModalImage = 0;
    } else if (currentModalImage < 0) {
        currentModalImage = photoData.length - 1;
    }
    
    const modalImg = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    
    modalImg.src = photoData[currentModalImage].src;
    modalTitle.textContent = photoData[currentModalImage].title;
    modalDescription.textContent = photoData[currentModalImage].description;
}

function likePhoto() {
    const btn = document.querySelector('.like-btn');
    const heartIcon = document.querySelector('.heart-icon');
    const likeText = document.querySelector('.like-text');
    
    if (likedPhotos.has(currentModalImage)) {
        likedPhotos.delete(currentModalImage);
        btn.classList.remove('liked');
        heartIcon.innerHTML = '♡';
        likeText.textContent = 'Me gusta';
        photoData[currentModalImage].likes--;
    } else {
        likedPhotos.add(currentModalImage);
        btn.classList.add('liked');
        heartIcon.innerHTML = '♥';
        likeText.textContent = 'Te gusta';
        photoData[currentModalImage].likes++;
        
        // Crear corazones de celebración
        createCelebrationHearts();
    }
    
    updateLikeCounts();
}

function createCelebrationHearts() {
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '♥';
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * window.innerWidth + 'px';
            heart.style.top = '-50px';
            heart.style.fontSize = '2rem';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '9999';
            heart.style.animation = 'specialHeartFall 3s linear forwards';
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 3000);
        }, i * 100);
    }
}

function updateLikeCounts() {
    const likeCounts = document.querySelectorAll('.like-count');
    likeCounts.forEach((count, index) => {
        count.textContent = photoData[index].likes;
    });
}

// Crear partículas del cursor
function createCursorParticle(e) {
    if (!effectsEnabled || Math.random() > 0.95) return;
    
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = e.clientX + 'px';
    particle.style.top = e.clientY + 'px';
    particle.style.width = '6px';
    particle.style.height = '6px';
    particle.style.background = `hsl(${Math.random() * 60 + 300}, 70%, 70%)`;
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '999';
    particle.style.animation = 'fadeOut 1s ease-out forwards';
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 1000);
}

// Efecto parallax
function handleParallax() {
    const scrolled = window.pageYOffset;
    const stars = document.querySelector('.stars');
    const rate = scrolled * -0.5;
    
    stars.style.transform = `translateY(${rate}px)`;
    
    // Parallax para otros elementos
    const cards = document.querySelectorAll('.photo-card');
    cards.forEach((card, index) => {
        const speed = 0.1 + (index * 0.05);
        const yPos = -(scrolled * speed);
        card.style.transform = `translateY(${yPos}px)`;
    });
}

// Inicializar controles
function initializeControls() {
    const languageToggle = document.getElementById('languageToggle');
    const musicToggle = document.getElementById('musicToggle');
    const musicNext = document.getElementById('musicNext');
    const themeToggle = document.getElementById('themeToggle');
    const effectsToggle = document.getElementById('effectsToggle');
    const slideshowToggle = document.getElementById('slideshowToggle');
    const fullscreenToggle = document.getElementById('fullscreenToggle');
    
    languageToggle.addEventListener('click', toggleLanguage);
    musicToggle.addEventListener('click', toggleMusic);
    musicNext.addEventListener('click', nextSong);
    themeToggle.addEventListener('click', toggleTheme);
    effectsToggle.addEventListener('click', toggleEffects);
    slideshowToggle.addEventListener('click', toggleSlideshow);
    fullscreenToggle.addEventListener('click', toggleFullscreen);
}

// Inicializar sistema de música
function initializeMusicSystem() {
    currentAudio = document.getElementById(playlist[currentSongIndex].id);
    updateMusicDisplay();
    
    // Event listeners para controles de música
    document.getElementById('playPause').addEventListener('click', togglePlayPause);
    document.getElementById('prevSong').addEventListener('click', previousSong);
    document.getElementById('nextSong').addEventListener('click', nextSong);
    document.getElementById('musicNext').addEventListener('click', nextSong);
    
    // Actualizar barra de progreso
    if (currentAudio) {
        currentAudio.addEventListener('timeupdate', updateProgress);
        currentAudio.addEventListener('ended', nextSong);
    }
}

// Toggle play/pause
function togglePlayPause() {
    if (!currentAudio) return;
    
    if (isPlaying) {
        currentAudio.pause();
        isPlaying = false;
        document.getElementById('playPause').innerHTML = '▶️';
        document.querySelector('.music-player').classList.remove('playing');
        document.getElementById('musicToggle').classList.remove('music-active');
    } else {
        currentAudio.play().catch(e => console.log('No se pudo reproducir la música'));
        isPlaying = true;
        document.getElementById('playPause').innerHTML = '⏸️';
        document.querySelector('.music-player').classList.add('playing');
        document.getElementById('musicToggle').classList.add('music-active');
    }
    
    musicEnabled = isPlaying;
    updateMusicDisplay();
}

// Canción anterior
function previousSong() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    changeSong();
}

// Siguiente canción
function nextSong() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    changeSong();
}

// Cambiar canción
function changeSong() {
    currentAudio = document.getElementById(playlist[currentSongIndex].id);
    
    if (isPlaying && currentAudio) {
        currentAudio.play().catch(e => console.log('No se pudo reproducir la música'));
    }
    
    updateMusicDisplay();
    
    // Efecto visual al cambiar canción
    createMusicChangeEffect();
}

// Actualizar display de música
function updateMusicDisplay() {
    const songNameElement = document.getElementById('songName');
    const musicTitleElement = document.getElementById('musicTitle');
    
    if (playlist.length > 0) {
        const currentSong = playlist[currentSongIndex];
        const title = currentSong.title[currentLanguage] || currentSong.title.en;
        const artist = currentSong.artist[currentLanguage] || currentSong.artist.en;
        
        songNameElement.textContent = `${title} - ${artist}`;
        
        if (isPlaying) {
            musicTitleElement.textContent = translations[currentLanguage]['current-song'];
        } else {
            musicTitleElement.textContent = translations[currentLanguage]['music-paused'];
        }
    } else {
        songNameElement.textContent = translations[currentLanguage]['no-music'];
        musicTitleElement.textContent = '';
    }
}

// Actualizar barra de progreso
function updateProgress() {
    if (currentAudio && currentAudio.duration) {
        const progress = (currentAudio.currentTime / currentAudio.duration) * 100;
        document.getElementById('progressBar').style.width = progress + '%';
    }
}

// Efecto visual al cambiar canción
function createMusicChangeEffect() {
    // Crear ondas de música
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const note = document.createElement('div');
            note.innerHTML = '♪';
            note.style.position = 'fixed';
            note.style.left = Math.random() * window.innerWidth + 'px';
            note.style.top = window.innerHeight + 'px';
            note.style.fontSize = '2rem';
            note.style.color = 'var(--primary-pink)';
            note.style.pointerEvents = 'none';
            note.style.zIndex = '9999';
            note.style.animation = 'musicNoteRise 3s ease-out forwards';
            document.body.appendChild(note);
            
            setTimeout(() => {
                note.remove();
            }, 3000);
        }, i * 200);
    }
}

// Mostrar/ocultar reproductor
function toggleMusicPlayer() {
    const player = document.getElementById('musicPlayer');
    
    if (musicEnabled || isPlaying) {
        player.classList.add('show');
    } else {
        player.classList.remove('show');
    }
}

// Toggle música
function toggleMusic() {
    const btn = document.getElementById('musicToggle');
    
    if (musicEnabled || isPlaying) {
        // Pausar música
        if (currentAudio) {
            currentAudio.pause();
        }
        isPlaying = false;
        musicEnabled = false;
        btn.classList.remove('active', 'music-active');
        btn.innerHTML = '🔇';
        document.getElementById('playPause').innerHTML = '▶️';
        document.querySelector('.music-player').classList.remove('playing');
        toggleMusicPlayer();
    } else {
        // Reproducir música
        if (currentAudio) {
            currentAudio.play().catch(e => console.log('No se pudo reproducir la música'));
        }
        isPlaying = true;
        musicEnabled = true;
        btn.classList.add('active', 'music-active');
        btn.innerHTML = '🎵';
        document.getElementById('playPause').innerHTML = '⏸️';
        document.querySelector('.music-player').classList.add('playing');
        toggleMusicPlayer();
    }
    
    updateMusicDisplay();
}

// Toggle tema
function toggleTheme() {
    const body = document.body;
    const btn = document.getElementById('themeToggle');
    
    if (body.getAttribute('data-theme') === 'light') {
        body.removeAttribute('data-theme');
        btn.innerHTML = '🌙';
    } else {
        body.setAttribute('data-theme', 'light');
        btn.innerHTML = '☀️';
    }
}

// Toggle efectos
function toggleEffects() {
    const btn = document.getElementById('effectsToggle');
    
    effectsEnabled = !effectsEnabled;
    
    if (effectsEnabled) {
        btn.classList.add('active');
        btn.innerHTML = '✨';
    } else {
        btn.classList.remove('active');
        btn.innerHTML = '💫';
        
        // Limpiar efectos existentes
        document.querySelector('.hearts').innerHTML = '';
        document.querySelector('.petals').innerHTML = '';
        document.querySelector('.bubbles').innerHTML = '';
    }
}

// Toggle slideshow
function toggleSlideshow() {
    const slideshowContainer = document.getElementById('slideshowContainer');
    const mainGallery = document.getElementById('mainGallery');
    const btn = document.getElementById('slideshowToggle');
    
    isSlideshow = !isSlideshow;
    
    if (isSlideshow) {
        slideshowContainer.style.display = 'block';
        mainGallery.style.display = 'none';
        btn.classList.add('active');
        startSlideshow();
    } else {
        slideshowContainer.style.display = 'none';
        mainGallery.style.display = 'grid';
        btn.classList.remove('active');
        stopSlideshow();
    }
}

// Toggle pantalla completa
function toggleFullscreen() {
    const btn = document.getElementById('fullscreenToggle');
    
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().then(() => {
            btn.classList.add('active');
            btn.innerHTML = '⛶';
        });
    } else {
        document.exitFullscreen().then(() => {
            btn.classList.remove('active');
            btn.innerHTML = '⛶';
        });
    }
}

// Slideshow automático
function startSlideshow() {
    slideshowInterval = setInterval(() => {
        changeSlide(1);
    }, 4000);
}

function stopSlideshow() {
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
    }
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide += direction;
    
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Inicializar contadores
function initializeCounters() {
    // Contador de visitas
    visitCount = localStorage.getItem('caroPageVisits') || 1;
    localStorage.setItem('caroPageVisits', parseInt(visitCount) + 1);
    document.getElementById('visitCount').textContent = visitCount;
    
    // Contador de tiempo
    setInterval(() => {
        timeSpent++;
        document.getElementById('timeSpent').textContent = timeSpent;
    }, 1000);
}

// Inicializar animaciones
function initializeAnimations() {
    // Animación de letras del título
    const letters = document.querySelectorAll('.letter');
    letters.forEach((letter, index) => {
        letter.style.setProperty('--i', index);
    });
    
    // Animación de corazones flotantes en el mensaje
    const floatingHearts = document.querySelectorAll('.floating-heart');
    floatingHearts.forEach((heart, index) => {
        heart.style.setProperty('--i', index);
    });
    
    // Efecto de escritura para el subtítulo
    const typingText = document.querySelector('.typing-text');
    const text = typingText.getAttribute('data-text');
    typingText.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    setTimeout(typeWriter, 1000);
}

// Event listeners adicionales
function setupEventListeners() {
    // Parallax mejorado
    window.addEventListener('scroll', handleParallax);
    
    // Efectos del cursor
    document.addEventListener('mousemove', createCursorParticle);
    
    // Teclado
    document.addEventListener('keydown', handleKeyboard);
    
    // Redimensionar ventana
    window.addEventListener('resize', handleResize);
    
    // Visibilidad de la página
    document.addEventListener('visibilitychange', handleVisibilityChange);
}

function handleKeyboard(event) {
    switch(event.key) {
        case 'Escape':
            closeModal();
            break;
        case 'ArrowLeft':
            if (document.getElementById('imageModal').style.display === 'block') {
                navigateModal(-1);
            } else if (isSlideshow) {
                changeSlide(-1);
            }
            break;
        case 'ArrowRight':
            if (document.getElementById('imageModal').style.display === 'block') {
                navigateModal(1);
            } else if (isSlideshow) {
                changeSlide(1);
            }
            break;
        case ' ':
            event.preventDefault();
            toggleSlideshow();
            break;
        case 'm':
        case 'M':
            toggleMusic();
            break;
        case 'f':
        case 'F':
            toggleFullscreen();
            break;
    }
}

function handleResize() {
    // Reajustar canvas
    const canvas = document.getElementById('waveCanvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function handleVisibilityChange() {
    if (document.hidden) {
        // Pausar música si la página no está visible
        if (musicEnabled || isPlaying) {
            if (currentAudio) {
                currentAudio.pause();
            }
        }
    } else {
        // Reanudar música si estaba habilitada
        if (musicEnabled || isPlaying) {
            if (currentAudio) {
                currentAudio.play().catch(e => {});
            }
        }
    }
}

// Agregar estilos CSS dinámicos
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    @keyframes heartCelebration {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 0.8;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
    
    .photo-card[data-tilt] {
        transform-style: preserve-3d;
        transition: transform 0.3s ease;
    }

    @keyframes musicNoteRise {
        0% {
            transform: translateY(0) rotate(0deg) scale(1);
            opacity: 1;
        }
        50% {
            transform: translateY(-50vh) rotate(180deg) scale(1.2);
            opacity: 0.8;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg) scale(0.5);
            opacity: 0;
        }
    }

    @keyframes fadeOut {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0) translateY(-20px);
        }
    }
`;
document.head.appendChild(dynamicStyles);

// Efecto 3D para las tarjetas
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('[data-tilt]').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
});

// Mensajes dinámicos
function changeMessage() {
    const messageElement = document.getElementById('dynamicMessage');
    messageElement.style.opacity = '0';
    
    setTimeout(() => {
        currentMessageIndex = (currentMessageIndex + 1) % dynamicMessages[currentLanguage].length;
        messageElement.textContent = dynamicMessages[currentLanguage][currentMessageIndex];
        messageElement.style.opacity = '1';
    }, 500);
}

// Cambiar mensaje cada 10 segundos
setInterval(changeMessage, 10000);

// Detectar dispositivos móviles para optimizar efectos
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (isMobile) {
    // Reducir efectos en móviles para mejor rendimiento
    effectsEnabled = false;
    document.addEventListener('DOMContentLoaded', function() {
        document.getElementById('effectsToggle').classList.remove('active');
        document.getElementById('effectsToggle').innerHTML = '💫';
    });
}

// Guardar preferencias del usuario
function saveUserPreferences() {
    const preferences = {
        musicEnabled,
        effectsEnabled,
        theme: document.body.getAttribute('data-theme') || 'dark',
        visitCount: parseInt(localStorage.getItem('caroPageVisits') || 1),
        language: currentLanguage
    };
    
    localStorage.setItem('caroPagePreferences', JSON.stringify(preferences));
}

function loadUserPreferences() {
    const saved = localStorage.getItem('caroPagePreferences');
    if (saved) {
        const preferences = JSON.parse(saved);
        
        if (preferences.theme === 'light') {
            document.body.setAttribute('data-theme', 'light');
            document.getElementById('themeToggle').innerHTML = '☀️';
        }
        
        effectsEnabled = preferences.effectsEnabled;
        if (!effectsEnabled) {
            document.getElementById('effectsToggle').classList.remove('active');
            document.getElementById('effectsToggle').innerHTML = '💫';
        }
        
        if (preferences.language) {
            currentLanguage = preferences.language;
            updateLanguage();
        }
    }
}

// Cargar preferencias al inicio
document.addEventListener('DOMContentLoaded', function() {
    // Ocultar loader después de 3 segundos
    setTimeout(hideLoader, 3000);
    
    // Inicializar controles
    initializeControls();
    
    // Inicializar efectos
    createStars();
    createPetal();
    createBubble();
    
    // Crear corazones cada cierto tiempo
    setInterval(createHeart, 2000);
    setInterval(createPetal, 1500);
    setInterval(createBubble, 3000);
    
    // Agregar event listeners
    window.addEventListener('scroll', handleParallax);
    document.addEventListener('mousemove', createCursorParticle);
    
    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
    
    // Inicializar otros componentes
    initializeCounters();
    initializeAnimations();
    setupEventListeners();
    loadUserPreferences();

    // Inicializar sistema de música
    initializeMusicSystem();
    
    // Inicializar canvas de ondas
    initializeWaveCanvas();
});

// Guardar preferencias cuando cambian
window.addEventListener('beforeunload', saveUserPreferences);

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateEasterEgg();
        konamiCode = [];
    }
});

function activateEasterEgg() {
    // Crear lluvia de corazones especial
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createSpecialHeart();
        }, i * 100);
    }
    
    // Mostrar mensaje especial
    const specialMessage = document.createElement('div');
    const easterEggText = currentLanguage === 'en' 
        ? '🎉 Secret code activated! You are incredible, Caro! 🎉'
        : '🎉 ¡Código secreto activado! Eres increíble, Caro! 🎉';
    
    specialMessage.innerHTML = easterEggText;
    specialMessage.style.position = 'fixed';
    specialMessage.style.top = '50%';
    specialMessage.style.left = '50%';
    specialMessage.style.transform = 'translate(-50%, -50%)';
    specialMessage.style.background = 'linear-gradient(45deg, #ff69b4, #ff1493)';
    specialMessage.style.color = 'white';
    specialMessage.style.padding = '20px 40px';
    specialMessage.style.borderRadius = '20px';
    specialMessage.style.fontSize = '1.5rem';
    specialMessage.style.zIndex = '9999';
    specialMessage.style.animation = 'bounce 2s ease-in-out';
    document.body.appendChild(specialMessage);
    
    setTimeout(() => {
        specialMessage.remove();
    }, 3000);
}

function createSpecialHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.top = '-50px';
    heart.style.fontSize = '2rem';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '9999';
    heart.style.animation = 'specialHeartFall 3s linear forwards';
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 3000);
}

// Agregar animación para el easter egg
const easterEggStyles = document.createElement('style');
easterEggStyles.textContent = `
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translate(-50%, -50%) translateY(0);
        }
        40% {
            transform: translate(-50%, -50%) translateY(-30px);
        }
        60% {
            transform: translate(-50%, -50%) translateY(-15px);
        }
    }
    
    @keyframes specialHeartFall {
        0% {
            transform: translateY(-50px) rotate(0deg) scale(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
            transform: translateY(0px) rotate(36deg) scale(1);
        }
        100% {
            transform: translateY(100vh) rotate(360deg) scale(0.5);
            opacity: 0;
        }
    }
`;
document.head.appendChild(easterEggStyles);

// Mensajes de consola
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (currentLanguage === 'en') {
            console.log('🌸 Special page for Caro loaded with love 💕');
            console.log('💡 Tip: Try arrow keys, space, M, F for special controls');
            console.log('🎮 Easter egg: Can you find the secret code? 😉');
        } else {
            console.log('🌸 Página especial para Caro cargada con amor 💕');
            console.log('💡 Tip: Prueba las teclas de flecha, espacio, M, F para controles especiales');
            console.log('🎮 Easter egg: ¿Puedes encontrar el código secreto? 😉');
        }
    }, 1000);
});