var redis = require('ioredis');
var redisconfig = {
	port:process.env.REDIS_PORT,
	host:process.env.REDIS_HOST
}
console.log(process.env.REDIS_PORT)
console.log(process.env.REDIS_HOST)

var rc = new redis.Cluster({port:redisconfig.port, host:redisconfig.host});

rc.incr( 'nextid' , function( err, id ) {
	  console.log(err);
		console.log(id);
} );
rc.get('nextid').then(function (result) {
  console.log(result);
});
