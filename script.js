const header = document.querySelector('header');
const headerHeight = header.offsetHeight;

window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;

  if (scrollPosition > headerHeight) {
    header.classList.add('sticky-header');
    setTimeout(() => {
      header.classList.remove('sticky-header');
    }, 1000); // Adjust the duration the header stays sticky (in milliseconds)
  }
});

// Function to handle the scrolling animation
function handleScrollAnimation(entries) {
  entries.forEach((entry) => {
    const image = entry.target;

    if (entry.isIntersecting) {
      image.classList.add('visible', 'slide-in-right');
    }
  });
}

// Use the Intersection Observer to trigger the scrolling animation
const scrollObserver = new IntersectionObserver(handleScrollAnimation, { threshold: 0.5 });

document.querySelectorAll('.des-images img').forEach((image) => {
  scrollObserver.observe(image);
});

// Function to handle the intersection observer callback for rotate fade-in animation
function handleIntersection(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // If the element is in the viewport, add the rotate fade-in animation class
      entry.target.classList.add('rotate-fade-in');
      observer.unobserve(entry.target);

      // Listen for the animation end event and set final state
      entry.target.addEventListener('animationend', () => {
        entry.target.style.transform = 'rotate(360deg) scale(1)';
        entry.target.style.opacity = 1;
      });
    }
  });
}

// Set up the Intersection Observer for elements with the class 'services-image'
const rotateObserver = new IntersectionObserver(handleIntersection, { threshold: 0.5 });

document.querySelectorAll('.services-image img').forEach(element => {
  rotateObserver.observe(element);
});

// Function to handle the intersection observer callback for typewriter animation
function handleTypewriterIntersection(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // If the element is in the viewport, trigger the typewriter effect
      typeWriterEffect(entry.target);
      observer.unobserve(entry.target);
    }
  });
}

// Set up the Intersection Observer for elements with the class 'typewriter-heading'
const typewriterObserver = new IntersectionObserver(handleTypewriterIntersection, { threshold: 0.5 });

// Apply the observer to all section headings
document.querySelectorAll('h2:not(.no-typewriter-effect)').forEach(heading => {
  typewriterObserver.observe(heading);
});

// Function to simulate a typewriter effect with spaces and a cursor
function typeWriterEffect(element) {
  const words = element.innerText.split(' ');
  element.innerHTML = ''; // Use innerHTML to preserve non-breaking spaces
  let currentWordIndex = 0;
  let currentCharIndex = 0;

  function type() {
    if (currentWordIndex < words.length) {
      const word = words[currentWordIndex];
      if (currentCharIndex <= word.length) {
        const char = word.charAt(currentCharIndex);
        element.innerHTML += char === ' ' ? '&nbsp;' : char; // Use non-breaking space
        currentCharIndex++;
        setTimeout(type, 50); // Adjust the typing speed (in milliseconds)
      } else {
        // Move to the next word and add a space
        currentWordIndex++;
        currentCharIndex = 0;
        element.innerHTML += '&nbsp;'; // Add a non-breaking space
        setTimeout(type, 50); // Adjust the typing speed (in milliseconds)
      }
    } else {
      // Add a blinking cursor when typing is complete
      element.innerHTML += '<span class="cursor">|</span>';
      const cursor = document.querySelector('.cursor');
      cursor.style.animation = 'blink-cursor 0.7s infinite'; // Start blinking after typing
    }
  }

  type();
}

