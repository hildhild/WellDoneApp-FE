import React from 'react';
import LogIn from './LogIn';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/Navigation';
import { RootScreens } from '../..';
type LogInScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.LOGIN
>;
export const LogInContainer = ({
    navigation,
  }: LogInScreenNavigatorProps) => {
    const onNavigate = (screen: RootScreens) => {
      navigation.navigate(screen);
    };

    return <LogIn onNavigate = {onNavigate} />;
}