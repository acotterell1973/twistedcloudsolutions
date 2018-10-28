import C from "./constants";

export const navigationDetail = (state = {}, action) => {
    switch (action.type) {
        case C.UPDATE_NAVIGATION_PATHNAME:
            return {
                ...state,
                canNavigate: action.canNavigate,
                pathname: action.pathname,
                search: null,
                referrer: action.referrer
            }
            
            case C.UPDATE_NAVIGATION_PATHNAME_AND_SEARCH:
            return {
                ...state,
                canNavigate: action.canNavigate,
                pathname: action.pathname,
                search: action.search,
                referrer: action.referrer
            }
        default:
            return state
    }
}

