export const makeAssetURL = url => {
  if (!url || url.includes('http')) {
    return url;
  } else {
    return `${process.env.REACT_APP_ASSET_SERVER}/${url}`;
  }
};
