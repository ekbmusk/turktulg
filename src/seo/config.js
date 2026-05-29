// ВАЖНО: деплойдан кейін осы доменді нақты мекенжайға ауыстырыңыз.
// Канондық URL, sitemap.xml және Open Graph осы мәнге сүйенеді.
export const SITE_URL = 'https://turkistan-tulgalary.kz'
export const SITE_NAME = 'Түркістан тұлғалары'
export const SITE_DESC =
  'Түркістан топырағында дүниеге келген тарихи тұлғалардың өмірбаяны мен мұрасы. Қасиетті өлкеде туып, ел игілігі үшін еңбек еткен ұрпақтар жайлы жинақ.'
export const SITE_LOCALE = 'kk_KZ'

export function abs(path = '') {
  if (/^https?:\/\//.test(path)) return path
  return SITE_URL.replace(/\/$/, '') + path
}
