//usamos el localStorage para guardar los favoritos
localStorage.getItem("favs") === null && localStorage.setItem("favs", "[]");
sessionStorage.setItem("offset", 0);
//armamos la vista
let home = {
    paginationDiv: document.getElementById('pagination'),
    characterBox: document.getElementById("marvel-characters"),
    searchInput: document.getElementById('searchInput'),
    searchBtn: document.getElementById('btnSearch'),
    header: document.getElementById('marvel-app'),
    containerInfo: document.getElementById('character-info'),
    titleSection: document.getElementById('titleSection'),
    spinner: document.getElementById('spinner'),
    spinnerBack: document.getElementById('spinnerBack'),
    clickSearch: document.getElementById('btnSearch').addEventListener("click", function () {
        console.log('click');
    }),
    status: {
        page: 1,
        rows: 30,
        window: 5,
        selectedId: '',
    },
    
    //función de búsqueda
    searchCharacter(e, clickSearch) {
        if (e.keyCode === 13) {
            e.preventDefault();
            this.titleSection.innerHTML = `Resultado de búsqueda`
            this.characterBox.innerHTML = ''
            marvelData.fetchData();
            this.searchInput.value = ''
            this.paginationDiv.innerHTML = ''
        }
    },

    searchCharacterClick(e, clickSearch) {
        if(clickSearch === undefined){
            clickSearch = true;
        }
        if (clickSearch !== false) {
            e.preventDefault();
            this.titleSection.innerHTML = `Resultado de búsqueda`
            this.characterBox.innerHTML = ''
            marvelData.fetchData();
            this.searchInput.value = ''
            this.paginationDiv.innerHTML = ''
        }
    },

    //creamos el paginador
    paginationBtn(pages) {
        this.paginationDiv.innerHTML = ''
        let maxLeft = (this.status.page - Math.floor(this.status.window / 2))
        let maxRight = (this.status.page + Math.floor(this.status.window / 2))

        if (maxLeft < 1) {
            maxLeft = 1
            maxRight = this.status.window
        }

        if (maxRight > pages) {
            maxLeft = pages - (this.status.window - 1)
            maxRight = pages
            if (maxLeft < 1) {
                maxLeft = 1
            }
        }
        //contamos las paginas
        for (let pageNumber = maxLeft; pageNumber <= maxRight; pageNumber++) {
            this.paginationDiv.innerHTML += `<button value="${pageNumber}" class="btn btn-page">${pageNumber}</button>`
        }
        //si el paginador no esta en la primera mostramos la flecha hacia atrás
        if (this.status.page != 1) {
            this.paginationDiv.innerHTML = `<button value="${1}" class="btn btn-page "><i class="fa fa-angle-double-left"></i></button>` + this.paginationDiv.innerHTML
        }
        //en el index agregamos la doble flecha y la quitamos del detalle
        if (this.status.page != pages && pages != '') {
            this.paginationDiv.innerHTML += `<button value="${pages}" class="btn btn-page "><i class="fa fa-angle-double-right"></i></button>`
        }
        //en el detalle agregamos un btn para volver a la home
        if (pages == '') {
            this.paginationDiv.innerHTML = `<button value="${1}" class ="btn btn-page back-home">Volver a inicio <i class="fa fa-arrow-left"></i></button>`
        }
    },
    
    //armamos el listado de personajes
    setList(img, ext, name, id) {
        spinnerBack.classList.remove('hidden');
        spinner.classList.remove('hidden');
        let div = document.createElement('div');
        div.setAttribute("class", "col-md-2");
        // div.setAttribute('id', 'character')
        div.innerHTML =
            `<div class="character-box" id="${id}" onclick="renderView.getId(this.id)">
            <img src="${img}.${ext}" alt= ${name} class="img-responsive">
            <div class="character-name">
                <h4 class="character-text">${name}</h4>
            </div>
        </div>`

        this.characterBox.appendChild(div);
        spinner.classList.add('hidden');
        spinnerBack.classList.add('hidden');
    },

    //armamos el detalle de personajes
    setDetails(id ,name, desc, img, extension, urls, resourceURI) {
        spinnerBack.classList.remove('hidden');
        spinner.classList.remove('hidden');
        let divDescription = document.createElement('div');
        divDescription.setAttribute("class", "col-md-8");

        let divImage = document.createElement('div');
        divImage.setAttribute("class", "card-body");

        this.containerInfo.innerHTML = `
        <div class="col-md-4">
            <img src="${img}.${extension}" class="card-img" id="${id}" resourceURI="${resourceURI}"alt="${name}">
        </div>`

        divImage.innerHTML = `<h2 class="card-title">${name}</h2>`
        //si hay una descripcion la imprimimos
        if (desc.length > 0) {
            divImage.innerHTML +=
                `<div class="card-text"><h4>Descripción</h4>
                    <p class="card-text">${desc}</p><br/>
                    <div class=""></div>
                </div>`
        }
        //si tiene links los imprimimos
        if (urls.length > 0) {
            divImage.innerHTML += `<div class="card-text related-links"><h4>Links relacionados</h4></div>`
            urls.forEach(el => {
                divImage.innerHTML += `
                        <div class="col-md-4 ext-links">
                            <a href="${el.url}" target="_blank" class="btn btn-page back-home ext-link">${el.type}</a>
                    <div>`
            })
        }
        divDescription.appendChild(divImage);
        this.containerInfo.appendChild(divDescription);
        spinner.classList.add('hidden');
        spinnerBack.classList.add('hidden');
    },
    
}

home.searchBtn.addEventListener('keyUp', (e) => {
    if(e.keyCode === 13){
        home.searchCharacter();
    }
});

home.paginationDiv.addEventListener('click', (e) => {
    home.characterBox.innerHTML = ''
    let btnSelecc = e.target;
    home.status.page = parseInt(btnSelecc.value)
    marvelData.fetchData();
});