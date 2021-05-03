import React, { useEffect, useState } from "react";
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
import { useSelector, useDispatch } from "react-redux";
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

export default function WaterTestingScreen({ route, navigation }) {
  const userName = useSelector((state) => state.initialReducer.user);
  const [data, setData] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [currentMonth, setCurrentMonth] = useState("");

  useEffect(() => {
    getUserDetails();
  }, [userName]);

  const getUserDetails = () => {
    fetch("http://127.0.0.1:5000/get_report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: userName,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        setData(json);
      });

    var monthNames = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
  };
  const getWaterType = (waterType) => {
    if (waterType == "Excellent") {
      return 1;
    }
    if (waterType == "Normal") {
      return 2;
    }
    if (waterType == "Poor") {
      return 3;
    }
    if (waterType == " Very Poor") {
      return 3;
    }
  };

  return (
    <View style={{ flex: 1, padding: 0, backgroundColor: "white" }}>
      {/* {isLoading ? <Text>Loading...</Text> :  */}
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
            colors={["#EEF2FF", "#ffffff"]}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 1 }}
            style={styles.headContent}
          >
            <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
              <Image
                source={require("../assets/back-arrow-blue.png")}
                style={styles.BackArrow}
              />
            </TouchableOpacity>

            <Text style={styles.HeadText}>Quality test</Text>
            <Text style={styles.HeadTextCap}>Water quality results</Text>
            <Text style={styles.Date}>
              {currentDate}
              <br />
              <Text style={{ fontSize: 11, fontWeight: 500 }}>
                {currentMonth}
              </Text>
            </Text>
          </LinearGradient>
        </View>

        <View style={styles.StatusContainer}>
          <LinearGradient
            // Button Linear Gradient
            colors={["#EEF2FF", "#ffffff"]}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 1 }}
            style={styles.headContent}
          >
            <View
              style={[
                getWaterType(data.predicted_water_type) == 1
                  ? styles.excellent
                  : styles.StatusBarHead,
                getWaterType(data.predicted_water_type) == 2
                  ? styles.normal
                  : styles.StatusBarHead,
                getWaterType(data.predicted_water_type) == 3
                  ? styles.bad
                  : styles.StatusBarHead,
                styles.StatusBarContainerHead,
              ]}
            >
              <Text style={styles.StatusBarHead}>
                {data.predicted_water_type} quality
              </Text>

              <View style={styles.StatusBarContainer}>
                <TouchableHighlight>
                  <Text style={styles.StatusBarLeft}>
                    <Text style={styles.Measurement}>Tempurature</Text>
                    <br />
                    {data.temperature}°C
                  </Text>
                </TouchableHighlight>
                <TouchableHighlight>
                  <Text style={styles.StatusBar}>
                    <Text style={styles.Measurement}>pH</Text>
                    <br />
                    {data.ph}
                  </Text>
                </TouchableHighlight>
              </View>
              <View style={styles.StatusBarContainer2}>
                <TouchableHighlight>
                  <Text style={styles.StatusBarLeft}>
                    <Text style={styles.Measurement}>Conductivity</Text>
                    <br />
                    {data.conductivity} (S/m)
                  </Text>
                </TouchableHighlight>
                <TouchableHighlight>
                  <Text style={styles.StatusBar}>
                    <Text style={styles.Measurement}>Turbidity</Text>
                    <br />
                    {data.turbidity} Ntu
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
            <View style={styles.locationBlock}>
              <Image
                source={require("../assets/location-pin-red.png")}
                style={styles.locationPin}
              />
              <Text style={styles.locationTxt}>{data.tested_location}</Text>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.pieChartContainer}>
          <Text style={styles.PieHead}>Quality test</Text>
          <Text style={{ fontFamily: "SF Pro Rounded" }}>
            Water quality results
          </Text>
          {/* <Text style = {styles.LocationText}><Text style={styles.Measurement}>Location:</Text>   {data.location}</Text> */}
          {/* <ProgressChart
            data={dataPie}
            width={Dimensions.get("window").width}
            height={220}
            strokeWidth={12}
            radius={27}
            chartConfig={{
              backgroundColor: "transparent",
              backgroundGradientFrom: "transparent",
              backgroundGradientTo: "transparent",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(3, 0, 150, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(2, 0, 88, ${opacity})`,
              style: {
                borderRadius: 16,
                fontFamily: "SF Pro Rounded",
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#fff",
              },
            }}
            hideLegend={false}
            style={styles.pieChart}
          /> */}

          <Text> </Text>
          {/* <Text style = {styles.LocationText}><Text style={styles.Measurement}>Water quality:</Text> {data.predicted_water_type}</Text> */}
        </View>
      </View>
    </View>
  );
}

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
  BackArrow: {
    // justifyContent: 'center',
    // alignItems: 'center',
    width: 10,
    height: 17,
    marginLeft: 30,
    marginTop: 50,
  },

  SelectArrow: {
    // justifyContent: 'center',
    // alignItems: 'center',
    position: "absolute",
    width: 8,
    height: 15,
    top: "45%",
    right: 30,
    opacity: 0.7,
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
    fontFamily: "SF Pro Rounded",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#030096",
    borderRadius: 5,
    padding: 7,
    paddingTop: 15,
    paddingBottom: 16,
    lineHeight: 15,
    textAlign: "center",
  },
  selectDate: {
    position: "absolute",
    fontFamily: "SF Pro Rounded",
    fontSize: 19,
    fontWeight: "bold",
    color: "white",
    top: "30%",
    left: 30,
    backgroundColor: "#030096",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#030096",
    borderRadius: 5,
    padding: 5,
    paddingTop: 10,
    paddingBottom: 10,
    lineHeight: 15,
    textAlign: "center",
  },

  Measurement: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#020058",
    fontFamily: "SF Pro Rounded",
    // paddingBottom: 20
    lineHeight: 30,
  },

  HeadText: {
    position: "absolute",
    fontFamily: "SF Pro Rounded",
    fontSize: 24,
    fontWeight: "bold",
    color: "#020058",
    top: 95,
    left: 30,
  },

  HeadTextCap: {
    position: "absolute",
    fontSize: 13,
    // fontWeight:"bold",
    color: "rgba(0, 20, 124, 0.86)",
    fontFamily: "SF Pro Rounded",
    top: 123,
    left: 30,
  },

  slctCntnrTxt: {
    position: "absolute",
    // fontFamily:"ubuntu",
    fontFamily: "SF Pro Rounded",
    fontSize: 22,
    fontWeight: "bold",
    color: "#020058",
    top: "27%",
    left: 80,
  },

  slctCntnrTxtCap: {
    position: "absolute",
    fontSize: 12,
    // fontWeight:"bold",
    fontFamily: "SF Pro Rounded",
    color: "rgba(0, 20, 124, 0.86)",
    top: "51%",
    left: 80,
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#EFFBFF",
  },

  PhButtonContainer: {
    // flex: 1,
    postion: "absolute",
    bottom: 0,
    // top:170,
    // left:-80,
    alignItems: "center",
    // justifyContent: 'flex-end',
    backgroundColor: "transparent",
    marginTop: 0,
    // paddingTop: 200,
  },
  TempButtonContainer: {
    // flex: 1,
    postion: "absolute",
    // bottom:-70,
    // left:-80,
    alignItems: "center",
    // justifyContent: 'flex-end',
    backgroundColor: "transparent",
    marginTop: 0,
    // paddingTop: 200,
  },
  TurbidityButtonContainer: {
    // flex: 1,
    postion: "absolute",
    // bottom:0,
    // bottom:70,
    // left:72,
    alignItems: "center",
    // justifyContent: 'flex-end',
    backgroundColor: "transparent",
    marginTop: 0,
    // paddingTop: 200,
  },
  CondctButtonContainer: {
    // flex: 1,
    postion: "absolute",
    // bottom:0,
    // bottom:70,
    // left:72,
    alignItems: "center",
    // justifyContent: 'flex-end',
    backgroundColor: "transparent",
    marginTop: 0,
    // paddingTop: 200,
  },

  StatusContainer: {
    postion: "absolute",
    width: deviceWidth,
    top: "25%",
    height: "60%",
    // backgroundColor:"black",
  },

  excellent: {
    backgroundColor: "#37E290",
  },
  normal: {
    backgroundColor: "#0099C9",
  },
  bad: {
    backgroundColor: "#FF7B8A",
  },

  StatusBarContainerHead: {
    postion: "absolute",
    width: deviceWidth - 40,
    marginLeft: 20,
    height: "65%",
    bottom: 0,
    top: 0,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#37E290",
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

  StatusBarHead: {
    fontSize: 20,
    fontWeight: 600,
    color: "white",
    fontFamily: "SF Pro Rounded",
  },

  StatusBarContainer: {
    postion: "absolute",
    width: deviceWidth - 38,
    // marginLeft:19,
    bottom: 0,
    top: "7.5%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    marginTop: 0,
    marginBottom: 0,
    flexDirection: "row",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#808080",
    borderTopEndRadius: 25,
    borderTopLeftRadius: 25,
  },

  StatusBarContainer2: {
    postion: "absolute",
    width: deviceWidth - 38,
    // marginLeft:19,
    bottom: 0,
    top: "7.3%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    marginTop: 0,
    marginBottom: 0,
    flexDirection: "row",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "white",
    borderBottomEndRadius: 25,
    borderBottomLeftRadius: 25,
  },

  StatusBar: {
    postion: "absolute",
    width: deviceWidth / 2 - 20,
    fontSize: 20,
    fontFamily: "SF Pro Rounded",
    // height:"40%",
    // borderWidth: 1,
    textAlign: "center",
    padding: "15%",
    paddingBottom: "18%",
    alignContent: "center",
    justifyContent: "center",
    // borderRadius:25,
    // borderTopWidth:0,
    // borderLeftWidth:0,
    // borderColor: 'rgba(0, 0, 0, 0.1)',
    backgroundColor: "transparent",
  },
  StatusBarLeft: {
    postion: "absolute",
    width: deviceWidth / 2 - 20,
    fontSize: 20,
    // height:"40%",
    borderRightWidth: 1,

    textAlign: "center",
    padding: "15%",
    paddingBottom: "18%",
    alignContent: "center",
    justifyContent: "center",
    // borderRadius:25,
    // borderTopWidth:0,
    // borderLeftWidth:0,
    borderColor: "rgba(0, 0, 0, 0.1)",
    backgroundColor: "transparent",
  },

  headContainer: {
    flex: 1,
    position: "absolute",
    width: deviceWidth,
    height: "30%",
  },

  locationBlock: {
    position: "absolute",
    width: deviceWidth,
    // borderStyle:"solid",
    // borderWidth:1,
    height: "10%",
    top: "68%",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  locationPin: {
    width: 20,
    height: 23.9,
    marginLeft: 10,
    marginRight: 10,
  },

  locationTxt: {
    fontSize: 16,
    fontWeight: 500,
    fontFamily: "SF Pro Rounded",
  },

  previousContainer: {
    flex: 1,
    position: "absolute",
    width: deviceWidth,
    top: "73%",
    height: "15%",
    backgroundColor: "white",
    borderStyle: "solid",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#D3D3D3",
  },
  headContent: {
    flex: 1,
    // width:Dimensions.get("window").width,
    // height: "10%",
  },

  PhButton: {
    postion: "absolute",
    width: 150,
    borderWidth: 1,
    padding: 25,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderColor: "rgba(0, 0, 0, 0.5)",
    backgroundColor: "white",
  },
  TempButton: {
    postion: "absolute",
    width: 150,
    borderWidth: 1,
    padding: 25,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderColor: "rgba(0, 0, 0, 0.5)",
    backgroundColor: "white",
  },
  TurbidityButton: {
    postion: "absolute",
    width: 150,
    borderWidth: 1,
    padding: 25,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderColor: "rgba(0, 0, 0, 0.5)",
    backgroundColor: "white",
  },
  CondctButton: {
    postion: "absolute",
    width: 150,
    borderWidth: 1,
    padding: 25,
    borderBottomWidth: 0,
    borderRightWidth: 0,
    borderColor: "rgba(0, 0, 0, 0.5)",
    backgroundColor: "white",
  },

  pieChart: {
    postion: "absolute",
    top: 50,
    left: -50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    marginTop: 120,
  },

  pieChartContainer: {
    // flex: 1,
    postion: "absolute",
    top: "15%",
    // left:-27,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    marginTop: 120,
    fontFamily: "SF Pro Rounded",
    // paddingTop: 200,
  },

  PieHead: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#020058",
    fontFamily: "SF Pro Rounded",
  },
});
