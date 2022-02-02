const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroMongoose = require("@admin-bro/mongoose");
const dotenv = require("dotenv");

const mongoose = require("mongoose");
dotenv.config();
AdminBro.registerAdapter(AdminBroMongoose);

// const post = require("../models/Post");

const adminBro = new AdminBro({
  databases: [mongoose],
  // resources: [{}],

  rootPath: "/admin",
});

// const option = {
//   images:{
//     components:{
//       edit:AdminBro.bundle('./api/posts/images')
//     }
//   }
// }

const ADMIN = {
  email: process.env.ADMIN_EMAIL || "admin@example.com",
  password: process.env.ADMIN_PASSWORD || "admin",
};

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  cookieName: process.env.ADMIN_COOKIE_NAME || "admin-bro",
  cookiePassword:
    process.env.ADMIN_COOKIE_PASS ||
    "superseccret-and-long-password-for-a-cookie-in-the-Browser",
  authenticate: async (email, password) => {
    if ((email === ADMIN, email && password === ADMIN.password)) {
      return ADMIN;
    }
    return null;
  },
});

module.exports = router;
