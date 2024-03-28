import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import shortUUID from 'short-uuid'

import { Container } from '@chakra-ui/layout'
import {
  Box,
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react'

import EnvironmentInput from '../../components/EnvironmentInput/EnvironmentInput'
import NetTable from '../../components/NetTable/NetTable'
import { mapEnvironmentsToGrid } from '../../helpers/mapToGrid'
import { RootState } from '../../index'
import { Environment, remove } from '../../reducers/environmentReducer'

export default function EnvironmentTable () {
  const list = useSelector(
    (state: RootState) => state.environmentSlice.environments
  )
  const dispatch = useDispatch()
  const mapped = mapEnvironmentsToGrid(list)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [toEdit, setToEdit] = useState<Environment>()
  function removeItem (id: string) {
    dispatch(remove(id))
  }

  function editAction (id: string, copy: boolean) {
    const found = list.filter(s => s.id === id)
    if (found.length > 0) {
      let toEdit = found[0]
      if (copy) {
        toEdit = Object.assign({}, toEdit)
        toEdit.name = found[0].name + ' COPY'
        toEdit.id = shortUUID().generate()
      }
      setToEdit(toEdit)
      onOpen()
    }
  }
  return (
    <>
      <Container maxW='1300px'>
        <NetTable
          data={mapped}
          removeAction={removeItem}
          editAction={editAction}
        ></NetTable>
        <Box w='40px'>
          <Button
            onClick={() => {
              setToEdit()
              onOpen()
            }}
            marginLeft='20px'
            marginTop='10px'
            size='sm'
          >
            Add
          </Button>
        </Box>
      </Container>
      <Modal size='xl' isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <EnvironmentInput entityToEdit={toEdit} closeAction={onClose} />
        </ModalContent>
      </Modal>
    </>
  )
}
