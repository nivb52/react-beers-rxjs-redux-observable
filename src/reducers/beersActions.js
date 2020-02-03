export const FECTH_FULFILLED = 'FETCH_FULIFILLED'
export const FECTH_DATA = 'FECTH_DATA'
export const SET_STATUS = 'SET_STATUS'

// action creator : 
export function fetchFulfilled(beers) {
    return {
        type: FECTH_FULFILLED,
        payload: beers
    }
}
export function fetchData() {
    return {
        type: FECTH_DATA
    }
}


export function setStatus(status) {
    return {
        type : SET_STATUS,
        payload: status
    }
}