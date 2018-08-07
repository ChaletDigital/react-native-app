# react-native-app
Repo for React-Native app


## Setup Expo on your app

FYI: Expo setup was done using this tutorial: https://matwrites.com/get-started-react-native-expo-minutes/. Now you need to follow steps below to complete the setup to **run your app with Expo**.

1 - **Download Expo app** for iOS from the App Store: https://itunes.com/apps/exponent. Then, open **Expo app** and **create an account**.

2 - Install exp by running `npm i -g exp`.

## Run the app with Expo

1 - On iTerm, go to .../react-native-app directory and run `exp start`.

    You may need to run `npm install` to download all node dependencies.

2 - To run the app on iOS devices: run `exp send -s <your-phone-number-or-email>` in this project directory in another terminal window to send the URL to your device.

3 - Expo app will open, you'll see `Downloading Javascrip bundle %%` at the bottom of the screen, and then BOOM!!
