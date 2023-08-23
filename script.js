const btn = document.getElementById('catButton');
const img = document.getElementById('catImage');
const catApiKey = 'live_0ExDE0tW9dZ0gDpvYv1sKTvncdnHJqBNAIa9ZqxiyQmv9KpsLqofg9wROMb28GWY';
const catURL = 'https://api.thecatapi.com/v1/images/search';
const dogURL = 'https://dog.ceo/api/breeds/image/random';
const catSound = new Audio('meow.wav');
const dogSound = new Audio('dog.wav');

btn.addEventListener('click', fetchRandomAnimal);

function fetchRandomAnimal() {

    const randomAnimal = Math.random() < 0.5 ? 'cat' : 'dog';
    const apiUrl = randomAnimal === 'cat' ? catURL : dogURL;
    const sound = randomAnimal === 'cat' ? catSound : dogSound;

    if (randomAnimal === 'cat') {
        fetch(apiUrl, {
            headers: {
                'x-api-key': catApiKey
            }
        })
        .then(response => response.json())
        .then(data => {
            const catImageUrl = data[0].url;
            img.src = catImageUrl;
            img.alt = "Random Cat";
            sound.play();
        })
        .catch(error => {
            console.error('Error fetching cat image:', error);
            img.src = ''; 
            img.alt = 'Error loading image';
        });
    } else {
        fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const dogImageUrl = data.message;
            img.src = dogImageUrl;
            img.alt = "Random Dog";
            sound.play();
        })
        .catch(error => {
            console.error('Error fetching dog image:', error);
            img.src = ''; 
            img.alt = 'Error loading image';
        });
    }
}
