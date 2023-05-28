const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.login = async (req, res, next) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
        return res.status(401).json({ error: 'Incorrect username or password' });
    }

    user.comparePassword(password, (error, match) => {
        if (!match) {
            return res.status(401).json({ error: 'Incorrect username or password' });
        }
    });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    user.token = token;
    await user.save();

    res.status(200).json({ token });
};
