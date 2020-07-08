const express=require('express');
const path=require('path');
const port=8000;
const db=require('./config/mongoose');
const Contact=require('./models/contact')
const app=express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));
// app.use(function(req,res,next){
//     console.log("mw1");
//     next();
// });


// var contactList=[
//     {
//         name:"rahul",
//         phoneNo:"876756"
//     },
//     {
//         name:"shyam",
//         phoneNo:"8676ee"
//     },
//     {
//         name:"ram",
//         phoneNo:"68967563"
//     }
// ];

app.get('/',function(req,res){
    // return res.render('home',{
    //     title:"cList",
    //     contact_list:contactList
    // });

    //fetch data from db
    Contact.find({},function(err,contacts){
        if(err){
            contact.log('error occur while fetching data');
            return;
        }
        return res.render('home',{
            title:"contact-list",
            contact_list:contacts
        });
    });
});
app.get('/practice',function(req,res){
    return res.render('practice',{title:"ejs is fun"});
});
app.post('/add-contact',function(req,res){
    // contactList.push(req.body);
    // return res.redirect('back');

    //populating the DB
    Contact.create({
        name:req.body.name,
        phoneNo:req.body.phoneNo
    },function(err,newContact){
        if(err){
            console.log('error in creating the contact',err);
            return;
        }
        console.log('succefully create newConact',newContact);
        return res.redirect('back');
    });
});
app.get('/delete-contact/',function(req,res){
    //console.log("delete contact",req.params);
   // let phone=req.params.phone;
   // let index=contactList.findIndex(contact => contact.phoneNo==phone);
    // if(index != -1){
    //     contactList.splice(index,1);
    // }
    // return res.redirect('back');

    //find and delete data from db by id
    let id=req.query.id;
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error while deleting contact');
            return;
        }
        console.log('succefully deleted contact');
        return res.redirect('back');
    });
});
app.listen(port,function(err){
    if(err){
        console.log('erorr ocurred');
    }
    console.log('server running on port:',port);
});