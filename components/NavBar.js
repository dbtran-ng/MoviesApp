import React from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import Colors from './../theme/Colors';

const propTypes = {
  main: PropTypes.bool,
};
const defaultProps = {
  main: false,
};
class NavBar extends React.PureComponent {
  render() {
    const {navigation, main} = this.props;
    return (
      <SafeAreaView style={styles.container}>
        {main ? (
          <View style={styles.navbar}>
            <Image
              style={styles.logo}
              source={require('../assets/images/iu.png')}
            />
            <TouchableOpacity
              style={styles.search}
              onPress={() => {
                navigation.navigate('Search');
              }}>
              <Icon size={40} color={Colors.white} name="search-outline" />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.navbar}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon size={40} color={Colors.lightGray} name="chevron-back" />
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  logo: {width: 60, height: 40, right: 10},
  search: {width: 60, height: 40, left: 10},
  mainNav: {
    paddingTop: 40,
    marginLeft: 10,
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'black',
  },
  navbar: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
});

NavBar.propTypes = propTypes;
NavBar.defaultProps = defaultProps;

export default NavBar;
