// :::::::::::::::::::::::::::::::::::
// TYPES :
export const SET_CONFIG = "SET_CONFIG";
export const OPTIONS = "OPTIONS";
export const OPTIONS_CACHE_KEY = "params";

export const OPT = {};
// AJAX STRING OPTIONS:
OPT.perPage = "&per_page=";
OPT.firstBrewed = "firstBrewed";
//
// :::::::::::::::::::::::::::::::::::
// action creator :

export function saveConfig(key, value = null) {
  const opts = OPT[key] + value;
  return {
    type: SET_CONFIG,
    payload: [key,opts]
  };
}
