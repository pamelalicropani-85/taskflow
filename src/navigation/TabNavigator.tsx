import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native"; 
import TaskStack from "./TaskStack";
import ProfileStack from "./ProfileStack";
import { RootStackParamList } from "./types";
import { colors } from "../theme";      
import Ionicons, { IoniconsIconName } from "@react-native-vector-icons/ionicons";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
       screenOptions = {{
            headerShown: false,
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.muted,
            tabBarShowLabel: false
       }}
       >
        <Tab.Screen 
            name="TasksStack"    
            component={TaskStack}
            options={{
                tabBarIcon: ({color}) => <Ionicons 
                name="checkmark" 
                size={24}
                color={color}
                />
                
            }}
        />
        <Tab.Screen
            name="ProfileStack"
            component={ProfileStack}
            options={{
                tabBarIcon: ({color}) => <Ionicons 
                name="person" 
                size={24}
                color={color}
                />
            }}  
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};  

export default TabNavigator;        