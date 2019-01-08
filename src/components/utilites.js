export const config = {
  defaultPage: '/index.html',
  serverUrl: 'http://localhost:53492/Page/RequestProcessor.aspx'
};

export const buildLink = (catID, id) =>
  window.location.origin +
  config.defaultPage +
  '?category=' +
  catID +
  (id !== '' ? '&id=' + id : '');

export const getCategoryNumber = () => {
  const pair = require('url').parse(window.location.search, { parseQueryString: true })
    .query;
  const key = Object.keys(pair);
  if (key.length === 0) return 0;
  return pair[key[0]];
};

export function getSubCatNumber() {
  const pair = require('url').parse(window.location.search, { parseQueryString: true })
    .query;
  const key = Object.keys(pair);
  if (!key[1]) return 0;
  return pair[key[1]];
}

function httpGet(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });
}

const parseCompositeString = string => string.split('&').map(item => item.split(';'));
const parseSimpleString = string => string.split('&');

const serverRequest = (command, catID = '', albumID = '') =>
  httpGet(
    config.serverUrl + '?Command=' + command + '&catID=' + catID + '&albumID=' + albumID
  );

export function getCategoriesList(responseHandler) {
  serverRequest('getCategoriesList').then(response => {
    responseHandler(parseCompositeString(response));
    return;
  });
}

export function getsubCategoriesList(responseHandler, catID) {
  serverRequest('getCurrentCategory', catID).then(response => {
    responseHandler(parseCompositeString(response));
    return;
  });
}

export function getPhotosList(responseHandler, catID, albumID) {
  serverRequest('getPhotosList', catID, albumID).then(response => {
    responseHandler(parseSimpleString(response));
    return;
  });
}
