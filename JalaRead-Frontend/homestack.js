import { createStackNavigator } from "react-navigation-stack";
import { NavigationContainer } from "@react-navigation/native";
import {
  createAppContainer,
  getActiveChildNavigationOptions,
} from "react-navigation";
import Home from "./screens/home";
import login from "./screens/LoginPage";
import Dashboard from "./screens/Dashboard";
import TestingPage from "./screens/TestingPage";
import TestingSensorPage from "./screens/TestingSensorPage";
import TestingLoadingPage from "./screens/TestingLoadingPage";
import WaterTestingScreen from "./screens/WaterTestingScreen";
import LocationInput from "./screens/LocationInput";
import MonthlyResults from "./screens/MonthlyResults";
import TestedAreas from "./screens/TestedAreas";
import AdminSignin from "./screens/AdminSignin";
import WelcomePage from "./screens/WelcomePage";
import SignUpPage from "./screens/SignUpPage";
import SignUp2ndPage from "./screens/SignUp2ndPage";
import LoginPage from "./screens/LoginPage";
import UserPage from "./screens/UserPage";
import UserEditPage from "./screens/UserEditPage";
import PhoneEdit from "./screens/PhoneEdit";
import MailEdit from "./screens/MailEdit";
import NameEdit from "./screens/NameEdit";

const screens = {
  // Home: {
  //     screen:Home
  // },
  // Login: {
  //     screen:login
  // },
  WelcomePage: {
    screen: WelcomePage,
    navigationOptions: {
      header: null,
    },
  },
  Dashboard: {
    screen: Dashboard,
    navigationOptions: {
      header: null,
    },
  },
  TestingPage: {
    screen: TestingPage,
    navigationOptions: {
      header: null,
    },
  },
  TestingSensorPage: {
    screen: TestingSensorPage,
    navigationOptions: {
      header: null,
    },
  },
  TestingLoadingPage: {
    screen: TestingLoadingPage,
    navigationOptions: {
      header: null,
    },
  },
  WaterTestingScreen: {
    screen: WaterTestingScreen,
    navigationOptions: {
      header: null,
    },
  },
  LocationInput: {
    screen: LocationInput,
    navigationOptions: {
      header: null,
    },
  },
  MonthlyResults: {
    screen: MonthlyResults,
    navigationOptions: {
      header: null,
    },
  },
  TestedAreas: {
    screen: TestedAreas,
    navigationOptions: {
      header: null,
    },
  },
  AdminSignin: {
    screen: AdminSignin,
    navigationOptions: {
      header: null,
    },
  },

  SignUpPage: {
    screen: SignUpPage,
    navigationOptions: {
      header: null,
    },
  },

  LoginPage: {
    screen: LoginPage,
    navigationOptions: {
      header: null,
    },
  },
  UserPage: {
    screen: UserPage,
    navigationOptions: {
      header: null,
    },
  },
  SignUp2ndPage: {
    screen: SignUp2ndPage,
    navigationOptions: {
      header: null,
    },
  },
  UserEditPage: {
    screen: UserEditPage,
    navigationOptions: {
      header: null,
    },
  },
  PhoneEdit: {
    screen: PhoneEdit,
    navigationOptions: {
      header: null,
    },
  },
  MailEdit: {
    screen: MailEdit,
    navigationOptions: {
      header: null,
    },
  },
  NameEdit: {
    screen: NameEdit,
    navigationOptions: {
      header: null,
    },
  },
};

const HomeStack = createStackNavigator(screens);
export default createAppContainer(HomeStack);

// const Stack = createStackNavigator();

// export default function MyStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Dashboard" component={Dashboard} />
//       <Stack.Screen name="TestingPage" component={TestingPage} />
//       <Stack.Screen name="TestingSensorPage" component={TestingSensorPage} />
//       <Stack.Screen name="TestingLoadingPage" component={TestingLoadingPage} />
//       <Stack.Screen name="WaterTestingScreen" component={WaterTestingScreen} />
//     </Stack.Navigator>
//   );
// }
