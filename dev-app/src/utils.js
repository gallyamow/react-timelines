/* eslint-disable no-bitwise */

import { HOURS_PER_DAY, SELECTED_MONTH, SELECTED_YEAR } from './constants'

export const fill = n => {
  const arr = []
  for (let i = 0; i < n; i += 1) {
    arr.push(i)
  }
  return arr
}

const COLORS = ['FF005D', '0085B6', '0BB4C1', '00D49D', 'FEDF03', '233D4D', 'FE7F2D', 'FCCA46', 'A1C181', '579C87']

export const randomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)]

let color = -1
export const nextColor = () => {
  color = (color + 1) % COLORS.length
  return COLORS[color]
}

// let prevColor = null
// export const nextRandomColor = () => {
//   let c = randomColor()
//   while (c === prevColor) {
//     c = randomColor()
//   }
//   prevColor = c
//   return c
// }

// export const randomColor = () => {
//   const LETTERS = '0123456789ABCDEF'
//   let color = ''
//   for (let i = 0; i < 6; i += 1) {
//     color += LETTERS[Math.floor(Math.random() * 16)]
//   }
//   return color
// }

export const hexToRgb = hex => {
  const v = parseInt(hex, 16)
  const r = (v >> 16) & 255
  const g = (v >> 8) & 255
  const b = v & 255
  return [r, g, b]
}

export const colourIsLight = (r, g, b) => {
  const a = 1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return a < 0.5
}

export const addHoursToDay = (day, hoursToAdd) => {
  let d = day
  let h = hoursToAdd
  while (h >= HOURS_PER_DAY) {
    h -= HOURS_PER_DAY
    d += 1
  }
  return { day: d, hour: h + 1 }
}

export const addHoursToDayAsDate = (day, hoursToAdd) => {
  const r = addHoursToDay(day, hoursToAdd)
  return new Date(`${SELECTED_YEAR}-${SELECTED_MONTH}-${r.day} ${r.hour}:00:00`)
}

// Credit: https://jsfiddle.net/katowulf/3gtDf/
const ADJECTIVES = [
  'adamant',
  'adroit',
  'amatory',
  'animistic',
  'antic',
  'arcadian',
  'baleful',
  'bellicose',
  'bilious',
  'boorish',
  'calamitous',
  'caustic',
  'cerulean',
  'comely',
  'concomitant',
  'contumacious',
  'corpulent',
  'crapulous',
  'defamatory',
  'didactic',
  'dilatory',
  'dowdy',
  'efficacious',
  'effulgent',
  'egregious',
  'endemic',
  'equanimous',
  'execrable',
  'fastidious',
  'feckless',
  'fecund',
  'friable',
  'fulsome',
  'garrulous',
  'guileless',
  'gustatory',
  'heuristic',
  'histrionic',
  'hubristic',
  'incendiary',
  'insidious',
  'insolent',
  'intransigent',
  'inveterate',
  'invidious',
  'irksome',
  'jejune',
  'jocular',
  'judicious',
  'lachrymose',
  'limpid',
  'loquacious',
  'luminous',
  'mannered',
  'mendacious',
  'meretricious',
  'minatory',
  'mordant',
  'munificent',
  'nefarious',
  'noxious',
  'obtuse',
  'parsimonious',
  'pendulous',
  'pernicious',
  'pervasive',
  'petulant',
  'platitudinous',
  'precipitate',
  'propitious',
  'puckish',
  'querulous',
  'quiescent',
  'rebarbative',
  'recalcitant',
  'redolent',
  'rhadamanthine',
  'risible',
  'ruminative',
  'sagacious',
  'salubrious',
  'sartorial',
  'sclerotic',
  'serpentine',
  'spasmodic',
  'strident',
  'taciturn',
  'tenacious',
  'tremulous',
  'trenchant',
  'turbulent',
  'turgid',
  'ubiquitous',
  'uxorious',
  'verdant',
  'voluble',
  'voracious',
  'wheedling',
  'withering',
  'zealous',
]
const NOUNS = [
  'ninja',
  'chair',
  'pancake',
  'statue',
  'unicorn',
  'rainbows',
  'laser',
  'senor',
  'bunny',
  'captain',
  'nibblets',
  'cupcake',
  'carrot',
  'gnomes',
  'glitter',
  'potato',
  'salad',
  'toejam',
  'curtains',
  'beets',
  'toilet',
  'exorcism',
  'stick figures',
  'mermaid eggs',
  'sea barnacles',
  'dragons',
  'jellybeans',
  'snakes',
  'dolls',
  'bushes',
  'cookies',
  'apples',
  'ice cream',
  'ukulele',
  'kazoo',
  'banjo',
  'opera singer',
  'circus',
  'trampoline',
  'carousel',
  'carnival',
  'locomotive',
  'hot air balloon',
  'praying mantis',
  'animator',
  'artisan',
  'artist',
  'colorist',
  'inker',
  'coppersmith',
  'director',
  'designer',
  'flatter',
  'stylist',
  'leadman',
  'limner',
  'make-up artist',
  'model',
  'musician',
  'penciller',
  'producer',
  'scenographer',
  'set decorator',
  'silversmith',
  'teacher',
  'auto mechanic',
  'beader',
  'bobbin boy',
  'clerk of the chapel',
  'filling station attendant',
  'foreman',
  'maintenance engineering',
  'mechanic',
  'miller',
  'moldmaker',
  'panel beater',
  'patternmaker',
  'plant operator',
  'plumber',
  'sawfiler',
  'shop foreman',
  'soaper',
  'stationary engineer',
  'wheelwright',
  'woodworkers',
]

export const randomTitle = () =>
  `${ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)]} ${NOUNS[Math.floor(Math.random() * NOUNS.length)]}`

export const padNumber = (n) => String(n).padStart(2, '0')
