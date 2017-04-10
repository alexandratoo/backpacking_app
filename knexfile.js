'use strict';

module.exports = {
 development: {
   client: 'pg',
   connection: 'postgres://localhost/backpackingDB'
 },
 test: {
   client: 'pg',
   connection: 'postgres://localhost/backpackingDB_test',
    debug:false
 }
}
