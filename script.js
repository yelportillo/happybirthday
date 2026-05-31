document.addEventListener('DOMContentLoaded', () => {
    const card = document.getElementById('card');
    const confettiBtn = document.getElementById('confetti-btn');
    const music = document.getElementById('birthday-music');
    const frontContent = document.querySelector('.front-content');
    const cardTitle = document.getElementById('card-title');
    const cardSubtitle = document.getElementById('card-subtitle');
    const cardIndicator = document.getElementById('card-indicator');

    let currentStep = 0;
    let musicStarted = false;

    const storySteps = [
        { title: "Happy Birthday", subtitle: "A curated celebration awaits", indicator: "Click to open" },
        { title: "Something special...", subtitle: "Is waiting for you inside", indicator: "Click again" },
        { title: "Almost there...", subtitle: "Just a little bit more", indicator: "Keep going" },
        { title: "Ready?", subtitle: "The surprise is here", indicator: "Final click!" },
    ];

    card.addEventListener('click', () => {
        if (currentStep < storySteps.length - 1) {
            // Move to next story step
            currentStep++;
            updateStoryText();
        } else if (currentStep === storySteps.length - 1 && !card.classList.contains('open')) {
            // Final reveal
            card.classList.add('open');
            firePremiumConfetti();
            startMusic();
        } else if (card.classList.contains('open')) {
            // Allow closing the card again
            card.classList.remove('open');
            // Reset story if they close it? No, usually a reveal is a one-way trip
            // but for a card, let's just allow toggling.
        }
    });

    confettiBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        firePremiumConfetti();
    });

    function updateStoryText() {
        const step = storySteps[currentStep];

        frontContent.classList.add('fade-out');

        setTimeout(() => {
            cardTitle.textContent = step.title;
            cardSubtitle.textContent = step.subtitle;
            cardIndicator.textContent = step.indicator;
            frontContent.classList.remove('fade-out');
        }, 400);
    }

    function startMusic() {
        if (!musicStarted) {
            music.play().catch(error => {
                console.log("Autoplay blocked by browser. Music will start on next interaction.");
            });
            musicStarted = true;
        }
    }

    function firePremiumConfetti() {
        const duration = 3 * 1000;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#C5A059', '#F9D976', '#FFFFFF']
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#C5A059', '#F9D976', '#FFFFFF']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }
});
