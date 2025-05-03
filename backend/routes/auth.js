const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const db = require("../database/db");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;
