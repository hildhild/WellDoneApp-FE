import { API } from "../base";
import { User } from "../group";
import { Task } from "../task";

export interface Response {
  data: Data
  status: number
}

export interface Data {
  error: string
  message: string
  statusCode: number
}
////

export interface ErrorHandle {
  data: {
    error: string;             
    message: string[];           
    statusCode: number;        
  };
  status: number;   
}

export interface ErrorResponse{
  message: string 
  error?: string
  statusCode: number
}

export interface UploadFileResponse {
  task: Task,
  task_id: string,
  user: User,
  user_id: string,
  originalname: string,
  mimetype: string,
  destination: string,
  filename: string,
  size: number,
  id: string
}

export interface UploadFileRequest {
  data: {
    file: File,
    task_id: number,
  },
  token: string
}

export const getFormDataDocument = (request: UploadFileRequest): FormData => {
  const formData = new FormData();
  formData.append('file', request.data.file);
  formData.append('task_id', request.data.task_id.toString());
  console.log(formData);
  return formData;
};

const documentApi = API.injectEndpoints({
  endpoints: (build) => ({
    uploadFile: build.mutation<UploadFileResponse | ErrorResponse, UploadFileRequest>({
      query: (request) => ({
        url: "/documents/upload",
        method: "POST",
        body: getFormDataDocument(request),
        headers: {
          Authorization: `Bearer ${request.token}`,
        },
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useUploadFileMutation,
} = documentApi;
