import React from 'react';
import { GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

class TrailTile extends React.Component {
    constructor(params) {
        super(params);
        this.state = {};
    }

    onMissingImage(image) {
        image.target.src = '//www.mtb.ba/wp-content/uploads/2017/07/DSC_1852.jpg';
    }

    render() {
        return (<GridTile
            className="grid__tile"
            key={this.props.trail.trailID}
            title={this.props.trail.name}
            subtitle={<span>by <b>{this.props.trail.ownerID}</b></span>}
            actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
        >
            <img src={this.props.trail.imageUrl} onError={this.onMissingImage.bind(this)}/>
        </GridTile>);
    }
}

export default TrailTile;
