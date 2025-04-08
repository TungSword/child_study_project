export const content_list = [
    {
        name: "数学加减法",
        component: "mathCalc",
        show: true,
        subject: 'math'
    },
    {
        name: "数学乘除法",
        component: "mathCalcMulti",
        show: true,
        subject: 'math'
    },
    {
        name: "九九乘法表",
        component: "mathMultiTable",
        show: true,
        subject: 'math'
    },
    {
        name: "数独",
        component: "mathSudoku",
        show: true,
        subject: 'math'
    },
    {
        name: "拼音",
        component: "classifyPinyin",
        show: true,
        subject: 'chinese'
    },
    {
        name: "拼音顺序卡片",
        component: "orderPinyin",
        show: true,
        subject: 'chinese'
    },
    {
        name: "拼音随机卡片",
        component: "randomPinyin",
        show: true,
        subject: 'chinese'
    },
    {
        name: "唐诗三百首",
        component: "chinesePoetry",
        show: true,
        subject: 'chinese'
    },
    {
        name: "英文字母",
        component: "english_letters",
        show: true,
        subject: 'english'
    },
    {
        name: "英文英标",
        component: "english_standard",
        show: true,
        subject: 'english'
    },
    {
        name: "自然拼读",
        component: "english_phonics",
        show: true,
        subject: 'english',
    },
    {
        name: "蓝色小考拉",
        component: "penelope",
        show: true,
        subject: 'english',
    },
    {
        name: "小恐龙大冒险",
        component: "gigantosaurus",
        show: true,
        subject: 'english',
    },
    {
        name: "奥特曼故事",
        component: "ultraman_story",
        show: true,
        subject: 'relax',
        owner: ['小於']
    },
    {
        name: "猴子警长探案记",
        component: "monkeyPoliceStory",
        show: false,
        subject: 'relax',
        owner: ['小於']
    },
    {
        name: "哈利 · 波特",
        component: "harryPotter",
        show: true,
        subject: 'relax',
        owner: ['小於']
    },
    {
        name: "速算卡片",
        component: "mathCalculationCard",
        type: "content",
        show: true,
        subject: 'math'
    }
]

export const category_content_list = [
    {
        name: "幼儿园",
        show: true,
        type: "group",
        depth: 1,
        subContents: [
            {
                name: "数学加减法",
                component: "mathCalc",
                type: "content",
                depth: 2,
                show: true,
                subject: 'math'
            },
            {
                name: "拼音",
                component: "classifyPinyin",
                type: "content",
                depth: 2,
                show: true,
                subject: 'chinese'
            },
            {
                name: "拼音顺序卡片",
                component: "orderPinyin",
                type: "content",
                depth: 2,
                show: true,
                subject: 'chinese'
            },
            {
                name: "拼音随机卡片",
                component: "randomPinyin",
                type: "content",
                depth: 2,
                show: true,
                subject: 'chinese'
            },
            {
                name: "英文字母",
                component: "english_letters",
                type: "content",
                depth: 2,
                show: true,
                subject: 'english'
            },
            {
                name: "英文英标",
                component: "english_standard",
                type: "content",
                depth: 2,
                show: true,
                subject: 'english'
            },
            {
                name: "自然拼读",
                component: "english_phonics",
                type: "content",
                depth: 2,
                show: true,
                subject: 'english',
            },
            {
                name: "蓝色小考拉",
                component: "penelope",
                type: "content",
                depth: 2,
                show: true,
                subject: 'english',
            },
            {
                name: "小恐龙大冒险",
                component: "gigantosaurus",
                type: "content",
                depth: 2,
                show: true,
                subject: 'english',
            },
        ]
    },
    {
        name: "小学",
        show: false,
        type: "group",
        depth: 1,
        subContents: [
            {
                name: "数学乘除法",
                component: "mathCalcMulti",
                type: "content",
                depth: 2,
                show: true,
                subject: 'math'
            },
            {
                name: "九九乘法表",
                component: "mathMultiTable",
                type: "content",
                depth: 2,
                show: true,
                subject: 'math'
            },
            {
                name: "唐诗三百首",
                component: "chinesePoetry",
                type: "content",
                depth: 2,
                show: true,
                subject: 'chinese'
            },
            {
                name: "速算卡片",
                component: "mathCalculationCard",
                type: "content",
                depth: 2,
                show: true,
                subject: 'math'
            }
        ]
    },
    {
        name: "娱乐",
        show: false,
        type: "group",
        depth: 1,
        subContents:[
              {
                name: "数独",
                component: "mathSudoku",
                show: true,
                subject: 'math'
            },
            {
                name: "奥特曼故事",
                component: "ultraman_story",
                type: "content",
                depth: 2,
                show: true,
                subject: 'relax',
                owner: ['小於']
            },
            {
                name: "猴子警长探案记",
                component: "monkeyPoliceStory",
                type: "content",
                depth: 2,
                show: false,
                subject: 'relax',
                owner: ['小於']
            },
            {
                name: "哈利 · 波特",
                component: "harryPotter",
                type: "content",
                depth: 2,
                show: true,
                subject: 'relax',
                owner: ['小於']
            }
        ]
    }
]


export const opera_content_list = [
    {
        name: "沪剧",
        component: "shanghai_opera",
        show: true,
    },
    {
        name: "黄梅戏",
        component: "huangmei_opera",
        show: true,
    }
]

