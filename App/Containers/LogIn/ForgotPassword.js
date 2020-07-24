import React, { Component } from "react";
import LottieView from "lottie-react-native";

import {
  View,
  Alert,
  Image,
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  Animated,
  Keyboard,
  ScrollView,
  Switch,
  AsyncStorage,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  BackHandler,
} from "react-native";
import Icon from "react-native-vector-icons";
import Logo from "../../Themes/assets/img/logo.png";
import { connect } from "react-redux";
import { Input, Block, Text, theme, Button } from "galio-framework";
import { Images } from "../../Themes";
import { argonTheme } from "../../Themes/constants";
import Spinner from "react-native-loading-spinner-overlay";
import PropTypes from "prop-types";
import firebase from "react-native-firebase";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-simple-toast";

// import login actions from login redux
import ForgPasswordActions from "../../Redux/ForgotPasswordRedux";

const { width, height } = Dimensions.get("screen");
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

class ForgotPassword extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    fetching: PropTypes.bool,
    attemptToForgotPassword: PropTypes.func,
    attemptToUpdatePass: PropTypes.func,
    attemptToRemoveForgot: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.keyboardHeight = new Animated.Value(0);
    // this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
    this.handleBackPress = this.handleBackPress.bind(this);
    this.props.attemptToRemoveForgot();
  }

  state = {
    email: "",
    code: "",
    password: "",
  };

  componentDidMount() {
    this.animation.play();
  }

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
    this.props.navigation.goBack(); // works best when the goBack is async
    return true;
  };

  keyboardWillShow = (event) => {
    // Animated.parallel([
    //   Animated.timing(this.keyboardHeight, {
    //     duration: event.duration,
    //     toValue: event.endCoordinates.height,
    //   }),
    //   Animated.timing(this.imageHeight, {
    //     duration: event.duration,
    //     toValue: IMAGE_HEIGHT_SMALL,
    //   }),
    // ]).start();
  };

  keyboardWillHide = (event) => {
    // Animated.parallel([
    //   Animated.timing(this.keyboardHeight, {
    //     duration: event.duration,
    //     toValue: 0,
    //   }),
    //   Animated.timing(this.imageHeight, {
    //     duration: event.duration,
    //     toValue: IMAGE_HEIGHT,
    //   }),
    // ]).start();
  };

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };

  // Validate Email function
  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  onSubmit = () => {
    if (this.props.isForgot) {
      if (!this.state.code) {
        Toast.show("Enter varification code!", Toast.LONG);
      } else if (!this.state.password) {
        Toast.show("Enter new password!", Toast.LONG);
      } else {
        let data = {
          email: this.state.email,
          token: this.state.code,
          password: this.state.password,
        };
        this.props.attemptToUpdatePass(data);
      }
    } else if (!this.validateEmail(this.state.email)) {
      Toast.show("Enter valid email address!", Toast.LONG);
    } else {
      this.props.attemptToForgotPassword(this.state.email);
    }
  };

  render() {
    const { fetching, isForgot } = this.props;
    const { email, code, password } = this.state;
    return (
      <KeyboardAwareScrollView
        ref={(ref) => (this.scrollView = ref)}
        keyboardShouldPersistTaps={"handled"}
        style={{ flex: 1, backgroundColor: "#009b80" }}
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spinner visible={fetching} />
        <Block
          center
          width={width * 0.8}
          style={{ marginBottom: p40, marginTop: p30 }}
        >
          <View
            style={{
              justifyContent: "center",
              alignContent: "center",
              backgroundColor: "#005E51",
              borderRadius: 100,
              borderWidth: 13,
              borderColor: "#005E51",
            }}
          >
            <LottieView
              ref={(animation) => {
                this.animation = animation;
              }}
              style={{ width: 100, height: 100 }}
              source={require("../assets/16766-forget-password-animation.json")}
            />
          </View>
        </Block>
        {!isForgot ? (
          <Block>
            <Block width={width * 0.8}>
              <TextInput
                ref={(ref) => (this.email = ref)}
                // style={{borderRadius: 20, borderColor: '#069987', borderWidth: 2}}
                style={styles.input}
                borderless
                placeholder="Email Address"
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={this.onSubmit}
                value={email}
                onChangeText={(text) => this.handleChange("email", text)}
              />
            </Block>
            <Block style={{ marginTop: p20 }}>
              <Button
                color="primary"
                style={styles.createButton}
                onPress={this.onSubmit}
              >
                <Text bold size={p20} color={argonTheme.COLORS.WHITE}>
                  {"Send".toUpperCase()}
                </Text>
              </Button>
            </Block>
          </Block>
        ) : (
          <Block>
            <Block width={width * 0.8}>
              <TextInput
                ref={(ref) => (this.code = ref)}
                // style={{borderRadius: 20, borderColor: '#069987', borderWidth: 2}}
                style={styles.input}
                borderless
                placeholder="Verification Code"
                keyboardType="numeric"
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => this.password.focus()}
                value={code}
                onChangeText={(text) => this.handleChange("code", text)}
              />
            </Block>
            <Block width={width * 0.8}>
              <TextInput
                ref={(ref) => (this.password = ref)}
                // style={{borderRadius: 20, borderColor: '#069987', borderWidth: 2}}
                style={styles.input}
                password
                borderless
                placeholder="New Password"
                value={password}
                secureTextEntry={true}
                autoCapitalize="none"
                returnKeyType="go"
                onChangeText={(text) => this.handleChange("password", text)}
                onSubmitEditing={this.onSubmit}
              />
            </Block>
            <Block style={{ marginTop: p20 }}>
              <Button
                color="primary"
                style={styles.createButton}
                onPress={this.onSubmit}
              >
                <Text bold size={p20} color={argonTheme.COLORS.WHITE}>
                  {"Update Password".toUpperCase()}
                </Text>
              </Button>
            </Block>
          </Block>
        )}
      </KeyboardAwareScrollView>
    );
  }
}
const styles = StyleSheet.create({
  verticalAlign: {
    marginTop: height * 0.1,
  },
  registerContainer: {
    width: width * 1,
    //height: height * 1,
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden",
  },
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA",
  },
  socialButtons: {
    width: 120,
    height: p40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: p17,
  },
  inputIcons: {
    marginRight: p17,
  },
  passwordCheck: {
    paddingLeft: p17,
    paddingTop: p17,
    paddingBottom: p30,
  },
  input: {
    height: p55,
    backgroundColor: "white",
    marginBottom: p10,
    paddingLeft: p20,
    paddingRight: p20,
    justifyContent: "center",
    alignItems: "center",
    color: "black",
    paddingBottom: 0,
    paddingTop: 0,
    borderWidth: 2,
    fontSize: p20,
    borderColor: "#069987",
  },
  createButton: {
    width: width * 0.8,
    marginTop: p25,
    height: p45,
    backgroundColor: "#005E51",
    color: "#fff",
  },
  registerButton: {
    width: width * 0.8,
    marginTop: p25,
    height: p45,
    color: "#fff",
    borderColor: "#fff",
    backgroundColor: "#0DA194",
    borderWidth: 1,
  },
});

const mapStateToProps = (state) => ({
  fetching: state.forgotPass.fetching || state.forgotPass.upd_fetching,
  isForgot: state.forgotPass.isForgot,
});

const mapDispatchToProps = (dispatch) => ({
  attemptToForgotPassword: (email) =>
    dispatch(ForgPasswordActions.forgPasswordRequest(email)),
  attemptToUpdatePass: (data) =>
    dispatch(ForgPasswordActions.updatePassRequest(data)),
  attemptToRemoveForgot: () => dispatch(ForgPasswordActions.isForgotRemove()),
});
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
// export default Login
