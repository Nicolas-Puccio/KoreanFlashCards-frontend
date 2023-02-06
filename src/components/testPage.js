import React from 'react';
import { Globals } from '../Global';

//fix: all the file
//fix: comment file
class TestPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const missingWords = [];
        const incompleteWords = [];
        Globals.$songs.forEach(song => {
            song.lines.forEach(line => {
                line.structures?.forEach(structure => {
                    structure.words?.forEach(word => {
                        if (word.word) {
                            if (!Globals.$words.find(word2 => word2.word === word.word) && !missingWords.includes(word))
                                missingWords.push(word);

                        }
                        if (word.meaning === '' && !incompleteWords.includes(word))
                            incompleteWords.push(word);
                    });
                })
            });
        });
        console.log(missingWords)

        return <div>
            <ul>
                {
                    missingWords.map((word, index) => <li key={index} onClick={() => this.setState({ word })}>{word.word}</li>)
                }
            </ul>

            <input placeholder={this.state.word.word} disabled></input>
            <button disabled={!this.state.word} onClick={() => {

                const request = new XMLHttpRequest();
                request.onreadystatechange = (event) => {
                    console.log(event)
                };
                request.open('POST', 'http://localhost:3001/api/song/writetest/', true);

                request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
                request.setRequestHeader('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzQ1ZjkwNGVmMDE2ZGVjOGE3MTYwMTkiLCJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2NjYxMDE0NjN9.55YtqF7GBtShk-MF6pY8DYVCMNypmXma_WEX6hK7QFA');
                const payload = {
                    word: this.state.word.word,
                    meanings: {}
                }
                payload.meanings[this.type] = this.def
                request.send(JSON.stringify(payload));

            }
            }>submit</button>
            <br />
            <br />

            <input placeholder='type' onChange={e => this.type = e.target.value}></input>
            <input placeholder='def' onChange={e => this.def = e.target.value}></input>

            <br />
            <br />
            <br />
            <br />

            <ul>
                {
                    incompleteWords.map((word, index) => <li key={index} onClick={() => this.setState({ word })}>{word.word ?? `(${word.written})`}</li>)
                }
            </ul>
        </div>
    }
}

export default TestPage;

// eslint-disable-next-line
const test = {
    "_id": "636aa6c33fb492bcfca621bd",
    "title": "바이바이배드맨 - 너의 파도",
    "structures": [
        {
            "words": [
                {
                    "written": "아직",
                    "meaning": "Adverb-still",
                    "word": "아직"
                }
            ],
            "written": "아직"
        },
        {
            "words": [
                {
                    "written": "남",
                    "meaning": "Action Verb-remain",
                    "word": "남다"
                },
                {
                    "written": "아있",
                    "meaning": "Auxiliary verb-Remain (in a certain state)"
                },
                {
                    "written": "을까",
                    "meaning": "Sentence end-Tentative guessing or suggestion"
                }
            ],
            "written": "남아있을까"
        },
        {},
        {
            "words": [
                {
                    "written": "너",
                    "meaning": "Pronoun-you",
                    "word": "너"
                },
                {
                    "written": "의",
                    "meaning": "Particle-Possesive particle"
                }
            ],
            "written": "너의"
        },
        {
            "words": [
                {
                    "written": "기억",
                    "meaning": "Noun-memory",
                    "word": "기억"
                }
            ],
            "written": "기억"
        },
        {
            "words": [
                {
                    "written": "속",
                    "meaning": "Noun-inside",
                    "word": "속"
                },
                {
                    "written": "의",
                    "meaning": "Particle-Possesive particle"
                }
            ],
            "written": "속의"
        },
        {
            "words": [
                {
                    "written": "희미하",
                    "meaning": "Descriptive verb-faded",
                    "word": "희미하다"
                },
                {
                    "written": "여지",
                    "meaning": "Verb-forming auxiliary-Become"
                },
                {
                    "written": "ㄴ",
                    "meaning": "Suffix-Adjective-forming particle"
                }
            ],
            "written": "희미해진"
        },
        {
            "words": [
                {
                    "written": "나",
                    "meaning": "Pronoun-I, Me",
                    "word": "나"
                }
            ],
            "written": "나"
        },
        {},
        {
            "words": [
                {
                    "written": "단지",
                    "meaning": "Adverb-just",
                    "word": "단지"
                }
            ],
            "written": "단지"
        },
        {
            "words": [
                {
                    "written": "사라지",
                    "meaning": "Action Verb-dissapear",
                    "word": "사라지다"
                },
                {
                    "written": "ㄹ 뿐이",
                    "meaning": "Auxiliary verb-Just"
                },
                {
                    "written": "야",
                    "meaning": "Sentence end-Intimate style sentence ending"
                }
            ],
            "written": "사라질 뿐이야"
        },
        {},
        {
            "words": [
                {
                    "written": "우리",
                    "meaning": "Pronoun-our",
                    "word": "우리"
                }
            ],
            "written": "우리"
        },
        {
            "words": [
                {
                    "written": "가슴",
                    "meaning": "Noun-heart",
                    "word": "가슴"
                }
            ],
            "written": "가슴"
        },
        {
            "words": [
                {
                    "written": "속",
                    "meaning": "Noun-inside",
                    "word": "속"
                },
                {
                    "written": "의",
                    "meaning": "Particle-Possesive particle"
                }
            ],
            "written": "속의"
        },
        {
            "words": [
                {
                    "written": "뜨겁",
                    "meaning": "Descriptive Verb-hot",
                    "word": "뜨겁다"
                },
                {
                    "written": "었던",
                    "meaning": "Modifier-that one did/was (but not now)"
                }
            ],
            "written": "뜨거웠던"
        },
        {
            "words": [
                {
                    "written": "날",
                    "meaning": "Noun-day",
                    "word": "날"
                }
            ],
            "written": "날"
        },
        {},
        {},
        {
            "words": [
                {
                    "written": "너",
                    "meaning": "Pronoun-you",
                    "word": "너"
                },
                {
                    "written": "의",
                    "meaning": "Particle-Possesive particle"
                }
            ],
            "written": "너의"
        },
        {
            "words": [
                {
                    "written": "파도",
                    "meaning": "Noun-wave",
                    "word": "파도"
                }
            ],
            "written": "파도"
        },
        {
            "words": [
                {
                    "written": "속",
                    "meaning": "Noun-inside",
                    "word": "속"
                },
                {
                    "written": "을",
                    "meaning": "Particle-object-marking particle"
                }
            ],
            "written": "속을"
        },
        {
            "words": [
                {
                    "written": "헤매",
                    "meaning": "Action Verb-wander",
                    "word": "헤매다"
                },
                {
                    "written": "듯",
                    "meaning": ""
                }
            ],
            "written": "헤매듯"
        },
        {},
        {
            "words": [
                {
                    "written": "숨",
                    "meaning": "Noun-breath",
                    "word": "숨"
                },
                {
                    "written": "을",
                    "meaning": "Particle-object-marking particle"
                }
            ],
            "written": "숨을"
        },
        {
            "words": [
                {
                    "written": "쉬",
                    "meaning": "Action Verb-breathe",
                    "word": "쉬다"
                },
                {
                    "written": "ㄹ 수가 없",
                    "meaning": "Auxiliary verb-Cannot"
                },
                {
                    "written": "어",
                    "meaning": "Sentence end-Casual Speech"
                }
            ],
            "written": "쉴 수가 없어"
        },
        {},
        {
            "words": [
                {
                    "written": "서로",
                    "meaning": "Adverb-each other",
                    "word": "서로"
                }
            ],
            "written": "서로"
        },
        {
            "words": [
                {
                    "written": "닿",
                    "meaning": "Action Verb-reach,touch",
                    "word": "닿다"
                },
                {
                    "written": "을",
                    "meaning": "Suffix-Adjective-forming particle"
                }
            ],
            "written": "닿을"
        },
        {
            "words": [
                {
                    "written": "듯하",
                    "meaning": "Verb-look like, seems like",
                    "word": "듯하다"
                },
                {
                    "written": "ㄴ",
                    "meaning": "Suffix-Adjective-forming particle"
                }
            ],
            "written": "듯한"
        },
        {
            "words": [
                {
                    "written": "거리",
                    "meaning": "Noun-distance",
                    "word": "거리"
                }
            ],
            "written": "거리"
        },
        {
            "words": [
                {
                    "written": "여도",
                    "meaning": "Sentence end-even if"
                }
            ],
            "written": "여도"
        },
        {},
        {
            "words": [
                {
                    "written": "아직",
                    "meaning": "Adverb-yet, still",
                    "word": "아직"
                }
            ],
            "written": "아직"
        },
        {
            "words": [
                {
                    "written": "말하",
                    "meaning": "Action Verb-tell",
                    "word": "말하다"
                },
                {
                    "written": "ㄹ 수 없",
                    "meaning": "Auxiliary verb-Cannot"
                },
                {
                    "written": "어",
                    "meaning": "Sentence end-Casual speech ending"
                }
            ],
            "written": "말할 수 없어"
        }
    ]
}