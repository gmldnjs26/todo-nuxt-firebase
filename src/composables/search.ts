export const search = () => {
  const setDynamincParams = (path: string, query: { [key: string]: string | (string | null)[] }) => {
    let locationIds
    let locationType
    let word

    /** @locationIds start */
    locationIds = path.split('/').filter((e) => +e)

    if (typeof query.id === 'string') {
      if (query.id.includes(',')) {
        locationIds = [...locationIds, ...query.id.split(',')]
      } else {
        locationIds = [...locationIds, query.id]
      }
    } else if (typeof query.id === 'object') {
      const queryIds = query.id.reduce((a, b) => {
        if (b !== null) a.push(b)
        return a
      }, [] as string[])
      locationIds = [...locationIds, ...queryIds]
    }
    delete query.id

    if (typeof query.district === 'string') {
      locationIds = [...locationIds, query.district]
    } else if (typeof query.district === 'object') {
      const queryIds = query.district.reduce((a, b) => {
        if (b !== null) a.push(b)
        return a
      }, [] as string[])
      locationIds = [...locationIds, ...queryIds]
    }
    delete query.district
    /** @locationIds　end */

    /** @locationType　start */
    if (path.includes('station')) {
      locationType = 'station'
    }
    if (path.includes('spot')) {
      locationType = 'spot'
    }
    /** @locationType　end */

    /** @word start */
    if (typeof query.word === 'string') {
      if (query.word.includes(',')) {
        word = [...query.word.split(',')]
      } else {
        word = query.word
      }
    } else if (typeof query.word === 'object') {
      const queryWords = query.word.reduce((a, b) => {
        if (b !== null) a.push(b)
        return a
      }, [] as string[])
      word = queryWords
    }
    delete query.word
    /** @word end */

    return {
      ...(locationIds.length > 0 && { locationIds }),
      ...(locationType && { locationType }),
      ...(word && { word }),
      ...query,
    }
  }

  return {
    setDynamincParams,
  }
}
