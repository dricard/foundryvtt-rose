// Import Modules
import { RoseItemSheet } from "./module/item/item-sheet.js";
import { RoseActorSheetCharacter } from "./module/actor/character-sheet.js";
import { RoseActorSheetMonster } from "./module/actor/monster-sheet.js";
import { preloadHandlebarsTemplates } from "./module/preloadTemplates.js";
import { RoseActor } from "./module/actor/entity.js";
import { RoseItem } from "./module/item/entity.js";
import { ROSE } from "./module/config.js";
import { registerSettings } from "./module/settings.js";
import { registerHelpers } from "./module/helpers.js";
import * as chat from "./module/chat.js";
import * as treasure from "./module/treasure.js";
import * as macros from "./module/macros.js";
import * as party from "./module/party.js";
import { RoseCombat } from "./module/combat.js";

/* -------------------------------------------- */
/*  Foundry VTT Initialization                  */
/* -------------------------------------------- */

Hooks.once("init", async function () {
  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: "1d6 + @initiative.value",
    decimals: 2,
  };

  CONFIG.ROSE = ROSE;

  game.rose = {
    rollItemMacro: macros.rollItemMacro,
  };

  // Custom Handlebars helpers
  registerHelpers();

  // Register custom system settings
  registerSettings();

  CONFIG.Actor.entityClass = RoseActor;
  CONFIG.Item.entityClass = RoseItem;

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("rose", RoseActorSheetCharacter, {
    types: ["character"],
    makeDefault: true,
  });
  Actors.registerSheet("rose", RoseActorSheetMonster, {
    types: ["monster"],
    makeDefault: true,
  });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("rose", RoseItemSheet, { makeDefault: true });

  await preloadHandlebarsTemplates();
});

/**
 * This function runs after game data has been requested and loaded from the servers, so entities exist
 */
Hooks.once("setup", function () {
  // Localize CONFIG objects once up-front
  const toLocalize = ["saves_short", "saves_long", "scores", "armor", "colors", "tags"];
  for (let o of toLocalize) {
    CONFIG.ROSE[o] = Object.entries(CONFIG.ROSE[o]).reduce((obj, e) => {
      obj[e[0]] = game.i18n.localize(e[1]);
      return obj;
    }, {});
  }
});

Hooks.once("ready", async () => {
  Hooks.on("hotbarDrop", (bar, data, slot) =>
    macros.createRoseMacro(data, slot)
  );
});

// License
Hooks.on("renderSidebarTab", async (object, html) => {
  if (object instanceof ActorDirectory) {
    party.addControl(object, html);
  }
  if (object instanceof Settings) {
    let gamesystem = html.find("#game-details");
    // SRD Link
    let ose = gamesystem.find('h4').last();
    ose.append(` <sub><a href="https://oldschoolessentials.necroticgnome.com/srd/index.php">SRD<a></sub>`);

    // License text
    const template = "systems/rose/templates/chat/license.html";
    const rendered = await renderTemplate(template);
    gamesystem.find(".system").append(rendered);
    
    // User guide
    let docs = html.find("button[data-action='docs']");
    const styling = "border:none;margin-right:2px;vertical-align:middle;margin-bottom:5px";
    $(`<button data-action="userguide"><img src='/systems/rose/assets/dragon.png' width='16' height='16' style='${styling}'/>Old School Guide</button>`).insertAfter(docs);
    html.find('button[data-action="userguide"]').click(ev => {
      new FrameViewer('https://github.com/dricard/foundryvtt-rose', {resizable: true}).render(true);
    });
  }
});

Hooks.on("preCreateCombatant", (combat, data, options, id) => {
  let init = game.settings.get("rose", "initiative");
  if (init == "group") {
    RoseCombat.addCombatant(combat, data, options, id);
  }
});

Hooks.on("preUpdateCombatant", RoseCombat.updateCombatant);
Hooks.on("renderCombatTracker", RoseCombat.format);
Hooks.on("preUpdateCombat", RoseCombat.preUpdateCombat);
Hooks.on("getCombatTrackerEntryContext", RoseCombat.addContextEntry);

Hooks.on("renderChatLog", (app, html, data) => RoseItem.chatListeners(html));
Hooks.on("getChatLogEntryContext", chat.addChatMessageContextOptions);
Hooks.on("renderChatMessage", chat.addChatMessageButtons);
Hooks.on("renderRollTableConfig", treasure.augmentTable);
Hooks.on("updateActor", party.update);