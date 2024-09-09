import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//components
import LoginScreen from "./screens/LoginScreen";
import PuzleScreen from "./screens/PuzleScreen";
import HomeScreen from "./screens/HomeScreen";
import GamesScreen from "./screens/GamesScreen";
import ChatBot from "./screens/ChatBotScreen";
import MemoryScreen from "./screens/MemoryScreen";
import ProgressScreen from "./screens/ProgressScreen";
import PuzleStagesScreen from "./screens/PuzleStagesScreen";
import MemoryStagesScreen from "./screens/MemoryStagesScreen";
import ResourcessScreen from "./screens/ResourcessScrenn";
import RegisterScreenStudent from "./screens/RegisterScreenStudent";
import RegisterScreenTeacher from "./screens/RegisterScreenTeacher";
import ChoiseUserScreen from "./screens/ChoiseUserScreen";
import RegisteredUserScreen from "./screens/RegisteredUserScreen";
import RecoveryPasswordScreen from "./screens/RecoveryPasswordScreen";
import CodeVerificationScreen from "./screens/CodeVerificationScreen";
import NewPasswordScreen from "./screens/NewPasswordScreen";
import PasswordChangedScreen from "./screens/PasswordChangedScreen";
import RecoveryUserScreen from "./screens/RecoveryUserScreen";
import UsersSendScreen from "./screens/UsersSendScreen";
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="UsersSend" component={UsersSendScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RecoveryUser" component={RecoveryUserScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PasswordChanged" component={PasswordChangedScreen} options={{ headerShown: false }} />
        <Stack.Screen name="NewPassword" component={NewPasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CodeVerification" component={CodeVerificationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RecoveryPassword" component={RecoveryPasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RegisteredUser" component={RegisteredUserScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterStudent" component={RegisterScreenStudent} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterTeacher" component={RegisterScreenTeacher} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ChoiseUser" component={ChoiseUserScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Games" component={GamesScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PuzleStages" component={PuzleStagesScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Puzle" component={PuzleScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Memory" component={MemoryScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MemoryStages" component={MemoryStagesScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ChatBot" component={ChatBot} options={{ headerShown: false }} />
        <Stack.Screen name="Progress" component={ProgressScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Resourcess" component={ResourcessScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
