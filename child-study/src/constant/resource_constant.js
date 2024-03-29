// 资源url
export const RESOURCE_URL = "https://study-json-resource.pages.dev";
export const VOICE_RESOURCE_URL="https://study-resource.pages.dev"

// 拼音路径
const PINYIN_PATH = "/chinese/pinyin/";

// 诗歌路径
const CHINESE_POETRY_PATH = "/chinese/poetry/"

// 故事路径
const RELAX_STORY_PATH = "/relax/story/"
const RELAX_VOICE_PATH = "/relax/voice/"

// 英语
const ENGLISH_LETTER_PATH = "/english/letters/"
const ENGLISH_STANDARD_PATH = "/english/english_standard/"
// 数学
const MATH_PATH = "/math/"

// allPinyin.json
export const ALL_PINYIN_JSON_URL = `${RESOURCE_URL}${PINYIN_PATH}allPinyin.json`;
// classifyPinyin.json
export const CLASSIFY_PINYIN_JSON_URL = `${RESOURCE_URL}${PINYIN_PATH}classifyPinyin.json`;
export const XIAO_XUE_POETRY_JSON_URL = `${RESOURCE_URL}${CHINESE_POETRY_PATH}xiaoxue_poetry.json`;
export const XIAO_XUE_CLASSICAL_CHINESE_URL = `${RESOURCE_URL}${CHINESE_POETRY_PATH}xiaoxue_classical_chinese.json`;
// shudu.json
export const MATH_SHUDU_URL = `${RESOURCE_URL}${MATH_PATH}shudu.json`;

// english_standard.json
export const ENGLISH_STANDARD_URL = `${RESOURCE_URL}${ENGLISH_STANDARD_PATH}english_standard.json`;

// monkeystory.json
export const MONKEY_STORY_JSON_URL = `${RESOURCE_URL}${RELAX_STORY_PATH}monkey_police_story.json`;
// cerro_ultraman_story.json
export const ULTRAMAN_STORY_JSON_URL = `${RESOURCE_URL}${RELAX_STORY_PATH}ultraman_story.json`;


// a.mp3
export function getPinyinVoiceUrl(param) {
    return `${VOICE_RESOURCE_URL}${PINYIN_PATH}voice/${param}`
}

// 5093673257688050822.mp3
export function getMonkeyPoliceStoryUrl(param) {
    return `${VOICE_RESOURCE_URL}${RELAX_VOICE_PATH}monkey_police/${param}.mp3`
}

// a.mp3
export function getEnglishLetterUrl(param){
    return `${VOICE_RESOURCE_URL}${ENGLISH_LETTER_PATH}${param}.mp3`
}

// 3.mp3
export function getEnglishStandardUrl(param){
    return `${VOICE_RESOURCE_URL}${ENGLISH_STANDARD_PATH}${param}.mp3`
}








