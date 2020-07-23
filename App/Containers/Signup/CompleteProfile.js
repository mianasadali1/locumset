import React from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  TextInput,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  AsyncStorage,
  KeyboardAvoidingView,
  BackHandler,
  Alert,
} from "react-native";
import { connect } from "react-redux";
// import { registerPost, loading  } from '../Redux/actions/auth';
import { Block, Text, Button, theme } from "galio-framework";
import { Images } from "../../Themes";
import argonTheme from "../../Themes/constants/Theme";
import { Icon } from "react-native-vector-icons";
import RNPickerSelect from "react-native-picker-select";
import PropTypes from "prop-types";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Spinner from "react-native-loading-spinner-overlay";
import SignupActions from "../../Redux/SignupRedux/SignupRedux";
import ImagePicker from "react-native-image-crop-picker";
import firebase from "react-native-firebase";
import Toast from "react-native-simple-toast";
import SearchableDropdown from "react-native-searchable-dropdown";

import ProfileActions from "../../Redux/ProfileRedux/ProfileRedux";

const { width, height } = Dimensions.get("screen");
// const AppClient = new Application();
const thumbMeasure = (width - 48 - 32) / 3;

const rem = width / 380;
const p40 = (40 / 480) * width;
const p45 = (45 / 480) * width;
const p30 = (30 / 480) * width;
const p55 = (55 / 480) * width;
const p50 = (50 / 480) * width;
const p65 = (65 / 480) * width;
const p10 = (10 / 480) * width;
const p14 = (14 / 480) * width;
const p20 = (20 / 480) * width;
const p25 = (25 / 480) * width;
const p17 = (17 / 480) * width;
const p75 = (75 / 480) * width;
const p80 = (80 / 480) * width;
const p85 = (85 / 480) * width;
const p90 = (90 / 480) * width;
const p100 = (100 / 480) * width;
const p150 = (150 / 480) * width;
const p200 = (200 / 480) * width;

class CompleteProfile extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    fetching: PropTypes.bool,
    attemptSignup: PropTypes.func,
    attemptToGetHospitals: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.props.attemptToGetHospitals();
    this.data = props.navigation.state.params;
    console.log(this.data);
    this.handleBackPress = this.handleBackPress.bind(this);
  }
  state = {
    email: "",
    password: "",
    c_password: "",
    c_hospital: "",
    c_dept: "",
    hospital_id: "",
    hospital_user_id: "",
    user: [],
    idFile: "",
    idImage: "",
    deviceToken: null,
    dept_id: "",
    grade: "",
    errors: {
      email: "",
      password: "",
      c_password: "",
      c_hospital: "",
      id_image: "",
      c_dept: "",
    },
  };

  componentWillMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    firebase
      .messaging()
      .getToken()
      .then((fcmToken) => {
        this.setState({ deviceToken: fcmToken });
      });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () => {
    console.log("navigate back to my prefered jobs");
    this.props.navigation.goBack(); // works best when the goBack is async
    return true;
  };

  onChangeText = (key, val) => {
    this.setState({ [key]: val });
  };

  selectImage = () => {
    Alert.alert(
      "Select ID Photo",
      "Please select an image for Hospital ID.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Camera", onPress: () => this.showCamera(), style: "cancel" },
        {
          text: "Library",
          onPress: () => this.pickFromGallery(),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  showCamera = () => {
    ImagePicker.openCamera({
      useFrontCamera: true,
      width: 300,
      height: 300,
      cropping: false,
      includeBase64: true,
      compressImageQuality: 0.07,
    }).then((image) => {
      let source = image.path,
        basePath = image.data,
        fileName = source.split("/");
      this.setState({
        idFile: fileName[fileName.length - 1],
        idImage: basePath,
      });
    });
  };

  pickFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: false,
      includeBase64: true,
      compressImageQuality: 0.07,
    }).then((image) => {
      console.log(image);
      let source = image.path,
        basePath = image.data,
        fileName = source.split("/");
      this.setState({
        idFile: fileName[fileName.length - 1],
        idImage: basePath,
      });
    });
  };
  completeProfile = () => {
    if (this.state.email == "") {
      this.setState({
        ...this.state,
        errors: { email: "Please enter email!" },
      });
    } else if (this.state.password == "") {
      this.setState({
        ...this.state,
        errors: { password: "Please enter password!" },
      });
    } else if (this.state.c_password == "") {
      this.setState({
        ...this.state,
        errors: { c_password: "Please enter Confirm password!" },
      });
    } else if (this.state.c_hospital == "") {
      this.setState({
        ...this.state,
        errors: { c_hospital: "Please select hospital!" },
      });
    } else if (this.state.c_dept == "") {
      this.setState({
        ...this.state,
        errors: { c_dept: "Please select Department!" },
      });
    } else if (this.state.id_image == "") {
      this.setState({
        ...this.state,
        errors: { id_image: "Please select hospital id image!" },
      });
    } else {
      let authData = {
        name: this.data.firstname + " " + this.data.secondname,
        first_name: this.data.firstname,
        sur_name: this.data.secondname,
        gmc: this.data.GMC_number,
        email: this.state.email,
        password: this.state.password,
        c_password: this.state.c_password,
        doc_hospital: this.state.c_hospital,
        doc_dept: this.state.c_dept,
        id_image: this.state.idImage,
        // hospital_id: this.state.hospital_id,
        // c_dept: this.state.c_dept,
        mobile: "03333333333",
        image: this.data.image,
        device_token: this.state.deviceToken,
      };
      this.props.attemptSignup(authData);
    }
  };

  render() {
    const { navigation, fetching, hospitalsData } = this.props;
    const { navigate } = this.props.navigation;
    const { c_password } = this.state;

    const placeholder = [
      {
        label: "Enter Hospital",
        value: 1,
      },
    ];

    const dept = [
      {
        label: "Enter Department",
        value: 1,
      },
    ];

    console.log("hospitalsdata", hospitalsData);
    var hospitals = hospitalsData ? hospitalsData.new_hospitals : "";
    var departments = hospitalsData ? hospitalsData.new_departments : "";
    return (
      <ScrollView keyboardShouldPersistTaps={"always"}>
        <Block flex style={styles.profileBackground}>
          <Spinner visible={fetching} />
          <Block center>
            <Block style={styles.profileCard}>
              <Block middle style={styles.avatarContainer}>
                {this.data.imageSource ? (
                  <Image
                    source={{ uri: this.data.imageSource }}
                    style={styles.avatar}
                  />
                ) : (
                  <Image
                    source={require("../../Themes/assets/imgs/icon/new_doc.png")}
                    style={styles.avatar}
                  />
                )}
              </Block>
            </Block>
            <View style={{ marginBottom: "3%" }}>
              <View style={{ flexDirection: "row", marginTop: -9 }}>
                <Text style={styles.textStyle1}>{this.data.firstname}</Text>
                <Text style={styles.textStyle2}>{this.data.secondname}</Text>
                {false && (
                  <View
                    style={{
                      backgroundColor: "#fff",
                      width: 25,
                      height: 25,
                      borderRadius: 12.5,
                      marginLeft: 5,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      source={Images.checkMark}
                      style={{ width: 20, height: 20 }}
                    />
                  </View>
                )}
              </View>
              <Text style={styles.textStyle3}>GMC-{this.data.GMC_number}</Text>
            </View>
            <TextInput
              ref="email"
              style={{
                ...styles.input,
                
              }}
              value={this.state.email}
              keyboardType="email-address"
              onChangeText={(email) => this.setState({ email })}
              placeholder={"Email"}
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() => this.password.focus()}
            />
            {this.state.errors.email ? (
              <Text style={{ alignSelf: "flex-start" }} color="red">
                {this.state.errors.email}
              </Text>
            ) : null}
            <TextInput
              ref={(ref) => (this.password = ref)}
              style={styles.input}
              value={this.state.password}
              onChangeText={(password) => this.setState({ password })}
              placeholder={"Password"}
              secureTextEntry={true}
              returnKeyType="next"
              onSubmitEditing={() => this.c_password.focus()}
            />
            {this.state.errors.password ? (
              <Text style={{ alignSelf: "flex-start" }} color="red">
                {this.state.errors.password}
              </Text>
            ) : null}
            <TextInput
              ref={(ref) => (this.c_password = ref)}
              style={{width: width * 0.8,
                height: 44,
                backgroundColor: "white",
                marginBottom: 5,
                padding: 12,
                color: "black",
                borderWidth: 2,
                fontSize: 14,
                borderWidth: 1,
                borderColor: "#ccc",
                alignSelf: "center"}}
              value={this.state.c_password}
              onChangeText={(c_password) => this.setState({ c_password })}
              placeholder={"Confirm Password"}
              secureTextEntry={true}
              returnKeyType="next"
            />
            {this.state.errors.c_password ? (
              <Text style={{ alignSelf: "flex-start" }} color="red">
                {this.state.errors.c_password}
              </Text>
            ) : null}

            <SearchableDropdown
              multi={false}
              onItemSelect={(item) => {
                this.setState({ c_hospital: item.id });
              }}
              containerStyle={{ padding: 5}}
              itemStyle={{
                padding: 5,
                
                backgroundColor: "#ddd",
                borderColor: "#bbb",
                borderWidth: 1,
                borderRadius: 5,
              }}
              itemTextStyle={{ color: "#222" }}
              itemsContainerStyle={{ maxHeight: 50 }}
              items={hospitals}
              chip={true}
              resetValue={false}
              textInputProps={{
                placeholder: "Select Hospital",
                underlineColorAndroid: "transparent",
                style: {
                  padding: 12,
                  
                  borderWidth: 1,
                  borderColor: "#ccc",
                  backgroundColor: "#fff",
                  height: 44,

                  width: width * 0.8,
                },
                //onTextChange: text => alert(text)
              }}
              listProps={{
                nestedScrollEnabled: true,
              }}
            />
            {this.state.errors.c_hospital ? (
              <Text style={{ alignSelf: "flex-start" }} color="red">
                {this.state.errors.c_hospital}
              </Text>
            ) : null}
            <SearchableDropdown
              multi={false}
              onItemSelect={(item) => {
                this.setState({ c_dept: item.id });
              }}
              containerStyle={{ padding: 5}}
              itemStyle={{
                padding: 5,
                
                backgroundColor: "#ddd",
                borderColor: "#bbb",

                borderWidth: 1,
                borderRadius: 5,
              }}
              itemTextStyle={{ color: "#222" }}
              itemsContainerStyle={{ maxHeight: 50 }}
              items={departments}
              chip={true}
              resetValue={false}
              textInputProps={{
                placeholder: "Select Department",
                underlineColorAndroid: "transparent",
                style: {
                  padding: 12,
                  height: 44,
                  borderWidth: 1,
                  borderColor: "#ccc",
                  backgroundColor: "#fff",
                  width: width * 0.8,
                },
                //onTextChange: text => alert(text)
              }}
              listProps={{
                nestedScrollEnabled: true,
              }}
            />
            {this.state.errors.c_dept ? (
              <Text style={{ alignSelf: "flex-start" }} color="red">
                {this.state.errors.c_dept}
              </Text>
            ) : null}
            <Button
              style={[
                styles.button,
                { alignItems: "center" },
              ]}
              color={argonTheme.COLORS.SECONDARY}
              onPress={this.selectImage}
            >
              {this.state.idFile == "" ? (
                <Text style={{ marginLeft: "-53%", fontSize: 14 }}>
                  Hospital ID Photo
                </Text>
              ) : (
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    width: 260,
                    marginLeft: 0,
                    color: argonTheme.COLORS.BLACK,
                    fontSize: 14,
                  }}
                >
                  {this.state.idFile}
                </Text>
              )}
              <View
                style={{
                  width: 50,
                  height: 42,
                  
                  backgroundColor: "#009B8B",
                  position: "absolute",
                  right: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={Images.uploadImage}
                  style={{
                    transform: [{ rotate: "90deg" }],
                    width: 30,
                    height: 30,
                  }}
                />
              </View>
            </Button>
            {this.state.errors.id_image ? (
              <Text style={{ alignSelf: "flex-start" }} color="red">
                {this.state.errors.id_image}
              </Text>
            ) : null}
            <Button
              style={styles.button}
              color={argonTheme.COLORS.TEAL}
              onPress={this.completeProfile}
              textStyle={{ color: argonTheme.COLORS.WHITE, fontWeight: "200" }}
            >
              Submit
            </Button>
          </Block>
        </Block>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  profileBackground: {
    width: width,
    height: height,
    backgroundColor: "#009b80",
    padding: 0,
    zIndex: 0, //navigation bar occured by changing value from 1 to 0
  },
  button: {
    width: width * 0.8,
    height: 44,
    marginTop: 5,
    shadowRadius: 0,
    shadowOpacity: 0,
    marginBottom: "3%",
    alignSelf: "center",
  },
  input: {
    width: width * 0.8,
    height: 44,
    backgroundColor: "white",
    marginBottom: 10,
    padding: 12,
    
    color: "black",
    borderWidth: 2,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#ccc",
    alignSelf: "center",
  },
  textStyle: {
    color: "white",
    marginTop: "10%",
    fontSize: p17,
    fontWeight: "500",
  },
  textStyle1: {
    color: "white",
    fontSize: p17,
    fontWeight: "500",
    marginLeft: 10,
  },
  textStyle2: {
    color: "white",
    paddingLeft: "2%",
    fontSize: p17,
    fontWeight: "500",
  },
  textStyle3: {
    color: "white",
    fontSize: p17,
    fontWeight: "500",
    alignSelf: "center",
  },
  profileCard: {
    position: "relative",
    marginTop: -9,
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
    width: 90,
    height: 90,
    borderRadius: 62,
    borderWidth: 1,
    borderColor: "#009B8B",
    marginTop: "15%",
  },
  filter: {
    marginLeft: 10,
    width: width * 0.5,
    height: 20,
    borderColor: "#ddd",
    borderWidth: 1,
    fontSize: p20,
  },
  viewContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: width * 0.8,
  },
  header: {
    flex: 0,
    backgroundColor: "#009D8B",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 40,
    marginBottom: 20,
  },
  buttonContainer: {
    flex: 0.5,
  },
  inputIOS: {
    fontSize: p17,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    color: "black",
    marginBottom: 10,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: p17,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "grey",
    color: "black",
    marginBottom: 10,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  container: {
    paddingBottom: 0,
    backgroundColor: "#fff",
    height: 38,
    marginLeft: -10,
    marginRight: 10,
  },
  text: {
    color: "#4f603c",
    padding: 10,
    width: width * 0.33,
    flex: 1,
  },
  button2: {
    width: 180,
    height: 30,
    borderRadius: 30,
    marginTop: "3%",
  },
  topButtonContainer: {
    height: 50,
    width: width,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    marginBottom: 10,
    paddingLeft: p20,
    paddingRight: p20,
    borderRadius: 20,
    borderWidth: 2,
    fontSize: p14,
    borderColor: "#069987",
    width: width * 0.8,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: p17,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "#069987",
    borderRadius: 8,
    color: "black",
    width: "100%",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

const mapStateToProps = (state) => ({
  fetching: state.signup.fetching,
  hospitalsData: state.profile.hospitalsData,
});

const mapDispatchToProps = (dispatch) => ({
  attemptSignup: (data) => dispatch(SignupActions.signupRequest(data)),
  attemptToGetHospitals: () => dispatch(ProfileActions.hospitalsRequest()),
});
export default connect(mapStateToProps, mapDispatchToProps)(CompleteProfile);
