FROM gitpod/workspace-full-vnc

USER gitpod

RUN yarn global add expo-cli
RUN yarn global add @expo/ngrok