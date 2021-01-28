import React from 'react';
import PropTypes from 'prop-types';
// import {Text} from 'react-native' // only for react-native app
class ShowErrors extends React.Component {

    static propTypes = {
        value: PropTypes.any,
        validations: PropTypes.object,
        display: PropTypes.bool
    };

    static defaultProps = {
        display: false
    };

    listOfErrors() {
        const { validations, value } = this.props;
        const errors = ["evil errorr"]
        console.log(errors);
        return errors;
    }
    // use <Text> instead of <small> if using in react-native
    render() {
        if (!this.props.display) { return null; }
        return (
            <div>
                {this.listOfErrors().map(
                    err => <small key={err}>{err}</small>
                )}
            </div>
        );
    }
}
export default ShowErrors;