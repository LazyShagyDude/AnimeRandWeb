async function randTitle() {
                const response = await fetch('https://api.jikan.moe/v4/random/anime');
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                const dd = await response.json();
                document.getElementById('title').innerText = dd.data.title;
                document.getElementById('url').href = dd.data.url;
                document.getElementById('discription').innerText = dd.data.synopsis;
                document.getElementById('type').innerText = dd.data.type;
                document.getElementById('episodes').innerText = dd.data.episodes;
                document.getElementById('status').innerText = dd.data.status;
                document.getElementById('score').innerText = dd.data.score;
                console.log(dd.data.title)
                    const posterUrl = dd.data.images.jpg.large_image_url;
                    document.getElementById('poster').src = posterUrl;
        }