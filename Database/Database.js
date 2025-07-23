/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Database extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("SM DATA logo", "./Database/costumes/SM DATA logo.svg", {
        x: 66.5,
        y: 65,
      }),
      new Costume(
        "SM DATA logo with uno reverse card",
        "./Database/costumes/SM DATA logo with uno reverse card.svg",
        { x: 66.5, y: 69.52291151953284 }
      ),
      new Costume(
        "UNO REVERSE CARD GREEN OHHH",
        "./Database/costumes/UNO REVERSE CARD GREEN OHHH.png",
        { x: 164, y: 264 }
      ),
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "START" }, this.whenIReceiveStart),
      new Trigger(
        Trigger.BROADCAST,
        { name: "START" },
        this.whenIReceiveStart2
      ),
      new Trigger(Trigger.BROADCAST, { name: "VOICE" }, this.whenIReceiveVoice),
      new Trigger(
        Trigger.BROADCAST,
        { name: "VOICE ANSWER" },
        this.whenIReceiveVoiceAnswer
      ),
    ];
  }

  *whenGreenFlagClicked() {
    this.stage.vars.questionAnswerFound = "false";
    this.stage.vars.PromptLocation = 1;
  }

  *whenIReceiveStart() {
    /* TODO: Implement text2speech_setLanguage */ null;
    /* TODO: Implement text2speech_setVoice */ null;
    this.costume = "SM DATA logo";
    yield* this.askAndWait(
      "Say something or ask any question to ask me or teach me"
    );
    this.stage.vars.questionAnswerFound = "false";
    this.stage.vars.PromptLocation = 1;
    for (let i = 0; i < this.stage.vars.prompts.length; i++) {
      if (
        this.stringIncludes(
          this.answer,
          this.toString(
            this.itemOf(
              this.stage.vars.prompts,
              this.stage.vars.PromptLocation - 1
            )
          )
        )
      ) {
        if (
          !this.stringIncludes(this.stage.vars.prompts.join(" "), this.answer)
        ) {
          this.stage.vars.prompts.push(this.answer);
          this.stage.vars.responses.push(
            this.itemOf(
              this.stage.vars.responses,
              this.stage.vars.PromptLocation - 1
            )
          );
        }
        if (
          this.toString(
            this.itemOf(
              this.stage.vars.responses,
              this.stage.vars.PromptLocation - 1
            )
          ) === "Uno reverse"
        ) {
          this.costume = "SM DATA logo with uno reverse card";
          this.broadcast("VOICE ANSWER");
          this.stage.vars.questionAnswerFound = "true";
          this.say(
            this.itemOf(
              this.stage.vars.responses,
              this.stage.vars.PromptLocation - 1
            )
          );
          while (
            !(
              this.keyPressed("space") ||
              (this.touching("mouse") && this.mouse.down)
            )
          ) {
            yield;
          }
          this.stage.vars.questionAnswerFound = "false";
          this.broadcast("START");
        } else {
          this.costume = "SM DATA logo";
          this.broadcast("VOICE ANSWER");
          this.stage.vars.questionAnswerFound = "true";
          this.say(
            this.itemOf(
              this.stage.vars.responses,
              this.stage.vars.PromptLocation - 1
            )
          );
          while (
            !(
              this.keyPressed("space") ||
              (this.touching("mouse") && this.mouse.down)
            )
          ) {
            yield;
          }
          this.stage.vars.questionAnswerFound = "false";
          this.broadcast("START");
          this.costume = "SM DATA logo";
        }
      } else {
        this.stage.vars.PromptLocation++;
      }
      yield;
    }
    if (this.toString(this.stage.vars.questionAnswerFound) === "false") {
      this.broadcast("VOICE");
      this.stage.vars.prompts.push(this.answer);
      yield* this.askAndWait(
        "Sorry, but I do not know how to answer this question, what should I say next time?"
      );
      this.stage.vars.responses.push(this.answer);
      while (
        !(
          this.keyPressed("space") ||
          (this.touching("mouse") && this.mouse.down)
        )
      ) {
        yield;
      }
      this.stage.vars.questionAnswerFound = "false";
      this.broadcast("START");
    }
  }

  *whenIReceiveStart2() {
    while (true) {
      while (
        !(
          this.keyPressed("space") ||
          (this.touching("mouse") && this.mouse.down)
        )
      ) {
        yield;
      }
      /* TODO: Implement text2speech_speakAndWait */ null;
      yield;
    }
  }

  *whenIReceiveVoice() {
    /* TODO: Implement text2speech_speakAndWait */ null;
  }

  *whenIReceiveVoiceAnswer() {
    /* TODO: Implement text2speech_speakAndWait */ null;
  }
}
