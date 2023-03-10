import "../Style/Dropdownpage.css"
import React from 'react'; 

const Icon = () => {
  return (
    <svg height="20" width="20%" viewBox="0 0 20 20">
    </svg>
  );
};

const Dropdownpage = ({ placeHolder }) => {
  const getDisplay = () => {
    return placeHolder;
  };

  return (
    <div className="dropdown-container">
       <div className="dropdown-text">
            <div className="dropdown-selected-value">{getDisplay()}</div>
            <div className="dropdown-tools">
              <div className="dropdown-tool">
            <Icon />
          </div>
          <div className="dropdown-container"></div>
            </div>
          </div>
    </div>
  );
};

export default Dropdownpage;