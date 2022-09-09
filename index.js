const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token, roleList } = require('./config.json');


const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.once('ready', () => {
    console.log('Ready!');
});

client.on('interactionCreate', interaction => {
    if (!interaction.isSelectMenu()) return;

    if (interaction.customId === 'roleselection') {
        const idRole = interaction.values;
        const users = interaction.user.id;

        if (interaction.guild.members.cache.get(users).roles.cache.has(idRole.toString())) {
            interaction.reply({ content: 'You already have this role !', ephemeral: true, components: [] });
        }
        else {
            for (let i = 0; i < roleList.length; i++) {

                if (interaction.guild.members.cache.get(users).roles.cache.has(roleList[i].id)) {
                    interaction.guild.members.cache.get(users).roles.remove(roleList[i].id);
                }


                if (i >= roleList.length - 1) {
                    interaction.guild.members.cache.get(users).roles.add(idRole);
                }
            }
            interaction.reply({ content: 'The role has been added', ephemeral: true, components: [] });
        }






    }
});




client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });

    }
});

client.login(token);