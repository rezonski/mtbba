import React from 'react';
import BusComponent from '../BusComponent';
import RenameModal from './RenameModal';

class Rename extends BusComponent {
    constructor(props) {
        super(props);
        this._newTitle = this.props.project.title;
        this.bindGluBusEvents({
            PROJECT_CHANGED: this.onProjectChange,
        });
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
    }

    onProjectChange(project) {
        if (this.props.project.id === project.id) {
            this.emit('CLOSE_MODAL');
        }
    }

    onUpdateTitle(newTitle) {
        this._newTitle = newTitle;
    }

    onSaveClick() {
        this.emit('UPDATE_PROJECT', {
            project: this.props.project,
            value: this._newTitle,
            field: 'title',
        });
    }

    onCancelClick() {
        this.emit('CLOSE_MODAL');
    }

    onShowRenamePopupClick(e) {
        e.stopPropagation();
        e.preventDefault();
        const modalContent = <RenameModal project={this.props.project} onRename={this.onUpdateTitle.bind(this)} />;
        const modalActions = [
            <button key="cancel" onClick={this.onCancelClick.bind(this)}>Cancel</button>,
            <button key="save" onClick={this.onSaveClick.bind(this)}>Save</button>,
        ];
        this.emit('OPEN_MODAL', { modalContent, modalActions });
    }

    render() {
        return (<span onClick={this.onShowRenamePopupClick.bind(this)}>Rename</span>);
    }
}

export default Rename;
