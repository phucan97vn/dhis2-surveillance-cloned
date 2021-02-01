import React from "react";

function View(props) {
    const {title, description, organization, period, result} = props.data;
  
    return (
        <div className="view border border-2 rounded col-md col-sm-3 grid-item">
            <div className="dashboard-item-header-title">
                <span>{title}</span>
            </div>
            <div className="dashboard-item-content">
                <p className="description">{description}</p>
                <p>
                    {organization} - {period}
                </p>

                <p className="result">{result !== "" ? result : "No data"}</p>
            </div>
        </div>
    );
}

export default View;
