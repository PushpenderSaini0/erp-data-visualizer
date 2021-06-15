export const getERPData = (mode) => {
    if (mode === "SID") {
        const sid = document.getElementById("sid").value;
        const url = 'https://asia-south1-edvapi-1a78a.cloudfunctions.net/getAbsentSummary?sid=';
        return fetch(url + sid).then(r => r.json());
    }
    const uname = document.getElementById("uname").value;
    const passwd = document.getElementById("passwd").value;
    const auth = btoa(btoa(uname) + ":" + (btoa(passwd)));
    const url = 'https://asia-south1-edvapi-1a78a.cloudfunctions.net/getAbsentSummary?auth=';
    return fetch(url + auth).then(r => r.json());
}