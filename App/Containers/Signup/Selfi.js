import React from 'react';
import { Text, View, TouchableOpacity, AsyncStorage } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

export default class Selfi extends React.Component {
  constructor(props){
    super(props);
  }
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.front,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  async snapPhoto(){
    if(this.camera) {
      const options = { quality: 0.4, base64: true, fixOrientation: true, 
      exif: true};
      this.camera.takePictureAsync(options).then(photo => {
        photo.exif.Orientation = 1;
        this.props.navigation.navigate('Account', photo.base64);
      });     
     }
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Block>
            <View style={styles.header}>
              <View style={{flexDirection: 'row', flex: 0.4, padding: 10}}>
                <TouchableOpacity onPress={this.handleLeftPress}>
                  <Image source={require('../assets/images/back_ic.png')} />
                </TouchableOpacity>
                <Text center style={{marginLeft: 30, color: '#fff', textAlign: 'left', fontWeight: 'bold'}}>Take Selfi</Text>
              </View>
              <View style={{flex: 0.5, padding: 5, paddingRight: 10, textAlign: 'right'}}>
                
              </View>
            </View>
          </Block>
          <Camera style={{ flex: 1 }} ref={(ref) => { this.camera = ref }} type={this.state.type}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={this.snapPhoto.bind(this)}>
                <Text style={{ fontSize: 18, marginBottom: 10, color: '#000', backgroundColor: '#fff' }}> [CAPTURE] </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}