import { config, mainPageProps } from './utilites';

export function headTags(namePage = mainPageProps.namePage, description = mainPageProps.description) {
  document.title = namePage + ' - ' + config.siteName;
  document.getElementsByTagName('META')[2].content = description;
}
