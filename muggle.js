var util = require('util');

/* Non-wizard-friendly error message */
function Muggle(message, reason) {
	if (!(this instanceof Muggle))
		return new Muggle(message, reason);
	Error.call(this, message);
	Error.captureStackTrace(this, this.constructor);
	this.message = message;
}
util.inherits(Muggle, Error);
exports.Muggle = Muggle;

Muggle.prototype.most_precise_error_message = function () {
	var deepest = this.message;
	var muggle = this;
	var sanity = 10;
	while (muggle.reason && muggle.reason instanceof Muggle) {
		muggle = muggle.reason;
		if (muggle.message && typeof muggle.message == 'string')
			deepest = muggle.message;
		if (--sanity <= 0)
			break;
	}
	return deepest;
};

Muggle.prototype.deepest_reason = function () {
	if (this.reason && this.reason instanceof Muggle)
		return this.reason.deepest_reason();
	return this;
};
