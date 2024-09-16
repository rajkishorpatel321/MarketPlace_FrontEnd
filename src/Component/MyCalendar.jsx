import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
// import "./MyCalendar.css"; // Optional: custom styles

const MyCalendar = ({ date = new Date(), onDateChange }) => {
  // Provide a default value
  const [isOpen, setIsOpen] = React.useState(false);

  const handleDateChange = (newDate) => {
    onDateChange(newDate); // Notify parent about the new date
    setIsOpen(false); // Close the calendar after selecting a date
  };

  const toggleCalendar = () => {
    setIsOpen(!isOpen); // Toggle calendar visibility
  };

  return (
    <div>
      <h1 onClick={toggleCalendar} style={{ cursor: "pointer" }}>
        {date ? date.toDateString() : "No date selected"}{" "}
        {/* Handle undefined date */}
      </h1>
      {isOpen && (
        <Calendar
          onChange={handleDateChange}
          value={date}
          className="calendar" // Optional: custom class
        />
      )}
    </div>
  );
};

export default MyCalendar;
