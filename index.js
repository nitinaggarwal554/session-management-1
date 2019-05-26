var express=require('express');
var sessions=require('express-session');
var bodyParser=require('body-parser');

var app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(sessions({
    secret:'A3#$%12Ta',
    saveUninitialized:true,
    resave:false
}));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/views/index.html')
});


var sess;

app.post('/login',function(req,res){
    sess=req.session;//here session means browser session and with the help of req it will transfer to sess
    if(req.body.username=='admin1' && req.body.password=='admin1'){
        sess.userDetail=req.body.username;//userdetail is also from browser side
    }
    res.redirect('/redirects');
})


app.get('/redirects',function(req,res){
    sess=req.session;
    if(sess.userDetail){
    res.redirect('/admin')
}
else{
    res.write('<h1>Please enter your correct details</h1>')
    res.end('<a href=' + '/' + '>Login</a>');
}
}) 

app.get('/admin',function(req,res){
    sess=req.session;
    if(sess.userDetail){
        res.write('<h1>Hello '+ sess.userDetail + '</h1></br>');
        res.end('<a href=' + '/logout' + '>Logout</a>')
    }
    else{
        res.write('<h1>Please login first</h1>')
        res.end('<a href=' + '/' + '>Login</a>')
    }
}) 

app.get('/logout',function(req,res){
    req.session.destroy(function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect('/');
        }
    })
})
   


app.listen(5000,function(){
    console.log('this server is running at port 5000!!')
})
