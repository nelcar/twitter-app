const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

const { default: axios } = require("axios");

// ...

// Reemplazar tus valores de CONSUMER_KEY y CONSUMER_SECRET aquí
const CONSUMER_KEY = "EDrFq9vvSgYvGTPPv0wWAREyf";
const CONSUMER_SECRET = "8P71tQdY4PzFv9tOjTN64gbbTs78SaEF6OThbhWxaOMJrhuNWF";

async function getAccessToken() {
  const tokenCredentials = Buffer.from(
    `${CONSUMER_KEY}:${CONSUMER_SECRET}`,
    "utf8"
  ).toString("base64");

  try {
    const response = await axios({
      method: "POST",
      url: "https://api.twitter.com/oauth2/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        Authorization: `Basic ${tokenCredentials}`,
      },
      data: "grant_type=client_credentials",
    });

    return response.data.access_token;
  } catch (error) {
    console.error("Error al obtener el token de acceso:", error);
    return null;
  }
}

app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use("/twitter", async (req, res) => {
  const url = "https://api.twitter.com" + req.url;
  const method = req.method;

  const accessToken = await getAccessToken();
  if (!accessToken) {
    res.status(500).send({ error: "No se pudo obtener el token de acceso" });
    return;
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response = await axios({ method, url, headers });
    res.status(response.status).send(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).send(error.response.data);
    } else {
      res.status(500).send({ error: "Internal server error" });
    }
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
