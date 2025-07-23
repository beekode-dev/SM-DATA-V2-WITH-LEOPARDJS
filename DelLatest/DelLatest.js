/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class DelLatest extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./DelLatest/costumes/costume1.svg", {
        x: 74.68118195956455,
        y: 19.25,
      }),
    ];

    this.sounds = [new Sound("pop", "./DelLatest/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.KEY_PRESSED, { key: "d" }, this.whenKeyDPressed),
      new Trigger(Trigger.KEY_PRESSED, { key: "f" }, this.whenKeyFPressed),
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked),
    ];
  }

  *whenKeyDPressed() {
    this.visible = true;
  }

  *whenKeyFPressed() {
    this.visible = false;
  }

  *whenthisspriteclicked() {
    yield* this.askAndWait("ARE YOU SURE ( THIS WILL DELETE LATEST INPUT) y/n");
    if (this.answer === "y") {
      yield* this.askAndWait("What would you like do delete? p/r/b");
      if (this.answer === "p") {
        this.stage.vars.prompts.splice(this.stage.vars.prompts.length - 1, 1);
      } else {
        if (this.answer === "r") {
          this.stage.vars.responses.splice(
            this.stage.vars.responses.length - 1,
            1
          );
        } else {
          if (this.answer === "b") {
            this.stage.vars.responses.splice(
              this.stage.vars.responses.length - 1,
              1
            );
            this.stage.vars.prompts.splice(
              this.stage.vars.prompts.length - 1,
              1
            );
          } else {
            null;
          }
        }
      }
    } else {
      null;
    }
  }
}
