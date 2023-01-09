
const favoriteWrapper = document.getElementById("result-container");
let remove;



function removefnc(index,id){
    let data = localStorage.getItem("favorites")?JSON.parse(localStorage.getItem("favorites")):[];
    const result = data.filter(item=>item!=id)
    localStorage.setItem('favorites',JSON.stringify(result));
    window.location.reload()
}

function loadMovieDetails(){
    let searchListMovies = JSON.parse(localStorage.getItem('favorites'));
    console.log(searchListMovies);
    !!searchListMovies && searchListMovies?.length>0 && searchListMovies.forEach(async (movie,index)=>{
        const result = await fetch(`http://www.omdbapi.com/?i=${movie}&apikey=7cadacdc`)
        const movieDetails = await result.json(); 
        displayMovieDetail(movieDetails,movie,index);
      
    })
    console.log(favoriteWrapper)
    if(!searchListMovies || searchListMovies?.length == 0 ) {
        favoriteWrapper.innerHTML = `<div class='no-data d-flex'>No Data found</div>`
    };
}

function displayMovieDetail(details,id,index){
    let movieListItem = document.createElement('div');
    movieListItem.dataset.id = id;
    movieListItem.classList.add("movie-detail")
    movieListItem.innerHTML=` 
        <div class="movie-poster">
            <img  src=${details.Poster!="N/A"?details.Poster:"./images/no-image-icon.png"} alt="poster">
            </div>
            <div class="movie-info mt-2">
                <h6 class="movie-title">
                    ${details.Title}
                </h6>
                <ul class="movie-misc-info p-0">
                    <li class="year ">Year: ${details.Year}</li>
                    <li class="rated p-1">Rated: ${details.Rated}</li>
                    <li class="released">Released: ${details.Released}</li>
                </ul>
                <button id="remove" class="remove" onclick="removefnc(${index},'${id}')">Remove</button>
        </div>
    `
    favoriteWrapper.appendChild(movieListItem);
    // remove = document.getElementsByClassName('remove');
   
}

loadMovieDetails();

