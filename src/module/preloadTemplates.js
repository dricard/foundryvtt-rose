export const preloadHandlebarsTemplates = async function () {
    const templatePaths = [
        //Character Sheets
        'systems/rose/templates/actors/character-html.html',
        'systems/rose/templates/actors/monster-html.html',
        //Actor partials
        //Sheet tabs
        'systems/rose/templates/actors/partials/character-header.html',
        'systems/rose/templates/actors/partials/character-attributes-tab.html',
        'systems/rose/templates/actors/partials/character-abilities-tab.html',
        'systems/rose/templates/actors/partials/character-spells-tab.html',
        'systems/rose/templates/actors/partials/character-inventory-tab.html',
        'systems/rose/templates/actors/partials/character-notes-tab.html',

        'systems/rose/templates/actors/partials/monster-header.html',
        'systems/rose/templates/actors/partials/monster-attributes-tab.html'
    ];
    return loadTemplates(templatePaths);
};
