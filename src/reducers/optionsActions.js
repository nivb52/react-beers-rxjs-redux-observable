// TYPES :
export const SET_CONFIG = "SET_CONFIG";

// THE OPTIONS : 
export const OPTIONS = 'OPTIONS';
export const OPT = {};
OPT.perPage = "perPage";
OPT.firstBrewed = "firstBrewed";

// :::::::::::::::::::::::::::::::::::
// action creator :

export function saveConfig(key, value = null) {
    return {
      type: SET_CONFIG,
      payload: [key,value]
    };
  }
 
  