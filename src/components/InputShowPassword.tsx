import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputProps as ChakraInputProps,
  InputRightElement,
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction, useState } from "react";
import { FieldError } from "react-hook-form";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";

interface InputProps extends ChakraInputProps {
  idName: string;
  label?: string;
  error?: FieldError;
}

const InputBaseShowPassword: ForwardRefRenderFunction<
  HTMLInputElement,
  InputProps
> = ({ idName, label, error = null, color, ...rest }, ref) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <FormControl isInvalid={!!error} variant="floating">
      <InputGroup size="lg">
        <Input
          border="none"
          borderRadius="none"
          borderBottom="1px solid"
          borderBottomColor="gray.200"
          id={idName}
          name={idName}
          color="#FFFFFF"
          bg="transparent"
          size="lg"
          placeholder=" "
          variant="filled"
          type={isShowPassword ? "text" : "password"}
          css={{
            "::-ms-reveal": {
              display: "none",
            },
          }}
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

        <InputRightElement>
          <Icon
            fontSize={22}
            cursor="pointer"
            color={isShowPassword ? color : color}
            as={isShowPassword ? RiEyeLine : RiEyeCloseLine}
            onClick={handleShowPassword}
            onFocus={() => {}}
          />
        </InputRightElement>
      </InputGroup>

      {!!error && (
        <FormErrorMessage color="red.500" fontSize={13}>
          {error.message}{" "}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export const InputShowPassword = forwardRef(InputBaseShowPassword);
