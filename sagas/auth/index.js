import getUserAuth from './getUserAuth';
import signInUserAnonymously from './signInUserAnonymously';
import getUserCredentialFromEmail from './getUserCredentialFromEmail';
import getUserCredentialFromFacebook from './getUserCredentialFromFacebook';
import getUserCredentialFromGoogle from './getUserCredentialFromGoogle';
import linkUserWithCredential from './linkUserWithCredential';
import signInUserWithCredential from './signInUserWithCredential';
import sendPasswordResetEmail from './sendPasswordResetEmail';
import signOutUser from './signOutUser';

const auth = {
  getUserAuth,
  signInUserAnonymously,
  getUserCredentialFromEmail,
  getUserCredentialFromFacebook,
  getUserCredentialFromGoogle,
  linkUserWithCredential,
  signInUserWithCredential,
  sendPasswordResetEmail,
  signOutUser,
};

export default auth;
