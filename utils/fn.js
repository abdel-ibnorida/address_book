export const cE = (el) => document.createElement(el);

export const qS = (el) => document.querySelector(el);

const divFavourite = qS(".div_favourite_empty");
const divMain = qS('.div_main')
const divRoot = qS('.root');
const searchInput = qS('.search')
const starFavClass = "fa-solid fa-star fa-2xl";
const staNotFavClass = "fa-regular fa-star fa-2xl";
const showDetailsClass = "fa-solid fa-plus fa-xl";
const closeXClass = "fa-solid fa-x fa-lg";
const editClass = "fa-solid fa-pen-to-square fa-2xl";



export const RenderContacts = (data, divMain) => {
    divMain.textContent = "";
    data.forEach(element => {
        const singleContactDiv = cE('div');
        const textContainer = cE('div');
        const symbolContainer = cE('div');
        const pName = cE('span');
        const pUserEmail = cE('span');
        const favouriteStar = cE('i');
        const showDetails = cE('i');
        const editIcon = cE('i');

        if (element.favourite === false) {
            favouriteStar.className = staNotFavClass;
        } else {
            favouriteStar.className = starFavClass;
        }
        singleContactDiv.className = "single_contact_container";
        symbolContainer.className = "symbol_container";
        showDetails.className = showDetailsClass;
        editIcon.className = editClass;
        pName.textContent = element.name;
        pUserEmail.textContent = "Email: " + element.email;
        singleContactDiv.setAttribute("id", element.id);

        textContainer.append(pName, pUserEmail);
        symbolContainer.append(showDetails, favouriteStar, editIcon);
        singleContactDiv.append(textContainer, symbolContainer);
        divMain.append(singleContactDiv);

        favouriteStar.addEventListener('click', (e) => {
            if (favouriteStar.className === staNotFavClass) {
                favouriteStar.className = starFavClass;
                data.filter(element => element.id == singleContactDiv.id).forEach(element => element.favourite = !element.favourite);
                divFavourite.textContent = "";
                RenderFavouriteContacts(data, divFavourite);
            } else {
                favouriteStar.className = staNotFavClass;
                data.filter(element => element.id == singleContactDiv.id).forEach(element => element.favourite = !element.favourite);
                divFavourite.textContent = "";
                RenderFavouriteContacts(data, divFavourite);
            }
        })
        showDetails.addEventListener('click', (e) => {
            const modal = cE('div');
            const overlay = cE('div');
            const closeX = cE('i');
            const modalTextContainer = cE('div');
            const spanName = cE('span');
            const spanUsername = cE('span');
            const spanEmail = cE('span');
            const spanPhone = cE('span');
            const spanAddress = cE('span');
            const spanCompany = cE('span');

            fillSpanDetails(data, singleContactDiv.id, spanName, spanUsername, spanEmail, spanPhone, spanCompany, spanAddress);

            closeX.className = closeXClass;
            modal.className = "modal";
            modalTextContainer.className = "modal_text_container";
            overlay.className = "overlay";

            modalTextContainer.append(spanName, spanUsername, spanEmail, spanPhone, spanCompany, spanAddress);
            modal.append(modalTextContainer, closeX);
            divRoot.append(overlay, modal);

            closeX.addEventListener('click', (e) => {
                modal.style.display = "none";
                overlay.style.display = "none";
            })
        })
        editIcon.addEventListener('click', (e) => {
            const modal = cE('div');
            const overlay = cE('div');
            const closeX = cE('i');
            const editorContainer = cE('div');
            const buttonSave = cE('button');
            const editName = cE('input');
            const editUsername = cE('input');
            const editPhone = cE('input');
            const editEmail = cE('input');
            const editCompany = cE('input');
            const editStreet = cE('input');
            const editStuite = cE('input');
            const editCity = cE('input');

            closeX.className = closeXClass;
            modal.className = "modal";
            overlay.className = "overlay";
            fillEditInput(data, singleContactDiv.id, editName, editUsername, editEmail, editPhone, editCompany, editStreet, editStuite, editCity);
            editorContainer.className = "editor_container"
            buttonSave.textContent = "Save";


            editorContainer.append(editName, editUsername, editEmail, editPhone, editCompany, editStreet, editStuite, editCity, buttonSave);
            modal.append(editorContainer, closeX);
            divRoot.append(overlay, modal);

            closeX.addEventListener('click', (e) => {
                modal.style.display = "none";
                overlay.style.display = "none";
            })
            buttonSave.addEventListener('click', (e) => {
                console.log(data);
                saveData(data, singleContactDiv.id - 1, editName, editUsername, editEmail, editPhone, editCompany, editStreet, editStuite, editCity);
                RenderContacts(data, divMain);
                divFavourite.textContent = "";
                RenderFavouriteContacts(data, divFavourite)
                alert("Save completed");
                modal.style.display = "none";
                overlay.style.display = "none";
            })
        })
    });
}

export const RenderFilterContacts = (data, dataFilter, divMain) => {
    divMain.textContent = "";
    dataFilter.forEach(element => {
        const singleContactDiv = cE('div');
        const textContainer = cE('div');
        const symbolContainer = cE('div');
        const pName = cE('span');
        const pUserEmail = cE('span');
        const favouriteStar = cE('i');
        const showDetails = cE('i');
        const editIcon = cE('i');

        if (element.favourite === false) {
            favouriteStar.className = staNotFavClass;
        } else {
            favouriteStar.className = starFavClass;
        }

        singleContactDiv.className = "single_contact_container";
        showDetails.className = showDetailsClass;
        editIcon.className = editClass;
        symbolContainer.className = "symbol_container";
        pName.textContent = element.name;
        pUserEmail.textContent = "Email: " + element.email;
        singleContactDiv.setAttribute("id", element.id);
        textContainer.append(pName, pUserEmail);
        symbolContainer.append(showDetails, favouriteStar, editIcon);
        singleContactDiv.append(textContainer, symbolContainer);
        divMain.append(singleContactDiv);

         favouriteStar.addEventListener('click', (e) => {
            if (favouriteStar.className === staNotFavClass) {
                favouriteStar.className = starFavClass;
                data.filter(element => element.id == singleContactDiv.id).forEach(element => element.favourite = !element.favourite);
                divFavourite.textContent = "";
                RenderFavouriteContacts(data, divFavourite);
            } else {
                favouriteStar.className = staNotFavClass;
                data.filter(element => element.id == singleContactDiv.id).forEach(element => element.favourite = !element.favourite);
                divFavourite.textContent = "";
                RenderFavouriteContacts(data, divFavourite);
            }
        })

        showDetails.addEventListener('click', (e) => {
            const modal = cE('div');
            const overlay = cE('div');
            const closeX = cE('i');
            const modalTextContainer = cE('div');
            const spanName = cE('span');
            const spanUsername = cE('span');
            const spanEmail = cE('span');
            const spanPhone = cE('span');
            const spanCompany = cE('span');
            const spanAddress = cE('span');

            fillSpanDetails(dataFilter, singleContactDiv.id, spanName, spanUsername, spanEmail, spanPhone, spanCompany, spanAddress);

            closeX.className = closeXClass;
            modal.className = "modal";
            modalTextContainer.className = "modal_text_container";
            overlay.className = "overlay";

            modalTextContainer.append(spanName, spanUsername, spanEmail, spanPhone, spanCompany, spanAddress);
            modal.append(modalTextContainer, closeX);
            divRoot.append(overlay, modal);

            closeX.addEventListener('click', (e) => {
                modal.style.display = "none";
                overlay.style.display = "none";
            })
        })

        editIcon.addEventListener('click', (e) => {
            const modal = cE('div');
            const overlay = cE('div');
            const closeX = cE('i');
            const editorContainer = cE('div');
            const buttonSave = cE('button');
            const editName = cE('input');
            const editUsername = cE('input');
            const editPhone = cE('input');
            const editEmail = cE('input');
            const editCompany = cE('input');
            const editStreet = cE('input');
            const editStuite = cE('input');
            const editCity = cE('input');

            closeX.className = closeXClass;
            modal.className = "modal";
            overlay.className = "overlay";
            fillEditInput(data, singleContactDiv.id, editName, editUsername, editEmail, editPhone, editCompany, editStreet, editStuite, editCity);
            editorContainer.className = "editor_container"
            buttonSave.textContent = "Save";


            editorContainer.append(editName, editUsername, editEmail, editPhone, editCompany, editStreet, editStuite, editCity, buttonSave);
            modal.append(editorContainer, closeX);
            divRoot.append(overlay, modal);

            closeX.addEventListener('click', (e) => {
                modal.style.display = "none";
                overlay.style.display = "none";
            })
            buttonSave.addEventListener('click', (e) => {
                saveData(data, singleContactDiv.id - 1, editName, editUsername, editEmail, editPhone, editCompany, editStreet, editStuite, editCity);
                searchInput.value = "";
                RenderContacts(data, divMain);
                divFavourite.textContent = "";
                RenderFavouriteContacts(data, divFavourite)
                alert("Save completed");
                modal.style.display = "none";
                overlay.style.display = "none";
            })
        })
    });
}

export const RenderFavouriteContacts = (data, divFavourite) => {
    if (data.filter(element => element.favourite === true).length > 0) {
        data.filter(element => element.favourite === true).forEach(element => {
            const singleContactDiv = cE('div');
            const textContainer = cE('div');
            const symbolContainer = cE('div');
            const pName = cE('span');
            const pUserEmail = cE('span');
            const showDetails = cE('i');
            const editIcon = cE('i');

            singleContactDiv.className = "single_contact_container";
            symbolContainer.className = "symbol_container";
            divFavourite.className = "div_favourite";
            showDetails.className = showDetailsClass;
            editIcon.className = editClass;
            pName.textContent = element.name;
            pUserEmail.textContent = "Email: " + element.email;
            singleContactDiv.setAttribute("id", element.id);
            textContainer.append(pName, pUserEmail);
            symbolContainer.append(showDetails, editIcon);
            singleContactDiv.append(textContainer, symbolContainer);
            divFavourite.append(singleContactDiv);



            showDetails.addEventListener('click', (e) => {
                const modal = cE('div');
                const overlay = cE('div');
                const closeX = cE('i');
                const modalTextContainer = cE('div');
                const spanName = cE('span');
                const spanUsername = cE('span');
                const spanEmail = cE('span');
                const spanPhone = cE('span');
                const spanCompany = cE('span');
                const spanAddress = cE('span');

                fillSpanDetails(data, singleContactDiv.id, spanName, spanUsername, spanEmail, spanPhone, spanCompany, spanAddress);

                closeX.className = closeXClass;
                modal.className = "modal";
                modalTextContainer.className = "modal_text_container";
                overlay.className = "overlay";

                modalTextContainer.append(spanName, spanUsername, spanEmail, spanPhone, spanCompany, spanAddress);
                modal.append(modalTextContainer, closeX);
                divRoot.append(overlay, modal);

                closeX.addEventListener('click', (e) => {
                    modal.style.display = "none";
                    overlay.style.display = "none";
                })
            })


            editIcon.addEventListener('click', (e) => {
                const modal = cE('div');
                const overlay = cE('div');
                const closeX = cE('i');
                const editorContainer = cE('div');
                const buttonSave = cE('button');
                const editName = cE('input');
                const editUsername = cE('input');
                const editPhone = cE('input');
                const editEmail = cE('input');
                const editCompany = cE('input');
                const editStreet = cE('input');
                const editStuite = cE('input');
                const editCity = cE('input');

                closeX.className = closeXClass;
                modal.className = "modal";
                overlay.className = "overlay";
                fillEditInput(data, singleContactDiv.id, editName, editUsername, editEmail, editPhone, editCompany, editStreet, editStuite, editCity);
                editorContainer.className = "editor_container"
                buttonSave.textContent = "Save";


                editorContainer.append(editName, editUsername, editEmail, editPhone, editCompany, editStreet, editStuite, editCity, buttonSave);
                modal.append(editorContainer, closeX);
                divRoot.append(overlay, modal);

                closeX.addEventListener('click', (e) => {
                    modal.style.display = "none";
                    overlay.style.display = "none";
                })
                buttonSave.addEventListener('click', (e) => {
                    saveData(data, singleContactDiv.id - 1, editName, editUsername, editEmail, editPhone, editCompany, editStreet, editStuite, editCity);
                    divFavourite.textContent = "";
                    RenderContacts(data, divMain);
                    RenderFavouriteContacts(data, divFavourite)
                    alert("Save completed");
                    modal.style.display = "none";
                    overlay.style.display = "none";
                })
            })

        });
    } else {
        divFavourite.className = "div_favourite_empty";
        divFavourite.textContent = "Non sono presenti contatti tra i preferiti";
    }
}

export function fileterNameEmailUser(array, searchInput) {
    return array.filter(element => element.name.toLowerCase().includes(searchInput) || element.username.toLowerCase().includes(searchInput) || element.email.toLowerCase().includes(searchInput));
}

function saveData(data, id, editName, editUsername, editEmail, editPhone, editCompany, editStreet, editStuite, editCity) {

    data[id].name = editName.value;
    data[id].username = editUsername.value;
    data[id].email = editEmail.value;
    data[id].phone = editPhone.value;
    data[id].company.name = editCompany.value;
    data[id].address.street = editStreet.value;
    data[id].address.suite = editStuite.value;
    data[id].address.city = editCity.value;

}

function fillEditInput(data, id, editName, editUsername, editEmail, editPhone, editCompany, editStreet, editStuite, editCity) {

    editName.value = data.filter(element => element.id == id)[0].name;
    editUsername.value = data.filter(element => element.id == id)[0].username;
    editEmail.value = data.filter(element => element.id == id)[0].email;
    editPhone.value = data.filter(element => element.id == id)[0].phone;
    editCompany.value = data.filter(element => element.id == id)[0].company.name;
    editStreet.value = data.filter(element => element.id == id)[0].address.street;
    editStuite.value = data.filter(element => element.id == id)[0].address.suite;
    editCity.value = data.filter(element => element.id == id)[0].address.city;
}

function fillSpanDetails(data, id, spanName, spanUsername, spanEmail, spanPhone, spanCompany, spanAddress) {

    spanName.textContent = "Name: " + data.filter(element => element.id == id)[0].name;
    spanUsername.textContent = "Username: " + data.filter(element => element.id == id)[0].username;
    spanEmail.textContent = "Email: " + data.filter(element => element.id == id)[0].email;
    spanPhone.textContent = "Phone: " + data.filter(element => element.id == id)[0].phone;
    spanCompany.textContent = "Company: " + data.filter(element => element.id == id)[0].company.name;
    const addressStreet = data.filter(element => element.id == id)[0].address.street;
    const addressSuite = data.filter(element => element.id == id)[0].address.suite;
    const addressCity = data.filter(element => element.id == id)[0].address.city;
    spanAddress.textContent = "Address:" + addressStreet + " " + addressSuite + ", " + addressCity;
}