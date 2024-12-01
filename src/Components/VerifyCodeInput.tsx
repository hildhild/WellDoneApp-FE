import React, { FC, useRef } from "react";
import { TextInput, View } from "react-native";

interface VerifyCodeInputProps {
  code: string;
  setCode: (value: string) => void;
  onCodeComplete?: () => void;
}

const VerifyCodeInput: FC<VerifyCodeInputProps> = ({ code, setCode, onCodeComplete }) => {
  const inputRefs = useRef<Array<TextInput | null>>(new Array(6).fill(null));

  const handleChangeText = (value: string, index: number) => {
    const newCode = code.split("");
    newCode[index] = value;
    const newCodeString = newCode.join("");
    setCode(newCodeString);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newCodeString.length === 6 && onCodeComplete) {
      onCodeComplete();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View className="flex-row justify-between w-full max-w-xs mb-6">
      {new Array(6).fill("").map((_, index) => (
        <TextInput
          key={index}
          value={code[index] || ""}
          onChangeText={(value) => handleChangeText(value, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          maxLength={1}
          keyboardType="numeric"
          ref={(ref) => (inputRefs.current[index] = ref)}
          className="h-14 w-14 border-2 border-neutral-300 rounded-md text-center text-xl font-bold"
        />
      ))}
    </View>
  );
};

export default VerifyCodeInput;
