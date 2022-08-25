FROM reactnativecommunity/react-native-android:latest

RUN yarn global add \
    expo-cli \
    eas-cli \
    react-native-cli
RUN npm i -g npm@latest
# ngrok requires npm to install globally
RUN npm i -g @expo/ngrok@^4.1.0