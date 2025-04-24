const Whisper = (() => {
  let self = {};

  const username = "local-user";

  let bot = new RiveScript();

  let ready = false;

   /** @param {Array[string]} files Array of file names within "brain" folder to be loaded. */
  const loadFiles = (files) => {
    bot.loadFile(files.map(name => `./brain/${name}.rive`))
      .then(onBrainReady)
      .catch(onBrainError);
  };

  self.init = () => {
    loadFiles([
      "sub", "main",
      "ai",
      "greetings", "smalltalk",
    ]);
  };

  const onBrainReady = () => {
    console.log("finished loading.");

    bot.sortReplies();

    console.log("replies sorted.");

    ready = true;
  };

  const onBrainError = (err, filename, linenum) => {
    console.log(`${linenum} . ${filename} : error ${err}`);
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

  return self;
})();

/** @typedef {Array<string|>} */

/** @returns {} */
function parseInput() {
  // parse "(*&)" commands out.

  //
}

/** @typedef  */