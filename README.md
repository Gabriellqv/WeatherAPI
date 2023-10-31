# API de Previsão do Tempo

Esta é uma API simples de previsão do tempo que fornece informações meteorológicas com base em coordenadas de latitude e longitude. A API permite o registro de usuários, gera chaves de API exclusivas para autenticação e fornece acesso a dados climáticos em tempo real usando a API do OpenWeatherMap.

# Funcionalidades Principais

Registro de usuários com geração automática de chaves de API exclusivas.
Autenticação baseada em chave de API para acesso aos serviços de previsão do tempo.
Recuperação de informações climáticas precisas com base nas coordenadas de latitude e longitude.

# Tecnologias Utilizadas

Node.js com Express para criar o servidor web.
Axios para fazer solicitações HTTP à API do OpenWeatherMap.
Swagger UI para documentação e visualização de API.
Variáveis de ambiente com o pacote dotenv para configurações sensíveis.

# Como Usar
Clone o repositório:

```git clone``` https://github.com/seu-usuario/nome-do-repositorio.git

Instale as dependências:

```npm install```

Defina suas variáveis de ambiente no arquivo .env, incluindo a chave da API do OpenWeatherMap.

Execute o servidor:


```npm start```
A API estará disponível em ```http://localhost:3000```.

# Documentação da API

A documentação da API pode ser acessada em /api-docs e fornece detalhes sobre os endpoints disponíveis, parâmetros necessários e exemplos de solicitações.

# Exemplo de Registro de Usuário

Para registrar um novo usuário e obter uma chave de API:

POST /register

```json
{
  "username": "seu-usuario",
  "password": "sua-senha",
  "email": "seu-email"
}
```
Exemplo de Solicitação de Previsão do Tempo
Para obter informações de previsão do tempo com base em latitude e longitude:

```json
GET /weather/{latitude}/{longitude}

Header:
api-key: Sua-Chave-de-API
```
