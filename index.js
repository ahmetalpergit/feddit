const shareBtn = document.querySelector('.shareBtn');
const formContainer = document.querySelector('form');

shareBtn.addEventListener('click', () => {
  if (formContainer.classList.contains('visible')) {
    formContainer.classList.remove('visible');
    shareBtn.textContent = 'Share a fact';
  } else {
    formContainer.classList.add('visible');
    shareBtn.textContent = 'Cancel';
  }
});
