import { RootStackParamList } from '@/Navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { memo } from 'react';
import { RootScreens } from '../../';
import ResetPassword from './ResetPassword';

type ResetPasswordScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.RESET_PASSWORD
>;
export interface ResetPasswordForm {
    password: string;
}

const ResetPasswordContainer = ({
    navigation,
  }: ResetPasswordScreenNavigatorProps) => {

    const handleResetPassword = (formData: ResetPasswordForm) => {
      console.log("Received form data in ResetPasswordContainer:", formData);
      navigation.navigate(RootScreens.LOGIN);
    };

    const onNavigate = (screen: RootScreens) => {
      navigation.navigate(screen);
    };

    return <ResetPassword onNavigate = {onNavigate} onResetPassword={handleResetPassword} />;
}

export default memo(ResetPasswordContainer);
