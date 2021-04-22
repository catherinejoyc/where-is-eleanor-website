document.querySelectorAll(".carousel").forEach(carousel);

function carousel(element) {
    var currentIndex = 0;
    var sliding = false;

    const slides = Array.from(element.querySelectorAll(".content img"));

    element.querySelector(".prev").addEventListener("click", () => setSlide(currentIndex - 1));
    element.querySelector(".next").addEventListener("click", () => setSlide(currentIndex + 1));

    const bulletContainer = element.querySelector(".bullets");
    slides.forEach((slide, i) => {
        let bullet = document.createElement("li");
        let index = i;
        bullet.addEventListener("click", () => setSlide(index));
        bulletContainer.appendChild(bullet);
    })

    // Activate initial slide
    bulletContainer.children[currentIndex].classList.add('active');
    slides[currentIndex].classList.add('active');

    function setSlide(index) {
        if (sliding) { return; }

        let toLeft = index < currentIndex;

        // Conform index
        if (index < 0) { index = slides.length - 1; }
        if (index >= slides.length) { index = 0; }

        let oldIndex = currentIndex;
        let newIndex = currentIndex = index;

        // Deactivate old slide
        bulletContainer.children[oldIndex].classList.remove('active');
        slides[oldIndex].classList.add(toLeft ? 'to-left' : 'to-right');
        slides[oldIndex].classList.remove('active');

        // Activate new slide
        bulletContainer.children[newIndex].classList.add('active');
        slides[newIndex].classList.add('active');

        sliding = true;
        window.setTimeout(() => {
            sliding = false;
            slides[oldIndex].classList = '';
        }, 800);
    }
}