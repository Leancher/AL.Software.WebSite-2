export const config = {
  defaultPage: "/index.html"
};

export const buildLink = item => window.location.origin + config.defaultPage + "?category=" + item;

function parseQStr(qString){
  const pair = require('url').parse(qString, {parseQueryString: true}).query;
  const key = Object.keys(pair);
  if (key.length === 0) return 'Main';
  return pair[key[0]];
}

export function getCategory() {
  const category = parseQStr(window.location.search);
  return category;
}
