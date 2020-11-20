const mySql = require('mysql')

const config = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DATABASE,
  multipleStatements: true
}

const mySqlConnection = mySql.createConnection(config)

mySqlConnection.connect((err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('MySql connected')
  }
});

module.exports = mySqlConnection