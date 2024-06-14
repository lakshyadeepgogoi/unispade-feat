import React, { useState } from 'react';
import './YourAvailability.css';
import { IoIosAddCircleOutline } from "react-icons/io";


function YourAvailability() {
  const timeZones = [
    "AFST:+04:30 (Kabul)",
    "BST:+06:00 (Dhaka)",
    "CST:+08:00 (Beijing, Shanghai, Hong Kong)",
    "HKT:+08:00 (Hong Kong)",
    "IST:+05:30 (Chennai, Kolkata, Mumbai, New Delhi)",
    "WITA:+08:00 (Bali, Makassar)",
    "JST:+09:00 (Tokyo)",
    "ALMT:+06:00 (Almaty)",
    "ICT:+07:00 (Vientiane)",
    "ULAT:+08:00 (Ulaanbaatar)",
    "PKT:+05:00 (Karachi, Islamabad)",
    "SGT:+08:00 (Singapore)",
    "SST:+08:00 (Singapore)",
    "LKT:+05:30 (Colombo)",
    "THA:+07:00 (Bangkok)",
  ];

  const noticePeriods = ["1 day before the call", "2 days before the call"];
  const calendars = ["Google Calendar", "Apple Calendar"];

  const initialSchedule = {
    Monday: { checked: false, slots: [{ startTime: "", endTime: "" }] },
    Tuesday: { checked: false, slots: [{ startTime: "", endTime: "" }] },
    Wednesday: { checked: false, slots: [{ startTime: "", endTime: "" }] },
    Thursday: { checked: false, slots: [{ startTime: "", endTime: "" }] },
    Friday: { checked: false, slots: [{ startTime: "", endTime: "" }] },
    Saturday: { checked: false, slots: [{ startTime: "", endTime: "" }] },
    Sunday: { checked: false, slots: [{ startTime: "", endTime: "" }] },
  };

  const [selectedTimeZone, setSelectedTimeZone] = useState("");
  const [schedule, setSchedule] = useState(initialSchedule);
  const [maxBookingPeriod, setMaxBookingPeriod] = useState("");
  const [noticePeriod, setNoticePeriod] = useState("");
  const [calendarSync, setCalendarSync] = useState("");
  const [applyToAll, setApplyToAll] = useState(false);

  const handleScheduleChange = (day, field, value, index) => {
    setSchedule(prev => {
      const newSchedule = { ...prev };
      if (newSchedule[day]) {
        newSchedule[day].slots[index][field] = value;
      }
      return newSchedule;
    });
  };

  const handleApplyToAllChange = (checked) => {
    setApplyToAll(checked);
    if (checked) {
      const mondaySchedule = schedule.Monday.slots.map(slot => ({ ...slot }));
      setSchedule(prev => {
        const newSchedule = { ...prev };
        Object.keys(newSchedule).forEach(day => {
          if (day !== "Monday" && newSchedule[day]) {
            newSchedule[day].slots = [...mondaySchedule];
          }
        });
        return newSchedule;
      });
    } else {
      setSchedule(initialSchedule); // Reset schedule to initial state
    }
  };

  const addTimeSlot = (day) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: [...prev[day].slots, { startTime: "", endTime: "" }]
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <form className="availability-form" onSubmit={handleSubmit}>
      <div className="form-group form-timezone">
        <label>TimeZone:</label>
        <select value={selectedTimeZone} onChange={(e) => setSelectedTimeZone(e.target.value)}>
          {timeZones.map(tz => <option key={tz} value={tz}>{tz}</option>)}
        </select>
      </div>

      <label>Schedule:</label>
      <div className="form-group schedule-group">
        {Object.keys(schedule).map((day, index) => (
          <React.Fragment key={day}>
            <div className="schedule-item">
              <label>
                <input
                  type="checkbox"
                  checked={schedule[day].checked}
                  onChange={(e) => {
                    const { checked } = e.target;
                    setSchedule(prev => ({
                      ...prev,
                      [day]: { ...prev[day], checked }
                    }));
                  }}
                />
                {day}
              </label>
              <div className='time-slots-icon'>

              <div className="time-selectors">
                {schedule[day].slots && schedule[day].slots.map((slot, slotIndex) => (
                  <div key={slotIndex} className="time-selector">
                    <input
                      type="time"
                      value={slot.startTime}
                      onChange={(e) => handleScheduleChange(day, 'startTime', e.target.value, slotIndex)}
                      disabled={!schedule[day].checked}
                    />
                    <span> - </span>
                    <input
                      type="time"
                      value={slot.endTime}
                      onChange={(e) => handleScheduleChange(day, 'endTime', e.target.value, slotIndex)}
                      disabled={!schedule[day].checked}
                    />
                  </div>
                ))}
              </div>
              <IoIosAddCircleOutline className="add-slot-icon" onClick={() => addTimeSlot(day)} />
              </div>
            </div>
            {day === "Monday" && (
              <div className="apply-to-all">
                <label>
                  <input
                    type="checkbox"
                    checked={applyToAll}
                    onChange={(e) => handleApplyToAllChange(e.target.checked)}
                  />
                  Apply to all other days
                </label>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="form-group ">
        <label>Maximum booking period: <span className="note">How far in the future do you want to allow the bookings to be made?</span></label>
        <input type="date" value={maxBookingPeriod} onChange={(e) => setMaxBookingPeriod(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Minimum Notice Period: <span className="note">What is the minimum notice period you want between the call booking and the actual call?</span></label>
        <select value={noticePeriod} onChange={(e) => setNoticePeriod(e.target.value)}>
          {noticePeriods.map(period => <option key={period} value={period}>{period}</option>)}
        </select>
      </div>

      <div className="form-group">
        <label>Sync your calendar: <span className="note">Candidates will not be able to book sessions during the slots with existing events on your calendar</span></label>
        <select value={calendarSync} onChange={(e) => setCalendarSync(e.target.value)}>
          {calendars.map(cal => <option key={cal} value={cal}>{cal}</option>)}
        </select>
      </div>

      <div className="form-group">
        <label>Integrate your meeting tool:<span className="note">Candidates will not be able to book sessions during the slots with existing events on your calendar</span> </label>
        <input type="text" placeholder="Enter meeting tool integration details" />
      </div>

      <div className="form-buttons">
        <button type="button" className="cancel-button" onClick={() => {/* handle cancel logic */ }}>Cancel</button>
        <button type="submit" className="save-button">Save</button>
      </div>
    </form>
  );
}

export default YourAvailability;
