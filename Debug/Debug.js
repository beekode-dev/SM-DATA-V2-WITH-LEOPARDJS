/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Debug extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Debug/costumes/costume1.svg", { x: 0, y: 0 }),
    ];

    this.sounds = [new Sound("pop", "./Debug/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.KEY_PRESSED, { key: "d" }, this.whenKeyDPressed),
      new Trigger(Trigger.KEY_PRESSED, { key: "f" }, this.whenKeyFPressed),
    ];
  }

  *whenKeyDPressed() {
    this.stage.watchers.PromptLocation.visible = true;
    this.stage.watchers.questionAnswerFound.visible = true;
    this.stage.watchers.prompts.visible = true;
    this.stage.watchers.responses.visible = true;
  }

  *whenKeyFPressed() {
    this.stage.watchers.PromptLocation.visible = false;
    this.stage.watchers.questionAnswerFound.visible = false;
    this.stage.watchers.prompts.visible = false;
    this.stage.watchers.responses.visible = false;
  }
}
