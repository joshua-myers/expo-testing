FROM gitpod/workspace-full-vnc

USER gitpod

# RUN yarn global add expo-cli
RUN npm i -g expo-cli @expo/ngrok
# RUN yarn global add @expo/ngrok