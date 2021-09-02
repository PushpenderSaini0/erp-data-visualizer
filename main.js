(()=>{"use strict";const t=document.getElementById("error-alert-box"),e=[e=>{t.innerHTML=`<div class='alert alert-danger' role='alert'>${e}</div>`},()=>{t.innerHTML=""}],n=t=>{if("SID"===t){const t=document.getElementById("sid").value;return fetch("https://asia-south1-edvapi-1a78a.cloudfunctions.net/getAbsentSummary?sid="+t).then((t=>t.json()))}const e=document.getElementById("uname").value,n=document.getElementById("passwd").value,a=btoa(btoa(e)+":"+btoa(n));return fetch("https://asia-south1-edvapi-1a78a.cloudfunctions.net/getAbsentSummary?auth="+a).then((t=>t.json()))};function a(t){const e=new Set;return t.forEach((t=>e.add(t.courseName))),[...e]}function o(t,e){const n=[],a=[];let o=0;const r=e;let s=0,d=0,l=0,c=0;t.forEach((t=>{0==e.localeCompare(t.courseName)&&(s++,n.push(t.date),0=="Present".localeCompare(t.status)&&(d++,a.push(++o)),0=="Absent".localeCompare(t.status)&&(l++,a.push(o)),0=="Leave of Absence".localeCompare(t.status)&&(c++,a.push(o)))}));const i=function(t,e,n,a){return(t/a*100).toFixed(2)}(d,0,0,s);return{courseName:r,totalClasses:s,present:d,absent:l,leaveOfAbsence:c,percentage:i,dates:n,classAttended:a}}function r(t){let e=[];for(let n=0;n<t.length;n++)t[n]>=70?e.push("hsla(140, 50%, 60%, 1)"):e.push("hsla(0, 50%, 60%, 1)");return e}let s=Chart.controllers.horizontalBar.prototype.draw;function d(t,e){const[n]=t;!function(t){const e=document.getElementById("summary-table-area"),n=t,a=t.percentage;let o=0,r=a,s="",d="";if(a>=70){for(s="can miss",d="success";r>70;)o+=1,r=(n.present/(n.totalClasses+o)*100).toFixed(2);70!=a&&(o-=1)}else for(s="need to attend",d="danger";r<=70;)o+=1,r=((n.present+o)/(n.totalClasses+o)*100).toFixed(2);e.innerHTML=`\n    <h3 class='d-flex justify-content-center'>${t.courseName}</h3>\n    <br>\n    <table class='table table-bordered'>\n        <caption>${t.courseName}</caption>\n        <tbody>\n            <tr>\n                <th scope='row'>Your Attandance :</th>\n                <td>\n                    <div class='alert-${d}'> \n                        ${a}% \n                    </div>        \n                </td>\n            </tr>\n            <tr>\n                <th scope='row'>\n                    Classes you <span class='alert-${d}'>${s}</span> to maintain 70%\n                </th>\n                <td>${o}</td>\n            </tr>\n        </tbody>\n    </table>\n    <br>\n    <table class='table table-bordered'>\n        <tbody>\n            <tr>\n                <th scope='row'>Total Classes</th>\n                <td> ${t.totalClasses} </td>\n            </tr>\n            <tr>\n                <th scope='row'>Total marked Present</th>\n                <td> ${t.present} </td>\n            </tr>\n            <tr>\n                <th scope='row'>Total marked Absent</th>\n                <td> ${t.absent} </td>\n            </tr>\n            <tr>\n                <th scope='row'>Total marked Leave Of Absence</th>\n                <td> ${t.leaveOfAbsence} </td>\n            </tr>\n        </tbody>\n    </table>`}(o(n,e.target.id)),function(t){document.getElementById("chart-area").innerHTML="";const e=document.createElement("CANVAS");document.getElementById("chart-area").appendChild(e);let n=e.getContext("2d");const a=t.dates,o=Array.from({length:t.dates.length},((t,e)=>e+1)),r=t.classAttended,s=(.7*a.length).toFixed(2),d=[];for(let t=0;t<a.length;t++)d.push(s);new Chart(n,{type:"bar",data:{labels:a,datasets:[{type:"line",label:"# Present",fill:!1,borderWidth:2,borderColor:"#118AB2",pointBorderColor:"#118AB2",pointBackgroundColor:"#fff",pointBorderWidth:1,pointRadius:4,pointHitRadius:4,pointHoverRadius:4,pointHoverBorderWidth:2,pointHoverBackgroundColor:"rgba(75,192,192,1)",pointHoverBorderColor:"rgba(0,153,153,1)",data:r},{type:"line",label:"# 70% Mark",data:d,fill:!1,borderColor:"#F71735",borderDash:[5,5],pointRadius:0,borderWidth:2},{type:"bar",label:"# Total Classes",backgroundColor:"rgb(0,255,0)",data:o,backgroundColor:"#9EE493",borderColor:"#6CD65C",borderWidth:2}]},options:{responsive:!0,title:{display:!0,text:"Total classes vs present"},hover:{mode:"nearest",intersect:!0},tooltips:{mode:"index",intersect:!1},scales:{yAxes:[{ticks:{beginAtZero:!0}}]}}})}(o(n,e.target.id)),(t=>{const e=document.getElementById("absent-summary-table-area");let n="";t.reverse().forEach(((t,e)=>{n+=`<tr>\n            <td> ${e+1} </td>\n            <td> ${t.date} </td>\n            <td> ${t.time} </td>\n        </tr>`})),e.innerHTML=`\n    <br>\n    <h2>Classes you were marked absent</h2>\n    <table class='table table-bordered'>\n        <tbody>\n            <tr>\n                <th scope='col'>S.No</th>\n                <th scope='col'>Date</th>\n                <th scope='col'>Time</th>\n            </tr>\n            ${n||"<tr> <td> No Data Found </td> </tr>"}\n        </tbody>\n    </table>`})(function(t,e){const n=[];return t.forEach((t=>{0==e.localeCompare(t.courseName)&&0=="Absent".localeCompare(t.status)&&n.push({date:t.date,time:t.time})})),n}(n,e.target.id)),(t=>{const e=document.getElementById("loa-summary-table-area");let n="";t.forEach(((t,e)=>{n+=`<tr>\n            <td> ${e+1} </td>\n            <td> ${t.date} </td>\n            <td> ${t.time} </td>\n        </tr>`})),e.innerHTML=`\n    <br>\n    <h2>Classes you got leave of absence</h2>\n    <table class='table table-bordered'>\n        <tbody>\n            <tr>\n                <th scope='col'>S.No</th>\n                <th scope='col'>Date</th>\n                <th scope='col'>Time</th>\n            </tr>\n            ${n||"<tr> <td> No Data Found </td> </tr>"}\n        </tbody>\n    </table>`})(function(t,e){const n=[];return t.forEach((t=>{0==e.localeCompare(t.courseName)&&0=="Leave of Absence".localeCompare(t.status)&&n.push({date:t.date,time:t.time})})),n}(n,e.target.id))}Chart.helpers.extend(Chart.controllers.horizontalBar.prototype,{draw:function(){s.apply(this,arguments);let t=this.chart,e=t.chart.ctx,n=t.config.options.lineAtIndex;if(n){let a=t.scales["x-axis-0"],o=t.scales["y-axis-0"],r=a.getPixelForValue(n),s=o.top,d=a.getPixelForValue(n),l=o.bottom;e.save(),e.beginPath(),e.moveTo(r,s),e.strokeStyle="red",e.lineTo(d,l),e.stroke(),e.restore()}}});const l=[t=>{document.querySelectorAll(".btn-primary").forEach((e=>{e.innerHTML="<div class='spinner-border'></div>",e.disabled=t}))},(t,e)=>{document.querySelectorAll(".btn-primary").forEach((n=>{n.innerHTML=e,n.disabled=t}))}],[c,i]=e,[u,h]=l,b=t=>{let e;u(!0),"get-data-btn-sid"===t.target.id&&(e=n("SID")),"get-data-btn-upd"===t.target.id&&(e=n("UPD")),e.then((t=>{if(t.length<1)throw"Could not fetch data";document.getElementById("summary-table-area").innerHTML='\n            <div class="alert alert-success" role="alert">\n                <h4 class="alert-heading">Data Loaded Successfully</h4>\n                <hr>\n                <p>You can now click on each subject to get more\n                    details about it !</p>\n            </div>\n            ',h(!0,"Data Loaded"),i(),function(t){document.getElementById("chart-area").style.margin="0px 0px 30px 0px",document.getElementById("chart-area").innerHTML="";const e=document.createElement("CANVAS");document.getElementById("chart-area").appendChild(e);let n=e.getContext("2d");const s=a(t);let d=[];s.forEach((e=>{d.push(o(t,e).percentage)})),t={datasets:[{type:"horizontalBar",data:d,label:"Subject Attendance",backgroundColor:r(d)}],labels:s},new Chart(n,{type:"horizontalBar",data:t,options:{lineAtIndex:70,responsive:!0,title:{display:!0,text:"Quick Overview"},scales:{xAxes:[{ticks:{beginAtZero:!0,max:100}}]}}})}(t),a(t).forEach((e=>{(function(t){const e=document.createElement("BUTTON");return e.setAttribute("class","btn btn-secondary"),e.setAttribute("id",t),e.innerHTML=t,document.getElementById("cources-btn-group").appendChild(e),e})(e).addEventListener("click",d.bind(void 0,[t]))}))})).catch((t=>{h(!1,"Get Data"),c(t)}))};document.getElementById("get-data-btn-sid").addEventListener("click",b),document.getElementById("get-data-btn-upd").addEventListener("click",b)})();