import toast from "react-hot-toast";
import { CURRENT_MONTH, MONTHS } from "./constants";

export const capitalizeFirstLetter = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const filterNotes = (notes, title, priorityValue) => {
  if (!notes) return;
  return notes.filter(
    (note) =>
      !note.archived &&
      note.columnTitle === title &&
      note.priority === priorityValue.toLowerCase(),
  );
};

export const generateNotesChartData = (notes) => [
  {
    column: "To-do",
    high: filterNotes(notes, "To-do", "high").length,
    medium: filterNotes(notes, "To-do", "medium").length,
    low: filterNotes(notes, "To-do", "low").length,
  },
  {
    column: "In-Progress",
    high: filterNotes(notes, "In-Progress", "high").length,
    medium: filterNotes(notes, "In-Progress", "medium").length,
    low: filterNotes(notes, "In-Progress", "low").length,
  },
  {
    column: "Completed",
    high: filterNotes(notes, "Completed", "high").length,
    medium: filterNotes(notes, "Completed", "medium").length,
    low: filterNotes(notes, "Completed", "low").length,
  },
];

export const generateMeetingsChartData = (meetings) => [
  {
    month: MONTHS[CURRENT_MONTH % 12].slice(0, 3),
    meetings: meetings.filter(
      (meeting) => new Date(meeting.addedFor).getMonth() === CURRENT_MONTH % 12,
    ).length,
  },
  {
    month: MONTHS[(CURRENT_MONTH + 1) % 12].slice(0, 3),
    meetings: meetings.filter(
      (meeting) =>
        new Date(meeting.addedFor).getMonth() === (CURRENT_MONTH + 1) % 12,
    ).length,
  },
  {
    month: MONTHS[(CURRENT_MONTH + 2) % 12].slice(0, 3),
    meetings: meetings.filter(
      (meeting) =>
        new Date(meeting.addedFor).getMonth() === (CURRENT_MONTH + 2) % 12,
    ).length,
  },
  {
    month: MONTHS[(CURRENT_MONTH + 3) % 12].slice(0, 3),
    meetings: meetings.filter(
      (meeting) =>
        new Date(meeting.addedFor).getMonth() === (CURRENT_MONTH + 3) % 12,
    ).length,
  },
];

export const showToast = (message, type, isLight) => {
  toast[type](message, {
    style: {
      backgroundColor: isLight ? "rgb(245 245 245)" : "rgb(38 38 38)",
      color: isLight ? "black" : "white",
    },
  });
};

export const getColorClasses = (color) => {
  const colorMap = {
    blue: {
      bg: "bg-blue-50",
      icon: "text-blue-600",
      border: "border-blue-200",
      hover: "hover:bg-blue-100",
    },
    green: {
      bg: "bg-green-50",
      icon: "text-green-600",
      border: "border-green-200",
      hover: "hover:bg-green-100",
    },
    purple: {
      bg: "bg-purple-50",
      icon: "text-purple-600",
      border: "border-purple-200",
      hover: "hover:bg-purple-100",
    },
    orange: {
      bg: "bg-orange-50",
      icon: "text-orange-600",
      border: "border-orange-200",
      hover: "hover:bg-orange-100",
    },
    pink: {
      bg: "bg-pink-50",
      icon: "text-pink-600",
      border: "border-pink-200",
      hover: "hover:bg-pink-100",
    },
    red: {
      bg: "bg-red-50",
      icon: "text-red-600",
      border: "border-red-200",
      hover: "hover:bg-red-100",
    },
  };
  return colorMap[color];
};
