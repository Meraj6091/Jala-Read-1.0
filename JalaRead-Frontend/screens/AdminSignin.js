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
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import TestingSensorPage from "./TestingSensorPage";
import Spinner from "react-native-loading-spinner-overlay";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

import { Dimensions, TouchableHighlight, Image } from "react-native";

export default function AdminSignin({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  console.log(data);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/adhithiravi/React-Hooks-Examples/master/testAPI.json"
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const dataPie = {
    labels: [, "pH", "Temp", "Turbidity", "Conductivity"], // optional
    data: [, 0.4, 0.7, 0.8, 0.3],
  };

  const [text, onChangeText] = React.useState("location ");
  const [number, onChangeNumber] = React.useState(null);

  //   const dataPie = {
  //     labels: [,"pH", "Temp", "Turbidity","Conductivity"], // optional
  //     data: [,data.ph, data.temp, data.turbidity, data.conductivity]
  //   };

  return (
    <View style={{ flex: 1, padding: 0, backgroundColor: "white" }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
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
              <TouchableOpacity
                onPress={() => navigation.navigate("Dashboard")}
              >
                <Image
                  source={require("../assets/back-arrow.png")}
                  style={styles.BackArrow}
                />
              </TouchableOpacity>

              <Text style={styles.HeadText}>Sign in</Text>
              <Text style={styles.HeadTextCap}>Water quality results</Text>
              {/* <Text style={styles.Date}>{currentDate}<br/><Text style={{fontSize:11, fontWeight:500}}>{currentMonth}</Text></Text> */}
            </LinearGradient>
          </View>

          {/* <View style = {styles.PageCotent}> */}
          <View style={styles.InnerHeadContent}>
            <Text style={styles.InnerHeadText}>Admin</Text>
          </View>

          <View style={styles.Instruction}>
            <Image
              source={require("../assets/admin-signin.svg")}
              style={styles.locationPin}
            />
            <Text style={styles.InstructionText}>
              To test water Sign in as
              <br />
              an Admin
            </Text>
          </View>
          <View style={styles.BottomButtomContainer}>
            <TouchableOpacity
              style={styles.BottomButtom}
              onPress={() => navigation.navigate("TestingPage")}
            >
              <Text style={styles.BottomButtomText}>Continue</Text>
            </TouchableOpacity>
            <Text style={styles.BottomButtomCapText}>
              How to use this device?{" "}
              <Text style={{ color: "#FF7B8A" }}>More info</Text>
            </Text>
          </View>

          {/* </View> */}
        </View>
      )}
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
    color: "white",
    top: 73,
    left: 30,
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
    top: "20%",
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
    fontSize: 24,
    fontWeight: "bold",
    color: "#00397C",
    postion: "absolute",
    fontFamily: "SF Pro Rounded",
    bottom: 200,
  },

  Instruction: {
    // flex: 1,
    postion: "absolute",
    // bottom:100,
    // left:-27,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    bottom: "-15%",
    height: "40%",
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
    fontSize: 17,
    fontWeight: "700",
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
  locationPin: {
    // justifyContent: 'center',
    // alignItems: 'center',
    width: 220,
    height: 173,
    postion: "absolute",
    bottom: "20%",
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
