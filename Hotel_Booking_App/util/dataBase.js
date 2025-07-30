const mysql=require('mysql2');
const pool =mysql.createPool({
  host:'localhost',
  user:'root',
  password:'Tirtha@2004',
  database:'airbnb'

})
module.exports=pool.promise()