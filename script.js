const faqState = JSON.parse(localStorage.getItem('faqState') || '{}');
//culture 
document.addEventListener('DOMContentLoaded', function() {
    const cultureNavBtns = document.querySelectorAll('.culture-nav-btn');
    const cultureCards = document.querySelectorAll('.culture-card');

    // Filter culture items by category
    cultureNavBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            cultureNavBtns.forEach(b => b.classList.remove('bg-blue-500', 'text-white'));
            cultureNavBtns.forEach(b => b.classList.add('bg-gray-200', 'text-gray-800', 'hover:bg-gray-300'));
            
            this.classList.remove('bg-gray-200', 'text-gray-800', 'hover:bg-gray-300');
            this.classList.add('bg-blue-500', 'text-white');

            const category = this.dataset.category;

            // Filter culture cards
            cultureCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Optional: Add animation when cards appear
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, { threshold: 0.1 });

    cultureCards.forEach(card => {
        observer.observe(card);
    });
});



//Shop
document.addEventListener('DOMContentLoaded', function() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const productCards = document.querySelectorAll('.product-card');

    // Filter products by category
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            categoryBtns.forEach(b => b.classList.remove('bg-blue-500', 'text-white'));
            categoryBtns.forEach(b => b.classList.add('bg-gray-200', 'text-gray-800', 'hover:bg-gray-300'));
            
            this.classList.remove('bg-gray-200', 'text-gray-800', 'hover:bg-gray-300');
            this.classList.add('bg-blue-500', 'text-white');

            const category = this.dataset.category;

            // Filter products
            productCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Add to cart functionality (simplified example)
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('span').textContent;
            
            // In a real implementation, you would add to a cart system
            alert(`${productName} (${productPrice}) ajouté à votre panier`);
            
            // Animation feedback
            this.textContent = 'Ajouté !';
            this.classList.remove('bg-gray-100', 'hover:bg-gray-200');
            this.classList.add('bg-green-100', 'text-green-800');
            
            setTimeout(() => {
                this.innerHTML = `
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                    Ajouter
                `;
                this.classList.add('bg-gray-100', 'hover:bg-gray-200');
                this.classList.remove('bg-green-100', 'text-green-800');
            }, 1500);
        });
    });
});



// Trip Section
document.addEventListener('DOMContentLoaded', function() {
    const activityFilter = document.getElementById('activity-type');
    const durationFilter = document.getElementById('duration-filter');
    const difficultyFilter = document.getElementById('difficulty-filter');
    const filterBtn = document.getElementById('filter-trips');
    const tripCards = Array.from(document.querySelectorAll('.trip-card'));

    function filterTrips() {
        const activityValue = activityFilter.value;
        const durationValue = durationFilter.value;
        const difficultyValue = difficultyFilter.value;

        tripCards.forEach(card => {
            const cardActivity = card.dataset.type;
            const cardDuration = card.dataset.duration;
            const cardDifficulty = card.dataset.difficulty;

            const activityMatch = activityValue === 'all' || cardActivity === activityValue;
            const durationMatch = durationValue === 'all' || cardDuration === durationValue;
            const difficultyMatch = difficultyValue === 'all' || cardDifficulty === difficultyValue;

            if (activityMatch && durationMatch && difficultyMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    filterBtn.addEventListener('click', filterTrips);
    
    // Initial filter on page load
    filterTrips();
});


// Accomodation
document.addEventListener('DOMContentLoaded', function() {
    const typeFilter = document.getElementById('type-filter');
    const priceFilter = document.getElementById('price-filter');
    const sortBy = document.getElementById('sort-by');
    const resetBtn = document.getElementById('reset-filters');
    const accommodationList = document.getElementById('accommodation-list');
    const cards = Array.from(document.querySelectorAll('.accommodation-card'));

    // Fonction de filtrage et tri
    function updateAccommodationList() {
        const typeValue = typeFilter.value;
        const priceValue = parseInt(priceFilter.value);
        const sortValue = sortBy.value;

        // Filtrer
        let filteredCards = cards.filter(card => {
            const cardType = card.dataset.type;
            const cardPrice = parseInt(card.dataset.price);
            
            return (typeValue === 'all' || cardType === typeValue) && 
                   (cardPrice <= priceValue);
        });

        // Trier
        filteredCards.sort((a, b) => {
            const priceA = parseInt(a.dataset.price);
            const priceB = parseInt(b.dataset.price);
            const ratingA = parseFloat(a.dataset.rating);
            const ratingB = parseFloat(b.dataset.rating);

            switch(sortValue) {
                case 'price-asc':
                    return priceA - priceB;
                case 'price-desc':
                    return priceB - priceA;
                case 'rating':
                    return ratingB - ratingA;
                default:
                    return 0;
            }
        });

        // Mettre à jour l'affichage
        accommodationList.innerHTML = '';
        filteredCards.forEach(card => {
            accommodationList.appendChild(card);
        });
    }

    // Écouteurs d'événements
    typeFilter.addEventListener('change', updateAccommodationList);
    priceFilter.addEventListener('change', updateAccommodationList);
    sortBy.addEventListener('change', updateAccommodationList);
    
    resetBtn.addEventListener('click', function() {
        typeFilter.value = 'all';
        priceFilter.value = '9999';
        sortBy.value = 'price-asc';
        updateAccommodationList();
    });

    // Initialisation
    updateAccommodationList();
});
function toggleFAQ(event, id) {
    if (event) event.preventDefault();
    
    const answer = document.getElementById(id);
    const isHidden = answer.classList.contains('hidden');
    const button = answer.previousElementSibling;
    const icon = button.querySelector('svg');

    // Basculer l'état visuel
    answer.classList.toggle('hidden');
    answer.setAttribute('aria-hidden', !isHidden);
    button.setAttribute('aria-expanded', isHidden);
    icon.classList.toggle('rotate-180');

    // Sauvegarder l'état
    faqState[id] = isHidden;
    localStorage.setItem('faqState', JSON.stringify(faqState));

    // Animation de scroll si ouverture
    if (isHidden) {
        setTimeout(() => {
            answer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }
}

// Appliquer l'état sauvegardé au chargement
document.addEventListener('DOMContentLoaded', function() {
    Object.keys(faqState).forEach(id => {
        if (faqState[id]) {
            const answer = document.getElementById(id);
            if (answer) {
                answer.classList.remove('hidden');
                answer.setAttribute('aria-hidden', 'false');
                const button = answer.previousElementSibling;
                button.setAttribute('aria-expanded', 'true');
                button.querySelector('svg').classList.add('rotate-180');
            }
        }
    });

    // Gestion de l'ancre dans l'URL
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const target = document.getElementById(targetId);
        if (target && target.classList.contains('faq-answer')) {
            toggleFAQ(null, targetId);
        }
    }
});
class EventCalendar {
            constructor() {
                this.currentDate = new Date();
                this.currentMonth = this.currentDate.getMonth();
                this.currentYear = this.currentDate.getFullYear();
                this.today = new Date();
                
                // Événements prédéfinis pour différents mois
                this.events = {
                    // ===== ANNÉE 2024 =====
                    // Janvier 2024
                    '2024-0': {
                        1: [{ text: 'Nouvel An', type: 'fete' }],
                        15: [{ text: 'Concert Nouvel An', type: 'jazz' }],
                        20: [{ text: 'Expo Hiver', type: 'expo' }],
                        25: [{ text: 'Théâtre', type: 'theatre' }]
                    },
                    // Février 2024
                    '2024-1': {
                        14: [{ text: 'Saint-Valentin', type: 'fete' }],
                        18: [{ text: 'Concert Classique', type: 'jazz' }],
                        24: [{ text: 'Marché d\'hiver', type: 'marche' }]
                    },
                    // Mars 2024
                    '2024-2': {
                        8: [{ text: 'Journée de la femme', type: 'fete' }],
                        15: [{ text: 'Festival Printemps', type: 'festival' }],
                        16: [{ text: 'Festival Printemps', type: 'festival' }],
                        22: [{ text: 'Visite Jardins', type: 'visite' }],
                        30: [{ text: 'Expo Art Moderne', type: 'expo' }]
                    },
                    // Avril 2024
                    '2024-3': {
                        1: [{ text: 'Poisson d\'avril', type: 'fete' }],
                        12: [{ text: 'Marché de Pâques', type: 'marche' }],
                        20: [{ text: 'Concert Jazz', type: 'jazz' }],
                        25: [{ text: 'Théâtre Classique', type: 'theatre' }]
                    },
                    // Mai 2024
                    '2024-4': {
                        1: [{ text: 'Fête du Travail', type: 'fete' }],
                        8: [{ text: 'Victoire 1945', type: 'fete' }],
                        15: [{ text: 'Festival Mai', type: 'festival' }],
                        16: [{ text: 'Festival Mai', type: 'festival' }],
                        17: [{ text: 'Festival Mai', type: 'festival' }],
                        25: [{ text: 'Visite Château', type: 'visite' }]
                    },
                    // Juin 2024
                    '2024-5': {
                        5: [{ text: 'Marché aux fleurs', type: 'marche' }],
                        21: [{ text: 'Fête Musique', type: 'jazz' }],
                        28: [{ text: 'Expo Été', type: 'expo' }]
                    },
                    // Juillet 2024
                    '2024-6': {
                        2: [{ text: 'Concert jazz', type: 'jazz' }],
                        5: [{ text: 'Marché artisanal', type: 'marche' }],
                        8: [{ text: 'Visite guidée', type: 'visite' }],
                        14: [{ text: 'Fête nationale', type: 'fete' }],
                        15: [{ text: 'Festival début', type: 'festival' }],
                        16: [{ text: 'Festival', type: 'festival' }],
                        17: [{ text: 'Festival', type: 'festival' }],
                        18: [{ text: 'Festival fin', type: 'festival' }],
                        25: [{ text: 'Théâtre en plein air', type: 'theatre' }]
                    },
                    // Août 2024
                    '2024-7': {
                        3: [{ text: 'Marché nocturne', type: 'marche' }],
                        10: [{ text: 'Concert Rock', type: 'jazz' }],
                        15: [{ text: 'Assomption', type: 'fete' }],
                        20: [{ text: 'Festival Été', type: 'festival' }],
                        21: [{ text: 'Festival Été', type: 'festival' }],
                        28: [{ text: 'Expo Photos', type: 'expo' }]
                    },
                    // Septembre 2024
                    '2024-8': {
                        5: [{ text: 'Rentrée Culturelle', type: 'expo' }],
                        12: [{ text: 'Marché de rentrée', type: 'marche' }],
                        20: [{ text: 'Théâtre Moderne', type: 'theatre' }],
                        28: [{ text: 'Festival Automne', type: 'festival' }],
                        29: [{ text: 'Festival Automne', type: 'festival' }]
                    },
                    // Octobre 2024
                    '2024-9': {
                        5: [{ text: 'Concert Automne', type: 'jazz' }],
                        15: [{ text: 'Visite Vignobles', type: 'visite' }],
                        31: [{ text: 'Halloween', type: 'fete' }]
                    },
                    // Novembre 2024
                    '2024-10': {
                        1: [{ text: 'Toussaint', type: 'fete' }],
                        11: [{ text: 'Armistice', type: 'fete' }]
                    },
                    // Décembre 2024
                    '2024-11': {
                        6: [{ text: 'Saint-Nicolas', type: 'fete' }],
                        25: [{ text: 'Noël', type: 'fete' }],
                        31: [{ text: 'Réveillon', type: 'fete' }]
                    },

                    // ===== ANNÉE 2025 =====
                    // Janvier 2025
                    '2025-0': {
                        1: [{ text: 'Nouvel An 2025', type: 'fete' }],
                        6: [{ text: 'Épiphanie', type: 'fete' }],
                        12: [{ text: 'Concert Nouvelle Année', type: 'jazz' }],
                        18: [{ text: 'Marché d\'hiver', type: 'marche' }],
                        25: [{ text: 'Festival Glace', type: 'festival' }],
                        26: [{ text: 'Festival Glace', type: 'festival' }]
                    },
                    // Février 2025
                    '2025-1': {
                        2: [{ text: 'Chandeleur', type: 'fete' }],
                        14: [{ text: 'Saint-Valentin', type: 'fete' }],
                        16: [{ text: 'Concert Romantique', type: 'jazz' }],
                        22: [{ text: 'Expo Amour', type: 'expo' }],
                        28: [{ text: 'Théâtre Moderne', type: 'theatre' }]
                    },
                    // Mars 2025
                    '2025-2': {
                        8: [{ text: 'Journée de la femme', type: 'fete' }],
                        15: [{ text: 'Festival Printemps 2025', type: 'festival' }],
                        16: [{ text: 'Festival Printemps 2025', type: 'festival' }],
                        17: [{ text: 'Festival Printemps 2025', type: 'festival' }],
                        20: [{ text: 'Équinoxe Printemps', type: 'fete' }],
                        29: [{ text: 'Visite Jardins Botaniques', type: 'visite' }]
                    },
                    // Avril 2025
                    '2025-3': {
                        1: [{ text: 'Poisson d\'avril', type: 'fete' }],
                        13: [{ text: 'Pâques 2025', type: 'fete' }],
                        14: [{ text: 'Lundi de Pâques', type: 'fete' }],
                        20: [{ text: 'Marché de Pâques', type: 'marche' }],
                        26: [{ text: 'Concert Printemps', type: 'jazz' }],
                        30: [{ text: 'Nuit des Musées', type: 'expo' }]
                    },
                    // Mai 2025
                    '2025-4': {
                        1: [{ text: 'Fête du Travail', type: 'fete' }],
                        8: [{ text: 'Victoire 1945', type: 'fete' }],
                        21: [{ text: 'Ascension', type: 'fete' }],
                        24: [{ text: 'Festival de Mai', type: 'festival' }],
                        25: [{ text: 'Festival de Mai', type: 'festival' }],
                        31: [{ text: 'Fête des Mères', type: 'fete' }]
                    },
                    // Juin 2025
                    '2025-5': {
                        1: [{ text: 'Pentecôte', type: 'fete' }],
                        2: [{ text: 'Lundi Pentecôte', type: 'fete' }],
                        15: [{ text: 'Fête des Pères', type: 'fete' }],
                        21: [{ text: 'Fête de la Musique', type: 'jazz' }],
                        22: [{ text: 'Solstice d\'été', type: 'fete' }],
                        28: [{ text: 'Marché d\'été', type: 'marche' }]
                    },
                    // Juillet 2025
                    '2025-6': {
                        5: [{ text: 'Festival d\'été', type: 'festival' }],
                        6: [{ text: 'Festival d\'été', type: 'festival' }],
                        14: [{ text: 'Fête Nationale', type: 'fete' }],
                        19: [{ text: 'Concert en plein air', type: 'jazz' }],
                        26: [{ text: 'Théâtre d\'été', type: 'theatre' }]
                    },
                    // Août 2025
                    '2025-7': {
                        2: [{ text: 'Nuit des étoiles', type: 'expo' }],
                        10: [{ text: 'Festival Rock', type: 'festival' }],
                        11: [{ text: 'Festival Rock', type: 'festival' }],
                        15: [{ text: 'Assomption', type: 'fete' }],
                        23: [{ text: 'Marché nocturne', type: 'marche' }],
                        30: [{ text: 'Visite patrimoine', type: 'visite' }]
                    },
                    // Septembre 2025
                    '2025-8': {
                        6: [{ text: 'Journées du Patrimoine', type: 'visite' }],
                        7: [{ text: 'Journées du Patrimoine', type: 'visite' }],
                        13: [{ text: 'Festival Automne', type: 'festival' }],
                        14: [{ text: 'Festival Automne', type: 'festival' }],
                        15: [{ text: 'Festival Automne', type: 'festival' }],
                        22: [{ text: 'Équinoxe Automne', type: 'fete' }],
                        27: [{ text: 'Expo Rentrée', type: 'expo' }]
                    },
                    // Octobre 2025
                    '2025-9': {
                        4: [{ text: 'Fête des Vendanges', type: 'fete' }],
                        12: [{ text: 'Concert d\'automne', type: 'jazz' }],
                        18: [{ text: 'Marché d\'automne', type: 'marche' }],
                        25: [{ text: 'Théâtre Classique', type: 'theatre' }],
                        31: [{ text: 'Halloween', type: 'fete' }]
                    },
                    // Novembre 2025
                    '2025-10': {
                        1: [{ text: 'Toussaint', type: 'fete' }],
                        2: [{ text: 'Défunts', type: 'fete' }],
                        11: [{ text: 'Armistice 1918', type: 'fete' }],
                        15: [{ text: 'Expo d\'automne', type: 'expo' }],
                        22: [{ text: 'Concert Classique', type: 'jazz' }]
                    },
                    // Décembre 2025
                    '2025-11': {
                        6: [{ text: 'Saint-Nicolas', type: 'fete' }],
                        21: [{ text: 'Solstice d\'hiver', type: 'fete' }],
                        24: [{ text: 'Veillée de Noël', type: 'fete' }],
                        25: [{ text: 'Noël', type: 'fete' }],
                        31: [{ text: 'Réveillon 2025', type: 'fete' }]
                    }
                };
                
                this.monthNames = [
                    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
                    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
                ];
                
                this.dayNames = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
                
                this.init();
            }
            
            init() {
                this.bindEvents();
                this.renderCalendar();
            }
            
            bindEvents() {
                document.getElementById('prevMonth').addEventListener('click', () => {
                    this.previousMonth();
                });
                
                document.getElementById('nextMonth').addEventListener('click', () => {
                    this.nextMonth();
                });
            }
            
            previousMonth() {
                this.currentMonth = this.currentMonth === 0 ? 11 : this.currentMonth - 1;
                if (this.currentMonth === 11) {
                    this.currentYear--;
                }
                this.renderCalendar();
            }
            
            nextMonth() {
                this.currentMonth = this.currentMonth === 11 ? 0 : this.currentMonth + 1;
                if (this.currentMonth === 0) {
                    this.currentYear++;
                }
                this.renderCalendar();
            }
            
            renderCalendar() {
                const grid = document.getElementById('calendarGrid');
                const monthElement = document.getElementById('currentMonth');
                
                // Mise à jour du titre du mois
                monthElement.textContent = `${this.monthNames[this.currentMonth]} ${this.currentYear}`;
                
                // Animation de chargement
                grid.classList.add('loading');
                
                setTimeout(() => {
                    grid.innerHTML = '';
                    
                    // En-têtes des jours
                    this.dayNames.forEach(day => {
                        const dayHeader = document.createElement('div');
                        dayHeader.className = 'day-header';
                        dayHeader.textContent = day;
                        grid.appendChild(dayHeader);
                    });
                    
                    // Calcul des jours
                    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
                    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
                    const startDate = new Date(firstDay);
                    
                    // Ajuster au lundi (jour 1 = lundi)
                    const dayOfWeek = firstDay.getDay();
                    const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
                    startDate.setDate(startDate.getDate() - daysToSubtract);
                    
                    // Générer 42 jours (6 semaines)
                    for (let i = 0; i < 42; i++) {
                        const currentDate = new Date(startDate);
                        currentDate.setDate(startDate.getDate() + i);
                        
                        const dayCell = this.createDayCell(currentDate);
                        grid.appendChild(dayCell);
                    }
                    
                    grid.classList.remove('loading');
                }, 150);
            }
            
            createDayCell(date) {
                const cell = document.createElement('div');
                cell.className = 'calendar-day';
                
                const dayNumber = document.createElement('div');
                dayNumber.className = 'day-number';
                dayNumber.textContent = date.getDate();
                
                // Vérifier si c'est le mois actuel
                if (date.getMonth() !== this.currentMonth) {
                    cell.classList.add('prev-next-month');
                    dayNumber.classList.add('prev-next');
                }
                
                // Vérifier si c'est aujourd'hui
                if (this.isToday(date)) {
                    cell.classList.add('today');
                    dayNumber.classList.add('today');
                }
                
                cell.appendChild(dayNumber);
                
                // Ajouter les événements
                const eventKey = `${date.getFullYear()}-${date.getMonth()}`;
                const dayEvents = this.events[eventKey] && this.events[eventKey][date.getDate()];
                
                if (dayEvents) {
                    // Vérifier si c'est une période de festival
                    const isFestival = dayEvents.some(event => event.type === 'festival');
                    if (isFestival) {
                        cell.classList.add('festival-period');
                        dayNumber.classList.add('festival');
                    }
                    
                    dayEvents.forEach(event => {
                        const eventDiv = document.createElement('div');
                        eventDiv.className = `event ${event.type}`;
                        eventDiv.textContent = event.text;
                        eventDiv.title = event.text; // Tooltip
                        cell.appendChild(eventDiv);
                    });
                }
                
                return cell;
            }
            
            isToday(date) {
                return date.toDateString() === this.today.toDateString();
            }
        }
        
        // Initialiser le calendrier quand la page est chargée
        document.addEventListener('DOMContentLoaded', () => {
            new EventCalendar();
        });
// Hero Video Optimization
document.addEventListener('DOMContentLoaded', function() {
    const heroVideo = document.querySelector('#home video');
    
    // Optimiser le chargement de la vidéo
    if (heroVideo) {
      // Précharger les métadonnées de la vidéo
      heroVideo.preload = 'metadata';
      
      // Détection pour Safari iOS - contournement autoplay
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      if (isIOS) {
        // Solution de repli pour iOS
        heroVideo.playsInline = true;
        heroVideo.muted = true;
        heroVideo.setAttribute('muted', '');
        heroVideo.removeAttribute('autoplay');
        
        document.addEventListener('touchstart', function firstTouch() {
          heroVideo.play();
          document.removeEventListener('touchstart', firstTouch, false);
        }, false);
      }
    }
    
    // Smooth scrolling pour l'indicateur de défilement
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  });
        
        // Mobile menu toggle
        document.getElementById('mobile-menu-button').addEventListener('click', function() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        });
        
        // Highlights carousel
        const container = document.getElementById('highlights-container');
        const dots = [document.getElementById('highlight-dot-0'), document.getElementById('highlight-dot-1'), document.getElementById('highlight-dot-2')];
        let currentSlide = 0;
        
        document.getElementById('next-highlight').addEventListener('click', function() {
            if (currentSlide < 2) {
                currentSlide++;
                updateCarousel();
            }
        });
        
        document.getElementById('prev-highlight').addEventListener('click', function() {
            if (currentSlide > 0) {
                currentSlide--;
                updateCarousel();
            }
        });
        
        function updateCarousel() {
            // Update transform
            container.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update dots
            dots.forEach((dot, index) => {
                if (index === currentSlide) {
                    dot.classList.remove('bg-gray-300', 'w-2');
                    dot.classList.add('bg-blue-500', 'w-8');
                } else {
                    dot.classList.remove('bg-blue-500', 'w-8');
                    dot.classList.add('bg-gray-300', 'w-2');
                }
            });
        }
        
        // FAQ toggle
        function toggleFaq(button) {
            const answer = button.nextElementSibling;
            const icon = button.querySelector('i');
            
            answer.classList.toggle('hidden');
            icon.classList.toggle('rotate-180');
        }
  
        
document.addEventListener('DOMContentLoaded', function() {
    const typeFilter = document.getElementById('type-filter');
    const priceFilter = document.getElementById('price-filter');
    const sortBy = document.getElementById('sort-by');
    const resetBtn = document.getElementById('reset-filters');
    const accommodationList = document.getElementById('accommodation-list');
    const cards = Array.from(document.querySelectorAll('.accommodation-card'));

    // Fonction de filtrage et tri
  function updateAccommodationList() {
        const typeValue = typeFilter.value;
        const priceValue = parseInt(priceFilter.value);
        const sortValue = sortBy.value;

        // Filtrer
        let filteredCards = cards.filter(card => {
            const cardType = card.dataset.type;
            const cardPrice = parseInt(card.dataset.price);
            
            return (typeValue === 'all' || cardType === typeValue) && 
                   (cardPrice <= priceValue);
        });

        // Trier
        filteredCards.sort((a, b) => {
            const priceA = parseInt(a.dataset.price);
            const priceB = parseInt(b.dataset.price);
            const ratingA = parseFloat(a.dataset.rating);
            const ratingB = parseFloat(b.dataset.rating);

            switch(sortValue) {
                case 'price-asc':
                    return priceA - priceB;
                case 'price-desc':
                    return priceB - priceA;
                case 'rating':
                    return ratingB - ratingA;
                default:
                    return 0;
            }
        });

        // Mettre à jour l'affichage
        accommodationList.innerHTML = '';
        filteredCards.forEach(card => {
            accommodationList.appendChild(card);
        });
    }

    // Écouteurs d'événements
    typeFilter.addEventListener('change', updateAccommodationList);
    priceFilter.addEventListener('change', updateAccommodationList);
    sortBy.addEventListener('change', updateAccommodationList);
    
    resetBtn.addEventListener('click', function() {
        typeFilter.value = 'all';
        priceFilter.value = '9999';
        sortBy.value = 'price-asc';
        updateAccommodationList();
    });

    // Initialisation
    updateAccommodationList();
});

