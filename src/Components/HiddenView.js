import React from 'react';
//import PropTypes from 'prop-types';
import {View,} from 'react-native';
import * as ViewPropTypes from "react-native";
import PropTypes from 'prop-types';

const HiddenView = (props) => {
    const { children, hide, style } = props;
    if (hide) {
        return null;
    }
    return (
        <View {...this.props} style={style}>
            { children }
        </View>
    );
};

HiddenView.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.element,
        ])),
    ]).isRequired,
    //style: ViewPropTypes.style,
    hide: PropTypes.bool,
};

export default HiddenView;