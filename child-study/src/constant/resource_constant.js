// 资源url
export const RESOURCE_URL = "https://study-json-resource.pages.dev";
export const VOICE_RESOURCE_URL = "https://study-resource.pages.dev"

// 拼音路径
const PINYIN_PATH = "/chinese/pinyin/";

// 诗歌路径
const CHINESE_POETRY_PATH = "/chinese/poetry/"

// 故事路径
const RELAX_STORY_PATH = "/relax/story/"
const RELAX_VOICE_PATH = "/relax/voice/"
const RELAX_BILIB_PATH = "/relax/bilibili/";

// 英语
const ENGLISH_LETTER_PATH = "/english/letters/"
const ENGLISH_STANDARD_PATH = "/english/english_standard/"

// 自然拼读
const PHONICS_JSON_PATH = "/english/phonics/";
const PHONICS_VIDEO_PATH = "/english/phonics/";
const WORD_VIDEO_PATH = "/english/words/";

// 数学
const MATH_PATH = "/math/"

// 图片
const IMAGE_PATH = "/image/";

// allPinyin.json
export const ALL_PINYIN_JSON_URL = `${RESOURCE_URL}${PINYIN_PATH}allPinyin.json`;

// classifyPinyin.json
export const CLASSIFY_PINYIN_JSON_URL = `${RESOURCE_URL}${PINYIN_PATH}classifyPinyin.json`;
export const XIAO_XUE_POETRY_JSON_URL = `${RESOURCE_URL}${CHINESE_POETRY_PATH}xiaoxue_poetry.json`;
export const XIAO_XUE_CLASSICAL_CHINESE_URL = `${RESOURCE_URL}${CHINESE_POETRY_PATH}xiaoxue_classical_chinese.json`;
export const CHUZHONG_POETRY_JSON_URL = `${RESOURCE_URL}${CHINESE_POETRY_PATH}chuzhong_poetry.json`;
export const CHUZHONG_CLASSICAL_CHINESE_URL = `${RESOURCE_URL}${CHINESE_POETRY_PATH}chuzhong_classical_chinese.json`;
export const GAOZHONG_POETRY_JSON_URL = `${RESOURCE_URL}${CHINESE_POETRY_PATH}gaozhong_poetry.json`;
export const GAOZHONG_CLASSICAL_CHINESE_URL = `${RESOURCE_URL}${CHINESE_POETRY_PATH}gaozhong_classical_chinese.json`;
export const CHINESE_SHIJING_JSON_URL = `${RESOURCE_URL}${CHINESE_POETRY_PATH}chinese_shijing.json`;

// shudu.json
export const MATH_SHUDU_URL = `${RESOURCE_URL}${MATH_PATH}shudu.json`;

// english_standard.json
export const ENGLISH_STANDARD_URL = `${RESOURCE_URL}${ENGLISH_STANDARD_PATH}english_standard.json`;

// monkeystory.json
export const MONKEY_STORY_JSON_URL = `${RESOURCE_URL}${RELAX_STORY_PATH}monkey_police_story.json`;
// cerro_ultraman_story.json
export const ULTRAMAN_STORY_JSON_URL = `${RESOURCE_URL}${RELAX_STORY_PATH}ultraman_story.json`;

// B站视频资源
export const GIGANTOSAURUS_VIDEO_URL = `${RESOURCE_URL}${RELAX_BILIB_PATH}gigantosaurus_video.json`;
export const PENELOPE_VIDEO_URL = `${RESOURCE_URL}${RELAX_BILIB_PATH}penelope_video.json`;
export const SHANGHAI_OPERA_VIDEO_URL = `${RESOURCE_URL}${RELAX_BILIB_PATH}shanghai_opera_video.json`;

// 图片资源
export const PAYMENT_CODE_WECHAT = `${RESOURCE_URL}${IMAGE_PATH}payment_code_wechat.jpg`;
export const PAYMENT_CODE_ZFB = `${RESOURCE_URL}${IMAGE_PATH}payment_code_zfb.jpg`;


// a.mp3
export function getPinyinVoiceUrl(param) {
    return `${VOICE_RESOURCE_URL}${PINYIN_PATH}voice/${param}`
}

// 5093673257688050822.mp3
export function getMonkeyPoliceStoryUrl(param) {
    return `${VOICE_RESOURCE_URL}${RELAX_VOICE_PATH}monkey_police/${param}.mp3`
}

// a.mp3
export function getEnglishLetterUrl(param) {
    return `${VOICE_RESOURCE_URL}${ENGLISH_LETTER_PATH}${param}.mp3`
}

// 3.mp3
export function getEnglishStandardUrl(param) {
    return `${VOICE_RESOURCE_URL}${ENGLISH_STANDARD_PATH}${param}.mp3`
}

export function getWordVideoUrl(word) {
    return `${VOICE_RESOURCE_URL}${WORD_VIDEO_PATH}${word}`
}

export function getPhonicsVideoUrl(video) {
    return `${VOICE_RESOURCE_URL}${PHONICS_VIDEO_PATH}${video}`
}

export function getPhonicsJsonUrl(phonics) {
    return `${RESOURCE_URL}${PHONICS_JSON_PATH}${phonics}.json`
}