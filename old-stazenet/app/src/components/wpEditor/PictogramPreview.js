import React from 'react';
import BasePage from '../BasePage';
import Enum from '/enums/Enum';
import Paper from 'material-ui/Paper';
import ImagePreview from '../common/ImagePreview';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';

class PictogramPreview extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            wpIndex: null,
        };
    }

    componentDidMount() {
        this.bindGluBusEvents({
            [Enum.AppEvents.PREVIEW_PICTOGRAM]: this.onDisplayWpRequest,
        });
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
    }

    componentDidUpdate() {
        this.emit(Enum.DataEvents.RETRIEVE_TRAIL_DATA);
    }

    onDisplayWpRequest(payload) {
        this.setState({
            wpIndex: payload.wpIndex,
        });
    }

    render() {
        if (this.state.wpIndex === null) {
            return null;
        }
        const styles = {
            container: {
                height: 200,
                width: 350,
                margin: 20,
                textAlign: 'center',
                // display: 'inline-block',
                position: 'absolute',
                right: '35px',
                top: '50px',
            },
            pictogram: {
                flexBase: '200px',
            },
            chip: {
                margin: 4,
                fontSize: '12px!important',
            },
            avatar: {
                fontSize: '12px',
            },
        };

        return (
        <div className={'flex-container row'} style={styles.container}>
            <div className={'flex-container column pictogram'}>
                <Paper zDepth={1}>
                    <ImagePreview
                        fieldName={'waypoints'}
                        fieldIndex={this.state.wpIndex}
                        fieldProp={'pictogram'}
                    />
                </Paper>
            </div>
            <div className={'flex-container column narower2'}>
                <div className={'flex-element'} style={styles.avatar}><Chip style={styles.chip}><Avatar size={16}>V</Avatar>Voda</Chip></div>
                <div className={'flex-element'} style={styles.avatar}><Chip style={styles.chip}><Avatar size={16}>Z</Avatar>Zabranjeno</Chip></div>
                <div className={'flex-element'} style={styles.avatar}><Chip style={styles.chip}><Avatar size={16}>N</Avatar>Naselje/kuce</Chip></div>
                <div className={'flex-element'} style={styles.avatar}><Chip style={styles.chip}><Avatar size={16}>M</Avatar>Most</Chip></div>
                <div className={'flex-element'} style={styles.avatar}><Chip style={styles.chip}><Avatar size={16}>R</Avatar>Rijeka/potok</Chip></div>
                <div className={'flex-element'} style={styles.avatar}><Chip style={styles.chip}><Avatar size={16}>O</Avatar>Odmoriste/izlet</Chip></div>
                <div className={'flex-element'} style={styles.avatar}><Chip style={styles.chip}><Avatar size={16}>H</Avatar>Hrana/restoran</Chip></div>
                <div className={'flex-element'} style={styles.avatar}><Chip style={styles.chip}><Avatar size={16}>D</Avatar>Planinarski dom</Chip></div>
                <div className={'flex-element'} style={styles.avatar}><Chip style={styles.chip}><Avatar size={16}>P</Avatar>Planinski prevoj</Chip></div>
                <div className={'flex-element'} style={styles.avatar}><Chip style={styles.chip}><Avatar size={16}>T</Avatar>Tunel</Chip></div>
                <div className={'flex-element'} style={styles.avatar}><Chip style={styles.chip}><Avatar size={16}>L</Avatar>Livada</Chip></div>
                <div className={'flex-element'} style={styles.avatar}><Chip style={styles.chip}><Avatar size={16}>S</Avatar>Suma</Chip></div>
                <div className={'flex-element'} style={styles.avatar}><Chip style={styles.chip}><Avatar size={16}>K</Avatar>Kamenjar</Chip></div>
                <div className={'flex-element'} style={styles.avatar}><Chip style={styles.chip}><Avatar size={16}>G</Avatar>Grad/urbano</Chip></div>
            </div>
        </div>);
    }
}

export default PictogramPreview;
