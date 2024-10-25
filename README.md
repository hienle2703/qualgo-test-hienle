# Test from Le Vu Toan Hien

This is a test from Le Vu Toan Hien for the Mobile Developer position of Qualgo.
For the convenience while developing, I used Expo as the suggestion of the documentation on the React Native main page.

## Features
As the test requires, I implemented the following features:
- HomeScreen: Show random movies fetched from the Open API with search bar
- MovieDetailScreen: Show the detail of the selected movie
- A separated SDK is used to simplify the fetching process from the Open API, you can check it [here](https://www.npmjs.com/package/qualgo-network-sdk?activeTab=readme)

## Get started

Get the source code from Github

```
git clone https://github.com/hienle2703/qualgo-test-hienle.git
```

Install the dependencies

```
npm install
// OR
yarn
```

## Run the app on Android

First install (Expo Go)[https://play.google.com/store/apps/details?id=host.exp.exponent&hl=vi] on your device

```
yarn android
```

Or you can use Expo Go to scan the QR code from the terminal

## Run the app on iOS

First install (Expo Go)[https://apps.apple.com/us/app/expo-go/id982107779] on your device

```
yarn start
```

Then use your Camera App on iPhone to scan the QR code from the terminal