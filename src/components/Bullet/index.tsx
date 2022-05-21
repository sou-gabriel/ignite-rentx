import React from 'react'

import {
  Container
} from './styles'

interface IBulletProps {
  active: boolean
}

export const Bullet = ({ active = false }: IBulletProps) => {
  return (
    <Container active={active} />
  )
}