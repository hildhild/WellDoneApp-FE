import { NotificationItem, NotificationList } from "@/Services/notification";

export const EMAIL_PATTERN = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export const PASSWORD_PATTERN =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,}$/;
// Password must contain
//   one digit from 1 to 9,
//   one lowercase letter,
//   one uppercase letter,
//   one special character,
//   no space,
//   and it must be at least 6 characters long

export const StatusType = {
  COMPLETED: "COMPLETED",
  IN_PROGRESS: "IN_PROGRESS",
  NOT_STARTED: "NOT_STARTED",
};

export type Status =  "NOT_STARTED" | "IN_PROGRESS" | "ON_HOLD" | "COMPLETED" | "CANCELLED" ;
export type DocumentType =
  | "csv"
  | "doc"
  | "docx"
  | "pdf"
  | "png"
  | "ppt"
  | "pptx"
  | "xls"
  | "xlsx"
  | "zip"
  | "jpg";
export type Priority = "High" | "Medium" | "Low";

// export const dataa: IProjectDetail = {
//   id: "001",
//   name: "Project Phoenix",
//   groups: [
//     {
//       id: 21,
//       role: "Leader",
//       name: "Backend",
//       description: "Hello, this is the description",
//       createdAt: "2024-12-20T15:30:53.089Z",
//       updatedAt: "2024-12-20T15:30:53.089Z",
//       user: [
//         {
//           id: 8,
//           name: " Tt",
//           dateofbirth: null,
//           email: "lsjenny1710+1@gmail.com",
//           password:
//             "$2b$10$kZSPFAogfTWrkmY4GzhLo.KKzt4os5Mqw5fSPyS1KmJUEnZD9HT/S",
//           group_id: null,
//           joined_at: null,
//           role: null,
//           createdAt: "2024-12-15T13:34:41.588Z",
//           updatedAt: "2024-12-15T14:01:52.380Z",
//           isActive: true,
//           isEmailVerified: true,
//           verificationCode: null,
//           verificationCodeExpiresAt: null,
//           status: "OFFLINE",
//           passwordResetCode: null,
//           passwordResetCodeExpiresAt: null,
//         },
//       ],
//     },
//     {
//       id: 22,
//       role: "Leader",
//       name: "Backend",
//       description: "Hello, this is the description",
//       createdAt: "2024-12-20T15:33:05.612Z",
//       updatedAt: "2024-12-20T15:33:05.612Z",
//       user: [
//         {
//           id: 8,
//           name: " Tt",
//           dateofbirth: null,
//           email: "lsjenny1710+1@gmail.com",
//           password:
//             "$2b$10$kZSPFAogfTWrkmY4GzhLo.KKzt4os5Mqw5fSPyS1KmJUEnZD9HT/S",
//           group_id: null,
//           joined_at: null,
//           role: null,
//           createdAt: "2024-12-15T13:34:41.588Z",
//           updatedAt: "2024-12-15T14:01:52.380Z",
//           isActive: true,
//           isEmailVerified: true,
//           verificationCode: null,
//           verificationCodeExpiresAt: null,
//           status: "OFFLINE",
//           passwordResetCode: null,
//           passwordResetCodeExpiresAt: null,
//         },
//       ],
//     },
//     {
//       id: 24,
//       role: "Leader",
//       name: "Backend",
//       description: "Hello, this is the description",
//       createdAt: "2024-12-20T15:34:38.485Z",
//       updatedAt: "2024-12-20T15:34:38.485Z",
//       user: [
//         {
//           id: 8,
//           name: " Tt",
//           dateofbirth: null,
//           email: "lsjenny1710+1@gmail.com",
//           password:
//             "$2b$10$kZSPFAogfTWrkmY4GzhLo.KKzt4os5Mqw5fSPyS1KmJUEnZD9HT/S",
//           group_id: null,
//           joined_at: null,
//           role: null,
//           createdAt: "2024-12-15T13:34:41.588Z",
//           updatedAt: "2024-12-15T14:01:52.380Z",
//           isActive: true,
//           isEmailVerified: true,
//           verificationCode: null,
//           verificationCodeExpiresAt: null,
//           status: "OFFLINE",
//           passwordResetCode: null,
//           passwordResetCodeExpiresAt: null,
//         },
//         {
//           id: 2,
//           name: "Thi ne",
//           dateofbirth: null,
//           email: "lsjenny1710+200@gmail.com",
//           password:
//             "$2b$10$2RTzkFRVwu4tL9.Thr6KJOEE1JECkYfe8mFcKQJ4IVeMWL.ggMqoi",
//           group_id: null,
//           joined_at: null,
//           role: null,
//           createdAt: "2024-12-15T10:55:32.299Z",
//           updatedAt: "2024-12-15T10:55:47.804Z",
//           isActive: true,
//           isEmailVerified: true,
//           verificationCode: null,
//           verificationCodeExpiresAt: null,
//           status: "OFFLINE",
//           passwordResetCode: null,
//           passwordResetCodeExpiresAt: null,
//         },
//         {
//           id: 3,
//           name: "Thi thi thi",
//           dateofbirth: null,
//           email: "thi.phanpham+200@hcmut.edu.vn",
//           password:
//             "$2b$10$gUGr.EoUL7vKvT0H2xQ1MuSG4qIEJaLdPRNLAfbc81ZFfKPfKSm9e",
//           group_id: null,
//           joined_at: null,
//           role: null,
//           createdAt: "2024-12-15T11:13:14.033Z",
//           updatedAt: "2024-12-15T11:13:14.033Z",
//           isActive: true,
//           isEmailVerified: false,
//           verificationCode: "415602",
//           verificationCodeExpiresAt: "2024-12-15T11:28:13.863Z",
//           status: "OFFLINE",
//           passwordResetCode: null,
//           passwordResetCodeExpiresAt: null,
//         },
//       ],
//     },
//     {
//       id: 25,
//       role: "Leader",
//       name: "Frontend Team",
//       description: "Hello, this is the description",
//       createdAt: "2024-12-20T15:35:33.163Z",
//       updatedAt: "2024-12-20T15:35:33.163Z",
//       user: [
//         {
//           id: 8,
//           name: " Tt",
//           dateofbirth: null,
//           email: "lsjenny1710+1@gmail.com",
//           password:
//             "$2b$10$kZSPFAogfTWrkmY4GzhLo.KKzt4os5Mqw5fSPyS1KmJUEnZD9HT/S",
//           group_id: null,
//           joined_at: null,
//           role: null,
//           createdAt: "2024-12-15T13:34:41.588Z",
//           updatedAt: "2024-12-15T14:01:52.380Z",
//           isActive: true,
//           isEmailVerified: true,
//           verificationCode: null,
//           verificationCodeExpiresAt: null,
//           status: "OFFLINE",
//           passwordResetCode: null,
//           passwordResetCodeExpiresAt: null,
//         },
//         {
//           id: 1,
//           name: "Tuan Nguyen 1",
//           dateofbirth: "2003-05-16T07:00:00.000Z",
//           email: "nguyenducanhtuan0602@gmail.com",
//           password:
//             "$2b$10$xBmGZ9waMSodhC.yQkfACu9NFkPIxH6Zo2rw1ZItDNrIJDj4SWkMS",
//           group_id: null,
//           joined_at: null,
//           role: null,
//           createdAt: "2024-12-11T03:43:08.432Z",
//           updatedAt: "2024-12-20T10:17:43.475Z",
//           isActive: true,
//           isEmailVerified: true,
//           verificationCode: null,
//           verificationCodeExpiresAt: null,
//           status: "OFFLINE",
//           passwordResetCode: null,
//           passwordResetCodeExpiresAt: null,
//         },
//         {
//           id: 2,
//           name: "Thi ne",
//           dateofbirth: null,
//           email: "lsjenny1710+200@gmail.com",
//           password:
//             "$2b$10$2RTzkFRVwu4tL9.Thr6KJOEE1JECkYfe8mFcKQJ4IVeMWL.ggMqoi",
//           group_id: null,
//           joined_at: null,
//           role: null,
//           createdAt: "2024-12-15T10:55:32.299Z",
//           updatedAt: "2024-12-15T10:55:47.804Z",
//           isActive: true,
//           isEmailVerified: true,
//           verificationCode: null,
//           verificationCodeExpiresAt: null,
//           status: "OFFLINE",
//           passwordResetCode: null,
//           passwordResetCodeExpiresAt: null,
//         },
//       ],
//     },
//   ],
//   description:
//     "This project aims to develop a cutting-edge e-commerce platform.",
//   documents: [
//     {
//       id: "doc1",
//       name: "Project Overview",
//       type: "pdf",
//       url: "https://example.com/docs/project-overview.pdf",
//     },
//     {
//       id: "doc2",
//       name: "System Architecture",
//       type: "pptx",
//       url: "https://example.com/docs/system-architecture.pptx",
//     },
//   ],
//   tasks: [
//     {
//       id: "t1",
//       name: "Setup Project Environment",
//       priority: "High",
//       status: "COMPLETED",
//       task_code: "ENV-001",
//       members: [
//         {
//           id: "m1",
//           name: "Alice",
//           email: "alice@company.com",
//           role: "Lead Developer",
//         },
//       ],
//       sum_hours: 25,
//     },
//     {
//       id: "t2",
//       name: "Design Homepage",
//       priority: "Medium",
//       status: "IN_PROGRESS",
//       task_code: "FEAT-002",
//       members: [
//         {
//           id: "m4",
//           name: "Diana",
//           email: "diana@company.com",
//           role: "UI/UX Designer",
//         },
//       ],
//       sum_hours: 40,
//     },
//   ],
//   status: "IN_PROGRESS",
//   sum_hours: 65,
//   start_date: "2023-06-01",
//   end_date: "2024-06-01",
//   progress: 10,
// };

// export const mockData: NotificationList = [
//   {
//     id: "1",
//     task_code: "T001",
//     task_name: "Research Market Trends",
//     task_description: "Conduct research on the latest market trends.",
//     date_time: "2024-12-18T10:00:00",
//     project_parent_name: "Market Research Project",
//     member: { name: "John Doe", avatar: require("assets/Switch.png") },
//   },
//   {
//     id: "2",
//     task_code: "T002",
//     task_name: "Design Product Prototype",
//     task_description: "Create design for the smart home product prototype.",
//     date_time: "2024-12-19T14:00:00",
//     project_parent_name: "Product Development",
//     member: { name: "Jane Smith", avatar: require("assets/Switch.png") },
//   },
//   {
//     id: "3",
//     task_code: "T003",
//     task_name: "Write Marketing Copy",
//     task_description: "Draft marketing copy for the upcoming campaign.",
//     date_time: "2024-12-20T09:00:00",
//     project_parent_name: "Marketing Campaign",
//     member: { name: "Alice Johnson", avatar: require("assets/Switch.png") },
//   },
// ];

// export const ProjectList: IProjectList = [
//   {
//     id: "p1",
//     name: "Project Alpha",
//     start_date: "2023-01-15",
//     end_date: "2023-12-15",
//     status: "COMPLETED",
//     description:
//       "A project focused on building an internal tool for project management.",
//     progress: 100,
//     sum_hours_until_now: 320,
//     members: [
//       {
//         id: "m1",
//         name: "Alice",
//         email: "alice@company.com",
//         role: "Project Manager",
//       },
//       {
//         id: "m2",
//         name: "Bob",
//         email: "bob@company.com",
//         role: "Developer",
//       },
//       {
//         id: "m3",
//         name: "Charlie",
//         email: "charlie@company.com",
//         role: "QA Engineer",
//       },
//     ],
//   },
//   {
//     id: "p2",
//     name: "Project Beta",
//     start_date: "2023-03-01",
//     end_date: "2024-03-01",
//     status: "IN_PROGRESS",
//     description:
//       "A NOT_STARTED e-commerce platform that aims to provide a seamless shopping experience.",
//     progress: 60,
//     sum_hours_until_now: 150,
//     members: [
//       {
//         id: "m4",
//         name: "David",
//         email: "david@company.com",
//         role: "Backend Developer",
//       },
//       {
//         id: "m5",
//         name: "Eve",
//         email: "eve@company.com",
//         role: "Frontend Developer",
//       },
//       {
//         id: "m6",
//         name: "Frank",
//         email: "frank@company.com",
//         role: "UI/UX Designer",
//       },
//     ],
//   },
//   {
//     id: "p3",
//     name: "Project Gamma",
//     start_date: "2023-06-01",
//     end_date: "2024-06-01",
//     status: "NOT_STARTED",
//     description: "A platform for collaborative learning and online courses.",
//     progress: 5,
//     sum_hours_until_now: 25,
//     members: [
//       {
//         id: "m7",
//         name: "Grace",
//         email: "grace@company.com",
//         role: "Product Owner",
//       },
//       {
//         id: "m8",
//         name: "Helen",
//         email: "helen@company.com",
//         role: "Content Specialist",
//       },
//     ],
//   },
// ];
