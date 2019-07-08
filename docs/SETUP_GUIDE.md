# Setup guide

This is a work in progress.

If anything is unclear or does not work, please let me know via [email](mailto:shaun@aux.co.za) or create an issue/PR and I will attend to it as soon as I can.

If you'd like to test that you are setting the project up correctly, do a build on iOS and android after each major step.

## Table of contents

1.  [Intialise project](#1-initialise-project)
2.  [Setup git](#2-setup-git)
3.  [Add reference to Android SDK path](#3-add-reference-to-android-sdk-path)
4.  [Update display and package name](#4-update-display-and-package-name)
5.  [Make Android builds smaller](#5-make-android-builds-smaller)
6.  [Generate android app signing](#6-add-android-app-signing)
7.  Placeholder
8.  [Add Firebase apps](#8-add-firebase-apps)
9.  [Install dependencies](#9-install-dependencies)
10. [Link dependencies](#10-link-dependencies)

    1.  [react-native-vector-icons](#react-native-vector-icons)
    2.  [react-native-snackbar](#react-native-snackbar)
    3.  [react-native-fast-image](#react-native-fast-image)
    4.  [react-native-firebase](#react-native-firebase)
    5.  [react-native-fbsdk](#react-native-fbsdk)
    6.  [react-native-google-signin](#react-native-google-signin)
    7.  [react-native-permissions](#react-native-permissions)
    8.  [react-native-geocoder](#react-native-geocoder)
    9.  [react-native-image-picker](#react-native-image-picker)
    10. [react-native-image-resizer](#react-native-image-resizer)
    11. [react-native-netinfo](#react-native-netinfo)

11. [Copy the source files](#11-copy-the-source-files)
12. [Setup ESLint and Prettier](#12-setup-eslint-and-prettier)
13. [Setup extra app icons](#13-setup-extra-app-icons)
14. [Enable Firebase authentication methods](#14-enable-firebase-authentication-methods)
15. [Add your custom fonts](#15-add-your-custom-fonts)
16. [Add Storybook](#16-add-storybook)
17. [Fastlane integration](#17-fastlane-integration)
18. [Setup Firebase environments](#18-setup-firebase-environments)
19. [Setup testing](#19-setup-testing)
20. [Add Slack config](#20-add-slack-config)
21. [Setup Code-Push](#21-setup-code-push)
22. [Add Push Notifications](#22-add-push-notifications)

## 1. Initialise project

```shell
react-native init --version 0.59.9 temp
```

`NOTE: We're locking RN to version 0.59.9 here. This will prevent bugs in this setup guide. We will continue to upgrade RN with each new release. Also: we use 'temp' as a project name here so that we can correctly rename the project in [Step 4](#4-update-display-and-package-name)`

## 2. Setup git

1.  Add repository to GitHub/Bitbucket.

2.  Initialise git in project:

```shell
cd temp
git init
git remote add origin GIT_REPO_URL
git add .
git commit -m "Initial commit"
git push -u origin master
```

## 3. Add reference to Android SDK path

Create file `./android/local.properties` with the following contents:

```
sdk.dir = PATH_TO_SDK
```

## 4. Update display and package name

Display name: The name of the app as it appears on the device screen, e.g. TapOff.
Package name: The signature used by the app and play stores, e.g. co.za.auxstudio.tapoff.

(ONCE-OFF).

```shell
yarn global add react-native-rename
```

1.  Update the display and package name (android only):

`NOTE: The display name will need to be different to the name you initialised the project with. Also. The react-native-rename package breaks the iOS build. We'll use react-native eject to handle renaming on iOS.`

```shell
react-native-rename "NEW DISPLAY NAME" -b NEW_PACKAGE_NAME
```

2. Rebuild the iOS folder:

```shell
sudo rm -R ./ios
react-native eject
```

3.  Update the package name in XCode (iOS only):

NOTE: Follow this step to a tee, don't modify Info.plist's bundle identifier, you will run into build issues.

In Xcode, `Project` => `General` => `Identity` => `Bundle Identifier` => `NEW_PACKAGE_NAME`.

4.  Setup iOS app signing (since you have XCode open):

In Xcode, `Project` => `General` => `Signing` => Select team.

## 5. Make Android builds smaller

Approximately 33% smaller.

In `./android/app/build.gradle`, replace as necessary:

```java
def enableSeparateBuildPerCPUArchitecture = true
```

## 6. Add android app signing

1.  Generate keystore:

```shell
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
mv ./my-release-key.keystore ./android/app/my-release-key.keystore
```

2.  Enter a password and your details.

3.  Move the generated `./src/my-release-key.keystore` to `./android/app/`.

4.  In `./android/gradle.properties`, add:

```gradle
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=YOUR_PASSWORD
MYAPP_RELEASE_KEY_PASSWORD=YOUR_PASSWORD
```

5.  In .`/android/app/build.gradle`, add (in android.defaultConfig):

```java
signingConfigs {
    release {
        if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
            storeFile file(MYAPP_RELEASE_STORE_FILE)
            storePassword MYAPP_RELEASE_STORE_PASSWORD
            keyAlias MYAPP_RELEASE_KEY_ALIAS
            keyPassword MYAPP_RELEASE_KEY_PASSWORD
        }
    }
}
```

6.  In the same file add (in android.buildTypes.release):

```java
signingConfig signingConfigs.release
```

7.  If you want to commit the keystore to git:

In `./gitignore`, remove `*.keystore`.

## 8. Add Firebase apps

1.  Add two projects to the [Firebase console](https://console.firebase.google.com/).

The projects should be called PROJECT_NAME-development and PROJECT_NAME-production. In [Step 18](#18-setup-firebase-environments) we will configure these environments.

2.  Add android and iOS apps to the `development` project.

3.  Copy the `development` project config files:

    1.  Copy `google-services.json` to `./android/app`.
    2.  In XCode, drag `GoogleService-Info.plist` to project (make sure Copy items if needed is ticked).

## 9. Install dependencies

Remove what you don't need.

```shell
yarn add prop-types react-native-simple-components react-native-simple-animators react-native-vector-icons react-native-snackbar react-native-fast-image@6 react-native-firebase redux redux-persist react-redux redux-saga react-native-router-flux react-native-fbsdk@0.8 react-native-google-signin react-native-image-picker react-native-image-resizer react-native-permissions react-native-geocoder redux-logger react-native-keyboard-aware-scroll-view react-native-material-menu @react-native-community/netinfo
```

## 10. Link dependencies

### react-native-vector-icons

```
react-native link react-native-vector-icons
```

### react-native-snackbar

```shell
react-native link react-native-snackbar
```

### react-native-fast-image

```shell
react-native link react-native-fast-image
```

### react-native-fbsdk

`NOTE: This is setup for login only.`

#### Android

1.  Add [Facebook](https://developers.facebook.com/apps/) app (you can skip the steps besides 3 and 6).

2.  Add key hashes to Facebook app.

Run the below command twice. First with android as password and second with your project password. This will generate two debug key hashes.

```shell
keytool -exportcert -alias androiddebugkey -keystore ~/.android/debug.keystore | openssl sha1 -binary | openssl base64
```

Run the below command once with your project password. This will an additional key hash (which will enable the fbsdk on your production app).

```shell
keytool -exportcert -alias my-key-alias -keystore ./android/app/my-release-key.keystore | openssl sha1 -binary | openssl base64
```

You should have a total of 3 key hashes added to your Facebook app.

`NOTE: Once Facebook app setup is complete, there is a toggle button at the top of the page that will default to development mode. When in production, switch this to live (you will need a privacy policy link). Otherwise your production build facebook logins will fail with all other users who are not admins.`

3.  Link:

```shell
react-native link react-native-fbsdk
```

4.  In `./android/app/src/main/java/MainApplication.java` add (at top):

```java
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
```

5.  Same file as above add (beginning of public class MainApplication...):

```java
private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

protected static CallbackManager getCallbackManager() {
return mCallbackManager;
}
```

6.  Same file as above overwrite @Override (public void onCreate()):

```java
@Override
public void onCreate() {
super.onCreate();
FacebookSdk.sdkInitialize(getApplicationContext());
}
```

7.  Same file as above replace (in packages):

```java
new FBSDKPackage(mCallbackManager),
```

8.  In `./android/app/src/main/java/MainActivity.java` add (top of file):

```java
import android.content.Intent;
```

9.  Same file as above, add (at beginning of public class MainActivity):

```java
@Override
public void onActivityResult(int requestCode, int resultCode, Intent data) {
super.onActivityResult(requestCode, resultCode, data);
MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
}
```

10. In `./android/app/build.gradle` replace (to dependencies):

```java
implementation project(':react-native-fbsdk')
implementation 'com.facebook.android:facebook-login:[4,5)'
```

11. In `./android/app/src/main/res/values/strings.xml` add (completed as part of step 6 in Facebook app setup):

```xml
<string name="facebook_app_id">FACEBOOK_APP_ID</string>
<string name="fb_login_protocol_scheme">FACEBOOK_LOGIN_SCHEME</string>
```

12. In `./android/app/src/main/AndroidManifest.xml` add (within `application` tags):

```xml
<meta-data android:name="com.facebook.sdk.ApplicationId"
        android:value="@string/facebook_app_id"/>

<activity android:name="com.facebook.FacebookActivity"
    android:configChanges=
            "keyboard|keyboardHidden|screenLayout|screenSize|orientation"
    android:label="@string/app_name" />
<activity
    android:name="com.facebook.CustomTabActivity"
    android:exported="true">
    <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data android:scheme="@string/fb_login_protocol_scheme" />
    </intent-filter>
</activity>
```

12. In `./android/build.gradle`, add to allprojects:

```gradle
configurations.all {
    resolutionStrategy {
        force 'com.facebook.android:facebook-android-sdk:4.28.0'
    }
}
```

#### iOS

1.  Follow the steps [here](https://developers.facebook.com/docs/facebook-login/ios).

2.  Download the [FacebookSDK](https://origincache.facebook.com/developers/resources/?id=facebook-ios-sdk-current.zip). (ONCE-OFF).

3.  Drag the downloaded Bolts.framework, FBSDKCoreKit.framework, FBSDKLoginKit.framework and FBSDKShareKit.framework into Frameworks folder of the project in XCode. Make sure to select `Copy items if needed`.

### react-native-google-signin

#### Android

1.  Link:

```shell
react-native link react-native-google-signin
```

2.  In `./android/app/build.gradle` add/replace (dependencies):

```java
implementation(project(":react-native-google-signin")){
    exclude group: "com.google.android.gms" // very important
}
implementation 'com.google.android.gms:play-services-auth:12.0.1'
```

#### iOS

1.  Drag and drop contents of the `./node_modules/react-native-google-signin/ios/GoogleSdk` folder to your XCode project. (make sure Copy items if needed is ticked) (copy this folder to `./ios/` if you don't see it there).

2.  Configure URL types in the Info panel:

- add Identifier and URL Schemes with your REVERSED\*CLIENT_ID (found inside the plist)
- add Identifier and URL Schemes set to your bundle id

3.  Add top of `./ios/AppDelegate.m`:

```
#import <RNGoogleSignin/RNGoogleSignin.h>
```

4.  Same file as above, replace openUrl function with:

```
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {

  return [[FBSDKApplicationDelegate sharedInstance] application:application
                                                        openURL:url
                                              sourceApplication:sourceApplication
                                                     annotation:annotation
         ]
         || [RNGoogleSignin application:application
                                openURL:url
                      sourceApplication:sourceApplication
                             annotation:annotation
            ];
}
```

5.  `NB`: In XCode, change the Framework Search Paths of RNGoogleSignIn to:

```
$(inherited) non-recursize
$(PROJECT_DIR) recursive
```

### react-native-permissions

#### Android

No android linking necessary.

Add permissions to `./android/app/src/main/AndroidManifest.xml` (remove what you don't need):

```xml
<uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW"/>
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_INTERAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_INTERAL_STORAGE"/>
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />
<uses-permission android:name="android.permission.VIBRATE" />
```

#### iOS

1.  Link:

```
react-native link react-native-permissions
```

2.  Add necessary permissions to `./ios/PROJECT_NAME/Info.plist` (remove what you don't need):

```
<key>NSLocationWhenInUseUsageDescription</key>
<string></string>
<key>NSPhotoLibraryUsageDescription</key>
<string></string>
<key>NSCameraUsageDescription</key>
<string></string>
<key>NSPhotoLibraryAddUsageDescription</key>
<string></string>
```

### react-native-firebase

#### Android

1.  Link:

```shell
react-native link react-native-firebase
```

2.  In `./android/build.gradle`, add/update to buildscript.dependencies:

```java
classpath 'com.android.tools.build:gradle:3.1.4'
classpath 'com.google.gms:google-services:3.2.1'
```

4.  In `./android/app/build.gradle`, add to bottom of file:

```java
apply plugin: 'com.google.gms.google-services'
```

5.  Same file as above, add to dependencies:

```java
    // Firebase dependencies
    implementation "com.google.android.gms:play-services-base:15.0.1"
    implementation "com.google.firebase:firebase-core:15.0.0"
    implementation "com.google.firebase:firebase-analytics:15.0.2"
    implementation "com.google.firebase:firebase-auth:15.1.0"
    implementation "com.google.firebase:firebase-database:15.0.0"
    implementation "com.google.firebase:firebase-storage:15.0.2"
    implementation "com.google.firebase:firebase-messaging:15.0.2"
    implementation "com.google.firebase:firebase-firestore:16.0.0"
    implementation 'com.android.support:multidex:1.0.3' // needed for multidex
```

6.  Enable multi dex:

Same file as above, in android.defaultConfig:

```java
multiDexEnabled true
```

7.  Same file as above, in dependencies, update all compile statements to use implementation, e.g.:

```java
implementation(project(':react-native-firebase')) {
    transitive = false
}
```

9.  In `./android/app/src/main/java/.../MainApplication.java`, add at top of file:

```java
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.database.RNFirebaseDatabasePackage;
import io.invertase.firebase.storage.RNFirebaseStoragePackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import io.invertase.firebase.firestore.RNFirebaseFirestorePackage;
```

Same file as above, in getPackages(), add:

```java
    new RNFirebasePackage(),
    new RNFirebaseAnalyticsPackage(),
    new RNFirebaseAuthPackage(),
    new RNFirebaseDatabasePackage(),
    new RNFirebaseStoragePackage(),
    new RNFirebaseMessagingPackage(),
    new RNFirebaseNotificationsPackage(),
    new RNFirebaseFirestorePackage()
```

#### iOS

1.  In `./ios/PROJECT_NAME/AppDelegate.m`, add to top of file:

```
#import <Firebase.h>
```

2.  Same file as above, add to beginning of didFinishLaunchingWithOptions method:

```
[FIRApp configure];
```

3.  Setup cocoapods:

```shell
cd ios
pod init
```

4.  In `./ios/PodFile` delete duplicate PROJECT_NAME-tvOSTests within main project target.

5.  Update pods:

```shell
pod update
```

6.  Same file as above, uncomment:

```
platform :ios, '9.0'
```

7.  Same file as above, add these pods:

```
pod 'Firebase/Core'
pod 'Firebase/Analytics'
pod 'Firebase/Auth'
pod 'Firebase/Database'
pod 'Firebase/Storage'
pod 'Firebase/Messaging'
pod 'Firebase/Firestore'
```

8.  Install the pods:

```shell
pod install
```

### react-native-geocoder

```
react-native link react-native-geocoder
```

### react-native-image-picker

```
react-native link react-native-image-picker
```

### react-native-image-resizer

```
react-native link react-native-image-resizer
```

### react-native-netinfo

```shell
react-native link @react-native-community/netinfo
```

## 11. Copy the source files

1.  Clone the source files:

```shell
git clone https://github.com/shaunsaker/react-native-boilerplate.git temp
```

2.  Move the source files.

This way we only copy the src files and not this repo's files.

```shell
mv temp src
```

3.  In `./index.js`, change:

```js
import App from './App';
```

to

```js
import App from './src/App';
```

4.  Finish react-native-google-signin setup by adding google web client id and ios client id (which can be found in your google-services.json - look for the "client_id" associated with "client_type": 3) to `./src/config/googleSignIn.js`.

## 12. Setup ESLint and Prettier

1.  Install dependencies:

```shell
yarn add --dev eslint babel-eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-native eslint-plugin-detox
```

## 13. Setup extra app icons

1.  Copy `./src/static/fonts/AppIcons.ttf` to

- `./android/app/src/assets/fonts` (you'll need to create the assets/fonts/ directory)
- `./ios/PROJECT_NAME/`

## 14. Enable Firebase authentication methods

Remove what you don't need.

- Anonymous
- Facebook (add Facebook App ID and App secret and add OAuth redirect URI to Facebook app as per Firebase docs)
- Google (download and replace new google-services.json and GoogleService-Info.plist)
- Email

## 15. Add your custom fonts

Optional.

### Android

Copy the fonts to `./android/app/src/main/assets/fonts`.

### iOS

Follow this [guide](https://medium.com/react-native-training/adding-custom-fonts-to-react-native-b266b41bff7f).

## 16. Add Storybook

(ONCE-OFF).

```shell
npm i -g @storybook/cli
```

```shell
getstorybook
```

## 17. Fastlane integration

Saves sooo much time! We normally just set it up to automate beta distribution and manually release to production but fastlane has tools to do that too.

### Install fastlane globally:

```shell
sudo gem install fastlane -NV
```

### android

1.  Get your json secret_key file

Follow the steps [here](https://docs.fastlane.tools/actions/supply/#setup).

2.  Save the downloaded file to `./android/app/secret_key.json`

3.  Initialise fastlane

```shell
cd android
fastlane init
```

4.  Follow the steps and inpu the relevant information:

    1.  Input `./app/secret_key.json`
    2.  Input `n`

5.  Add the following to `./android/fastlane/Fastfile`:

```
  desc "Deploy a new version to the Alpha track"
  lane :alpha do
    gradle(task: "clean assembleRelease")
    upload_to_play_store(track: 'alpha')
  end
```

### ios

1.  Initialise fastlane

```shell
cd ios
fastlane init
```

2.  Follow the steps and input the relevant information:

    1.  Input `2` (to select Automate beta distribution to TestFlight)
    2.  Select the correct scheme (it's usually just PROJECT_NAME)
    3.  Input your developer login credentials
    4.  Select the correct APP ID.
        ...

## 18. Setup Firebase environments

1.  Add android and iOS apps to the `production` project.

NOTE: When adding android app, don't bother adding the debug signing key, you don't need it.

2.  Download each of the config files created in [Step 8](#8-add-firebase-apps) to `./config/firebase/development` and `./config/firebase/production` respectively.

3.  Copy `development` project config files:

```shell
cp ./android/app/google-services.json ./config/firebase/development/google-services.json
```

```shell
cp ./ios/PROJECT_NAME/GoogleService-Info.plist ./config/firebase/development/GoogleService-Info.plist
```

4.  Add the following scripts to `./package.json`, scripts object:

```shell
    "env-development": "ENV=development ./envscript.sh",
    "env-production": "ENV=production ./envscript.sh",
    "ios-development": "react-native run-ios",
    "android-development": "react-native run-android",
    "android-staging": "react-native run-android --variant=release",
    "android-apk:": "cd android && ./gradlew clean && ./gradlew assembleRelease",
    "android-install": "adb install ./android/app/build/outputs/apk/release/app-armeabi-v7a-release.apk",
    "code-push-android": "code-push release-react PROJECT_NAME-android android  --deploymentName 'Production'",
    "code-push-ios": "code-push release-react PROJECT_NAME-ios ios  --deploymentName 'Production'",
    "code-push:": "yarn run code-push-android && yarn run code-push-ios",
    "beta-android": "yarn run env-production && cd android && fastlane alpha",
    "beta-ios": "yarn run env-production && cd ios && fastlane beta"
```

5.  Set permissions on env script:

```shell
chmod +x envscript.sh
```

Done! Use the scripts to develop or release the beta builds, e.g:

```shell
yarn run ios-dev
```

## 19. Setup testing

1.  Add dev dependency needed for saga unit tests

```shell
yarn add --dev redux-saga-testing
```

2.  Setup Detox

    1.  Follow Step 1 of the [Getting Started](https://github.com/wix/detox/blob/master/docs/Introduction.GettingStarted.md) guide.

    (ONCE-OFF).

    2.  Add detox as a dependency:

    ```shell
    yarn add --dev detox
    ```

    3.  Add the following to `./package.json`:

    NOTE: Replace `example` with your PROJECT_NAME.

    ```json
    "detox": {
    "configurations": {
        "ios.sim.debug": {
        "binaryPath": "ios/build/Build/Products/Debug-iphonesimulator/example.app",
        "build": "xcodebuild -project ios/example.xcodeproj -scheme example -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build",
        "type": "ios.simulator",
        "name": "iPhone 7"
        }
    }
    }
    ```

    4.  Same file as above, add this to the "jest" object:

    ```json
    "testMatch": [
        "<rootDir>/src/**/*.test.js"
    ],
    "transformIgnorePatterns": [
      "node_modules/(?!(jest-)?react-native|react-navigation)"
    ]
    ```

    This avoids conflics with Detox \*.spec.js files and an [issue](https://github.com/react-navigation/react-navigation/issues/657) with react-navigation.

    5.  Same file as above update test script and add detox script:

    ```json
    "test": "jest && yarn run detox",
    "detox": "detox build && detox test",
    ```

    6.  Initialise Detox

    ```shell
    detox init -r jest
    ```

    7.  Test the setup with:

    ```shell
    detox build
    detox test
    ```

    This test will fail. We just need to make sure it is building here.

## 20. Add Slack config

We log errors to Slack. If you'd like this functionality enabled, you'll need to update the Slack config object in `./src/config/slack/index.js`.

## 21. Setup Code-Push

1.  Install the Code-Push cli globally:

(ONCE-OFF).

```shell
yarn global add code-push-cli
```

2.  Add apps to Code-Push:

```shell
code-push login
code-push app add PROJECT_NAME-android android react-native
code-push app add PROJECT_NAME-ios ios react-native
```

3.  Link dependency:

```shell
yarn add react-native-code-push
react-native link react-native-code-push
```

NOTE: You will be asked for your deployment keys. Use the relevant production keys from Step 2 above.

4.  Remove the pod added to `./ios/PodFile` in the previous step (we're going to link the dependency manually in the next step).

5.  Link dependency (iOS):

    1.  In the XCode's "Project navigator", right click on Libraries folder under your project => `Add Files to <...>`

    2.  Go to `node_modules` => `react-native-code-push` => `ios` => select `CodePush.xcodeproj`

    3.  Add `libCodePush.a` to `Build Phases -> Link Binary With Libraries`

Done! Release updates with:

```shell
code-push release-react PROJECT_NAME-android android --deploymentName "Production"
code-push release-react PROJECT_NAME-ios ios --deploymentName "Production"
```

## 22. Add Push Notifications

Optional.

### Android

Most of it was already set up in the react-native-firebase step.

1.  In `./android/app/src/main/AndroidManifest.xml`, add to application:

```xml
<service android:name="io.invertase.firebase.messaging.RNFirebaseMessagingService">
	<intent-filter>
		<action android:name="com.google.firebase.MESSAGING_EVENT" />
	</intent-filter>
</service>
<service android:name="io.invertase.firebase.messaging.RNFirebaseInstanceIdService">
	<intent-filter>
		<action android:name="com.google.firebase.INSTANCE_ID_EVENT"/>
	</intent-filter>
</service>
<meta-data
	android:name="com.google.firebase.messaging.default_notification_channel_id"
	android:value="@string/default_notification_channel_id"/>
```

2.  Same file as above, add to activity:

```xml
android:launchMode="singleTop"
```

3.  In `./android/app/src/main/res/values/strings.xml`, add to resources:

```xml
<string name="default_notification_channel_id">Notifications</string>
```

### iOS

`TBC`.

1.  Setup certificates

Follow this [guide](https://firebase.google.com/docs/cloud-messaging/ios/certs).

2.  Enable capabilities

In XCode, enable the following capabilities:

- Push Notifications
- Background modes => Remote notifications

3.  Upload APNs Authentication Key to Firebase console (Project Settings => Cloud Messaging)
