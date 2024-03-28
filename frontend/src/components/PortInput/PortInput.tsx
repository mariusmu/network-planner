import { Input } from '@chakra-ui/input'
import { Stack } from '@chakra-ui/layout'
import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage
} from '@chakra-ui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { MultiSelect } from 'chakra-multiselect'
import shortUUID from 'short-uuid'
import { Port, add } from '../../reducers/portReducer'
import { RootState } from '../..'
import { Option } from 'react-multi-select-component'
import * as _ from 'lodash'

export default function PortInput (props: {
  entityToEdit: Port
  closeAction: () => void
}) {
  const dispatch = useDispatch()
  const ports: Port[] = useSelector((state: RootState) => state.portSlice.ports)
  const groups: Option[] = _.uniq(
    ports.flatMap(p => p.groups).map(f => f.value)
  ).map(a => {
    return { label: a, value: a }
  })

  const { register, handleSubmit, formState, control } = useForm<Port>({
    defaultValues: {
      description: props.entityToEdit?.description ?? '',
      name: props.entityToEdit?.name ?? '',
      encrypted: props.entityToEdit?.encrypted ?? [],
      number: props.entityToEdit?.number ?? '',
      groups: props.entityToEdit?.groups ?? []
    }
  })

  function submit (values) {
    const item: Port = {
      name: values.name,
      description: values.description,
      encrypted: values.encrypted,
      number: values.number,
      groups: values?.groups ?? [],
      id: props.entityToEdit?.id ?? shortUUID().generate()
    }
    dispatch(add(item))
    props.closeAction()
  }
  return (
    <Stack padding='20px' spacing={3}>
      <form onSubmit={handleSubmit(submit)}>
        <FormControl
          isInvalid={formState.errors.name !== undefined}
          paddingBottom='10px'
        >
          <Input
            padding='20px'
            placeholder='Port name'
            {...register('name', { required: true, minLength: 4 })}
          />
          <FormErrorMessage>
            {formState.errors.name && formState.errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={formState.errors.number !== undefined}
          paddingBottom='10px'
        >
          <Input
            type='number'
            placeholder='Port number'
            {...register('number', {
              required: true,
              valueAsNumber: true,
              min: 0,
              max: 65000
            })}
          />
          <FormErrorMessage>
            {formState.errors.number && formState.errors.number.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={formState.errors.description !== undefined}
          paddingBottom='10px'
        >
          <Input
            placeholder='Description'
            {...register('description', {
              required: false
            })}
          />

          <FormErrorMessage>
            {formState.errors.description &&
              formState.errors.description.message}
          </FormErrorMessage>
          <FormControl
            isInvalid={formState.errors.groups !== undefined}
            paddingBottom='10px'
          >
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <MultiSelect
                  options={groups}
                  value={value}
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
        </FormControl>

        <FormControl
          isInvalid={formState.errors.encrypted !== undefined}
          paddingBottom='10px'
        >
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Checkbox {...register('encrypted')}>Encrypted</Checkbox>
            )}
            name='encrypted'
          ></Controller>
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
