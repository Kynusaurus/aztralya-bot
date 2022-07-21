const mongoose = require('mongoose');

const guildSchema = mongoose.Schema({
    id: String,
    prefix: { 'type': String, 'default': '!' },
    logChannel: { 'type': String, 'default': '991456084676055050' },
    bvnChannel: { 'type': String, 'default': '908575676892856350' },
    ticketChannel: { 'type': String, 'default': '908712580124672131' }
});

module.exports = mongoose.model('Guild', guildSchema);