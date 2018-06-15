# Setup guide

This is a work in progress.

If anything is unclear or does not work, please let me know via [email](mailto:shaun@aux.co.za) or create an issue/PR and I will attend to it as soon as I can.

If you'd like to test that you are setting the project up correctly, do a build on iOS and android after each major step.

## 1. Initialise project

```shell
react-native init PROJECT_NAME
```

## 2. Setup git

```shell
cd PROJECT_NAME
git init
git remote add origin GIT_REPO_URL
git add .
git commit -m "Initialise Project"
git push -u origin master
```

Tell git to track case sensitivity on the file system:

(ONCE-OFF).

```shell
git config core.ignorecase false
```

## 3. Update display and package name

Display name: The name of the app as it appears on the device screen, e.g. TapOff.
Package name: The signature used by the app and play stores, e.g. co.za.auxstudio.tapoff.

(ONCE-OFF).

```shell
npm install -g react-native-rename
```

1.  Update the display and package name (android only):

NOTE: The display name will need to be different to the name you initialised the project with.

```shell
react-native-rename "NEW DISPLAY NAME" -b NEW_PACKAGE_NAME
```

2.  Update the package name in XCode (iOS only):

In Xcode, `Project` ➜ `General` ➜ `Bundle Identifier` ➜ `NEW_PACKAGE_NAME`.

## 4. Add reference to Android SDK path

Create file `./android/local.properties` with the following contents:

```
sdk.dir=PATH_TO_SDK
```

## 5. Make Android builds ~33% smaller

1.  In `./android/app/build.gradle`, replace as necessary:

```java
def enableSeparateBuildPerCPUArchitecture = true
```

2.  Same file as above, remove (from android.defaultConfig):

```java
ndk {
    abiFilters "armeabi-v7a", "x86"
}
```

## 6. Generate android app signing

1.  Generate keystore:

```shell
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
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

## 7. Update android versioning

1.  In `./android/app/build.gradle`, update in android:

```java
compileSdkVersion 27
buildToolsVersion "27.0.2"
```

2.  Same file as above, update in android.defaultConfig `TODO: is this the correct targetSdkVersion?`:

```java
targetSdkVersion 26
```

3.  Same file as above, update in dependencies:

```java
compile "com.android.support:appcompat-v7:25.0.0"
```

## 8. Add app to consoles

`TODO: Move/finish this. Do we need something that builds before this step? What is the bare minimum build we need?`

- [Google Play console](https://play.google.com/apps/publish)
- [Apple Developer portal](https://developer.apple.com/account/)
- [iTunes Connect](https://itunesconnect.apple.com/)

## 9. Install dependencies

Remove what you don't need.

```shell
yarn add prop-types react-native-simple-components react-native-simple-animators react-native-vector-icons@4.6.0 react-native-snackbar@0.4.6 react-native-fast-image@4.0.14 react-native-firebase@4.0.6 redux@4.0.0 redux-persist@5.9.1 react-redux@5.0.7 redux-saga@0.16.0 react-native-router-flux@4.0.0-beta.28 react-native-fbsdk@0.6.3 react-native-google-signin@0.12.0 react-native-image-picker@0.26.7 react-native-image-resizer@1.0.0 react-native-permissions@1.1.1 react-native-geocoder@0.5.0
```

## 10. Link dependencies

### react-native-vector-icons

#### Android

In `./android/app/build.gradle` (at bottom of file add):

```gradle
// react-native-vector-icons
project.ext.vectoricons = [
iconFontNames: [ 'MaterialIcons.ttf' ] // add whatever other icons you want
]
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
```

#### iOS

1.  In Xcode, drag fonts to project (eg. MaterialIcons.ttf and any other custom fonts you want).

2.  In `./ios/PROJECT_NAME/info.plist` add to the outermost dict:

```
<key>UIAppFonts</key>
<array>
    <string>MaterialIcons.ttf</string>
</array>
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
compile project(':react-native-fbsdk')
compile 'com.facebook.android:facebook-login:[4,5)'
```

11. In `./android/app/src/main/res/values/strings.xml` add (completed as part of step 6 in Facebook app setup):

```xml
<string name="facebook_app_id">FACEBOOK_APP_ID</string>
<string name="fb_login_protocol_scheme">FACEBOOK_LOGIN_SCHEME</string>
```

12. In `./android/app/src/main/AndroidManifest.xml` add (within <application> tags):

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

3.  Drag the downloaded Bolts.framework, FBSDKCoreKit.framework, FBSDKLoginKit.framework and FBSDKShareKit.framework `TODO: Is this necessary for login?` into Frameworks folder of the project in XCode.

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
```

#### iOS

1.  In the XCode's "Project navigator", right click on Libraries folder under your project ➜ `Add Files to <...>`

2.  Go to `node_modules` ➜ `react-native-permissions` ➜ `ios` ➜ select `ReactNativePermissions.xcodeproj`

3.  Add `libReactNativePermissions.a` to `Build Phases -> Link Binary With Libraries`

4.  Add necessary permissions to `./ios/PROJECT_NAME/Info.plist` (remove what you don't need):

```
<key>NSCameraUsageDescription</key>
<string></string>
<key>NSLocationWhenInUseUsageDescription</key>
<string></string>
<key>NSPhotoLibraryUsageDescription</key>
<string></string>
<key>NSCameraUsageDescription</key>
<string></string>
<key>NSPhotoLibraryAddUsageDescription</key>
<string></string>
```

### react-native-geocoder

#### Android

1.  In `android/setting.gradle`

```gradle
...
include ':react-native-geocoder', ':app'
project(':react-native-geocoder').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-geocoder/android')
```

3.  In `android/app/build.gradle`

```gradle
...
dependencies {
    ...
    implementation project(':react-native-geocoder')
}
```

4.  Register module (in MainApplication.java)

```java
import com.devfd.RNGeocoder.RNGeocoderPackage; // <--- import

public class MainActivity extends ReactActivity {
  ......

  @Override
  protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new RNGeocoderPackage()); // <------ add this
  }

  ......

}
```

#### iOS

1.  In the XCode's "Project navigator", right click on Libraries folder under your project ➜ `Add Files to <...>`

2.  Go to `node_modules` ➜ `react-native-geocoder` ➜ `ios` ➜ select `RNGeocoder.xcodeproj`

3.  Add `libRNGeocoder.a` to `Build Phases -> Link Binary With Libraries`

### react-native-image-picker

#### Android

1.  Add the following lines to `android/settings.gradle`:

    ```gradle
    include ':react-native-image-picker'
    project(':react-native-image-picker').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-image-picker/android')
    ```

2.  Add the implementation line to the dependencies in `android/app/build.gradle`:

    ```gradle
    dependencies {
        implementation project(':react-native-image-picker')
    }
    ```

3.  Add the required permissions in `AndroidManifest.xml` (this was done when linking react-native-permissions):

    ```xml
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
    ```

4.  Add the import and link the package in `MainApplication.java`:

    ```java
    import com.imagepicker.ImagePickerPackage; // <-- add this import

    public class MainApplication extends Application implements ReactApplication {
        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                new MainReactPackage(),
                new ImagePickerPackage() // <-- add this
            );
        }
    }
    ```

#### iOS

1.  In the XCode's "Project navigator", right click on your project's Libraries folder ➜ `Add Files to <...>`

2.  Go to `node_modules` ➜ `react-native-image-picker` ➜ `ios` ➜ select `RNImagePicker.xcodeproj`

3.  Add `RNImagePicker.a` to `Build Phases -> Link Binary With Libraries`

### react-native-image-resizer

#### Android

```shell
react-native link react-native-image-resizer
```

#### iOS

1.  In the XCode's "Project navigator", right click on your project's Libraries folder ➜ `Add Files to <...>`

2.  Go to `node_modules` ➜ `react-native-image-resizer` ➜ `ios` ➜ select `RNImageResizer.xcodeproj`

3.  Add `RNImageResizer.a` to `Build Phases -> Link Binary With Libraries`

### react-native-firebase

#### Android

1.  Link:

```shell
react-native link react-native-firebase
```

2.  In `./android/build.gradle`, add/update to buildscript.dependencies:

```java
classpath 'com.android.tools.build:gradle:3.1.0'
classpath 'com.google.gms:google-services:3.2.1'
```

3.  Same file as above, add to buildscript.repositories and allprojects.repositoriess:

```java
google()
```

4.  In `./android/app/build.gradle`, add to bottom of file:

```java
apply plugin: 'com.google.gms.google-services'
```

5.  Same file as above, add to dependencies:

```java
    // Firebase dependencies
    implementation "com.google.android.gms:play-services-base:15.0.0"
    implementation "com.google.firebase:firebase-core:15.0.0"
    implementation "com.google.firebase:firebase-analytics:15.0.2"
    implementation "com.google.firebase:firebase-auth:15.1.0"
    implementation "com.google.firebase:firebase-database:15.0.0"
    implementation "com.google.firebase:firebase-storage:15.0.2"
    implementation "com.google.firebase:firebase-messaging:15.0.2"
```

6.  Same file as above, in dependencies, update all compile statements to use implementation, e.g.:

```java
implementation(project(':react-native-firebase')) {
    transitive = false
}
```

7.  In `./android/gradlew/wrapper/gradle-wrapper.properties`, update:

```
distributionUrl=https\://services.gradle.org/distributions/gradle-4.4-all.zip
```

8.  In `./android/app/src/main/java/.../MainApplication.java`, add at top of file:

```java
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.database.RNFirebaseDatabasePackage;
import io.invertase.firebase.storage.RNFirebaseStoragePackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
```

Same file as above, in getPackages(), add:

```java
    new RNFirebasePackage(),
    new RNFirebaseAnalyticsPackage(),
    new RNFirebaseAuthPackage(),
    new RNFirebaseDatabasePackage(),
    new RNFirebaseStoragePackage(),
    new RNFirebaseMessagingPackage()
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

```shell
pod update
```

5.  Same file as above, uncomment:

```
platform :ios, '9.0'
```

6.  Same file as above, add these pods:

`NOTE: react-native-firebase is not yet compatible with the new firebase release (V5), so we force it to 4.13.0 for now. See this [issue](https://github.com/invertase/react-native-firebase/issues/1062).`

```
pod 'Firebase/Core', '~> 4.13.0'
pod 'Firebase/Analytics'
pod 'Firebase/Auth'
pod 'Firebase/Database'
pod 'Firebase/Storage'
pod 'Firebase/Messaging'
```

7.  Install the pods:

```shell
pod install
```

## 11. Copy the source files

1.  Clone the source files:

```shell
git clone https://github.com/shaunsaker/react-native-boilerplate.git src
```

2.  In `./index.js` replace content with:

```js
import { AppRegistry } from 'react-native';
import App from './src/App';

AppRegistry.registerComponent('PROJECT_NAME', () => App);
```

3.  Delete and move files. FIXME: script

```shell
sudo rm ./App.js && sudo rm ./src/.gitignore && sudo rm ./src/package.json && sudo rm ./src/README.md && sudo rm ./src/snippets.json && sudo rm -R ./src/.git && sudo mv ./src/docs/CHANGELOG.md ./CHANGELOG.md && sudo rm -r ./src/docs && sudo mv ./src/envscript.sh ./envscript.sh
```

4.  Finish react-native-google-signin setup by adding google web client id and ios client id (which can be found in your google-services.json - look for the "client_id" associated with "client_type": 3) to `./src/config/googleSignIn.js`.

## 12. Setup ESLint and Prettier

1.  Install dependencies:

```shell
yarn add --dev eslint babel-eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-native
```

2.  Move config files:

```shell
sudo mv ./src/.eslintrc.json ./.eslintrc.json && sudo mv ./src/.prettierrc ./.prettierrc
```

## 13. Setup extra app icons

1.  Copy `./src/assets/fonts/AppIcons.ttf` to

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

Copy the fonts to `./android/app/src/assets/fonts`.

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

## 17. Add firebase-cli

(ONCE-OFF).

```shell
npm install -g firebase-tools
```

```shell
firebase login
firebase init
```

See the [docs](https://github.com/firebase/firebase-tools) for a list of useful commands.

## 18. Fastlane integration

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

4.  Follow the steps and enter the relevant information:

4.1. Enter ./app/secret_key.json
4.2. Enter n

5.  Add the following to `./android/fastlane/Fastfile`:

```
  desc "Deploy a new version to the Beta track"
  lane :beta do
    gradle(task: "clean assembleRelease")
    upload_to_play_store(track: 'beta')
  end
```

and remove the existing beta task (ie. the other block of code with `lane :beta do`)

### ios

1.  Initialise fastlane

```shell
cd ios
fastlane init
```

2.  Follow the steps and enter the relevant information:

2.1. Enter 2 (to select Automate beta distribution to TestFlight)
2.2. Select the correct scheme (it's usually just PROJECT_NAME)
2.3. Enter your developer login credentials
2.4. Select the correct APP ID.
...

## 19. Setup Firebase environments

1.  Add two projects to the [Firebase console](), one named PROJECT_NAME-development and the other, PROJECT_NAME-production.

2.  Add ios and android apps to each and download the config files to `./config/firebase/development` and `./config/firebase/production`.

3.  Add the following scripts to `./package.json`, scripts object:

```shell
    "android-dev": "ENV=development ./envscript.sh && ENVFILE=.env.dev react-native run-android",
    "android-prod": "ENV=production ./envscript.sh && ENVFILE=.env.prod react-native run-android",
    "ios-dev": "ENV=development ./envscript.sh && ENVFILE=.env.dev && react-native run-ios",
    "ios-prod": "ENV=production ./envscript.sh && ENVFILE=.env.prod react-native run-ios",
    "beta":
      "ENV=production ./envscript.sh && ENVFILE=.env.prod && cd android && fastlane alpha && cd ../ios && fastlane beta && cd .."
```

4.  You will need to link a GoogleService-Info.plist as a resource in XCode (drag one of them into your Xcode project).

Done! Use the scripts to develop or release the beta builds, e.g:

```shell
yarn run ios-dev
```

## 20. Add Push Notifications

### Android

Most of it was already set up in the react-native-firebase step.

1.  In `./android/app/src/main/AndroidManifest.xml`, add to application component:

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
```

### iOS

1.  Setup certificates

Follow this [guide](https://firebase.google.com/docs/cloud-messaging/ios/certs).

2.  Enable capabilities

In XCode, enable the following capabilities:

- Push Notifications
- Background modes ➜ Remote notifications

3.  Upload APNs Authentication Key to Firebase console (Project Settings => Cloud Messaging)
