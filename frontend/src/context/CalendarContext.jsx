import { createContext, useContext, useState } from "react";

import { CURRENT_DAY, MONTHS, TODAY } from "../utils/constants";
import { useFetch } from "../hooks/useFetch";
import { useAuth } from "./AuthContext";
import { useThemeColors } from "./ThemeContext";
import { showToast } from "../utils/helpers";

const CalendarContext = createContext();

const CalendarProvider = ({ children }) => {
  const { userData } = useAuth();
  const { isLight } = useThemeColors();

  const { data: meetings, setData: setMeetings } = useFetch(
    `/api/meetings/${userData?.id}`,
    !userData?.id,
  );

  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [selectedDate, setSelectedDate] = useState(0);
  const [currMonth, setCurrMonth] = useState(TODAY.getMonth());
  const [currYear, setCurrYear] = useState(TODAY.getFullYear());
  const [meetingModalOpen, setMeetingModalOpen] = useState(false);
  const [meetingDetailsModalOpen, setMeetingDetailsModalOpen] = useState(false);
  const [meetingDetailsIsVisible, setMeetingDetailsIsVisible] = useState(false);
  const [meetingForm, setMeetingForm] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const date = new Date(currYear, currMonth, selectedDate);

  // Converting date to UTC because mongoDB save dates only in UTC
  const filterMeetingsByDate = meetings.filter(
    (meeting) => meeting.addedFor === date.toISOString(),
  );

  const firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
  const daysInMonth = new Date(currYear, currMonth + 1, 0).getDate();

  // Checking if it is current day of month and year
  // Used for styling purposes with clsx library https://www.npmjs.com/package/clsx
  const currDayOfMonthAndYear = (index) =>
    index + 1 === CURRENT_DAY &&
    TODAY.getMonth() === currMonth &&
    TODAY.getFullYear() === currYear;

  const dayMeetingsArr = (i) =>
    meetings.filter((m) => {
      const date = new Date(m.addedFor);
      return (
        date.getFullYear() === currYear &&
        date.getMonth() === currMonth &&
        date.getDate() === i + 1
      );
    });

  const meetingsOfMonth = meetings
    .map(
      (m) =>
        new Date(m.addedFor).getMonth() === currMonth &&
        new Date(m.addedFor).getFullYear() === currYear,
    )
    .filter((m) => m).length;

  const handleMeetingForm = (e) =>
    setMeetingForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  const handleMonthNavigation = (navigationType) => {
    if (navigationType === "prev") setCurrMonth((prevMonth) => prevMonth - 1);
    if (navigationType === "next") setCurrMonth((prevMonth) => prevMonth + 1);

    // Checking if current month is January then return December
    if (currMonth === 0 && navigationType === "prev") {
      setCurrYear((prevYear) => prevYear - 1);
      setCurrMonth(11);
      // Checking if current month is December then return January
    } else if (currMonth === 11 && navigationType === "next") {
      setCurrYear((prevYear) => prevYear + 1);
      setCurrMonth(0);
    }
  };

  const handleMeetingModalOpen = (e, index) => {
    if (e.type === "click" || (e.type === "keydown" && e.key === "Enter")) {
      setMeetingForm({
        title: "",
        description: "",
        startTime: "",
        endTime: "",
      });

      setMeetingModalOpen((isOpen) => !isOpen);
      index ? setSelectedDate(index) : setSelectedDate(0);
    }
  };

  const handleMeetingDetailsModalOpen = (e, index) => {
    if (e.type === "click" || (e.type === "keydown" && e.key === "Enter")) {
      setMeetingDetailsModalOpen((isOpen) => !isOpen);
      index ? setSelectedDate(index) : setSelectedDate(0);
      if (meetingDetailsIsVisible) setMeetingDetailsIsVisible(false);
    }
  };

  const handleToggleMeetingDetails = (e, meeting) => {
    if (e.type === "click" || (e.type === "keydown" && e.key === "Enter")) {
      setMeetingDetailsIsVisible((isOpen) => !isOpen);
      meeting ? setSelectedMeeting(meeting) : setSelectedMeeting(null);
    }
  };

  const handleSubmitMeeting = async (e) => {
    e.preventDefault();
    if (!meetingForm.title || !meetingForm.description)
      return showToast("Title and description are required!", "error", isLight);

    try {
      setIsSubmitting(true);
      const newMeeting = {
        title: meetingForm.title,
        description: meetingForm.description,
        startTime: meetingForm.startTime,
        endTime: meetingForm.endTime,
        addedFor: date,
        userId: userData.id,
      };

      const res = await fetch(`/api/meetings`, {
        method: "POST",
        body: JSON.stringify(newMeeting),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok)
        throw new Error("Something went wrong with creating a meeting");

      const data = await res.json();

      setMeetings((prevMeetings) => [...prevMeetings, data]);
      setMeetingForm({
        title: "",
        description: "",
        startTime: "",
        endTime: "",
      });
      setMeetingModalOpen(false);

      showToast(
        `A meeting was added successfully for ${selectedDate} of ${MONTHS[currMonth]}`,
        "success",
        isLight,
      );
    } catch (err) {
      console.log(err.message);
      showToast(err.message, "error", isLight);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteMeeting = async (id) => {
    try {
      const res = await fetch(`/api/meetings/${id}`, {
        method: "DELETE",
      });

      if (!res.ok)
        throw new Error(
          `Something went wrong with deleting the meeting with id: ${id}`,
        );
      const data = await res.json();

      const newDayMeetings = meetings.filter(
        (meeting) => meeting._id !== data._id,
      );
      setMeetings(newDayMeetings);

      showToast("Meeting deleted successfully!", "success", isLight);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <CalendarContext.Provider
      value={{
        date,
        currMonth,
        currYear,
        selectedDate,
        isSubmitting,
        selectedMeeting,
        firstDayOfMonth,
        daysInMonth,
        meetingForm,
        meetingsOfMonth,
        meetings,
        meetingModalOpen,
        meetingDetailsIsVisible,
        meetingDetailsModalOpen,
        filterMeetingsByDate,
        currDayOfMonthAndYear,
        setMeetings,
        dayMeetingsArr,
        setMeetingModalOpen,
        handleMeetingModalOpen,
        handleMeetingDetailsModalOpen,
        handleToggleMeetingDetails,
        handleMeetingForm,
        handleSubmitMeeting,
        handleDeleteMeeting,
        handleMonthNavigation,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

const useCalendar = () => {
  const context = useContext(CalendarContext);

  if (context === undefined)
    throw new Error(
      "Calendar's context must be used inside of CalendarProvider",
    );
  return context;
};

export { CalendarProvider, useCalendar };
