/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Thumbnail extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("SM DATA logo", "./Thumbnail/costumes/SM DATA logo.svg", {
        x: 240,
        y: 180,
      }),
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
    ];
  }

  *whenGreenFlagClicked() {
    yield* this.wait(1);
    for (let i = 0; i < 50; i++) {
      this.effects.ghost += 0.5;
      yield;
    }
    for (let i = 0; i < 50; i++) {
      this.effects.ghost += 1;
      yield;
    }
    for (let i = 0; i < 50; i++) {
      this.effects.ghost += 1;
      yield;
    }
    this.broadcast("START");
  }
}
