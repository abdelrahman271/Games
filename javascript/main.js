async function displaycards(category) {
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '7ce46aba71mshe1fae9900834e48p186369jsn361210cbec9c',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

        let response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options);
        let t = await response.json();

    let Data = "";
    for (let i = 0; i < t.length; i++) {
        Data += `
            <div class="col-sm-12 col-md-6 col-xl-3 d-flex justify-content-center">
                <div class="card mt-4 shadow" role="button" style="width: 18rem;" data-id="${t[i].id}">
                    <img src="${t[i].thumbnail}" class="card-img-top" alt="">
                    <div class="card-body">
                        <div class="card-title d-flex align-items-center justify-content-between">
                            <h5 class="text-light">${t[i].title}</h5>
                            <span class="btn btn-primary">free</span>
                        </div>
                        <p class="card-text text-light">${t[i].short_description}</p>
                        <div class="d-flex align-items-center justify-content-between">
                            <span class="badge bg-secondary">${t[i].genre}</span>
                            <span class="badge bg-secondary">${t[i].platform}</span>
                        </div>
                    </div>
                </div>
            </div>`;
    }
    document.getElementById('row').innerHTML = Data;

    let cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', function(a) {
            displaydetails(card.dataset.id);
        });
    });
}

// ========================================================================================================

async function displaydetails(id) {
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '7ce46aba71mshe1fae9900834e48p186369jsn361210cbec9c',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    let response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, options);
    let t = await response.json();

    let Data = `
    <div class="row">
        <div class="col-12 d-flex justify-content-between align-items-center my-4">
            <h1 class="text-light fs-2">Details Game</h1>
            <button type="button" class="btn-close btn-close-white" aria-label="Close" onclick="closeDetails()"></button>
        </div>
    </div>
    <div class="row">
        <div class="col-12 col-md-4">
            <img src="${t.thumbnail}" alt="" class="w-100 ">
        </div>
        <div class="col-12 col-md-8 py-3">
            <h2 class="text-light">Title: ${t.title}</h2>
            <h6 class="text-light">Category: <span class="badge text-bg-info">${t.genre}</span></h6>
            <h6 class="text-light">Platform: <span class="badge text-bg-info">${t.platform}</span></h6>
            <h6 class="text-light">Status: <span class="badge text-bg-info">${t.status}</span></h6>
            <p class="text-light py-3">${t.description}</p>
            <a class="btn btn-outline-warning text-light" href="${t.freetogame_profile_url}">Show Game</a>
        </div>
    </div>`;
    
    document.getElementById('de').innerHTML = Data;
    document.getElementById('main').style.display = 'none';
    document.getElementById('details').style.display = 'block';

    
}

// =========================================================================================================

function closeDetails() {
    document.getElementById('details').style.display = 'none';
    document.getElementById('main').style.display = 'block';
}

// ===========================================================================================



function display() {
    displaycards('mmorpg');
    document.querySelectorAll('ul li a').forEach(e => {
        e.addEventListener('click', function(a) {  
            let linkactive = document.querySelector('ul li a.active');
            if (linkactive) {
                linkactive.classList.remove('active');
            }
            e.classList.add('active');
            displaycards(a.target.id);
        });
    });
}


display();