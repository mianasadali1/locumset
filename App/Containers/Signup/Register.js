import React from "react";
import Background from "../assets/img/bg.png";
import Logo from "../assets/logo.png";
import dpPlaceholder from "../assets/images/dp_placeholder.png";
import {
  Alert,
  Image,
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  ScrollView,
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  View,
  BackHandler,
} from "react-native";
import Icon from "react-native-vector-icons";
import { Input, Block, Checkbox, Text, theme, Button } from "galio-framework";
import styles from "../LogIn/loginStyles";
import { connect } from "react-redux";
import { argonTheme } from "../../Themes/constants";
import { Images } from "../../Themes";
import ImagePicker from "react-native-image-crop-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-simple-toast";

const window = Dimensions.get("window");

export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_HEIGHT_SMALL = window.width / 7;

const { width, height } = Dimensions.get("screen");
const rem = width / 380;
const p40 = (40 / 480) * width;
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

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.keyboardHeight = new Animated.Value(0);
    this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
    this.handleBackPress = this.handleBackPress.bind(this);
  }

  state = {
    firstname: "",
    secondname: "",
    GMC_number: "",
    imageSource: "",
    imageBAse: "",
    errors: { image: "", firstname: "", lastname: "", gmc: "" },
  };

  componentWillMount() {
    this.keyboardWillShowSub = Keyboard.addListener(
      "keyboardWillShow",
      this.keyboardWillShow
    );
    this.keyboardWillHideSub = Keyboard.addListener(
      "keyboardWillHide",
      this.keyboardWillHide
    );
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () => {
    console.log("navigate back to my prefered jobs");
    this.props.navigation.goBack(); // works best when the goBack is async
    return true;
  };

  keyboardWillShow = (event) => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: event.endCoordinates.height,
      }),
      Animated.timing(this.imageHeight, {
        duration: event.duration,
        toValue: IMAGE_HEIGHT_SMALL,
      }),
    ]).start();
  };

  keyboardWillHide = (event) => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: 0,
      }),
      Animated.timing(this.imageHeight, {
        duration: event.duration,
        toValue: IMAGE_HEIGHT,
      }),
    ]).start();
  };

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };
  _signInAsync = () => {
    this.props.navigation.navigate("Login");
  };

  selectImage = () => {
    Alert.alert(
      "Select Avatar",
      "Select from Camera...\nSelect from Library...",
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
      let source = image.path;
      let base64 = image.data;
      this.setState({ imageSource: source, imageBAse: base64 });
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
      let source = image.path;
      let base64 = image.data;
      this.setState({ imageSource: source, imageBAse: base64 });
    });
  };

  navigateOnCompleteProfile = () => {
    if (this.state.imageSource == "") {
      this.setState({
        ...this.state,
        errors: { image: "Please select image!" },
      });
    } else if (this.state.firstname == "") {
      this.setState({
        ...this.state,
        errors: { firstname: "Please enter first name!" },
      });
    } else if (this.state.secondname == "") {
      this.setState({
        ...this.state,
        errors: { lastname: "Please enter second name!" },
      });
    } else if (this.state.GMC_number == "") {
      this.setState({
        ...this.state,
        errors: { gmc: "Please enter GMC Number!" },
      });
    } else {
      let data = {
        firstname: this.state.firstname,
        secondname: this.state.secondname,
        GMC_number: this.state.GMC_number,
        image: this.state.imageSource,
      };
      this.props.navigation.navigate("CompleteProfile", {
        firstname: this.state.firstname,
        secondname: this.state.secondname,
        GMC_number: this.state.GMC_number,
        imageSource: this.state.imageSource,
        image: this.state.imageBAse,
      });
    }
  };

  render() {
    const { navigate } = this.props.navigation;
    const { navigation } = this.props;
    return (
      <>
        <ScrollView
          center
          keyboardShouldPersistTaps={"always"}
          style={{ backgroundColor: "#009B80", height: height }}
        >
          <Block flex middle>
            <Block flex middle>
              <Block style={styles.registerContainer}>
                <Block flex>
                  <Block flex center>
                    <KeyboardAwareScrollView
                      ref={(ref) => (this.scrollView = ref)}
                      keyboardShouldPersistTaps={"handled"}
                      style={{ flex: 1 }}
                    >
                      <Block
                        center
                        width={width * 0.8}
                        style={{ marginBottom: p40, marginTop: p40 }}
                      >
                        <Image
                          source={Images.loginLogo}
                          style={{
                            width: p200,
                            height: p75,
                            paddingBottom: p20,
                          }}
                        />
                        <Text
                          color="#fff"
                          size={p20}
                          style={{ marginTop: p10 }}
                        >
                          Let us know if you are a doctor
                        </Text>

                        <TouchableOpacity onPress={this.showCamera}>
                          <Block
                            style={{
                              width: p150,
                              height: p150,
                              marginBottom: p20,
                            }}
                          >
                            {this.state.imageSource == "" ? (
                              <View>
                                <Image
                                  source={dpPlaceholder}
                                  style={{
                                    width: p150,
                                    height: p150,
                                    paddingBottom: p20,
                                    marginTop: p20,
                                  }}
                                />
                                <View
                                  style={{
                                    position: "absolute",
                                    right: 2,
                                    bottom: 6,
                                    backgroundColor: "#009B80",
                                    borderWidth: 1,
                                    borderColor: "#fff",
                                    width: 25,
                                    height: 25,
                                    borderRadius: 12.5,
                                    marginLeft: 5,
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Image
                                    source={Images.camera}
                                    style={{ width: 17, height: 17 }}
                                  />
                                </View>
                              </View>
                            ) : (
                              <View>
                                <Image
                                  source={{ uri: this.state.imageSource }}
                                  style={{
                                    width: p150,
                                    height: p150,
                                    paddingBottom: p20,
                                    marginTop: p20,
                                    borderRadius: p75,
                                  }}
                                />
                                <View
                                  style={{
                                    position: "absolute",
                                    right: 0,
                                    bottom: 3,
                                    backgroundColor: "#009B80",
                                    borderWidth: 0.3,
                                    borderColor: "#fff",
                                    width: 25,
                                    height: 25,
                                    borderRadius: 12.5,
                                    marginLeft: 5,
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Image
                                    source={Images.camera}
                                    style={{ width: 17, height: 17 }}
                                  />
                                </View>
                              </View>
                            )}
                          </Block>
                        </TouchableOpacity>
                        {this.state.errors.image ? (
                          <Text color="red">{this.state.errors.image}</Text>
                        ) : null}
                      </Block>

                      <Block
                        width={width * 0.8}
                        style={{
                          flexDirection: "row",
                          width: "100%",
                        }}
                      >
                        <Block width={width * 0.4}>
                          <TextInput
                            // style={{borderRadius: 20, borderColor: '#069987', borderWidth: 2}}
                            style={{
                              ...pickerSelectStyles.input,
                              marginBottom: this.state.errors.firstname
                                ? 0
                                : p10,
                            }}
                            ref={(ref) => (this.firstname = ref)}
                            borderless
                            placeholder="First Name"
                            returnKeyType="next"
                            onSubmitEditing={() => this.secondname.focus()}
                            onChangeText={(text) =>
                              this.handleChange("firstname", text)
                            }
                          />
                          {this.state.errors.firstname ? (
                            <Text color="red">
                              {this.state.errors.firstname}
                            </Text>
                          ) : null}
                        </Block>
                        <Block width={width * 0.4}>
                          <TextInput
                            // style={{borderRadius: 20, borderColor: '#069987', borderWidth: 2}}
                            style={{
                              ...pickerSelectStyles.input,
                              marginBottom: this.state.errors.lastname
                                ? 0
                                : p10,
                            }}
                            ref={(ref) => (this.secondname = ref)}
                            borderless
                            placeholder="Sur Name"
                            returnKeyType="next"
                            onSubmitEditing={() => this.GMC_number.focus()}
                            onChangeText={(text) =>
                              this.handleChange("secondname", text)
                            }
                          />
                          {this.state.errors.lastname ? (
                            <Text color="red">
                              {this.state.errors.lastname}
                            </Text>
                          ) : null}
                        </Block>
                      </Block>
                      <Block width={width * 0.8}>
                        <TextInput
                          // style={{borderRadius: 20, borderColor: '#069987', borderWidth: 2}}
                          style={{
                            ...pickerSelectStyles.input,
                            marginBottom: this.state.errors.gmc ? 0 : p10,
                          }}
                          ref={(ref) => (this.GMC_number = ref)}
                          borderless
                          keyboardType="numeric"
                          placeholder="GMC Number"
                          returnKeyType="go"
                          onSubmitEditing={this.navigateOnCompleteProfile}
                          onChangeText={(text) =>
                            this.handleChange("GMC_number", text)
                          }
                        />
                        {this.state.errors.gmc ? (
                          <Text color="red">{this.state.errors.gmc}</Text>
                        ) : null}
                      </Block>
                      <Block middle>
                        <Button
                          style={
                            (styles.createButton,
                            {
                              marginTop: p25,
                              height: p55,
                              backgroundColor: "#005E51",
                            })
                          }
                          onPress={this.navigateOnCompleteProfile}
                        >
                          <Text bold size={p20} color={argonTheme.COLORS.WHITE}>
                            SUBMIT
                          </Text>
                        </Button>
                        <View
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "row",
                            marginTop: 10,
                          }}
                        >
                          <Image
                            source={Images.infoLogo}
                            style={{ width: 17, height: 17, marginRight: 10 }}
                          />
                          <View style={{ flexDirection: "column" }}>
                            <View style={{ flexDirection: "row" }}>
                              <Text size={p17} color="#fff">
                                {"I have read anc accept the "}
                              </Text>
                              <TouchableOpacity>
                                <Text bold size={p17} color="#40C5B7">
                                  Terms
                                </Text>
                              </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                              <TouchableOpacity>
                                <Text bold size={p17} color="#40C5B7">
                                  {"Conditions"}
                                </Text>
                              </TouchableOpacity>
                              <Text size={p17} color="#fff">
                                {" and the "}
                              </Text>
                              <TouchableOpacity>
                                <Text bold size={p17} color="#40C5B7">
                                  Privacy Policy
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </Block>
                    </KeyboardAwareScrollView>
                  </Block>
                </Block>
              </Block>
            </Block>
          </Block>
        </ScrollView>
        <View style={pickerSelectStyles.bottomView}>
          <Text color={argonTheme.COLORS.WHITE}>
            {"Do you have an account? "}{" "}
          </Text>
          <TouchableOpacity onPress={this._signInAsync}>
            <Text bold size={p20} color={argonTheme.COLORS.WHITE}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }

  _registerAsync = () => {
    console.log("register successfully");
    //this.props.navigation.navigate('Preferences');
    this.props.navigation.navigate("CompleteProfile");
  };

  _navigateToHome = () => {
    this.props.navigation.navigate("App");
  };
}

const pickerSelectStyles = StyleSheet.create({
  input: {
    height: p55,
    width: width * 0.9,
    backgroundColor: "white",
    marginBottom: p10,
    paddingLeft: p20,
    paddingRight: p20,
    color: "black",
    borderWidth: 2,
    fontSize: p14,
    borderColor: "#069987",
  },
  bottomView: {
    width: "100%",
    height: 50,
    backgroundColor: "#005E51",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
  },
});
const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
