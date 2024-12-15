import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "@/Screens";
import {
  ErrorHandle,
  useResendVerifyEmailMutation,
  useVerifyEmailMutation,
} from "@/Services/users";
import { RootState } from "@/Store";
import { setUser } from "@/Store/reducers";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Verification from "./Verification";
import { Toast } from "toastify-react-native";
import {
  renderErrorMessageResponse,
  renderSuccessMessageResponse,
} from "@/Utils/Funtions/render";

type VerifyMailScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.VERIFY_MAIL
>;

const VerificationContainer: React.FC<VerifyMailScreenNavigatorProps> = ({
  navigation,
}) => {
  const [code, setCode] = useState("");
  const { email } = useSelector((state: RootState) => state.user);

  const [
    verifyEmail,
    {
      isLoading: isVerifyingLoading,
      isError: isVerifyingError,
      error: verifyError,
    },
  ] = useVerifyEmailMutation();
  const [
    resendVerifyEmail,
    {
      isLoading: isResendingLoading,
      isError: isResendingError,
      error: resendError,
    },
  ] = useResendVerifyEmailMutation();
  const dispatch = useDispatch();

  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };
  useEffect(() => {
    if (code.length === 6) {
      handleVerifyCode();
    }
  }, [code]);
  const handleVerifyCode = async () => {
    try {
      if (email) {
        const response = await verifyEmail({
          email,
          code,
        }).unwrap();
        if ("user" in response) {
          dispatch(setUser({ email: "" }));
          Toast.success(renderSuccessMessageResponse(response.message), "top");
          onNavigate(RootScreens.LOGIN);
        } else Toast.error(renderErrorMessageResponse(response.message), "top");
      }
    } catch (err) {
      if (err && typeof err === "object" && "data" in err) {
        const errorData = err as ErrorHandle;
        Toast.error(
          renderErrorMessageResponse(String(errorData.data.message)),
          "top"
        );
      }
    }
  };

  const handleResendCode = async () => {
    try {
      if (email) {
        const response = await resendVerifyEmail({
          email: email,
        }).unwrap();
        if ("verificationEmailSent" in response) {
          Toast.success(renderSuccessMessageResponse(response.message), "top");
        } else {
          Toast.error(renderErrorMessageResponse(response.message), "top");
        }
      }
    } catch (err) {
      if (err && typeof err === "object" && "data" in err) {
        const errorData = err as ErrorHandle;
        Toast.error(
          renderErrorMessageResponse(String(errorData.data.message)),
          "top"
        );
      }
    }
  };

  return (
    <Verification
      onNavigate={onNavigate}
      code={code}
      setCode={setCode}
      onSubmit={handleVerifyCode}
      isLoading={isVerifyingLoading || isResendingLoading}
      isError={isVerifyingError || isResendingError}
      error={verifyError || resendError}
      onResendCode={handleResendCode}
    />
  );
};

export default VerificationContainer;
