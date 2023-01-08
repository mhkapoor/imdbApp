
const movieSearchBox =  document.getElementById("search-box");
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-container');

let clear ;




async function loadMovies(searchTerm){
    const URL=`http://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=7cadacdc`;

    const res = await fetch(`${URL}`);
    const data = await res.json();
    
    if(data.Response=="True") {
        displayMovieList(data.Search);
        return true
    }else{
        searchList.classList.add('hide-search-list');
        return false
    } ;
   
}

async function findMovies(){
    let searchTerm = (movieSearchBox.value).trim();
    if(searchTerm.length>0){
        const result =await loadMovies(searchTerm)
        if(result){
            searchList.classList.remove('hide-search-list');
        } 
    }else{
        searchList.classList.add('hide-search-list');
    }
}

setInterval(()=>{
    clear?.addEventListener('click',()=>{
        console.log("inside")
        resultGrid.innerHTML="";
        resultGrid.classList.remove("result-container-display");
    })  

},1000)

function displayMovieList(movies){
    searchList.innerHTML = "";
    for(let i=0;i<movies.length;i++){
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[i].imdbID;
        const classes = ['search-list-item', 'd-flex']
        movieListItem.classList.add(...classes)
        if(movies[i].Poster != "N/A"){
            moviePoster = movies[i].Poster;
        }else{
            moviePoster = "./images/no-image-icon.png"
        }
        movieListItem.innerHTML = `
        <div class="search-list-thumbnail">
            <img class="search-img" src=${moviePoster} alt="movie">
        </div>
        <div class="search-list-info mt-3">
            <h6 style="color: white;">${movies[i].Title}</h6>
            <p style="color: #dc5c5c;">${movies[i].Year}</p>
        </div>
        `
        searchList.appendChild(movieListItem);
       
    }
    loadMovieDetails()
}

function loadMovieDetails(){
    const searchListMovies = searchList.querySelectorAll(`
    .search-list-item`);
    searchListMovies.forEach(movie=>{
        movie.addEventListener('click',async ()=>{
            searchList.classList.add('hide-search-list');
            movieSearchBox.value="";
            const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=7cadacdc`)
            const movieDetails = await result.json();
            displayMovieDetail(movieDetails);
        })
    })
}

function displayMovieDetail(details){
    resultGrid.innerHTML=` 
    <div class="movie-poster">
    <div id="clear" class="clear" style="color:white;margin:10px;">Clear</div>
        <img style="height:400px; width: 400px;" src=${details.Poster!="N/A"?details.Poster:"./images/no-image-icon.png"} alt="poster">
        </div>
        <div class="movie-info text-center pt-4">
            <h3 class="movie-title d-flex justify-content-center">
                ${details.Title}
            </h3>
            <ul class="movie-misc-info d-flex justify-content-center">
                <li class="year ">Year: ${details.Year}</li>
                <li class="rated p-1">Rated: ${details.Rated}</li>
                <li class="released">Released: ${details.Released}</li>
            </ul>
                <p class="genre d-inline-block text-center p-1"> <b>Genre:</b>${details.Genre}</p>
                <p class="writer"> <b>Writer:</b>${details.Writer}</p>
                <p class="actors"> <b>Actors:</b>${details.Actors}</p>
                <p class="plot"> <b>Plot:</b>${details.Plot}</p>
                <p class="language"> <i style="color: #dc5c5c;">Language: ${details.Language}</i></p>
                <p class="awards"><i class='fas fa-award' style='font-size:48px;color:red'></i>${details.Awards}</p>
    </div>
    `
    resultGrid.classList.add("result-container-display");
   clear =  document.getElementById("clear");

}

movieSearchBox.addEventListener('input', (e) => {
    findMovies()
  });





 
