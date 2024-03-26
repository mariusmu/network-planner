import React from 'react'
import { useState } from 'react'
import { RootState } from '../../index'
import { useDispatch, useSelector } from 'react-redux'
import { mapHostnameToGrid } from '../../helpers/mapToGrid'
import NetTable from '../../components/NetTable/NetTable'
import { remove } from '../../reducers/hostnameReducer'
import { Container } from '@chakra-ui/layout'
import HostnameInput from '../../components/HostnameInput/HostnameInput'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Box,
  Button
} from '@chakra-ui/react'
import { Hostname } from '../../models/hostname'
import shortUUID from 'short-uuid'

export default function HostnameTable () {
  const list = useSelector((state: RootState) => state.hostnameSlice.hostnames)
  const dispatch = useDispatch()
  const mapped = mapHostnameToGrid(list)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [toEdit, setToEdit] = useState<Hostname>()
  function removeItem (id: string) {
    dispatch(remove(id))
  }

  function editAction (id: string, copy: boolean) {
    const found = list.filter(s => s.id === id)
    if (found.length > 0) {
      let toEdit = found[0]
      if (copy) {
        toEdit = Object.assign({}, toEdit)
        toEdit.hostname = found[0].hostname + ' COPY'
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
          <HostnameInput entityToEdit={toEdit} closeAction={onClose} />
        </ModalContent>
      </Modal>
    </>
  )
}
