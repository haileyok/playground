import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ActivityIndicator, View } from 'react-native'
import { giphyTrending } from './lib/giphySearch'
import { IGif } from '@giphy/js-types'
import { Image } from 'expo-image'
import { useInfiniteQuery } from '@tanstack/react-query'
import { ListRenderItemInfo, MasonryFlashList } from '@shopify/flash-list'

const renderItem = ({ item, index }: ListRenderItemInfo<IGif>) => {
  return <GiphyResult gif={item} index={index} />
}

export function GiphySearchScreen({ navigation }: NativeStackScreenProps<any>) {
  const {
    isLoading,
    data: trendingPages,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['gifs', 'trending'],
    queryFn: async ({ pageParam }: { pageParam?: number, }) => {
      const res = await giphyTrending(pageParam)
      return res
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      console.log(lastPage.pagination)
      return lastPage.pagination.offset + 20
    },
  })

  const gifs = React.useMemo(() => {
    return trendingPages?.pages.flatMap((p) => p.data)
  }, [trendingPages])

  return (
    <View style={{ flex: 1, backgroundColor: 'green' }}>
      <MasonryFlashList
        data={gifs ?? []}
        renderItem={renderItem}
        numColumns={2}
        ListFooterComponent={isLoading ? <ActivityIndicator /> : undefined}
        onEndReached={fetchNextPage}
        estimatedItemSize={200}
      />
    </View>
  )
}

function GiphyResult({ gif, index }: { gif: IGif, index: number, }) {
  const [source, setSource] = React.useState(gif.images.downsized_still.url)

  const prefetch = async () => {
    await Image.prefetch(gif.images.downsized_medium.url)
    setSource(gif.images.downsized_medium.url)
  }

  React.useEffect(() => {
    void prefetch()
    console.log('load', Date.now())
  }, [])

  return (
    <View
      style={{
        height: gif.images.downsized_medium.height / 3,
        borderRadius: 6,
        overflow: 'hidden',
        marginTop: 6,
        marginRight: index % 2 == 0 ? 3 : 6,
        marginLeft: index % 2 !== 0 ? 3 : 6,
      }}
    >
      <Image
        source={source}
        style={{ flex: 1 }}
        cachePolicy="memory-disk"
        recyclingKey={gif.images.downsized_still.url}
      />
    </View>
  )
}
