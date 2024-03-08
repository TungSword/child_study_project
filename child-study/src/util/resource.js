import servcie from './request.js'
import {
    ALL_PINYIN_JSON_URL,
    CHINESE_POETRY_JSON_URL,
    CLASSIFY_PINYIN_JSON_URL,
    MONKEY_STORY_JSON_URL
} from "@/constant/resource_constant.js";

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

function getResource(url) {
    return servcie.get(url)
}

export default {
    getAllPinyin,
    getClassifyPinyin,
    getChinesePoetry,
    getMonkeyPoliceStory
}