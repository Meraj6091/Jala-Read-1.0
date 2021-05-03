import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  FlatList,
  Button,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Spinner from "react-native-loading-spinner-overlay";
// import TestsResults from '../assets/TestsResults.json';
import * as data from "../assets/TestsResults.json";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

import { Dimensions, TouchableHighlight, TouchableOpacity } from "react-native";
import AdminSignin from "./AdminSignin";

export default function UserPage({ navigation }) {
  const userName = useSelector((state) => state.initialReducer.user);
  const [testData, setTestData] = useState({});
  const [userInfo, setUserInfo] = useState({});

  const dataPie = {
    labels: [, "pH", "Temp", "Turbidity", "Conductivity"], // optional
    data: [
      ,
      (data.value_params.ph * 7.14) / 100,
      data.value_params.temp / 100,
      (data.value_params.turbidity * 2) / 100,
      (data.value_params.conduct * 2) / 100,
    ],
  };

  useEffect(() => {
    getTotalTestData();
    getUserDetails();
  }, [userName]);

  const getTotalTestData = () => {
    fetch(`http://127.0.0.1:5000/user_total_test`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: userName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTestData(data);
      });
  };

  const getUserDetails = () => {
    fetch("http://127.0.0.1:5000/get_user_details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: userName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data);
      });
  };

  return (
    <View style={{ flex: 1, padding: 0, backgroundColor: "white" }}>
      {/* {isLoading ? <Text>Loading...</Text> :           */}
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <View style={styles.headContainer}>
          <LinearGradient
            // Button Linear Gradient
            colors={["#020058", "#030096"]}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 1 }}
            style={styles.headContent}
          >
            <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
              <Image
                source={require("../assets/back-arrow.png")}
                style={styles.BackArrow}
              />
            </TouchableOpacity>

            <Text style={styles.HeadText}>JalaRead</Text>
            {/* <Text style={styles.HeadTextCap}>Water quality results</Text> */}
          </LinearGradient>
        </View>

        <LinearGradient
          // Button Linear Gradient
          colors={["#EEF2FF", "#ffffff"]}
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 1 }}
          style={styles.InnerHeadContent}
        >
          <Image
            source={require("../assets/admin-icon-pic.svg")}
            style={styles.UserIcon}
          />
          <Text style={styles.InnerHeadText}>{userName}</Text>
          <Text style={styles.InnerHeadTextCap}>
            {userInfo.admin ? "Admin" : "User"}
          </Text>
          <TouchableOpacity
            style={styles.BottomButtom}
            onPress={() => navigation.navigate("UserEditPage", { userInfo })}
          >
            <Text style={styles.BottomButtomText}>Edit Profile</Text>
          </TouchableOpacity>
        </LinearGradient>

        <View style={styles.StatusContainer}>
          <LinearGradient
            // Button Linear Gradient
            colors={["#EEF2FF", "#ffffff"]}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 1 }}
            style={styles.headContent}
          >
            <View style={styles.TestsContainer}>
              {/* <View  onPress={() => navigation.navigate(user())}> */}
              <View style={styles.TestnBox1}>
                <Text style={styles.TestHeadTxt}>Total Tests</Text>
                <View style={styles.OptionBoxInner}>
                  <View style={styles.TestInnerContent}>
                    <Text style={styles.TestInnerContentTxt}>
                      Excellent
                      <br />
                      <Text style={{ color: "#626263" }}>
                        {testData.Excellent}
                      </Text>
                    </Text>
                  </View>
                  <View style={styles.TestInnerContent}>
                    <Text style={styles.TestInnerContentTxt}>
                      <Text style={{ color: "#0099C9" }}>Normal</Text>
                      <br />
                      <Text style={{ color: "#626263" }}>
                        {testData.Normal}
                      </Text>
                    </Text>
                  </View>
                  <View style={styles.TestInnerContent}>
                    <Text style={styles.TestInnerContentTxt}>
                      <Text style={{ color: "#FF7B8A" }}>Bad</Text>
                      <br />
                      <Text style={{ color: "#626263" }}>{testData.Poor}</Text>
                    </Text>
                  </View>
                </View>
                {/* <Text style = {styles.OptTxtCap}>Test<br/>water</Text> */}
              </View>
              {/* </View> */}
            </View>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
}

const linedata = {
  labels: ["JAN", "FEB", "MAR", "APR", "MAY"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99],
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // optional
      strokeWidth: 4, // optional
    },
  ],
  legend: ["Quality Tests"], // optional
};

const chartConfig = {
  backgroundGradientFrom: "#030092",
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: "#0400C9",
  backgroundGradientToOpacity: 1,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

// add this to a button
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
let deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  TestInnerContent: {
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    width: "34%",
  },

  TestInnerContentTxt: {
    fontFamily: "SF Pro Rounded",
    fontSize: 19,
    fontWeight: 500,
    color: "#37E290",
    textAlign: "center",
    lineHeight: 35,
  },

  BottomButtom: {
    position: "absolute",
    top: "75%",
    width: "60%",
    borderRadius: 8,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#626263",
    // marginBottom: 0
  },

  BottomButtomText: {
    fontSize: 16,
    fontWeight: 500,
    color: "#626263",
    fontFamily: "SF Pro Rounded",
  },

  BackArrow: {
    // justifyContent: 'center',
    // alignItems: 'center',
    width: 10,
    height: 17,
    marginLeft: 30,
    marginTop: 50,
  },

  UserIcon: {
    position: "absolute",
    bottom: "65%",
    width: 140,
    height: 140,
  },

  CalendarIcon: {
    position: "absolute",
    top: "21%",
    width: 30,
    height: 33.5,
    marginBottom: 5,
  },
  BeakerIcon: {
    position: "absolute",
    top: "21%",
    width: 35,
    height: 33.5,
    marginBottom: 5,
  },
  PinIcon: {
    position: "absolute",
    top: "21%",
    width: 26,
    height: 31,
    marginBottom: 5,
  },

  TestHeadTxt: {
    position: "absolute",
    textAlign: "center",

    fontFamily: "SF Pro Rounded",
    fontWeight: 600,
    fontSize: 20,
    lineHeight: 15,
    paddingBottom: 0,
    color: "white",
    top: "10%",
  },

  SelectArrow: {
    // justifyContent: 'center',
    // alignItems: 'center',
    position: "absolute",
    width: 8,
    height: 15,
    top: "45%",
    right: 30,
    opacity: 1,
  },

  Date: {
    position: "absolute",
    // fontFamily:"ubuntu",
    fontSize: 19,
    fontWeight: "bold",
    color: "white",
    top: 95,
    right: 30,
    backgroundColor: "#030096",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#030096",
    borderRadius: 5,
    padding: 7,
    paddingTop: 10,
    paddingBottom: 10,
    lineHeight: 15,
    textAlign: "center",
  },
  selectDate: {
    position: "absolute",
    // fontFamily:"ubuntu",
    fontSize: 19,
    fontWeight: 800,
    color: "#0400C9",
    top: "24%",
    left: 22,
    backgroundColor: "white",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    padding: 7,
    paddingTop: 10,
    paddingBottom: 10,
    lineHeight: 15,
    textAlign: "center",
  },
  HeadText: {
    position: "absolute",
    // fontFamily:"ubuntu",
    fontFamily: "SF Pro Rounded",
    fontSize: 23,
    fontWeight: "bold",
    color: "white",
    top: 50,
    right: 30,
  },

  HeadTextCap: {
    position: "absolute",
    fontSize: 14,
    // fontWeight:"bold",
    fontFamily: "SF Pro Rounded",
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

  StatusContainer: {
    postion: "absolute",
    width: deviceWidth,
    top: "17%",
    height: "100%",
    alignContent: "center",
    justifyContent: "center",
    // backgroundColor:"black",
  },

  TestsContainer: {
    postion: "absolute",
    width: deviceWidth,
    height: "30%",
    flexDirection: "row",
    paddingTop: "10%",
  },

  TestnBox1: {
    postion: "absolute",
    width: deviceWidth - 40,
    marginLeft: 22,
    height: "87%",
    //   bottom:0,
    //   top:0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#030086",
    marginTop: 0,
    marginBottom: 0,
    // flexDirection: 'row',
    borderStyle: "solid",
    borderWidth: 0,
    borderRadius: 17,
    shadowColor: "rgba(0,0,0,0.6)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 12,
  },

  OptionBoxInner: {
    postion: "absolute",
    width: deviceWidth - 40,
    //   marginLeft:22,
    height: "70%",
    top: "15%",
    //   top:0,
    //   alignItems: "center",
    //   justifyContent: 'center',
    backgroundColor: "white",
    marginTop: 0,
    marginBottom: 0,
    flexDirection: "row",
    borderStyle: "solid",
    borderWidth: 0,
    borderRadius: 17,
    shadowColor: "rgba(0,0,0,0.6)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 12,
  },

  PreviouseBtn: {
    postion: "absolute",
    width: deviceWidth - 40,
    marginLeft: 20,
    height: "15%",
    // bottom:0,
    top: "0%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    marginTop: 0,
    marginBottom: 0,
    // flexDirection: 'row',
    borderStyle: "solid",
    borderWidth: 0,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,

    elevation: 12,
  },
  BottomContent: {
    postion: "absolute",
    width: deviceWidth - 40,
    marginLeft: 20,
    height: "60%",
    // bottom:0,
    // top:"0%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    marginTop: "5%",
    marginBottom: 0,
    // flexDirection: 'row',
    borderStyle: "solid",
    borderWidth: 0,
    borderRadius: 25,
    borderBottomEndRadius: 0,
    borderBottomLeftRadius: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,

    elevation: 12,
  },

  headContainer: {
    flex: 1,
    position: "absolute",
    width: deviceWidth,
    height: "30%",
  },

  headContent: {
    flex: 1,
    width: "100%",
    borderStyle: "solid",
    borderWidth: 0,
    borderRadius: 0,
    // width:Dimensions.get("window").width,
    // height: "10%",
  },

  PreviouseBtnGrad: {
    flex: 1,
    width: "100%",
    borderStyle: "solid",
    borderWidth: 0,
    borderRadius: 25,
  },

  slctCntnrTxt: {
    position: "absolute",
    fontFamily: "SF Pro Rounded",
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    top: "27%",
    left: 80,
    lineHeight: 20,
  },

  slctCntnrTxtCap: {
    position: "absolute",
    fontSize: 12,
    fontFamily: "SF Pro Rounded",
    // fontWeight:"bold",
    color: "rgba(255, 255, 255, 1)",
    top: "51%",
    left: 80,
  },

  BttmCntntTxt: {
    position: "absolute",
    fontSize: 22,
    fontWeight: "bold",
    fontFamily: "SF Pro Rounded",
    color: "#00397C",
    top: "10%",
  },

  BttmCntntTxtCap: {
    position: "absolute",
    fontFamily: "SF Pro Rounded",
    fontSize: 16,
    fontWeight: 600,
    color: "#626263",
    top: "16%",
  },

  lineChart: {
    marginTop: "15%",
    fontWeight: 700,
    fontFamily: "SF Pro Rounded",
    // paddingTop:"10%",
  },

  InnerHeadContent: {
    // flex: 1,
    postion: "absolute",
    // bottom:100,
    // left:-27,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    top: "20%",
    height: "30%",
    marginTop: "5%",
    marginBottom: "5%",
    backgroundColor: "white",
    borderStyle: "solid",
    borderWidth: 0,
    // borderColor:"#030096",
    borderRadius: 25,
    borderBottomEndRadius: 0,
    borderBottomLeftRadius: 0,
    paddingTop: 50,
    // borderWidth:3,

    // paddingTop: 200,
  },

  InnerHeadText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#00397C",
    position: "absolute",
    fontFamily: "SF Pro Rounded",
    top: "40%",
  },
  InnerHeadTextCap: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF7B8A",
    position: "absolute",
    fontFamily: "SF Pro Rounded",
    top: "55%",
  },
});
