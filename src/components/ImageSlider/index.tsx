import React, { useState, useRef } from 'react'
import { FlatList, ViewToken, StatusBar } from 'react-native'

import { Bullet } from '../Bullet'
import {
  Container,
  ImageIndexes,
  CarImageWrapper,
  CarImage,
} from './styles'

interface IImageSliderProps {
  imagesUrl: {
    id: string
    photo: string
  }[]
}

interface IChangeImage {
  viewableItems: ViewToken[]
  changed: ViewToken[]
}

export const ImageSlider = ({ imagesUrl }: IImageSliderProps) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  
  const indexChanged = useRef((info: IChangeImage) => {
    const index = info.viewableItems[0].index
    setCurrentSlideIndex(index)
  })

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 })
    
  return (
    <Container>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <ImageIndexes>
        {imagesUrl.map((item, index) => (
          <Bullet 
            key={item.id} 
            active={currentSlideIndex === index} 
          />
        ))}
      </ImageIndexes>

      <FlatList
        data={imagesUrl}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CarImageWrapper>
            <CarImage source={{ uri: item.photo }} resizeMode="contain" />
          </CarImageWrapper>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        viewabilityConfig={viewConfigRef.current}
        onViewableItemsChanged={indexChanged.current}
      />
    </Container>
  );
}

