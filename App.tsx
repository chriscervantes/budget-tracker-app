import { NavigationContainer } from "@react-navigation/native";
import * as AuthSession from "expo-auth-session";

import Constants from "expo-constants";

import AppNavigator from "./src/navigation/AppNavigator";

const auth0Domain = Constants.expoConfig?.extra?.AUTH0_DOMAIN;
const auth0ClientId = Constants.expoConfig?.extra?.AUTH0_CLIENT_ID;
const auth0Audience = Constants.expoConfig?.extra?.AUTH0_AUDIENCE;

export default function App() {
  const discovery = AuthSession.useAutoDiscovery(`https://${auth0Domain}`);
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: auth0ClientId,
      scopes: ["openid", "profile", "email", "offline_access"],
      redirectUri: AuthSession.makeRedirectUri({ scheme: "yourapp" }),
      // audience: auth0Audience,
    },
    discovery
  );

  type AuthContextValue = {
    accessToken: string | null;
    user: { email: string; auth0Id: string } | null;
    login: () => void;
    logout: () => void;
  };

  return (
    // <AuthProvider initialValue={initialAuthValue}>
    <AppWithAuth />
    // </AuthProvider>
  );
}

function AppWithAuth() {
  // const { value: auth, setValue: setAuth } = useAuth();

  // useEffect(() => {
  //   if (response?.type === "success") {
  //     const { code } = response.params;
  //     (async () => {
  //       const tokenResult = await AuthSession.exchangeCodeAsync(
  //         {
  //           code,
  //           clientId: auth0ClientId,
  //           redirectUri: AuthSession.makeRedirectUri({ scheme: "yourapp" }),
  //         },
  //         AuthSession.useAutoDiscovery(`https://${auth0Domain}`)
  //       );
  //       setAuth({
  //         ...auth,
  //         accessToken: tokenResult.accessToken,
  //         logout: () => setAuth({ ...auth, accessToken: null }),
  //       });
  //       setAuthToken(tokenResult.accessToken);
  //     })();
  //   }
  // }, [response]);

  return (
    <NavigationContainer>
      <AppNavigator
      //     isAuthenticated={!!auth.accessToken}
      //     login={auth.login}
      //     logout={auth.logout}
      />
    </NavigationContainer>
  );
}
