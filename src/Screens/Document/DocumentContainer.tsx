import { RootStackParamList } from '@/Navigation';
import { ErrorHandle } from '@/Services';
import { useGetFileMutation, useUploadFileMutation } from '@/Services/document';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Toast } from 'toastify-react-native';
import { RootScreens } from '..';
import { Document } from './Document';

type DocumentScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.DOCUMENT
>;

export const DocumentContainer = ({ navigation }: DocumentScreenNavigatorProps) => {
  const [uploadFileApi, { isLoading: uploadLoading }] = useUploadFileMutation();
  const [getFileApi, { isLoading: getLoading }] = useGetFileMutation();
  const [fileUpload, setFileUpload] = useState<any | null>(null);
  const [isUpload, setIsUpload] = useState<boolean>(false);
  
  const accessToken = useSelector((state: any) => state.profile.token);
  const curTask = useSelector((state: any) => state.task.curTask);

  const downloadBlob = async (blob: Blob, filename: string) => {
    try {
      const documentDir = `${FileSystem.documentDirectory}Documents`;
      const fileUriExternal = `${documentDir}/${filename}`;

      const dirInfo = await FileSystem.getInfoAsync(documentDir);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(documentDir);
      }

      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result?.toString().split(',')[1];
        if (base64) {
          await FileSystem.writeAsStringAsync(fileUriExternal, base64, {
            encoding: FileSystem.EncodingType.Base64,
          });

          if (await Sharing.isAvailableAsync()) {
            await Sharing.shareAsync(fileUriExternal);
          }
        }
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error('Error downloading file:', error);
      Toast.error('Failed to download file');
    }
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        const file = result.assets[0];
        const validTypes = ['application/pdf', 'application/docs', 'application/txt'];
        
        if (file.mimeType && !validTypes.includes(file.mimeType)) {
          Toast.error('Only PDF, TXT and DOCS files are accepted');
          return;
        }
        
        setFileUpload(file);
      }
    } catch (error) {
      Toast.error('Please upload a file');
    }
  };

  const handleUploadFile = async () => {
    if (!fileUpload) {
      Toast.error('Please upload a file');
      return;
    }

    try {
      const response = await uploadFileApi({
        data: {
          file: {
            uri: fileUpload.uri,
            name: fileUpload.name,
            type: fileUpload.mimeType,
          },
          task_id: curTask.id,
        },
        token: accessToken,
      }).unwrap();

      if ('id' in response) {
        Toast.success(`Upload successful ${response.id}`);
        setIsUpload(false);
      }
    } catch (err) {
      if (err && typeof err === 'object' && 'data' in err) {
        const errorData = err as ErrorHandle;
        Toast.error(String(errorData.data.message));
      }
    }
  };

  const handleGetFile = async () => {
    try {
      const response = await getFileApi({
        documentId: 29,
        token: accessToken,
      }).unwrap();

      if (response instanceof Blob) {
        await downloadBlob(response, 'file.pdf');
        Toast.success('Download successful');
      }
    } catch (err) {
      if (err && typeof err === 'object' && 'data' in err) {
        const errorData = err as ErrorHandle;
        Toast.error(String(errorData.data.message));
      }
    }
  };

  return (
    <Document
      isUpload={isUpload}
      setIsUpload={setIsUpload}
      fileUpload={fileUpload}
      setFileUpload={setFileUpload}
      isLoading={uploadLoading || getLoading}
      onPickDocument={pickDocument}
      onUploadFile={handleUploadFile}
      onGetFile={handleGetFile}
      onNavigateBack={() => navigation.goBack()}
    />
  );
};