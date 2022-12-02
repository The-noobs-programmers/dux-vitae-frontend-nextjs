import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select as SelectChakra,
  SelectProps as ChakraSelectProps,
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";

interface SelectProps extends ChakraSelectProps {
  idName: string;
  label?: string;
  error?: FieldError;
  color?: string;
  value?: string;
}

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
  { idName, label, error = null, color, value, ...rest },
  ref
) => (
  <FormControl isInvalid={!!error} top="-14px">
    {!!label && (
      <FormLabel htmlFor={idName} color="#a2a2a2" fontSize="0.9rem" pl="15px">
        {label}
      </FormLabel>
    )}

    <SelectChakra
      border="1px solid"
      borderColor="gray.500"
      id={idName}
      name={idName}
      size="sm"
      color="#dadada"
      bg="whiteAlpha.100"
      ref={ref}
      {...rest}
    ></SelectChakra>

    {!!error && (
      <FormErrorMessage color="red.500">{error.message} </FormErrorMessage>
    )}
  </FormControl>
);

export const Select = forwardRef(SelectBase);
