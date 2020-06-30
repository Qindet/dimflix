import dbService from './service.js'

async function main() {

const elm = document.querySelector('.main__elements')


async function render() {
    let arr = await new dbService().getResult()
    let complAr = arr.map(({rate,name,poster_path,id,media_type}) => {
       
        return `<div data-id=${id} data-type=${media_type} class="el">
                        <img class="el__img" src="${poster_path}" alt="">
                        <span class="el__rate">${rate==0?'Нет оценки':rate}</span>
                        <h4 class="el__title">${name}</h4>
                    </div>`
    })
    return complAr
}

let content = await render()


  for (let item of content) {
    elm.innerHTML += item
  }

}


function modal() {
    const elems = document.querySelector('.main__elements')
    const modal = document.querySelector('.modal')
    const modal_close = document.querySelector('.modal__close')

    elems.addEventListener('click', async (e) => {
        let target = e.target
        
        if (target.closest('.el')){
            let item_id = target.closest('.el').dataset.id
            let item_type = target.closest('.el').dataset.type
            console.log(item_id)
            modal.style.display = 'block';
          let info =await new dbService().getInfo(item_id, item_type)
          fillModal(info)
          console.log(info)
        }
    })
    modal_close.addEventListener('click', (e) => {
        modal.style.display= 'none'
    })

}

function fillModal({backdrop_path,title,genres,popularity,overview,origin_language,homepage}) {
    const img_page = document.querySelector('.modal__img'),
    title_page = document.querySelector('.modal__title'),
    genres_page = document.querySelector('.modal__genres'),
    review_page = document.querySelector('.modal__review'),
    popularity_page = document.querySelector('.modal__popularity'),
    lang_page = document.querySelector('.modal__lang'),
    homepage_page = document.querySelector('.modal__homepage')


    img_page.src= `https://image.tmdb.org/t/p/w500/${backdrop_path}`
    title_page.textContent = title
    genres_page.textContent = genres[0].name
    review_page.textContent = overview
    popularity_page.textContent = `Popularity rating: ${popularity}`
    lang_page.textContent = `Country: ${origin_language}`
    homepage_page.textContent = homepage
  
}







main().then(modal())