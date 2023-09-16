# newspapers

Rotate through the daily front pages of newspapers around the world 📰

> This project is intended to power a physical display in my living room (an old iPad). I am providing all of the source code and design files here if you wish to replicate this project, but I am _not_ hosting a website for public consumption. I do not wish to violate hundreds of copyright policies.

## Software requirements

- This project relies on [Cloudflare Workers](https://workers.cloudflare.com/) to host the website, you can install the CLI for running and deploying workers [here](https://developers.cloudflare.com/workers/wrangler/install-and-update/).
- This project uses Node v20, download [here](https://nodejs.org/dist/v20.6.1/node-v20.6.1.pkg).

## Setup

```sh
$ git clone https://github.com/itsjoekent/newspapers.git
$ cd newspapers
$ npm ci
$ wrangler deploy
```

## iPad configuration

If you're running this on an iPad as a permenant display, I suggest the following settings,

- Sounds
  - Ringtone and alert volume -> off
- Focus
  - Do not disturb (always on)
- Displays & brightness
  - Dark
	- Brightness (lowest)
	- Night shift (Sunset to Sunrise)
	- Auto-lock (never)

Next, open Safari and visit the domain of your deployed Cloudflare Worker. Click the share icon in the top right, and add it to your homescreen (this will allow for fullscreen without the Safari url bar).

After that, create a shortcut automation (Shortcuts app -> swipe left edge to right -> automations -> plus sign in top left corner). Create one that launches at sunrise and sets the screen brightness higher (eg: 15%), and create another that launches at sunset and sets the screen brightness to 0%. Make sure both automations have "Ask before running" and "Notify when run" unchecked. If you want the screen totally off, just manually click the lock button on the iPad.

Finally, launch your bookmarked app, and leave the iPad in your frame hanging up.
