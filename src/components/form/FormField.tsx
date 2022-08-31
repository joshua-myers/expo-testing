import { useFormikContext } from 'formik';
import { FormControl, Input, Stack } from 'native-base';
import React from 'react';

type Props<T extends Record<string, string>> = {
  isRequired?: boolean;
  name: keyof T;
  label: string;
};

export const FormField = <T extends Record<string, string>>({
  isRequired,
  name,
  label,
}: Props<T>) => {
  const { handleChange, handleBlur, errors, values } = useFormikContext<T>();
  return (
    <FormControl isRequired={isRequired} isInvalid={!!errors?.[name]}>
      <Stack mx={4}>
        <FormControl.Label>{label}</FormControl.Label>
        <Input
          p={2}
          value={values[name]}
          placeholder='Author Name'
          onChangeText={handleChange(name)}
          onBlur={handleBlur(name as string)}
        />
        <FormControl.ErrorMessage>Error</FormControl.ErrorMessage>
      </Stack>
    </FormControl>
  );
};
