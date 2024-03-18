import servcie from './request.js'
import {
    ALL_PINYIN_JSON_URL,
    CERRO_ULTRAMAN_STORY_JSON_URL,
    CHINESE_POETRY_JSON_URL,
    CLASSIFY_PINYIN_JSON_URL,
    MONKEY_STORY_JSON_URL,
    getPinyinVoiceUrl,
    getMonkeyPoliceStoryUrl,
    getEnglishLetterUrl
} from "@/constant/resource_constant.js";

import {queryData, saveData} from '@/util/indexeddb.js'

function getResource(url) {
    return new Promise(resolve => {
        const result = sessionStorage.getItem(url)
        if (result){
            resolve(JSON.parse(result));
        }else {
            servcie.get(url).then(response => {
                sessionStorage.setItem(url, JSON.stringify(response))
                resolve(response)
            })
        }
    })
}

function getAllPinyin() {
    return getResource(ALL_PINYIN_JSON_URL);
}

function getClassifyPinyin() {
    return getResource(CLASSIFY_PINYIN_JSON_URL)
}

function getChinesePoetry() {
    return getResource(CHINESE_POETRY_JSON_URL)
}

function getMonkeyPoliceStory() {
    return getResource(MONKEY_STORY_JSON_URL)
}

function getCerroUltramanStory() {
    return getResource(CERRO_ULTRAMAN_STORY_JSON_URL)
}

const dbName = "voice_data_store"

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

async function getBigVoiceUrl(url){
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

async function getPinyinVoiceCacheUrl(param){
    const url = getPinyinVoiceUrl(param);
    return await getVoiceUrl(url);
}

async function getMonkeyPoliceStoryCacheUrl(param){
    const url = getMonkeyPoliceStoryUrl(param);
    return await getBigVoiceUrl(url);
}

async function getEnglishLetterCacheUrl(param){
    const url = getEnglishLetterUrl(param);
    return await getVoiceUrl(url);
}

export default {
    getAllPinyin,
    getClassifyPinyin,
    getChinesePoetry,
    getMonkeyPoliceStory,
    getCerroUltramanStory,
    getPinyinVoiceCacheUrl,
    getMonkeyPoliceStoryCacheUrl,
    getEnglishLetterCacheUrl
}