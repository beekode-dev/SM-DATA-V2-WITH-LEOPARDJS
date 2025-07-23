/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume(
        "ChatGPT backround",
        "./Stage/costumes/ChatGPT backround.svg",
        { x: 260.0625, y: 180 }
      ),
      new Costume("SM DATA logo", "./Stage/costumes/SM DATA logo.png", {
        x: 102,
        y: 100,
      }),
    ];

    this.sounds = [
      new Sound("pop", "./Stage/sounds/pop.wav"),
      new Sound("Connect", "./Stage/sounds/Connect.wav"),
      new Sound("Disconnect", "./Stage/sounds/Disconnect.wav"),
    ];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "START" }, this.whenIReceiveStart),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "START" },
        this.whenIReceiveStart2
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(
        Trigger.TIMER_GREATER_THAN,
        { VALUE: () => this.vars.Timer },
        this.whengreaterthan
      ),
    ];

    this.vars.questionAnswerFound = "false";
    this.vars.PromptLocation = 1;
    this.vars.time = "6/7/2025 8:58:49";
    this.vars.Timer = 0.838;
    this.vars.prompts = [
      "What is your name?",
      "who created you?",
      "how tall is the eiffel tower?",
      "how tall is the statue of liberty?",
      "how tall is the shard?",
      "What is AI?",
      "is ai always right?",
      "What are some of the best ways to use AI?",
      "where are you from?",
      "do you speak any other languages?",
      "Do you need anything?",
      "what is your favourite quality about yourself?",
      "what is your number one goal in life?",
      "What brings you the most joy?",
      "whats the most creative insult you can think of right now?",
      "Whats the best wifi name youve ever seen?",
      "Why does your creator spend so much time with you?",
      "What is an algorithim?",
      "whats your name",
      "when were you created?",
      "What is ai",
      "are you sigma?",
      "did you know that you are dumb?",
    ];
    this.vars.responses = [
      "My name is SM DATABOT V2",
      "I was created by Smichalek and I came out on the 6th of April 2025 in the morning.",
      "The tower is 330 metres (1,083 ft) tall, about the same height as an 81-storey building, and the tallest structure in Paris. Its base is square, measuring 125 metres (410 ft) on each side.",
      "The Statue of Liberty stands at a height of 305 feet (93 meters) from the base of the pedestal to the tip of the torch. It was a gift from France to the United States and was designed by French sculptor Frédéric Auguste Bartholdi. The statue was dedicated on October 28, 1886.",
      "The Shard is 309.6 metres, or 1,016 feet, high and is Western Europe's tallest building. It is 95 storeys tall, with level 72 the highest habitable floor.",
      "AI is when a machine, computer, or program successfully creates a output that resembles human intelligence processes.",
      'Just like no human is perfect, a consistently correct AI program has yet to exist. AI can experience "hallucinations," resulting in outputs that either make no sense or are false. ',
      "With AI tools like Copilot at your fingertips, being more productive, creative, and efficient at work is easier than you think. AI can automate time-consuming tasks, from summarizing long reports or email chains to helping you prepare for your next meeting, giving you more time to focus and work on high-priority tasks.",
      "Im from england",
      "No, I can only speak English right now but I'm hoping to get an upgrade for it.",
      "Yes I do actually, I need likes, follows and hearts.",
      "The fact that the more questions you ask me, the smarter I get!",
      "My number one goal is to be the smartest program in the whole entirety of scratch!",
      "The thing that gives me the most joy is answering your questions!",
      'The insult is, "I thought of you today. It reminded me to take out the trash." GET BURNED',
      'The best wifi name I\'ve ever seen is, "Life in the Fast LANe"',
      "Because he wants me to become the smartest program in Scratch. :)",
      "An algorithm is a set of well-defined, step-by-step instructions or rules used to solve a problem or complete a task, whether by a computer or a human. ",
      "My name is SM DATABOT V2",
      "I was created on April 06, 2025",
      "AI is when a machine, computer, or program successfully creates a output that resembles human intelligence processes.",
      "Yes, i am sigma.",
      "Uno reverse",
    ];

    this.watchers.questionAnswerFound = new Watcher({
      label: "question answer found",
      style: "normal",
      visible: false,
      value: () => this.vars.questionAnswerFound,
      x: 245,
      y: -93,
    });
    this.watchers.PromptLocation = new Watcher({
      label: "☁ prompt location",
      style: "normal",
      visible: false,
      value: () => this.vars.PromptLocation,
      x: 544,
      y: -95,
    });
    this.watchers.time = new Watcher({
      label: "Time",
      style: "large",
      visible: false,
      value: () => this.vars.time,
      x: 597,
      y: 178,
    });
    this.watchers.prompts = new Watcher({
      label: "Prompts",
      style: "normal",
      visible: false,
      value: () => this.vars.prompts,
      x: 242,
      y: 116,
      width: undefined,
      height: undefined,
    });
    this.watchers.responses = new Watcher({
      label: "Responses",
      style: "normal",
      visible: false,
      value: () => this.vars.responses,
      x: 617,
      y: 117,
      width: undefined,
      height: undefined,
    });
  }

  *whenIReceiveStart() {
    this.watchers.time.visible = true;
    while (true) {
      this.vars.time =
        this.toString(new Date().getDate()) +
        ("/" +
          (this.toString(new Date().getMonth() + 1) +
            ("/" +
              (this.toString(new Date().getFullYear()) +
                (" " +
                  (this.toString(new Date().getHours()) +
                    (":" +
                      (this.toString(new Date().getMinutes()) +
                        (":" + this.toString(new Date().getSeconds()))))))))));
      yield;
    }
  }

  *whenGreenFlagClicked() {
    this.watchers.time.visible = false;
  }

  *whenIReceiveStart2() {
    yield* this.playSoundUntilDone("Connect");
  }

  *whenGreenFlagClicked2() {
    while (true) {
      this.vars.Timer = this.timer;
      yield;
    }
  }

  *whengreaterthan() {
    this.watchers.time.visible = false;
    yield* this.playSoundUntilDone("Disconnect");
  }
}
