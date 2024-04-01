import servcie from './request.js'
import {
    ALL_PINYIN_JSON_URL,
    CHINESE_SHIJING_JSON_URL,
    CHUZHONG_CLASSICAL_CHINESE_URL,
    CHUZHONG_POETRY_JSON_URL,
    CLASSIFY_PINYIN_JSON_URL,
    ENGLISH_STANDARD_URL,
    GAOZHONG_CLASSICAL_CHINESE_URL,
    GAOZHONG_POETRY_JSON_URL,
    getEnglishLetterUrl,
    getEnglishStandardUrl,
    getMonkeyPoliceStoryUrl,
    getPinyinVoiceUrl,
    MATH_SHUDU_URL,
    MONKEY_STORY_JSON_URL,
    ULTRAMAN_STORY_JSON_URL,
    XIAO_XUE_CLASSICAL_CHINESE_URL,
    XIAO_XUE_POETRY_JSON_URL,
} from "@/constant/resource_constant.js";
import {queryData, saveData} from '@/util/indexeddb.js'

const dbName = "voice_data_store"

function getResource(url) {
    return new Promise(resolve => {
        const result = sessionStorage.getItem(url)
        if (result) {
            resolve(JSON.parse(result));
        } else {
            servcie.get(url).then(response => {
                sessionStorage.setItem(url, JSON.stringify(response))
                resolve(response)
            })
        }
    })
}

async function getVoiceUrl(url) {
    const result = await queryData(dbName, url)
    if (result) {
        return URL.createObjectURL(result.data);
    }
    const response = await servcie.get(url, {responseType: 'blob'});
    if (response) {
        saveData(dbName, {
            url: url,
            data: response
        })
        return URL.createObjectURL(response);
    }
    return url;
}

async function getBigVoiceUrl(url) {
    const result = await queryData(dbName, url)
    if (result) {
        return URL.createObjectURL(result.data);
    }
    setTimeout(() => {
        servcie.get(url, {responseType: 'blob'}).then(response => {
            saveData(dbName, {
                url: url,
                data: response
            })
        })
    }, 1000)
    return url;
}

export function getAllPinyin() {
    return getResource(ALL_PINYIN_JSON_URL);
}

export function getClassifyPinyin() {
    return getResource(CLASSIFY_PINYIN_JSON_URL)
}

export function getXiaoXuePoetry() {
    return getResource(XIAO_XUE_POETRY_JSON_URL)
}

export function getXiaoXueClassicalChinese() {
    return getResource(XIAO_XUE_CLASSICAL_CHINESE_URL)
}

export function getChuZhongPoetry() {
    return getResource(CHUZHONG_POETRY_JSON_URL)
}

export function getChuZhongClassicalChinese() {
    return getResource(CHUZHONG_CLASSICAL_CHINESE_URL)
}

export function getGaoZhongPoetry() {
    return getResource(GAOZHONG_POETRY_JSON_URL)
}

export function getGaoZhongClassicalChinese() {
    return getResource(GAOZHONG_CLASSICAL_CHINESE_URL)
}

export function getChineseShijing() {
    return getResource(CHINESE_SHIJING_JSON_URL)
}

export function getEnglishStandard() {
    return getResource(ENGLISH_STANDARD_URL)
}

export function getMonkeyPoliceStory() {
    return getResource(MONKEY_STORY_JSON_URL)
}

export function getUltramanStory() {
    return getResource(ULTRAMAN_STORY_JSON_URL)
}

export function getMathShudu() {
    return getResource(MATH_SHUDU_URL)
}


export async function getPinyinVoiceCacheUrl(param) {
    const url = getPinyinVoiceUrl(param);
    return await getVoiceUrl(url);
}

export async function getMonkeyPoliceStoryCacheUrl(param) {
    const url = getMonkeyPoliceStoryUrl(param);
    return await getBigVoiceUrl(url);
}

export async function getEnglishLetterCacheUrl(param) {
    const url = getEnglishLetterUrl(param);
    return await getVoiceUrl(url);
}

export async function getEnglishStandardCacheUrl(param) {
    const url = getEnglishStandardUrl(param);
    return await getVoiceUrl(url)
}