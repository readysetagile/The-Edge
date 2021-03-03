import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import React, {Component} from 'react';

export default class DashboardScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titleText}>COACHING DASHBOARD</Text>
                <TouchableOpacity>
                    <View style={[styles.buttonStyle, styles.coachingColor]}>
                        <Image
                            source={{uri: 'https://grid.gograph.com/softball-vector-clipart_gg91304766.jpg'}}
                            style={styles.imageStyle}
                        />
                        <Text style={styles.buttonsText}>STUDENTS</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={[styles.buttonStyle, styles.drillsColor]}>
                        <Image
                            source={{uri: 'https://grid.gograph.com/softball-vector-clipart_gg91304766.jpg'}}
                            style={styles.imageStyle}
                        />
                        <Text style={styles.buttonsText}>Drills</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={[styles.buttonStyle, styles.graphsColor]}>
                        <Image
                            source={{uri: 'https://grid.gograph.com/softball-vector-clipart_gg91304766.jpg'}}
                            style={styles.imageStyle}
                        />
                        <Text style={styles.buttonsText}>STUDENTS</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={[styles.buttonStyle, styles.challengesColor]}>
                        <Image
                            source={{uri: 'https://grid.gograph.com/softball-vector-clipart_gg91304766.jpg'}}
                            style={styles.imageStyle}
                        />
                        <Text style={styles.buttonsText}>STUDENTS</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={[styles.buttonStyle, styles.scheduleColor]}>
                        <Image
                            source={{uri: 'https://grid.gograph.com/softball-vector-clipart_gg91304766.jpg'}}
                            style={{height: 100, width: 100}}
                        />
                        <Text style={styles.buttonsText}>STUDENTS</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={[styles.buttonStyle, styles.workoutsColor]}>
                        <Image
                            source={{uri: 'https://grid.gograph.com/softball-vector-clipart_gg91304766.jpg'}}
                            style={styles.imageStyle}
                        />
                        <Text style={styles.buttonsText}>STUDENTS</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

}