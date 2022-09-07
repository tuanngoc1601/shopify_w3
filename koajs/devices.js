const Router = require('koa-router');

// Prefix all routes with: /devices
const router = new Router({
	prefix: '/devices'
});

let devices = [
	{ Device: "TV", MAC_Address: "00:1B:44:11:3A:B7", IP: "127.0.0.2", Create_Date: "2021-05-31", Power_Consumption: "50"},
    { Device: "Washer", MAC_Address: "00:1B:44:11:3A:B8", IP: "127.0.0.3",Create_Date: "2021-05-31", Power_Consumption: "60"},
    { Device: "Refrigerator", MAC_Address: "00:1B:44:11:3A:B9", IP: "127.0.0.4", Create_Date: "2021-05-31", Power_Consumption: "80"},
    { Device: "Selling Fan", MAC_Address: "00:1B:44:11:3A:B2", IP: "127.0.0.5", Create_Date: "2021-05-31", Power_Consumption: "100"}
];

router.get('/', (ctx, next) => {
	ctx.body = devices;
	next();
});
// Routes will go here

// router.get('/:id', (ctx, next) => {
// 	let getCurrentBook = books.filter(function(book) {
// 		if (book.id == ctx.params.id) {
// 			return true;
// 		}
// 	});

// 	if (getCurrentBook.length) {
// 		ctx.body = getCurrentBook[0];
// 	} else {
// 		ctx.response.status = 404;
// 		ctx.body = 'Book Not Found';
// 	}
// 	next();
// });

router.post('/new', (ctx, next) => {
	// Check if any of the data field not empty
	if (
		!ctx.request.body.Device ||
		!ctx.request.body.MAC_Address ||
		!ctx.request.body.IP ||
        !ctx.request.body.Create_Date ||
        !ctx.request.body.Power_Consumption
	) {
		ctx.response.status = 400;
		ctx.body = 'Please enter the data';
	} else {
		let newDevice = devices.push({
			Device: ctx.request.body.Device,
			MAC_Address: ctx.request.body.MAC_Address,
			IP: ctx.request.body.IP,
            Create_Date: ctx.request.body.Create_Date,
            Power_Consumption: ctx.request.body.Power_Consumption
		});
		ctx.response.status = 201;
		ctx.body = `New device added with device: ${ctx.request.body.Device} & IP: ${
			ctx.request.body.IP
		}`;
	}
	next();
});

module.exports = router;