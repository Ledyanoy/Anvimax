// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

import GaAnalytics from './ga';
const counters = new GaAnalytics('UA-45150148-1');

window.addEventListener('load', () => {
  counters.init();
});



import 'core-js';
import 'regenerator-runtime/runtime';
// import $ from 'jquery';
// import { Link } from '../_modules/link/link';
let films;
let comedyFilms;
let dramaFilms;
let fantasyFilms;

const categories = document.querySelector('.categories');
const categoriesList = categories.querySelectorAll('.category-card');
const resultList = document.querySelector('.result-list');
const resultListInner = document.querySelector('.result-list__inner');
const resultListTitle = resultListInner.querySelector('.result-list__title');
const resultListDesc = resultListInner.querySelector('.result-list__desc');


fetch('data/films.json')
  .then(response => response.json())
  .then(data => setFilms(data.films));

const setFilms = (items) => {
  films = items;
  comedyFilms = items.filter(film => film.genre === 'comedy');
  dramaFilms = items.filter(film => film.genre === 'drama');
  fantasyFilms = items.filter(film => film.genre === 'fantasy');
}

const categoryBtnHandler = (evt) => {
  if (!evt.target.closest('.category-card__btn')) return;
  const category = evt.target.closest('.category-card');
  checkCategory(category);
  makeCategoryActive(category);
  setTimeout(() => {
    resultListInner.scrollIntoView({block: "center", behavior: "smooth"});
    setCategoriesToDefault();
  }, 5500)
}
const checkCategory = (category) => {
  const categoryName = category.dataset.genre;
  if (categoryName === 'fun') {
    prepareFilms(comedyFilms);
    changeText('comedy');
  } else if (categoryName === 'pleasure') {
    prepareFilms(dramaFilms);
    changeText('drama');
  } else {
    prepareFilms(fantasyFilms);
    changeText('fantasy');
  }
}

const prepareFilms = (array) => {
  const newArray = array.sort(function () {
    return Math.random() - 0.5;
  }).slice(0, 14);
  setTimeout(() => renderFilms(newArray), 5500)

}

const changeText = (genre) => {
  if (genre === 'comedy') {
    setTimeout(() => {
      resultListTitle.innerHTML = 'Хочу посмеяться';
      resultListDesc.innerHTML = 'Персональная подборка для тех, кто любит безудержное веселье';
    }, 5500)

  } else if (genre === 'drama') {
    setTimeout(() => {
      resultListTitle.innerHTML = 'Хочу умилиться';
      resultListDesc.innerHTML = 'Персональная подборка для тех, кто соскучился по минорным нотам';
    }, 5500)
  } else {
    setTimeout(() => {
      resultListTitle.innerHTML = 'Хочу удивиться';
      resultListDesc.innerHTML = 'Персональная подборка для тех, кто верит в волшебство';
    }, 5500)
  }
}

const makeCategoryActive = (category) => {
  categoriesList.forEach(item => {
    item !== category
      ? item.classList.add('category-card--disabled')
      : item.classList.add('category-card--active')
  })
  const progressPercents = category.querySelector('.progress-bar__text span');
  const progressLine = category.querySelector('.progress-bar__line');
  makePercentsUp(progressPercents, progressLine);
}

const setCategoriesToDefault = () => {
  categoriesList.forEach(item => {
    item.classList.remove('category-card--disabled');
    item.classList.remove('category-card--active');
    setTimeout(() => setPercentToDefault(item), 200);
  })
}

const setPercentToDefault = (category) => {
  category.querySelector('.progress-bar__text span').innerHTML = `0`;
  category.querySelector('.progress-bar__line').style.width = '0';
}

const makePercentsUp = (text, line) => {
  for (let i = 1; i <= 100; i++) {
    setTimeout(function () {
      text.innerHTML = i;
      if (window.innerWidth <= 597) {
        line.style.width = `${i * 0.65}%`;
      }
      if (window.innerWidth > 597 && window.innerWidth < 1100) {
        line.style.width = `${i * 0.77}%`;
      }
      if (window.innerWidth >= 1100) {
        line.style.width = `${i * 0.65}%`;
      }
    }, 50 * i)
  }
}

const renderFilms = (array) => {
  const newListItems = array.map(item => {
    return `
      <li class="film">
        <a class="film__card js-counters-click" href='${item.link}' target="_blank" data-ga-event='Клик по фильму'>
          <img class="film__image" src="${item.picture}" alt="${item.name}"/>
          <p class="film__name text text--film-name">${item.name}</p>
        </a>
      </li>`
  });
  resultList.innerHTML = '';
  resultList.insertAdjacentHTML("afterBegin", newListItems.join(''));
}

categories.addEventListener('click', categoryBtnHandler)
