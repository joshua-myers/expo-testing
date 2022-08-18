FROM gitpod/workspace-full

USER gitpod

RUN npm i --location=global expo-cli@6.0.5 @expo/ngrok@^4.1.0