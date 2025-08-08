class TypeWriter {
    constructor(element, words, wait = 3000) {
        this.element = element;
        this.words = words;
        this.wait = parseInt(wait, 10);
        this.text = '';
        this.wordIndex = 0;
        this.isDeleting = false;
        this.type();
    }

    type() {
        // Current word index
        const current = this.wordIndex % this.words.length;
        const fullWord = this.words[current];

        // Check if deleting
        if (this.isDeleting) {
            // Remove character
            this.text = fullWord.substring(0, this.text.length - 1);
        } else {
            // Add character
            this.text = fullWord.substring(0, this.text.length + 1);
        }

        // Insert text into element
        this.element.textContent = this.text;

        // Initial typing speed
        let typeSpeed = 150;

        if (this.isDeleting) {
            typeSpeed /= 2; // Faster deletion
        }

        // Check if word is complete
        if (!this.isDeleting && this.text === fullWord) {
            // Pause at end of word
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.text === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500; // Pause before typing next word
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

class QuoteRotator {
    constructor(element, quotes, wait = 5000) {
        this.element = element;
        this.quotes = quotes;
        this.wait = wait;
        this.current = 0;
        this.rotate();
    }

    rotate() {
        this.element.style.opacity = '0';
        setTimeout(() => {
            this.element.textContent = this.quotes[this.current];
            this.element.style.opacity = '1';
            this.current = (this.current + 1) % this.quotes.length;
        }, 500);
        setTimeout(() => this.rotate(), this.wait);
    }
}

class SkillsAnimator {
    constructor() {
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('skill-animate');
                    }
                });
            },
            { threshold: 0.5 }
        );

        this.initializeSkillCards();
        this.initializeTickerContent();
    }

    initializeSkillCards() {
        const cards = document.querySelectorAll('.skill-card');
        cards.forEach((card, index) => {
            // Add initial state class
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.transitionDelay = `${index * 0.1}s`;
            
            // Observe the card
            this.observer.observe(card);
        });
    }

    initializeTickerContent() {
        const ticker = document.querySelector('.ticker');
        const content = document.querySelector('.ticker-content');
        
        // Clone the content for seamless looping
        const clone = content.cloneNode(true);
        ticker.appendChild(clone);
        
        // Calculate the required width and set it
        const contentWidth = content.offsetWidth;
        ticker.style.width = `${contentWidth * 2}px`;
    }
}

// Init on DOM Load
document.addEventListener('DOMContentLoaded', init);

function init() {
    // Initialize header typing effect
    const element = document.getElementById('typing-text');
    const words = [
        'ECE Student',
        'Web Developer',
        'AI Enthusiast',
        'Cloud Engineer'
    ];
    new TypeWriter(element, words);

    // Initialize about section intro
    const aboutIntro = document.getElementById('about-intro');
    aboutIntro.textContent = "Hi, I'm Samsung, a 3rd Year ECE student passionate about AI and Cloud(AWS & GCP).";

    // Initialize quote rotator
    const quoteElement = document.getElementById('rotating-quote');
    const quotes = [
        '"The only way to do great work is to love what you do." - Samsung',
        '"Innovation distinguishes between a leader and a follower." - Samsung',
        '"Learning never exhausts the mind." - Leonardo da Vinci'
    ];
    new QuoteRotator(quoteElement, quotes);

    // Initialize skills animations
    new SkillsAnimator();
}