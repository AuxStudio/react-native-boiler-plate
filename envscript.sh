#!/usr/bin/env bash

if [ "$ENV" == "production"  ];
then
  echo "Switching to Firebase Production environment"
  yes | cp -rf "config/firebase/production/google-services.json" android/app
  yes | cp -rf "config/firebase/production/GoogleService-Info.plist" ios
else
  echo "Switching to Firebase Dev environment"
  yes | cp -rf "config/firebase/development/google-services.json" android/app
  yes | cp -rf "config/firebase/development/GoogleService-Info.plist" ios
fi