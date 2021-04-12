const clockContainer = document.querySelector(".js-clock"),
  clockTitle = clockContainer.querySelector(".time"),
  fullDate = clockContainer.querySelector(".full-date");

function getTime() {
  const date = new Date();
  const week = new Array('Sun', 'Mon', 'Wed', 'Tue', 'Thr', 'Fri', 'Sat');
  const year = date.getFullYear();
  const month = date.getMonth() +1;
  const day = date.getDate();
  const dayLabel = week[date.getDay()];
  const minutes = date.getMinutes();
  const hours = date.getHours() % 12;
  const seconds = date.getSeconds();
  const ampm = hours <= 12 ? 'pm' : 'am';
  fullDate.innerText = `${year}.${month}.${day} ${dayLabel}`;
  clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds} ${ampm}`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();
