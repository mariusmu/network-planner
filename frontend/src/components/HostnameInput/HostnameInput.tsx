import { MultiSelect } from 'chakra-multiselect'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import shortUUID from 'short-uuid'

import { Input } from '@chakra-ui/input'
import { Stack } from '@chakra-ui/layout'
import { Button, FormControl, FormErrorMessage } from '@chakra-ui/react'
import * as _ from 'lodash'
import { RootState } from '../..'
import { Hostname } from '../../../../shared/models/hostName'
import { add } from '../../reducers/hostnameReducer'
import { saveEntity } from '../../reducers/commonReducers'
import { Option } from 'react-multi-select-component'

export interface HostnameInput {
  name: string
  description: string
  environment: Option[]
  groups: Option[]
  hostname: string
  ipAddress: string
}

export default function HostnameInput (props: {
  entityToEdit: Hostname
  closeAction: () => void
}) {
  const dispatch = useDispatch()
  const environments = useSelector(
    (state: RootState) => state.environmentSlice.entity
  )
  const hostnames = useSelector(
    (state: RootState) => state.hostnameSlice.entity
  )

  const { register, handleSubmit, formState, control } = useForm<HostnameInput>(
    {
      defaultValues: {
        name: props.entityToEdit?.name ?? '',
        description: props.entityToEdit?.description ?? '',
        environment:
          props.entityToEdit?.environment.map(e => {
            return { key: e.id, name: e.name, value: e.name }
          }) ?? '',
        groups: props.entityToEdit?.groups ?? [],
        hostname: props.entityToEdit?.hostname ?? '',
        ipAddress: props.entityToEdit?.ipAddress ?? ''
      }
    }
  )

  function submit (values) {
    const environment = values.environment ?? []
    const item: Hostname = {
      name: values.name,
      hostname: values.hostname,
      description: values.description,
      environment: environments.filter(
        e => environment?.map(e => e.key).indexOf(e.id) > -1
      ),
      groups: values.groups,
      id: props.entityToEdit?.id ?? shortUUID().generate(),
      ipAddress: values.ipAddress
    }
    saveEntity('hostname', item)
    dispatch(add(item))
    props.closeAction()
  }
  const options: Option[] = environments.map(e => {
    return { label: e.name, value: e.name, key: e.id }
  })

  const groups = _.uniqBy(_.flatMap(hostnames.map(h => h.groups)), g => g.label)

  return (
    <Stack padding='20px' spacing={3}>
      <form onSubmit={handleSubmit(submit)}>
        <FormControl
          isInvalid={formState.errors.name !== undefined}
          paddingBottom='10px'
        >
          <Input
            padding='20px'
            placeholder='Describing name'
            {...register('name', { required: true, minLength: 4 })}
          />
          <FormErrorMessage>
            {formState.errors.name && formState.errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={formState.errors.hostname !== undefined}
          paddingBottom='10px'
        >
          <Input
            padding='20px'
            placeholder='Valid hostname'
            {...register('hostname', { required: false, minLength: 4 })}
          />
          <FormErrorMessage>
            {formState.errors.hostname && formState.errors.hostname.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={formState.errors.ipAddress !== undefined}
          paddingBottom='10px'
        >
          <Input placeholder='Valid IP' {...register('ipAddress')} />
          <FormErrorMessage>
            {formState.errors.ipAddress && formState.errors.ipAddress.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={formState.errors.environment !== undefined}
          paddingBottom='10px'
        >
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <MultiSelect
                options={options}
                value={value ? value : []}
                onChange={onChange}
                labelledBy='Select'
                disableSearch
                placeholder='Environments'
                hasSelectAll={false}
                create
              />
            )}
            name='environment'
          />
        </FormControl>
        <FormControl
          isInvalid={formState.errors.groups !== undefined}
          paddingBottom='10px'
        >
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <MultiSelect
                options={groups}
                value={value ? value : []}
                onChange={onChange}
                labelledBy='Select'
                disableSearch
                placeholder='Groups'
                hasSelectAll={false}
                create
              />
            )}
            name='groups'
          />
        </FormControl>
        <FormControl
          isInvalid={formState.errors.description !== undefined}
          paddingBottom='10px'
        >
          <Input placeholder='Description' {...register('description')} />
          <FormErrorMessage>
            {formState.errors.description &&
              formState.errors.description.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          colorScheme='teal'
          isLoading={formState.isLoading}
          size='sm'
          type='submit'
        >
          Submit
        </Button>
      </form>
    </Stack>
  )
}
