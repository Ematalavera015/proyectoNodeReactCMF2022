import hashPassword from "../common/hashPassword.js";
const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: hashPassword("123456"),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: hashPassword("123456"),
    isAdmin: false,
  },
  {
    name: "Jane Doe",
    email: "jane@example.com",
    password: hashPassword("123456"),
    isAdmin: false,
  },
];

export default users;
