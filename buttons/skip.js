// const { EmbedBuilder } = require("discord.js");
// const { Translate } = require("../process_tools");

// module.exports = async ({ inter, queue }) => {
//     if (!queue?.isPlaying()) {
//         return inter.editReply({
//             content: await Translate(`No music currently playing... try again? <❌>`)
//         });
//     }

//     const success = queue.node.skip();

//     if (success) {
//         const track = queue.currentTrack; // Get the new track
//         const message = queue.message; // Get the current embed message

//         // Ensure the embed is managed as an instance of EmbedBuilder
//         let embed = EmbedBuilder.from(message.embeds[0]);
//         embed
//             .setAuthor({
//                 name: await Translate(`Now Playing 🎧`),
//                 iconURL: track.thumbnail.url,
//             })
//             .setTitle(track.title)
//             .setURL(track.url)
//             .setThumbnail(track.thumbnail.url)
//             .setDescription(`**Channel:** ${track.author}\n**Duration:** ${track.duration}\n\n[Open in YouTube](${track.url})`)
//             .setColor("#1DB954") // Spotify green color for a fresh look
//             .setFooter({
//                 text: `Requested by ${track.requestedBy.username}`,
//                 iconURL: track.requestedBy.displayAvatarURL({ dynamic: true }),
//             });

//         await message.edit({ embeds: [embed] });
//     }

//     return inter.editReply({
//         content: success ? await Translate(`Current music **${queue.currentTrack.title}** skipped <✅>`) : await Translate(`Something went wrong <${inter.member}>... try again? <❌>`)
//     });
// };


const { EmbedBuilder } = require("discord.js");
const { Translate } = require("../process_tools");

module.exports = async ({ inter, queue }) => {
    if (!queue?.isPlaying()) {
        return inter.editReply({
            content: await Translate(`No music currently playing... try again? <❌>`)
        });
    }

    const success = queue.node.skip();

    if (success) {
        const track = queue.currentTrack;
        const message = queue.message;

        if (message && message.embeds && message.embeds.length > 0) {
            let embed = EmbedBuilder.from(message.embeds[0]);
            embed
                .setAuthor({
                    name: await Translate(`Now Playing 🎧`),
                    iconURL: client.user.displayAvatarURL({ dynamic: true }),
                })
                .setTitle(track.title)
                .setURL(track.url)
                .setImage(track.thumbnail)
                .setDescription(`**Author:** ${track.author}\n\n**Duration:** ${track.duration}\n\n`)
                .setColor("#FC0FC0")
                .setFooter({
                    text: `Requested by ${track.requestedBy.username}`,
                    iconURL: track.requestedBy.displayAvatarURL({ dynamic: true }),
                });

            await message.edit({ embeds: [embed] });
        }
    }

    return inter.editReply({
        content: success ? await Translate(`Current music **${queue.currentTrack.title}** skipped <✅>`) : await Translate(`Something went wrong <${inter.member}>... try again? <❌>`)
    });
};

