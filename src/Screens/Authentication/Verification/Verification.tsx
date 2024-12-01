import { RootScreens } from "@/Screens";
import { Response } from "@/Services";
import { getErrorMessage } from "@/Utils/Funtions/render";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

interface VerificationProps {
  onNavigate: (screen: RootScreens) => void;
  code: string;
  setCode: (value: string) => void;
  onSubmit: () => void;
  onResendCode: () => void; 
  isLoading: boolean;
  isError: boolean;
  error: FetchBaseQueryError | SerializedError | Response | undefined;
}

const Verification: React.FC<VerificationProps> = ({
  code,
  setCode,
  onSubmit,
  onResendCode,
  isLoading,
  isError,
  error,
}) => {
  return (
    <View className="flex-1 justify-center items-center bg-white p-6">
      <Text className="text-center text-neutral-900 text-lg font-bold mb-6">Verify Your Code</Text>
      <Text className="text-center text-neutral-600 mb-6">Enter the 6-digit verification code sent to your email.</Text>

      <View className="flex-row justify-between w-full max-w-xs mb-6">
        {new Array(6).fill("").map((_, index) => (
          <TextInput
            key={index}
            value={code[index] || ""}
            onChangeText={(value) => {
              const newCode = code.split("");
              newCode[index] = value;
              setCode(newCode.join(""));
            }}
            maxLength={1}
            keyboardType="numeric"
            className="h-14 w-14 border-2 border-neutral-300 rounded-md text-center text-xl font-bold"
          />
        ))}
      </View>

      <TouchableOpacity
        onPress={onSubmit}
        className="bg-primary-600 py-3 px-10 rounded-md mb-4"
        disabled={code.length !== 6 || isLoading}
      >
        <Text className="text-white text-lg font-bold text-center">
          {isLoading ? "Loading..." : "Verify Code"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onResendCode} 
        className="mt-4"
      >
        <Text className="text-primary-600 text-sm">Gửi lại Code</Text>
      </TouchableOpacity>

      {isError && (
        <Text className="text-danger-400 mt-4 text-sm">{getErrorMessage(error)}</Text>
      )}
    </View>
  );
};

export default Verification;
