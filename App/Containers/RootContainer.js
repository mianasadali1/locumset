import React, { Component } from 'react'
import { View, StatusBar, StyleSheet } from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'
import changeNavigationBarColor, {
  HideNavigationBar,
  ShowNavigationBar,
} from 'react-native-navigation-bar-color';

// Styles
import styles from './Styles/RootContainerStyles'

const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[Styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

class RootContainer extends Component {
  componentDidMount () {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
    // NavigationBar.setColor('#02856E')
    changeNavigationBarColor('#02856E');
  }

  render () {
    return (
      <View style={styles.applicationView}>
        <MyStatusBar backgroundColor="#02856E" barStyle="light-content" />
        <ReduxNavigation />
      </View>
    )
  }
}

const Styles = StyleSheet.create({
  statusBar: {
    height: 20,
  },
})

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup())
})

export default connect(null, mapDispatchToProps)(RootContainer)
