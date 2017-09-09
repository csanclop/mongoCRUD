var MongoClient = require('mongodb').MongoClient;
 
var myCollection;
var db;
 
function removeDocument(onRemove){
    myCollection.findAndModify({name: "hola"}, [], {remove:true}, function(err, object) {
        if(err)
            throw err;
        console.log("document deleted");
        onRemove();
    });
}
 
function findDocument(onFinded){
    var cursor = myCollection.find({"name" : "hola", "company.officialName" : "company SL" });
    cursor.each(function(err, doc) {
        if(err)
            throw err;
        if(doc==null)
            return;
 
        console.log("document find:");
        console.log(doc.name);
        console.log(doc.company.employed);
        onFinded();
    });
}
 
function fieldComplexeUpdateDocument(onUpdate){
    myCollection.update({name: "hola"}, {$set: {company: {employed: 11, officialName: "company SL", industries: ["it consulting", "passionate programming"]}}}, {w:1}, function(err) {
        if(err)
            throw err;
        console.log('entry updated');
        onUpdate();
    });
}
 
function fieldUpdateDocument(onUpdate){
    myCollection.update({name: "hola"}, {$set: {industry: "France"}}, {w:1}, function(err) {
        if(err)
            throw err;
        console.log('entry updated');
        onUpdate();
    });
}
 
function simpleUpdateDocument(onUpdate){
    myCollection.update({name: "hola"}, {name: "hola", description: "prototype your idea"}, {w:1}, function(err) {
    if(err)
        throw err;
        console.log('entry updated');
        onUpdate();
    });
}
 
function addDocument(onAdded){
    myCollection.insert({name: "hola", description: "learn more than everyone"}, function(err, result) {
        if(err)
            throw err;
 
        console.log("entry saved");
        onAdded();
    });
}
 
function createConnection(onCreate){
 
    MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
        if(err)
            throw err;
        console.log("connected to mongoDB !");
        myCollection = db.collection('test_collection');
 
        onCreate();
    });
}
 
createConnection(function(){
    addDocument(function(){
        simpleUpdateDocument(function(){
            fieldUpdateDocument(function(){
                fieldComplexeUpdateDocument(function(){
                    findDocument(function(){
                        removeDocument(function(){
                            console.log("End");
                        });
                    });
                });
            });
        });
    });
});