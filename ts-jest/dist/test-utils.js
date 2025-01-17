"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var jest_config_1 = require("jest-config");
var setFromArgv = require("jest-config/build/set_from_argv");
var path = require("path");
function readRawConfig(argv, root) {
    var rawConfig = parseConfig(argv);
    if (typeof rawConfig === 'string') {
        return loadJestConfigFromFile(path.resolve(process.cwd(), rawConfig), argv);
    }
    if (typeof rawConfig === 'object') {
        var config = Object.assign({}, rawConfig);
        config.rootDir = config.rootDir || root;
        return jest_config_1.normalize(config, argv);
    }
    var packageConfig = loadJestConfigFromPackage(path.join(root, 'package.json'), argv);
    return packageConfig || jest_config_1.normalize({ rootDir: root }, argv);
}
function loadJestConfigFromPackage(filePath, argv) {
    var R_OK = (fs.constants && fs.constants.R_OK) || fs['R_OK'];
    try {
        fs.accessSync(filePath, R_OK);
    }
    catch (e) {
        return null;
    }
    var packageData = require(filePath);
    var config = packageData.jest || {};
    var root = path.dirname(filePath);
    config.rootDir = config.rootDir ? path.resolve(root, config.rootDir) : root;
    return jest_config_1.normalize(config, argv);
}
function parseConfig(argv) {
    if (argv.config && typeof argv.config === 'string') {
        if (argv.config.startsWith('{') && argv.config.endsWith('}')) {
            return JSON.parse(argv.config);
        }
    }
    return argv.config;
}
function loadJestConfigFromFile(filePath, argv) {
    var config = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    config.rootDir = config.rootDir
        ? path.resolve(path.dirname(filePath), config.rootDir)
        : process.cwd();
    return jest_config_1.normalize(config, argv);
}
function getJestConfig(root) {
    var yargs = require('yargs');
    var argv = yargs(process.argv.slice(2)).argv;
    var rawConfig = readRawConfig(argv, root);
    return Object.freeze(setFromArgv.default(rawConfig, argv));
}
exports.getJestConfig = getJestConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC11dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy90ZXN0LXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUJBQXlCO0FBQ3pCLDJDQUF3QztBQUN4Qyw2REFBK0Q7QUFDL0QsMkJBQTZCO0FBRzdCLHVCQUF1QixJQUFZLEVBQUUsSUFBWTtJQUMvQyxJQUFNLFNBQVMsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFcEMsSUFBSSxPQUFPLFNBQVMsS0FBSyxRQUFRLEVBQUU7UUFDakMsT0FBTyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxTQUFTLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUM3RTtJQUVELElBQUksT0FBTyxTQUFTLEtBQUssUUFBUSxFQUFFO1FBQ2pDLElBQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzVDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUM7UUFDeEMsT0FBTyx1QkFBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztLQUNoQztJQUdELElBQU0sYUFBYSxHQUFHLHlCQUF5QixDQUM3QyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxjQUFjLENBQUMsRUFDL0IsSUFBSSxDQUNMLENBQUM7SUFDRixPQUFPLGFBQWEsSUFBSSx1QkFBUyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzdELENBQUM7QUFFRCxtQ0FBbUMsUUFBUSxFQUFFLElBQUk7SUFFL0MsSUFBTSxJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUssRUFBRSxDQUFDLE1BQU0sQ0FBWSxDQUFDO0lBRTNFLElBQUk7UUFDRixFQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUMvQjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUVELElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0QyxJQUFNLE1BQU0sR0FBRyxXQUFXLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUN0QyxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3BDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDNUUsT0FBTyx1QkFBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNqQyxDQUFDO0FBRUQscUJBQXFCLElBQUk7SUFDdkIsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLE9BQU8sSUFBSSxDQUFDLE1BQU0sS0FBSyxRQUFRLEVBQUU7UUFFbEQsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUM1RCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ2hDO0tBQ0Y7SUFDRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7QUFDckIsQ0FBQztBQUVELGdDQUFnQyxRQUFRLEVBQUUsSUFBSTtJQUM1QyxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDOUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTztRQUM3QixDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDdEQsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNsQixPQUFPLHVCQUFTLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ2pDLENBQUM7QUFFRCx1QkFBOEIsSUFBWTtJQUN4QyxJQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDL0IsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQy9DLElBQU0sU0FBUyxHQUFHLGFBQWEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUMsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDN0QsQ0FBQztBQUxELHNDQUtDIn0=