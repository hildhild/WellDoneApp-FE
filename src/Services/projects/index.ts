import { ProjectEditForm } from "@/Screens/Project/ProjectEdit/ProjectEditContainer";
import { API } from "..";
import { DocumentType, Priority, Status } from "@/Utils/constant";
import { Group } from "../group";
import { ErrorResponse } from "../profile";

export interface UserGroup {
  id: number;
  name: string;
}

export interface CreateProjectRequest {
  token: string;
  data: {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    status: string;
    groups: number[];
  };
}
export interface CreateProjectResponse {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  groups: GroupCreateProject[];
  progress?: number;
}

export interface GroupCreateProject {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  user_id_create: number;
  projectId: number;
}

export interface GetProjectListRequest {
  token: string;
  searchProjectNameQuery?: string;
  groupIdQuery?: string;
}

export interface GetProjectListResponse {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  groups: GroupCreateProject[];
  userGroups: UserGroup [];
  progress?: number;
}

export type GetProjectList = CreateProjectResponse[];

export interface GetDetailProjectRequest {
  projectId: number;
  token: string;
}

export interface GetDetailProjectResponse extends CreateProjectResponse {}
export interface EditProjectRequest extends CreateProjectRequest {
  id: number;
}

export interface DeleteProjectRequest {
  projectId: number;
  token: string;
}
const projectApi = API.injectEndpoints({
  endpoints: (build) => ({
    createProject: build.mutation<
      CreateProjectResponse | ErrorResponse,
      CreateProjectRequest
    >({
      query: (createProjectData) => ({
        url: "/projects",
        method: "POST",
        headers: {
          Authorization: `Bearer ${createProjectData.token}`,
        },
        body: createProjectData.data,
      }),
    }),
    getProjectList: build.mutation<
      GetProjectListResponse | ErrorResponse,
      GetProjectListRequest
    >({
      query: (projectListData) => ({
        url:
          "/projects" +
          (projectListData.searchProjectNameQuery
            ? `?search=${projectListData.searchProjectNameQuery}`
            : "") +
          (projectListData.groupIdQuery
            ? `?group_id=${projectListData.groupIdQuery}`
            : ""),
        method: "GET",
        headers: {
          Authorization: `Bearer ${projectListData.token}`,
        },
      }),
    }),
    getDetailProject: build.mutation<
      GetDetailProjectResponse | ErrorResponse,
      GetDetailProjectRequest
    >({
      query: (getDetailProjectData) => ({
        url: "/projects/" + getDetailProjectData.projectId,
        method: "GET",
        headers: {
          Authorization: `Bearer ${getDetailProjectData.token}`,
        },
      }),
    }),
    editProject: build.mutation<boolean, EditProjectRequest>({
      query: (editProjectData) => ({
        url: "/projects/" + editProjectData.id,
        method: "PATCH",
        body: editProjectData.data,
        headers: {
          Authorization: `Bearer ${editProjectData.token}`,
        },
      }),
    }),
    deleteProject: build.mutation<
      undefined | ErrorResponse,
      DeleteProjectRequest
    >({
      query: (deleteProjectData) => ({
        url: "/projects/" + deleteProjectData.projectId,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${deleteProjectData.token}`,
        },
      }),
    }),
  }),
});

export const {
  useGetDetailProjectMutation,
  useGetProjectListMutation,
  useDeleteProjectMutation,
  useEditProjectMutation,
  useCreateProjectMutation,
} = projectApi;
