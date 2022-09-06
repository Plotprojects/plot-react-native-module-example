# Introduction

This folder contains an example ReactNative project with `plotprojects-react-native-module` integrated. 

# Quickstart

After creating an account in PlotProjects [dashboard](https://admin.plotprojects.com/dashboard), you need to update the tokens in both Android and iOS projects. Tokens are located in:

* `ios/Supporting Files/plotconfig.json`
* `android/app/src/main/assets/plotconfig.json`

Once tokens are updated, you need to install the required dependencies by running the following command in the root directory:

```
yarn install
```

You can run the Android app using the following command:

```
npx react-native run-android
```

If you wnt to test without having your phone connected to your computer all the time, you can run a release build using:

```
npx react-native run-android --variant release
```
The same way you can run iOS app using the following command:

```
npx react-native run-ios
```

Or run a release build on iOS using the command:

```
npx react-native run-ios --configuration Release
```


You can also run by opening either xCode for iOS project or Android studio for Android project.

For more details, please refer to [PlotProjects official documentation](http://files.plotprojects.com/documentation/android/3.16.0/how-to-guides/React-Native-integration-guide/) or to [PlotProjects react native module](https://github.com/Plotprojects/plotprojects-react-native-module) on GitHub.
