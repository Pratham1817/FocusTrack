import {
  BarChartOutlined,
  BgColorsOutlined,
  CalendarOutlined,
  FieldTimeOutlined,
  FileProtectOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

export const DEFAULT_ACCENT = "#3b82f6";
export const MAX_BOARDS_COUNT = 5;

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const TODAY = new Date();
export const CURRENT_DAY = TODAY.getDate();
export const CURRENT_MONTH = TODAY.getMonth();

export const COLUMNS = {
  "To-do": ["High", "Medium", "Low"],
  "In-Progress": ["High", "Medium", "Low"],
  Completed: ["High", "Medium", "Low"],
};

export const NOTES_CHART_DATA = [
  { dataKey: "high", fill: "rgb(239 68 68)" },
  { dataKey: "medium", fill: "rgb(245 158 11)" },
  { dataKey: "low", fill: "rgb(14 165 233)" },
];

export const HERO_BENEFITS = [
  "Kanban Planning",
  "Pomodoro Timer",
  "Analytics Dashboard",
];

export const FEATURES = [
  {
    icon: BarChartOutlined,
    title: "Dashboard Analytics",
    description:
      "Get comprehensive insights into your productivity with detailed analytics and statistics. Track your progress, identify patterns, and optimize your workflow for maximum efficiency.",
    highlights: [
      "Productivity tracking",
      "Progress visualization",
      "Performance insights",
      "Custom metrics",
    ],
    color: "blue",
  },
  {
    icon: UnorderedListOutlined,
    title: "Kanban Planner",
    description:
      "Organize your tasks and notes with our intuitive Kanban-style interface. Drag and drop tasks between columns, set priorities, and keep your workflow organized visually.",
    highlights: [
      "Visual task management",
      "Drag & drop interface",
      "Custom columns",
      "Priority setting",
    ],
    color: "green",
  },
  {
    icon: CalendarOutlined,
    title: "Calendar Integration",
    description:
      "Seamlessly manage your meetings and appointments with our built-in calendar feature. Schedule, track, and never miss important events or deadlines.",
    highlights: [
      "Meeting scheduling",
      "Event tracking",
      "Deadline management",
      "Calendar sync",
    ],
    color: "purple",
  },
  {
    icon: FieldTimeOutlined,
    title: "Pomodoro Timer",
    description:
      "Boost your focus and productivity with our integrated Pomodoro timer. Work in focused intervals, take breaks, and maintain peak performance throughout your day.",
    highlights: [
      "Focus sessions",
      "Break reminders",
      "Session tracking",
      "Productivity boost",
    ],
    color: "orange",
  },
  {
    icon: BgColorsOutlined,
    title: "Full Theme Customization",
    description:
      "Personalize your workspace with complete theme customization. Toggle between dark and light modes, change accent colors, and create a workspace that reflects your style.",
    highlights: [
      "Dark/Light mode",
      "Custom accent colors",
      "Personalized UI",
      "Multiple themes",
    ],
    color: "pink",
  },
  {
    icon: FileProtectOutlined,
    title: "Secure Authentication",
    description:
      "Your data is protected with JWT token authentication stored in HTTP-only cookies. Enjoy peace of mind knowing your information is secure and private.",
    highlights: [
      "JWT authentication",
      "Secure cookies",
      "Data protection",
      "Privacy focused",
    ],
    color: "red",
  },
];

export const CAROUSEL_DATA = [
  {
    id: "dashboard",
    title: "Analytics Dashboard",
    description:
      "Get comprehensive insights into your productivity with detailed analytics, task completion rates, and time tracking statistics.",
    icon: BarChartOutlined,
    path: "/dashboard-carousel.png",
    alt: "TaskFlow Pro analytics dashboard showing productivity metrics and charts",
  },
  {
    id: "kanban",
    title: "Kanban Board",
    description:
      "Organize your tasks visually with our intuitive Kanban interface. Drag and drop tasks between columns to track your workflow.",
    icon: UnorderedListOutlined,
    path: "/kanban-carousel.png",
    alt: "TaskFlow Pro Kanban board with task cards organized in columns",
  },
  {
    id: "calendar",
    title: "Calendar View",
    description:
      "Manage meetings and deadlines with our integrated calendar. Schedule events and never miss important appointments.",
    icon: CalendarOutlined,
    path: "/calendar-carousel.png",
    alt: "TaskFlow Pro calendar interface showing scheduled meetings and events",
  },
  {
    id: "pomodoro",
    title: "Pomodoro Timer",
    description:
      "Stay focused with our built-in Pomodoro timer. Track work sessions and breaks to optimize your productivity.",
    icon: FieldTimeOutlined,
    path: "/pomodoro-carousel.png",
    alt: "TaskFlow Pro Pomodoro timer interface with focus session controls",
  },
  {
    id: "themes",
    title: "Theme Customization",
    description:
      "Personalize your workspace with full theme customization. Choose between dark and light modes and custom accent colors.",
    icon: BgColorsOutlined,
    path: "/theme-carousel.png",
    alt: "TaskFlow Pro theme customization panel with color options",
  },
];

export const CTA_BENEFITS = [
    "Free forever plan available",
    "No credit card required",
    "Setup in under 5 minutes",
    "Export your data anytime",
  ];