# beer-money-tools

_[TamperMonkey](https://www.tampermonkey.net/) scripts to aid with surveys_

Welcome to beer-money-tools, a collection of scripts designed to help you in your quest to make money online. They don't circumvent or automate anything that's intended to be human-led, such as filling in surveys. They just help with decision-making when selecting the surveys themselves. Let's start with Qmee.

# Qmee

http://qm.ee/TX7YYE5VGMRQ2

I love Qmee for its interface and its low payout threshold. You can withdraw to PayPal at pretty much any time (although PayPal may require at least £1 to withdraw to your bank) or you can save for gift cards. You can also donate to charity if you want. I started by making the "Qmee Pro" script:

https://github.com/quacksecho/beer-money-tools/blob/main/Qmee%20Pro.user.js

This analyses the Qmee survey page after it loads, to calculate how much your time is worth for each survey. It displays it in the survey cell, and for a configurable threshold, activates a clickable notification for the survey. This allows you to work on other things, then when something worth your time comes up, you can click the notification and go straight into the survey.

I then came up with another version, called auto-click.

https://github.com/quacksecho/beer-money-tools/blob/main/Qmee%20Autoclick.user.js

NOTE: This does not fill out surveys for you. All it does is the same calculation as the Qmee Pro script, then activates the survey with the highest pence per minute value. You might need to tune the controls based on your internet speed.

The idea behind this one was to try and reduce the number of times you click on a high-paying survey and are screened out because their quota is already full. I have no actual idea how successful this is, but I figure it can't hurt my changes.

If I am fed up with the interruptions of using the auto-click version I just turn it off and turn Qmee Pro back on. That way when I have some spare minutes I can go over and fill out anything that seems worth my time.
