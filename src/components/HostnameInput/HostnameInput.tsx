import { Input } from '@chakra-ui/input'
import { Stack } from '@chakra-ui/layout'
import { Button, FormControl, FormErrorMessage } from '@chakra-ui/react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Hostname } from '../../models/hostname'
import { useForm, Controller } from 'react-hook-form'
import { MultiSelect } from 'chakra-multiselect'
import { add } from '../../reducers/hostnameReducer'
import shortUUID from 'short-uuid'

export default function HostnameInput (props: {
  entityToEdit: Hostname
  closeAction: () => void
}) {
  const dispatch = useDispatch()
  const { register, handleSubmit, formState, control } = useForm<Hostname>({
    defaultValues: {
      description: props.entityToEdit?.description ?? '',
      environment: props.entityToEdit?.environment ?? '',
      groups: props.entityToEdit?.groups ?? [],
      hostname: props.entityToEdit?.hostname ?? '',
      ipAddress: props.entityToEdit?.ipAddress ?? ''
    }
  })

  function submit (values) {
    const item: Hostname = {
      hostname: values.hostname,
      description: values.description,
      environment: values.environment,
      groups: values.groups,
      id: props.entityToEdit?.id ?? shortUUID().generate(),
      ipAddress: values.ipAddress
    }
    dispatch(add(item))
    props.closeAction()
  }
  const options = [
    { label: 'Production', value: 'production' },
    { label: 'Pre-Production', value: 'pre-production' },
    { label: 'Test', value: 'test', disabled: false },
    { label: 'Development', value: 'dev' }
  ]

  return (
    <Stack padding='20px' spacing={3}>
      <form onSubmit={handleSubmit(submit)}>
        <FormControl
          isInvalid={formState.errors.hostname !== undefined}
          paddingBottom='10px'
        >
          <Input
            padding='20px'
            placeholder='Valid hostname'
            {...register('hostname', { required: true, minLength: 4 })}
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
                options={options}
                value={value ? value : []}
                onChange={onChange}
                labelledBy='Select'
                disableSearch
                placeholder='Groups'
                hasSelectAll={false}
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
