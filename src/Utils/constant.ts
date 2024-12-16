import { NotificationItem, NotificationList } from "@/Services/notification";
import { IProjectDetail } from "@/Services/projects";

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

export type Status = "completed" | "in_progress" | "new";
export type DocumentType = "csv" | "doc" | "docx" | "pdf" | "png" | "ppt" | "pptx" | "xls" | "xlsx" | "zip" | "jpg" ;

export const data: IProjectDetail = {
  id: 1,
  name: "Green sky Website Dev",
  members: [
    {
      id: 101,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Project Manager",
      avatar: require("assets/Switch.png"),
    },
    {
      id: 102,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "Developer",
      avatar: require("assets/Switch.png"),
    },
    {
      id: 103,
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      role: "Designer",
      avatar: require("assets/Switch.png"),
    },
    {
      id: 104,
      name: "Bob Brown",
      email: "bob.brown@example.com",
      role: "Tester",
      avatar: require("assets/Switch.png"),
    },
    {
      id: 105,
      name: "Charlie Davis",
      email: "charlie.davis@example.com",
      role: "Developer",
      avatar: require("assets/Switch.png"),
    },
  ],
  description: "A sample project to demonstrate JSON structure.",
  documents: [
    {
      id: 201,
      name: "Project Plan",
      type: "PDF",
      url: "http://example.com/project-plan.pdf",
    },
    {
      id: 202,
      name: "Requirements Document",
      type: "Word",
      url: "http://example.com/requirements.docx",
    },
  ],
  tasks: [
    {
      id: 301,
      name: "Develop Feature A",
      priority: "High",
      status: "In Progress",
      task_code: "FA-123",
      members: [
        {
          id: 102,
          name: "Jane Smith",
          email: "jane.smith@example.com",
          role: "Developer",
          avatar: require("assets/Switch.png"),
        },
      ],
      description: "Develop the initial version of Feature A.",
      task_diary: {
        created_at: "2024-12-10T08:00:00Z",
        last_accessed: "2024-12-15T14:30:00Z",
      },
      comments: [
        {
          id: 401,
          message: "Task started, initial setup completed.",
          poster_id: 102,
          poster_name: "Jane Smith",
          created_at: "2024-12-10T09:00:00Z",
          replies: [
            {
              id: 501,
              message: "Good progress, keep going!",
              poster_id: 101,
              poster_name: "John Doe",
              created_at: "2024-12-11T10:00:00Z",
            },
          ],
        },
        {
          id: 402,
          message: "Feature A implemented, testing next.",
          poster_id: 102,
          poster_name: "Jane Smith",
          created_at: "2024-12-14T16:00:00Z",
          replies: [],
        },
      ],
      sum_hours: 24,
    },
  ],
  status: "completed",
};

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

export const ProjectList: IProjectDetail[] = [
  {
    "id": 101,
    "name": "Project Apollo",
    "members": [
      {
        "id": 1,
        "name": "Alice Johnson",
        "email": "alice.johnson@example.com",
        "role": "Project Manager",
        "avatar": require("assets/Switch.png") 
      },
      {
        "id": 2,
        "name": "Bob Smith",
        "email": "bob.smith@example.com",
        "role": "Developer",
        "avatar": require("assets/Switch.png") 
      },
      {
        "id": 3,
        "name": "Charlie Brown",
        "email": "charlie.brown@example.com",
        "role": "Designer",
        "avatar": require("assets/Switch.png") 
      },
      {
        "id": 4,
        "name": "David Lee",
        "email": "david.lee@example.com",
        "role": "QA",
        "avatar": require("assets/Switch.png") 
      },
      {
        "id": 5,
        "name": "Eva White",
        "email": "eva.white@example.com",
        "role": "Developer",
        "avatar": require("assets/Switch.png") 
      }
    ],
    "description": "Project Apollo is a new mobile app to manage tasks efficiently.",
    "documents": [
      {
        "id": 1,
        "name": "Project Plan",
        "type": "pdf",
        "url": "https://example.com/docs/project_plan.pdf"
      },
      {
        "id": 2,
        "name": "Wireframe Designs",
        "type": "png",
        "url": "https://example.com/docs/wireframes.png"
      },
      {
        "id": 3,
        "name": "Development Guidelines",
        "type": "pdf",
        "url": "https://example.com/docs/dev_guidelines.pdf"
      },
      {
        "id": 4,
        "name": "UI Design Mockups",
        "type": "png",
        "url": "https://example.com/docs/ui_mockups.png"
      },
      {
        "id": 5,
        "name": "API Documentation",
        "type": "csv",
        "url": "https://example.com/docs/api_docs.csv"
      },
      {
        "id": 6,
        "name": "API Documentation",
        "type": "csv",
        "url": "https://example.com/docs/api_docs.csv"
      }
    ],
    "tasks": [
      {
        "id": 201,
        "name": "Set Up Project Repo",
        "priority": "High",
        "status": "in_progress",
        "task_code": "TASK-001",
        "members": [
          {
            "id": 1,
            "name": "Alice Johnson",
            "email": "alice.johnson@example.com",
            "role": "Project Manager",
            "avatar": require("assets/Switch.png")
          },
          {
            "id": 2,
            "name": "Bob Smith",
            "email": "bob.smith@example.com",
            "role": "Developer",
            "avatar": require("assets/Switch.png")
          }
        ],
        "description": "Initialize the project repository on GitHub and configure basic settings.",
        "task_diary": {
          "created_at": "2024-12-01T10:00:00Z",
          "last_accessed": "2024-12-05T14:00:00Z"
        },
        "comments": [
          {
            "id": 301,
            "message": "Repo created. Please start adding initial files.",
            "poster_id": 1,
            "poster_name": "Alice Johnson",
            "created_at": "2024-12-01T10:30:00Z",
            "replies": []
          },
          {
            "id": 302,
            "message": "Initial files added. Please review.",
            "poster_id": 2,
            "poster_name": "Bob Smith",
            "created_at": "2024-12-02T11:00:00Z",
            "replies": []
          }
        ],
        "sum_hours": 12
      },
      {
        "id": 202,
        "name": "Create App UI",
        "priority": "Medium",
        "status": "completed",
        "task_code": "TASK-002",
        "members": [
          {
            "id": 3,
            "name": "Charlie Brown",
            "email": "charlie.brown@example.com",
            "role": "Designer",
            "avatar": require("assets/Switch.png")
          },
          {
            "id": 5,
            "name": "Eva White",
            "email": "eva.white@example.com",
            "role": "Developer",
            "avatar": require("assets/Switch.png")
          }
        ],
        "description": "Design the initial screens for the mobile app.",
        "task_diary": {
          "created_at": "2024-12-05T09:00:00Z",
          "last_accessed": "2024-12-06T15:00:00Z"
        },
        "comments": [
          {
            "id": 303,
            "message": "Waiting for design brief to begin.",
            "poster_id": 3,
            "poster_name": "Charlie Brown",
            "created_at": "2024-12-05T09:30:00Z",
            "replies": []
          }
        ],
        "sum_hours": 24
      }
    ],
    "status": "in_progress"
  },
  {
    "id": 102,
    "name": "Project Zeus",
    "members": [
      {
        "id": 6,
        "name": "Grace King",
        "email": "grace.king@example.com",
        "role": "Project Manager",
        "avatar": require("assets/Switch.png") 
      },
      {
        "id": 7,
        "name": "Hank Ford",
        "email": "hank.ford@example.com",
        "role": "Developer",
        "avatar": require("assets/Switch.png") 
      },
      {
        "id": 8,
        "name": "Ivy Lee",
        "email": "ivy.lee@example.com",
        "role": "Designer",
        "avatar": require("assets/Switch.png") 
      },
      {
        "id": 9,
        "name": "Jack Miller",
        "email": "jack.miller@example.com",
        "role": "QA",
        "avatar": require("assets/Switch.png") 
      },
      {
        "id": 10,
        "name": "Liam Scott",
        "email": "liam.scott@example.com",
        "role": "Developer",
        "avatar": require("assets/Switch.png") 
      }
    ],
    "description": "Project Zeus is aimed at creating a platform for real-time collaboration.",
    "documents": [
      {
        "id": 6,
        "name": "Project Scope",
        "type": "PDF",
        "url": "https://example.com/docs/project_scope.pdf"
      },
      {
        "id": 7,
        "name": "System Architecture",
        "type": "PNG",
        "url": "https://example.com/docs/system_architecture.png"
      },
      {
        "id": 8,
        "name": "User Stories",
        "type": "Word",
        "url": "https://example.com/docs/user_stories.docx"
      },
      {
        "id": 9,
        "name": "Deployment Plan",
        "type": "PDF",
        "url": "https://example.com/docs/deployment_plan.pdf"
      },
      {
        "id": 10,
        "name": "API Specification",
        "type": "HTML",
        "url": "https://example.com/docs/api_spec.html"
      }
    ],
    "tasks": [
      {
        "id": 203,
        "name": "Set Up Database",
        "priority": "High",
        "status": "In Progress",
        "task_code": "TASK-003",
        "members": [
          {
            "id": 7,
            "name": "Hank Ford",
            "email": "hank.ford@example.com",
            "role": "Developer",
            "avatar": "https://example.com/avatars/hank.jpg"
          },
          {
            "id": 9,
            "name": "Jack Miller",
            "email": "jack.miller@example.com",
            "role": "QA",
            "avatar": "https://example.com/avatars/jack.jpg"
          }
        ],
        "description": "Set up and configure the PostgreSQL database for the application.",
        "task_diary": {
          "created_at": "2024-12-03T11:00:00Z",
          "last_accessed": "2024-12-05T16:00:00Z"
        },
        "comments": [
          {
            "id": 304,
            "message": "Database schema finalized.",
            "poster_id": 7,
            "poster_name": "Hank Ford",
            "created_at": "2024-12-03T11:30:00Z",
            "replies": []
          }
        ],
        "sum_hours": 16
      },
      {
        "id": 204,
        "name": "Design UI Mockups",
        "priority": "Medium",
        "status": "Not Started",
        "task_code": "TASK-004",
        "members": [
          {
            "id": 8,
            "name": "Ivy Lee",
            "email": "ivy.lee@example.com",
            "role": "Designer",
            "avatar": "https://example.com/avatars/ivy.jpg"
          },
          {
            "id": 6,
            "name": "Grace King",
            "email": "grace.king@example.com",
            "role": "Project Manager",
            "avatar": "https://example.com/avatars/grace.jpg"
          }
        ],
        "description": "Create initial UI designs for the real-time collaboration platform.",
        "task_diary": {
          "created_at": "2024-12-04T10:00:00Z",
          "last_accessed": "2024-12-05T10:00:00Z"
        },
        "comments": [],
        "sum_hours": 0
      }
    ],
    "status": "new"
  },
  {
    "id": 103,
    "name": "Project Titan",
    "members": [
      {
        "id": 11,
        "name": "Mona Harris",
        "email": "mona.harris@example.com",
        "role": "Project Manager",
        "avatar": "https://example.com/avatars/mona.jpg"
      },
      {
        "id": 12,
        "name": "Nina Clark",
        "email": "nina.clark@example.com",
        "role": "Developer",
        "avatar": "https://example.com/avatars/nina.jpg"
      },
      {
        "id": 13,
        "name": "Oscar Taylor",
        "email": "oscar.taylor@example.com",
        "role": "Designer",
        "avatar": "https://example.com/avatars/oscar.jpg"
      },
      {
        "id": 14,
        "name": "Paul Green",
        "email": "paul.green@example.com",
        "role": "QA",
        "avatar": "https://example.com/avatars/paul.jpg"
      },
      {
        "id": 15,
        "name": "Quinn Adams",
        "email": "quinn.adams@example.com",
        "role": "Developer",
        "avatar": "https://example.com/avatars/quinn.jpg"
      }
    ],
    "description": "Project Titan is focused on developing a cloud-based task management system.",
    "documents": [
      {
        "id": 11,
        "name": "Requirements Document",
        "type": "PDF",
        "url": "https://example.com/docs/requirements.pdf"
      },
      {
        "id": 12,
        "name": "Architecture Design",
        "type": "Image",
        "url": "https://example.com/docs/architecture.png"
      },
      {
        "id": 13,
        "name": "Tech Stack Overview",
        "type": "Word",
        "url": "https://example.com/docs/tech_stack.docx"
      },
      {
        "id": 14,
        "name": "Sprint Plan",
        "type": "Excel",
        "url": "https://example.com/docs/sprint_plan.xlsx"
      },
      {
        "id": 15,
        "name": "Cloud Infrastructure",
        "type": "HTML",
        "url": "https://example.com/docs/cloud_infrastructure.html"
      }
    ],
    "tasks": [
      {
        "id": 205,
        "name": "Set Up Cloud Infrastructure",
        "priority": "High",
        "status": "In Progress",
        "task_code": "TASK-005",
        "members": [
          {
            "id": 12,
            "name": "Nina Clark",
            "email": "nina.clark@example.com",
            "role": "Developer",
            "avatar": "https://example.com/avatars/nina.jpg"
          },
          {
            "id": 14,
            "name": "Paul Green",
            "email": "paul.green@example.com",
            "role": "QA",
            "avatar": "https://example.com/avatars/paul.jpg"
          }
        ],
        "description": "Set up the cloud infrastructure for hosting the task management platform.",
        "task_diary": {
          "created_at": "2024-12-02T08:00:00Z",
          "last_accessed": "2024-12-05T12:00:00Z"
        },
        "comments": [],
        "sum_hours": 8
      },
      {
        "id": 206,
        "name": "Create Database Models",
        "priority": "Medium",
        "status": "Not Started",
        "task_code": "TASK-006",
        "members": [
          {
            "id": 13,
            "name": "Oscar Taylor",
            "email": "oscar.taylor@example.com",
            "role": "Designer",
            "avatar": "https://example.com/avatars/oscar.jpg"
          },
          {
            "id": 15,
            "name": "Quinn Adams",
            "email": "quinn.adams@example.com",
            "role": "Developer",
            "avatar": "https://example.com/avatars/quinn.jpg"
          }
        ],
        "description": "Design the database models for storing task and user data.",
        "task_diary": {
          "created_at": "2024-12-01T07:30:00Z",
          "last_accessed": "2024-12-04T13:00:00Z"
        },
        "comments": [],
        "sum_hours": 0
      }
    ],
    "status": "new"
  }
]
