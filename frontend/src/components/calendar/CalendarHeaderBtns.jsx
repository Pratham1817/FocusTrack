import Button from "../common/Button";
import { useCalendar } from "../../context/CalendarContext";

const CalendarHeaderBtns = () => {
  const { handleMonthNavigation } = useCalendar();

  return (
    <div className="flex gap-3">
      <Button
        onClick={() => handleMonthNavigation("prev")}
        stylesType="calendar"
      >
        &#10094;
      </Button>
      <Button
        onClick={() => handleMonthNavigation("next")}
        stylesType="calendar"
      >
        &#10095;
      </Button>
    </div>
  );
};
export default CalendarHeaderBtns;
