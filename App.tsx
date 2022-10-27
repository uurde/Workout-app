import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import Navgation from './navigation';

export default function App() {
  const isLoaded = useCachedResources();
  const colorScheme = useColorScheme();

  if (isLoaded) {
    return (
      <>
        <SafeAreaProvider>
          <Navgation colorScheme={colorScheme} />
          <StatusBar style="auto" />
        </SafeAreaProvider>
      </>
    );
  } else {
    return null;
  }
}

// IOS Deployment
// https://medium.com/nerd-for-tech/your-guide-to-testing-your-expo-react-native-application-on-ios-abbde4086d08
// https://docs.expo.dev/classic/building-standalone-apps/?redirected