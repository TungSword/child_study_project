// 资源url
export const RESOURCE_URL = "https://study-resource.pages.dev";

// 拼音文本路径
const PINYIN_TEXT_PATH = "/text/pinyin"
// 拼音声音路径
const PINYIN_VOICE_PATH = "/voice/pinyin/"
// 文字路径
const CHINESE_TEXT_PATH = "/text/chinese"
// 故事路径
const STORY_TEXT_PATH = "/text/story"
const STORY_MONKEY_POLICE_PATH = "/voice/monkey_story/"

// allPinyin.json
export const ALL_PINYIN_JSON_URL = `${RESOURCE_URL}${PINYIN_TEXT_PATH}/allPinyin.json`;
// classifyPinyin.json
export const CLASSIFY_PINYIN_JSON_URL = `${RESOURCE_URL}${PINYIN_TEXT_PATH}/classifyPinyin.json`;
// chinese_poetry.json
export const CHINESE_POETRY_JSON_URL = `${RESOURCE_URL}${CHINESE_TEXT_PATH}/chinese_poetry.json`;
// monkeystory.json
export const MONKEY_STORY_JSON_URL = `${RESOURCE_URL}${STORY_TEXT_PATH}/monkeystory.json`;


// a.mp3
export function getPinyinVoiceUrl(param) {
    return `${RESOURCE_URL}${PINYIN_VOICE_PATH}${param}`
}

// 5093673257688050822.mp3
export function getMonkeyPoliceStoryUrl(param) {
    return `${RESOURCE_URL}${STORY_MONKEY_POLICE_PATH}${param}`
}








