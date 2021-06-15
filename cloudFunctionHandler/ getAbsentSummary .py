import pandas as pd
from requests import session
import requests
import urllib3
import base64

def getData(request):
    headers = {
        'Access-Control-Allow-Origin': '*'
    }
    if request.args and 'sid' in request.args:
        urllib3.disable_warnings()
        URL = "https://erp.ncuindia.edu/Student/StudentAttendanceStatus.aspx"
        sid = request.args.get('sid')
        DEMODATA = '[{"courseCode":"CSL214","courseName":"DBMS","date":"2021-Jan-21","time":"1:30 PM To 2:20 PM","status":"Present"},{"courseCode":"CSL214","courseName":"DBMS","date":"2021-Jan-22","time":"10:30 AM To 11:20 AM","status":"Present"},{"courseCode":"CSL214","courseName":"DBMS","date":"2021-Jan-23","time":"10:30 AM To 11:20 AM","status":"Absent"},{"courseCode":"CSL214","courseName":"DBMS","date":"2021-Jan-25","time":"9:30 AM To 11:20 AM","status":"Absent"},{"courseCode":"CSS202","courseName":"Community Service","date":"2021-Jan-27","time":"9:30 AM To 10:20 AM","status":"Present"},{"courseCode":"CSL214","courseName":"DBMS","date":"2021-Jan-28","time":"1:30 PM To 2:20 PM","status":"Absent"},{"courseCode":"CSL214","courseName":"DBMS","date":"2021-Jan-30","time":"10:30 AM To 11:20 AM","status":"Absent"},{"courseCode":"CSL422","courseName":"Cyber Security","date":"2021-Jan-30","time":"12:30 PM To 1:20 PM","status":"Absent"},{"courseCode":"CSL214","courseName":"DBMS","date":"2021-Feb-01","time":"9:30 AM To 11:20 AM","status":"Absent"},{"courseCode":"ENL102","courseName":"Principle of Economics","date":"2021-Feb-01","time":"2:30 PM To 3:20 PM","status":"Present"},{"courseCode":"CSL422","courseName":"Cyber Security","date":"2021-Feb-02","time":"11:30 AM To 1:20 PM","status":"Present"},{"courseCode":"CSL227","courseName":"Applied Computational","date":"2021-Feb-02","time":"9:30 AM To 11:20 AM","status":"Present"},{"courseCode":"CSS202","courseName":"Community Service","date":"2021-Feb-03","time":"9:30 AM To 10:20 AM","status":"Absent"},{"courseCode":"ENL102","courseName":"Principle of Economics","date":"2021-Feb-03","time":"2:30 PM To 3:20 PM","status":"Present"},{"courseCode":"CSL422","courseName":"Cyber Security","date":"2021-Feb-03","time":"11:30 AM To 12:20 PM","status":"Present"},{"courseCode":"CSL227","courseName":"Applied Computational","date":"2021-Feb-03","time":"10:30 AM To 11:20 AM","status":"Present"},{"courseCode":"CSL227","courseName":"Applied Computational","date":"2021-Feb-04","time":"12:30 PM To 2:20 PM","status":"Absent"},{"courseCode":"CSL422","courseName":"Cyber Security","date":"2021-Feb-04","time":"11:30 AM To 12:20 PM","status":"Present"},{"courseCode":"CSL214","courseName":"DBMS","date":"2021-Feb-04","time":"1:30 PM To 2:20 PM","status":"Present"},{"courseCode":"CSL227","courseName":"Applied Computational","date":"2021-Feb-05","time":"11:30 AM To 12:20 PM","status":"Present"},{"courseCode":"CSL214","courseName":"DBMS","date":"2021-Feb-05","time":"10:30 AM To 11:20 AM","status":"Present"},{"courseCode":"SML300","courseName":"Entrepreneurship","date":"2021-Feb-05","time":"9:30 AM To 10:20 AM","status":"Present"},{"courseCode":"ENL102","courseName":"Principle of Economics","date":"2021-Feb-05","time":"2:30 PM To 3:20 PM","status":"Present"},{"courseCode":"CSL214","courseName":"DBMS","date":"2021-Feb-06","time":"10:30 AM To 11:20 AM","status":"Present"},{"courseCode":"SML300","courseName":"Entrepreneurship","date":"2021-Feb-06","time":"3:30 PM To 4:20 PM","status":"Absent"},{"courseCode":"CSL214","courseName":"DBMS","date":"2021-Feb-08","time":"9:30 AM To 11:20 AM","status":"Absent"},{"courseCode":"ENL102","courseName":"Principle of Economics","date":"2021-Feb-08","time":"2:30 PM To 3:20 PM","status":"Absent"},{"courseCode":"CSL422","courseName":"Cyber Security","date":"2021-Feb-09","time":"11:30 AM To 1:20 PM","status":"Present"},{"courseCode":"CSL227","courseName":"Applied Computational","date":"2021-Feb-09","time":"9:30 AM To 11:20 AM","status":"Absent"},{"courseCode":"ENL102","courseName":"Principle of Economics","date":"2021-Feb-10","time":"2:30 PM To 3:20 PM","status":"Absent"},{"courseCode":"CSL422","courseName":"Cyber Security","date":"2021-Feb-10","time":"11:30 AM To 12:20 PM","status":"Present"},{"courseCode":"CSS202","courseName":"Community Service","date":"2021-Feb-10","time":"9:30 AM To 10:20 AM","status":"Present"},{"courseCode":"CSL227","courseName":"Applied Computational","date":"2021-Feb-10","time":"10:30 AM To 11:20 AM","status":"Absent"},{"courseCode":"CSL214","courseName":"DBMS","date":"2021-Feb-11","time":"1:30 PM To 2:20 PM","status":"Present"},{"courseCode":"CSL422","courseName":"Cyber Security","date":"2021-Feb-11","time":"11:30 AM To 12:20 PM","status":"Present"},{"courseCode":"CSL227","courseName":"Applied Computational","date":"2021-Feb-11","time":"12:30 PM To 2:20 PM","status":"Present"},{"courseCode":"SML300","courseName":"Entrepreneurship","date":"2021-Feb-12","time":"9:30 AM To 10:20 AM","status":"Present"},{"courseCode":"ENL102","courseName":"Principle of Economics","date":"2021-Feb-12","time":"2:30 PM To 3:20 PM","status":"Present"},{"courseCode":"CSL227","courseName":"Applied Computational","date":"2021-Feb-12","time":"11:30 AM To 12:20 PM","status":"Present"},{"courseCode":"CSL214","courseName":"DBMS","date":"2021-Feb-12","time":"10:30 AM To 11:20 AM","status":"Present"},{"courseCode":"CSL214","courseName":"DBMS","date":"2021-Feb-13","time":"10:30 AM To 11:20 AM","status":"Present"},{"courseCode":"CSL422","courseName":"Cyber Security","date":"2021-Feb-13","time":"12:30 PM To 1:20 PM","status":"Present"},{"courseCode":"CSL214","courseName":"DBMS","date":"2021-Feb-15","time":"9:30 AM To 11:20 AM","status":"Present"},{"courseCode":"ENL102","courseName":"Principle of Economics","date":"2021-Feb-15","time":"2:30 PM To 3:20 PM","status":"Present"},{"courseCode":"CSL422","courseName":"Cyber Security","date":"2021-Feb-16","time":"11:30 AM To 1:20 PM","status":"Present"},{"courseCode":"CSL227","courseName":"Applied Computational","date":"2021-Feb-16","time":"9:30 AM To 11:20 AM","status":"Present"},{"courseCode":"CSL422","courseName":"Cyber Security","date":"2021-Feb-17","time":"11:30 AM To 12:20 PM","status":"Present"},{"courseCode":"CSS202","courseName":"Community Service","date":"2021-Feb-17","time":"9:30 AM To 10:20 AM","status":"Present"},{"courseCode":"CSL227","courseName":"Applied Computational","date":"2021-Feb-17","time":"10:30 AM To 11:20 AM","status":"Absent"},{"courseCode":"ENL102","courseName":"Principle of Economics","date":"2021-Feb-17","time":"2:30 PM To 3:20 PM","status":"Present"},{"courseCode":"CSL422","courseName":"Cyber Security","date":"2021-Feb-18","time":"1:30 PM To 2:20 PM","status":"Present"},{"courseCode":"CSL214","courseName":"DBMS","date":"2021-Feb-18","time":"10:30 AM To 11:20 AM","status":"Absent"},{"courseCode":"SML300","courseName":"Entrepreneurship","date":"2021-Feb-19","time":"9:30 AM To 10:20 AM","status":"Present"},{"courseCode":"CSL214","courseName":"DBMS","date":"2021-Feb-19","time":"10:30 AM To 11:20 AM","status":"Present"},{"courseCode":"ENL102","courseName":"Principle of Economics","date":"2021-Feb-19","time":"2:30 PM To 3:20 PM","status":"Present"},{"courseCode":"CSL214","courseName":"DBMS","date":"2021-Feb-20","time":"10:30 AM To 11:20 AM","status":"Absent"},{"courseCode":"CSL214","courseName":"DBMS","date":"2021-Feb-22","time":"9:30 AM To 11:20 AM","status":"Absent"},{"courseCode":"ENL102","courseName":"Principle of Economics","date":"2021-Feb-22","time":"2:30 PM To 3:20 PM","status":"Present"},{"courseCode":"CSL227","courseName":"Applied Computational","date":"2021-Feb-23","time":"9:30 AM To 11:20 AM","status":"Present"},{"courseCode":"ENL102","courseName":"Principle of Economics","date":"2021-Feb-24","time":"2:30 PM To 3:20 PM","status":"Present"},{"courseCode":"CSL227","courseName":"Applied Computational","date":"2021-Feb-24","time":"10:30 AM To 11:20 AM","status":"Present"},{"courseCode":"CSL422","courseName":"Cyber Security","date":"2021-Feb-24","time":"11:30 AM To 12:20 PM","status":"Present"},{"courseCode":"CSL422","courseName":"Cyber Security","date":"2021-Feb-25","time":"1:30 PM To 2:20 PM","status":"Present"},{"courseCode":"CSL214","courseName":"DBMS","date":"2021-Feb-25","time":"10:30 AM To 11:20 AM","status":"Absent"},{"courseCode":"CSL227","courseName":"Applied Computational","date":"2021-Feb-25","time":"12:30 PM To 2:20 PM","status":"Present"},{"courseCode":"CSL422","courseName":"Cyber Security","date":"2021-Feb-26","time":"12:30 PM To 1:20 PM","status":"Present"},{"courseCode":"ENL102","courseName":"Principle of Economics","date":"2021-Feb-26","time":"2:30 PM To 3:20 PM","status":"Present"},{"courseCode":"SML300","courseName":"Entrepreneurship","date":"2021-Feb-26","time":"9:30 AM To 10:20 AM","status":"Present"},{"courseCode":"CSL227","courseName":"Applied Computational","date":"2021-Feb-26","time":"11:30 AM To 12:20 PM","status":"Present"},{"courseCode":"CSL214","courseName":"DBMS","date":"2021-Feb-26","time":"10:30 AM To 11:20 AM","status":"Absent"},{"courseCode":"CSL214","courseName":"DBMS","date":"2021-Feb-27","time":"10:30 AM To 11:20 AM","status":"Absent"},{"courseCode":"CSL227","courseName":"Applied Computational","date":"2021-Feb-27","time":"11:30 AM To 12:20 PM","status":"Absent"},{"courseCode":"CSL214","courseName":"DBMS","date":"2021-Mar-01","time":"9:30 AM To 11:20 AM","status":"Present"},{"courseCode":"ENL102","courseName":"Principle of Economics","date":"2021-Mar-01","time":"2:30 PM To 3:20 PM","status":"Present"},{"courseCode":"CSL227","courseName":"Applied Computational","date":"2021-Mar-02","time":"9:30 AM To 11:20 AM","status":"Absent"},{"courseCode":"ENL102","courseName":"Principle of Economics","date":"2021-Mar-03","time":"2:30 PM To 3:20 PM","status":"Present"},{"courseCode":"CSL227","courseName":"Applied Computational","date":"2021-Mar-03","time":"10:30 AM To 11:20 AM","status":"Present"},{"courseCode":"CSL214","courseName":"DBMS","date":"2021-Mar-04","time":"10:30 AM To 11:20 AM","status":"Present"},{"courseCode":"ENL102","courseName":"Principle of Economics","date":"2021-Mar-05","time":"2:30 PM To 3:20 PM","status":"Present"},{"courseCode":"SML300","courseName":"Entrepreneurship","date":"2021-Mar-05","time":"9:30 AM To 10:20 AM","status":"Absent"},{"courseCode":"CSL214","courseName":"DBMS","date":"2021-Mar-05","time":"10:30 AM To 11:20 AM","status":"Present"},{"courseCode":"CSL214","courseName":"DBMS","date":"2021-Mar-06","time":"10:30 AM To 11:20 AM","status":"Present"},{"courseCode":"CSL227","courseName":"Applied Computational","date":"2021-Mar-08","time":"8:30 AM To 9:20 AM","status":"Present"},{"courseCode":"CSL214","courseName":"DBMS","date":"2021-Mar-08","time":"9:30 AM To 11:20 AM","status":"Present"},{"courseCode":"ENL102","courseName":"Principle of Economics","date":"2021-Mar-08","time":"2:30 PM To 3:20 PM","status":"Present"},{"courseCode":"ENL102","courseName":"Principle of Economics","date":"2021-Mar-10","time":"2:30 PM To 3:20 PM","status":"Present"},{"courseCode":"CSL214","courseName":"DBMS","date":"2021-Mar-10","time":"8:30 AM To 9:20 AM","status":"Absent"},{"courseCode":"CSL227","courseName":"Applied Computational","date":"2021-Mar-10","time":"10:30 AM To 11:20 AM","status":"Present"},{"courseCode":"CSL227","courseName":"Applied Computational","date":"2021-Mar-11","time":"12:30 PM To 2:20 PM","status":"Present"},{"courseCode":"CSL214","courseName":"DBMS","date":"2021-Mar-11","time":"10:30 AM To 11:20 AM","status":"Present"}]'
        if sid == 'demo':
            return (DEMODATA,200,headers)
        res = requests.get(url = URL,cookies = {'ASP.NET_SessionId': sid})
        data = res.text + "<table><tr><th>Firstname</th><th>Lastname</th><th>Age</th></tr><tr><td>Jill</td><td>Smith</td><td>50</td></tr><tr><td>Eve</td><td>Jackson</td><td>94</td></tr></table>"
        df_list = pd.read_html(data) 
        dflen = len(df_list)
        if dflen == 1 :
            return ("[]",200,headers)
        if dflen == 2 :
            df = df_list[0]
            df.columns = ['index', 'courseCode','courseName','date','time' , 'status']
            del df['index']
            df['date'] = pd.to_datetime(df['date'])
            df.index = df['date']
            df = df.sort_index()
            df['date'] = df['date'].dt.strftime('%Y-%b-%d')
            json_records = df.to_json(orient ='records') 
            return (json_records,200,headers)
    if request.args and 'auth' in request.args:
        urllib3.disable_warnings()
        authb64 = request.args.get('auth')
        auth = base64.b64decode(authb64)
        auth = auth.decode('UTF-8')
        authunp = auth.split(':')		
        authu = base64.b64decode(authunp[0])
        authu = authu.decode('UTF-8')
        authp = base64.b64decode(authunp[1])
        authp = authp.decode('UTF-8')
        payload = {
            "__VIEWSTATE":"",
            "__VIEWSTATEGENERATOR":"",
            "__VIEWSTATEENCRYPTED":"",
            "btnLogIn":"Login",
            "tbUserName":authu,
            "tbPassword":authp
        }
        sid = ""
        with session() as c:
            c.post('https://erp.ncuindia.edu/Welcome_iie.aspx', data=payload)
            sid = c.cookies['ASP.NET_SessionId']
        URL = "https://erp.ncuindia.edu/Student/StudentAttendanceStatus.aspx"
        res = requests.get(url = URL,cookies = {'ASP.NET_SessionId': sid })
        data = res.text + "<table><tr><th>Firstname</th><th>Lastname</th><th>Age</th></tr><tr><td>Jill</td><td>Smith</td><td>50</td></tr><tr><td>Eve</td><td>Jackson</td><td>94</td></tr></table>"
        df_list = pd.read_html(data) 
        dflen = len(df_list)
        if dflen == 1 :
            return ("[]",200,headers)
        if dflen == 2 :
            df = df_list[0]
            df.columns = ['index', 'courseCode','courseName','date','time' , 'status']
            del df['index']
            df['date'] = pd.to_datetime(df['date'])
            df.index = df['date']
            df = df.sort_index()
            df['date'] = df['date'].dt.strftime('%Y-%b-%d')
            
            json_records = df.to_json(orient ='records') 
            return (json_records,200,headers)
    else:
        return ("[]",200,headers)