import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';

const HiddenView = (props) => {
    const {children, hide, style} = props;
    if (hide) {
        return null;
    }
    return (
        <View {...props} style={style}>
            {children}
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
    style: PropTypes.object,
    hide: PropTypes.bool,
};

export default HiddenView;