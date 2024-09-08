export let Globals = {
  setWordsToReview: undefined, // set by review-page
  setSelectedSong: undefined // set by songs-page
}

//why do i have to use export instead of setting exports.Globals?

export const setGlobals = async (data) => {

  if (Globals.$words) // data already initialized
    return

  Globals.$words = [
    {
      word: '섬',
      meanings: { Noun: 'island' }
    },
    {
      word: '가다',
      meanings: { Verb: 'go' }
    },
    {
      word: '바다',
      meanings: { Noun: 'sea' }
    },
    {
      word: '둘러싸이다',
      meanings: { Verb: 'be surrounded' }
    },
    {
      word: '우리',
      meanings: { Pronoun: 'we,us' }
    },
    {
      word: '시간',
      meanings: { Noun: 'time,hour' }
    },
    {
      word: '멈추다',
      meanings: { Verb: 'stop,halt' }
    },
    {
      word: '곳',
      meanings: { Noun: 'place' }
    },
    {
      word: '되다',
      meanings: {
        Verb: 'become,reach,come'
      }
    },
    {
      word: '상태',
      meanings: { Noun: 'condition,state' }
    },
    {
      word: '없다',
      meanings: { Adjective: 'non-existent,lacking' }
    },
    {
      word: '걱정',
      meanings: { Noun: 'worry,concern,care' }
    },
    {
      word: '아무',
      meanings: { Pronoun: 'anybody,anyone' }
    },
    {
      word: '준비하다',
      meanings: { Verb: 'prepare' }
    },
    {
      word: '것',
      meanings: { Noun: 'something' }
    },
    {
      word: '별',
      meanings: { Noun: 'star' }
    },
    {
      word: '손',
      meanings: { Noun: 'hand' },
      __v: 0
    },
    {
      word: '놓다',
      meanings: { Verb: 'let go' },
      __v: 0
    },
    {
      word: '약속',
      meanings: { Noun: 'promise,appointment' },
      __v: 0
    },
    {
      word: '하다',
      meanings: { Verb: 'do,make' },
      __v: 0
    },
    {
      word: '무섭다',
      meanings: { Adjective: 'fearful,scared of' },
      __v: 0
    },
    {
      word: '멀리',
      meanings: { Adverb: 'far' },
      __v: 0
    },
    {
      word: '아직',
      meanings: { Adverb: 'yet,still' },
      __v: 0
    },
    {
      word: '남다',
      meanings: { Verb: 'remain,be left' },
      __v: 0
    },
    {
      word: '너',
      meanings: { Pronoun: 'you' },
      __v: 0
    },
    {
      word: '기억',
      meanings: { Noun: 'memory' },
      __v: 0
    },
    {
      word: '속',
      meanings: { Noun: 'inside,interior' },
      __v: 0
    },
    {
      word: '희미하다',
      meanings: { Adjective: 'dim,blurred' },
      __v: 0
    },
    {
      word: '단지',
      meanings: { Adverb: 'just' },
      __v: 0
    },
    {
      word: '사라지다',
      meanings: { Verb: 'disappear,vanish,go out of sight' },
      __v: 0
    },
    {
      word: '말하다',
      meanings: { Verb: 'say,tell,speak,talk' },
      __v: 0
    },
    {
      word: '파도',
      meanings: { Noun: 'wave' },
      __v: 0
    },
    {
      word: '거리',
      meanings: { Noun: 'distance,road' },
      __v: 0
    },
    {
      word: '숨',
      meanings: { Noun: 'breath' },
      __v: 0
    },
    {
      word: '닿다',
      meanings: { Verb: 'touch,reach' },
      __v: 0
    },
    {
      word: '뜨겁다',
      meanings: { Adjective: 'hot,warm' },
      __v: 0
    },
    {
      word: '날',
      meanings: { Noun: 'day,weather' },
      __v: 0
    },
    {
      meanings: { Noun: 'heart,chest,breast' },
      __v: 0,
      word: '가슴'
    },
    {
      word: '나',
      meanings: { Pronoun: 'I, me' },
      __v: 0
    },
    {
      word: '헤매다',
      meanings: { Verb: 'wander,roam,linger' },
      __v: 0
    },
    {
      word: '쉬다',
      meanings: { Verb: 'breathe,rest' }
    },
    {
      word: '서로',
      meanings: { Adverb: 'each other,one another,altogether' }
    },
    {
      word: '듯하다',
      meanings: { Adjective: 'to appear to be' }
    }
    //adding
    ,
    {
      word: '네모나다',
      meanings: { Adjective: 'squared,rectangular' }
    },
    {
      word: '화면',
      meanings: { Noun: 'picture,image,screen,monitor' }
    },
    {
      word: '헤치다',
      meanings: { Verb: 'disperse,push aside' }
    },
    {
      "word": "살며시",
      "meanings": {
        "Adverb": "gently, quietly"
      }
    },
    {
      "word": "다가오다",
      "meanings": { Verb: "approach, come closer" }
    },
    {
      "word": "은빛",
      "meanings": {
        "Noun": "silver, silvery"
      }
    },
    {
      "word": "환상",
      "meanings": {
        "Noun": "fantasy, illusion, hallucination"
      }
    },
    {
      "word": "심어주다",
      "meanings": {
        Verb: "plant, instill (a feeling), implant"
      }
    },
    {
      "word": "그녀",
      "meanings": {
        "Pronoun": "she, her"
      }
    },
    {
      "word": "나만",
      "meanings": {
        "Pronoun": "only me, just me"
      }
    },
    {
      "word": "작다",
      "meanings": {
        "Adjective": "small, little, tiny"
      }
    },
    {
      "word": "요정",
      "meanings": {
        "Noun": "fairy, elf"
      }
    }, {
      "word": "이르다",
      "meanings": { "Adjective": "early" }
    },
    {
      "word": "안개",
      "meanings": { "Noun": "fog, mist" }
    },
    {
      "word": "내게",
      "meanings": { "Adverb": "to me" }
    },
    {
      "word": "너울거리다",
      "meanings": { "Adjective": "fluttering, wavering" }
    },
    {
      "word": "길다",
      "meanings": { "Adjective": "long" }
    },
    {
      "word": "머리",
      "meanings": { "Noun": "hair, head" }
    },
    {
      "word": "부드럽다",
      "meanings": { "Adjective": "soft, gentle" }
    },
    {
      "word": "미소",
      "meanings": { "Noun": "smile" }
    },
    {
      "word": "속삭이다",
      "meanings": { Verb: "whisper" }
    }
  ]

  Globals.$songs = [
    {
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
                  "meaning": "Verb-go",
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
                  "meaning": "Verb-be surrounded",
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
                  "meaning": "Verb-stop",
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
                  "meaning": "Verb-go",
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
                  "meaning": "Noun-something",
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
                  "meaning": "Verb-get ready",
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
                  "meaning": "Verb-become",
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
                  "meaning": "Verb-go",
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
                  "meaning": "Verb-let go",
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
                  "meaning": "Verb-do",
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
      ]
    },
    {
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
                  "meaning": "Adverb-still"
                }
              ],
              "written": "아직"
            },
            {
              "words": [
                {
                  "word": "남다",
                  "written": "남",
                  "meaning": "Verb-remain"
                },
                {
                  "word": "",
                  "written": "아있",
                  "meaning": "Auxiliary verb-Remain (in a certain state)"
                },
                {
                  "word": "",
                  "written": "을까",
                  "meaning": "Sentence end-Tentative guessing or suggestion"
                }
              ],
              "written": "남아있을까"
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
                  "word": "기억",
                  "written": "기억",
                  "meaning": "Noun-memory"
                }
              ],
              "written": "기억"
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
                  "written": "의",
                  "meaning": "Particle-Possesive particle"
                }
              ],
              "written": "속의"
            },
            {
              "words": [
                {
                  "word": "희미하다",
                  "written": "희미하",
                  "meaning": "Descriptive verb-faded"
                },
                {
                  "word": "",
                  "written": "여지",
                  "meaning": "Verb-forming auxiliary-Become"
                },
                {
                  "word": "",
                  "written": "ㄴ",
                  "meaning": "Suffix-Adjective-forming particle"
                }
              ],
              "written": "희미해진"
            },
            {
              "words": [
                {
                  "word": "나",
                  "written": "나",
                  "meaning": "Pronoun-I, Me"
                }
              ],
              "written": "나"
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
                  "meaning": "Verb-dissapear"
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
                  "meaning": "Pronoun-our"
                }
              ],
              "written": "우리"
            },
            {
              "words": [
                {
                  "word": "가슴",
                  "written": "가슴",
                  "meaning": "Noun-heart"
                }
              ],
              "written": "가슴"
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
                  "written": "의",
                  "meaning": "Particle-Possesive particle"
                }
              ],
              "written": "속의"
            },
            {
              "words": [
                {
                  "word": "뜨겁다",
                  "written": "뜨겁",
                  "meaning": "Descriptive Verb-hot"
                },
                {
                  "word": "",
                  "written": "었던",
                  "meaning": "Modifier-that one did/was (but not now)"
                }
              ],
              "written": "뜨거웠던"
            },
            {
              "words": [
                {
                  "word": "날",
                  "written": "날",
                  "meaning": "Noun-day"
                }
              ],
              "written": "날"
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
                  "meaning": "Verb-wander"
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
                  "meaning": "Verb-breathe"
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
                  "meaning": "Verb-reach,touch"
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
                  "meaning": "Verb-tell"
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
      ]
    },
    //adding
    {
      "title": "샴푸의 요정",
      "lines": [
        {
          "translation": "breaking through the square screen",
          "structures": [
            {
              "words": [
                {
                  "written": "네모난",
                  "meaning": "Adjective-square",
                  "word": "네모나다"
                }
              ],
              "written": "네모난"
            },
            {
              "words": [
                {
                  "written": "화면",
                  "meaning": "Noun-screen",
                  "word": "화면"
                }
              ],
              "written": "화면"
            },
            {
              "words": [
                {
                  "written": "헤치",
                  "meaning": "Verb-push through",
                  "word": "헤치다"
                },
                {
                  "written": "며",
                  "meaning": "Connector-While doing"
                }
              ],
              "written": "헤치며"
            }
          ]
        },
        {
          "translation": "she gently approaches",
          "structures": [
            {
              "words": [
                {
                  "written": "살며시",
                  "meaning": "Adverb-gently/quietly",
                  "word": "살며시"
                }
              ],
              "written": "살며시"
            },
            {
              "words": [
                {
                  "written": "다가와",
                  "meaning": "Verb-approach",
                  "word": "다가오다"
                }
              ],
              "written": "다가와"
            }
          ]
        },
        {
          "translation": "planting a silver fantasy",
          "structures": [
            {
              "words": [
                {
                  "written": "은빛",
                  "meaning": "Noun-silver",
                  "word": "은빛"
                },
                {
                  "written": "의",
                  "meaning": "Particle-Possessive particle"
                }
              ],
              "written": "은빛의"
            },
            {
              "words": [
                {
                  "written": "환상",
                  "meaning": "Noun-fantasy",
                  "word": "환상"
                }
              ],
              "written": "환상"
            },
            {
              "words": [
                {
                  "written": "심어준",
                  "meaning": "Verb-plant",
                  "word": "심어주다"
                }
              ],
              "written": "심어준"
            }
          ]
        },
        {
          "translation": "she is my own, little fairy",
          "structures": [
            {
              "words": [
                {
                  "written": "그녀",
                  "meaning": "Pronoun-she",
                  "word": "그녀"
                }
              ],
              "written": "그녀는"
            },
            {
              "words": [
                {
                  "written": "나만",
                  "meaning": "Pronoun-only me",
                  "word": "나만"
                },
                {
                  "written": "의",
                  "meaning": "Particle-Possessive particle"
                }
              ],
              "written": "나만의"
            },
            {
              "words": [
                {
                  "written": "작은",
                  "meaning": "Adjective-small",
                  "word": "작다"
                }
              ],
              "written": "작은"
            },
            {
              "words": [
                {
                  "written": "요정",
                  "meaning": "Noun-fairy",
                  "word": "요정"
                }
              ],
              "written": "요정"
            }
          ]
        },
        {},
        {
          "translation": "like morning mist",
          "structures": [
            {
              "words": [
                {
                  "written": "이른",
                  "meaning": "Adjective-early",
                  "word": "이르다"
                },
                {
                  "written": "아침",
                  "meaning": "Noun-morning"
                }
              ],
              "written": "이른 아침"
            },
            {
              "words": [
                {
                  "written": "안개",
                  "meaning": "Noun-fog, mist",
                  "word": "안개"
                }
              ],
              "written": "안개처럼"
            }
          ]
        },
        {
          "translation": "she approaches me",
          "structures": [
            {
              "words": [
                {
                  "written": "내게로",
                  "meaning": "Adverb-to me",
                  "word": "내게"
                },
                {
                  "written": "다가와",
                  "meaning": "Verb-approach",
                  "word": "다가오다"
                }
              ],
              "written": "내게로 다가와"
            }
          ]
        },
        {
          "translation": "her fluttering long hair",
          "structures": [
            {
              "words": [
                {
                  "written": "너울거리는",
                  "meaning": "Adjective-fluttering, wavering",
                  "word": "너울거리다"
                },
                {
                  "written": "긴",
                  "meaning": "Adjective-long",
                  "word": "길다"
                }
              ],
              "written": "너울거리는 긴"
            },
            {
              "words": [
                {
                  "written": "머리",
                  "meaning": "Noun-hair, head",
                  "word": "머리"
                }
              ],
              "written": "머리"
            }
          ]
        },
        {
          "translation": "softly whispers with a gentle smile",
          "structures": [
            {
              "words": [
                {
                  "written": "부드런",
                  "meaning": "Adjective-soft, gentle",
                  "word": "부드럽다"
                }
              ],
              "written": "부드런"
            },
            {
              "words": [
                {
                  "written": "미소",
                  "meaning": "Noun-smile",
                  "word": "미소"
                }
              ],
              "written": "미소로"
            },
            {
              "words": [
                {
                  "written": "속삭이네",
                  "meaning": "Verb-whisper",
                  "word": "속삭이다"
                }
              ],
              "written": "속삭이네"
            }
          ]
        }
      ]
    }

  ]

  Globals.$stats = JSON.parse(localStorage.getItem('stats')) ?? []

  // parses all string dates into Date
  Globals.$stats.forEach(stat => {
    stat.next = new Date(stat.next)
  })



  //#region test for db words
  const missingWords = [];

  // Iterate through each song
  Globals.$songs.forEach(song => {
    // Iterate through each line in the song
    song.lines.forEach(line => {
      // Iterate through each structure in the line
      line.structures?.forEach(structure => {
        // Iterate through each word in the structure
        structure.words.forEach(wordObj => {
          // Check if the word exists in the $words dictionary
          const wordExists = Globals.$words.find(word2 => word2.word === wordObj.word);

          // If the word is not found, add it to the missingWords array
          if (!wordExists && wordObj.word) {
            missingWords.push({
              word: wordObj.word,
              meaning: wordObj.meaning
            });
          }
        });
      });
    });
  });

  // Return the list of missing words
  console.log(missingWords)
  //#endregion


  //testing for backend disabled
  return

  if (Globals.$words) // data already initialized
    return



  //backend responded
  if (data) {
    Globals.$words = data.words
    Globals.$songs = data.songs

    if (data.stats.length)
      Globals.$stats = data.stats
    else
      Globals.$stats = JSON.parse(localStorage.getItem('stats')) ?? []


    localStorage.setItem('songs', JSON.stringify(Globals.$songs))
    localStorage.setItem('words', JSON.stringify(Globals.$words))
    localStorage.setItem('stats', JSON.stringify(Globals.$stats))
  }

  else {
    Globals.$words = JSON.parse(localStorage.getItem('words')) ?? []
    Globals.$songs = JSON.parse(localStorage.getItem('songs')) ?? []
    Globals.$stats = JSON.parse(localStorage.getItem('stats')) ?? []


    if (Globals.$words.length)
      alert('backend is down but a copy of the data has been loaded from localStorage')
  }



  // parses all string dates into Date
  Globals.$stats.forEach(stat => {
    stat.next = new Date(stat.next)
  })
}
