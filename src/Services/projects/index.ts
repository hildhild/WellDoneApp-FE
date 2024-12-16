import { API } from "..";

export interface GetDetailProjectResponse extends ProjectDetail {}
export interface GetDetailProjectRequest {
  projectId: number;
  getRecentProject?: boolean;
}
export interface ProjectDetail {
  id: number;
  name: string;
  members: ProjectMember[];
  description: string;
  documents: ProjectDocument[];
  tasks: ProjectTask[];
}

export interface ProjectMember {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

export interface ProjectDocument {
  id: number;
  name: string;
  type: string;
  url: string;
}

export interface ProjectTask {
  id: number;
  name: string;
  priority: string;
  status: string;
  task_code: string;
  members: TaskMember[];
  description: string;
  task_diary: TaskDiary;
  comments: TaskComment[];
}

export interface TaskMember extends ProjectMember {}

export interface TaskDiary {
  created_at: string;
  last_accessed: string;
}

export interface TaskComment {
  id: number;
  message: string;
  poster_id: number;
  poster_name: string;
  created_at: string;
  replies: TaskCommentReply[];
}

export interface TaskCommentReply {
  id: number;
  message: string;
  poster_id: number;
  poster_name: string;
  created_at: string;
}

const projectApi = API.injectEndpoints({
  endpoints: (build) => ({
    getDetailProject: build.mutation<
      GetDetailProjectResponse,
      GetDetailProjectRequest
    >({
      query: (detailProjectData) => ({
        url: "/projects/",
        method: "POST",
        body: detailProjectData,
      }),
    }),
  }),
});

export const { useGetDetailProjectMutation } = projectApi;
