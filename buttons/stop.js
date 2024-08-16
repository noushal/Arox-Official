const { EmbedBuilder } = require('discord.js');
const { Translate } = require('../process_tools');

module.exports = async ({ inter, queue }) => {
    if (!queue?.isPlaying()) return inter.editReply({ content: await Translate(`No music currently playing... try again ? <❌>`) });

    const currentTrack = queue.metadata.track;

    if (!currentTrack) {
        return inter.editReply({ content: await Translate(`No track information available.`) });
    }

    queue.delete(); 

    if (queue.message) {
        const embed = new EmbedBuilder()
            .setColor('#2f3136')
            .setAuthor({ name: await Translate(`Music stopped: <${currentTrack.title}> has ended. <✅>`) })
            .setThumbnail(currentTrack.thumbnail);

        queue.message.edit({ embeds: [embed] }).catch(console.error);
    }
}

