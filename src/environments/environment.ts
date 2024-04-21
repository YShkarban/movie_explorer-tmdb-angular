// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  tmdb: {
    baseUrl: 'https://api.themoviedb.org/3',
    apiKey: '50d63019ee0810e80779e28e5c364d53',
  },
  firebase: {
    apiKey: 'AIzaSyBe0-Q0_9iuFpVH8_7IrTJo7lDEHJ2d1EI',
    authDomain: 'movie-explorer-eac91.firebaseapp.com',
    projectId: 'movie-explorer-eac91',
    storageBucket: 'movie-explorer-eac91.appspot.com',
    messagingSenderId: '627702113269',
    appId: '1:627702113269:web:ef84e9ee3df31a6f99f6bc',
  },
};
