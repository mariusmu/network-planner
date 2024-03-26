import React from 'react'
import {
  Button,
  Container,
  GridItem,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'
import MultiTag from '../MultiTag/MultiTag'

export interface GridItem {
  field: string
  value: string
  multitem?: boolean
}

export interface GridRow {
  id: string
  items: GridItem[]
}

export interface GridHeader {
  name: string
}

export interface GridEntry {
  headers: GridHeader[]
  items: GridRow[]
}

export type RemoveAction = (id: string) => void

export default function NetTable (props: {
  data: GridEntry
  removeAction: RemoveAction
}) {
  //   const [array, setArray] = useState(entry)
  //   const [direction, setDirection] = useState(1)
  //   const [sortKey, setSortKey] = useState('')
  //   function Sort (a: GridRow, b: Hostname, key: string) {
  //     const lastDirection = direction
  //     let newDirection = lastDirection
  //     // if (key === sortKey) {
  //     newDirection = lastDirection * -1
  //     console.log(newDirection, lastDirection)
  //     setDirection(newDirection)

  //     setSortKey(key)
  //     return a[key] > b[key] ? newDirection : lastDirection
  //   }

  //   function SortArray (key: string) {
  //     setArray(array.sort((a, b) => Sort(a, b, key)))
  //   }

  return (
    <Container maxW='1000px' paddingTop='20px'>
      <TableContainer>
        <Table size='sm'>
          <Thead>
            <Tr>
              {props.data.headers.map(h => {
                return <Th key={h.name}>{h.name}</Th>
              })}
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {props.data.items.map(row => (
              <Tr key={row.id + Math.random()}>
                {row.items.map(h => {
                  return (
                    <Td key={'td' + row.id + Math.random()}>
                      {h.multitem ? (
                        <MultiTag arr={h.value} />
                      ) : (
                        <span>{h.value}</span>
                      )}
                    </Td>
                  )
                })}
                <Td>
                  <Button size='sm' onClick={() => props.removeAction(row.id)}>
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  )
}
