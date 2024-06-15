import React, { useState } from 'react';
import { BsArrowDownLeft } from "react-icons/bs";
import { IoMdTimer } from "react-icons/io";
import { MdOutlineMessage } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import {  FaInfo } from "react-icons/fa6";
import { MdOutlineDone } from "react-icons/md";

import './Requests.css';

function Requests() {
  const [visibleDetailsId, setVisibleDetailsId] = useState(null);
  const [visibleRescheduleId, setVisibleRescheduleId] = useState(null);

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

  const requests = [
    { id: 1, name: "Vishwa Vijay Rana", email: "ranavishwvijay@gmail.com" },
    { id: 2, name: "Manas Bora", email: "manas@gmail.com" },
    { id: 3, name: "Inderjeet Singh", email: "inder@gmail.com" }
  ];

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
              <p><span>Mock Interview </span>|<span> 30 minutes</span></p>
              <p>27th August 2024, Monday  |  20:00 PM </p>
              <br></br>
              <p className='description'>Lorem ipsum dolor sit amet consectetur. Est ut mauris ut consequat platea lorem tincidunt. Vestibulum odio nunc vitae dignissim maecenas aliquet sapien sed imperdiet. Ridiculus nulla placerat augue eu blandit sed. Arcu orci adipiscing nulla imperdiet eu erat eget amet enim. Dolor neque ac sed scelerisque nibh id phasellus diam. Id feugiat mattis nulla enim pellentesque nunc viverra duis hendrerit. Vitae amet orci ullamcorper arcu.</p>
            </div>
          )}

          {visibleRescheduleId === request.id && (
            <div className="details-section">
              <p>Reschedule</p>
              <br></br>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Requests;
