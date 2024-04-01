import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import shortUUID from 'short-uuid'

import { Container } from '@chakra-ui/layout'
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast
} from '@chakra-ui/react'

import { faCircleChevronDown } from '@fortawesome/free-solid-svg-icons'

import NetTable from '../../components/NetTable/NetTable'
import FirewallInput from '../../components/FirewallInput/FirewallInput'
import { mapFirewallEntryToGrid } from '../../helpers/mapToGrid'
import { AppDispatch, RootState } from '../../index'
import { remove } from '../../reducers/firewallReducer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Environment } from '../../../../shared/models/environment'
import { FirewallEntry } from '../../../../shared/models/firewallEntry'
import { deleteEntity } from '../../reducers/commonReducers'

export default function HostnameTable () {
  const list = useSelector((state: RootState) => state.firewallSlice)
  const selector = useSelector((state: RootState) => state.environmentSlice)
  const environments = selector.entity
  const dispatch = useDispatch<AppDispatch>()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [toEdit, setToEdit] = useState<FirewallEntry>()
  const [selectedEnvironment, setSelectedEnvironment] = useState<Environment>()
  const toast = useToast()
  const mapped = mapFirewallEntryToGrid(
    list.entity.filter(l => l.environment.id === selectedEnvironment?.id ?? -1)
  )

  if (selectedEnvironment === undefined && environments.length > 0) {
    setSelectedEnvironment(environments[0])
  }

  function removeItem (id: string) {
    deleteEntity('firewallEntry', id)
      .then(() => dispatch(remove(id)))
      .catch(err => {
        toast({
          title: 'Error deleting firewall entry',
          status: 'error',
          duration: 6000,
          isClosable: true
        })
      })
  }

  function editAction (id: string, copy: boolean) {
    const found = list.entity.filter(s => s.id === id)
    if (found.length > 0) {
      let toEdit = found[0]
      if (copy) {
        toEdit = Object.assign({}, toEdit)
        toEdit.id = shortUUID().generate()
      }
      setToEdit(toEdit)
      onOpen()
    }
  }

  return (
    <Container maxW='1300px'>
      <Menu>
        <Box maxW='40px'>
          <MenuButton
            as={Button}
            rightIcon={<FontAwesomeIcon icon={faCircleChevronDown} />}
          >
            {selectedEnvironment?.name ?? 'Select environment'}
          </MenuButton>
        </Box>
        <MenuList>
          {environments.map(e => {
            return (
              <MenuItem
                onClick={() =>
                  setSelectedEnvironment(
                    environments.filter(env => env.id === e.id)[0]
                  )
                }
              >
                {e.name}
              </MenuItem>
            )
          })}
        </MenuList>
      </Menu>
      <Box hidden={selectedEnvironment === undefined}>
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
      </Box>
      <Modal size='xl' isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add firewall entry</ModalHeader>
          <ModalCloseButton />
          <FirewallInput
            entityToEdit={toEdit}
            closeAction={onClose}
            environment={selectedEnvironment}
          />
        </ModalContent>
      </Modal>
    </Container>
  )
}
