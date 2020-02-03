export const FECTH_FULFILLED = 'FETCH_FULIFILLED'


// action creator : 
export function fetchFulfilled(beers) {
    return {
        type: FECTH_FULFILLED,
        payload: beers
    }
}
