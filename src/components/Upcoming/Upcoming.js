import React, { useContext, useState } from 'react';
import { IoMdTimer } from "react-icons/io";
import { MdOutlineMessage, MdOutlineDone } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { FaInfo } from "react-icons/fa6";
import { UpcomingContext } from '../../context/UpcomingContext';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './Upcoming.css'; // Corrected CSS path

function Upcoming() {
  const { upcomingRequests, addUpcomingRequest } = useContext(UpcomingContext);

  const [visibleDetailsId, setVisibleDetailsId] = useState(null);
  const [visibleRescheduleId, setVisibleRescheduleId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const toggleDetails = (id) => {
    if (visibleDetailsId === id) {
      setVisibleDetailsId(null); // Toggle off if already visible
    } else {
      setVisibleDetailsId(id);
      setVisibleRescheduleId(null); // Close reschedule section if open
    }
  };

  const toggleReschedule = (id) => {
    if (visibleRescheduleId === id) {
      setVisibleRescheduleId(null); // Toggle off if already visible
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
    const updatedRequests = upcomingRequests.map(request => {
      if (request.id === requestId) {
        return {
          ...request,
          interviewDate: selectedDate,
          interviewStartTime: startTime,
          interviewEndTime: endTime
        };
      }
      return request;
    });

    // Update the context with the new list of requests
    // This part should ideally call a function from UpcomingContext to update the context state.
    // Assuming addUpcomingRequest is used to add, you should also have a method to update existing requests.
    // setRequests(updatedRequests);
    setVisibleRescheduleId(null);
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
      {upcomingRequests.map((request) => (
        <div key={request.id} className="request-container">
          <div className="request-item">
            <div className="request-header">
              <div className='profile-img'></div>
              <p>{request.name} | <span>{request.email}</span></p>
            </div>
            <div className="request-actions">
              <div className={`action-item ${visibleRescheduleId === request.id ? 'active' : ''}`} onClick={() => toggleReschedule(request.id)}>
                <IoMdTimer />
                <p>{visibleRescheduleId === request.id ? "Resudule" : "Reschedule"}</p> {/* Conditionally render "Resudule" */}
              </div>
              <button className="action-button">
                <MdOutlineMessage />
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
              
              <div className='details-container'>
                <div>
                <p><span>Mock Interview </span>| <span>{calculateDuration(request.interviewStartTime, request.interviewEndTime)} minutes</span></p>
                <p>{request.interviewDate} | {request.interviewStartTime}</p>
              </div>
              <button className='join-button'>
                Join the call
              </button>

                </div>
              <br></br>
              <p className='description'>{request.description}</p>
            </div>
          )}

          {visibleRescheduleId === request.id && (
            <div className="details-section">
              <div className='details-section-container'>
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
                      <div className="time-slot">
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
                </div>

                <div className="buttons-container">
                  <button className="cancel-button" onClick={() => setVisibleRescheduleId(null)}>Cancel</button>
                  <button className="reschedule-button" onClick={() => handleReschedule(request.id)}>Reschedule</button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Upcoming;
