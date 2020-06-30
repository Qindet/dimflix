
 async function  getMovie(url) {
   
    const API = "0442fc3531842a22b74c6969e9941edc"
    let json = await fetch(`https://api.themoviedb.org/3/search/tv?query=marvel&api_key=${API}&language=en-US&page=1&include_adult=false`)
   
    let res = await json.json()
    console.log(res) 
     
}

getMovie()

console.log(1)