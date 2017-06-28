import React from 'react';
import BasePage from '../BasePage';
import Enum from '/enums/Enum';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';

class MountainMultiSelection extends BasePage {
    constructor(props) {
        super(props);

        this.state = {
            initialSetup: {},
            mntns: [],
        };

        this.bindGluBusEvents({
        });
    }

    componentDidMount() {
        this.bindGluBusEvents({
            [Enum.DataEvents.TRAIL_DATA_RETRIEVED]: this.onDataRetrieved,
            [Enum.MapEvents.INITIAL_DATA_SETUP_RETRIEVED]: this.onInitialSetupRetrieved,
        });
        this.emit(Enum.MapEvents.RETRIEVE_INITIAL_DATA_SETUP);
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
    }

    onFormChangeMountain(mntID, event, isChecked) {
        let temp = this.state.mntns;
        if (isChecked) {
            if (temp.indexOf(mntID) === -1) {
                temp.push(mntID);
            }
        } else {
            if (temp.indexOf(mntID) > -1) {
                temp.splice(temp.indexOf(mntID), 1);
            }
        }
        const payload = {
            name: 'mntns',
            value: temp,
        };
        this.emit(Enum.DataEvents.SAVE_TRAILDATA2MODEL, payload);
        this.setState({
            mntns: temp,
        });
    }

    onDataRetrieved(payload) {
        if (payload.mntns) {
            this.setState({
                mntns: payload.mntns,
            });
        }
    }

    onInitialSetupRetrieved(payload) {
        this.setState({
            initialSetup: payload,
        });
        this.emit(Enum.DataEvents.RETRIEVE_TRAIL_DATA);
    }

    render() {
        const styles = {
            checkbox: {
                marginBottom: 16,
            },
        };


        let mountainItems = [];

        if (this.state.initialSetup && this.state.initialSetup.countries) {
            this.state.initialSetup.countries.forEach((country, cIndex) => {
                // mountainItems.push(<MenuItem key={ 'country' + cIndex } value={undefined} primaryText={country.name + '(' + country.total + ')'} disabled={true}/>);
                mountainItems.push(<Checkbox key={ 'country' + cIndex } label={country.name + '(' + country.total + ')'} style={styles.checkbox} disabled={true}/>);
                this.state.initialSetup.mountains.forEach((mountain, mIndex ) => {
                    if (mountain.id_parent === country.id) {
                        // mountainItems.push(<MenuItem key={ 'mountain' + mIndex } value={mountain.id} primaryText={mountain.name + ' / ' + mountain.region + ' (' + mountain.total + ')'} />);
                        mountainItems.push(<Checkbox key={ 'mountain' + mIndex } checked={this.mntChecked(mountain.id)} onCheck={this.onFormChangeMountain.bind(this, mountain.id)} label={mountain.name + ' / ' + mountain.region + ' (' + mountain.total + ')'} style={styles.checkbox} />);
                    }
                });
                mountainItems.push(<Divider key={ 'country-divider' + cIndex }/>);
            });
        }

        return (<div className="list-container">{mountainItems}</div>);
    }

    mntChecked(mntID) {
        if (this.state.mntns.indexOf(mntID) > -1) {
            return true;
        }
        return false;
    }
}

export default MountainMultiSelection;
