# Changelog
All notable changes to this project will be documented in this file.

## [0.0.1] - 2020-09-17: Fork from u-man's ROSE project
### Changed
- renamed 'rose' to distinguish the two forks (Ricard's Old-School Essentials);
- change 'gold' to 'quid' at character generation;
- change character's stat generation from 3d6 to best 3 of 4d6;
- added the total number of 'rolls' made during character creation to the character summary in chat (enforce a limit);
- added 'coin type', 'container' boolean, and 'containerWeight' to the 'item' type;
- changed the way item weight is computer from `quantity x weight` to `quantity x weight + containerWeight`. This way a container's weight can be managed for full or empty. For instance a lantern, with a pint of oil that lasts for 4 hours, would have a quantity of `4/4`, a weight of `3.25` (each 4th of the pint of oil) and a containerWeight of `17`, so a full lantern would weight 30 coins, an empty one would weight 17, and one with 2 hours of oil left would weight 23.5.
- changed the item-sheet (template and js) to manage the new properties;
- change the character sheet inventory tab to display the new way of computing the weight, taking `containerWeight` into account;
- added a few things to the "modifiers" dialog: initial number of spells and chance of copy scrolls;
- change the effect of `slow` weapons on initiative: instead of going last, gives a -2 to initiative;
- add basic Critical and Fumble rolls to character sheet