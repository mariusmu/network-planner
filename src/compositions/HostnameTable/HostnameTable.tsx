import React from 'react'
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

export default function HostnameTable () {
  const list = useSelector((state: RootState) => state.hostnameSlice.hostnames)
  const dispatch = useDispatch()
  const mapped = mapHostnameToGrid(list)
  const { isOpen, onOpen, onClose } = useDisclosure()

  function removeItem (id: string) {
    dispatch(remove(id))
  }

  return (
    <>
      <Container maxW='1000px'>
        <NetTable data={mapped} removeAction={removeItem}></NetTable>
        <Box w='40px'>
          <Button onClick={onOpen} marginLeft='20px' marginTop='10px' size='sm'>
            Add
          </Button>
        </Box>
      </Container>
      <Modal size='xl' isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <HostnameInput />
        </ModalContent>
      </Modal>
    </>
  )
}
