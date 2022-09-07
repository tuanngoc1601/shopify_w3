const Router = require('koa-router');

// Prefix all routes with: /books
const router = new Router({
	prefix: '/logs'
});

let logs = [
    { device_id: "101", name: "TV", action: "Turn on", date: "124689" },
    { device_id: "102", name: "Washer", action: "Sleep", date: "124533" },
    { device_id: "103", name: "Selling Fan", action: "Turn Off", date: "124518" },
    { device_id: "104", name: "TV", action: "Turn on", date: "124689" },
    { device_id: "105", name: "Washer", action: "Sleep", date: "124533" },
    { device_id: "106", name: "Selling Fan", action: "Turn Off", date: "124518" },
    { device_id: "107", name: "TV", action: "Turn on", date: "124689" },
    { device_id: "108", name: "Washer", action: "Sleep", date: "124533" },
    { device_id: "109", name: "Selling Fan", action: "Turn Off", date: "124518" },
    { device_id: "110", name: "TV", action: "Turn on", date: "124689" },
    { device_id: "111", name: "Washer", action: "Sleep", date: "124533" },
    { device_id: "112", name: "Selling Fan", action: "Turn Off", date: "124518" },
    { device_id: "113", name: "SmartPhone", action: "Sleep", date: "134987" },
    { device_id: "114", name: "Computer", action: "Turn on", date: "124603" },
    { device_id: "115", name: "Cooker", action: "Turn Off", date: "124518" },
    { device_id: "116", name: "SmartPhone", action: "Sleep", date: "134987" },
    { device_id: "117", name: "Computer", action: "Turn on", date: "124603" },
    { device_id: "118", name: "Cooker", action: "Turn Off", date: "124518" },
    { device_id: "119", name: "SmartPhone", action: "Sleep", date: "134987" },
    { device_id: "120", name: "Computer", action: "Turn on", date: "124603" },
    { device_id: "121", name: "Cooker", action: "Turn Off", date: "124518" },
    { device_id: "122", name: "SmartPhone", action: "Sleep", date: "134987" },
    { device_id: "123", name: "Computer", action: "Turn on", date: "124603" },
    { device_id: "124", name: "Cooker", action: "Turn Off", date: "124518" },
    { device_id: "125", name: "Ipad", action: "Turn Off", date: "145872" },
    { device_id: "126", name: "Caculator", action: "Turn on", date: "145920" },
    { device_id: "127", name: "Light", action: "Sleep", date: "145392" },
    { device_id: "128", name: "Ipad", action: "Turn Off", date: "145872" },
    { device_id: "129", name: "Caculator", action: "Turn on", date: "145920" },
    { device_id: "130", name: "Light", action: "Sleep", date: "145392" },
    { device_id: "131", name: "Ipad", action: "Turn Off", date: "145872" },
    { device_id: "132", name: "Caculator", action: "Turn on", date: "145920" },
    { device_id: "133", name: "Light", action: "Sleep", date: "145392" },
    { device_id: "134", name: "Ipad", action: "Turn Off", date: "145872" },
    { device_id: "135", name: "Caculator", action: "Turn on", date: "145920" },
    { device_id: "136", name: "Light", action: "Sleep", date: "145392" }
];

router.get('/', (ctx, next) => {
	ctx.body = logs;
	next();
});

router.get('/page/:id', (ctx, next) => {
    let getCurrentLogs;
	if(ctx.params.id === '1') {
        getCurrentLogs = logs.filter(function(log) {
            return (parseInt(log.device_id) <= 112)
        })
    } else if(ctx.params.id === '2') {
        getCurrentLogs = logs.filter(function(log) {
            return (parseInt(log.device_id) > 112 && parseInt(log.device_id) <= 124)
        })
    } else if(ctx.params.id === '3'){
        getCurrentLogs = logs.filter(function(log) {
            return (parseInt(log.device_id) > 124 )
        })
    }

    if(getCurrentLogs.length) {
        ctx.body = getCurrentLogs;
    } else {
        ctx.response.status = 404;
        ctx.body = 'Logs not found';
    }
    next();
});

module.exports = router;