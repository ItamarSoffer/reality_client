import React from 'react';
import {Modal} from "antd";
import {controlShortcutsModalAction} from "../../Actions/modalsActions";
import {connect} from "react-redux";
import ShortcutsAbout from "../AboutSider/ShortcutsAbout";


class ShortcutsModal extends React.Component {


    handleOk = () => {
        // console.log(e);
        this.props.hideShortcutsModal();
        this.setState({
            visible: false,
        });
    };

    handleCancel = () => {
        // console.log(e);
        this.props.hideShortcutsModal();
        this.setState({
            visible: false,
        });
    };


    render() {
        return (
            <Modal
                title="Story Shortcuts"
                visible={this.props.showShortcutsModal}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                style={{borderRadius: '16px',}}
                footer={null}
            >
                <ShortcutsAbout/>
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
        showShortcutsModal: state.modalsReducer.showShortcutsModal,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        hideShortcutsModal: () => {
            dispatch(controlShortcutsModalAction(false))
        }
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(ShortcutsModal);
