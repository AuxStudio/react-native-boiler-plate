# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## 1.2.0

### Fixed

- Fixed routes import bug
- Fixed anonymous auth SIGN_IN_USER reducer bug

### Added

- Added CodePush handler
- Added CodePushStatus component
- Added getPercentage util to numbers subset
- Added version to config
- Added BuildStatus component
- Added more font types to styleConstants
- Added Android back handler
- Added Page component

### Removed

- Removed Input component (external lib is no longer being maintained)
- Removed Modal component (replaced by Lightbox)
- Removed unused log util
- Removed default android back handler disable in Lightbox component

### Changed

- Moved navigate util to navigation subset
- Only log store actions if iOS

## 1.1.2

### Fixed

- Linking issue in SETUP_GUIDE

## 1.1.1

### Fixed

- Fix SETUP_GUIDE note to remove project CHANGELOG

## 1.1.0

### Changed

- State's pendingTransactions does not reference firebase (for better backend interoperability)
- Disabled remote debugger warnings
- Lightbox component accepts disableClose and handleClose props
- AppState initialState has shape where applicable (for self-documentation)
- Replace Date strings with unix timestamps

### Added

- Added a change log

### Removed

- Removed global app loading state
