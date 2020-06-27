import React from 'react';

import {
    MdWork as WorkIcon,
    MdSchool as SchoolIcon,
    MdFingerprint,
    MdAndroid,
    MdLanguage,
    MdAccountBalance,
    MdAccountCircle,
    MdExtension,
    MdBugReport,
    MdImportantDevices,
    MdEvent
} from "react-icons/md";
import {
  AiFillStar as StarIcon,
    AiFillCamera,
    AiFillPhone
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
    "globe": <MdLanguage/>,
    "Building": <MdAccountBalance/>,
    "account": <MdAccountCircle/>,
    "puzzle": <MdExtension/>,
    "camera": <AiFillCamera/>,
    "phone": <AiFillPhone/>,
    "bug": <MdBugReport/>,
    "screen": <MdImportantDevices/>,
    "event": <MdEvent/>


};

export default TimelineIcons;
