/*Example of Recat Native Loading Spinner Overlay*/
import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';

class SpinnerComponent extends React.Component {

  constructor(props){
    super(props);
  }
  
  componentDidMount() {
    //Setting a timer to show the spinner demo in every 3 second
    
  }
  render() {
    return (
      <View style={styles.container}>
        <Spinner
          //visibility of Overlay Loading Spinner
          visible={this.props.loading}
          //Text with the Spinner
          //Text style of the Spinner Text
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: 30,
    backgroundColor: '#ecf0f1',
    padding: 8,
    position: 'absolute'
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});

const mapStateToProps = state => ({
  loading: state.auth.loading,
});

const mapDispatchToProps = dispatch => ({
  // getUserToken: token => dispatch(getUserToken(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(SpinnerComponent);