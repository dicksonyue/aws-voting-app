var redis = require('redis');
var redisconfig = {
	port:process.env.REDIS_PORT,
	host:process.env.REDIS_HOST
}
console.log(process.env.REDIS_PORT)
console.log(process.env.REDIS_HOST)

var rc = redis.createClient(redisconfig.port, redisconfig.host);

rc.on('connect', function() {
    console.log('connected');
		rc.incr( 'nextid' , function( err, id ) {
				console.log(id);
    } );
});
