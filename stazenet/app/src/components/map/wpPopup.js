import React from 'react';
import BasePage from '../BasePage';
// import MessageEvents from '../../enums/MessageEvents';
import Enum from '../../enums/Enum';
// import Lang from '/helpers/Lang';


class wpPopup extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            map: this.props.map,
            position: null,
            feature: null,
            isVisible: false,
            isPinned: false,
        };
    }

    componentDidMount() {
        this.bindGluBusEvents({});
        this.emit(Enum.MapEvents.RETRIEVE_MAP_INIT);
    }

    componentWillReceiveProps(nextProps) {
        this.setState = ({ map: nextProps.map });
        this.state.map.on('mousemove', e => {
            const bbox = [[e.point.x - 5, e.point.y - 5], [e.point.x + 5, e.point.y + 5]];
            const features = this.state.map.queryRenderedFeatures(bbox, { layers: 'waypoints' });
            if (features.length > 0) {
                this.setState({
                    feature: features[0].properties,
                    position: e.point,
                    isVisible: true,
                });
            }
        });
        this.state.map.on('click', e => {
            const bbox = [[e.point.x - 5, e.point.y - 5], [e.point.x + 5, e.point.y + 5]];
            const features = this.state.map.queryRenderedFeatures(bbox, { layers: 'waypoints' });
            if (features.length > 0) {
                this.setState({
                    feature: features[0].properties,
                    position: e.point,
                    isPinned: true,
                });
            }
        });
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
        this.deactivateControllers();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.position) {
            const annotationBubbleHeight = document.getElementById('wp-popup').clientHeight;
            const annotationBubbleWidth = document.getElementById('wp-popup').clientWidth;
            if (((prevState.position.y + 10 + annotationBubbleHeight) > window.innerHeight) && ((prevState.position.x + 10 + annotationBubbleWidth) > window.innerWidth)) {
                if (!prevState.correctionRight && !prevState.correctionBottom) {
                    this.setState({
                        correctionRight: true,
                        correctionBottom: true,
                    });
                }
            } else if ((prevState.position.y + 10 + annotationBubbleHeight) > window.innerHeight) {
                if (!prevState.correctionBottom) {
                    this.setState({
                        correctionRight: false,
                        correctionBottom: true,
                    });
                }
            } else if ((prevState.position.x + 10 + annotationBubbleWidth) > window.innerWidth) {
                if (!prevState.correctionRight) {
                    this.setState({
                        correctionRight: true,
                        correctionBottom: false,
                    });
                }
            }
        }
    }

    render() {
        const style = {
            position: 'absolute',
            left: (this.state.correctionRight) ? 'auto' : this.state.position.x + 10,
            right: (this.state.correctionRight) ? 10 : 'auto',
            top: (this.state.correctionBottom) ? 'auto' : this.state.position.y + 10,
            bottom: (this.state.correctionBottom) ? 10 : 'auto',
        };
        return (<div
                    id="wp-popup"
                    className={'map-popup' + ((this.state.isVisible) ? ' visible' : '')}
                    style={style}
                >
                    {this.state.feature.name}
                </div>);
    }
}

export default wpPopup;
