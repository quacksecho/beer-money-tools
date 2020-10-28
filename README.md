# beer-money-tools

_[TamperMonkey](https://www.tampermonkey.net/) scripts to aid with surveys_

Welcome to beer-money-tools, a collection of scripts designed to help you in your quest to make money online. They don't circumvent or automate anything that's intended to be human-led, such as filling in surveys. They just help with decision-making when selecting the surveys themselves. Let's start with Qmee.

## Qmee Pro

Earn money by completing surveys and cashback offers:

http://qm.ee/TX7YYE5VGMRQ2

I love Qmee for its interface and its low payout threshold. You can withdraw to PayPal at pretty much any time (although PayPal may require at least £1 to withdraw to your bank) or you can save for gift cards. You can also donate to charity if you want. I started by making the "Qmee Pro" script:

https://github.com/quacksecho/beer-money-tools/blob/main/Qmee%20Pro.user.js

This analyses the Qmee survey page after it loads, to calculate how much your time is worth for each survey. It displays it in the survey cell, and for a configurable threshold, activates a clickable notification for the survey. This allows you to work on other things, then when something worth your time comes up, you can click the notification and go straight into the survey.

I then came up with another version, called auto-click.

https://github.com/quacksecho/beer-money-tools/blob/main/Qmee%20Autoclick.user.js

NOTE: This does not fill out surveys for you. All it does is the same calculation as the Qmee Pro script, then activates the survey with the highest pence per minute value. You might need to tune the controls based on your internet speed.

The idea behind this one was to try and reduce the number of times you click on a high-paying survey and are screened out because their quota is already full. I have no actual idea how successful this is, but I figure it can't hurt my changes.

If I am fed up with the interruptions of using the auto-click version I just turn it off and turn Qmee Pro back on. That way when I have some spare minutes I can go over and fill out anything that seems worth my time.

## Swagbucks Pro

Earn money completing surveys, cashback offers, completing other tasks such as paid search or watching videos:

https://www.swagbucks.com/profile/quacksecho

After you sign up, you should also add the SwagButton to your browser:

https://www.swagbucks.com/lp-savings-button?cmp=695&cxid=swagbuttonref&rb=50889691&extRefCmp=1&extRb=50889691

Finally, install the TamperMonkey script:

https://github.com/quacksecho/beer-money-tools/blob/main/Swagbucks%20Survey%20Pro.user.js

This is a little less polished and more manual than Qmee Pro. The Swagbucks Survey Pro script calculates the SB per minute for each survey and sorts the list so the highest rate surveys appear at the top. This will help you make decisions about how to maximise your return on your time investment.

## Non-scripted ways to make money

If you've made it this far, you may be looking for other ways to make money online. Here are some other links which might help you out.

### Passive income

Make money with minimal effort. These options just require you to install an app on your phone, or a browser plugin, or a desktop program, and you earn a small amount of cash from each as long as they stay running.

* HoneyGain: https://r.honeygain.me/HONEY5B6 (Share your bandwidth for cash)

### Online share trading sign-up offers

Use these referrals to get a free share, which you can then sell or keep. Trading212 offers fractional share trading if that interests you, so you can try your hand at investing with very low amounts of cash to see how it works.

* Trading212: http://www.trading212.com/invite/FMJXbLtB (Use referral code FMJXbLtB to get a free share if you sign up and invest £1, often worth around £10 but potentially more)
* FreeTrade: https://freetrade.io/freeshare/?code=KJWIQOBHIS&sender=Tqsqd0Jh (Use referral link, when you make a small investment you will receive a free share, usually around £10 but potentially up to £200)

### Mobile surveys

Most of these are fast, low paying surveys which build up over time. I've tried to arrange them in my preferred order, which is lowest payout threshold to highest.

* 1Q: http://1Q.com/r5rm2n (single-question surveys that pay out 25 cents instantly to your PayPal account)
* BigToken: https://invite.bigtoken.com/6mDZX5YkXgStSvW49 (Take payout once per quarter to your PayPal account)
* Zap Surveys: https://bdr3.app.link/ZK18chuQWab (Cash out when you reach $25, PayPal, Amazon and others)
