const date = document.querySelector("div#header h5.date");

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

function getDate() {
  const dateObj = new Date();
  const year = String(dateObj.getFullYear());
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const dayOfWeek = String(dateObj.getDay());
  date.innerText = `${year}.${month}.${day} ${days[dayOfWeek]}`;
}

getDate();
