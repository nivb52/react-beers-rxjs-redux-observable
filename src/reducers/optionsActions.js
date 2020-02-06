// :::::::::::::::::::::::::::::::::::
// TYPES :
export const SET_CONFIG = "SET_CONFIG";
export const OPTIONS = "OPTIONS";
export const OPTIONS_CACHE_KEY = "params";

// AJAX & STRING OPTIONS:
export const OPT = {};
OPT.perPage = "&per_page=";
OPT.page = "&page=";
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
