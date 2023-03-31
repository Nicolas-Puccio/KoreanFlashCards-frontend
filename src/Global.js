export let Globals = {}

//why do i have to use export instead of setting exports?

export const fetchData = async (setDataInitialized) => {

    if (Globals.$words) // data already initialized
        return


    Globals = {
        $stats: JSON.parse(localStorage.getItem('stats')) ?? { score: [], reviewed: [] },
        $words: JSON.parse(localStorage.getItem('words')) ?? [],
        $songs: JSON.parse(localStorage.getItem('songs')) ?? [],

        setWordsToReview: undefined, // set by review-page
        setSelectedSong: undefined // set by songs-page
    }

    // parses all string dates into Date
    Globals.$stats.score?.forEach(stat => {
        stat.next = new Date(stat.next)
    })



    // fetches songs and words
    try {
        const res = await fetch('http://localhost:3001/api/song/')

        if (res) {
            const json = await res.json()

            Globals.$words = json.words
            Globals.$songs = json.songs
        }
    } catch (err) {
        console.error(err)
        Globals = hardcodedData
    }



    // filters out unused words //consider: optimize
    Globals.$words = Globals.$words.filter(word => {
        for (let x = 0; x < Globals.$songs.length; x++) {
            for (let i = 0; i < Globals.$songs[x].lines.length; i++) {
                for (let j = 0; j < Globals.$songs[x].lines[i].structures?.length; j++) {
                    for (let y = 0; y < Globals.$songs[x].lines[i].structures[j].words.length; y++) {
                        if (word.word === Globals.$songs[x].lines[i].structures[j].words[y].word)
                            return true
                    }
                }
            }
        }
        return false
    })



    localStorage.setItem('songs', JSON.stringify(Globals.$songs))
    localStorage.setItem('words', JSON.stringify(Globals.$words))


    setDataInitialized(true)
}

const hardcodedData = {
    '$songs': [
        {
            "_id": "6352b7bd3fb492bcfcb82401",
            "title": "민수 - 섬",
            "lines": [
                {
                    "translation": "let's go to an island just the two of us",
                    "structures": [
                        {
                            "words": [
                                {
                                    "written": "섬",
                                    "meaning": "Noun-island",
                                    "word": "섬"
                                },
                                {
                                    "written": "으로",
                                    "meaning": "Particle-Towards / by means of / made of / because of / as"
                                }
                            ],
                            "written": "섬으로"
                        },
                        {
                            "words": [
                                {
                                    "written": "가",
                                    "meaning": "Action Verb-go",
                                    "word": "가다"
                                },
                                {
                                    "written": "아요",
                                    "meaning": "Sentence end-Polite informal style ending"
                                }
                            ],
                            "written": "가요"
                        },
                        {
                            "words": [
                                {
                                    "written": "둘",
                                    "meaning": "Number-two",
                                    "word": "둘"
                                },
                                {
                                    "written": "이",
                                    "meaning": "Particle-Subject-marking particle"
                                }
                            ],
                            "written": "둘이"
                        }
                    ]
                },
                {
                    "translation": "in the middle of the ocean",
                    "structures": [
                        {
                            "words": [
                                {
                                    "written": "바다",
                                    "meaning": "Noun-sea",
                                    "word": "바다"
                                },
                                {
                                    "written": "로",
                                    "meaning": "Particle-Towards / by means of / made of / because of / as"
                                }
                            ],
                            "written": "바다로"
                        },
                        {
                            "words": [
                                {
                                    "written": "둘러싸이",
                                    "meaning": "Action Verb-be surrounded",
                                    "word": "둘러싸이다"
                                },
                                {
                                    "written": "ㄴ",
                                    "meaning": "Suffix-Adjective-forming particle"
                                }
                            ],
                            "written": "둘러쌓인"
                        }
                    ]
                },
                {
                    "translation": "let's go to a place where our time seems to stop",
                    "structures": [
                        {
                            "words": [
                                {
                                    "written": "우리",
                                    "meaning": "Pronoun-we",
                                    "word": "우리"
                                },
                                {
                                    "written": "의",
                                    "meaning": "Particle-Possesive particle"
                                }
                            ],
                            "written": "우리의"
                        },
                        {
                            "words": [
                                {
                                    "written": "시간",
                                    "meaning": "Noun-time",
                                    "word": "시간"
                                },
                                {
                                    "written": "이",
                                    "meaning": "Particle-Subject-maring particle"
                                }
                            ],
                            "written": "시간이"
                        },
                        {
                            "words": [
                                {
                                    "written": "멈추",
                                    "meaning": "Action Verb-stop",
                                    "word": "멈추다"
                                },
                                {
                                    "written": "ㄹ 것 같",
                                    "meaning": "Auxiliary verb-To seem like - ~ it seems / I think"
                                },
                                {
                                    "written": "은",
                                    "meaning": "Suffix-Adjective-forming particle"
                                }
                            ],
                            "written": "멈출 것 같은"
                        },
                        {
                            "words": [
                                {
                                    "written": "곳",
                                    "meaning": "Noun-spot",
                                    "word": "곳"
                                },
                                {
                                    "written": "으로",
                                    "meaning": "Particle-Towards / by means of / made of / because of / as"
                                }
                            ],
                            "written": "곳으로"
                        },
                        {
                            "words": [
                                {
                                    "written": "가",
                                    "meaning": "Action Verb-go",
                                    "word": "가다"
                                },
                                {
                                    "written": "아요",
                                    "meaning": "Sentence end-Polite informal style ending"
                                }
                            ],
                            "written": "가요"
                        }
                    ]
                },
                {},
                {
                    "translation": "you don't need anything special",
                    "structures": [
                        {
                            "words": [
                                {
                                    "written": "별",
                                    "meaning": "Determiner-specific",
                                    "word": "별"
                                }
                            ],
                            "written": "별"
                        },
                        {
                            "words": [
                                {
                                    "written": "것",
                                    "meaning": "Bound noun-something",
                                    "word": "것"
                                }
                            ],
                            "written": "거"
                        },
                        {
                            "words": [
                                {
                                    "written": "없",
                                    "meaning": "Descriptive Verb-non-existent",
                                    "word": "없다"
                                },
                                {
                                    "written": "어도 되",
                                    "meaning": "Auxiliary verb-Doesm't Matter If"
                                },
                                {
                                    "written": "어요",
                                    "meaning": "Sentence end-Polite informal style ending"
                                }
                            ],
                            "written": "없어도 돼요"
                        }
                    ]
                },
                {
                    "translation": "don't get ready",
                    "structures": [
                        {
                            "words": [
                                {
                                    "written": "준비하",
                                    "meaning": "Action verb-get ready",
                                    "word": "준비하다"
                                },
                                {
                                    "written": "지 말",
                                    "meaning": "Auxiliary verb-Don't"
                                },
                                {
                                    "written": "구요",
                                    "meaning": "Sentence end-Polite informal style ending???"
                                }
                            ],
                            "written": "준비하지 말구요"
                        }
                    ]
                },
                {
                    "translation": "I wish I could be without any worries",
                    "structures": [
                        {
                            "words": [
                                {
                                    "written": "아무",
                                    "meaning": "Determiner-any",
                                    "word": "아무"
                                }
                            ],
                            "written": "아무"
                        },
                        {
                            "words": [
                                {
                                    "written": "걱정",
                                    "meaning": "Noun-worry",
                                    "word": "걱정"
                                }
                            ],
                            "written": "걱정"
                        },
                        {
                            "words": [
                                {
                                    "written": "없",
                                    "meaning": "Descriptive Verb-non-existent",
                                    "word": "없다"
                                },
                                {
                                    "written": "는",
                                    "meaning": "Suffix-Adjective-forming particle"
                                }
                            ],
                            "written": "없는"
                        },
                        {
                            "words": [
                                {
                                    "written": "상태",
                                    "meaning": "Noun-condition",
                                    "word": "상태"
                                },
                                {
                                    "written": "가",
                                    "meaning": "Particle-Complement-marking particle"
                                }
                            ],
                            "written": "상태가"
                        },
                        {
                            "words": [
                                {
                                    "written": "되",
                                    "meaning": "Action Verb-become",
                                    "word": "되다"
                                },
                                {
                                    "written": "면 좋겠",
                                    "meaning": "Auxiliary verb-I wish, I hope"
                                },
                                {
                                    "written": "어요",
                                    "meaning": "Sentence end-Polite informal style ending"
                                }
                            ],
                            "written": "되면 좋겠어요"
                        }
                    ]
                },
                {},
                {
                    "translation": "we can go far",
                    "structures": [
                        {
                            "words": [
                                {
                                    "written": "멀리",
                                    "meaning": "Adverb-far",
                                    "word": "멀리"
                                }
                            ],
                            "written": "멀리"
                        },
                        {
                            "words": [
                                {
                                    "written": "가",
                                    "meaning": "Action Verb-go",
                                    "word": "가다"
                                },
                                {
                                    "written": "아도 되",
                                    "meaning": "Auxiliary Verb-Dpesn't Matter If"
                                },
                                {
                                    "written": "어요",
                                    "meaning": "Sentence end-Polite informal style ending"
                                }
                            ],
                            "written": "가도 돼요"
                        }
                    ]
                },
                {
                    "translation": "I'm not afraid",
                    "structures": [
                        {
                            "words": [
                                {
                                    "written": "무섭",
                                    "meaning": "Descriptive Verb-scared",
                                    "word": "무섭다"
                                },
                                {
                                    "written": "지 않",
                                    "meaning": "Negative form-Negation"
                                },
                                {
                                    "written": "어요",
                                    "meaning": "Sentence end-Polite informal style ending"
                                }
                            ],
                            "written": "무섭지 않아요"
                        }
                    ]
                },
                {
                    "translation": "just promise me you won't let go of my hand",
                    "structures": [
                        {
                            "words": [
                                {
                                    "written": "손",
                                    "meaning": "Noun-hand",
                                    "word": "손"
                                }
                            ],
                            "written": "손"
                        },
                        {
                            "words": [
                                {
                                    "written": "놓",
                                    "meaning": "Action Verb-let go",
                                    "word": "놓다"
                                },
                                {
                                    "written": "지 않",
                                    "meaning": "Negative form-Negation"
                                },
                                {
                                    "written": "는다고",
                                    "meaning": "Connector-As / As It Is Said"
                                }
                            ],
                            "written": "놓지 않는다고"
                        },
                        {
                            "words": [
                                {
                                    "written": "약속",
                                    "meaning": "Noun-promise",
                                    "word": "약속"
                                },
                                {
                                    "written": "만",
                                    "meaning": "Particle-Only / Just"
                                }
                            ],
                            "written": "약속만"
                        },
                        {
                            "words": [
                                {
                                    "written": "하",
                                    "meaning": "Action Verb-do",
                                    "word": "하다"
                                },
                                {
                                    "written": "여주",
                                    "meaning": "Auxiliary verb-Do a favor for someone"
                                },
                                {
                                    "written": "어요",
                                    "meaning": "Sentence end-Polite informal style ending"
                                }
                            ],
                            "written": "해줘요"
                        }
                    ]
                }
            ],
            "__v": 1,
            "totalWords": 23,
            "newWords": 0,
            "wordsToReview": 0,
            "knownWords": 23
        },
        {
            "_id": "63bb840e92bfadac1fa42f94",
            "title": "바이바이배드맨 - 너의 파도",
            "lines": [
                {
                    "translation": "will it still remain?",
                    "structures": [
                        {
                            "words": [
                                {
                                    "word": "아직",
                                    "written": "아직",
                                    "meaning": "Adverb-still",
                                    "_id": "63a631f13dc53b7a789b8910"
                                }
                            ],
                            "written": "아직",
                            "_id": "63a631f13dc53b7a789b890f"
                        },
                        {
                            "words": [
                                {
                                    "word": "남다",
                                    "written": "남",
                                    "meaning": "Action Verb-remain",
                                    "_id": "63a631f13dc53b7a789b8912"
                                },
                                {
                                    "word": "",
                                    "written": "아있",
                                    "meaning": "Auxiliary verb-Remain (in a certain state)",
                                    "_id": "63a631f13dc53b7a789b8913"
                                },
                                {
                                    "word": "",
                                    "written": "을까",
                                    "meaning": "Sentence end-Tentative guessing or suggestion",
                                    "_id": "63a631f13dc53b7a789b8914"
                                }
                            ],
                            "written": "남아있을까",
                            "_id": "63a631f13dc53b7a789b8911"
                        }
                    ]
                },
                {
                    "translation": "The faded me in your memories",
                    "structures": [
                        {
                            "words": [
                                {
                                    "word": "너",
                                    "written": "너",
                                    "meaning": "Pronoun-you",
                                    "_id": "63ba0a45c4839f04f8e02133"
                                },
                                {
                                    "word": "",
                                    "written": "의",
                                    "meaning": "Particle-Possesive particle",
                                    "_id": "63ba0a45c4839f04f8e02134"
                                }
                            ],
                            "written": "너의",
                            "_id": "63ba0a45c4839f04f8e02132"
                        },
                        {
                            "words": [
                                {
                                    "word": "기억",
                                    "written": "기억",
                                    "meaning": "Noun-memory",
                                    "_id": "63ba0a45c4839f04f8e02136"
                                }
                            ],
                            "written": "기억",
                            "_id": "63ba0a45c4839f04f8e02135"
                        },
                        {
                            "words": [
                                {
                                    "word": "속",
                                    "written": "속",
                                    "meaning": "Noun-inside",
                                    "_id": "63ba0a45c4839f04f8e02139"
                                },
                                {
                                    "word": "",
                                    "written": "의",
                                    "meaning": "Particle-Possesive particle",
                                    "_id": "63ba0a45c4839f04f8e0213a"
                                }
                            ],
                            "written": "속의",
                            "_id": "63ba0a45c4839f04f8e02138"
                        },
                        {
                            "words": [
                                {
                                    "word": "희미하다",
                                    "written": "희미하",
                                    "meaning": "Descriptive verb-faded",
                                    "_id": "63ba0a45c4839f04f8e0213c"
                                },
                                {
                                    "word": "",
                                    "written": "여지",
                                    "meaning": "Verb-forming auxiliary-Become",
                                    "_id": "63ba0a45c4839f04f8e0213d"
                                },
                                {
                                    "word": "",
                                    "written": "ㄴ",
                                    "meaning": "Suffix-Adjective-forming particle",
                                    "_id": "63ba0a45c4839f04f8e0213e"
                                }
                            ],
                            "written": "희미해진",
                            "_id": "63ba0a45c4839f04f8e0213b"
                        },
                        {
                            "words": [
                                {
                                    "word": "나",
                                    "written": "나",
                                    "meaning": "Pronoun-I, Me",
                                    "_id": "63ba0a45c4839f04f8e02140"
                                }
                            ],
                            "written": "나",
                            "_id": "63ba0a45c4839f04f8e0213f"
                        }
                    ]
                },
                {
                    "translation": "I just disappear",
                    "structures": [
                        {
                            "words": [
                                {
                                    "word": "단지",
                                    "written": "단지",
                                    "meaning": "Adverb-just"
                                }
                            ],
                            "written": "단지"
                        },
                        {
                            "words": [
                                {
                                    "word": "사라지다",
                                    "written": "사라지",
                                    "meaning": "Action Verb-dissapear"
                                },
                                {
                                    "word": "",
                                    "written": "ㄹ 뿐이",
                                    "meaning": "Auxiliary verb-Just"
                                },
                                {
                                    "word": "",
                                    "written": "야",
                                    "meaning": "Sentence end-Intimate style sentence ending"
                                }
                            ],
                            "written": "사라질 뿐이야"
                        }
                    ]
                },
                {
                    "translation": "A hot day in our hearts",
                    "structures": [
                        {
                            "words": [
                                {
                                    "word": "우리",
                                    "written": "우리",
                                    "meaning": "Pronoun-our",
                                    "_id": "63bb7fcb14ea0783ab07eb69"
                                }
                            ],
                            "written": "우리",
                            "_id": "63bb7fcb14ea0783ab07eb68"
                        },
                        {
                            "words": [
                                {
                                    "word": "가슴",
                                    "written": "가슴",
                                    "meaning": "Noun-heart",
                                    "_id": "63bb7fcb14ea0783ab07eb6b"
                                }
                            ],
                            "written": "가슴",
                            "_id": "63bb7fcb14ea0783ab07eb6a"
                        },
                        {
                            "words": [
                                {
                                    "word": "속",
                                    "written": "속",
                                    "meaning": "Noun-inside",
                                    "_id": "63bb7fcb14ea0783ab07eb6d"
                                },
                                {
                                    "word": "",
                                    "written": "의",
                                    "meaning": "Particle-Possesive particle",
                                    "_id": "63bb7fcb14ea0783ab07eb6e"
                                }
                            ],
                            "written": "속의",
                            "_id": "63bb7fcb14ea0783ab07eb6c"
                        },
                        {
                            "words": [
                                {
                                    "word": "뜨겁다",
                                    "written": "뜨겁",
                                    "meaning": "Descriptive Verb-hot",
                                    "_id": "63bb7fcb14ea0783ab07eb70"
                                },
                                {
                                    "word": "",
                                    "written": "었던",
                                    "meaning": "Modifier-that one did/was (but not now)",
                                    "_id": "63bb7fcb14ea0783ab07eb71"
                                }
                            ],
                            "written": "뜨거웠던",
                            "_id": "63bb7fcb14ea0783ab07eb6f"
                        },
                        {
                            "words": [
                                {
                                    "word": "날",
                                    "written": "날",
                                    "meaning": "Noun-day",
                                    "_id": "63bb7fcb14ea0783ab07eb73"
                                }
                            ],
                            "written": "날",
                            "_id": "63bb7fcb14ea0783ab07eb72"
                        }
                    ]
                },
                {},
                {
                    "translation": "Like wandering in your waves",
                    "structures": [
                        {
                            "words": [
                                {
                                    "word": "너",
                                    "written": "너",
                                    "meaning": "Pronoun-you"
                                },
                                {
                                    "word": "",
                                    "written": "의",
                                    "meaning": "Particle-Possesive particle"
                                }
                            ],
                            "written": "너의"
                        },
                        {
                            "words": [
                                {
                                    "word": "파도",
                                    "written": "파도",
                                    "meaning": "Noun-wave"
                                }
                            ],
                            "written": "파도"
                        },
                        {
                            "words": [
                                {
                                    "word": "속",
                                    "written": "속",
                                    "meaning": "Noun-inside"
                                },
                                {
                                    "word": "",
                                    "written": "을",
                                    "meaning": "Particle-object-marking particle"
                                }
                            ],
                            "written": "속을"
                        },
                        {
                            "words": [
                                {
                                    "word": "헤매다",
                                    "written": "헤매",
                                    "meaning": "Action Verb-wander"
                                },
                                {
                                    "word": "",
                                    "written": "듯",
                                    "meaning": ""
                                }
                            ],
                            "written": "헤매듯"
                        }
                    ]
                },
                {
                    "translation": "I can't breathe",
                    "structures": [
                        {
                            "words": [
                                {
                                    "word": "숨",
                                    "written": "숨",
                                    "meaning": "Noun-breath"
                                },
                                {
                                    "word": "",
                                    "written": "을",
                                    "meaning": "Particle-object-marking particle"
                                }
                            ],
                            "written": "숨을"
                        },
                        {
                            "words": [
                                {
                                    "word": "쉬다",
                                    "written": "쉬",
                                    "meaning": "Action Verb-breathe"
                                },
                                {
                                    "word": "",
                                    "written": "ㄹ 수가 없",
                                    "meaning": "Auxiliary verb-Cannot"
                                },
                                {
                                    "word": "",
                                    "written": "어",
                                    "meaning": "Sentence end-Casual Speech"
                                }
                            ],
                            "written": "쉴 수가 없어"
                        }
                    ]
                },
                {
                    "translation": "Even if we're close to each other",
                    "structures": [
                        {
                            "words": [
                                {
                                    "word": "서로",
                                    "written": "서로",
                                    "meaning": "Adverb-each other"
                                }
                            ],
                            "written": "서로"
                        },
                        {
                            "words": [
                                {
                                    "word": "닿다",
                                    "written": "닿",
                                    "meaning": "Action Verb-reach,touch"
                                },
                                {
                                    "word": "",
                                    "written": "을",
                                    "meaning": "Suffix-Adjective-forming particle"
                                }
                            ],
                            "written": "닿을"
                        },
                        {
                            "words": [
                                {
                                    "word": "듯하다",
                                    "written": "듯하",
                                    "meaning": "Verb-look like, seems like"
                                },
                                {
                                    "word": "",
                                    "written": "ㄴ",
                                    "meaning": "Suffix-Adjective-forming particle"
                                }
                            ],
                            "written": "듯한"
                        },
                        {
                            "words": [
                                {
                                    "word": "거리",
                                    "written": "거리",
                                    "meaning": "Noun-distance"
                                }
                            ],
                            "written": "거리"
                        },
                        {
                            "words": [
                                {
                                    "word": "",
                                    "written": "여도",
                                    "meaning": "Sentence end-even if"
                                }
                            ],
                            "written": "여도"
                        }
                    ]
                },
                {
                    "translation": "I can't tell you yet",
                    "structures": [
                        {
                            "words": [
                                {
                                    "word": "아직",
                                    "written": "아직",
                                    "meaning": "Adverb-yet, still"
                                }
                            ],
                            "written": "아직"
                        },
                        {
                            "words": [
                                {
                                    "word": "말하다",
                                    "written": "말하",
                                    "meaning": "Action Verb-tell"
                                },
                                {
                                    "word": "",
                                    "written": "ㄹ 수 없",
                                    "meaning": "Auxiliary verb-Cannot"
                                },
                                {
                                    "word": "",
                                    "written": "어",
                                    "meaning": "Sentence end-Casual speech ending"
                                }
                            ],
                            "written": "말할 수 없어"
                        }
                    ]
                }
            ],
            "__v": 7,
            "totalWords": 22,
            "newWords": 0,
            "wordsToReview": 0,
            "knownWords": 22
        }
    ],
    '$words': [
        {
            "_id": "6352781604200383877ab863",
            "word": "섬",
            "meanings": {
                "Noun": "island"
            }
        },
        {
            "_id": "635278d204200383877ab864",
            "word": "가다",
            "meanings": {
                "Action Verb": "go"
            }
        },
        {
            "_id": "6352795304200383877ab865",
            "word": "둘",
            "meanings": {
                "Number": "two"
            }
        },
        {
            "_id": "635279ca04200383877ab866",
            "word": "바다",
            "meanings": {
                "Noun": "sea"
            }
        },
        {
            "_id": "6352b6fbbe0d9758c7beb8b1",
            "word": "둘러싸이다",
            "meanings": {
                "Action Verb": "be surrounded"
            }
        },
        {
            "_id": "636753b2f28d4e12f54495ad",
            "word": "우리",
            "meanings": {
                "Pronoun": "we,us"
            }
        },
        {
            "_id": "636753f9f28d4e12f54495ae",
            "word": "시간",
            "meanings": {
                "Noun": "time,hour"
            }
        },
        {
            "_id": "63675416f28d4e12f54495af",
            "word": "멈추다",
            "meanings": {
                "Action Verb": "stop,halt"
            }
        },
        {
            "_id": "63675446f28d4e12f54495b0",
            "word": "곳",
            "meanings": {
                "Noun": "place"
            }
        },
        {
            "_id": "6367cab3f6f4f2a2f70d3edd",
            "word": "되다",
            "meanings": {
                "Action Verb": "become,reach,come",
                "Affix": "makes the word an adjective"
            }
        },
        {
            "_id": "6367cb39f6f4f2a2f70d3ede",
            "word": "상태",
            "meanings": {
                "Noun": "condition,state"
            }
        },
        {
            "_id": "6367cb5af6f4f2a2f70d3edf",
            "word": "없다",
            "meanings": {
                "Descriptive Verb": "non-existent,lacking"
            }
        },
        {
            "_id": "6367cba5f6f4f2a2f70d3ee0",
            "word": "걱정",
            "meanings": {
                "Noun": "worry,concern,care"
            }
        },
        {
            "_id": "6367cbc5f6f4f2a2f70d3ee1",
            "word": "아무",
            "meanings": {
                "Determiner": "any,no",
                "Pronoun": "anybody,anyone"
            }
        },
        {
            "_id": "6367cc0af6f4f2a2f70d3ee2",
            "word": "준비하다",
            "meanings": {
                "Action Verb": "prepare"
            }
        },
        {
            "_id": "6367cc2ff6f4f2a2f70d3ee3",
            "word": "것",
            "meanings": {
                "Bound Noun": "something"
            }
        },
        {
            "_id": "6367cc49f6f4f2a2f70d3ee4",
            "word": "별",
            "meanings": {
                "Determiner": "particular,specific",
                "Noun": "star"
            }
        },
        {
            "_id": "636800508ddbdafed7b6a551",
            "word": "손",
            "meanings": {
                "Noun": "hand"
            },
            "__v": 0
        },
        {
            "_id": "636800a88ddbdafed7b6a55b",
            "word": "놓다",
            "meanings": {
                "Action Verb": "let go"
            },
            "__v": 0
        },
        {
            "_id": "636800c18ddbdafed7b6a55d",
            "word": "약속",
            "meanings": {
                "Noun": "promise,appointment"
            },
            "__v": 0
        },
        {
            "_id": "636801058ddbdafed7b6a55f",
            "word": "하다",
            "meanings": {
                "Action Verb": "do,make"
            },
            "__v": 0
        },
        {
            "_id": "6368012d8ddbdafed7b6a565",
            "word": "무섭다",
            "meanings": {
                "Descriptive Verb": "fearful,scared of"
            },
            "__v": 0
        },
        {
            "_id": "636801428ddbdafed7b6a567",
            "word": "멀리",
            "meanings": {
                "Adverb": "far"
            },
            "__v": 0
        },
        {
            "_id": "636aa761371e949b0d7b882e",
            "word": "아직",
            "meanings": {
                "Adverb": "yet,still"
            },
            "__v": 0
        },
        {
            "_id": "636aa773371e949b0d7b8830",
            "word": "남다",
            "meanings": {
                "Action Verb": "remain,be left"
            },
            "__v": 0
        },
        {
            "_id": "636aa7a2371e949b0d7b8836",
            "word": "너",
            "meanings": {
                "Pronoun": "you"
            },
            "__v": 0
        },
        {
            "_id": "636aa7a9371e949b0d7b8838",
            "word": "기억",
            "meanings": {
                "Noun": "memory"
            },
            "__v": 0
        },
        {
            "_id": "636aa7c1371e949b0d7b883a",
            "word": "속",
            "meanings": {
                "Noun": "inside,interior"
            },
            "__v": 0
        },
        {
            "_id": "636aa7d2371e949b0d7b883c",
            "word": "희미하다",
            "meanings": {
                "Descriptive Verb": "dim,blurred"
            },
            "__v": 0
        },
        {
            "_id": "636aa7f6371e949b0d7b883e",
            "word": "단지",
            "meanings": {
                "Adverb": "just"
            },
            "__v": 0
        },
        {
            "_id": "636aa810371e949b0d7b8840",
            "word": "사라지다",
            "meanings": {
                "Action Verb": "disappear,vanish,go out of sight"
            },
            "__v": 0
        },
        {
            "_id": "636aa956371e949b0d7b884a",
            "word": "말하다",
            "meanings": {
                "Action Verb": "say,tell,speak,talk"
            },
            "__v": 0
        },
        {
            "_id": "636aaabe371e949b0d7b8852",
            "word": "파도",
            "meanings": {
                "Noun": "wave"
            },
            "__v": 0
        },
        {
            "_id": "636aaad9371e949b0d7b8854",
            "word": "거리",
            "meanings": {
                "Noun": "distance,road"
            },
            "__v": 0
        },
        {
            "_id": "636aab85371e949b0d7b885e",
            "word": "숨",
            "meanings": {
                "Noun": "breath"
            },
            "__v": 0
        },
        {
            "_id": "636aaba0371e949b0d7b8860",
            "word": "닿다",
            "meanings": {
                "Action Verb": "touch,reach"
            },
            "__v": 0
        },
        {
            "_id": "636aabbe371e949b0d7b8862",
            "word": "뜨겁다",
            "meanings": {
                "Descriptive Verb": "hot,warm"
            },
            "__v": 0
        },
        {
            "_id": "636aabca371e949b0d7b8864",
            "word": "날",
            "meanings": {
                "Noun": "day,weather"
            },
            "__v": 0
        },
        {
            "_id": "6373b7a6066644b60290e8fd",
            "meanings": {
                "Noun": "heart,chest,breast"
            },
            "__v": 0,
            "word": "가슴"
        },
        {
            "_id": "6373b7d8066644b60290e8ff",
            "word": "나",
            "meanings": {
                "Pronoun": "I, me"
            },
            "__v": 0
        },
        {
            "_id": "6373b7f6066644b60290e901",
            "word": "헤매다",
            "meanings": {
                "Action Verb": "wander,roam,linger"
            },
            "__v": 0
        },
        {
            "_id": "63e990571a2f8ff01822e86f",
            "word": "쉬다",
            "meanings": {
                "Action Verb": "breathe,rest"
            }
        },
        {
            "_id": "63e991301a2f8ff018237d35",
            "word": "서로",
            "meanings": {
                "Adverb": "each other,one another,altogether"
            }
        },
        {
            "_id": "63e9928a1a2f8ff018245483",
            "word": "듯하다",
            "meanings": {
                "Descriptive Verb": "to appear to be"
            }
        }
    ],
    '$stats': { score: [], reviewed: [] }
}