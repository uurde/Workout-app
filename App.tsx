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