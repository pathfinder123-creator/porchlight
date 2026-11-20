// Shared navigation foundation. Future modules will add assessment and directory routes.
const path = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.links a').forEach(link => { if (link.getAttribute('href') === path) link.setAttribute('aria-current','page'); });
