const hourEl = document.querySelector('.hour');
const minuteEl = document.querySelector('.minute');
const secondEl = document.querySelector('.second');
const timeEl = document.querySelector('.time');
const dateEl = document.querySelector('.date');
const toggle = document.querySelector('.toggle');
const secret = document.querySelector('.secret');

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const dark = 'dark';
const special = 'special';

toggle.addEventListener('click', (evt) => {
  const html = document.querySelector('html');
  if (html.classList.contains(dark)) {
    html.classList.remove(dark);
    evt.target.innerHTML = 'Dark Mode';
  } else {
    html.classList.remove(special);
    html.classList.add(dark);
    evt.target.innerHTML = 'Light Mode';
  }
  if (evt.detail === 3) {
    secret.disabled = false;
    secret.hidden = false;
  }
  if (evt.detail === 1) {
    secret.disabled = true;
    secret.hidden = true;
  }
});

secret.addEventListener('click', () => {
  const html = document.querySelector('html');
  toggle.innerText = 'Awaken';
  html.classList.remove(dark);
  html.classList.add(special);
  secret.hidden = true;
  secret.disabled = true;
});

function setTime() {
  const time = new Date();
  const month = time.getMonth();
  const day = time.getDay();
  const date = time.getDate();
  const hours = time.getHours();
  const hoursForClock = hours % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hourEl.style.transform = `translate(-50%, -100%) rotate(${scale(hoursForClock, 0, 11, 0, 360)}deg)`;
  minuteEl.style.transform = `translate(-50%, -100%) rotate(${scale(minutes, 0, 59, 0, 360)}deg)`;
  secondEl.style.transform = `translate(-50%, -100%) rotate(${scale(seconds, 0, 59, 0, 360)}deg)`;

  const minutesForClock = minutes < 10 ? `0${minutes}` : minutes;
  timeEl.innerHTML = `${hoursForClock}:${minutesForClock} ${ampm}`;
  dateEl.innerHTML = `${days[day]}, ${months[month]} <span class="circle">${date}</span>`;
}

// StackOverflow https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
const scale = (num, in_min, in_max, out_min, out_max) => {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

setTime();

setInterval(setTime, 1000);