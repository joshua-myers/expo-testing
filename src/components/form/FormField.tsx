import { useFormikContext } from 'formik';
import { FormControl, Input, Stack } from 'native-base';
import React from 'react';

type Props<T extends Record<string, string>> = {
  isRequired?: boolean;
  name: keyof T;
  label: string;
  placeholder?: string;
};

export const FormField = <T extends Record<string, string>>({
  isRequired,
  name,
  label,
  placeholder,
}: Props<T>) => {
  const { handleChange, handleBlur, getFieldMeta } = useFormikContext<T>();
  const { value, error } = getFieldMeta<T[keyof T]>(name as string);
  return (
    <FormControl isRequired={isRequired} isInvalid={!!error}>
      <Stack>
        <FormControl.Label>{label}</FormControl.Label>
        <Input
          p={2}
          value={value}
          placeholder={placeholder}
          onChangeText={handleChange(name)}
          onBlur={handleBlur(name as string)}
        />
        <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>
      </Stack>
    </FormControl>
  );
};
