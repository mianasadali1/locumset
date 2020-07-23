import React, { Component } from "react";
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
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons";
import Logo from "../../Themes/assets/img/logo.png";
import { connect } from "react-redux";
import { Input, Block, Text, theme, Button } from "galio-framework";
import { Images } from "../../Themes";
import { argonTheme } from "../../Themes/constants";
import Spinner from "react-native-loading-spinner-overlay";
import PropTypes from "prop-types";
import SplashScreen from "react-native-splash-screen";
import firebase from "react-native-firebase";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-simple-toast";

// import login actions from login redux
import LoginActions from "../../Redux/LoginRedux";

// import {
//   // Button,
//   IconExtra as Icon,
//   // Input,
//   // SpinnerComponent
// } from "../../Components/Icon";

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

class Login extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    fetching: PropTypes.bool,
    token: PropTypes.string,
    attemptLogin: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.keyboardHeight = new Animated.Value(0);
    // this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
    this.handleBackPress = this.handleBackPress.bind(this);
  }

  state = {
    email: "",
    password: "",
    rememberMe: 0,
    spinner: false,
    deviceToken: null,
    errors: { email: "", password: "" },
  };

  componentDidMount() {
    if (Platform.OS == "android") {
      setTimeout(() => {
        SplashScreen.hide();
      }, 1500);
    }
    firebase
      .messaging()
      .getToken()
      .then((fcmToken) => {
        this.setState({ deviceToken: fcmToken });
      });
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
    BackHandler.exitApp(); // works best when the goBack is async
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

  navigateOnForgotPassword = () => {
    this.props.navigation.navigate("ForgotPassword");
  };

  onSubmit = () => {
    console.log("login", this.props);
    // this.props.navigation.navigate('Dashboard')
    if (!this.validateEmail(this.state.email)) {
      this.setState({
        ...this.state,
        errors: { email: "Enter valid email address!", password: null },
      });
    } else if (!this.state.password) {
      this.setState({
        ...this.state,
        errors: { password: "Enter password first!", email: null },
      });
    } else {
      this.setState({ ...this.state, errors: { password: null, email: null } });
      this.props.attemptLogin(
        this.state.email,
        this.state.password,
        this.state.deviceToken
      );
    }
  };

  _registerNavigate = () => {
    this.props.navigation.navigate("Account");
  };

  render() {
    const { fetching } = this.props;
    const { email, password } = this.state;
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
          <Image
            center
            source={Images.loginLogo}
            style={{ width: p200, height: p75, paddingBottom: p20 }}
          />
          <Text color="#fff" size={p20} style={{ marginTop: p10 }}>
            Nice to have you back
          </Text>
        </Block>
        <Block width={width * 0.8}>
          <TextInput
            ref={(ref) => (this.email = ref)}
            // style={{borderRadius: 20, borderColor: '#069987', borderWidth: 2}}
            style={{
              ...styles.input,
              marginBottom: this.state.errors.email ? 0 : p10,
            }}
            borderless
            placeholder="Email Address"
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => this.password.focus()}
            value={email}
            onChangeText={(text) => this.handleChange("email", text)}
          />
          {this.state.errors.email ? (
            <Text color="#FF0808">{this.state.errors.email}</Text>
          ) : null}
        </Block>
        <Block width={width * 0.8}>
          <TextInput
            ref={(ref) => (this.password = ref)}
            // style={{borderRadius: 20, borderColor: '#069987', borderWidth: 2}}
            style={{
              ...styles.input,
              marginBottom: this.state.errors.password ? 0 : p10,
            }}
            password
            borderless
            placeholder="Password"
            value={password}
            secureTextEntry={true}
            autoCapitalize="none"
            returnKeyType="go"
            onSubmitEditing={() => this.onSubmit()}
            onChangeText={(text) => this.handleChange("password", text)}
            onSubmitEditing={this.onSubmit}
          />
          {this.state.errors.password ? (
            <Text color="#FF0808">{this.state.errors.password}</Text>
          ) : null}
        </Block>
        <Block style={{ marginTop: p20 }}>
          <Button
            color="primary"
            style={styles.createButton}
            onPress={this.onSubmit}
          >
            <Text bold size={p20} color={argonTheme.COLORS.WHITE}>
              {"Sign In".toUpperCase()}
            </Text>
          </Button>
          <Block>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                center
                size={p20}
                color="#005E51"
                style={{ marginTop: p20, marginBottom: p20 }}
              >
                {"Forgot Password? "}
              </Text>
              <TouchableOpacity onPress={this.navigateOnForgotPassword}>
                <Text
                  center
                  bold
                  size={p20}
                  color="#005E51"
                  style={{ marginTop: p20, marginBottom: p20 }}
                >
                  Reset
                </Text>
              </TouchableOpacity>
            </View>
          </Block>
        </Block>
        <View style={styles.bottomView}>
          <Text color={argonTheme.COLORS.WHITE}>
            {"Don't have an account? "}{" "}
          </Text>
          <TouchableOpacity onPress={this._registerNavigate}>
            <Text bold size={p20} color={argonTheme.COLORS.WHITE}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
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
  bottomView: {
    width: "100%",
    height: 55,
    backgroundColor: "#005E51",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
  },
  passwordCheck: {
    paddingLeft: p17,
    paddingTop: p17,
    paddingBottom: p30,
  },
  input: {
    height: p55,
    backgroundColor: "white",
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
    height: p50,
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
  fetching: state.login.fetching,
});

const mapDispatchToProps = (dispatch) => ({
  attemptLogin: (email, password, token) =>
    dispatch(LoginActions.loginRequest(email, password, token)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
// export default Login
