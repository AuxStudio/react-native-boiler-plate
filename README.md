A react-native redux and firebase boilerplate.

1. INITIALISE
    react-native init PROJECT_NAME

2. SETUP GIT
    Setup git repo
    cd PROJECT_NAME
    git init
    git remote add origin GIT_REPO_URL
    git add .
    git commit -m "Initialise Project"
    git push -u origin master

3. UPDATE DISPLAY NAME*
    ./android/app/src/main/values/strings.xml 
        Change the string value in <string name="app_name">NEW_APP_DISPLAY_NAME</string
    ./ios/PROJECT_NAME/Info.plist    NEEDS TESTING  
        Under <key>CFBUNDLEDISPLAYNAME</key>, change the string value to your NEW_APP_DISPLAY_NAME
    
4. ADD REFERENCE TO ANDROID SDK PATH
    Create local.properties in ./android
        ndk.dir=PATH_TO_NDK_BUNDLE
        sdk.dir=PATH_TO_SDK
        /*
            ndk.dir=/home/shaun/Android/Sdk/ndk-bundle
            sdk.dir=/home/shaun/Android/Sdk
        */
    
5. GENERATE ANDROID APP SIGNING (do this at the beginning so you can get your release key for facebook and google sign in)
    keytool -genkey -v -keystore PROJECT_NAME.keystore -alias PROJECT_NAME -keyalg RSA -keysize 2048 -validity 10000
    Enter a password and your details
    Move PROJECT_NAME.keystore to ./android/app/
    In ./android/gradle.properties, Add 
        PROJECT_NAME_STORE_FILE=PROJECT_NAME.keystore
        PROJECT_NAME_KEY_ALIAS=PROJECT_NAME
        PROJECT_NAME_STORE_PASSWORD=PASSWORD
        PROJECT_NAME_KEY_PASSWORD=PASSWORD
    In ./android/app/build.gradle, Add (android.defaultConfig)
        signingConfigs {
            release {
                if (project.hasProperty('PROJECT_NAME_STORE_FILE')) {
                    storeFile file(PROJECT_NAME_STORE_FILE)
                    storePassword PROJECT_NAME_STORE_PASSWORD
                    keyAlias PROJECT_NAME_KEY_ALIAS
                    keyPassword PROJECT_NAME_KEY_PASSWORD
                }
            }
        }
        {in android.buildTypes.release}
            signingConfig signingConfigs.release
    *NOT COMMITTING THESE FILES
        In .gitignore
            add gradle.properties
    *COMMITTING THESE FILES
        In .gitignore
            remove *.keystore
    *cd android && ./gradlew assembleRelease
    *cd ..
    *TO TEST RELEASE react-native run-android --variant=release

6. INSTALL DEPENDENCIES (NOTE: Some of these are optional)
    yarn add prop-types react-native-simple-components react-native-simple-animators react-native-vector-icons react-native-firebase redux react-redux redux-saga react-native-router-flux react-native-fbsdk react-native-google-signin react-native-image-picker react-native-image-resizer react-native-permissions react-native-geocoder react-native-fs

7. LINK AND SETUP DEPENDENCIES (ANDROID ONLY - TODO: IOS)

    react-native-vector-icons
        ./android/app/build.gradle (at bottom of file add)
            project.ext.vectoricons = [
                iconFontNames: [ 'MaterialIcons.ttf' ] // add whatever other icons you want
            ]

            apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"

    react-native-firebase
        react-native link react-native-firebase
        Add Firebase app in Firebase console
            Get the Android SHA1 key here
                keytool -exportcert -list -v -alias PROJECT_NAME -keystore ./android/app/PROJECT_NAME.keystore
        Download google-services.json to
            ./android/app/
            ./ios/PROJECT_NAME/
        In ./android/build.gradle add (in buildscript.dependencies)
                classpath 'com.google.gms:google-services:3.1.1'
        Same file as above add (to allprojects.repositories)
            maven {
                url 'https://maven.google.com'
            }

        In ./android/app/build.gradle add (at very bottom)
            apply plugin: 'com.google.gms.google-services'
        Same file as above add (to dependencies)
            compile "com.google.android.gms:play-services-base:11.4.2"
            compile "com.google.firebase:firebase-core:11.4.2"
            compile "com.google.firebase:firebase-auth:11.4.2"
            compile "com.google.firebase:firebase-storage:11.4.2"
        
        In ./android/app/src/main/java/MainApplication.java add (at top)
            import io.invertase.firebase.auth.RNFirebaseAuthPackage;
            import io.invertase.firebase.database.RNFirebaseDatabasePackage;
            import io.invertase.firebase.storage.RNFirebaseStoragePackage;
        Same file as above add (under packages)
            new RNFirebaseAuthPackage(),
            new RNFirebaseDatabasePackage(),
            new RNFirebaseStoragePackage() 

    react-native-fbsdk
        react-native link react-native-fbsdk
        In ./android/app/src/main/java/MainApplication.java add (at top)
            import com.facebook.CallbackManager;
            import com.facebook.FacebookSdk;
        Same file as above add (beginning of class)
            private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

            protected static CallbackManager getCallbackManager() {
                return mCallbackManager;
            }
        Same file as above overwrite
            @Override
                public void onCreate() {
                super.onCreate();
                FacebookSdk.sdkInitialize(getApplicationContext());
            }
        Same file as above add (in packages)
            new FBSDKPackage(mCallbackManager),
        In ./android/app/src/main/java/MainActivity.java add (beginning of class)
            import android.content.Intent; (at top of file)
            @Override
            public void onActivityResult(int requestCode, int resultCode, Intent data) {
                super.onActivityResult(requestCode, resultCode, data);
                MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
            }
        
        https://developers.facebook.com/docs/facebook-login/android?sdk=maven

        In ./android/build.gradle add (allprojects.repositories)
            mavenCentral()
        In ./android/app/build.gradle add (dependencies)
            compile 'com.facebook.android:facebook-login:[4,5)'
        In ./android/app/src/main/res/values/strings.xml add 
            <string name="facebook_app_id">FACEBOOK_APP_ID</string>
            <string name="fb_login_protocol_scheme">FACEBOOK_LOGIN_SCHEME</string>
        In ./android/app/src/main/AndroidManifest.xml add
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
        
        Add app name and main activity name to Facebook app
        Add key hashes to Facebook app
            keytool -exportcert -alias androiddebugkey -keystore ~/.android/debug.keystore | openssl sha1 -binary | openssl base64
            (DO THE ABOVE TWICE, FIRST WITH android as password and second with your project password)
            keytool -exportcert -alias PROJECT_NAME -keystore ./android/app/PROJECT_NAME.keystore | openssl sha1 -binary | openssl base64

    react-native-google-signin 
        react-native link react-native-google-signin
        In ./android/app/build.gradle add (dependencies)
            compile(project(":react-native-google-signin")){         
                exclude group: "com.google.android.gms" // very important
            }
            compile 'com.google.android.gms:play-services-auth:11.4.2'

    react-native-permissions 
        react-native link react-native-permissions
        Add permissions to AndroidManifest.xml
            <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW"/>
            <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
            <uses-permission android:name="android.permission.INTERNET" />
            <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
            <uses-permission android:name="android.permission.CAMERA" />
            <uses-permission android:name="android.permission.READ_INTERAL_STORAGE"/>
            <uses-permission android:name="android.permission.WRITE_INTERAL_STORAGE"/>
            <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
            <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>

    react-native-geocoder 
        react-native link react-native-geocoder

    react-native-image-picker 
        react-native link react-native-image-picker
        In ./android/build.grade (buildscript.dependencies) change
            classpath 'com.android.tools.build:gradle:2.2.3' => classpath 'com.android.tools.build:gradle:2.2.+'

    react-native-image-resizer 
        react-native link react-native-image-resizer

    react-native-fs 
        react-native link react-native-fs

8. COPY THE SOURCE FILES
    git clone https://github.com/shaunsaker/react-native-boilerplate.git src
    In index.js change
        import App from './App' to './src/App';
    rm ./App.js
    sudo rm -R ./src/.git

9. SETUP EXTRA APP ICONS
    Copy the following to package.json
        "rnpm": {
            "assets": [
            "./src/assets/fonts",
            ]
        }
    Copy ./src/assets/fonts/AppIcons.ttf to
        ./android/app/src/assets/fonts
        ./ios/PROJECT_NAME/     TODO: TEST THIS


10. UPDATE config.js with google sign in webClientId and iosClientId
