
const core = require('@actions/core');
const github = require('@actions/github');

try {
  const script = core.getInput('script');
  const username = core.getInput('username');
  const password = core.getInput('password');
  const { execSync, spawn } = require('child_process');
  
  if (script.includes('\'') || script.includes('"') || username.includes('\'') || username.includes('"') || password.includes('\'') || password.includes('"'))
  {
     core.setFailed("Invalid characters in string");
  }

  execSync('"C:\\builder\steamcmd.exe" +login ' + username + ' ' + password + ' +run_app_build_http ' + script + ' +quit', (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    if (err) {
      core.setFailed(err);
      return;
    }
  });
} catch (error) {
  core.setFailed(error.message);
}
