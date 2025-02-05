import { useState } from "react";
import Calendar from "react-calendar";
import "../components/Calendar.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface MyCalendarProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onDateChange: (date: any) => void; // Prop type for date change
}

const MyCalendar: React.FC<MyCalendarProps> = ({ onDateChange }) => {
  const [value, setValue] = useState<Value>(new Date());
  console.log("DATE TODAY?", value);

  const handleDateChange = (newValue: Value) => {
    setValue(newValue);
    onDateChange(newValue); // Call the prop function to update the parent state
  };

  return (
    <div className="">
      <div className="flex justify-center">
        <Calendar onChange={handleDateChange} value={value} />
      </div>
    </div>
  );
};

export default MyCalendar;
