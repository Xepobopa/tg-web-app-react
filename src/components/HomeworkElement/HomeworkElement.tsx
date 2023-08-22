import React from 'react';
import {Homework} from "../../type/homework";

const HomeworkElement = ({hw}: { hw: Homework }) => {

    return (
        <div>
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{hw.subject}</h5>
                <small>{new Date(hw.date.toString()).toDateString()}</small>
            </div>
            <p className="mb-1">{hw.title}</p>
        </div>
    );
};

export default HomeworkElement;