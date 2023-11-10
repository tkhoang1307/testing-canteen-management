const  Pool  = require('pg').Pool;
const pool = new Pool({
  user: 'jvpaazmn',
  host: 'rosie.db.elephantsql.com',
  database: 'jvpaazmn',
  password: 'VFAyfQX1fWnKY9wb3KrgjaxGiFs9Kvua',
  port: 5432,
})
module.exports =pool


// var pg = require('pg');

// var conString = "postgres://jvpaazmn:VFAyfQX1fWnKY9wb3KrgjaxGiFs9Kvua@rosie.db.elephantsql.com/jvpaazmn";//bkzignwxxysloi:d9f8f59f0177f70013be77b74fbb15db49287193c75e6be70358cf36dffe51cf@ec2-52-205-98-159.compute-1.amazonaws.com:5432/dd8e4ihb5t3jsh" //Can be found in the Details page
// var client = new pg.Client(conString);

// async function connect()
// {
//     client.connect(function(err) {
//         if(err) {
//           return console.error('could not connect to postgres', err);
//         }
//         else{
//             console.log('Successfully')
//         }
//       });
// }

