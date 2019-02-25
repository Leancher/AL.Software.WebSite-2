export const config = {
  siteName: 'Leancher Web site',
  defaultPage: '/index.html',
  picFolder: './Pictures',
  serverUrl: 'http://localhost:53492/Server.aspx',
  //serverUrl: 'http://192.168.0.100:8090/Server.aspx',
  name: 0,
  caption: 1,
  description: 2,
  isPhotoAlbum: 3,
  isTileGrid: 4,
  isArticle: 4
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
  //console.log(arrayParams);
  return arrayParams[param];
};

export const getCategoryNumber = () => {
  const pair = require('url').parse(window.location.search, { parseQueryString: true }).query;
  const key = Object.keys(pair);
  if (key.length === 0) return 0;
  return pair[key[0]];
};

export function getSubCatNumber() {
  const pair = require('url').parse(window.location.search, { parseQueryString: true }).query;
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

export const serverRequest = (command, cat = '', album = '', note = '') => {
  return httpGet(config.serverUrl + '?Command=' + command + '&cat=' + cat + '&album=' + album + '&note=' + note);
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

export function getPhotosList(responseHandler, catID, albumID) {
  serverRequest('getPhotosList', catID, albumID).then(response => {
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
