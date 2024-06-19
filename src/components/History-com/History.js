import React, { useState } from 'react';
import { BsArrowDownLeft } from "react-icons/bs";
import { IoIosAdd, IoIosStar, IoIosStarOutline } from "react-icons/io";
import { FaInfo, FaArrowRight } from "react-icons/fa";
import { MdOutlineReviews } from "react-icons/md";
import { BiBuildings } from "react-icons/bi";
import { MdOutlineAccountCircle } from "react-icons/md";
import { AiOutlineDatabase } from "react-icons/ai";

import './History.css';

function History() {
  const [visibleDetailsId, setVisibleDetailsId] = useState(null);
  const [visiblePoolId, setVisiblePoolId] = useState(null);
  const [visibleRateId, setVisibleRateId] = useState(null);

  const toggleDetails = (id) => {
    if (visibleDetailsId === id) {
      setVisibleDetailsId(null);
    } else {
      setVisibleDetailsId(id);
      setVisiblePoolId(null);
      setVisibleRateId(null);
    }
  };

  const togglePool = (id) => {
    if (visiblePoolId === id) {
      setVisiblePoolId(null);
    } else {
      setVisiblePoolId(id);
      setVisibleDetailsId(null);
      setVisibleRateId(null);
    }
  };

  const toggleRate = (id) => {
    if (visibleRateId === id) {
      setVisibleRateId(null);
    } else {
      setVisibleRateId(id);
      setVisibleDetailsId(null);
      setVisiblePoolId(null);
    }
  };

  // Sample pool data for demonstration
  const poolData = [
    { type: 'Business Development Specialists', count: 12, icon: <BiBuildings /> },
    { type: 'Data Analysts', count: 5, icon: <MdOutlineAccountCircle /> },
    { type: 'Data Engineers', count: 20, icon: <AiOutlineDatabase /> },
    { type: 'Software Developers - MERN Stack', count: 8, icon: <MdOutlineAccountCircle /> }
  ];

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
              <div className={`action-item new-class ${visiblePoolId === request.id ? 'active' : ''}`} onClick={() => togglePool(request.id)}>
                <FaArrowRight />
                <p>Add to pool</p>
              </div>
              <button className={`action-item new-class ${visibleRateId === request.id ? 'active' : ''}`} onClick={() => toggleRate(request.id)}>
                <MdOutlineReviews />
                <p>Rate and review</p>
              </button>
              <button
                className={`action-button new-class ${visibleDetailsId === request.id ? 'active' : ''}`}
                onClick={() => toggleDetails(request.id)}
              >
                <FaInfo />
              </button>
            </div>
          </div>

          {visibleDetailsId === request.id && (
            <div className="details-section new-class">
              <p><span>Mock Interview </span>|<span> 30 minutes</span></p>
              <p>27th August 2024, Monday  |  20:00 PM </p>
              <br></br>
              <p className='description'>Lorem ipsum dolor sit amet consectetur. Est ut mauris ut consequat platea lorem tincidunt. Vestibulum odio nunc vitae dignissim maecenas aliquet sapien sed imperdiet. Ridiculus nulla placerat augue eu blandit sed. Arcu orci adipiscing nulla imperdiet eu erat eget amet enim. Dolor neque ac sed scelerisque nibh id phasellus diam. Id feugiat mattis nulla enim pellentesque nunc viverra duis hendrerit. Vitae amet orci ullamcorper arcu.</p>
            </div>
          )}

          {visiblePoolId === request.id && (
            <div className="details-section new-class">
              <div className='pool'>
                <div className='pool-column'>
                  {poolData.map((item, index) => (
                    <div key={index} className='pool-item'>
                      {item.icon}
                      <p>{item.type}  |  {item.count}</p>
                    </div>
                  ))}
                </div>

                <div className='pool-column'>
                  {[1, 2, 3, 4].map((item, index) => (
                    <div key={index} className='pool-item add-to-pool' onClick={() => console.log('Added to pool')}>
                      <IoIosAdd />
                      <p>Add to pool</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {visibleRateId === request.id && (
            <div className="details-section new-class rate">
              <div className='rate-container'>
                <p className='fonts'><strong>Rating</strong></p>
                <div className="rating-stars">
                  {/* Assuming you want 5 stars */}
                  <div className='rating-container'>
                    {[...Array(5)].map((star, index) => (
                      <span key={index} className="star" onClick={() => console.log(`Clicked star ${index + 1}`)}>
                        {index < 5 ? <IoIosStar /> : <IoIosStarOutline />}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="review-section">
                  <p><strong>Review</strong></p>
                  <div className="review-input">
                    <textarea name="message" rows="3" cols="40" style={{ resize: 'none' }} />
                  </div>

                  <div className="review-buttons">
                    <button className="cancel-button">Cancel</button>
                    <button className="publish-button">Publish Review</button>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default History;
