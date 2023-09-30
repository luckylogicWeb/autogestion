const crypto = require("crypto");
const OAuth = require("oauth-1.0a");

const {
  apiAutoGestion: { consumerKey, consumerSecret, cookie },
} = require("../../../config/env");

const hashSha256 = (baseString, key) => {
  return crypto.createHmac("sha256", key).update(baseString).digest("base64");
};

const oauth = OAuth({
  consumer: { key: consumerKey, secret: consumerSecret },
  signature_method: "HMAC-SHA256",
  hash_function: hashSha256,
});

const createOAuthHeaders = (url, method) => {
  const requestData = {
    url,
    method,
  };
  const auth = oauth.toHeader(oauth.authorize(requestData));

  return { headers: { ...auth }, maxRedirects: 0 };
};

module.exports = createOAuthHeaders;
