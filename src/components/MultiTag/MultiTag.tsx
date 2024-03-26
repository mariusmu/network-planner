import { Tag } from '@chakra-ui/react'
import React from 'react'

export default function MultiTag (props: { arr: string }) {
  let id = 1
  return props.arr.split(', ').map(t => {
    return <Tag key={'tag-' + id++}>{t}</Tag>
  })
}
