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
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Box,
  Button,
  useToast
} from '@chakra-ui/react'
import { Hostname } from '../../../../shared/models/hostName'
import shortUUID from 'short-uuid'
import { deleteEntity } from '../../reducers/commonReducers'

export default function HostnameTable () {
  const selector = useSelector((state: RootState) => state.hostnameSlice)
  const dispatch = useDispatch()
  const mapped = mapHostnameToGrid(selector.entity)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [toEdit, setToEdit] = useState<Hostname>()
  const toast = useToast()
  function removeItem (id: string) {
    deleteEntity('hostname', id)
      .then(() => dispatch(remove(id)))
      .catch(err => {
        toast({
          title: 'Error deleting hostname',
          status: 'error',
          duration: 6000,
          isClosable: true
        })
      })
  }

  function editAction (id: string, copy: boolean) {
    const found = selector.entity.filter(s => s.id === id)
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
      <Container maxW='1700px'>
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
