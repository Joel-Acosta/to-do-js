import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/react'
import { Field, useField } from 'formik'



const TextField = ({ label, ...props }) => {

    const [field, meta] = useField(props)
    const alert = meta.error && meta.touched || false
    return (
        <FormControl isInvalid={alert}>
            <FormLabel>{label}</FormLabel>
            <Field as={Input} {...field} {...props} />
            <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
    )
}

export default TextField