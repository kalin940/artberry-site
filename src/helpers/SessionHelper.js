const getSession = () => {
    return localStorage.getItem("session");
}

const setSession = (data) => {
    localStorage.setItem("session", data);
}

const clearSession = () => {
    localStorage.removeItem("session");
}

const SessionHelper = {
    getSession, 
    setSession, 
    clearSession
}


export default SessionHelper;
