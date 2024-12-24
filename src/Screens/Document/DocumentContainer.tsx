import { RootStackParamList } from "@/Navigation";
import { ErrorHandle } from "@/Services";
import {
  useGetFileMutation,
  useGetListDocumentMutation,
  useUploadFileMutation,
} from "@/Services/document";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as IntentLauncher from "expo-intent-launcher";
import * as Sharing from "expo-sharing";
import React, { useEffect, useState, useCallback } from "react";
import { Platform } from "react-native";
import { useSelector } from "react-redux";
import { Toast } from "toastify-react-native";
import { RootScreens } from "..";
import Document from "./Document";
import { getMimeType } from "@/Utils/Funtions/utils";

type DocumentScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.DOCUMENT
>;

const DocumentContainer = ({ navigation }: DocumentScreenNavigatorProps) => {
  const [uploadFileApi, { isLoading: uploadLoading }] = useUploadFileMutation();
  const [getFileApi, { isLoading: getLoading }] = useGetFileMutation();
  const [getDocuments, { isLoading: isDocumentsLoading }] =
    useGetListDocumentMutation();
  const [fileUpload, setFileUpload] = useState<any | null>(null);
  const [isUpload, setIsUpload] = useState<boolean>(false);
  const [documentList, setDocumentList] = useState<any[]>([]);

  const accessToken = useSelector((state: any) => state.profile.token);
  const curTask = useSelector((state: any) => state.task.curTask);

  const downloadFile = useCallback(async (blob: Blob, filename: string) => {
    try {
      const reader = new FileReader();
      const base64 = await new Promise<string>((resolve, reject) => {
        reader.onloadend = () => {
          const base64data = reader.result?.toString().split(",")[1];
          base64data
            ? resolve(base64data)
            : reject("Failed to convert to base64");
        };
        reader.onerror = () => reject("Failed to read file");
        reader.readAsDataURL(blob);
      });

      const cacheFilePath = `${FileSystem.cacheDirectory}${filename}`;
      await FileSystem.writeAsStringAsync(cacheFilePath, base64, {
        encoding: FileSystem.EncodingType.Base64,
      });

      if (Platform.OS === "android") {
        const contentUri = await FileSystem.getContentUriAsync(cacheFilePath);
        await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
          data: contentUri,
          flags: 1,
          type: getMimeType(filename),
        });

        Toast.success("File downloaded successfully");
      } else {
        await Sharing.shareAsync(cacheFilePath, {
          mimeType: getMimeType(filename),
          dialogTitle: "Save your file",
          UTI: "public.item",
        });
      }
      setTimeout(async () => {
        try {
          await FileSystem.deleteAsync(cacheFilePath);
        } catch (error) {
          console.log("Error cleaning up cache file:", error);
        }
      }, 1000);
    } catch (error) {
      console.error("Download failed:", error);
      Toast.error("Failed to save file");
    }
  }, []);

  const pickDocument = useCallback(async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        const file = result.assets[0];
        const validTypes = [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "text/plain",
        ];

        if (file.mimeType && !validTypes.includes(file.mimeType)) {
          Toast.error("Only PDF, DOC, and TXT files are accepted");
          return;
        }

        setFileUpload(file);
      }
    } catch (error) {
      Toast.error("Please upload a file");
    }
  }, []);
  const handleGetFile = useCallback(
    async (documentID: number) => {
      try {
        const response = await getFileApi({
          documentId: documentID,
          token: accessToken,
        }).unwrap();

        if (response instanceof Blob) {
          await downloadFile(response, "downloaded_file.pdf");
        } else {
          Toast.error(response.message || "Failed to download file");
        }
      } catch (err) {
        console.error("Download error:", err);
        if (err && typeof err === "object" && "data" in err) {
          const errorData = err as ErrorHandle;
          Toast.error(
            Array.isArray(errorData.data.message)
              ? errorData.data.message[0]
              : errorData.data.message
          );
        } else {
          Toast.error("Failed to download file");
        }
      }
    },
    [accessToken, downloadFile]
  );

  const handleUploadFile = useCallback(async () => {
    if (!fileUpload) {
      Toast.error("Please upload a file");
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

      if ("id" in response) {
        Toast.success(`Upload successful ${response.id}`);
        setIsUpload(false);
        setFileUpload(null);
      } else {
        Toast.error(response.message);
      }
    } catch (err) {
      if (err && typeof err === "object" && "data" in err) {
        const errorData = err as ErrorHandle;
        Toast.error(
          Array.isArray(errorData.data.message)
            ? errorData.data.message[0]
            : errorData.data.message
        );
      }
    }
  }, [accessToken, curTask.id, fileUpload, uploadFileApi]);

  const fetchDocuments = useCallback(async () => {
    try {
      const response = await getDocuments({
        taskId: curTask.id,
        token: accessToken,
      }).unwrap();
      if (Array.isArray(response)) {
        setDocumentList(response);
      }
    } catch (err) {
      console.error("Fetch documents error:", err);
      if (err && typeof err === "object" && "data" in err) {
        const errorData = err as ErrorHandle;
        Toast.error(
          Array.isArray(errorData.data.message)
            ? errorData.data.message[0]
            : errorData.data.message
        );
      }
    }
  }, [accessToken, curTask.id, getDocuments]);

  useEffect(() => {
    fetchDocuments();
  }, [curTask.id]);

  return (
    <Document
      isDocumentloading={isDocumentsLoading}
      documentList={documentList}
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

export default React.memo(DocumentContainer);
