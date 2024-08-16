// const { EmbedBuilder, InteractionType } = require('discord.js');
// const { useQueue } = require('discord-player');
// const { Translate } = require('../../process_tools');

// module.exports = async (client, inter) => {
//     await inter.deferReply({ ephemeral: true });
//     if (inter.type === InteractionType.ApplicationCommand) {
//         const DJ = client.config.opt.DJ;
//         const command = client.commands.get(inter.commandName);

//         const errorEmbed = new EmbedBuilder().setColor('#ff0000');

//         if (!command) {
//             errorEmbed.setDescription(await Translate('<❌> | Error! Please contact Developers!'));
//             inter.editReply({ embeds: [errorEmbed], ephemeral: true });
//             return client.slash.delete(inter.commandName);
//         }

//         if (command.permissions && !inter.member.permissions.has(command.permissions)) {
//             errorEmbed.setDescription(await Translate(`<❌> | You need do not have the proper permissions to exacute this command`));
//             return inter.editReply({ embeds: [errorEmbed], ephemeral: true });
//         }

//         if (DJ.enabled && DJ.commands.includes(command) && !inter.member._roles.includes(inter.guild.roles.cache.find(x => x.name === DJ.roleName).id)) {
//             errorEmbed.setDescription(await Translate(`<❌> | This command is reserved For members with <\`${DJ.roleName}\`> `));
//             return inter.editReply({ embeds: [errorEmbed], ephemeral: true });
//         }

//         if (command.voiceChannel) {
//             if (!inter.member.voice.channel) {
//                 errorEmbed.setDescription(await Translate(`<❌> | You are not in a Voice Channel`));
//                 return inter.editReply({ embeds: [errorEmbed], ephemeral: true });
//             }

//             if (inter.guild.members.me.voice.channel && inter.member.voice.channel.id !== inter.guild.members.me.voice.channel.id) {
//                 errorEmbed.setDescription(await Translate(`<❌> | You are not in the same Voice Channel`));
//                 return inter.editReply({ embeds: [errorEmbed], ephemeral: true });
//             }
//         }

//         command.execute({ inter, client });
//     } else if (inter.type === InteractionType.MessageComponent) {
//         const customId = inter.customId;
//         if (!customId) return;

//         const queue = useQueue(inter.guild);
//         const path = `../../buttons/${customId}.js`;

//         delete require.cache[require.resolve(path)];
//         const button = require(path);
//         if (button) return button({ client, inter, customId, queue });
//     }
// }

const { EmbedBuilder, InteractionType } = require('discord.js');
const { useQueue } = require('discord-player');
const { Translate } = require('../../process_tools');

module.exports = async (client, inter) => {
    try {
        await inter.deferReply({ ephemeral: true });

        if (inter.type === InteractionType.ApplicationCommand) {
            const DJ = client.config.opt.DJ;
            const command = client.commands.get(inter.commandName);

            const errorEmbed = new EmbedBuilder().setColor('#ff0000');

            if (!command) {
                errorEmbed.setDescription(await Translate('<❌> | Error! Please contact Developers!'));
                await inter.editReply({ embeds: [errorEmbed], ephemeral: true });
                return client.slash.delete(inter.commandName);
            }

            if (command.permissions && !inter.member.permissions.has(command.permissions)) {
                errorEmbed.setDescription(await Translate('<❌> | You do not have the proper permissions to execute this command'));
                return await inter.editReply({ embeds: [errorEmbed], ephemeral: true });
            }

            if (DJ.enabled && DJ.commands.includes(command) && !inter.member._roles.includes(inter.guild.roles.cache.find(x => x.name === DJ.roleName).id)) {
                errorEmbed.setDescription(await Translate(`<❌> | This command is reserved for members with <\`${DJ.roleName}\`>`));
                return await inter.editReply({ embeds: [errorEmbed], ephemeral: true });
            }

            if (command.voiceChannel) {
                if (!inter.member.voice.channel) {
                    errorEmbed.setDescription(await Translate('<❌> | You are not in a Voice Channel'));
                    return await inter.editReply({ embeds: [errorEmbed], ephemeral: true });
                }

                if (inter.guild.members.me.voice.channel && inter.member.voice.channel.id !== inter.guild.members.me.voice.channel.id) {
                    errorEmbed.setDescription(await Translate('<❌> | You are not in the same Voice Channel'));
                    return await inter.editReply({ embeds: [errorEmbed], ephemeral: true });
                }
            }

            // Execute the command
            await command.execute({ inter, client });
        } else if (inter.type === InteractionType.MessageComponent) {
            const customId = inter.customId;
            if (!customId) return;

            const queue = useQueue(inter.guild);
            const path = `../../buttons/${customId}.js`;

            delete require.cache[require.resolve(path)];
            const button = require(path);
            if (button) return await button({ client, inter, customId, queue });
        }
    } catch (error) {
        console.error('Interaction handling error:', error);
        const errorEmbed = new EmbedBuilder()
            .setColor('#ff0000')
            .setDescription(await Translate('<❌> | An unexpected error occurred. Please try again later.'));
        await inter.editReply({ embeds: [errorEmbed], ephemeral: true });
    }
};
