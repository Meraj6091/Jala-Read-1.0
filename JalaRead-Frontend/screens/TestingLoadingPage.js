import React, { useEffect, useState } from "react";
import {
  FlatList,
  Button,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

import {
  Dimensions,
  TouchableHighlight,
  Image,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

export default function TestingLoadingPage({ navigation }) {
  const userName = useSelector((state) => state.initialReducer.user);

  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [testResults, setTestResults] = useState({});
  console.log(data);

  useEffect(() => {
    getUserDetails();
  }, [userName]);

  // setTimeout(function () {
  //   navigation.navigate("WaterTestingSecond", { testResults });
  // }, 9000);

  const getUserDetails = async () => {
    const data = await fetch("http://127.0.0.1:5000/prediction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: userName,
      }),
    })
      .then((res) => res.json())
      .then((testResults) => {
        // setTestResults(json);
        // const testResults = json;
        navigation.navigate("WaterTestingSecond", { testResults });
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

  //   const dataPie = {
  //     labels: [,"pH", "Temp", "Turbidity","Conductivity"], // optional
  //     data: [,data.ph, data.temp, data.turbidity, data.conductivity]
  //   };

  return (
    <View style={{ flex: 1, padding: 0, backgroundColor: "white" }}>
      {isLoading ? (
        <Text>Loading...</Text>
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
              <Image
                source={require("../assets/back-arrow.png")}
                style={styles.BackArrow}
              />

              <Text style={styles.HeadText}>Quality Test</Text>
              <Text style={styles.HeadTextCap}>Water quality results</Text>
            </LinearGradient>
          </View>

          <View style={styles.InnerHeadContent}>
            <Text style={styles.InnerHeadText}>Running test</Text>
            <Text style={styles.InnerHeadTextCap}>
              Do not remove or shake any sensor
            </Text>
          </View>

          <View style={styles.Instruction}>
            <Image
              source={require("../assets/water-testing-gif.gif")}
              style={styles.LoadingImage}
            />
          </View>

          <View style={styles.BottomContainer}>
            <Text style={styles.BottomCapText}>
              Getting values from the sensors...
            </Text>
          </View>
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
    fontFamily: "Roboto",
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },

  BottomContainer: {
    // flex: 1,
    postion: "absolute",
    // bottom:100,
    // left:-27,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    bottom: "5%",
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
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#030082",
    // marginBottom: 0
  },

  BottomButtomText: {
    fontSize: 14,
    fontWeight: 600,
    color: "white",
    fontFamily: "Roboto",
  },

  BottomCapText: {
    fontSize: 20,
    fontWeight: 600,
    fontFamily: "SF Pro Rounded",
    color: "#323232",
    marginTop: 0,
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },

  BottomButtomCapTextLink: {
    color: "#FF00F5",
  },
  HeadText: {
    position: "absolute",
    // fontFamily:"ubuntu",
    fontSize: 20,
    fontFamily: "Roboto",
    fontWeight: "bold",
    color: "white",
    top: 73,
    left: 30,
    fontFamily: "SF Pro Rounded",
  },

  HeadTextCap: {
    position: "absolute",
    fontSize: 12,
    fontFamily: "Roboto",
    // fontWeight:"bold",
    color: "#D1E1FF",
    top: 103,
    left: 30,
    fontFamily: "SF Pro Rounded",
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
    fontFamily: "SF Pro Rounded",
    fontWeight: "bold",
    color: "#00397C",
    postion: "absolute",
    bottom: 200,
  },

  InnerHeadTextCap: {
    fontSize: 14,
    fontWeight: 500,
    fontFamily: "SF Pro Rounded",
    color: "#323232",
    marginTop: 0,
    paddingLeft: 80,
    paddingRight: 80,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
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
    color: "rgba(81, 81, 81, 0.86)",
    fontSize: 17,
    fontWeight: "700",
    fontFamily: "Roboto",
  },

  LoadingImage: {
    // justifyContent: 'center',
    // alignItems: 'center',
    width: 200,
    height: 300,
    marginRight: 10,
    marginTop: 10,
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
