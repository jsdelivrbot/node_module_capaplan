"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const os = require("os");
const path = require("path");
const slash = require("slash");
// Used to identify scripts created by Husky
exports.huskyIdentifier = '# husky';
// Render script
const render = ({ node, platform, script, version }) => `#!/bin/sh
${exports.huskyIdentifier}
# v${version} ${platform}

scriptPath="${script}.js"
hookName=\`basename "$0"\`
gitParams="$*"
${platform !== 'win32'
    ? `
if ! command -v node >/dev/null 2>&1; then
  echo "Can't find node in PATH, trying to find a node binary on your system"
fi
`
    : ''}
if [ -f $scriptPath ]; then
  ${node} $scriptPath $hookName "$gitParams"
else
  echo "Can't find Husky, skipping $hookName hook"
  echo "You can reinstall it using 'npm install husky --save-dev' or delete this hook"
fi
`;
/**
 * @param rootDir - e.g. /home/typicode/project/
 * @param huskyDir - e.g. /home/typicode/project/node_modules/husky/
 * @param requireRunNodePath - path to run-node resolved by require e.g. /home/typicode/project/node_modules/.bin/run-node
 * @param platform - platform husky installer is running on (used to produce win32 specific script)
 */
function default_1(rootDir, huskyDir, requireRunNodePath, 
// Additional param used for testing only
platform = os.platform()) {
    const runNodePath = slash(path.relative(rootDir, requireRunNodePath));
    // On Windows do not rely on run-node
    const node = platform === 'win32' ? 'node' : runNodePath;
    const { version } = JSON.parse(fs.readFileSync(path.join(__dirname, '../../package.json'), 'utf-8'));
    const script = slash(path.join(path.relative(rootDir, huskyDir), 'lib/runner/bin'));
    return render({ node, platform, script, version });
}
exports.default = default_1;
