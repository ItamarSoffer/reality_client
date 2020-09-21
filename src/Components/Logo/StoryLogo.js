import React from "react";


export default class StoryLogo extends React.Component{

    render() {
        if (this.props.size){
        return (
            <img src={`${process.env.PUBLIC_URL}/StoryLogo.png`} alt={'Story Logo'} width={`${this.props.size}`}/>
        )
    }
    else {
        return (
            <img src={`${process.env.PUBLIC_URL}/StoryLogo.png`} alt={'Story Logo'} width={'10%'}/>
        )
    }
    }
}