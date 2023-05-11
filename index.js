const shareBtn = document.querySelector('.shareBtn');
const formContainer = document.querySelector('form');

shareBtn.addEventListener('click', () => {
  shareBtn.classList.toggle('hidden');

  if (formContainer.classList.contains('visible')) {
    formContainer.classList.remove('visible');
  } else {
    formContainer.classList.add('visible');
  }
});
