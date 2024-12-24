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
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";
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
      const mimeType = "application/pdf";
      const cacheFilePath = `${FileSystem.documentDirectory}${filename}`;
      await FileSystem.writeAsStringAsync(cacheFilePath, base64, {
        encoding: FileSystem.EncodingType.Base64,
      });

      if (Platform.OS === "android") {
        const permissions =
          await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
        if (permissions.granted) {
          try {
            const base64Data = await FileSystem.readAsStringAsync(
              cacheFilePath,
              { encoding: FileSystem.EncodingType.Base64 }
            );
            const fileUri =
              await FileSystem.StorageAccessFramework.createFileAsync(
                permissions.directoryUri,
                filename,
                mimeType
              );
            await FileSystem.writeAsStringAsync(fileUri, base64Data, {
              encoding: FileSystem.EncodingType.Base64,
            });
            Toast.success("Lưu tài liệu thành công");
          } catch (error) {
            console.error("Error saving file on Android:", error);
            Toast.error("Failed to save file");
          }
        } else {
          await shareAsync(cacheFilePath, {
            mimeType: mimeType,
            dialogTitle: "Save your file",
            UTI: "public.item",
          });
        }
      } else {
        await shareAsync(cacheFilePath, {
          mimeType: mimeType,
          dialogTitle: "Save your file",
          UTI: "public.item",
        });
      }

      setTimeout(async () => {
        try {
          await FileSystem.deleteAsync(cacheFilePath);
        } catch (error) {
          Toast.error("Dọn dẹp bộ nhớ thất bại");
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
        const validTypes = ["application/pdf"];

        if (file.mimeType && !validTypes.includes(file.mimeType)) {
          Toast.error("Chỉ hỗ trợ tài liệu PDF");
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
          await downloadFile(response, `file_${documentID}.pdf`);
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
      Toast.error("Hãy chọn tài liệu cần tải lên");
      return;
    }

    if (!curTask) {
      Toast.error("Không tìm thấy nhiệm vụ!");
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
