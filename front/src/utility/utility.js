

class Utility {
    constructor() {
    }

    setCookie(name, value, day) {
        const date = new Date();
        date.setTime(date.getTime() + day * 60 * 60 * 24 * 1000);

        document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
    }

    deleteCookie(name) {
        const date = new Date();
        document.cookie = name + "= " + "; expires=" + date.toUTCString() + "; path=/";
    }

    getCookie(name) {
        const cookie = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return cookie? cookie[2] : null; 
    }
}
const utility = new Utility();
export default utility;

