const axios = require('axios');
const fs = require('fs/promises');
const path = require('path');

(async function () {
  console.log('Starting scraper...');
  try {
    const response = await axios.get(`https://api.freedomforum.org/cache/papers.js?_=${Date.now()}`);
    if (response.status !== 200) {
      throw new Error('Failed to load freedomforum.org :(');
    }

    const newspaperIds = response.data.map((newspaper) => newspaper.paperId);
    const urls = newspaperIds.map((id) => `https://cdn.freedomforum.org/dfp/jpg12/lg/${id}.jpg`);

    for (const url of urls) {
      const imageResponse = await axios.get(url, { responseType: 'arraybuffer' });
      if (imageResponse.status !== 200) {
        console.warn(`Failed to load ${url}`);
      }
    }

    await fs.writeFile(path.join(__dirname, 'newspapers.v1.json'), JSON.stringify(urls, null, 2));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();