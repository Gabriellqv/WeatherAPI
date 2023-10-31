const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const bodyParser = require('body-parser');
const uuid = require('uuid'); // Para gerar chaves de API únicas

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Simulando um banco de dados de usuários e um cadastro
const users = [];

const newUser = {
  name: "Michael Jackson",
  email: "michaeljackson@example.com",
  password: "coxinha123",
  userId: "1234"
};

users.push(newUser);

console.log(users);

// Rota para a página de registro
app.get('/register', (req, res) => {
  res.render('register');
});

// Rota para processar o formulário de registro
app.post('/register', (req, res) => {
  const { username, password, email } = req.body;

  // Simule a geração de uma chave de API 
  const apiKey = uuid.v4();

  // Salve o usuário e a chave de API em seu "banco de dados"
  users.push({ username, password, email, apiKey });

  // Exiba a chave de API ao usuário
  res.render('api-key', { apiKey });
});

// Rota para deletar um usuário
app.delete('/users/:userId', (req, res) => {
  const userId = req.params.userId; // Obtenha o ID do usuário userId = apikey

  // Encontre o usuário pelo ID
  const userIndex = users.findIndex((user) => user.apiKey === userId);

  if (userIndex !== -1) {
    // Remova o usuário da lista de usuários
    users.splice(userIndex, 1);

    res.status(204).send(); // Resposta de sucesso (código 204)
  } else {
    res.status(404).json({ error: 'Usuário não encontrado' }); // Usuário não encontrado
  }
});

function authenticateAPIKey(req, res, next) {
  const apiKey = req.header('api-key')

  // Verifique se a chave de API existe no banco de dados de usuários
  const user = users.find((user) => user.apiKey === apiKey);

  if (user) {
    next();
  } else {
    res.status(401).json({ error: 'Chave API inválida' });
  }
}

app.use(express.json());
app.use(authenticateAPIKey);

app.get('/weather/:latitude/:longitude', authenticateAPIKey, async (req, res) => {
  const { latitude, longitude } = req.params;

  try {
    const weatherData = await getWeatherByLocation(latitude, longitude);
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar previsão do tempo' });
  }
});

async function getWeatherByLocation(latitude, longitude) {
  try {
    const weatherApiKey = process.env.WEATHER_API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${weatherApiKey}`;
    const response = await axios.get(apiUrl);

    if (response.status === 200) {
      const weatherData = response.data;

      return weatherData;
    } else {
      throw new Error('Erro ao buscar informações de clima');
    }
  } catch (error) {
    throw error;
  }
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`API de Previsão do Tempo rodando em http://localhost:${port}`);
});