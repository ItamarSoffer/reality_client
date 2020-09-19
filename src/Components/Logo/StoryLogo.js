import React from "react";


export default function StoryLogo(size) {
    if (typeof size === 'string' && size.length > 0){
        return (
            <img src={`${process.env.PUBLIC_URL}/StoryLogo.png`} width={`${size}`}/>
        )
    }
    else {
        return (
            <img src={`${process.env.PUBLIC_URL}/StoryLogo.png`} width={'10%'}/>
        )
    }


}