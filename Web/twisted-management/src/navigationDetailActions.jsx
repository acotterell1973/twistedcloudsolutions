import C from "./constants";

export const setNavigationPath = (pathname, canNavigate, referrer) => ({
    type: C.UPDATE_NAVIGATION_PATHNAME,
    canNavigate,
    pathname,
    referrer
  });
  
  export const setNavigationPathAndQuery = (pathname, search, canNavigate, referrer) => ({
    type: C.UPDATE_NAVIGATION_PATHNAME_AND_SEARCH,
    canNavigate,
    pathname,
    search,
    referrer
  });