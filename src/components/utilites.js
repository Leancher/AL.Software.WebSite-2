export const config = {
  siteName: 'Leancher Web site',
  serverUrl: 'http://localhost:53492/Server.aspx',
  //serverUrl: 'http://192.168.0.100:8090/Server.aspx',
  name: 0,
  caption: 1,
  description: 2,
  viewed: 3,
  isPhotoAlbum: 4,
  isArticle: 5,
  isTileGrid: 6
};

export const mainPageProps = {
  namePage: 'Главная',
  description: 'Главная страница сайта'
};

export const buildLink = (cat, subCat = 0) => window.location.origin + '/?cat=' + cat + '&subСat=' + subCat;

export const parseQueryString = param => {
  const arrayQS = require('url').parse(window.location.search, { parseQueryString: true }).query;
  const keys = Object.keys(arrayQS);
  const arrayParams = {};
  !keys[0] ? (arrayParams.cat = 0) : (arrayParams.cat = arrayQS[keys[0]]);
  !keys[1] ? (arrayParams.subCat = 0) : (arrayParams.subCat = arrayQS[keys[1]]);
  return arrayParams[param];
};

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

export const serverRequest = (command, cat = '', subCat = '', album = '', note = '') => {
  return httpGet(
    config.serverUrl + '?Command=' + command + '&cat=' + cat + '&subCat=' + subCat + '&album=' + album + '&note=' + note
  );
};

export function getCurrentCategory(responseHandler, category) {
  serverRequest('getCurrentCategory', category).then(response => {
    responseHandler(parseCompositeString(response));
    return;
  });
}

export function getCategoriesList(responseHandler) {
  serverRequest('getCategoriesList').then(response => {
    responseHandler(parseCompositeString(response));
    return;
  });
}

export function getPhotosList(responseHandler, catNum, subCatNum) {
  serverRequest('getPhotosList', catNum, subCatNum).then(response => {
    responseHandler(parseSimpleString(response));
    return;
  });
}

export function getNotesPreview(responseHandler) {
  serverRequest('getNotesPreview').then(response => {
    responseHandler(parseCompositeString(response));
    return;
  });
}

export function getSingleNote(responseHandler, note) {
  serverRequest('getSingleNote', '', '', note).then(response => {
    responseHandler(response);
    return;
  });
}

export function getCountView(responseHandler, note) {
  serverRequest('getCountView').then(response => {
    responseHandler(parseCompositeString(response));
    return;
  });
}

export function fakeDelay(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
