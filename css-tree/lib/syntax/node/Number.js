var NUMBER = require('../../tokenizer').TYPE.Number;

module.exports = {
    name: 'Number',
    structure: {
        value: String
    },
    parse: function() {
        return {
            type: 'Number',
            loc: this.getLocation(this.scanner.tokenStart, this.scanner.tokenEnd),
            value: this.scanner.consume(NUMBER)
        };
    },
    generate: function(processChunk, node) {
        processChunk(node.value);
    }
};