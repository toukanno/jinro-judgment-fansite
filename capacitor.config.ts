import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.toukanno.jinrojgdb',
  appName: '人狼JGデータベース',
  webDir: 'dist',
  server: {
    // Allow loading local files and external resources
    androidScheme: 'https',
    iosScheme: 'https',
  },
  ios: {
    contentInset: 'automatic',
    backgroundColor: '#0a0e17',
    preferredContentMode: 'mobile',
    scrollEnabled: true,
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: true,
      launchShowDuration: 2000,
      backgroundColor: '#0a0e17',
      showSpinner: false,
      splashImmersive: true,
      splashFullScreen: true,
    },
    StatusBar: {
      style: 'LIGHT',
      backgroundColor: '#0a0e17',
    },
    Keyboard: {
      resize: 'body',
      resizeOnFullScreen: true,
    },
  },
};

export default config;
