# Gets Answers for HQ and Cash Show

## Don't Use This!  It breaks TOS
#### This is just for fun

[HQ Example (YouTube)](https://youtu.be/U1btuWZV-aM)
[Cash Show Example (YouTube)](https://youtu.be/4qlcyVTgT7c)

## Implementation

- Scans iPhone's Display
- OCR to recognize question and answer options
- Searches for questions
- Counts frequency of answers in results
- Gives educated guess on answer
- Takes ~2 seconds with ~80% accuracy

## Requirements
- iPhone X (Only model currently supported)
- macOS (Needed for QuickTime Screen Recording)
- API key for [Google Vision API](https://cloud.google.com/vision/) 
- API key for [Bing Web Search API](https://azure.microsoft.com/en-us/services/cognitive-services/bing-web-search-api/)

## Installation
1. Run the following commands:
```
  git clone https://github.com/amarpatel/Trivia-App-Helper.git &&
  cd Trivia-App-Helper &&
  yarn &&
  touch API_KEYS.json
```
2. Populate `API_KEYS.json` with:
```json
{
    "BING_API": "__key__",
    "GOOGLE_VISION_API_KEY": "__key__"
}
```
3. `npm run dev`
4. Open `QuickTime Player`
5. Plug in iPhone X
6. `File` -> `New Movie Recording`
7. Click this: ![enter image description here](https://i.imgur.com/sTwW8GI.png)

