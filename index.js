async function updateAnimeData(animeData) {
    document.getElementById('title').innerText = animeData.title;
    document.getElementById('discription').innerText = animeData.synopsis;
    document.getElementById('type').innerText = animeData.type;
    document.getElementById('episodes').innerText = animeData.episodes;
    document.getElementById('status').innerText = animeData.status;
    document.getElementById('score').innerText = animeData.score;
    document.getElementById('year').innerText = animeData.aired.prop.from.year;
    console.log(animeData.title);
    const posterUrl = animeData.images.jpg.large_image_url;
    document.getElementById('poster').src = posterUrl;

    const animeUrl = animeData.url;
    document.getElementById('url').href = animeUrl;
    document.getElementById('url1').href = animeUrl;
}

async function randTitle() {
    const selectedYear = document.getElementById('yearSelect').value;
    const randomButton = document.getElementById('randomButton');

    randomButton.classList.add('loading');
    let response;
    let dd;
    let retryCount = false;

    while (retryCount != true) {
        response = await fetch(`https://api.jikan.moe/v4/random/anime${selectedYear ? `?year=${selectedYear}` : ''}`);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        dd = await response.json();

        if (selectedYear && dd.data.aired.prop.from.year === parseInt(selectedYear)) {
            await updateAnimeData(dd.data);
            randomButton.classList.remove('loading');
            return;
        } else if (!selectedYear) {
            await updateAnimeData(dd.data);
            randomButton.classList.remove('loading');
            return;
        } else {
            console.log(`Year mismatch: Selected ${selectedYear}, API returned ${dd.data.aired.prop.from.year}`);
            retryCount = false;
        }
    }

    console.error('Could not find a matching anime after 3 tries.');
    randomButton.classList.remove('loading');
}