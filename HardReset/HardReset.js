/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class HardReset extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./HardReset/costumes/costume1.svg", {
        x: 74.50000000000009,
        y: 20,
      }),
    ];

    this.sounds = [new Sound("pop", "./HardReset/sounds/pop.wav")];

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
    yield* this.askAndWait("ARE YOU SURE ( THIS WILL RESET ALL MEMORY) y/n");
    if (this.answer === "y") {
      this.stage.vars.prompts = [];
      this.stage.vars.responses = [];
    } else {
      null;
    }
  }
}
