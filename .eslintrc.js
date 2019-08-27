module.exports = {
    "parserOptions": {
        "ecmaVersion": 9,
        "sourceType": "module"
    },
    "plugins": [
        "babel",
        "node"
    ],
    "rules": {
        "no-console": 0,
        "indent": [
            "warn",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "camelcase": [
            "error"
        ],
        "no-unused-vars": [
          "warn",
          {"args": "none"}
        ],

        "babel/new-cap": 1,
        "babel/camelcase": 1,
        "babel/no-invalid-this": 1,
        "babel/semi": 1,
        "babel/no-unused-expressions": 1,
        "babel/valid-typeof": 1
    }
};
