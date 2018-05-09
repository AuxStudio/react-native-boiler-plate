import images from './images';
import googleSignIn from './googleSignIn';

const config = {};

// Sets root database node, ie. development, staging or production
config.environment = 'development';

config.images = images;
config.googleSignIn = googleSignIn;

export default config;
