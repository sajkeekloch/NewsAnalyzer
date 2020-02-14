import { BaseComponent } from './BaseComponent.js';
import { LINK_REGEXP } from '../constants/Constants.js';



export class NewsCard extends BaseComponent {
  constructor(obj) {
    super();
    this.obj = obj;
    this.createCard();
  }

  createCard () {
    //Здесь работаем с HTML-шаблоном
    const cardTemplate = document.querySelector('#templateCard').content;
    
    const emptyHttps = /https:$/;
    
    //Иногда из апи возвращаются карточки без фотографии, или, почему-то, со строкой "https:" вместо адреса
    if (emptyHttps.test(this.obj.urlToImage) === true || (this.obj.urlToImage === null)) {
      cardTemplate.querySelector('.card__picture').src = 'src/img/imagePlaceholder@2x.png';
    } else {cardTemplate.querySelector('.card__picture').src = this.obj.urlToImage;}
    cardTemplate.querySelector('.card__date').textContent = this._getNormalTime(this.obj.publishedAt);
    cardTemplate.querySelector('.card__heading').textContent = this.obj.title;
    cardTemplate.querySelector('.card__text-content').textContent = this._breakLongWords(this.obj.description);
    cardTemplate.querySelector('.card__source').textContent = this.obj.source.name;
    cardTemplate.querySelector('.card__link').href = this.obj.url;

    
    const cardElement = cardTemplate.cloneNode(true);
    return cardElement;
  }

_getNormalTime (dirtyTime) {
  const time = new Date(dirtyTime);

  const year = time.getFullYear();
  const month = time.getMonth();
  const day = time.getDate();

  const months = ["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря",]
  
  return `${day} ${months[month]}, ${year}`;
}


  _breakLongWords (string) {
    const wordLength = 25;

    const arr = string.split(" ");
    //Разбили строку на массив слов
  
    return arr.map(element => {
  
      if (element.length >= wordLength) {
  
        //Если в слове больше 20 символов, добавляем пробел после каждого 20 символа
        return element = element.split('').map((el, index) => 
        {
          return (index % wordLength === 0 ? (el + "- ") : el)
        }
        ).join('')
        
      } else return element   
    }).join(' ');
  }
}



