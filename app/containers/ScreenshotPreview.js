import React, { Component } from 'react';
import { desktopCapturer, shell } from 'electron';
import { DIMENSIONS, COMMON_WORDS } from '../config';
import { BING_API, GOOGLE_VISION_API_KEY } from '../../API_KEYS.json';

import Preview from '../components/Preview';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles/index';

const styles = theme => ({
  goButton: {
    width: '100%',
  },
  input: {
    display: 'none',
  },
  root: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  paper: {
    marginBottom: '24px',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: 'transparent',
    boxShadow: 'none'
  },
  size: {
    width: 40,
    height: 40,
  },
});
export class ScreenshotPreview extends Component {
  constructor() {
    super();
    this.state = {
      question: '',
      answers: [],
      timing: 0
    };
  }

  process() {
    this.takeScreenshot('image/png', (imageSource) => {
      const start = new Date();
      let OCRtime = null;
      this.ocrImage(imageSource)
        .then((data) => {
          console.log('ocr done: ', data);
          console.log('OCR finished in', (OCRtime = new Date() * 1) - start);

          const { question, answers } = this.formatOCRData(data, this.props.game);
          this.setState({ question });

          if (this.props.shouldOpenChrome) {
            shell.openExternal(`https://www.google.com/search?q=${encodeURIComponent(question)}`, { activate: false });
          }

          this.bingSearch(question, 100)
            .then((json) => this.analyzeWords(json, answers))
            .then((answers) => {
              this.setState({ answers, timing: Math.floor((new Date() * 1 - start)) });
              console.log('Bing finished in: ', (new Date() * 1) - OCRtime);
            });
        });
    });
  }


  /**
   *
   * @param json
   * @param answersObj  Set
   */
  analyzeWords(json, answersObj) {
    const answerWordSet = new Set();
    for (const answer of answersObj) {
      answer.toLowerCase().split(' ').forEach((w) => {
        const word = sanitizeWords(w);
        answerWordSet.add(word);
      });
    }

    const wordsHash = {};
    const text = json.webPages.value.reduce((acc, { snippet, name }) => {
      acc.push(snippet, name);
      return acc;
    }, []);

    const UNCOMMON_FACTOR = 20;
    text.forEach((response) => {
      response.toLowerCase().split(' ').forEach((w) => {
        const word = sanitizeWords(w);
        if (answerWordSet.has(word) && word.length) {
          if (!wordsHash[word]) {
            wordsHash[word] = 0;
          }
          wordsHash[word] += COMMON_WORDS.has(word) ? 1 : UNCOMMON_FACTOR;
        }
      });
    });

    const results = {};
    let highestScoringAnswer = { totalScore: Number.MIN_SAFE_INTEGER };

    for (const answer of answersObj) {
      let commonWordScore = 0;
      let uncommonWordScore = 0;
      answer.toLowerCase().split(' ').forEach((w) => {
        const word = sanitizeWords(w);
        if (word in wordsHash) {
          if (COMMON_WORDS.has(word)) {
            commonWordScore += wordsHash[word];
          } else {
            uncommonWordScore += wordsHash[word];
          }
        }
      });
      results[answer] = {
        commonWordScore,
        uncommonWordScore,
        totalScore: commonWordScore + uncommonWordScore
      };

      if (highestScoringAnswer.totalScore < results[answer].totalScore) {
        highestScoringAnswer = results[answer];
      }
    }

    highestScoringAnswer.selected = true;

    return Object.entries(results);

    function sanitizeWords(word) {
      return word
        .replace(/( |(\w\W))$/, '')
        .replace(/\W/g, '');
    }
  }

  formatOCRData(data, gameType) {
    const pageData = data.responses[0].fullTextAnnotation.pages[0];
    const sentences = [];

    pageData.blocks.forEach((block) => {
      block.paragraphs.forEach((paragraph) => {
        const para = paragraph.words.map((word) => word.symbols.reduce((acc, { text }) => acc += text, ''));
        sentences.push(para.join(' '));
      });
    });

    if (gameType === 'hq') {
      console.log('doing hq');
      return {
        answers: sentences.slice(-3).reduce((acc, item) => acc.add(item), new Set()),
        question: sentences.slice(0, sentences.length - 3).join(' '),
      };
    }

    if (gameType === 'cc') {
      console.log('doing cc');
      return {
        answers: sentences.slice(-3).reduce((acc, item) => acc.add(item), new Set()),
        question: sentences[0],
      };
    }
  }

  ocrImage(data) {
    const formData = {
      requests: [{
        image: {
          content: data.replace('data:image/png;base64,', '')
        },
        features: [
          { type: 'DOCUMENT_TEXT_DETECTION' }
        ]
      }]
    };

    const options = {
      body: JSON.stringify(formData),
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json'
      },
      method: 'POST',
      mode: 'cors',
      redirect: 'follow',
      referrer: 'no-referrer',
    };

    return fetch(`https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_VISION_API_KEY}`, options)
      .then(response => response.json())
      .catch(error => console.log('Error: ', error));
  }

  bingSearch(term, count) {
    const endpoint = `https://api.cognitive.microsoft.com/bing/v7.0/search?count=${count}&q=${encodeURIComponent(term)}`;
    const options = {
      method: 'GET',
      headers: { 'Ocp-Apim-Subscription-Key': BING_API }
    };
    return fetch(endpoint, options)
      .then((response) => response.json());
  }


  takeScreenshot(imageFormat = 'image/png', callback) {
    const handleStream = (stream) => {
      // Create hidden video tag
      const video = document.createElement('video');
      video.style.cssText = 'position:absolute;top:-10000px;left:-10000px;';
      // Event connected to stream
      video.onloadedmetadata = function () {
        // Set video ORIGINAL height (screenshot)
        video.style.height = `${DIMENSIONS.HEIGHT}px`; // videoHeight
        video.style.width = `${DIMENSIONS.WIDTH}px`; // videoWidth

        // Create canvas
        const canvas = document.createElement('canvas');
        canvas.width = DIMENSIONS.WIDTH;
        canvas.height = DIMENSIONS.HEIGHT * 0.7;
        const ctx = canvas.getContext('2d');
        // Draw video on canvas

        ctx.drawImage(video, 0, DIMENSIONS.HEIGHT * 0.2, DIMENSIONS.WIDTH, DIMENSIONS.HEIGHT * 0.65, 0, 0, canvas.width, DIMENSIONS.HEIGHT);
        callback(canvas.toDataURL(imageFormat));

        // Remove hidden video tag
        video.remove();
        try {
          // Destroy connect to stream
          stream.getTracks()[0].stop();
        } catch (e) {}
      };
      video.src = URL.createObjectURL(stream);
      document.body.appendChild(video);
    };

    const handleError = function (e) {
      alert('Screenshot error: ', e);
      console.log(e);
    };

    desktopCapturer.getSources({ types: ['window', 'screen'] }, (error, sources) => {
      if (error) throw error;
      for (let i = 0; i < sources.length; ++i) {
        // Filter: main screen
        if (sources[i].name === 'Movie Recording') {
          navigator.webkitGetUserMedia({
            audio: false,
            video: {
              mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: sources[i].id,
                maxWidth: 9 * 40,
                maxHeight: 19.5 * 40
              }
            }
          }, handleStream, handleError);
          return;
        }
      }
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>

        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Button
              variant="raised"
              className={classes.goButton}
              onClick={() => this.process()}
              color="primary"
            >
              GO
            </Button>
          </Paper>
        </Grid>

        <Preview
          question={this.state.question}
          answers={this.state.answers}
          timing={this.state.timing}
        />
      </div>
    );
  }
}


export default withStyles(styles)(ScreenshotPreview);
