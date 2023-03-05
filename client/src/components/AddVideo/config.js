
// source: https://stackoverflow.com/a/73967162
// @ params - full youtube video url
// returns - youtube video id

const YOUTUBE_LINK_REGEX = /^(?:(?:https|http):\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be).*(?<=\/|v\/|u\/|embed\/|shorts\/|watch\?v=)(?<!\/user\/)(?<id>[\w\-]{11})(?=\?|&|$)/;  // eslint-disable-line no-useless-escape
export function getYoutubeIdFromFullLink(link) {
    const testLink = link.trim().match(YOUTUBE_LINK_REGEX);
    return testLink ? testLink.groups.id : false;
}

