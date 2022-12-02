import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends ChakraInputProps {
  idName: string;
  label?: string;
  error?: FieldError;
  color?: string;
  value?: string;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { idName, label, error = null, color, value, ...rest },
  ref
) => (
  <FormControl isInvalid={!!error} variant="floating">
    <ChakraInput
      border="none"
      borderRadius="none"
      borderBottom="1px solid"
      borderBottomColor="gray.200"
      id={idName}
      name={idName}
      color="#dadada"
      bg="transparent"
      size="lg"
      placeholder=" "
      variant="filled"
      _focus={{
        boxShadow: "none",
      }}
      _hover={{
        bg: "transparent",
        opacity: 0.8,
      }}
      ref={ref}
      {...rest}
    />
    {!!label && <FormLabel color="#E0E0E0">{label}</FormLabel>}

    {!!error && (
      <FormErrorMessage color="red.500">{error.message} </FormErrorMessage>
    )}
  </FormControl>
);

export const Input = forwardRef(InputBase);
