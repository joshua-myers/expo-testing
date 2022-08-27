import 'expo-dev-client';
import { NativeBaseProvider } from "native-base";
import React from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Navigation } from './src/components/navigation';
import './src/firebase/app';


export default function App() {
  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <Navigation />
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}
