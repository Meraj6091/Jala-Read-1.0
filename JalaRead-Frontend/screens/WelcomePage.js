import React, { useEffect, useState } from 'react';
import { FlatList,Button, Text, View, StyleSheet,ActivityIndicator,TextInput,TouchableOpacity  } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import TestingSensorPage from './TestingSensorPage';
import Spinner from 'react-native-loading-spinner-overlay';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    
    StackedBarChart
  } from "react-native-chart-kit";

  import { Dimensions,TouchableHighlight, Image } from "react-native";

  export default function AdminSignin({navigation}) {

 
//   const dataPie = {
//     labels: [,"pH", "Temp", "Turbidity","Conductivity"], // optional
//     data: [,data.ph, data.temp, data.turbidity, data.conductivity]
//   };


  return (

    <View style={{ flex: 1, padding: 0, backgroundColor:"white" }}>
       {/* {isLoading ? <ActivityIndicator/> : ( */}
          
          <View style={{ flex: 1, flexDirection: 'column', justifyContent:  'space-between'}}>

            {/* <View style = {styles.PageCotent}> */}
            <View style = {styles.InnerHeadContent}>
                <Image source={require('../assets/jala-read-logo-blue.svg')} style = {styles.WelcomeLogo} />
                <Text style = {styles.InnerHeadText}>Welcome to<br/><Text style = {{color:"#0099C9"}}>JalaRead</Text>, mobile</Text>
                <Text style = {styles.InstructionText}>
                Your water testing deviceses, mobile <br/>application on your fingertips
                </Text>
            </View>

            <View style = {styles.Instruction}>
        
                <Image source={require('../assets/welcome-page-img.svg')} style = {styles.WelcomePageImg} />
                
            </View>
            <View style = {styles.BottomButtomContainer}>
                <TouchableOpacity style={styles.BottomButtom} onPress={() => navigation.navigate('LoginPage')}>
                    <Text style={styles.BottomButtomText}>Get started</Text>
                </TouchableOpacity>
                <Text style={styles.BottomButtomCapText}>Already have an account? <TouchableOpacity style={{color:'#FF7B8A'}} onPress={() => navigation.navigate('LoginPage')}>Login</TouchableOpacity></Text>
            </View>

            {/* </View> */}
        </View>
      {/* )} */}
    </View>
  );
};

  const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );

  const MyActivityIndicator = () => {
	return (
      	<View style={{ flex: 1, justifyContent: "center"}}>
      		//size can be "small" or "large"
			<ActivityIndicator size="large" color="#00ff00" />
      	</View>
    );
}

// export default MyActivityIndicator;

  const styles = StyleSheet.create({

    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
      },
      appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      },

      BottomButtomContainer:{
        // flex: 1,
        postion:"absolute",
        // bottom:100,
        // left:-27,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "transparent",
        bottom:'0%',
        height:'20%',
        // marginTop:'5%',
        // marginBottom:'5%',
        // borderWidth:3,
        marginTop:0,
        
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

      BottomButtomText:{
        fontSize:16,
        fontWeight:600,
        color:'white',
        fontFamily:"SF Pro Rounded",
      },

      BottomButtomCapText:{
        fontSize:13,
        fontWeight:600,
        color:'#515151',
        marginTop:10,
        fontFamily:"SF Pro Rounded",
      },

      
    HeadText:{
        position:"absolute",
        // fontFamily:"ubuntu",
        fontFamily:"SF Pro Rounded",
        fontSize:23,
        fontWeight:"bold",
        color:"white",
        top:73,
        left:30,
      },
  
      HeadTextCap:{
        position:"absolute",
        fontFamily:"SF Pro Rounded",
        fontSize:14,
        // fontWeight:"bold",
        color:"#D1E1FF",
        top:103,
        left:30,
      },

      container: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'flex-end',
        backgroundColor: "#EFFBFF",
    },
    headContainer: {
        flex: 1,
        position:"absolute",
        width:Dimensions.get("window").width,
        height:"26%",
    },
    headContent: {
        flex: 1,
        // width:Dimensions.get("window").width,
        // height: "10%",
    },

    

    InnerHeadContent:{
        // flex: 1,
        postion:"absolute",
        // bottom:100,
        // left:-27,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "transparent",
        top:'12%',
        height:'10%',
        marginTop:'5%',
        marginBottom:'5%',
        backgroundColor:"white",
        borderStyle:'solid',
        borderWidth:0,
        // borderColor:"#030096",
        borderRadius:25,
        paddingTop:50
        // borderWidth:3,
        // paddingTop: 200,
      },

      InnerHeadText:{
        fontSize:35,
        fontWeight:'bold',
        color:'#00397C',
        postion:'absolute',
        fontFamily:"SF Pro Rounded",
        bottom:180,
        textAlign:"center",
        lineHeight:33,
        marginBottom:15
      },

      Instruction:{
         // flex: 1,
         postion:"absolute",
         // bottom:100,
         // left:-27,
         alignItems: "center",
         justifyContent: 'center',
         backgroundColor: "transparent",
         top:'20%',
         height:'40%',
         width:Dimensions.get("window").width,
         marginRight:0,
         marginTop:'5%',
        //  marginBottom:'5%',
        //  borderWidth:3,
         
         // paddingTop: 200,
      },


      InstructionNum: {
        postion:'absolute',
        flexDirection: 'row',
        width:'80%',
        // borderWidth: 1,
        padding: 27,
        paddingBottom:15,
        paddingTop:10,
    
        borderColor: 'rgba(0, 0, 0, 0.5)',
        backgroundColor: 'white'
     },
    

     InstructionText:{
      color:'#626263',
      fontSize:16,
      fontWeight:600,
      textAlign:"center",
      fontFamily:"SF Pro Rounded",
      paddingBottom:5,
     },

     StartLogo:{
      // justifyContent: 'center',
      // alignItems: 'center',
      width:25,
      height:25,
      marginRight:"10%",
      marginTop:10
  },
  WelcomePageImg:{
    // justifyContent: 'center',
    // alignItems: 'center',
    width:267,
    height:240,
    postion:"absolute",
    bottom:"20%",
  },

  WelcomeLogo:{
    width:70,
    height:70,
    postion:"absolute",
    bottom:"100%",
  },

  input: {
    height: 40,
    margin: 12,
    width:270,
    borderBottomWidth: 1,
    textAlign:"center",
  },

  BackArrow:{
    // justifyContent: 'center',
    // alignItems: 'center',
    width:10,
    height:17,
    marginLeft:30,
    marginTop:30,
},

});