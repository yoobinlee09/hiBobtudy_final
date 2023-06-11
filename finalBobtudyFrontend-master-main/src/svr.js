
const exp = require('constants')
const express=require('express')
const mysql=require('mysql')
const path=require('path')
const static=require('serve-static')
const dbconfig=require('./config/dbconfig.json')
//db connection pool
const pool=mysql.createPool({
    connectionLimit:10,
    host:dbconfig.host,
    user: dbconfig.user,
    password:dbconfig.password,
    database:dbconfig.database,
    debug:false
})
const app=express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/',static(path.join(__dirname)))

app.post('process/login',(req,res)=> {
    console.log('/process/login 호출됨'+req)
    const paramId=req.body.id;
    const paramPassword=req.body.password;
    console.log('로그인 요청'+paramId+' '+paramPassword);
    pool.getConnection((err,conn)=>{
        if(err){
            conn.release();
            console.log('mysql getconnection error.absorted');
            res.writeHead('200',{'Content-type':'text/html; charset=utf8'})
            res.write('<h2>db서버 연결 실패<h2>')
            res.end();
            return;
        }
        const exec=conn.query('select id, name from users where id =? and pw=password(?)',
        [paramId,paramPassword],
        (err,rows)=>{
            conn.release();
            console.log('실행된 sql query: '+exec.sql);
            if(err){
                console.dir(err);
                res.writeHead('200',{'Content-type':'text/html; charset=utf8'})
                res.write('<h2>sql실행실패<h2>')
                res.end();
                return;

            }
            if(rows.length>0){
                console.log('아이디[%s],패스워드일치된 사용자[%s]찾았다',paramId,rows[0].id);
                res.writeHead('200',{'Content-type':'text/html; charset=utf8'})
                res.write('<h2>로그인 성공<h2>')
                res.end();
                return;
            }
            else{
                console.log('아이디[%s],패스워드일치안됨',paramId);
                res.writeHead('200',{'Content-type':'text/html; charset=utf8'})
                res.write('<h2>로그인 실패<h2>')
                res.end();
                return;
            }
            
        }
        )

    })
})


app.post('/process/adduser',(req,res)=>{
    console.log('/process/adduser 호출됨'+req)
    const paramId=req.body.id;
    const paramName=req.body.name;
    const paramPassword=req.body.pw;
    const paramEmail=req.body.email;
    pool.getConnection((err, conn)=>{
        if(err){
            conn.release();
            console.log('mysql getconnection error.absorted');
            res.writeHead('200',{'Content-type':'text/html; charset=utf8'})
            res.write('<h2>db서버 연결 실패<h2>')
            res.end();
            return;
        }
        console.log('db connectied');
        const exec=conn.query('insert into users(id,password,email values(?,password(?),?);',
        [paramId,paramPassword,paramEmail],
        (err,result)=>{
            conn.release();
            console.log('실행된 sql: '+exec.sql)
            if(err){
                console.log('sql실행시오류발생')
                console.dir(err);
                res.writeHead('200',{'Content-type':'text/html; charset=utf8'})
                res.write('<h2>sql실행실패<h2>')
                res.end();
                return
            }
            if(result){
                console.dir(result)
                console.log('inserted성공')
                res.writeHead('200',{'Content-type':'text/html; charset=utf8'})
                res.write('<h2>회원가입 성공<h2>')
                res.end();
            }
            else{
                console.log('inserted실패')
                res.writeHead('200',{'Content-type':'text/html; charset=utf8'})
                res.write('<h2>회원가입 실패<h2>')
                res.end();
            }
        }
        
        )
    })
});
app.listen(3000,()=>{
    console.log('Listening on port:3000');
})