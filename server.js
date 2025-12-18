const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

/* ---------------- MIDDLEWARES ---------------- */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

/* ---------------- ROUTES ---------------- */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'main.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/seva', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'seva.html'));
});

app.get('/youtube', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'youtube.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.get('/member', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'member.html'));
});

/* ---------------- DATABASE ---------------- */
mongoose.connect(
  'mongodb+srv://hinasahukamail_db_user:Rundransh1234@cluster01.nntprca.mongodb.net/ashramDB'
)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('Mongo error:', err));


const memberSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    membershipType: String,
    city: String,
    message: String,
    date: { type: Date, default: Date.now }
});

const Member = mongoose.model('Member', memberSchema);

/* ---------------- POST ROUTE ---------------- */
app.post('/join', async (req, res) => {
    try {
        const member = new Member(req.body);
        await member.save();
        res.json({ success: true, message: 'सदस्यता सफल 🙏' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
});

/* ---------------- 404 HANDLER (LAST) ---------------- */
app.use((req, res) => {
    res.status(404).redirect('/');
});

/* ---------------- SERVER ---------------- */
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
