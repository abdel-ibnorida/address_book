import { cE, fileterNameEmailUser, qS, RenderContacts, RenderFavouriteContacts, RenderFilterContacts} from "./utils/fn.js";
import { GET } from "./utils/http.js";

const divMain = qS('.div_main');
const divFavourite = qS('.div_favourite_empty');
const btnSearch = qS('.search_button');
const formSearch = qS('.form_search');
const searchbar = qS('.search');

let listUsers = [];
GET("/users").then((data) => {
    data.forEach(element => { 
        element.favourite = false;
        listUsers.push(element)});
        console.log(listUsers);
    RenderContacts(listUsers, divMain,divFavourite);
    formSearch.addEventListener('submit', (e) => {
        e.preventDefault();
        if (e.srcElement[0].value.length < 3)
        {
            alert("Inserire almeno 3 caratteri per una ricerca")
        }
    })
    searchbar.addEventListener('input', (e) => {
        if(e.target.value.length > 2)
        {   
            let listFiletr = fileterNameEmailUser(listUsers, e.target.value.toLowerCase());
            if (listFiletr.length === 0){
                divMain.textContent = "Non sono presenti contatti con questi criteri";
                divMain.className = "div_main_empty";
            }else{
                divFavourite.textContent = "";
                divMain.className = "div_main";
                RenderFilterContacts(listUsers, listFiletr, divMain);
                RenderFavouriteContacts(listUsers, divFavourite);
            }
        }
        else {
            divFavourite.textContent = "";
            RenderContacts(listUsers, divMain);
            RenderFavouriteContacts(listUsers, divFavourite);
        }
    })
})
