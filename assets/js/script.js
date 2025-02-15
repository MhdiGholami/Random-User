// random-user project


// Dom Selection
const $ = document
const url = 'https://randomuser.me/api/?results=100'
const themeIcon = $.getElementById('theme-icon')
const bodyElem = $.querySelector('body')
const cardElem = $.querySelectorAll('.card')
const cardParent = $.getElementById('card-parent')
const nameItem = $.querySelectorAll('.name')
const ageItem = $.querySelectorAll('.age')
const emailItem = $.querySelectorAll('.email')
const aboutItem = $.querySelectorAll('.about')


// Function for change project theme
function changeTheme() {
    bodyElem.classList.toggle('darkmode')

    document.querySelectorAll("#card-parent .card").forEach(data => {
        data.classList.toggle('card-dark')

        for (let child of data.lastElementChild.children) {
            child.classList.toggle('text-light');
        }
    });


    if (themeIcon.dataset.mode === 'light') {
        themeIcon.setAttribute('src', 'assets/images/icon-sun.png')
        themeIcon.dataset.mode = 'dark'
    } else {
        themeIcon.setAttribute('src', 'assets/images/icon-moon.png')
        themeIcon.dataset.mode = 'light'
    }
}


function fetchFunc() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let count = 8
            document.querySelector('.loadmore').addEventListener('click', function () {
                count = count + 8
                cardParent.innerHTML = ''
                data.results.slice(0, count).forEach((val) => {
                    let myCard = new Card(val.name.first, val.name.last, val.dob.age, val.email, val.picture.large)
                    cardParent.appendChild(myCard.create())
                })
            })
            data.results.slice(0, 8).forEach((val) => {
                let myCard = new Card(val.name.first, val.name.last, val.dob.age, val.email, val.picture.large)
                cardParent.appendChild(myCard.create())
            })
        }
        )
}
fetchFunc()

class Card {
    constructor(first, last, age, email, image) {
        this.first = first
        this.last = last
        this.age = age
        this.email = email
        this.image = image
    }
    create() {
        let div = document.createElement('div')
        div.classList.add('card')
        if (bodyElem.classList.contains('darkmode')) {
            div.classList.add('card-dark')
            div.innerHTML = `
                <figure class="profile-image"><img src="${this.image}" alt=""></figure>
                <div class="profile-details">
                    <h1 class="name text-light">${this.first} ${this.last}</h1>
                    <h2 class="age text-light">${this.age}</h2>
                    <h3 class="email text-light">${this.email}</h3>
                    <p class="about text-light">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                </div>
            `
        } else {
            div.innerHTML = `
                <figure class="profile-image"><img src="${this.image}" alt=""></figure>
                <div class="profile-details">
                    <h1 class="name">${this.first} ${this.last}</h1>
                    <h2 class="age">${this.age}</h2>
                    <h3 class="email">${this.email}</h3>
                    <p class="about">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                </div>
            `
        }

        // transfering data here
        return div
    }
}


// addEventListeners
themeIcon.addEventListener('click', changeTheme)