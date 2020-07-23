import React, { Component } from 'react'
import { ScrollView, Image, View, Input, KeyboardAvoidingView, Dimensions, } from 'react-native'
import DevscreensButton from '../../ignite/DevScreens/DevscreensButton.js'

import { Block, Text, theme } from "galio-framework";
import { Images } from '../Themes'

const { width, height } = Dimensions.get("screen");

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends Component {
  render () {
    return (
    <ScrollView>
        <Block flex middle style={{backgroundColor: '#009B80'}}>
            <Block flex middle>
              <Block style={styles.registerContainer}>
                <Block flex>
                  <Block flex={0.17} middle>
                    <Text color="#8898AA" size={15}>
                    </Text>
                  </Block>
                  <Block flex center>
                    <KeyboardAvoidingView
                      style={{ flex: 1 }}
                      behavior="position"
                      enabled
                    >
                      <Block center width={width * 0.8} style={{ marginBottom: 40, marginTop: 30 }}>
                        <Image
                        center
                        source={Images.logo}
                        style={{ width: 200, height: 70, paddingBottom: 20 }}
                      />
                      <Text color="#fff" size={17} style={{marginTop: 10}}>
                        Welcome Back!
                      </Text>
                      </Block>

                      <Block width={width * 0.8} >
                        <Input
                          style={{borderRadius: 20, borderColor: '#069987', borderWidth: 2}}
                          borderless
                          placeholder="Email Address"
                          onChangeText={text => this.handleChange('email', text)}
                          // iconContent={
                          //   <Icon
                          //     size={16}
                          //     color={argonTheme.COLORS.ICON}
                          //   />
                          // }
                        />
                      </Block>
                      <Block width={width * 0.8}>
                        <Input
                          style={{borderRadius: 20, borderColor: '#069987', borderWidth: 2}}
                          password
                          borderless
                          placeholder="Password"
                          onChangeText={text => this.handleChange('password', text)}
                          // iconContent={
                          //   <Icon
                          //     size={16}
                          //     color={argonTheme.COLORS.ICON}
                          //   />
                          // }
                        />
                      </Block>
                      <Block middle>
                        // <Button color="primary" style={styles.createButton} onPress={this._signInAsync}>
                        //   <Text bold size={16} style={{color: '#fff'}}>
                        //     {'Sign In'.toUpperCase()}
                        //   </Text>
                        // </Button>
                        <Text bold size={12} style={{color: '#fff'}} style={{marginTop: 20, marginBottom: 20}}>
                          Forgot Password?
                        </Text>
                        // <Button color="primary" style={styles.registerButton} onPress={this._registerNavigate}>
                        //   <Text bold size={16} style={{color: '#fff'}}>
                        //     CREATE NEW ACCOUNT
                        //   </Text>
                        // </Button>
                      </Block>
                    </KeyboardAvoidingView>

                  </Block>
                </Block>
              </Block>
            </Block>
        </Block>
      </ScrollView>
    )
  }
}
