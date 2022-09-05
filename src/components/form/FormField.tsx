import { useFormikContext } from 'formik';
import { Factory, FormControl, Input, Stack, StyledProps } from 'native-base';
import React from 'react';

type Props<T extends Record<string, string>> = {
  isRequired?: boolean;
  name: keyof T;
  label: string;
  placeholder?: string;
  multiline?: boolean;
} & StyledProps;

export const FormField = Factory(
  <T extends Record<string, string>>({
    isRequired,
    name,
    label,
    placeholder,
    multiline,
    ...styledProps
  }: Props<T>) => {
    const { handleChange, handleBlur, getFieldMeta } = useFormikContext<T>();
    const { value, error } = getFieldMeta<T[keyof T]>(name as string);
    return (
      <FormControl isRequired={isRequired} isInvalid={!!error} {...styledProps}>
        <Stack>
          <FormControl.Label>{label}</FormControl.Label>
          <Input
            p={2}
            value={value}
            placeholder={placeholder}
            onChangeText={handleChange(name)}
            onBlur={handleBlur(name as string)}
            multiline={multiline}
            numberOfLines={3}
          />
          <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>
        </Stack>
      </FormControl>
    );
  },
);
