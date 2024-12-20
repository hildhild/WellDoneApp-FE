import { NotificationItem, NotificationList } from "@/Services/notification";
import { IProjectDetail, IProjectList } from "@/Services/projects";

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
  COMPLETED: "completed",
  IN_PROGRESS: "in_progress",
  NEW: "new",
};

export type Status = "completed" | "in_progress" | "new";
export type DocumentType = "csv" | "doc" | "docx" | "pdf" | "png" | "ppt" | "pptx" | "xls" | "xlsx" | "zip" | "jpg" ;
export type Priority = "High" | "Medium" | "Low";

export const dataa: IProjectDetail = {
  "id": "001",
  "name": "Project Phoenix",
  "groups": [
    {
      "id": "g1",
      "name": "Backend Team",
      "description": "Responsible for API development and database management.",
      "createdAt": "2023-05-10T08:00:00Z",
      "updatedAt": "2023-12-01T18:00:00Z",
      "user": [
        {
          "id": "m1",
          "name": "Alice",
          "email": "alice@company.com",
          "role": "Lead Developer"
        },
        {
          "id": "m2",
          "name": "Bob",
          "email": "bob@company.com",
          "role": "Backend Developer"
        }
      ]
    },
    {
      "id": "g2",
      "name": "Frontend Team",
      "description": "Handles the user interface and experience design.",
      "createdAt": "2023-05-10T08:00:00Z",
      "updatedAt": "2023-12-01T18:00:00Z",
      "user": [
        {
          "id": "m3",
          "name": "Charlie",
          "email": "charlie@company.com",
          "role": "Frontend Developer"
        },
        {
          "id": "m4",
          "name": "Diana",
          "email": "diana@company.com",
          "role": "UI/UX Designer"
        }
      ]
    }
  ],
  "description": "This project aims to develop a cutting-edge e-commerce platform.",
  "documents": [
    {
      "id": "doc1",
      "name": "Project Overview",
      "type": "pdf",
      "url": "https://example.com/docs/project-overview.pdf"
    },
    {
      "id": "doc2",
      "name": "System Architecture",
      "type": "pptx",
      "url": "https://example.com/docs/system-architecture.pptx"
    }
  ],
  "tasks": [
    {
      "id": "t1",
      "name": "Setup Project Environment",
      "priority": "High",
      "status": "completed",
      "task_code": "ENV-001",
      "members": [
        {
          "id": "m1",
          "name": "Alice",
          "email": "alice@company.com",
          "role": "Lead Developer"
        }
      ],
      "sum_hours": 25
    },
    {
      "id": "t2",
      "name": "Design Homepage",
      "priority": "Medium",
      "status": "in_progress",
      "task_code": "FEAT-002",
      "members": [
        {
          "id": "m4",
          "name": "Diana",
          "email": "diana@company.com",
          "role": "UI/UX Designer"
        }
      ],
      "sum_hours": 40
    }
  ],
  "status": "in_progress",
  "sum_hours": 65,
  "start_date": "2023-06-01",
  "end_date": "2024-06-01",
  "progress": 10
}


export const mockData: NotificationList = [
  {
    id: "1",
    task_code: "T001",
    task_name: "Research Market Trends",
    task_description: "Conduct research on the latest market trends.",
    date_time: "2024-12-18T10:00:00",
    project_parent_name: "Market Research Project",
    member: { name: "John Doe", avatar: require("assets/Switch.png") },
  },
  {
    id: "2",
    task_code: "T002",
    task_name: "Design Product Prototype",
    task_description: "Create design for the smart home product prototype.",
    date_time: "2024-12-19T14:00:00",
    project_parent_name: "Product Development",
    member: { name: "Jane Smith", avatar: require("assets/Switch.png") },
  },
  {
    id: "3",
    task_code: "T003",
    task_name: "Write Marketing Copy",
    task_description: "Draft marketing copy for the upcoming campaign.",
    date_time: "2024-12-20T09:00:00",
    project_parent_name: "Marketing Campaign",
    member: { name: "Alice Johnson", avatar: require("assets/Switch.png") },
  },
];

export const ProjectList: IProjectList = [
  {
    "id": "p1",
    "name": "Project Alpha",
    "start_date": "2023-01-15",
    "end_date": "2023-12-15",
    "status": "completed",
    "description": "A project focused on building an internal tool for project management.",
    "progress": 100,
    "sum_hours_until_now": 320,
    "members": [
      {
        "id": "m1",
        "name": "Alice",
        "email": "alice@company.com",
        "role": "Project Manager"
      },
      {
        "id": "m2",
        "name": "Bob",
        "email": "bob@company.com",
        "role": "Developer"
      },
      {
        "id": "m3",
        "name": "Charlie",
        "email": "charlie@company.com",
        "role": "QA Engineer"
      }
    ]
  },
  {
    "id": "p2",
    "name": "Project Beta",
    "start_date": "2023-03-01",
    "end_date": "2024-03-01",
    "status": "in_progress",
    "description": "A new e-commerce platform that aims to provide a seamless shopping experience.",
    "progress": 60,
    "sum_hours_until_now": 150,
    "members": [
      {
        "id": "m4",
        "name": "David",
        "email": "david@company.com",
        "role": "Backend Developer"
      },
      {
        "id": "m5",
        "name": "Eve",
        "email": "eve@company.com",
        "role": "Frontend Developer"
      },
      {
        "id": "m6",
        "name": "Frank",
        "email": "frank@company.com",
        "role": "UI/UX Designer"
      }
    ]
  },
  {
    "id": "p3",
    "name": "Project Gamma",
    "start_date": "2023-06-01",
    "end_date": "2024-06-01",
    "status": "new",
    "description": "A platform for collaborative learning and online courses.",
    "progress": 5,
    "sum_hours_until_now": 25,
    "members": [
      {
        "id": "m7",
        "name": "Grace",
        "email": "grace@company.com",
        "role": "Product Owner"
      },
      {
        "id": "m8",
        "name": "Helen",
        "email": "helen@company.com",
        "role": "Content Specialist"
      }
    ]
  }
]
