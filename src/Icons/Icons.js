import React from 'react';
import {
    MdWork as WorkIcon,
    MdSchool as SchoolIcon,
    MdFingerprint,
    MdAndroid,
    MdLanguage} from "react-icons/md";
import {
  AiFillStar as StarIcon,
} from "react-icons/ai";
import { FaLightbulb, FaPython } from "react-icons/fa";

const TimelineIcons = {
    "work": <WorkIcon/>,
    "school": <SchoolIcon/>,
    "star": <StarIcon/>,
    "light": <FaLightbulb/>,
    "python": <FaPython/>,
    "fingerprint": <MdFingerprint/>,
    "android": <MdAndroid/>,
    "globe": <MdLanguage/>
};

export default TimelineIcons;
