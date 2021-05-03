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
  ScrollView,
  Picker,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import TestingSensorPage from "./TestingSensorPage";
import Spinner from "react-native-loading-spinner-overlay";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { RadioButton } from "react-native-paper";
// import RadioButton from './components/RadioButton';
// import RadioButtonRN from 'radio-buttons-react-native';
// import RadioButtonRN from 'radio-buttons-react-native';
// import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

import { Dimensions, TouchableHighlight, Image } from "react-native";

export default function SignUpPage({ navigation }) {
  const [checked, setChecked] = React.useState("first");
  const [data, setData] = React.useState({
    UserName: "",
    FirstName: "",
    LastName: "",
    email: "",
    password: "",
    confirm_password: "",
    contact_no: "",
    NIC: "",

    check_textInputChangeU: false,
    check_textInputChangeF: false,
    check_textInputChangeL: false,
    check_textInputChange2: false,
    check_textInputChange3: false,
    check_textInputChange4: false,
    check_textInputChange5: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
    isValidUserU: true,
    isValidUserF: true,
    isValidUserL: true,
    isValidPassword: true,
    isValidContactno: true,
    isValidNIC: true,
    isValidEmail: true,
    isValidConfirmPassword: true,
    isValidLocation: true,
  });

  const textInputChangeU = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        UserName: val,
        check_textInputChangeU: true,
        isValidUserU: true,
      });
    } else {
      setData({
        ...data,
        UserName: "",
        check_textInputChangeU: false,
        isValidUserU: false,
      });
    }
  };
  const textInputChangeF = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        FirstName: val,
        check_textInputChangeF: true,
        isValidUserF: true,
      });
    } else {
      setData({
        ...data,
        FirstName: "",
        check_textInputChangeF: false,
        isValidUserF: false,
      });
    }
  };
  const textInputChangeL = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        LastName: val,
        check_textInputChangeL: true,
        isValidUserL: true,
      });
    } else {
      setData({
        ...data,
        LastName: "",
        check_textInputChangeL: false,
        isValidUserL: false,
      });
    }
  };
  const textInputChange2 = (val) => {
    if (!isNaN(val) && val.trim().length == 10) {
      setData({
        ...data,
        contact_no: val,
        check_textInputChange2: true,
        isValidContactno: true,
      });
    } else {
      setData({
        ...data,
        contact_no: "",
        check_textInputChange2: false,
        isValidContactno: false,
      });
    }
  };
  const textInputChange3 = (val) => {
    if (!isNaN(val) && val.trim().length == 12) {
      setData({
        ...data,
        NIC: val,
        check_textInputChange3: true,
        isValidNIC: true,
      });
    } else if (val.slice(-1) == "v" && val.trim().length == 12) {
      setData({
        ...data,
        NIC: val,
        check_textInputChange3: true,
        isValidNIC: true,
      });
    } else if (val.slice(-1) == "V" && val.trim().length == 12) {
      setData({
        ...data,
        NIC: val,
        check_textInputChange3: true,
        isValidNIC: true,
      });
    } else {
      setData({
        ...data,
        NIC: "",
        check_textInputChange3: false,
        isValidNIC: false,
      });
    }
  };
  const textInputChange4 = (val) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (val.trim().length >= 10 && reg.test(val) === true) {
      setData({
        ...data,
        email: val,
        check_textInputChange4: true,
        isValidEmail: true,
      });
    } else {
      setData({
        ...data,
        email: "",
        check_textInputChange4: false,
        isValidEmail: false,
      });
    }
  };

  const handelPasswordChange = (val) => {
    if (val.trim().length >= 6) {
      setData({
        ...data,
        password: val,
        check_textInputChange5: true,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: "",
        check_textInputChange5: false,
        isValidPassword: false,
      });
    }
  };
  const handelConfirmPasswordChange = (val) => {
    if (data.password == val) {
      setData({
        ...data,
        confirm_password: val,
        check_textInputChange5: true,
        isValidConfirmPassword: true,
      });
    } else {
      setData({
        ...data,
        confirm_password: "",
        check_textInputChange5: true,
        isValidConfirmPassword: false,
      });
    }
  };

  const updateSecuretextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  const updateConfirmSecuretextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };
  const pressHandler = async () => {
    if (
      data.email.length == 0 ||
      data.contact_no.length == 0 ||
      data.NIC.length == 0 ||
      data.UserName.length == 0 ||
      data.password.length == 0 ||
      data.confirm_password.length == 0 ||
      data.FirstName.length == 0 ||
      data.LastName.length == 0
    ) {
      alert("Fill the following requirments");
    } else {
      const req = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: data.UserName,
          password: data.password,
          tele_no: data.contact_no,
          location: selectedValue,
          nic_no: data.NIC,
          email: data.email,
          user_f_name: data.FirstName,
          user_l_name: data.LastName,
          admin: checked,
        }),
      };

      console.log(data.email);

      var errorAlert = "";

      fetch("http://127.0.0.1:5000/signup", req)
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          if (response["message"] == "Unauthorized") {
            errorAlert = "Username or password doesn't match";
            alert(errorAlert);
          }
          if (response["message"] == "Authorized") {
            navigation.navigate("Dashboard");
          }
        });
    }
  };
  const pressHandler2 = async () => {
    // navigation.navigate('Login');
  };

  const [selectedValue, setSelectedValue] = React.useState("");
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
            <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
              <Image
                source={require("../assets/back-arrow-blue.png")}
                style={styles.BackArrow}
              />
            </TouchableOpacity>

            <Text style={styles.HeadText}>JalaRead</Text>
          </View>
        </View>

        <View style={styles.Instruction}>
          <Text style={styles.LoginHeadTxt}>
            <Text style={styles.LoginHeadTxtCap}>Sign up</Text>
            <br />
            Create an Account
          </Text>
          <ScrollView style={styles.scrollView}>
            <Animatable.View animation="fadeInUpBig" style={styles.footer}>
              <Text style={styles.text_footer}>Username</Text>
              <View style={styles.action}>
                <FontAwesome name="user-o" color="#05375a" size={20} />

                <TextInput
                  placeholder="Enter Your First name"
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={(val) => textInputChangeU(val)}
                />
                {data.check_textInputChangeU ? (
                  <Animatable.View animation="bounceIn">
                    <Feather
                      name="check-circle"
                      color="green"
                      size={20}
                      style={{ position: "absolute", right: -150 }}
                    />
                  </Animatable.View>
                ) : null}
              </View>
              {data.isValidUserU ? null : (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>
                    Username must be more than 4 characters.
                  </Text>
                </Animatable.View>
              )}
              <Text style={styles.text_footer}>First Name</Text>
              <View style={styles.action}>
                <FontAwesome name="user-o" color="#05375a" size={20} />

                <TextInput
                  placeholder="Enter Your First name"
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={(val) => textInputChangeF(val)}
                />
                {data.check_textInputChangeF ? (
                  <Animatable.View animation="bounceIn">
                    <Feather
                      name="check-circle"
                      color="green"
                      size={20}
                      style={{ position: "absolute", right: -150 }}
                    />
                  </Animatable.View>
                ) : null}
              </View>
              {data.isValidUserF ? null : (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>
                    Username must be more than 4 characters.
                  </Text>
                </Animatable.View>
              )}
              <Text style={styles.text_footer}>Last Name</Text>
              <View style={styles.action}>
                <FontAwesome name="user-o" color="#05375a" size={20} />

                <TextInput
                  placeholder="Enter Your Last name"
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={(val) => textInputChangeL(val)}
                />
                {data.check_textInputChangeL ? (
                  <Animatable.View animation="bounceIn">
                    <Feather
                      name="check-circle"
                      color="green"
                      size={20}
                      style={{ position: "absolute", right: -150 }}
                    />
                  </Animatable.View>
                ) : null}
              </View>
              {data.isValidUserL ? null : (
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
                Phone Number
              </Text>
              <View style={styles.action}>
                <Feather name="phone" color="#05375a" size={20} />

                <TextInput
                  placeholder="Enter Your Contact No"
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={(val) => textInputChange2(val)}
                />
                {data.check_textInputChange2 ? (
                  <Animatable.View animation="bounceIn">
                    <Feather
                      name="check-circle"
                      color="green"
                      size={20}
                      style={{ position: "absolute", right: -150 }}
                    />
                  </Animatable.View>
                ) : null}
              </View>
              {data.isValidContactno ? null : (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>
                    Contact No must be 10 Numbers
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
                NIC
              </Text>
              <View style={styles.action}>
                <Feather name="credit-card" color="#05375a" size={20} />

                {
                  <TextInput
                    placeholder="Enter Your National Identity Card Number"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange3(val)}
                  />
                }

                {data.check_textInputChange3 ? (
                  <Animatable.View animation="bounceIn">
                    <Feather
                      name="check-circle"
                      color="green"
                      size={20}
                      style={{ position: "absolute", right: -150 }}
                    />
                  </Animatable.View>
                ) : null}
              </View>
              {data.isValidNIC ? null : (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>
                    NIC Number must be 12 characters.
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
                Email
              </Text>
              <View style={styles.action}>
                <Feather name="mail" color="#05375a" size={20} />

                <TextInput
                  placeholder="Enter Your Email"
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={(val) => textInputChange4(val)}
                />
                {data.check_textInputChange4 ? (
                  <Animatable.View animation="bounceIn">
                    <Feather
                      name="check-circle"
                      color="green"
                      size={20}
                      style={{ position: "absolute", right: -150 }}
                    />
                  </Animatable.View>
                ) : null}
              </View>
              {data.isValidEmail ? null : (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>Invalid Email.</Text>
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

              <Text
                style={[
                  styles.text_footer,
                  {
                    marginTop: 35,
                  },
                ]}
              >
                Confirm Password
              </Text>
              <View style={styles.action}>
                <Feather name="lock" color="#05375a" size={20} />

                <TextInput
                  placeholder="Confirm Your Password"
                  secureTextEntry={data.confirm_secureTextEntry ? true : false}
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={(val) => handelConfirmPasswordChange(val)}
                />
                <TouchableOpacity onPress={updateConfirmSecuretextEntry}>
                  {data.confirm_secureTextEntry ? (
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
              {data.isValidConfirmPassword ? null : (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>Password does not match</Text>
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
                Location
              </Text>
              <View style={styles.action}>
                <Feather name="map-pin" color="#05375a" size={20} />

                <View style={styles.location}>
                  <Picker
                    selectedValue={selectedValue}
                    style={{ height: 25, marginHorizontal: 10 }}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedValue(itemValue)
                    }
                  >
                    <Picker.Item label="Matara" value="matara" />
                    <Picker.Item label="Anuradhapura" value="anuradhapura" />
                    <Picker.Item label="Jaffna" value="jaffna" />
                    <Picker.Item label="Kalutara" value="kalutara" />
                  </Picker>
                </View>
              </View>
              {data.isValidLocation ? null : (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>Pic a Location.</Text>
                </Animatable.View>
              )}

              <View
                style={{
                  flexDirection: "row",
                  padding: 5,
                  paddingTop: 20,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={[styles.text_footer, { marginTop: 0 }]}>User</Text>
                <RadioButton
                  value="User"
                  status={checked === "User" ? "checked" : "unchecked"}
                  onPress={() => setChecked("User")}
                />
                <Text style={[styles.text_footer, { marginTop: 0 }]}>
                  Admin
                </Text>
                <RadioButton
                  value="Admin"
                  status={checked === "Admin" ? "checked" : "unchecked"}
                  onPress={() => setChecked("Admin")}
                />
              </View>
            </Animatable.View>
          </ScrollView>
        </View>
        <View style={styles.BottomButtomContainer}>
          <TouchableOpacity
            style={styles.BottomButtom}
            onPress={() => {
              pressHandler(
                data.email,
                data.password,
                data.FirstName,
                data.LastName,
                data.NIC,
                data.location,
                data.UserName
              );
            }}
          >
            <Text style={styles.BottomButtomText}>Next</Text>
          </TouchableOpacity>
          <Text style={styles.BottomButtomCapText}>
            Already have an account?{" "}
            <TouchableOpacity
              style={{ color: "#FF7B8A" }}
              onPress={() => navigation.navigate("LoginPage")}
            >
              Login
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
  scrollView: {
    position: "absolute",
    height: "100%",
    width: "100%",
    margin: 20,
    alignSelf: "center",
    padding: 20,
    paddingTop: 5,
    // borderWidth: 1,
    borderRadius: 5,
    top: "10%",
    // borderColor: 'black',
    // backgroundColor: 'lightblue'
  },
  textInput: {
    marginLeft: 10,
    fontFamily: "SF Pro Rounded",
  },

  text_footer: {
    color: "#626263",
    fontSize: 16,
    fontWeight: 600,
    fontFamily: "SF Pro Rounded",
    marginTop: 20,
  },
  errorMsg: {
    color: "#C70039",
    fontSize: 14,
    fontFamily: "SF Pro Rounded",
    marginBottom: 5,
  },
  footer: {
    paddingBottom: "0%",
    position: "absolute",
    width: "80%",
    marginLeft: "3%",
    // marginTop:"5%"
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
    top: 0,
    left: 30,
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
    width: 287,
    height: 261,
    postion: "absolute",
    bottom: "30%",
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
    width: 270,
    borderBottomWidth: 1,
    textAlign: "center",
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
