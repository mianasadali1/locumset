//This is an example code for the popup menu//
import React, { Component } from 'react';
//import react in our code.
import { View, Text,Image, TouchableOpacity, Dimensions  } from 'react-native';
//import all the components we are going to use.
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
//import menu and menu item
const { width, height } = Dimensions.get("screen");

const p30 = 30/480*width;

export default class CustomMenu extends Component {
  _menu = null;
  setMenuRef = ref => {
    this._menu = ref;
  };
  showMenu = () => {
    this._menu.show();
  };
  hideMenu = () => {
    this._menu.hide();
  };
  option1Click = () => {
    this._menu.hide();
    this.props.option1Click();
  };
  option2Click = () => {
    this._menu.hide();
    this.props.option2Click();
  };
  option3Click = () => {
    this._menu.hide();
    this.props.option3Click();
  };
  option4Click = () => {
    this._menu.hide();
    this.props.option4Click();
  };
  render() {
    return (
      <View style={this.props.menustyle}>
        <Menu
          ref={this.setMenuRef}
          button={
            <TouchableOpacity onPress={this.showMenu}>
           <Image 
              source={{uri: 'https://aboutreact.com/wp-content/uploads/2018/12/menu_icon.png'}} 
              style={{width: p30, height: p30}} 
            />
            </TouchableOpacity>
          }>
          <MenuItem onPress={this.option1Click}>Settings</MenuItem>
          {/* <MenuItem onPress={this.option2Click}>Info</MenuItem> */}
        </Menu>
      </View>
    );
  }
}
