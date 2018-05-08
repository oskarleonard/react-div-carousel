const shell = require('shelljs');

shell.echo('Cleaning up old files...');
shell.exec('rimraf dist/');
shell.mkdir('dist');
shell.echo('\nCompiling...');
shell.echo('[1/2]\twebpack/server.prod.js');
shell.exec('webpack --config webpack/server.prod.js --json > dist/stats.server.json');

shell.echo('[2/2]\twebpack/client.prod.js');
shell.exec('webpack --config webpack/client.prod.js --json > dist/stats.client.json');

shell.echo('\nCopying files...');
shell.cp('dist/stats.client.json', 'dist/client/stats.client.json');
shell.cp('demo/server/server.js', 'dist/server');
shell.cp('demo/server/environment.js', 'dist/server');
shell.cp('-R', 'demo/server/views', 'dist/server');

shell.echo('\nDone!');
