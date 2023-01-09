
const resultGrid = document.getElementById('result-container');

async function loadMovieDetails(){
    let id = localStorage.getItem('movieItem');
    const result = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=7cadacdc`)
    const movieDetails = await result.json();    
    displayMovieDetail(movieDetails);
}


function displayMovieDetail(details){
    resultGrid.innerHTML=` 
    <div class="movie-poster">
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
  
}

loadMovieDetails()