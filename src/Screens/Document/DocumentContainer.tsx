import { RootStackParamList } from "@/Navigation";
import { ErrorHandle } from "@/Services";
import {
  DeleteDocumentResponseError,
  GetListDocumentResponse,
  useDeleteDocumentMutation,
  useGetFileMutation,
  useGetListDocumentMutation,
  useUploadFileMutation,
} from "@/Services/document";
import { RootState } from "@/Store";
import { renderErrorMessageResponse } from "@/Utils/Funtions/render";
import { getMimeType } from "@/Utils/Funtions/utils";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as IntentLauncher from "expo-intent-launcher";
import * as Sharing from "expo-sharing";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, Platform } from "react-native";
import { useSelector } from "react-redux";
import { Toast } from "toastify-react-native";
import { RootScreens } from "..";
import Document from "./Document";

type DocumentScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.DOCUMENT
>;

const DocumentContainer = ({ navigation }: DocumentScreenNavigatorProps) => {
  const [uploadFileApi, { isLoading: uploadLoading }] = useUploadFileMutation();
  const [getFileApi, { isLoading: getLoading }] = useGetFileMutation();
  const [getDocuments, { isLoading: isDocumentsLoading }] =
    useGetListDocumentMutation();
  const [deleteDocument, { isLoading: isDeleteLoading }] =
    useDeleteDocumentMutation();
  const [fileUpload, setFileUpload] = useState<any | null>(null);
  const [isUpload, setIsUpload] = useState<boolean>(false);
  const [documentList, setDocumentList] = useState<GetListDocumentResponse>([]);
  const [refreshing, setRefreshing] = useState(false);

  const accessToken = useSelector((state: RootState) => state.profile.token);
  const curTask = useSelector((state: RootState) => state.task.curTask);

  const downloadFile = useCallback(async (blob: Blob, filename: string) => {
    try {
      if (blob.size === 0) {
        throw new Error("Empty file received");
      }

      const reader = new FileReader();
      const base64 = await new Promise<string>((resolve, reject) => {
        reader.onloadend = () => {
          const base64data = reader.result?.toString().split(",")[1];
          if (!base64data) {
            reject(new Error("Failed to convert to base64"));
            return;
          }
          resolve(base64data);
        };
        reader.onerror = () => reject(new Error("Failed to read file"));
        reader.readAsDataURL(blob);
      });

      const cacheFilePath = `${FileSystem.cacheDirectory}${filename}`;

      try {
        const fileInfo = await FileSystem.getInfoAsync(cacheFilePath);
        if (fileInfo.exists) {
          await FileSystem.deleteAsync(cacheFilePath);
        }
      } catch (e) {
        console.log("No existing file to clean up");
      }

      await FileSystem.writeAsStringAsync(cacheFilePath, base64, {
        encoding: FileSystem.EncodingType.Base64,
      });

      if (Platform.OS === "android") {
        const contentUri = await FileSystem.getContentUriAsync(cacheFilePath);
        await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
          data: contentUri,
          flags: 1,
          type: blob.type || getMimeType(filename),
        });
        Toast.success("File downloaded successfully");
      } else {
        await Sharing.shareAsync(cacheFilePath, {
          mimeType: blob.type || getMimeType(filename),
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
      Toast.error(
        error instanceof Error ? error.message : "Failed to save file"
      );
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
          await downloadFile(response, `file_${documentID}`);
        } else {
          const errorMessage =
            response.message || "File not found or no longer available";
          Toast.error(errorMessage);
        }
      } catch (err) {
        console.error("Download error:", err);
        if (err && typeof err === "object" && "data" in err) {
          const errorData = err as ErrorHandle;
          const message = Array.isArray(errorData.data.message)
            ? errorData.data.message[0]
            : errorData.data.message;
          Toast.error(message);
        }
        Toast.error("Failed to download file");
      }
    },
    [accessToken, downloadFile]
  );

  const handleUploadFile = useCallback(async () => {
    if (!fileUpload) {
      Toast.error("Please upload a file");
      return;
    }

    if (!curTask) {
      Toast.error("No task selected");
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
  }, [accessToken, curTask?.id, fileUpload, uploadFileApi]);

  const fetchDocuments = useCallback(async () => {
    try {
      if (!curTask) {
        Toast.error("No task selected");
        return;
      }
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
  }, [accessToken, curTask?.id, getDocuments]);

  const handleDeleteFile = useCallback(
    async (documentID: number) => {
      try {
        const response = await deleteDocument({
          documentId: documentID,
          token: accessToken,
        }).unwrap();
        if (response && "data" in response && response.data === null) {
          Toast.success("Xóa tài liệu thành công");
        }
      } catch (err) {
        console.error("Delete document error:", err);
        if (err && typeof err === "object" && "data" in err) {
          const errorData = err as unknown as DeleteDocumentResponseError;
          Toast.error(
            Array.isArray(errorData.message)
              ? renderErrorMessageResponse(errorData.message[0])
              : renderErrorMessageResponse(errorData.message)
          );
        }
      }
    },
    [accessToken, deleteDocument]
  );

  const handleDelete = (documentId: number) => {
    Alert.alert(
      "Xóa Tài liệu!",
      "Bạn có chắc chắn muốn xóa tài liệu này?",
      [
        { text: "Hủy", style: "cancel" },
        { text: "OK", onPress: () => handleDeleteFile(documentId) },
      ],
      { cancelable: false }
    );
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchDocuments();
    setRefreshing(false);
  }, [fetchDocuments]);

  useEffect(() => {
    fetchDocuments();
  }, [curTask?.id]);

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
      onDeleteFile={(documentID: number) => handleDelete(documentID)}
      isDeleteLoading={isDeleteLoading}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
};

export default React.memo(DocumentContainer);
