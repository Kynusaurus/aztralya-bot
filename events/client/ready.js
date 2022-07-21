const Logger = require('../../utils/Logger');
const PlayerCount = require('../../server/players');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        Logger.client('· démmaré avec succès.');

        setInterval(() => {
            PlayerCount.getPlayerCount().then((result) => {
                client.user.setActivity(`${result.data.length} Astronautes ⭐`,{ type: 'WATCHING' });
            })
          }, 10000);

        // const devGuild = await client.guilds.cache.get('908498615444594699');
        // devGuild.commands.set(client.commands.map(cmd => cmd));
        client.application.commands.set(client.commands.map(cmd => cmd));
    },
};