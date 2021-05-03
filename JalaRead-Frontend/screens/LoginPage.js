import React, { useEffect, useState } from "react";
import {
  FlatList,
  Button,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import TestingSensorPage from "./TestingSensorPage";
import Spinner from "react-native-loading-spinner-overlay";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { useSelector, useDispatch } from "react-redux";
import { ADD_USER } from "../store/constants";

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

import { Dimensions, TouchableHighlight, Image } from "react-native";

export default function LoginPage({ navigation }) {
  const [text, onChangeText] = React.useState("location ");
  const reduxState = useSelector((state) => state.initialReducer.user);
  const dispatch = useDispatch();
  const [data, setData] = React.useState({
    email: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidPassword: true,
    isValidUser: true,
  });

  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handelPasswordChange = (val) => {
    if (val.trim().length >= 6) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecuretextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  const pressHandler = () => {
    navigation.navigate("Home");
  };

  const pressHandler2 = () => {
    navigation.navigate("Signup");
  };

  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };
  const loginHandle = (email, password) => {
    if (data.email.length >= 4 && data.password.length >= 6) {
      // navigation.navigate('Home');
      username: data.email;
      password: data.password;
      const req = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: data.email,
          password: data.password,
          // tele_no: data.contact_no,
          // location: selectedValue,
          // nic_no : data.NIC,
          // email : data.email,
          // user_f_name : "Meraj",
          // user_l_name : "Vindira",
          // admin : false
        }),
      };

      console.log(data.email);

      var errorAlert = "";

      fetch("http://127.0.0.1:5000/login", req)
        .then((response) => response.json())
        .then((response) => {
          if (response["message"] == "Unauthorized") {
            errorAlert = "Username or password doesn't match";
          }
          if (response["message"] == "Authorized") {
            navigation.navigate("Dashboard");
            console.log("This Is User Name from API :", user_name);
            var user_name = response["user_details"]["user_name"];
            dispatch({
              type: ADD_USER,
              payload: user_name || "",
            });
          }
        });
    } else if (data.email.length == 0 || data.password.length == 0) {
      alert("Please fill the following requirments");
    }
  };

  return (
    <View style={{ flex: 1, padding: 0, backgroundColor: "white" }}>
      {/* {isLoading ? <ActivityIndicator/> : ( */}

      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* <View style = {styles.PageCotent}> */}
        {/* <View style = {styles.InnerHeadContent}>
                <Text style = {styles.InnerHeadText}>Welcome to<br/><Text style = {{color:"#0099C9"}}>JalaRead</Text>, mobile</Text>
                <Text style = {styles.InstructionText}>
                Your water testing deviceses, mobile <br/>application on your fingertips
                </Text>
            </View> */}
        <View style={styles.headContainer}>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate("WelcomePage")}
            >
              <Image
                source={require("../assets/back-arrow-blue.png")}
                style={styles.BackArrow}
              />
            </TouchableOpacity>

            <Text style={styles.HeadText}>JalaRead</Text>
          </View>
        </View>

        <View style={styles.Instruction}>
          <Image
            source={require("../assets/login-page-img.svg")}
            style={styles.LoginPageImg}
          />
          <Text style={styles.LoginHeadTxt}>
            <Text style={styles.LoginHeadTxtCap}>Login</Text>
            <br />
            Welcome Back!
          </Text>

          <View
            style={{
              marginTop: 290,
              position: "absolute",
              width: "100%",
              height: "50%",
            }}
          >
            <Animatable.View animation="fadeInUpBig" style={styles.footer}>
              <Text style={styles.text_footer}>Username</Text>
              <View style={styles.action}>
                <FontAwesome name="user-o" color="#05375a" size={20} />

                <TextInput
                  placeholder="Enter Your Username"
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={(val) => textInputChange(val)}
                  onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                />
                {data.check_textInputChange ? (
                  <Animatable.View animation="bounceIn">
                    <Feather
                      name="check-circle"
                      color="#37E290"
                      size={20}
                      style={{ position: "absolute", right: -150 }}
                    />
                  </Animatable.View>
                ) : null}
              </View>
              {data.isValidUser ? null : (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>
                    Username must be more than 4 characters.
                  </Text>
                </Animatable.View>
              )}

              <Text
                style={[
                  styles.text_footer,
                  {
                    marginTop: 35,
                  },
                ]}
              >
                Password
              </Text>

              <View style={styles.action}>
                <Feather name="lock" color="#05375a" size={20} />

                <TextInput
                  placeholder="Enter Your Password"
                  secureTextEntry={data.secureTextEntry ? true : false}
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={(val) => handelPasswordChange(val)}
                />
                <TouchableOpacity onPress={updateSecuretextEntry}>
                  {data.secureTextEntry ? (
                    <Feather
                      name="eye-off"
                      color="grey"
                      size={20}
                      style={{ position: "absolute", right: -150 }}
                    />
                  ) : (
                    <Feather
                      name="eye"
                      color="grey"
                      size={20}
                      style={{ position: "absolute", right: -150 }}
                    />
                  )}
                </TouchableOpacity>
              </View>
              {data.isValidPassword ? null : (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>
                    Password must be more than 6 characters.
                  </Text>
                </Animatable.View>
              )}
            </Animatable.View>
          </View>
        </View>
        <View style={styles.BottomButtomContainer}>
          <TouchableOpacity
            style={styles.BottomButtom}
            onPress={() => {
              loginHandle(data.email, data.password);
            }}
          >
            <Text style={styles.BottomButtomText}>Login</Text>
          </TouchableOpacity>
          <Text style={styles.BottomButtomCapText}>
            Don't have an account?{" "}
            <TouchableOpacity
              style={{ color: "#FF7B8A" }}
              onPress={() => navigation.navigate("SignUpPage")}
            >
              Sign in
            </TouchableOpacity>
          </Text>
        </View>

        {/* </View> */}
      </View>
      {/* )} */}
    </View>
  );
}

const AppButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);

const MyActivityIndicator = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      //size can be "small" or "large"
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  );
};

// export default MyActivityIndicator;

const styles = StyleSheet.create({
  textInput: {
    marginLeft: 10,
    fontFamily: "SF Pro Rounded",
  },

  text_footer: {
    color: "#626263",
    fontSize: 16,
    fontWeight: 600,
    fontFamily: "SF Pro Rounded",
  },
  errorMsg: {
    color: "#C70039",
    fontSize: 14,
    fontFamily: "SF Pro Rounded",
  },
  footer: {
    paddingBottom: "20%",
    position: "absolute",
    width: "80%",
    marginLeft: "10%",
    marginTop: "5%",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },

  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },

  BottomButtomContainer: {
    // flex: 1,
    postion: "absolute",
    // bottom:100,
    // left:-27,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    bottom: "0%",
    height: "20%",
    // marginTop:'5%',
    // marginBottom:'5%',
    // borderWidth:3,
    marginTop: 0,

    // paddingTop: 200,
  },

  BottomButtom: {
    width: "40%",
    borderRadius: 11,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#030082",
    // marginBottom: 0
  },

  BottomButtomText: {
    fontSize: 16,
    fontWeight: 600,
    color: "white",
    fontFamily: "SF Pro Rounded",
  },

  BottomButtomCapText: {
    fontSize: 13,
    fontWeight: 600,
    color: "#515151",
    marginTop: 10,
    fontFamily: "SF Pro Rounded",
  },

  HeadText: {
    position: "absolute",
    // fontFamily:"ubuntu",
    fontFamily: "SF Pro Rounded",
    fontSize: 23,
    fontWeight: "bold",
    color: "#030093",
    top: "50%",
    right: 30,
  },
  LoginHeadTxt: {
    position: "absolute",
    // fontFamily:"ubuntu",
    fontFamily: "SF Pro Rounded",
    fontSize: 23,
    fontWeight: 800,
    color: "#030093",
    top: "50%",
    left: 40,
    marginEnd: 200,
  },
  LoginHeadTxtCap: {
    // fontFamily:"ubuntu",
    fontFamily: "SF Pro Rounded",
    fontSize: 16,
    fontWeight: 600,
    color: "#626263",
  },

  HeadTextCap: {
    position: "absolute",
    fontFamily: "SF Pro Rounded",
    fontSize: 14,
    // fontWeight:"bold",
    color: "#D1E1FF",
    top: 103,
    left: 30,
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#EFFBFF",
  },
  headContainer: {
    flex: 1,
    position: "absolute",
    width: Dimensions.get("window").width,
    height: "26%",
  },
  headContent: {
    flex: 1,
    // width:Dimensions.get("window").width,
    // height: "10%",
  },

  InnerHeadContent: {
    // flex: 1,
    postion: "absolute",
    // bottom:100,
    // left:-27,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    top: "12%",
    height: "10%",
    marginTop: "5%",
    marginBottom: "5%",
    backgroundColor: "white",
    borderStyle: "solid",
    borderWidth: 0,
    // borderColor:"#030096",
    borderRadius: 25,
    paddingTop: 50,
    // borderWidth:3,
    // paddingTop: 200,
  },

  InnerHeadText: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#00397C",
    postion: "absolute",
    fontFamily: "SF Pro Rounded",
    bottom: 180,
    textAlign: "center",
    lineHeight: 30,
    marginBottom: 15,
  },

  Instruction: {
    // flex: 1,
    postion: "absolute",
    // bottom:100,
    // left:-27,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    top: "20%",
    height: "50%",
    width: Dimensions.get("window").width,
    marginRight: 0,
    marginTop: "5%",
    //  marginBottom:'5%',
    //  borderWidth:3,

    // paddingTop: 200,
  },

  InstructionNum: {
    postion: "absolute",
    flexDirection: "row",
    width: "80%",
    // borderWidth: 1,
    padding: 27,
    paddingBottom: 15,
    paddingTop: 10,

    borderColor: "rgba(0, 0, 0, 0.5)",
    backgroundColor: "white",
  },

  InstructionText: {
    color: "#626263",
    fontSize: 16,
    fontWeight: 600,
    textAlign: "center",
    fontFamily: "SF Pro Rounded",
    paddingBottom: 5,
  },

  StartLogo: {
    // justifyContent: 'center',
    // alignItems: 'center',
    width: 25,
    height: 25,
    marginRight: "10%",
    marginTop: 10,
  },
  LoginPageImg: {
    // justifyContent: 'center',
    // alignItems: 'center',
    width: 257,
    height: 231,
    postion: "absolute",
    bottom: "40%",
  },

  WelcomeLogo: {
    width: 70,
    height: 70,
    postion: "absolute",
    bottom: "100%",
  },

  input: {
    height: 40,
    margin: 12,
    width: 320,
    borderBottomWidth: 1,
    borderColor: "#030093",
    fontFamily: "SF Pro Rounded",
    // textAlign:"center",
  },

  BackArrow: {
    // justifyContent: 'center',
    // alignItems: 'center',
    width: 10,
    height: 17,
    marginLeft: 30,
    marginTop: 30,
  },
});
