//hacemos la conexion con la api
let marvelData = {
    apiUrl: 'https://gateway.marvel.com:443/v1/public/characters?orderBy=name&ts=1&apikey=0251c6712c5f2c20c59d8ba75f496553&hash=deca2c972757f69695680d553deff484',

    setUrl(page, queryName, id) {
        urlApi = this.apiUrl
        if (id != '' && queryName.length == 0) {
            urlApi = this.apiUrl + `&id=${id}`
        } else if (queryName != "" && id == '') {
            urlApi = this.apiUrl + `&nameStartsWith=${queryName}`
        } else
            if (home.status.page > 1 && queryName == "") {
                queryOffset = (page + 1) * home.status.rows;
                urlApi = this.apiUrl + `&limit=${home.status.rows}&offset=${queryOffset}`
            } else {
                let queryOffset = 0
                urlApi = this.apiUrl + `&limit=${home.status.rows}&offset=${queryOffset}`
            }
        return urlApi
    },

    conectionApi(url) {
        // console.log(urlApi);
        fetch(url)
            .then((res) => res.json())
            .then((json) => {
                //si no hay datos mostramos un mensaje
                if (json.data.results.length == 0) {
                    alert("Your search didn't match any result, please try with a different word");
                }
                //si hay datos y estamos en el index traemos los personajes y armamos el listado
                else if (window.location.pathname.includes('index.html')) {
                    renderView.renderList(json.data);
                    console.log(json.data, 'Index')
                }
                //si hay datos y estamos en el detalle traemos los personajes y armamos el detalle
                else if (window.location.pathname.includes('character-details.html')) {
                    renderView.renderDetails(json.data);
                    console.log(json.data, 'Detalles')
                }
            })

    },

    fetchData() {
        this.conectionApi(this.setUrl(home.status.page, home.searchInput.value, home.status.selectedId))
    }

}


