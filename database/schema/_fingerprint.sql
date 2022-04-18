--- finger print table for gathering information about the user.


use cloudchef;


-- create a database table with the following fields:
--  userIP
-- userAgent
-- time of request.
-- requests data
-- request type
-- signature text
-- sessionToken

CREATE TABLE IF NOT EXISTS user_fingerprint (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userIP TEXT,
  userAgent TEXT,
  time TEXT,
  requestData TEXT,
  requestType TEXT,
  signature TEXT, -- value of cookie if authenticated
  sessionToken TEXT -- value of user session
);

