import Calendar from "../components/calendar/Calendar";
import CalendarHeader from "../components/calendar/CalendarHeader";
import AddNewMeetingForm from "../components/calendar/AddNewMeetingForm";
import Modal from "../components/common/Modal";
import MeetingDetailsContainer from "../components/calendar/MeetingDetailsContainer";
import List from "../components/common/List";
import Meeting from "../components/calendar/Meeting";
import { MONTHS } from "../utils/constants";
import { useCalendar } from "../context/CalendarContext";

const CalendarPage = () => {
  const {
    filterMeetingsByDate,
    currMonth,
    selectedDate,
    meetingModalOpen,
    meetingDetailsModalOpen,
    meetingDetailsIsVisible,
    handleMeetingModalOpen,
    handleMeetingDetailsModalOpen,
  } = useCalendar();

  return (
    <section className="mx-auto my-0 mt-4 max-w-7xl px-2 sm:px-4">
      <CalendarHeader />
      <Calendar />

      {meetingDetailsModalOpen && (
        <Modal
          onModalOpen={(e) => handleMeetingDetailsModalOpen(e)}
          headerText="Meetings on: "
          headerSpan={`${MONTHS[currMonth]} ${selectedDate}`}
        >
          {meetingDetailsIsVisible ? (
            <MeetingDetailsContainer />
          ) : (
            <List
              items={filterMeetingsByDate}
              emptyListMsg="You don't have any meetings added for this day."
              emptyListStyles="mt-8 opacity-70 text-center text-sm sm:text-base"
              listContainerStyles="mt-8 h-[calc(100%-4rem)] overflow-y-auto scrollbar-custom"
              renderItem={(meeting) => (
                <Meeting key={meeting._id} meeting={meeting} />
              )}
            />
          )}
        </Modal>
      )}

      {meetingModalOpen && (
        <Modal
          onModalOpen={(e) => handleMeetingModalOpen(e)}
          headerText="Add meeting on: "
          headerSpan={`${MONTHS[currMonth]} ${selectedDate}`}
        >
          <AddNewMeetingForm />
        </Modal>
      )}
    </section>
  );
};
export default CalendarPage;
