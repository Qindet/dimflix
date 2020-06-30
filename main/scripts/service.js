
 export default class  dbService {
     constructor() {
         this.API="0442fc3531842a22b74c6969e9941edc"
     }
    // https://api.themoviedb.org/3/search/tv?query=marvel&api_key=${this.API}&language=en-US&page=1&include_adult=false

     getTv = async () => {
        this.json = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${this.API}`)
        this.res = await this.json.json()
      
       return this.res
    }

    getMovie = async (keyword) => {
        this.json = await fetch(`https://api.themoviedb.org/3/search/company?query=${keyword}&api_key=${this.API}&page=1`)
        this.res = await this.json.json()
      
       return this.res
    }

    getResult = async (text) => {
        if (text == undefined) {
            this.result = await this.getTv()
        } else {
            this.result = await this.getMovie(text)
        }
        let title
        
        this.arr = this.result.results.map((obj) => {
            if ("name" in obj) {
                 title = obj.name
            } else {
                title = obj.title
            }
            return {
                rate: obj.vote_average,
                name: title,
                poster_path: obj.poster_path==null? "http://gps-avto.su/userfiles/shop/lgidr/492_gidrozamedlitel-zg10-18.jpg": `https://image.tmdb.org/t/p/w500/${obj.poster_path}`,
                id: obj.id,
                media_type: obj.media_type
            }
        })
   
       return this.arr
    }

    getKeywordMovie = async () => {

    }

    getInfo = async (id,type) => {
    
        if (type == "tv") {
        this.item_json = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${this.API}&language=en-US`)
        this.item_res = await this.item_json.json()
        } else {
            this.item_json = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${this.API}&language=en-US`)
            this.item_res = await this.item_json.json()
        }
        console.log(this.item_res)
        let title;
        if ("original_title" in this.item_res) {
            title =  this.item_res.original_title
        } else {
            title =  this.item_res.original_name
        }
        console.log(this.item_res.homepage)
        return {
            title: title,
            genres: this.item_res.genres,
            backdrop_path: this.item_res.backdrop_path,
            popularity: this.item_res.popularity,
            overview: this.item_res.overview,
            origin_language: this.item_res.original_language,
            homepage: this.item_res.homepage
            
        }

        
    }
}

