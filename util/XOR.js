function XOR(key) {
	this.decryptKey = key.slice();
	this.encryptKey = key.slice();
}

XOR.prototype.decrypt = function(data) {
	var temp = 0;
	var count = 0;
		  
	for (var i = 0; i < data.length; ++i) {
		if(count == 8) count = 0;
		    
		var temp2 = data[i] & 0xff;
		data[i] = (temp2 ^ (this.decryptKey[count]) ^ temp);
		temp = temp2;
		count++;
	}

	var old = this.decryptKey[0] & 0xff;
	old |= this.decryptKey[1] << 8 & 0xff00;
	old |= this.decryptKey[2] << 0x10 & 0xff0000;
	old |= this.decryptKey[3] << 0x18 & 0xff000000;
		
	old += data.length;
		
	this.decryptKey[0] = (old &0xff);
	this.decryptKey[1] = (old >> 0x08 &0xff);
	this.decryptKey[2] = (old >> 0x10 &0xff);
	this.decryptKey[3] = (old >> 0x18 &0xff);
	console.log("dec")
	console.log(this.decryptKey)
	return data;
}

XOR.prototype.encrypt = function(data) {
	var temp = 0;
	var count = 0;
		  
	for (var i = 0; i < data.length; ++i) {
		if(count == 8) count = 0;
		    
		var temp2 = data[i] & 0xff;
		data[i] = (temp2 ^ (this.encryptKey[count]) ^ temp);
		temp = data[i];
		count++;
	}

	var old = this.encryptKey[0] &0xff;
	old |= this.encryptKey[1] << 8 &0xff00;
	old |= this.encryptKey[2] << 0x10 &0xff0000;
	old |= this.encryptKey[3] << 0x18 &0xff000000;
		
	old += data.length;
		
	this.encryptKey[0] = (old &0xff);
	this.encryptKey[1] = (old >> 0x08 &0xff);
	this.encryptKey[2] = (old >> 0x10 &0xff);
	this.encryptKey[3] = (old >> 0x18 &0xff);
	console.log("enc")
	console.log(this.encryptKey)
	return data;
}

module.exports = XOR;