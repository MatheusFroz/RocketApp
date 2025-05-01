require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios');
const User = require('./models/User');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Conexão MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ MongoDB conectado!'))
    .catch(err => console.error('Erro ao conectar MongoDB:', err));

// Rota básica
app.get('/', (req, res) => {
    res.send('Rocket.App backend rodando 🚀');
});

// Rota de login Twitch
app.get('/auth/twitch', (req, res) => {
    const redirect = `https://id.twitch.tv/oauth2/authorize?client_id=${process.env.TWITCH_CLIENT_ID}&redirect_uri=${process.env.TWITCH_REDIRECT_URI}&response_type=code&scope=user:read:email`;
    res.redirect(redirect);
});

// Callback Twitch
app.get('/auth/twitch/callback', async (req, res) => {
    const code = req.query.code;
    try {
        // Troca o code por um access token
        const tokenResponse = await axios.post(`https://id.twitch.tv/oauth2/token`, null, {
            params: {
                client_id: process.env.TWITCH_CLIENT_ID,
                client_secret: process.env.TWITCH_CLIENT_SECRET,
                code: code,
                grant_type: 'authorization_code',
                redirect_uri: process.env.TWITCH_REDIRECT_URI
            }
        });

        const { access_token } = tokenResponse.data;

        // Busca informações do usuário
        const userResponse = await axios.get('https://api.twitch.tv/helix/users', {
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Client-Id': process.env.TWITCH_CLIENT_ID
            }
        });

        const userData = userResponse.data.data[0];

        // Salva ou atualiza no banco
        const updatedUser = await User.findOneAndUpdate(
            { twitchId: userData.id },
            {
                displayName: userData.display_name,
                email: userData.email,
                profileImageUrl: userData.profile_image_url,
                accessToken: access_token
            },
            { upsert: true, new: true }
        );

        console.log('✅ Usuário salvo/atualizado:', updatedUser);

        res.json({ message: 'Login bem-sucedido!', user: updatedUser });
    } catch (err) {
        console.error('Erro no callback:', err.response ? err.response.data : err.message);
        res.status(500).json({ error: 'Erro ao obter dados da Twitch' });
    }
});


app.listen(PORT, () => {
    console.log(`✅ Servidor rodando na porta ${PORT}`);
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find().select('-accessToken'); // remove o accessToken por segurança
        res.json(users);
    } catch (err) {
        console.error('Erro ao buscar usuários:', err.message);
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
});
