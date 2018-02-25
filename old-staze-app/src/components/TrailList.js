import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import TrailTile from '../components/TrailTile';
import { GridList } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';

class TrailList extends React.Component {
    constructor(params) {
        super(params);
        this.state = {};
    }
    renderTrailsGrid(trails) {
        const styles = {
            root: {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
            },
            gridList: {
                width: '100%',
                height: '100%',
                overflowY: 'auto',
            },
        };
        return (<div style={styles.root}>
            <GridList
                cellHeight={180}
                style={styles.gridList}
            >
                <Subheader>December</Subheader>
                { trails.map((t, i) => <TrailTile trail={t} key={`trailIdx${i}`}/>) }
            </GridList>
        </div>);
    }

    render() {
        if (this.props.trails === undefined || this.props.map === undefined) {
            return (<CircularProgress size={120} thickness={5} />);
        }
        return (<div className="content">
            {this.renderTrailsGrid(this.props.trails)}
        </div>);
    }
}

export default TrailList;
