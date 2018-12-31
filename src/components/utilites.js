export const config = {
  defaultPage: '/index.html'
};

export const buildLink = item =>
  window.location.origin + config.defaultPage + '?category=' + item;

function parseQStr(qString) {
  const pair = require('url').parse(qString, { parseQueryString: true }).query;
  const key = Object.keys(pair);
  if (key.length === 0) return 'Main';
  return pair[key[0]];
}

function httpGet(command = 'Categories') {
  const url = 'http://localhost:53492/Page/RequestProcessor.aspx?Command=' + command;
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });
}

export function getCategoryList(func) {
  httpGet('Categories').then(response => {
    //console.log('getCategoryList: ' + response);
    func(response);
    return;
  });
}

export function getCategory() {
  const category = parseQStr(window.location.search);
  return category;
}
