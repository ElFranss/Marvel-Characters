let renderView = {
    getId(clicked_id) {
        window.localStorage.setItem('characterId', clicked_id)
        location.href = 'character-details.html'
    },

    renderList(list) {
        home.characterBox.innerHTML = '';
        let pages = Math.ceil(list.total / home.status.rows)
        if (pages > 60) {
            pages = 60
        }

        list.results.forEach((el) => {
            home.setList(el.thumbnail.path, el.thumbnail.extension, el.name, el.id)
        })
        home.paginationBtn(pages)
    },

    renderDetails(characterInfo) {
        home.containerInfo.innerHTML = '';
        
        console.log(characterInfo.results[0].comics.items[0].name);

        home.setDetails(characterInfo.results[0].id, characterInfo.results[0].name, characterInfo.results[0].description, characterInfo.results[0].thumbnail.path, characterInfo.results[0].thumbnail.extension, characterInfo.results[0].urls);
        home.paginationBtn('')
    },
}