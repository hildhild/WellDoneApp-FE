import { RootStackParamList } from '@/Navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { RootScreens } from '../..';
import LogIn from './LogIn';

export interface LogInForm {
  username: string;
  password: string;
}

type LogInScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.LOGIN
>;
export const LogInContainer = ({
    navigation,
  }: LogInScreenNavigatorProps) => {

    const handleLogIn = (formData: LogInForm) => {
      console.log("Received form data in LogInContainer:", formData);
      navigation.navigate(RootScreens.MAIN);
    };

    const onNavigate = (screen: RootScreens) => {
      navigation.navigate(screen);
    };

    return <LogIn onNavigate = {onNavigate} onLogIn={handleLogIn} />;
}