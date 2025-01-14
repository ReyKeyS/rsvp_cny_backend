require("dotenv/config");

const dictionary = {
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    HOST: process.env.HOST,
    CON_STRING: process.env.CON_STRING,
};

module.exports = function env(key) {
    return dictionary[key];
}