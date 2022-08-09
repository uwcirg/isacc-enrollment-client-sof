module.exports = {
    presets: [
        "@babel/typescript",
        "module:metro-react-native-babel-preset",
        ["@babel/preset-typescript", {allowDeclareFields: true}]
    ],
    plugins: [
        [
            '@babel/plugin-transform-typescript',
            {
                allowDeclareFields: true,
            },
        ],
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-private-methods',
        '@babel/plugin-proposal-decorators'

    ]
}
