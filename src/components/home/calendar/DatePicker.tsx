import {
  format,
  subMonths,
  addMonths,
  startOfWeek,
  addDays,
  isSameDay,
  lastDayOfWeek,
  getWeek,
  addWeeks,
  subWeeks
} from "date-fns";
import { AngleLeftIcon, AngleRightIcon } from "@patternfly/react-icons";
import { useState } from "react";


function DatePicker() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));
  const [selectedDate, setSelectedDate] = useState(new Date());

  const changeMonthHandle = (btnType: string) => {
    if (btnType === "prev") {
      setCurrentMonth(subMonths(currentMonth, 1));
    }
    if (btnType === "next") {
      setCurrentMonth(addMonths(currentMonth, 1));
    }
  };

  const changeWeekHandle = (btnType: string) => {
    //console.log("current week", currentWeek);
    if (btnType === "prev") {
      //console.log(subWeeks(currentMonth, 1));
      setCurrentMonth(subWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(subWeeks(currentMonth, 1)));
    }
    if (btnType === "next") {
      //console.log(addWeeks(currentMonth, 1));
      setCurrentMonth(addWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(addWeeks(currentMonth, 1)));
    }
  };
  const onDateClickHandle = (day: Date, dayStr: string) => {
    setSelectedDate(day);
  };

  const renderHeader = () => {
    const dateFormat = "MMM yyyy";
    // console.log("selected day", selectedDate);
    return (
      <div className="header row flex-middle my-2">
        <div className="col col-start">
        </div>
        <div className="col col-center ">
          <small>{format(currentMonth, dateFormat)}</small>
        </div>
        <div className="col col-end">
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const dateFormat = "EEE";
    const days = [];
    let startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col text-muted" key={i}>
          <small>{format(addDays(startDate, i), dateFormat)}</small>

        </div>
      );
    }
    return <div className="days row">{days}</div>;
  };

  const renderCells = () => {
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 1 });
    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);

        const cloneDay = day;
        days.push(
          <div
            className={`col ${isSameDay(day, new Date())
              ? "today"
              : isSameDay(day, selectedDate)
                ? "selected"
                : ""
              }`}
            // key={}
            onClick={() => {
              const dayStr = format(cloneDay, "ccc dd MMM yy");
              onDateClickHandle(cloneDay, dayStr);
            }}
          >
            <span className="number">{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }

      rows.push(
        <div className="row " key={formattedDate}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  };

  return (
    <div className="col">
      {renderHeader()}
      <div className="container-horizontal">
        <div className="me-2 mt-2" onClick={() => changeWeekHandle("prev")}>
          <AngleLeftIcon size="lg" color="#205F00" />
        </div>

        <div className="col">
          {renderDays()}
          {renderCells()}
        </div>

        <div>
          <div className="ms-2 mt-2" onClick={() => changeWeekHandle("next")}>
            <AngleRightIcon size="lg" color="#205F00" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
