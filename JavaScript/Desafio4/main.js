//Desafio 4 - 1
function checaIdade(idade) {
    var timeout = 2000;

    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            idade >= 18 ? resolve() : reject();
        }, timeout);
    });
};

// checaIdade(16).then(function(){
//     console.log('Maior que 18');
// }).catch(function(){
//     console.log('Menor que 18');
// });

//Desafio 4 - 4

var repos = JSON.parse(localStorage.getItem('repos'));

var inputElement = document.querySelector('#app input[name=user]');

var buttonElement = document.querySelector('#app button');

var reposList = document.querySelector('#app ul');

var url = '';

renderRepos();

buttonElement.onclick = function () {
    if (inputElement.value != '') {
        url = 'https://api.github.com/users/' + inputElement.value + '/repos';

        inputElement.value = '';
        repos = [];
        repos.push('Carregando...');
        renderRepos();

        axios.get(url).then(function (response) {
            repos = [];

            response.data.forEach(repo => {
                repos.push(repo.name);
            });

            localStorage.setItem('repos', JSON.stringify(repos));
            renderRepos();
        }).catch(function (error) {
            inputElement.value = '';
            repos = [];

            if (error.response.status === 404) {
                repos.push('Usuário não encontrado.');
            } else {
                repos.push('Error na requisição.');
            }
            renderRepos();
        });
    }
}


function renderRepos() {
    reposList.innerHTML = '';

    repos.forEach(repo => {
        var repoElement = document.createElement('li');
        var repoText = document.createTextNode(repo);

        repoElement.appendChild(repoText);
        reposList.appendChild(repoElement);
    });
}

