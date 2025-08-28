// netlify/functions/connect-chainstack.js

const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  const chainstackUrl = process.env.CHAINSTACK_URL;
  const chainstackUsername = process.env.CHAINSTACK_USERNAME;
  const chainstackPassword = process.env.CHAINSTACK_PASSWORD;

  // Crear el header de autenticación básica
  const authHeader = "Basic " + Buffer.from(`${chainstackUsername}:${chainstackPassword}`).toString("base64");

  try {
    // Realizamos la solicitud a la API de Chainstack
    const response = await fetch(chainstackUrl, {
      method: "GET",
      headers: {
        "Authorization": authHeader
      }
    });

    // Si la solicitud es exitosa, respondemos con los datos obtenidos
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    // Si hay un error en la conexión, lo manejamos
    console.error("Error al conectar con Chainstack:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Hubo un problema al conectar con Chainstack." }),
    };
  }
};
