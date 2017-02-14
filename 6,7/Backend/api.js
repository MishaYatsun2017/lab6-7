/**
 * Created by chaika on 09.02.16.
 */
var Pizza_List = require('./data/Pizza_List');

exports.getPizzaList = function(req, res) {
    res.send(Pizza_List);
};

exports.createOrder = function(req, res) {
    var order_info = req.body;
    console.log("Creating Order", order_info);

    res.send({
        success: true
    });
};

exports.getLiqPayment = function(req, res) {
	//var LiqPay = require('liqpay');
	var crypto = require('crypto');
	
	var public_key = 'i33902232284
';
	var private_key = 'Ife7ihZHpKyGjp3iywbbDqCyQuR2LLXDPTMhApOy';
	
	//var liqpay = new LiqPay(public_key, private_key);
	
	var html = cnb_form({
	'action'         : 'pay',
	'amount'         : '1',
	'currency'       : 'USD',
	'description'    : 'description text',
	'order_id'       : 'order_id_1',
	'version'        : '3'
	});
	
	function str_to_sign(str){
		var sha1 = crypto.createHash('sha1');
			sha1.update(str);
		return sha1.digest('base64');			
	};
	
	function cnb_form(params){

		var language = "ru";
		if(params.language)
			language = params.language;

		params.public_key = public_key;	
		
		var data = new Buffer(JSON.stringify(params)).toString('base64');
		var signature = str_to_sign(private_key + data + private_key);

		return '<form method="POST" action="https://www.liqpay.com/api/3/checkout" accept-charset="utf-8">' +
	                '<input type="hidden" name="data" value="'+data+'" />' +
	                '<input type="hidden" name="signature" value="'+signature+'" />' +                
	                '<input type="image" src="//static.liqpay.com/buttons/p1'+language+'.radius.png" name="btn_text" />' +
	            '</form>';

	};
	
	
    res.send(html);
};
