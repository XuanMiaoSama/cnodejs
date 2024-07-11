export function diffTime(time) {
  let second = Math.floor((new Date() - new Date(time)) / 1000);
  let min = Math.floor(second / 60);
  let hour = Math.floor(min / 60);
  let day = Math.floor(hour / 24);
  let month = Math.floor(day / 30);
  let year = Math.floor(month / 12);
  if (year > 0) {
    return year + "年前";
  } else if (month > 0) {
    return month + "月前";
  } else if (day > 0) {
    return day + "日前";
  } else if (hour > 0) {
    return hour + "小时前";
  } else if (min > 0) {
    return min + "分前";
  } else if (second > 0) {
    return second + "秒前";
  }
}
