export const search = () => {
  const setDynamincParams = (path: string, query: { [key: string]: string | (string | null)[] }) => {
    let locationIds
    let locationType
    let word
    let result = {}

    /** @locationIds start */
    locationIds = path.split('/').filter((e) => +e)

    if (typeof query.id === 'string') {
      if (query.id.includes(',')) {
        locationIds = [...locationIds, ...query.id.split(',')]
      } else {
        locationIds = [...locationIds, query.id]
      }
    } else {
      // TODO: id[]=2&id[]=3存在する？
    }
    delete query.id

    if (typeof query['district[]'] === 'string') {
      if (query.id.includes(',')) {
        locationIds = [...locationIds, ...query['district[]'].split(',')]
      } else {
        locationIds = [...locationIds, query['district[]']]
      }
    } else if (query['district[]'] && query['district[]'].length > 0) {
      const queryIds = query['district[]'].reduce((a, b) => {
        if (b !== null) a.push(b)
        return a
      }, [] as string[])
      locationIds = [...locationIds, ...queryIds]
    }
    delete query['district[]']
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
    } else {
      // TODO: word[]='sample1'&word[]='sample2'存在する？
    }
    delete query.word
    /** @word end */

    result = {
      ...(locationIds.length > 0 && { locationIds }),
      ...(locationType && { locationType }),
      ...(word && { word }),
      ...query,
    }
    console.log(result)
    return result
  }

  return {
    setDynamincParams,
  }
}
