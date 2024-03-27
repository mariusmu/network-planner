import { Input } from '@chakra-ui/input'
import { Stack } from '@chakra-ui/layout'
import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage
} from '@chakra-ui/react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { MultiSelect } from 'chakra-multiselect'
import shortUUID from 'short-uuid'
import { Environment, add } from '../../reducers/environmentReducer'

export default function EnvironmentInput (props: {
  entityToEdit: Environment
  closeAction: () => void
}) {
  const dispatch = useDispatch()
  const { register, handleSubmit, formState, control } = useForm<Environment>({
    defaultValues: {
      description: props.entityToEdit?.description ?? '',
      name: props.entityToEdit?.name ?? ''
    }
  })

  function submit (values) {
    const item: Environment = {
      name: values.name,
      description: values.description,
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
            placeholder='Environment name'
            {...register('name', { required: true, minLength: 4 })}
          />
          <FormErrorMessage>
            {formState.errors.name && formState.errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={formState.errors.description !== undefined}
          paddingBottom='10px'
        >
          <Input
            placeholder='Description'
            {...register('description', {
              required: true
            })}
          />

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
