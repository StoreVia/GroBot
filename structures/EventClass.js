module.exports = class Event {
	constructor(client, options = {}) {
		this.client = client;
		this.name = options.name;
		this.raw = options.raw || false;
		this.once = options.once || false;
	}

	async run() {
		throw new Error(`This Event "${this.name}" Does Not Have A Run Method.`);
	}
};