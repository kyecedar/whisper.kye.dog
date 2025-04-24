/** @type {string[]} */
const BRAIN_FILES = [
  "sub", "main",
  "ai", "meta",
  "greetings", "smalltalk",
];



/** @type {HTMLDivElement} */
const elem_replies = document.getElementById("replies");



const Whisper = (() => {
  let self = {};

  /** @type {string} */
  const username = "local-user";

  /** @type {RiverScript} */
  let bot = new RiveScript();
  /** @type {boolean} */
  let ready = false;
  /** @type {() => void} */
  let onready = () => { };

  /** @type {HTMLElement[]} */
  const replies = [];


  /** @param {Array[string]} files Array of file names within "brain" folder to be loaded. */
  const loadFiles = (files) => {
    bot.loadFile(files.map(name => `./brain/${name}.rive`))
      .then(onBrainReady)
      .catch(onBrainError);
  };


  self.init = (on_ready) => {
    loadFiles(BRAIN_FILES);
    onready = on_ready || (() => {});
  };


  const onBrainReady = () => {
    console.log("finished loading.");

    bot.sortReplies();

    console.log("replies sorted.");

    ready = true;
    onready();
  };


  const onBrainError = (err, filename, linenum) => {
    console.log(`${linenum} . ${filename} : error ${err}`);
  };


  self.ready = () => {
    return ready;
  };


  self.ask = async (input) => {
    if (!ready)
      return "not ready.";

    return await bot.reply(username, input);
  }


  /**
   * @param {string[]} args 
   * @returns {void}
   */
  self.remember = (args) => {
    let key = args.shift();
    let value = args.join(" ") || "";

    localStorage.setItem(key, value);

    console.log("i will remember.");
  };


  /**
   * @param {string} key
   * @return {string} Will be "" if nothing there.
   */
  self.recall = (key) => {
    let value = localStorage.getItem(key);
    return value === null ? "" : value;
  }


  self.createReply = () => {};


  return self;
})();

/** @typedef {Array<string|>} */

/** @returns {} */
function parseInput() {
  // parse "(*&)" commands out.

  //
}

/** @typedef  */