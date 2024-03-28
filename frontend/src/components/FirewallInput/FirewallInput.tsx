import { Stack } from '@chakra-ui/layout'
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Spacer,
  Text
} from '@chakra-ui/react'
import React from 'react'
import { Select } from 'chakra-react-select'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { RootState } from '../..'
import * as _ from 'lodash'
import { FirewallEntry, add } from '../../reducers/firewallReducer'
import {
  mapHostnamesToSelect,
  mapHostnameToInput
} from '../../helpers/mapToSelect'
import { Hostname } from '../../models/hostname'
import { MultiSelect } from 'chakra-multiselect'
import shortUUID from 'short-uuid'
import { Environment } from '../../reducers/environmentReducer'

export default function FirewallInput (props: {
  entityToEdit?: FirewallEntry
  closeAction: () => void
  environment: Environment
}) {
  const dispatch = useDispatch()
  const hostnames: Hostname[] = useSelector(
    (state: RootState) => state.hostnameSlice.hostnames
  )
  const environments: Environment[] = useSelector(
    (state: RootState) => state.environmentSlice.environments
  )

  const { register, handleSubmit, formState, control } = useForm<FirewallEntry>(
    {
      defaultValues: {
        description: props.entityToEdit?.description ?? '',
        source: mapHostnameToInput(props.entityToEdit?.source) as any,
        destination: mapHostnameToInput(props.entityToEdit?.destination) as any,
        destinationPorts:
          (props.entityToEdit?.destinationPorts.map(p => {
            return { label: p, value: p }
          }) as any) ?? [],
        environment: props.entityToEdit?.environment ?? {},
        id: props.entityToEdit?.id ?? ''
      }
    }
  )

  function submit (values) {
    const destination = hostnames.filter(
      h => h.id === values.destination.value
    )[0]
    const source = hostnames.filter(h => h.id === values.source.value)[0]
    const ports = values.destinationPorts.map(p => +p.value)

    const item: FirewallEntry = {
      destination: destination,
      source: source,
      description: values.description,
      id: props.entityToEdit?.id ?? shortUUID().generate(),
      environment: props.environment,
      destinationPorts: ports
    }
    dispatch(add(item))
    props.closeAction()
  }
  const hostnamesAsInput = mapHostnamesToSelect(hostnames)

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Flex padding='20px' align='flex-end' flexWrap='wrap'>
        <Box flexBasis='40%' marginRight='50px'>
          <FormControl
            isInvalid={formState.errors.source !== undefined}
            paddingBottom='10px'
          >
            <Controller
              control={control}
              rules={{ required: 'Please enter a source.' }}
              render={({
                field: { onChange, onBlur, value, name },
                fieldState: { error }
              }) => {
                const selectedHostname = hostnames.filter(
                  h => h.id === (value as any).value
                )[0]
                return (
                  <>
                    <Stack marginBottom='20px'>
                      <Text mb='8px'>Source FQDN</Text>
                      <Select
                        size='sm'
                        options={hostnamesAsInput}
                        value={value}
                        name={name}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder='Source'
                      />
                      <FormErrorMessage>
                        {error && error.message}
                      </FormErrorMessage>
                    </Stack>
                    <Stack marginBottom='20px'>
                      <Text size='sm' mb='8px'>
                        Source FQDN
                      </Text>
                      <Input
                        size='sm'
                        onChange={() => {}}
                        disabled={true}
                        value={selectedHostname?.hostname ?? ''}
                      />
                    </Stack>
                    <Stack marginBottom='20px'>
                      <Text size='sm' mb='8px'>
                        Source CIDR
                      </Text>

                      <Input
                        size='sm'
                        onChange={() => {}}
                        disabled={true}
                        value={selectedHostname?.ipAddress ?? ''}
                      />
                    </Stack>
                  </>
                )
              }}
              name='source'
            />
          </FormControl>
        </Box>
        <Spacer />

        <Box flexBasis='40%'>
          <FormControl
            isInvalid={formState.errors.destination !== undefined}
            paddingBottom='10px'
          >
            <Controller
              control={control}
              rules={{ required: 'Please enter a destination.' }}
              render={({
                field: { onChange, onBlur, value, name },
                fieldState: { error }
              }) => {
                const selectedHostname = hostnames.filter(
                  h => h.id === (value as any).value
                )[0]
                return (
                  <>
                    <Stack marginBottom='20px'>
                      <Text mb='8px'>Destination name</Text>
                      <Select
                        size='sm'
                        options={hostnamesAsInput}
                        value={value}
                        name={name}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder='Destination'
                      />
                      <FormErrorMessage>
                        {error && error.message}
                      </FormErrorMessage>
                    </Stack>
                    <Stack marginBottom='20px'>
                      <Text mb='8px'>Destination FQDN</Text>

                      <Input
                        size='sm'
                        onChange={() => {}}
                        disabled={true}
                        value={selectedHostname?.hostname ?? ''}
                      />
                    </Stack>
                    <Stack marginBottom='20px'>
                      <Text mb='8px'>Destination CIDR</Text>

                      <Input
                        size='sm'
                        onChange={() => {}}
                        disabled={true}
                        value={selectedHostname?.ipAddress ?? ''}
                      />
                    </Stack>
                  </>
                )
              }}
              name='destination'
            />
          </FormControl>
        </Box>
        <Spacer />

        <Box flexBasis='40%'>
          <FormControl
            isInvalid={formState.errors.destinationPorts !== undefined}
            paddingBottom='10px'
          >
            <Controller
              control={control}
              rules={{ required: 'Please enter a destination port.' }}
              render={({
                field: { onChange, value },
                fieldState: { error }
              }) => {
                const ports = Array.isArray(value)
                  ? value.map(v => {
                      const val = v as any
                      return { label: val.label, value: val.value }
                    })
                  : []
                return (
                  <>
                    <Stack marginBottom='20px'>
                      <Text mb='8px'>Destination port</Text>
                      <MultiSelect
                        size='sm'
                        w='20px'
                        maxW='20px'
                        options={[]}
                        value={ports}
                        onChange={onChange}
                        labelledBy='Select'
                        disableSearch
                        placeholder='Groups'
                        hasSelectAll={false}
                        create
                      />
                    </Stack>
                  </>
                )
              }}
              name='destinationPorts'
            />
          </FormControl>
        </Box>
        <Spacer />

        <Box flexBasis='100%'>
          <FormControl
            isInvalid={formState.errors.destinationPorts !== undefined}
            paddingBottom='10px'
          >
            <Stack marginBottom='20px'>
              <Text mb='8px'>Description</Text>
              <Input size='sm' {...register('description')} />
            </Stack>
          </FormControl>
        </Box>
        <Button
          colorScheme='teal'
          isLoading={formState.isLoading}
          size='sm'
          type='submit'
        >
          Submit
        </Button>
      </Flex>
    </form>
  )
}
