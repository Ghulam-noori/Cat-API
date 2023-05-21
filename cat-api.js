const mainContainer = $('#main-container');
const inputText = $('#item-name');
const searchButton = $('#search-btn');
const photos = $('list-of-photos');
const clearButton = $('#clear-btn');


function fetchAPI(apiURL){
    mainContainer.empty();
    return new Promise( (resolve, reject) => {
        let http = new XMLHttpRequest();
        http.open('GET', apiURL);
        http.responseType = 'json';
        http.onreadystatechange = function() {
            if(http.readyState === 4 && http.status === 200) {
                resolve(http.response)
            } else if (http.status === 400 || http.status === 500) {
                reject(http.response)
            }
        }
        http.send();
    })
}
function getCats(){
    fetchAPI("https://api.thecatapi.com/v1/images/search?limit=10")
    .then (result =>{
        result.forEach(value=>{
            let catImages = $(`<img src=${value.url} class="cats img-fluid" alt ="cat" />`);
            catImages.appendTo(mainContainer);
        })
    })
    .catch (err =>{
        console.error(err);
    })
}

    searchButton.click( () => {
        let searchVal = inputText.val();
        if(searchVal === "cats") {
            getCats()
        }
    })
    clearButton.click( () => {
        let inputValue = inputText.val('');
        mainContainer.empty();
        inputValue.empty();
        
   })


