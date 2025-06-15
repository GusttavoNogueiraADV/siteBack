require('dotenv').config(); 

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors'); 

const app = express();
const port = 3030;

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

app.post('/api/send-email', (req, res) => {
  const { selectedOptions, phoneNumber } = req.body;

  const mailOptions = {
from: `www.nogueiraadvassociados.com.br" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject: 'Novo Contato via website',
html: `
  <html>
    <head>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f0f2f5;
          color: #333;
        }
        .container {
          background-color: #fff;
          border-radius: 10px;
          margin: 40px auto;
          padding: 30px;
          max-width: 600px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        h2 {
          color: #0066cc;
          text-align: center;
          margin-bottom: 30px;
        }
        p {
          font-size: 16px;
          margin: 12px 0;
        }
        .highlight {
          font-weight: bold;
          color: #0066cc;
        }
        .footer {
          margin-top: 30px;
          font-size: 14px;
          color: #555;
          text-align: center;
        }
        .footer a {
          color: #00b300;
          font-weight: bold;
          text-decoration: none;
        }
        .footer a:hover {
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>📨 Novo Contato via Website</h2>
        <p><span class="highlight">Opções selecionadas:</span> ${selectedOptions.join(', ')}</p>
        <p><span class="highlight">Telefone informado:</span> <a href="https://wa.me/${phoneNumber}" target="_blank">${phoneNumber}</a></p>
        <div class="footer">
          <p>Obrigado por usar minha aplicação! Se precisar de algo, <a href="https://wa.me/5513991822130" target="_blank">entre em contato pelo WhatsApp</a>.</p>
        </div>
      </div>
    </body>
  </html>
`,

  };

  // Enviar o e-mail
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erro ao enviar e-mail:', error);
      return res.status(500).send('Erro ao enviar e-mail: ' + error.message);
    }
    console.log('E-mail enviado:', info.response);
    res.status(200).send('E-mail enviado com sucesso');
  });
});

// Inicia o servidor na porta 3030
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
