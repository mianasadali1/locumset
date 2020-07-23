import { StyleSheet, Text, View, Dimensions, PixelRatio} from 'react-native';
import { Images, argonTheme } from "../../Themes/constants";
const { width, height } = Dimensions.get("screen");

export default StyleSheet.create({
  verticalAlign: {
    marginTop: height * 0.1,
  },
  registerContainer: {
    width: width * 1,
    //height: height * 1,
    borderRadius: 4,
  },
  ImageContainer: {
    borderRadius: 10,
    width: 250,
    height: 250,
    borderColor: '#DEDEDE',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  ImageCont: {
    borderRadius: 10,
    width: 200,
    height: 200,
    borderColor: '#DEDEDE',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    marginVertical: 10,
  },
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  createButton: {
    width: width * 0.8,
    //marginTop: 25,
    //borderRadius: 20,
    backgroundColor: "#005E51",
    color: '#fff',
  },
  registerButton: {
    width: width * 0.8,
    marginTop: 25,
    borderRadius: 20,
    color: '#fff',
    borderColor: '#fff',
    backgroundColor: "#009B80",
    borderWidth: 1,
  }
});
