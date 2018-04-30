import getUserAuth from './getUserAuth';
import signInUserAnonymously from './signInUserAnonymously';
import getUserCredentialFromEmail from './getUserCredentialFromEmail';
import getUserCredentialFromFacebook from './getUserCredentialFromFacebook';
import getUserCredentialFromGoogle from './getUserCredentialFromGoogle';
import signInUserWithCredential from './signInUserWithCredential';
import sendPasswordResetEmail from './sendPasswordResetEmail';
import signOutUser from './signOutUser';

module.exports = {
  getUserAuth,
  signInUserAnonymously,
  getUserCredentialFromEmail,
  getUserCredentialFromFacebook,
  getUserCredentialFromGoogle,
  signInUserWithCredential,
  sendPasswordResetEmail,
  signOutUser,
};
