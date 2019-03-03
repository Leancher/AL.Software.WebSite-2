import { config } from './utilites';

export function headTags(namePage, description) {
  document.title = namePage + ' - ' + config.siteName;
  document.getElementsByTagName('META')[2].content = description;
}
