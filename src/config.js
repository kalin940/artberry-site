export const artberryApiDomain = 'https://artberryfunctions.azurewebsites.net/api/';//process.env.NODE_ENV === 'production' ? 'https://tefterapi.2parts.tech/' : 'https://localhost:44398/';


//Session endpoints
export const getSessionUrl = 'get-session';
export const checkSessionUrl = 'check-session';
export const checkAdminSessionUrl = 'check-adminsession';
export const logoutUrl = 'logout';

//Subscription endpoints
export const getSubscriptionsUrl = 'get-subscriptions';

//Admin endpoints
export const registerUrl = 'register';
export const editUserUrl = 'edit-user';
export const getUsersUrl = 'get-users'
export const getUserUrl = 'get-user/';

//User endpoints
export const getUserInfoUrl = 'user-info/';
export const changeEmailUrl = 'change-email';
export const changePasswordUrl = 'change-password';
export const resetPasswordUrl = 'reset-password';
