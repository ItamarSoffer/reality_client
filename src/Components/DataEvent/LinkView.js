import React from 'react';
import {message, Popover, Tag, Typography} from 'antd';
import {CopyToClipboard} from 'react-copy-to-clipboard';


const {Text, Paragraph} = Typography;

/*
Renders the link in the timeline and table.
this will allow to preform advance actions:
    - File: copies to clipboard
    - Iframe: nicer present
    - Regular link: just show it.
 */

class LinkView extends React.Component{

    render() {
        let linkComponent = null;
        if (!this.props.link){
            linkComponent = null;
        }
        else if (this.props.link.indexOf("<iframe") > -1) {
            linkComponent =
                <div>
                    <Popover content={<Paragraph
                        style={{textAlign: 'center',width: '400px'}}>
                        {this.props.link}</Paragraph>}>

                        <Tag color={'#8c8c8c'} style={{fontSize: 14}}>
                         iFrame Attachment
                    </Tag>
                    </Popover>
                    <br/>
                    <br/>
                </div>

        }
        else if (this.props.link.indexOf("\\\\") === 0 || this.props.link.indexOf(":\\") === 1) {
            linkComponent =
                <div>
                    <Popover content={"Click to copy"}>
                        <CopyToClipboard text={this.props.link}
                                         onCopy={() => (message.success(`Path copied`))}>
                            <Text keyboard clickable>{this.props.link}</Text>
                        </CopyToClipboard>
                </Popover>
                <br/>
                <br/>
                </div>
        }
        else {
            linkComponent =
                <div>

                    <a href={this.props.link}
                       onClick={(event) => {
                           event.preventDefault();
                           window.open(this.props.link);}}
                    >{this.props.link}</a>
                    <br/>
                </div>

        }
        return linkComponent;
    }
}

export default LinkView