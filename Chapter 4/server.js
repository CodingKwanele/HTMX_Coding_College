// server.js
import express from 'express';
import fetch from 'node-fetch'; // <-- Add this line

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/search', async (req, res) => {
    const searchTerm = req.body.search?.toLowerCase() || '';

    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();

    const filteredUsers = users.filter(({name, email}) => {
        return name.toLowerCase().includes(searchTerm) || email.toLowerCase().includes(searchTerm);
    });

    const htmlResults = filteredUsers.map(({name, email}) => `
        <tr>
            <td>${name}</td>
            <td>${email}</td>
        </tr>
    `).join('') || '<tr><td colspan="2">No users found</td></tr>';

    res.send(htmlResults);
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
