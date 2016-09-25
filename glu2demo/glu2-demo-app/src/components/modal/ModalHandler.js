import React from 'react';
import BusComponent from '../BusComponent';

class ModalHandler extends BusComponent {
    constructor(props) {
        super(props);
        this.state = {
            modalContent: null,
            modalActions: null,
        };

        this.bindGluBusEvents({
            OPEN_MODAL: this.onOpenModal,
            CLOSE_MODAL: this.onCloseModal,
        });
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
    }

    onOpenModal(modal) {
        this.setState(modal);
    }

    onCloseModal() {
        this.setState({
            modalContent: null,
            modalActions: null,
        });
    }

    render() {
        let modalContent, modalHolderStyle;
        if (this.state.modalContent) {
            modalContent = (<div>
                    {this.state.modalContent}
                </div>);
            modalHolderStyle = {
                position: 'fixed',
                backgroundColor: 'silver',
                top: '0px',
                left: '0px',
                right: '0px',
                bottom: '0px',
            };
        } else {
            modalHolderStyle = { display: 'none' };
        }
        return (<div style={modalHolderStyle}>
                <button onClick={this.onCloseModal.bind(this)}>X</button>
                {modalContent}
                {this.state.modalActions}
            </div>);
    }
}

export default ModalHandler;
