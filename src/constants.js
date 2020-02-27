export default {
  DOES_NOT_EXIST: -1,

  MODE: Object.freeze({
    API: 'API',
    DEMO: 'DEMO',
    EMBEDDED: 'EMBEDDED',
    STANDALONE: 'STANDALONE'
  }),

  ANON_HEADERS: {
    Accept: 'application/json, application/xml, text/plain, text/html, *.*',
    'Content-Type': 'application/json; charset=utf-8'
  },

  PLAYER: Object.freeze({
    PRIMARY: 0,
    SECONDARY: 1
  }),

  FADE: Object.freeze({
    UP: 1,
    DOWN: 0
  }),

  UPLOAD_TYPE: Object.freeze({
    USERPIC: 'USER',
    MEDIA: 'MEDIA',
    MEDIA_PREVIEW: 'MEDIA_PREVIEW'
  }),

  TRANSITION: Object.freeze({
    CUT: 1,
    DEVAMP: 3,
    FADE: 2,
    NONE: 0
  }),

  ROLE: Object.freeze({
    ANONYMOUS: 'webanon',
    USER: 'webuser',
    SUPERUSER: 'websuper'
  }),

  TRIGGER: Object.freeze({
    LOCATION: 3,
    PROXIMITY: 2,
    DEFAULT: 1
  }),

  FORMFIELD: Object.freeze({
    BOUNDS: 'bounds',
    CHECKBOX: 'checkbox',
    COLOR: 'color',
    COORDINATE: 'coordinate',
    DATE: 'date',
    HIDDEN: 'hidden',
    IMAGE: 'image',
    MEDIA: 'media',
    PASSWORD: 'password',
    SELECT: 'select',
    SELECTION: 'selection',
    SLIDER: 'slider',
    TAGLIST: 'taglist',
    TEXT: 'text',
    TEXTAREA: 'textarea'
  }),

  REPRESENTATION: Object.freeze({
    PIN: 1,
    CIRCLE: 2,
    IMAGE_CUSTOM: 3,
    IMAGE_PREVIEW: 4,
    GEOFENCE: 5
  }),

  PLATFORM: Object.freeze({
    DESKTOP: 0,
    ANDROID: 1,
    IOS: 2
  })
};
