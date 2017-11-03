import React from 'react';
import BasePage from '../BasePage';
// import MessageEvents from '../../enums/MessageEvents';
import Enum from '../../enums/Enum';
// import Lang from '/helpers/Lang';


class WPPopup extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            position: null,
            feature: null,
            isVisible: false,
            isPinned: false,
        };
        // console.log('WPPopup bindGluBusEvents()');
    }

    componentDidMount() {
        // console.log('WPPopup componentDidMount()');
        this.bindGluBusEvents({
            [Enum.MapEvents.SAVE_LEFT_MAP]: this.initMap,
            [Enum.MapEvents.CONTROL_WP_POPUP]: this.onControlWP,
        });
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
        this.deactivateControllers();
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log('WPPopup componentDidUpdate()');
        if (prevState.position && this.state.position) {
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

    onControlWP(payload) {
        this.setState({
            position: payload.position,
            feature: payload.feature,
            isVisible: (payload.isVisible) ? payload.isVisible : this.state.isVisible,
            isPinned: (payload.isPinned) ? payload.isPinned : this.state.isPinned,
        });
    }

    render() {
        // console.log('WPPopup render()');
        if (!this.state.feature) {
            return null;
        }
        const style = {
            position: 'absolute',
            left: (this.state.correctionRight) ? 'auto' : this.state.position.x + 10,
            right: (this.state.correctionRight) ? 10 : 'auto',
            top: (this.state.correctionBottom) ? 'auto' : this.state.position.y + 10,
            bottom: (this.state.correctionBottom) ? 10 : 'auto',
        };
        // console.log(style);
        return (<div
                    id="wp-popup"
                    className={'map-popup' + ((this.state.isVisible) ? ' visible' : '')}
                    style={style}
                >
                    {this.state.feature.name}
                </div>);
    }

    initMap(map) {
        // console.log('WPPopup initMap()');
        this.setState({
            map,
        });
    }
}

export default WPPopup;
