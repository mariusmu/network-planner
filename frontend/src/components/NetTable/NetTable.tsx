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
export type EditAction = (id: string, copy: boolean) => void

export default function NetTable (props: {
  data: GridEntry
  removeAction: RemoveAction
  editAction: EditAction
}) {
  return (
    <Container maxW='1300px' paddingTop='20px'>
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
                  <Button size='xs' onClick={() => props.removeAction(row.id)}>
                    Delete
                  </Button>
                  &nbsp;&nbsp;
                  <Button
                    size='xs'
                    onClick={() => props.editAction(row.id, false)}
                  >
                    Edit
                  </Button>
                  &nbsp;&nbsp;
                  <Button
                    size='xs'
                    onClick={() => props.editAction(row.id, true)}
                  >
                    Copy
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
