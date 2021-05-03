import React from "react";
import {
  Picker,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  StatusBar,
  Button,
  ScrollView,
} from "react-native";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
export default function Signup({ navigation }) {
  const [data, setData] = React.useState({
    Username: "",
    email: "",
    password: "",
    confirm_password: "",
    contact_no: "",
    NIC: "",

    check_textInputChange: false,
    check_textInputChange2: false,
    check_textInputChange3: false,
    check_textInputChange4: false,
    check_textInputChange5: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
    isValidContactno: true,
    isValidNIC: true,
    isValidEmail: true,
    isValidConfirmPassword: true,
    isValidLocation: true,
  });

  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        Username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        Username: "",
        check_textInputChange: false,
        isValidUser: false,
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
      data.Username.length == 0 ||
      data.password.length == 0 ||
      data.confirm_password.length == 0
    ) {
      alert("Fill the following requirments");
    } else {
      try {
        fetch("https://webhook.site/6a86333c-cd9d-46e9-9256-4c48c9794303", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: data.Username,
            password: data.password,
            PhoneNo: data.contact_no,
            location: selectedValue,
            NIC: data.NIC,
            Email: data.email,
          }),
        });
        // navigation.navigate('');
      } catch (e) {
        console.log(e);
      }
    }
  };
  const pressHandler2 = async () => {
    // navigation.navigate('Login');
  };
  const [selectedValue, setSelectedValue] = React.useState("");
  return (
    <View style={styles.container}>
      <ScrollView>
        <StatusBar backgroundColor="#009387" barStyle="light-content" />
        <View style={styles.header}>
          <Text style={styles.text_header}>Register Now!</Text>
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <Text style={styles.text_footer}>Username</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />

            <TextInput
              placeholder="Enter Your Username"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => textInputChange(val)}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
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
            Phone Number
          </Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />

            <TextInput
              placeholder="Enter Your Contact No"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => textInputChange2(val)}
            />
            {data.check_textInputChange2 ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          {data.isValidContactno ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>Contact No must be 10 Numbers</Text>
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
            <FontAwesome name="user-o" color="#05375a" size={20} />

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
                <Feather name="check-circle" color="green" size={20} />
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
            <FontAwesome name="user-o" color="#05375a" size={20} />

            <TextInput
              placeholder="Enter Your Email"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => textInputChange4(val)}
            />
            {data.check_textInputChange4 ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
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
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
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
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
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
            <FontAwesome name="user-o" color="#05375a" size={20} />

            <View style={styles.location}>
              <Picker
                selectedValue={selectedValue}
                style={{ height: 25 }}
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

          <View style={styles.signinButton}>
            <Button title="Submit" onPress={pressHandler} />
          </View>
          <View style={styles.signupButton}>
            <Button title="Log in" onPress={pressHandler2} />
          </View>
        </Animatable.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000080",
  },
  signinButton: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  location: {
    flex: 1,
    paddingLeft: 10,
    color: "#05375a",
  },
  signupButton: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: "#05375a",
  },
  errorMsg: {
    color: "#C70039",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
