import { API } from "../base";
import { User } from "../group";
import { Task } from "../task";
import { UserSignUpInformation } from "../users";

// Base Response interfaces
export interface Response {
  data: Data;
  status: number;
}

export interface Data {
  error: string;
  message: string;
  statusCode: number;
}

// Error handling interfaces
export interface ErrorHandle {
  data: {
    error: string;
    message: string[];
    statusCode: number;
  };
  status: number;
}

export interface ErrorResponse {
  message: string;
  error?: string;
  statusCode: number;
}

// Document specific interfaces
export interface UploadFileResponse {
  task: Task;
  task_id: string;
  user: User;
  user_id: string;
  originalname: string;
  mimetype: string;
  destination: string;
  filename: string;
  size: number;
  id: string;
}

export interface UploadFileRequest {
  data: {
    file: any;
    task_id: number;
  };
  token: string;
}

export interface GetFileRequest {
  documentId: number;
  token: string;
}

export const getFormDataDocument = (request: UploadFileRequest): FormData => {
  const formData = new FormData();
  formData.append("file", request.data.file);
  formData.append("task_id", request.data.task_id.toString());
  return formData;
};
export interface GetListDocumentRequest {
  taskId: number;
  token: string;
}
export type GetListDocumentResponse = GetListDocumentResponseItem[]

export interface GetListDocumentResponseItem {
  id: number
  user: UserSignUpInformation
  filename: string
  createAt: string
}
export interface DeleteDocumentResponseError {
  response: Response
  status: number
  options: Options
  message: string
  name: string
}

export interface Response {
  message: string
  error: string
  statusCode: number
}

export interface Options {}
const documentApi = API.injectEndpoints({
  endpoints: (build) => ({
    uploadFile: build.mutation<
      UploadFileResponse | ErrorResponse,
      UploadFileRequest
    >({
      query: (request) => ({
        url: "/documents/upload",
        method: "POST",
        body: getFormDataDocument(request),
        headers: {
          Authorization: `Bearer ${request.token}`,
        },
      }),
    }),
    getFile: build.mutation<Blob | ErrorResponse, GetFileRequest>({
      query: (request) => ({
        url: `/documents/${request.documentId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${request.token}`,
          Accept: '*/*',
        },
        responseHandler: async (response) => {
          if (!response.ok) {
            try {
              const errorData = await response.json();
              return errorData as ErrorResponse;
            } catch (e) {
              const textContent = await response.text();
              return {
                message: textContent || 'Failed to download file',
                statusCode: response.status,
                error: 'Download Error'
              } as ErrorResponse;
            }
          }
    
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const jsonData = await response.json();
            return jsonData as ErrorResponse;
          }
    
          return response.blob();
        },
      }),
      transformErrorResponse: (response: any) => {
        if (response.status === 'PARSING_ERROR') {
          return {
            data: {
              message: 'File not found or no longer available',
              statusCode: 400,
              error: 'Download Error'
            }
          };
        }
        return response;
      },
    }),
    getListDocument: build.mutation<GetListDocumentResponse,  GetListDocumentRequest>({
      query: (request) => ({
        url:
          `/documents` + (request.taskId ? `?task_id=${request.taskId}` : ""),
        method: "GET",
        headers: {
          Authorization: `Bearer ${request.token}`,
        },
      }),
    }),
    deleteDocument: build.mutation<undefined | ErrorResponse | DeleteDocumentResponseError, { documentId: number; token: string }>({
      query: ({ documentId, token }) => ({
        url: `/documents/${documentId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useUploadFileMutation, useGetFileMutation, useGetListDocumentMutation, useDeleteDocumentMutation } = documentApi;
