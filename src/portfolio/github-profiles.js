const api_url = 'https://api.github.com/users/';

const main   = document.getElementById('main');
const form   = document.getElementById('form');
const search = document.getElementById('search');

getUser('robertgregg3');

async function getUser(username){
    const response = await fetch(api_url + username);
    const responseData = await response.json();

    createUserCard(responseData);

    getRepos(username);
}

async function getRepos(username) {
    const response = await fetch(api_url + username + '/repos');
    const responseData = await response.json();
    addReposToCard(responseData);
}

function createUserCard(user){
    const cardHTML = `
        <div class="card">    
            <div class="info-container">
                <div class="img-container">
                    <img 
                        class="avatar"
                        src="${user.avatar_url}"
                        alt="${user.name}" 
                    />
                </div>
                <div class="user-info">
                    <h2>${user.name}</h2>
                    <p>${user.bio}</p>
                    <ul class="info">
                        <li><i class="far fa-eye"></i>${user.followers}</li>
                        <li><i class="fas fa-heart"></i>${user.following}</li>
                        <li><i class="fas fa-code-branch"></i>${user.public_repos}</li>
                    </ul>
                </div>
            </div>
            <div class="repo-container">    
                <div class="repos" id="repos"></div>
            </div>
        </div>
    `;

    main.innerHTML = cardHTML;
}

function addReposToCard(repos) {
    const reposEl = document.getElementById('repos');

    repos.forEach(repo => {
        const repoEl = document.createElement('a');
        repoEl.classList.add('repo');

        repoEl.href      = repo.html_url;
        repoEl.target    = "_blank";
        repoEl.innerText = repo.name;

        reposEl.appendChild(repoEl);
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const user = search.value;

    if (user) {
        getUser(user);

        search.value = '';
    }
});