import React, { useState } from 'react';
import './YourAvailability.css';
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";

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

  const noticePeriods = ["1 day ", "2 days "];
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
          newSchedule[day] = {
            ...newSchedule[day],
            checked: true,
            slots: [...mondaySchedule]
          };
        });
        return newSchedule;
      });
    } else {
      setSchedule(initialSchedule); 
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

  const removeTimeSlot = (day, slotIndex) => {
    setSchedule(prev => {
      const newSchedule = { ...prev };
      
      if (slotIndex !== 0) {
        newSchedule[day].slots.splice(slotIndex, 1);
      }
      return newSchedule;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <form className="availability-form" onSubmit={handleSubmit}>
      <div className='form-div'>
        <div className="form-group form-timezone">
          <label>TimeZone:</label>
          <select value={selectedTimeZone} onChange={(e) => setSelectedTimeZone(e.target.value)} className="custom-select">
            {timeZones.map(tz => <option key={tz} value={tz}>{tz}</option>)}
          </select>
        </div>

        <label className='label-schedule'>Schedule:</label>
        <br></br>
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
                <div>

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
                          {slotIndex !== 0 && (
                            <MdOutlineCancel
                              className="cancel-slot-icon"
                              onClick={() => removeTimeSlot(day, slotIndex)}
                            />
                          )}
                          {slotIndex === 0 && (
                            <IoIosAddCircleOutline
                              className="add-slot-icon"
                              onClick={() => addTimeSlot(day)}
                            />
                          )}
                        </div>
                      ))}

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
                </div>
              </div>

            </React.Fragment>
          ))}
        </div>

        <div className="form-group ">
          <label>Maximum booking period: </label>
          <div className='form-caption'>

            <input type="date" value={maxBookingPeriod} onChange={(e) => setMaxBookingPeriod(e.target.value)} />

            <span className="note">How far in the future do you want to allow the bookings to be made?</span>
          </div>
        </div>

        <div className="form-group">
          <label>Minimum Notice Period: </label>
          <div className='form-caption'>
            <select value={noticePeriod} onChange={(e) => setNoticePeriod(e.target.value)} className="custom-select">
              {noticePeriods.map(period => <option key={period} value={period}><span className='notice-period-dropdown'>{period}</span>before the call</option>)}
            </select>

            <span className="note">What is the minimum notice period you want between the call booking and the actual call?</span>

          </div>
        </div>

        <div className="form-group">
          <label>Sync your calendar:</label>
          <div className='form-caption'>
            <select value={calendarSync} onChange={(e) => setCalendarSync(e.target.value)} className="custom-select">
              {calendars.map(cal => <option key={cal} value={cal}>{cal}</option>)}
            </select>

            <span className="note">Candidates will not be able to book sessions during the slots with existing events on your calendar</span>

          </div>
        </div>

        <div className="form-group">
          <label>Integrate your meeting tool: </label>

          <div className='form-caption'>
            <input type="text" placeholder="Enter meeting tool integration details" />
            <span className="note">Candidates will not be able to book sessions during the slots with existing events on your calendar</span>

          </div>
        </div>

        <div className="form-buttons">
          <button type="button" className="cancel-button" onClick={() => {/* handle cancel logic */ }}>Cancel</button>
          <button type="submit" className="save-button">Save</button>
        </div>
      </div>

    </form>
  );
}

export default YourAvailability;

