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
    MdEvent,
    MdPlace,
    MdEmail,
    MdMouse
} from "react-icons/md";
import {
    AiFillStar as StarIcon,
    AiFillCamera,
    AiFillPhone,
    AiFillClockCircle,
    AiFillCode,

} from "react-icons/ai";
import { FaLightbulb, FaPython } from "react-icons/fa";
import {
    CgMouse,
    CgMail,
    CgMagnet,
    CgUsb,
    CgSmartphone,
    CgLock,

} from "react-icons/cg";

import {VscGraph } from "react-icons/vsc";
import { GiUsbKey} from "react-icons/gi";
import { RiLockFill, RiSmartphoneFill} from "react-icons/ri";


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
        "event": <MdEvent size={iconSize} />,
        "time": <AiFillClockCircle size={iconSize} />,
        "code": <AiFillCode size={iconSize} />,
        "mouse": <MdMouse size={iconSize} />,
        "mail": <MdEmail size={iconSize} />,
        "magnet": <CgMagnet size={iconSize} />,
        "usb": <GiUsbKey size={iconSize} />,
        "smartphone": <RiSmartphoneFill size={iconSize} />,//change
        "lock": <RiLockFill size={iconSize} />,
        "graph": <VscGraph size={iconSize} />,
        "place": <MdPlace size={iconSize} />,
    }
}

export const TableIcons = sizedIcons(25);

export const FilterTableIcons = sizedIcons(20);

export const TimelineIcons = sizedIcons(16);

export const AboutTableIcons = sizedIcons(25);
