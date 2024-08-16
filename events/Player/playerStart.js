// const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require("discord.js");
// const { Translate } = require("../../process_tools");

// module.exports = async (queue, track) => {
//     if (!client.config.app.loopMessage && queue.repeatMode !== 0) return;

//     let EmojiState = client.config.app.enableEmojis;
//     const emojis = client.config.emojis;

//     EmojiState = emojis ? EmojiState : false;

//     const embed = new EmbedBuilder()
//         .setAuthor({
//             name: await Translate(`Now Playing 🎧`),
//             iconURL: client.user.displayAvatarURL({ dynamic: true }),
//         })
//         .setTitle(track.title)
//         .setURL(track.url)
//         .setImage(track.thumbnail)
//         .setDescription(`**Author:** ${track.author}\n\n**Duration:** ${track.duration}\n\n`)
//         .setColor("#FC0FC0")
//         .setFooter({
//             text: `Requested by ${track.requestedBy.username}`,
//             iconURL: track.requestedBy.displayAvatarURL({ dynamic: true }),
//         });

//     const skip = new ButtonBuilder()
//         .setLabel(EmojiState ? emojis.skip : 'Skip')
//         .setCustomId('skip')
//         .setStyle('Primary');

//     const resumepause = new ButtonBuilder()
//         .setLabel(EmojiState ? emojis.ResumePause : 'Pause')
//         .setCustomId('resume&pause')
//         .setStyle('Danger');

//     const stop = new ButtonBuilder()
//         .setLabel(EmojiState ? emojis.stop : 'Stop')
//         .setCustomId('stop')
//         .setStyle('Danger');

//     const volumeup = new ButtonBuilder()
//         .setLabel(EmojiState ? emojis.volumeUp : "VolumeUp")
//         .setCustomId("volumeUp")
//         .setStyle("Secondary");

//     const volumedown = new ButtonBuilder()
//         .setLabel(EmojiState ? emojis.volumeDown : "VolumeDown")
//         .setCustomId("volumeDown")
//         .setStyle("Secondary");

//     const row1 = new ActionRowBuilder().addComponents(
//         volumedown,
//         stop,
//         resumepause,
//         skip,
//         volumeup
//     );

//     const message = await queue.metadata.channel.send({ embeds: [embed], components: [row1] });
//     queue.metadata.track = track;
//     queue.message = message;
// };


const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require("discord.js");
const { Translate } = require("../../process_tools");

module.exports = async (queue, track) => {
    if (!client.config.app.loopMessage && queue.repeatMode !== 0) return;

    let EmojiState = client.config.app.enableEmojis;
    const emojis = client.config.emojis;

    EmojiState = emojis ? EmojiState : false;

    const embed = new EmbedBuilder()
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

    const skip = new ButtonBuilder()
        .setLabel(EmojiState ? emojis.skip : 'Skip')
        .setCustomId('skip')
        .setStyle('Primary');

    const resumepause = new ButtonBuilder()
        .setLabel(EmojiState ? emojis.ResumePause : 'Pause')
        .setCustomId('resume&pause')
        .setStyle('Danger');

    const stop = new ButtonBuilder()
        .setLabel(EmojiState ? emojis.stop : 'Stop')
        .setCustomId('stop')
        .setStyle('Danger');

    const volumeup = new ButtonBuilder()
        .setLabel(EmojiState ? emojis.volumeUp : "VolumeUp")
        .setCustomId("volumeUp")
        .setStyle("Secondary");

    const volumedown = new ButtonBuilder()
        .setLabel(EmojiState ? emojis.volumeDown : "VolumeDown")
        .setCustomId("volumeDown")
        .setStyle("Secondary");

    const row1 = new ActionRowBuilder().addComponents(
        volumedown,
        stop,
        resumepause,
        skip,
        volumeup
    );

    if (queue.message) {
        // If a message exists, edit the existing embed instead of sending a new one
        await queue.message.edit({ embeds: [embed], components: [row1] });
    } else {
        // If no message exists, send a new embed and store the message object
        const message = await queue.metadata.channel.send({ embeds: [embed], components: [row1] });
        queue.message = message;
    }

    queue.metadata.track = track; // Store the track in the queue metadata
};

