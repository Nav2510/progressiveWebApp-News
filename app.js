const apiKey= '2367cbb6ad2c44a3b56ab29dc0bb8594';
const main = document.querySelector('main');
const sourceSelector = document.querySelector('#sourceSelector');
const defaultSource =  'the-hindu';

window.addEventListener('load', async e => {
    updateNews();
    await updateSources();
    sourceSelector.value = defaultSource;

    sourceSelector.addEventListener('change', e => {
        updateNews(e.target.value);
    });

    if ('serviceWorker' in navigator) {
        try {
            navigator.serviceWorker.register('serviceWorker.js');
            console.log('Service Worker registered');
        } catch (error) {
            console.log('Service Worker registeration failed!!!');
        }
    }
});

async function updateSources() {
    const response = await fetch(`https://newsapi.org/v1/sources`);
    const json = await response.json();

    sourceSelector.innerHTML = json.sources
    .map(src => `<option value="${src.id}">${src.name}</option>`);
}

async function updateNews(source = defaultSource) {
    const response = await fetch(`https://newsapi.org/v1/articles?source=${source}&apiKey=${apiKey}`);
    const json = await response.json();
    
    
    main.innerHTML = json.articles.map(createArticle).join('\n');
}

function createArticle(article) {
    return `
    <div class="article">
        <a href="${article.url}">
            <h2>${article.title}</h2>
            </a>
            <img src="${article.urlToImage}">
            <p>${article.description}</p>
    </div>
    `;
}