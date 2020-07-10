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

function sizedIcons(iconSize){
    return  {
    "work": <WorkIcon size={iconSize}/>,
    "school": <SchoolIcon size={iconSize}/>,
    "star": <StarIcon size={iconSize}/>,
    "light": <FaLightbulb size={iconSize}/>,
    "python": <FaPython size={iconSize}/>,
    "fingerprint": <MdFingerprint size={iconSize}/>,
    "android": <MdAndroid size={iconSize}/>,
    "globe": <MdLanguage size={iconSize}/>,
    "Building": <MdAccountBalance size={iconSize}/>,
    "account": <MdAccountCircle size={iconSize}/>,
    "puzzle": <MdExtension size={iconSize}/>,
    "camera": <AiFillCamera size={iconSize}/>,
    "phone": <AiFillPhone size={iconSize}/>,
    "bug": <MdBugReport size={iconSize}/>,
    "screen": <MdImportantDevices size={iconSize}/>,
    "event": <MdEvent size={iconSize} />
        }
}

export const TableIcons = sizedIcons(25);

export const TimelineIcons = sizedIcons(16);
