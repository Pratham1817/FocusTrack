import Button from "../common/Button";
import FormInput from "../common/FormInput";
import LoadingSpinner from "../common/LoadingSpinner";
import { useCalendar } from "../../context/CalendarContext";

const AddNewMeetingForm = () => {
  const {
    isSubmitting,
    meetingForm,
    handleMeetingForm,
    handleSubmitMeeting,
    handleMeetingModalOpen,
  } = useCalendar();

  return (
    <form
      onSubmit={handleSubmitMeeting}
      className="mt-6 flex h-full w-full flex-col justify-start"
    >
      <FormInput
        autoFocus
        id="title"
        labelText="Title:"
        inputStyles="focus:outline-accent-color"
        value={meetingForm.title}
        onChange={handleMeetingForm}
      />
      <FormInput
        id="description"
        type="textarea"
        labelText="Description:"
        inputStyles="focus:outline-accent-color"
        value={meetingForm.description}
        onChange={handleMeetingForm}
      />

      <div className="my-2 flex w-full gap-2">
        <FormInput
          id="startTime"
          type="time"
          labelText="Start time:"
          inputStyles="focus:outline-accent-color"
          containerStyles="flex w-1/2 flex-col gap-1"
          value={meetingForm.startTime}
          onChange={handleMeetingForm}
        />
        <FormInput
          id="endTime"
          type="time"
          labelText="End time:"
          inputStyles="focus:outline-accent-color"
          containerStyles="flex w-1/2 flex-col gap-1"
          value={meetingForm.endTime}
          onChange={handleMeetingForm}
        />
      </div>

      <div className="mt-3 flex w-full gap-1 text-white">
        <Button type="submit" stylesType="submit">
          {isSubmitting ? <LoadingSpinner /> : "Submit"}
        </Button>
        <Button onClick={(e) => handleMeetingModalOpen(e)} stylesType="cancel">
          Cancel
        </Button>
      </div>
    </form>
  );
};
export default AddNewMeetingForm;
