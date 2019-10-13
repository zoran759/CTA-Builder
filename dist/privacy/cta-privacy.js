window.onload = function () {
  init();
}

function init(){
  var container = document.querySelector(".container");
  var data = getParameterByName("d", window.location.href);
  data = JSON.parse(b64DecodeUnicode(data));
  container.innerHTML = replaceAll(container.innerHTML, "{EMAIL}", data.email);
  container.innerHTML = replaceAll(container.innerHTML, "{COMPANY}", data.company);
}

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}