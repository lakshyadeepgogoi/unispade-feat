import React, { useState } from 'react';
import { BsArrowDownLeft } from "react-icons/bs";
import { IoMdTimer } from "react-icons/io";
import { MdOutlineMessage, MdOutlineDone } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { FaInfo } from "react-icons/fa6";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import './Requests.css';

function Requests() {
  const [visibleDetailsId, setVisibleDetailsId] = useState(null);
  const [visibleRescheduleId, setVisibleRescheduleId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [requests, setRequests] = useState([
    { id: 1, name: "Vishwa Vijay Rana", email: "ranavishwvijay@gmail.com", interviewDate: "27th August 2024, Monday", interviewStartTime: "20:00 PM", interviewEndTime: "21:00 PM" },
    { id: 2, name: "Manas Bora", email: "manas@gmail.com", interviewDate: "27th August 2024, Monday", interviewStartTime: "20:30 PM", interviewEndTime: "21:30 PM" },
    { id: 3, name: "Inderjeet Singh", email: "inder@gmail.com", interviewDate: "27th August 2024, Monday", interviewStartTime: "19:00 PM", interviewEndTime: "20:30 PM" }
  ]);

  const toggleDetails = (id) => {
    if (visibleDetailsId === id) {
      setVisibleDetailsId(null);
    } else {
      setVisibleDetailsId(id);
      setVisibleRescheduleId(null); // Close reschedule section if open
    }
  };

  const toggleReschedule = (id) => {
    if (visibleRescheduleId === id) {
      setVisibleRescheduleId(null);
    } else {
      setVisibleRescheduleId(id);
      setVisibleDetailsId(null); // Close details section if open
    }
  };

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  const handleReschedule = (requestId) => {
    const updatedRequests = requests.map(request => {
      if (request.id === requestId) {
        return {
          ...request,
          interviewDate: formatDate(selectedDate),
          interviewStartTime: formatTime(startTime),
          interviewEndTime: formatTime(endTime)
        };
      }
      return request;
    });

    setRequests(updatedRequests);
    setVisibleRescheduleId(null);
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const formattedHour = (hour % 12 || 12).toString(); // Convert to 12-hour format
    const period = hour >= 12 ? 'PM' : 'AM';
    return `${formattedHour}:${minutes} ${period}`;
  };

  const calculateDuration = (start, end) => {
    const startHours = parseInt(start.split(':')[0], 10);
    const startMinutes = parseInt(start.split(':')[1], 10);
    const endHours = parseInt(end.split(':')[0], 10);
    const endMinutes = parseInt(end.split(':')[1], 10);

    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;

    return endTotalMinutes - startTotalMinutes;
  };

  return (
    <div className="requests-container">
      {requests.map((request) => (
        <div key={request.id} className="request-container">
          <div className="request-item">
            <div className="request-header">
              <div className='profile-img'></div>
              <p>{request.name} | <span>{request.email}</span></p>
              <BsArrowDownLeft className="icon top-right" />
            </div>
            <div className="request-actions">
              <div className={`action-item ${visibleRescheduleId === request.id ? 'active' : ''}`} onClick={() => toggleReschedule(request.id)}>
                <IoMdTimer />
                <p>Reschedule</p>
              </div>
              <button className="action-button">
                <MdOutlineMessage />
              </button>
              <button className="action-button">
                <MdOutlineDone />
              </button>
              <button className="action-button">
                <RxCross2 />
              </button>
              <button
                className={`action-button ${visibleDetailsId === request.id ? 'active' : ''}`}
                onClick={() => toggleDetails(request.id)}
              >
                <FaInfo />
              </button>
            </div>
          </div>

          {visibleDetailsId === request.id && (
            <div className="details-section">
              <p><span>Mock Interview </span>| <span>{calculateDuration(request.interviewStartTime, request.interviewEndTime)} minutes</span></p>
              <p>{request.interviewDate} | {request.interviewStartTime}</p>
              <br></br>
              <p className='description'>Lorem ipsum dolor sit amet consectetur. Est ut mauris ut consequat platea lorem tincidunt. Vestibulum odio nunc vitae dignissim maecenas aliquet sapien sed imperdiet. Ridiculus nulla placerat augue eu blandit sed. Arcu orci adipiscing nulla imperdiet eu erat eget amet enim. Dolor neque ac sed scelerisque nibh id phasellus diam. Id feugiat mattis nulla enim pellentesque nunc viverra duis hendrerit. Vitae amet orci ullamcorper arcu.</p>
            </div>
          )}

          {visibleRescheduleId === request.id && (
            <div className="details-section">
              <div className='reschedule-section'>
                <div className="calendar-container">
                  <p>Select day</p>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="dd/MM/yyyy"
                    inline
                  />
                </div>

                <div className="time-slot-container">
                  <p>Select time slots</p>
                  <div className="time-selector">
                    <input
                      type="time"
                      value={startTime}
                      onChange={handleStartTimeChange}
                      className="time-input"
                    />
                    <span> - </span>
                    <input
                      type="time"
                      value={endTime}
                      onChange={handleEndTimeChange}
                      className="time-input"
                    />
                  </div>
                </div>
              </div>

              <div className="buttons-container">
                <button className="cancel-button" onClick={() => setVisibleRescheduleId(null)}>Cancel</button>
                <button className="reschedule-button" onClick={() => handleReschedule(request.id)}>Reschedule</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Requests;
