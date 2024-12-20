import { ProjectEditForm } from "@/Screens/Project/ProjectEdit/ProjectEditContainer";
import { API } from "..";
import { DocumentType, Priority, Status } from "@/Utils/constant";

export interface CheckRoleRequest {
  user_token: string;
  project_id: string;
}

export interface GetGroupsResponse {
  id: string;
  name: string;
}
export interface EditProjectRequest extends ProjectEditForm {}

export interface GetDetailProjectResponse extends IProjectDetail {}

export interface GetProjectListRequest {
  userId: string;
  searchProjectNameQuery?: string;
}
export interface GetDetailProjectRequest {
  projectId: string;
  getRecentProject?: boolean;
}
export type IProjectList = IProjectListItem[];

export interface IProjectListItem {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  status: Status;
  description: string;
  progress: number;
  sum_hours_until_now: number;
  members: ProjectMember[];
}

export type GetProjectListResponse = IProjectList;
export interface IProjectDetail {
  id: string;
  name: string;
  groups: ProjectGroups[];
  description: string;
  documents: ProjectDocument[];
  tasks: ProjectTask[];
  status: Status;
  sum_hours: number;
  start_date: string;
  end_date: string;
  progress: number;
}
export interface ProjectGroups {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  user: ProjectMember[];
}
export interface ProjectMember {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface ProjectDocument {
  id: string;
  name: string;
  type: DocumentType;
  url: string;
}

export interface ProjectTask {
  id: string;
  name: string;
  priority: Priority;
  status: Status;
  task_code: string;
  members: TaskMember[];
  sum_hours: number;
}

export interface TaskMember extends ProjectMember {}

const projectApi = API.injectEndpoints({
  endpoints: (build) => ({
    getProjectList: build.mutation<
      GetProjectListResponse,
      GetProjectListRequest
    >({
      query: (projectListData) => ({
        url: "/projects/",
        method: "POST",
        body: projectListData,
      }),
    }),
    getDetailProject: build.mutation<
      GetDetailProjectResponse,
      GetDetailProjectRequest
    >({
      query: (detailProjectData) => ({
        url: "/projects/project/",
        method: "POST",
        body: detailProjectData,
      }),
    }),
    deleteProject: build.mutation<boolean, string>({
      query: (projectId) => ({
        url: "/projects/" + projectId,
        method: "DELETE",
      }),
    }),
    editProject: build.mutation<boolean, EditProjectRequest>({
      query: (projectData) => ({
        url: "/projects/",
        method: "PUT",
        body: projectData,
      }),
    }),
  }),
});

export const {
  useGetDetailProjectMutation,
  useGetProjectListMutation,
  useDeleteProjectMutation,
  useEditProjectMutation,
} = projectApi;
