import { GifsResult, GiphyFetch } from '@giphy/js-fetch-api'
import { IGif } from '@giphy/js-types'

const KEY = process.env.EXPO_PUBLIC_GIPHY_KEY

export const giphySearch = async (
  term: string,
  offset = 0,
): Promise<IGif[]> => {
  const gf = new GiphyFetch(KEY!)

  const { data } = await gf.search(term, {
    limit: 20,
    sort: 'relevant',
    offset,
  })

  return data
}

export const giphyTrending = async (offset = 0): Promise<GifsResult> => {
  const gf = new GiphyFetch(KEY!)

  return await gf.trending({
    limit: 20,
    offset,
  })
}
