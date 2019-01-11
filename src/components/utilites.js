export const config = {
  siteName: 'Leancher Web site',
  defaultPage: '/index.html',
  serverUrl: 'http://localhost:53492/Page/RequestProcessor.aspx',
  name: 0,
  caption: 1,
  description: 2,
  isPhotoAlbum: 3,
  isTileGrid: 4,
  isArticle: 4
};

export const buildLink = (catID, id) =>
  window.location.origin +
  config.defaultPage +
  '?cat=' +
  catID +
  (id !== '' ? '&subcat=' + id : '');

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

export const serverRequest = (command, cat = '', album = '') => {
  return httpGet(
    config.serverUrl + '?Command=' + command + '&cat=' + cat + '&album=' + album
  );
};
export function requestData(responseHandler, catNum) {
  const requestList = [];
  requestList[0] = serverRequest('getCategoriesList');
  requestList[1] = serverRequest('getCurrentCategory', catNum);
  Promise.all(requestList).then(response => {
    responseHandler(
      response.map(item => {
        return (item = parseCompositeString(item));
      })
    );
  });
}

export function getPhotosList(responseHandler, catID, albumID) {
  serverRequest('getPhotosList', catID, albumID).then(response => {
    responseHandler(parseSimpleString(response));
    return;
  });
}
