// server.js
import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.static('public'));
app.use(express.json());

app.post('/email', (req, res) => {
    const submittedEmail = req.body.email;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailRegex.test(submittedEmail)) {
        return res.send(`
            <div class="mb-3" hx-target="this" hx-swap="outerHTML">
                <label class="form-label">Email address</label>
                <input
                    type="email"
                    class="form-control"
                    name="email"
                    hx-post="/email"
                    value="${submittedEmail}"
                >
                <div class="alert alert-success" role="alert">
                    That email is valid
                </div>                 
            </div>
        `);
    } else {
        return res.send(`
            <div class="mb-3" hx-target="this" hx-swap="outerHTML">
                <label class="form-label">Email address</label>
                <input
                    type="email"
                    class="form-control"
                    name="email"
                    hx-post="/email"
                    value="${submittedEmail}"
                >
                <div class="alert alert-danger" role="alert">
                    Please enter a valid email address
                </div>                 
            </div>
        `);
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
