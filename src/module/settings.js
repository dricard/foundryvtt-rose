export const registerSettings = function () {

  game.settings.register("rose", "initiative", {
    name: game.i18n.localize("ROSE.Setting.Initiative"),
    hint: game.i18n.localize("ROSE.Setting.InitiativeHint"),
    default: "group",
    scope: "world",
    type: String,
    config: true,
    choices: {
      individual: "ROSE.Setting.InitiativeIndividual",
      group: "ROSE.Setting.InitiativeGroup",
    },
    onChange: _ => window.location.reload()
  });

  game.settings.register("rose", "rerollInitiative", {
    name: game.i18n.localize("ROSE.Setting.RerollInitiative"),
    hint: game.i18n.localize("ROSE.Setting.RerollInitiativeHint"),
    default: "reset",
    scope: "world",
    type: String,
    config: true,
    choices: {
      keep: "ROSE.Setting.InitiativeKeep",
      reset: "ROSE.Setting.InitiativeReset",
      reroll: "ROSE.Setting.InitiativeReroll",
    }
  });

  game.settings.register("rose", "ascendingAC", {
    name: game.i18n.localize("ROSE.Setting.AscendingAC"),
    hint: game.i18n.localize("ROSE.Setting.AscendingACHint"),
    default: false,
    scope: "world",
    type: Boolean,
    config: true,
    onChange: _ => window.location.reload()
  });

  game.settings.register("rose", "morale", {
    name: game.i18n.localize("ROSE.Setting.Morale"),
    hint: game.i18n.localize("ROSE.Setting.MoraleHint"),
    default: false,
    scope: "world",
    type: Boolean,
    config: true,
  });

  game.settings.register("rose", "encumbranceOption", {
    name: game.i18n.localize("ROSE.Setting.Encumbrance"),
    hint: game.i18n.localize("ROSE.Setting.EncumbranceHint"),
    default: "detailed",
    scope: "world",
    type: String,
    config: true,
    choices: {
      disabled: "ROSE.Setting.EncumbranceDisabled",
      basic: "ROSE.Setting.EncumbranceBasic",
      detailed: "ROSE.Setting.EncumbranceDetailed",
      complete: "ROSE.Setting.EncumbranceComplete",
    },
    onChange: _ => window.location.reload()
  });

  game.settings.register("rose", "significantTreasure", {
    name: game.i18n.localize("ROSE.Setting.SignificantTreasure"),
    hint: game.i18n.localize("ROSE.Setting.SignificantTreasureHint"),
    default: 800,
    scope: "world",
    type: Number,
    config: true,
    onChange: _ => window.location.reload()
  });
};
