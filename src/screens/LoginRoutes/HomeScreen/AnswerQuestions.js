import React, {Component} from 'react';
import {View} from 'react-native';
import {globalStyles} from "../../GlobalStyles";

class AnswerQuestions extends Component {

    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
        this.setState({questions: this.props.questions})
    }


    render() {

        return (
            <View style={globalStyles.modalView()}>

                

            </View>
        );
    }
}

export default AnswerQuestions;