FROM gitpod/workspace-full-vnc

USER gitpod

# RUN yarn global add expo-cli
RUN yarn global add expo-cli@6.0.5 @expo/ngrok@^4.1.0
# RUN yarn global add @expo/ngrok