import defaultSettings from '@/settings'

const title = defaultSettings.title || '嗷嗷嗷'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
