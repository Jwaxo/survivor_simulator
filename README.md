# Survivor Simulator
A React simulation of a social game.

### Requirements to Run
1. NPM version 18.0 (not tested with higher versions). https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
1. A browser.

## What is this?
This is a one-woman attempt to create a browser-based simulation of the CBS
game/reality show Survivor. In its final form, users will be able to create
players, set the rules, and live out a "season" of Survivor, with all other
players ran by the computer in a (hopefully) somewhat realistic manner.

## Main Paradigms
1. Basic Skill Checks. Any task a Player may perform has a Challenge Rating,
a threshold value that the Player must reach by performing a Skill Check. This
is done by "rolling" a twenty-sided die and then adding various modifiers based
on what Skill(s) the task requires. If the CR is met, the task is completed.
1. Basic Stat Blocks. Each Player has the 6 classic stats from Dungeons and
Dragons, as well as many other role playing games, because that is easy to
understand at a glance and provides some simplified ways to modify rolls. Also
we need an arbitrary system and I like D&D.
1. Complex Modifiers. We're using a simple system to make the checks, but the
entire thing is being ran by a computer, so we can have as many modifiers as we
think necessary to add up to the Player's Skill Check. This includes hunger,
thirst, happiness, mood, and cohesion with other players.
1. Complex Interactions. Survivor is often described by its players as a game of
"trust versus knowledge", where players can use one in order to gain the other,
and vise-versa. Our simulated Players can do the same thing, building up a
Library, composed of different pieces of Knowledge, that helps them be informed
about what other Players do what, and to form opinions on other Players. Adding
on to the complexity is that Players can, of course, lie to each other, making
each piece of Knowledge suspect. All of these can affect what Players do in the
moment, who they ally with, and who they vote for.

## Current Status
This is heavily work-in-progress and (assuming this README is up-to-date) not
much for an individual user to do yet.

### Roadmap
0.01: You are here. Players can be created and sorted into Tribes, and a basic
UI exists.
0.02: Simulated tribe life is complete and NPCs are capable of gathering food,
making fire, and building a camp, as well as interacting with each other to
build (or break) bonds.
0.1: Tribes can compete in Challenges, using Skill Checks to beat other Tribes
in various set goals and obstacles.
0.11: Developers can easily create Challenges by using a Challenge Builder UI.
0.12: Tribes can gain rewards that increases the complexity of Tribal life.
0.2: Tribes can now participate in Tribal Council, where one Player is voted off.
0.21: Tribal Council is easier to set up with a Jeff Builder UI.
0.22: Players can be removed from the game via Medivac when their health OR
morale gets too low.
0.3: Tribes can merge, and an extremely simplified Season can be played out
(with no Jury and Final Tribal Council gimmick).
0.31: Any weirdness with individual Challenges gets hammered out.
0.32: Jury gets built after a certain point (configured per-Season) and gains
Knowledge during Tribal Council.
0.4: Final Tribal Council can be ran, with Jury members asking questions that
can affect the final vote.
0.5: A human Player can replace/take over any NPC within the game, making
choices and clicking the "roll dice" button for skill checks. Ideally this has
been subtly getting support along every previous step.
1.0: A human Player can be created at game start and an entire Season of
Survivor can be played through, with NPCs acting as allies and obstructions to
the final goal.

## How to Run
It should be very simple!
1. Make sure you have NPM 18 installed.
1. Navigate to this directory.
1. Run `npm run`.
1. If a browser window doesn't automatically open, navigate to http://localhost:3000
