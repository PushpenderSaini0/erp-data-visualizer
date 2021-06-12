export const getERPData = (mode) => {
    if (mode === "SID") {
        const sid = document.getElementById("sid").value;
        const url = 'https://notes.pushpendersaini.com/tools/erpdvapi/getAbsentSummaryData.php?sid=';
        return fetch(url + sid).then(r => r.json());
    }
    const uname = document.getElementById("uname").value;
    const passwd = document.getElementById("passwd").value;
    const auth = btoa(btoa(uname) + ":" + (btoa(passwd)));
    const url = 'https://notes.pushpendersaini.com/tools/erpdvapi/getAbsentSummaryData.php?auth=';
    return fetch(url + auth).then(r => r.json());
}