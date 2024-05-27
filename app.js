const express = require("express");

const app = express();
const { login, verifyToken } = require("./autenticacion");

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/SignIn", (req, res) => {
  const { email, password } = req.query;

  try {
    if (!email || !password) {
      throw new Error("Email y contraseña son requeridos");
    }

    const token = login(email, password);

    const html = `
        <html>
            <body>
                <p>Email: ${email}</p>
                <a href="/fbi-secret?token=${token}">Link a FBI Secret</a>
                <script>
                    sessionStorage.setItem('token', '${token}');
                </script>
            </body>
        </html>
    `;

    res.send(html);
  } catch (error) {
    res.status(401).send({ code: 401, message: error.message });
  }
});

const jwt = require("jsonwebtoken");

app.get("/fbi-secret", (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      throw new Error("No se proporcionó token");
    }

    const data = verifyToken(token);
    res.send(`Bienvenido ${data.email}`);
  } catch (error) {
    res.status(401).send({ code: 401, message: error.message });
  }
});

app.listen(3000, () => {
  console.log("Servidor corriendo en el puerto 3000");
});
