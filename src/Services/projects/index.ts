import { Role, Status } from "@/Utils/constant";
import { API } from "..";
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
    status: Status;
    groupIds: number[];
  };
}
export interface CreateProjectResponse extends GetProjectListItem {}

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
  status: Status;
  createdAt: string;
  updatedAt: string;
  groups: GroupCreateProject[];
  userGroups: UserGroup[];
}

export interface Project {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: Status;
  createdAt: string;
  updatedAt: string;
  groups: GroupCreateProject[];
  userGroups: UserGroup[];
  progress?: number;
}

export type GetProjectList = CreateProjectResponse[];
export interface EditProjectResponse extends GetProjectListItem {}
export interface GetProjectListItem {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: Status;
  createdAt: string;
  updatedAt: string;
  groups: Group[];
  userGroups: UserGroup[];
}

export interface Group {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  user_id_create: number;
  projectId: number;
}

export interface UserGroup {
  id: number;
  name: string;
}
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

export interface GetMemOfProjectRequest {
  projectId: number;
  token: string;
}

export type GetMemOfProjectResponse = Member[];
export interface Member {
  dateofbirth?: string 
  email: string
  id: number
  name: string
  role: Role
  updatedAt: string
}

export interface AddGroupToProjectRequest {
  projectId: number;
  token: string;
  data: {
    groupId: number;
  };
}

export interface DeleteGroupFromProjectRequest {
  projectId: number;
  groupId: number;
  token: string;
}

export interface DeleteGroupFromResponse extends GetProjectListItem {}
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
      GetProjectListResponse[] | ErrorResponse,
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
    editProject: build.mutation<
      EditProjectResponse | ErrorResponse,
      EditProjectRequest
    >({
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
    getMemOfProject: build.mutation<
      GetMemOfProjectResponse | ErrorResponse,
      GetMemOfProjectRequest
    >({
      query: (getMemOfProjectData) => ({
        url: `/projects/${getMemOfProjectData.projectId}/members`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${getMemOfProjectData.token}`,
        },
      }),
    }),
    // addGroupToProject: build.mutation<AddGroupToProjectResponse | ErrorResponse, AddGroupToProjectRequest>({
    //   query: (addGroupToProjectData) => ({
    //     url: `/projects/${addGroupToProjectData.projectId}/groups`,
    //     method: "POST",
    //     body: addGroupToProjectData.data,
    //     headers: {
    //       Authorization: `Bearer ${addGroupToProjectData.token}`,
    //     },
    //   }),
    // }),
    deleteGroupFromProject: build.mutation<
      DeleteGroupFromResponse | ErrorResponse,
      DeleteGroupFromProjectRequest
    >({
      query: (deleteGroupFromProjectData) => ({
        url: `/projects/${deleteGroupFromProjectData.projectId}/groups/${deleteGroupFromProjectData.groupId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${deleteGroupFromProjectData.token}`,
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
  useGetMemOfProjectMutation,
  useDeleteGroupFromProjectMutation,
} = projectApi;
