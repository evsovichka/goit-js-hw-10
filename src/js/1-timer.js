import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('#datetime-picker');
const button = document.querySelector('[data-start]');
const fieldDays = document.querySelector('.value[data-days]');
const fieldHours = document.querySelector('.value[data-hours]');
const fieldMinutes = document.querySelector('.value[data-minutes]');
const fieldSeconds = document.querySelector('.value[data-seconds]');

const currentDate = new Date();
let userSelectedDate;
button.disabled = true;

const picker = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate >= currentDate) {
      userSelectedDate = selectedDate;
      handleSelectedDate();
      button.disabled = false;
    } else {
      button.disabled = true;
      iziToast.error({
        title: 'Please choose a date in the future',
        position: 'topRight',
      });
    }
  },
});

function handleSelectedDate() {
  console.log('Selected date:', userSelectedDate);
  button.disabled = false;
}

button.addEventListener('click', evt => {
  button.disabled = true;
  input.disabled = true;
  let diffTime = userSelectedDate - currentDate;
  const objectTime = convertMs(diffTime);
  const countDownTimer = setInterval(() => {
    if (diffTime <= 0) {
      clearInterval(countDownTimer);
      input.disabled = false;
    } else {
      const objectTime = convertMs(diffTime);
      fieldDays.textContent = objectTime.days.toString().padStart(2, '0');
      fieldHours.textContent = objectTime.hours.toString().padStart(2, '0');
      fieldMinutes.textContent = objectTime.minutes.toString().padStart(2, '0');
      fieldSeconds.textContent = objectTime.seconds.toString().padStart(2, '0');
      diffTime -= 1000;
    }
  }, 1000);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
