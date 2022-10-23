export function formatDate(timestamp) {
  let date = new Date(timestamp);
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();

  let hour = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  const weekArr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  const week = weekArr[date.getDay()];

  if (month >= 1 && month <= 9) {
    month = '0' + month;
  }
  if (day >= 1 && day <= 9) {
    day = '0' + day;
  }
  if (hour >= 1 && hour <= 9) {
    hour = '0' + hour;
  }
  if (minutes >= 1 && minutes <= 9) {
    minutes = '0' + minutes;
  }
  if (seconds >= 1 && seconds <= 9) {
    seconds = '0' + seconds;
  }

  return `${year}-${month}-${day} ${hour}:${minutes}:${seconds} ${week}`;
}
