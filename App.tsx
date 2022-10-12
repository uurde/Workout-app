import { StatusBar } from 'expo-status-bar';
import useCachedResources from './hooks/useCachedResources';
import Navgation from './navigation';

export default function App() {
  const isLoaded = useCachedResources();

  if (isLoaded) {
    return (
      <>
        <Navgation />
        <StatusBar style="auto" />
      </>
    );
  } else {
    return null;
  }

}