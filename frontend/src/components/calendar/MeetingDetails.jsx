import { useCalendar } from "../../context/CalendarContext";

const MeetingDetails = () => {
  const { selectedMeeting } = useCalendar();

  return (
    <>
      <p className="break-words font-semibold">
        Title: <span className="font-normal">{selectedMeeting.title}</span>
      </p>
      <p className="break-words font-semibold">
        Description:{" "}
        <span className="font-normal">{selectedMeeting.description}</span>
      </p>
      {selectedMeeting?.startTime && (
        <p className="font-semibold">
          Starts at:{" "}
          <span className="font-normal">{selectedMeeting.startTime}</span>
        </p>
      )}
      {selectedMeeting?.endTime && (
        <p className="font-semibold">
          Ends at:{" "}
          <span className="font-normal">{selectedMeeting.endTime}</span>
        </p>
      )}{" "}
    </>
  );
};

export default MeetingDetails;
