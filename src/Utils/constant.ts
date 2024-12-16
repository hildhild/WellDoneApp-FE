import { NotificationItem, NotificationList } from "@/Services/notification";
import { ProjectDetail } from "@/Services/projects";

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

export const data: ProjectDetail = {
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
    },
  ],
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
