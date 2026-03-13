import filter from 'leo-profanity'


filter.loadDictionary('ru')
filter.loadDictionary('en')

export const cleanText = (text) => {
  if (!text) return text
  return filter.clean(text)
}

export const hasProfanity = (text) => {
  if (!text) return false
  return filter.check(text)
}

export default filter
