import { useState } from "react";
import Calendar from "react-calendar";
import "../components/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const MyCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className="">
      <div className="flex justify-center">
        <Calendar onChange={onChange} value={value} />
      </div>
    </div>
  );
};

export default MyCalendar;
