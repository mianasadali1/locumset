import React, { Component } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  Button,
  TextInput,
  View,
  Image,
  Platform,
  TouchableOpacity
} from 'react-native';
// import { setMapSetting , setSettings, setRefresh} from '../Redux/actions/settings';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import { connect } from 'react-redux';
import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';
import { Block } from 'galio-framework';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import PropTypes from 'prop-types';
import SettingsActions from '../../Redux/ProfileRedux/SettingsRedux'

const { width, height } = Dimensions.get("screen");

class Settings extends React.Component {
  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return (navigation.goBack());
  }
  static propTypes = {
      dispatch: PropTypes.func,
      saveFetching: PropTypes.bool,
      attemptToSaveSettings: PropTypes.func,
  };
  constructor(props){
    super(props)
    this.state = {
      switchValume: true,
      switchSound: true,
      visible: false,
      value: 0,
      mapVisible: false,
      mapValue: 'standard',
      refreshVisible: false,
      refreshValue: 15,
      radio_props: [
        {label: 'param1', value: 0 },
        {label: 'param2', value: 1 }
      ],
      map_types: [
        {label: 'Standard', value: 'standard' },
        {label: 'Satellite', value: 'satellite' },
        {label: 'Terrain', value: 'terrain' }
      ],
      refresh_intervals: [
        {label: 'Do not Refresh', value: 0 },
        {label: '15 Seconds', value: 15 },
        {label: '30 Seconds', value: 30 },
        {label: '45 Seconds', value: 45 }
      ],
    }
  }
  componentDidMount(){
    this.state.mapValue = this.props.map_setting
    this.state.refreshValue = this.props.refresh_interval
  }

  componentWillUnmount(){
    // this.props.saveSettings(this.props.settings);
  }

  toggleSwitchValume = (value) => {
    this.setState({switchValume: value})
 }

  toggleSwitchSound = (value) => {
    this.setState({switchSound: value})
  }
  openPopup = () =>{
    this.setState({ visible: true })
  }

  openMapPopup = () =>{
    this.setState({ mapVisible: true })
  }
  openRefreshPopup = () =>{
    this.setState({ refreshVisible: true })
  }
  onMapSelect = () =>{
    console.log(this.state.mapValue);
    this.props.setMapType(this.state.mapValue);
    this.setState({ mapVisible: false });
  }
  onRefreshSelect = () =>{
    console.log(this.state.refrehValue);
    this.props.setRefresh(this.state.refreshValue);
    this.setState({ refreshVisible: false });
  }

  render() {
    return (
      <View>
        <Block>
          <View style={styles.header}>
            <View style={{flex: 0.2, padding: 10}}>
              <TouchableOpacity onPress={this.handleLeftPress}>
                <Image source={require('../assets/images/back_ic.png')} />
              </TouchableOpacity>
            </View>
            <View style={{flex: 0.8, padding: 10, textAlign: 'center'}}>
              <Text center style={{color: '#fff', textAlign: 'left', fontWeight: 'bold'}}>Settings</Text>
            </View>
          </View>
        </Block>
        <ScrollView contentContainerStyle={styles.stage}>
          <View style={styles.container}>
            <Dialog style={{width: width*0.9}}
              visible={this.state.visible}
              footer={
                <DialogFooter style={{width: width*0.9}}>
                  <DialogButton
                    text="CANCEL"
                    onPress={() => { this.setState({ visible: false })}}
                  />
                  <DialogButton
                    text="OK"
                    onPress={() => {}}
                  />
                </DialogFooter>
              }
            >
              <DialogContent style={{width: width*0.9, padding: 10,}}>
              <View>
                <RadioForm
                  radio_props={this.state.radio_props}
                  initial={0}
                  onPress={(value) => {this.setState({value:value})}}
                />
              </View>
              </DialogContent>
            </Dialog>
            {/* Mapp Settings Popup */}
            <Dialog style={{width: width*0.9}}
              visible={this.state.mapVisible}
              footer={
                <DialogFooter style={{width: width*0.9}}>
                  <DialogButton
                    text="CANCEL"
                    onPress={() => { this.setState({ mapVisible: false })}}
                  />
                  <DialogButton
                    text="OK"
                    onPress={this.onMapSelect}
                  />
                </DialogFooter>
              }
            >
              <DialogContent style={{width: width*0.9, padding: 10,}}>
              <View>
                <RadioForm
                  radio_props={this.state.map_types}
                  initial={this.state.map_types.findIndex(x => x.value === this.props.map_setting)}
                  onPress={(value) => {this.setState({mapValue:value})}}
                />
              </View>
              </DialogContent>
            </Dialog>
            {/* Refresh Interval Settings */}
            <Dialog style={{width: width*0.9}}
              visible={this.state.refreshVisible}
              footer={
                <DialogFooter style={{width: width*0.9}}>
                  <DialogButton
                    text="CANCEL"
                    onPress={() => { this.setState({ refreshVisible: false })}}
                  />
                  <DialogButton
                    text="OK"
                    onPress={this.onRefreshSelect}
                  />
                </DialogFooter>
              }
            >
              <DialogContent style={{width: width*0.9, padding: 10,}}>
              <View>
                <RadioForm
                  radio_props={this.state.refresh_intervals}
                  initial={this.state.refresh_intervals.findIndex(x => x.value === this.props.refresh_interval)}
                  onPress={(value) => {this.setState({refreshValue:value})}}
                />
              </View>
              </DialogContent>
            </Dialog>
          </View>
          <TableView>
            <Section header="VALUME">
              <Cell
                cellStyle="Subtitle"
                title="Select Valume"
                titleTextColor="#43CBE3"
                detail="Enable/Disable app sound"
                cellAccessoryView={<Switch onValueChange = {this.toggleSwitchValume} value={this.state.switchValume} />}
                contentContainerStyle={{ paddingVertical: 4 }}
              />
            </Section>
            <Section  header="NOTIFICATION SETTING">
              <Cell
                cellStyle="Subtitle"
                title="Notification Sound"
                titleTextColor="#43CBE3"
                detail="Enable/Disable notification sound"
                cellAccessoryView={<Switch onValueChange = {this.toggleSwitchSound} value = {this.state.switchSound} />}
                contentContainerStyle={{ paddingVertical: 4 }}
              />
              {/* <Cell
                cellStyle="Subtitle"
                title="Notification Ringtone"
                titleTextColor="#43CBE3"
                detail="Ringtone: Siron"
                contentContainerStyle={{ paddingVertical: 4 }}
                onPress={this.openPopup}
              /> */}

              <Cell
                cellStyle="Subtitle"
                title="Buzzer Interval"
                titleTextColor="#43CBE3"
                detail="Set the buzzer interval"
                contentContainerStyle={{ paddingVertical: 4 }}
              />
            </Section>
            <Section  header="MAP DISPLAY SETTING">
              <Cell
                cellStyle="Subtitle"
                title="Select the map display"
                titleTextColor="#43CBE3"
                detail="Select the map display view"
                contentContainerStyle={{ paddingVertical: 4 }}
                onPress={this.openMapPopup}
              />
            </Section>
            <Section  header="REFRESH TIMING">
              <Cell
                cellStyle="Subtitle"
                title="Refresh Interval"
                titleTextColor="#43CBE3"
                detail="Set the device list refresh interval"
                contentContainerStyle={{ paddingVertical: 4 }}
                onPress={this.openRefreshPopup}
              />
            </Section>
          </TableView>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
    isSave: state.settings.isSave,
    saveFetching: state.settings.saveFetching,
    notifSaveMessage : state.settings.notifSaveMessage
});

const mapDispatchToProps = dispatch => ({
    attemptToSaveSettings: (data) => dispatch(SettingsActions.saveSettingsRequest(data))
});

const styles = StyleSheet.create({
  // Top Header
  header: {
    flex: 0,
    backgroundColor: '#009D8B',
    flexDirection: 'row',
    justifyContent: "space-between",
    height: 40,
    marginBottom: 20
  },
  // Top header text
  headText: {
    color: "#FFFFFF",
    fontFamily: 'sans-serif',
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 16,
    textAlign: 'center'
  },
  stage: {
    backgroundColor: '#EFEFF4',
    paddingTop: 20,
    paddingBottom: 20,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
