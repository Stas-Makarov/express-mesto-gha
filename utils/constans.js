const regex = /^https?:\/\/(www\.)?([\w\-\\.]+)\.([a-z]{2,})([\w\\.\-\\~:\\/\\?#\\[\]@!\\$&'\\(\\)\\*\\+\\,;\\=]*)#?$/;
const emailRegex = /^([a-zA-Z0-9_\-\\.]+)@([a-zA-Z0-9_\-\\.]+)\.([a-zA-Z]{2,5})$/;

module.exports = regex;
module.exports = emailRegex;
