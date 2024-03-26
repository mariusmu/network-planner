import {
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon
} from '@chakra-ui/input'
import { Stack } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Hostname } from '../../models/hostname'
import shortUuid from 'short-uuid'
import { add } from '../../reducers/hostnameReducer'

export default function HostnameInput () {
  const [hostname, setHostname] = useState({ value: 'marius', valid: true })
  const [ipAddress, setIpAddress] = useState({
    value: '192.168.10.2',
    valid: true
  })
  const [environment, setEnvironment] = useState('Preprod')
  const [groups, setGroups] = useState<string>('Test,Web')
  const [description, setDescription] = useState('My server')
  const dispatch = useDispatch()
  function submit () {
    const item: Hostname = {
      description: description,
      environment: environment,
      groups: groups.split(',').map(s => {
        return {
          name: s,
          id: shortUuid.generate()
        }
      }),
      hostname: hostname,
      id: shortUuid().generate(),
      ipAddress: ipAddress
    }
    console.log(item)
    dispatch(add(item))
  }

  return (
    <Stack padding='20px' spacing={3}>
      <InputGroup>
        <InputLeftAddon>Hostname</InputLeftAddon>
        <Input
          value={hostname}
          onChange={ev => setHostname(ev.target.value)}
          placeholder='Valid hostname'
        />
      </InputGroup>

      <InputGroup>
        <InputLeftAddon>IP address</InputLeftAddon>
        <Input
          placeholder='Valid IP'
          value={ipAddress}
          onChange={ev => setIpAddress(ev.target.value)}
        />
      </InputGroup>
      <InputGroup>
        <InputLeftAddon>Environment</InputLeftAddon>
        <Input
          placeholder='Environment'
          value={environment}
          onChange={ev => setEnvironment(ev.target.value)}
        />
      </InputGroup>
      <InputGroup>
        <InputLeftAddon>Groups</InputLeftAddon>
        <Input
          placeholder='Groups'
          value={groups}
          onChange={ev => setGroups(ev.target.value)}
        />
      </InputGroup>
      <InputGroup>
        <InputLeftAddon>Description</InputLeftAddon>
        <Input
          placeholder='Description'
          value={description}
          onChange={ev => setDescription(ev.target.value)}
        />
      </InputGroup>
      <Button size='sm' onClick={() => submit()}>
        Submit
      </Button>
    </Stack>
  )
}
