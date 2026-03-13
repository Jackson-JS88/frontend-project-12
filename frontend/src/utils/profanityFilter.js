import filter from 'leo-profanity'


filter.loadDictionary('ru')
const englishDict = filter.getDictionary('en')
if (englishDict) {
  filter.add(englishDict)
}

export const cleanText = (text) => {
  if (!text || typeof text !== 'string') return text
  return filter.clean(text)
}

export const hasProfanity = (text) => {
  if (!text || typeof text !== 'string') return false
  return filter.check(text)
}

export default filter
