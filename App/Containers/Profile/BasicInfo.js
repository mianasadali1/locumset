import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  View,
  TouchableOpacity,
  BackHandler
  }
from "react-native";
import { Block, Text, Button, theme} from "galio-framework";
import { Images } from "../../Themes/constants";
import { HeaderHeight } from "../../Themes/constants/utils";
import argonTheme from "../../Themes/constants/Theme";
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import Popover from 'react-native-popover-view';
const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;

const p40 = 40/480*width;
const p30 = 30/480*width;
const p55 = 55/480*width;
const p50 = 50/480*width;
const p65 = 65/480*width;
const p10 = 10/480*width;
const p5 = 5/480*width;
const p14 = 14/480*width;
const p20 = 20/480*width;
const p22 = 22/480*width;
const p25 = 25/480*width;
const p17 = 17/480*width;
const p75 = 75/480*width;
const p80 = 80/480*width;
const p85 = 85/480*width;
const p90 = 90/480*width;
const p100 = 100/480*width;
const p150 = 150/480*width;
const p200 = 200/480*width;

class BasicInfo extends React.Component {
  constructor(props){
    super(props);
    this.handleBackPress = this.handleBackPress.bind(this);
  }
    state = {
      first_name : '',
      email : '',
      showPhotoId: false
    }
    handleLeftPress = () => {
      const { back, navigation } = this.props;
      return (navigation.goBack());
    }
    EditBasicInfo = () => {
      this.props.navigation.navigate("EditBasicInfo");
    }

    componentDidMount() {
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount () {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress () {
      this.props.navigation.goBack(); // works best when the goBack is async
      return true;
    }

    showPhotoId = () => {
      this.setState({showPhotoId: true})
    }

    hidePhotoId = () => {
      this.setState({ showPhotoId: false })
    }


  render() {
      const { email, first_name } = this.state;
      const { user, user_image } = this.props;
      console.log('user', user)

    return (
        <Block center flex style={{height: height, backgroundColor: '#f7f7f7'}}>
          <ImageBackground source={require('../assets/images/header_img.png')} style={{width: width}}>
            <View style={{width: width, height: 60, flexDirection: 'row', paddingTop:15}}>
              <View style={{flex: 0.35, padding: 10, paddingLeft: 0, paddingVertical: 15,}}>
                <TouchableOpacity onPress={this.handleLeftPress} style={{ padding: 10 }}>
                  <Image source={require('../assets/images/back_ic.png')} />
                </TouchableOpacity>
              </View>
              <View style={{flex: 0.65, padding:10, paddingVertical:15, flexDirection: 'row'}}>
                <View style={{flex: 0.5,}}>
                  <Text center style={{color: '#fff', textAlign: 'center', fontWeight: '600', fontSize: 19}}>Basic Info</Text>
                </View>
                <View style={{flex: 0.5, paddingRight: 10, textAlign: 'right',}}>
                  <TouchableOpacity onPress={this.EditBasicInfo} style={{alignSelf: 'flex-end'}}>
                  <Image source={require('../assets/images/edit_info_ic.png')} style={{width: 30, height: 30,}} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{width: width, marginTop:-20, height: 100}}>
            </View>
          </ImageBackground>
          <View style={{ backgroundColor: '#F2F8F6', marginBottom: '10%'}}>
            <View style={{flexDirection: 'row', backgroundColor: '#ffffff', width: width*0.8, borderRadius: 10,  marginTop: -60, height: 120, padding:10}}>
              <Block middle style={styles.avatarContainer, {flex: 0.4}}>
                {user_image ? <Image
                  style={styles.avatar}
                  source={{uri: user_image}}
                /> : <Image
                  style={styles.avatar}
                  source={require('../../Themes/assets/imgs/icon/new_doc.png')}
                />}
              </Block>
              <Block style={{flex: 0.6}}>
                <View style={{flexDirection: 'row',marginTop:12, width: '100%'}}>
                  <Text style={styles.textStyle} numberOfLines={2} ellipsizeMode='tail'>
                    {user ? user.first_name : ''} {user ? user.sur_name : ''}
                  </Text>
                </View>
                <Text style={styles.textStyle2}>
                  GMC - {user ? user.gmc : ''}
                </Text>
              </Block>
            </View>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.profile, { width, marginTop: '2%' }}
            >
            <Block flex style={styles.profileCard}>
              {/*<Block middle style={styles.avatarContainer}>
                {user && user.image_path ? <Image
                    source={{uri: user.image_path}}
                    style={styles.avatar}
                /> : <Image
                    source={require('../../Themes/assets/imgs/icon/new_doc.png')}
                    style={styles.avatar}
                />}
              </Block>
              <Block center>
                <View style={{flexDirection: 'row',marginTop:'3%'}}>
                  <Text style={styles.textStyle}>
                    {user.first_name}
                  </Text>
                  <Text style={styles.textStyle1}>
                    {user.sur_name}
                  </Text>
                </View>
                <Text style={styles.textStyle2}>
                  {user.gmc}
                </Text>
              </Block>*/}
            </Block>
            <Block center style={styles.container1}>
              <Text
                style={styles.textStyle3}
                color={argonTheme.COLORS.WHITE}
                >
                <Text style={styles.textStyle4}>
                  {"\n"}EMAIL
                </Text>
                <Text style={styles.textStyle5}>
                  {"\n"} {user.email} {"\n"}
                </Text>
              </Text>
              <Text
                style={styles.textStyle3}
                color={argonTheme.COLORS.WHITE}
                >
                <Text style={styles.textStyle4}>
                  {"\n"}Mobile Number
                </Text>
                <Text style={styles.textStyle5}>
                  {"\n"}{user.mobile}{"\n"}
                </Text>
              </Text>
              <Text
                style={styles.textStyle3}
                color={argonTheme.COLORS.WHITE}
                >
                <Text style={styles.textStyle4}>
                  {"\n"}Address
                </Text>
                <Text style={styles.textStyle5}>
                  {"\n"}{user.address}{"\n"}
                </Text>
              </Text>
              <Text
                style={styles.textStyle3}
                color={argonTheme.COLORS.WHITE}
                >
                <Text style={styles.textStyle4}>
                  {"\n"}JOB IN CURRENT HOSPITAL
                </Text>
                <Text style={styles.textStyle5}>
                  {"\n"}{user.doc_hosp_name}{"\n"}
                </Text>
              </Text>
              <TouchableOpacity onPress={this.showPhotoId}>
              <Text
                style={styles.textStyle3}
                color={argonTheme.COLORS.WHITE}
                >
                <Text style={styles.textStyle4}>
                  {"\n"}HOSPITAL ID PHOTO
                </Text>
                <Text style={styles.textStyle5}>
                  {"\n"}Click to View Photo{"\n"}
                </Text>
              </Text>
              </TouchableOpacity>
            </Block>

          </ScrollView>
          <Popover
            isVisible={this.state.showPhotoId}
            fromView={this.touchable}
            placement={this.bottom}
            onRequestClose={() => this.hidePhotoId()}
            popoverStyle={{width: width, borderTopLeftRadius: 20, borderTopRightRadius: 20, width: width, margin: 0, padding: 0}}>
          <View style={{padding: 10, width: width*0.9,}}>
            <Text style={{color: '#949d9d', fontSize: p17, marginBottom: 10}}>HOSPITAL ID PHOTO</Text>
            <Text style={{color: 'red', marginBottom: 10}}>{this.state.Error}</Text>
            <View>
            <Image
              style={{width: width*0.9, height: 300}}
              source={{uri: user.id_image}}
            />
            </View>
          </View>
        </Popover>
        </Block>
    );
  }
}

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
  profile: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    backgroundColor:'#f7f7f7'
    //marginBottom: -HeaderHeight * 1
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 0, //navigation bar occured by changing value from 1 to 0
  },
  profileCard: {
    position: "relative",
    marginTop: 45,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 62,
    borderWidth: 1,
    borderColor: '#009B8B',
  },
  thumb: {
    borderRadius: 3,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure
  },
  textStyle: {
    color: 'black',
    fontSize: p22,
  },
  textStyle1: {
    color: 'black',
    paddingLeft: '2%',
    fontSize: p22,
  },
  textStyle2: {
    color: '#c5c8c9',
    fontSize: p22,

  },
  textStyle3: {
    width: 340,
    height: 70,
    shadowRadius: 0,
    shadowOpacity: 0,
    borderColor: '#dcdcdc',
    position: 'relative',
    color:'white',
    borderBottomWidth:1,
  },
  textStyle4:{
    color: argonTheme.COLORS.MUTED,
    fontWeight: '300',
    fontSize: p17,
    marginBottom:1,
    paddingBottom:1
  },
  textStyle5:{
    color: argonTheme.COLORS.BLACK,
    fontWeight: '300',
    fontSize: p17,
    marginTop: 1,
    paddingTop:1
  },
  container1:{
    marginTop: 15,
    position: 'relative',
    backgroundColor:'white',
    width: width,
  },
});

const mapStateToProps = state => ({
  user: state.account.user,
  user_image: state.account.user_image
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(BasicInfo);
