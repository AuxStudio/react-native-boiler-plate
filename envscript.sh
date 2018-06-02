#!/usr/bin/env bash

if [ "$ENV" == "production"  ];
then
  echo "Switching to Firebase Production environment"
  yes | cp -rf "firebase_environments/production/google-services.json" android/app
  yes | cp -rf "firebase_environments/production/GoogleService-Info.plist" ios
else
  echo "Switching to Firebase Dev environment"
  yes | cp -rf "firebase_environments/development/google-services.json" android/app
  yes | cp -rf "firebase_environments/development/GoogleService-Info.plist" ios
fi