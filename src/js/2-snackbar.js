import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const form = document.querySelector('.form');
const button = document.querySelector('button[type="submit"]');
const fullfilledRadio = document.querySelector('input[value="fulfilled"]');
const rejectedRadio = document.querySelector('input[value="rejected"]');
const inputDelay = document.querySelector("input[name='delay']");

form.addEventListener('submit', evt => {
  evt.preventDefault();
  const delay = parseInt(inputDelay.value);
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fullfilledRadio.checked) {
        resolve(delay);
      } else if (rejectedRadio.checked) {
        reject(delay);
      }
    }, delay);
  });
  promise
    .then(delay => {
      iziToast.show({
        title: '✅',
        message: `Fulfilled promise in ${delay}ms`,
        color: 'green',
        position: 'topRight',
        timeout: 5000,
      });
      form.reset();
    })
    .catch(delay => {
      iziToast.show({
        title: '❌',
        message: `Rejected promise in ${delay}ms`,
        color: 'red',
        position: 'topRight',
        timeout: 5000,
      });
      form.reset();
    });
});
