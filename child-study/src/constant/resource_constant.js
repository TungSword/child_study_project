// 资源url
export const RESOURCE_URL = "https://study-resource.pages.dev";

// 拼音路径
const PINYIN_PATH = "/chinese/pinyin/";

// 诗歌路径
const CHINESE_POETRY_PATH = "/chinese/poetry/"

// 故事路径
const RELAX_STORY_PATH = "/relax/story/"
const RELAX_VOICE_PATH = "/relax/voice/"

// 英语
const ENGLISH_LETTER_PATH = "/english/letters/"

// allPinyin.json
export const ALL_PINYIN_JSON_URL = `${RESOURCE_URL}${PINYIN_PATH}allPinyin.json`;
// classifyPinyin.json
export const CLASSIFY_PINYIN_JSON_URL = `${RESOURCE_URL}${PINYIN_PATH}classifyPinyin.json`;
// chinese_poetry.json
export const CHINESE_POETRY_JSON_URL = `${RESOURCE_URL}${CHINESE_POETRY_PATH}chinese_poetry.json`;
// monkeystory.json
export const MONKEY_STORY_JSON_URL = `${RESOURCE_URL}${RELAX_STORY_PATH}monkey_police_story.json`;

export const CERRO_ULTRAMAN_STORY_JSON_URL = `${RESOURCE_URL}${RELAX_STORY_PATH}cerro_ultraman_story.json`;

// a.mp3
export function getPinyinVoiceUrl(param) {
    return `${RESOURCE_URL}${PINYIN_PATH}voice/${param}`
}

// 5093673257688050822.mp3
export function getMonkeyPoliceStoryUrl(param) {
    return `${RESOURCE_URL}${RELAX_VOICE_PATH}monkey_police/${param}.mp3`
}

// a.mp3
export function getEnglishLetterUrl(param){
    return `${RESOURCE_URL}${ENGLISH_LETTER_PATH}${param}.mp3`
}








