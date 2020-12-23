
const core = require('@actions/core');
const github = require('@actions/github');

try {
  const sdkroot = core.getInput('sdkroot');
  const script = core.getInput('script');
  const username = core.getInput('username');
  const password = core.getInput('password');
  const { spawn } = require('child_process');
  
  if (sdkroot.includes('\'') || sdkroot.includes('"') || script.includes('\'') || script.includes('"') || username.includes('\'') || username.includes('"') || password.includes('\'') || password.includes('"'))
  {
     core.setFailed("Invalid characters in string");
  }
  
  var steamcmdpath = sdkroot + "/tools/ContentBuilder/builder_osx/steamcmd";
  if (process.platform === "win32")
  {
    steamcmdpath = sdkroot + "\\tools\\ContentBuilder\\builder\\steamcmd.exe"
  }

  var proc = spawn(steamcmdpath, ['+login', username, password, '+run_app_build_http', script, '+quit']);
  
  proc.stdout.on('data', function (data) {
    console.log(data.toString());
  });

  proc.stderr.on('data', function (data) {
    console.error(data.toString());
  });

  proc.on('error', function () {
    console.error('Failed to launch.'); 
  });

  proc.on('exit', function () {
  });
} catch (error) {
  core.setFailed(error.message);
}
