import { COMMIT_CONTAINER } from '../constants/AboutDomElements.js';
import { githubApi } from '../modules/GithubApi.js';
import { CommitCard } from './CommitCard.js'
import Glide, { Controls, Breakpoints } from '@glidejs/glide/dist/glide.modular.esm';
import Glide, { Controls, Breakpoints } from '@glidejs/glide/dist/glide.modular.esm';
import { sliderProps } from '../constants/sliderProps.js'



export class CommitCardList {
  constructor() {
    this.renderCommits()
  }

  renderCommits () {

    githubApi.getAllCommits()
    .then(res => {

        res.forEach(commit => {
          const commitCard = new CommitCard(commit).createCard();
          COMMIT_CONTAINER.appendChild(commitCard);
        })
      })
    
    .then(() => {
      
      const slider = new Glide('.glide', sliderProps).mount({ Breakpoints, Controls })
      slider.on('run', () => {console.log("hey");
      })
    })
    .catch(err => console.log(err))

  }
}

new CommitCardList()
