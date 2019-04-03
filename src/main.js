// Llamando a los nombres de cada campeón
const listOfChampions = Object.entries(LOL.data);
const arrNameAndImageOfChampions = lol.getNameAndImageOfChampion(listOfChampions);
// Elementos del DOM
const selectRoles = document.getElementById('rol');
const sortChampions = document.getElementById('sort');
const minNumber = document.getElementById('min-number');
const maxNumber = document.getElementById('max-number');
const minHp = document.getElementById('hp-min');
const maxHp = document.getElementById('hp-max');
const minAd = document.getElementById('adchamp-min');
const maxAd = document.getElementById('adchamp-max');
const welcomePage = document.getElementById('welcome-pg');
const tutPage = document.getElementById('tut-pg');
const championsPage = document.getElementById('champions-pg');
const btnInit = document.getElementById('btn-init');
const btnTut = document.getElementById('btn-tut');
const navFilterAndSearch = document.getElementById('nav-filter-search');
const btnSearch = document.getElementById('btn-search');
const btnFilterSort = document.getElementById('btn-filter-sort');
const asideStats = document.getElementById('aside');
const search = document.getElementById('search');
const btnHome = document.getElementById('btn-home');
const btnChamps = document.getElementById('btn-champs');

const championsListElement = document.getElementById('champions');
const infoChampion = document.getElementById('info-champions');

const printCardsOfChampions = (arrChampions) => {
  championsListElement.innerHTML = '';
  arrChampions.forEach((obj) => {
    let string = `
        <section id=${obj.id} name = "champs">
          <div ><img class="champion-img" src=${obj.image} alt=${obj.name}/></div>
          <div class="name-card">
          <div class="champion-name">${obj.name}</div>
          <div class="champion-mp"> MP: ${obj.mana}</div>
          </div>
        </section>
        `;
    const div = document.createElement('div');
    div.innerHTML = string;
    div.className = 'card';
    div.id = 'card';
    championsListElement.appendChild(div);
    printMainInfo(div);
  });
};

const printMainInfo = (div) => {
  const printName = div.querySelector('[name=\'champs\']');
  printName.addEventListener('click', () => {
    infoChampion.innerHTML = '';
    const atribId = printName.getAttribute('id');
    let string = '';
    listOfChampions.filter((obj) => {
      if (atribId === obj[1].id) {
        string += `
    <figure class="champ-img">
    <img class="champion-info-img"src=${obj[1].splash} alt=${obj[1].name}>
    </figure>
    <section class="info-gnrl">
    <div class="champion-info-name">${obj[1].name}</div>
    <div class="champion-info-rol">Rol: ${obj[1].tags}</div>
    <div class="champ-info-">
    <ul class="info-general">
    <li>AD-attack: ${obj[1].info.attack}</li>
    <li>AP-magic: ${obj[1].info.magic}</li>
    <li>DEF-defense: ${obj[1].info.defense}</li>
    <li>DIF-difficulty: ${obj[1].info.difficulty}</li>
    </ul>
    </section>
    <section class="info-stats">
    <div class="champ-descrip">Description:${obj[1].blurb}</div>
    <h2 class="stat-title"> Statistics </h2>
    <table class="table-stat">
    <tr>
      <th>HP</th>
      <th>MP</th>
      <th>Armor</th>
      <th>AD</th>
      <th>HP reg</th>
      <th>MP reg</th>
    </tr>
    <tr>
      <td>${obj[1].stats.hp} (+${obj[1].stats.hpperlevel} por nivel) </td>
      <td>${obj[1].stats.mp} (+${obj[1].stats.mpperlevel} por nivel)</td>
      <td>${obj[1].stats.armor} (+${obj[1].stats.armorperlevel} por nivel)</td>
      <td>${obj[1].stats.attackdamage} (+${obj[1].stats.attackdamageperlevel} por nivel)</td>
      <td>${obj[1].stats.hpregen} (+${obj[1].stats.hpregenperlevel} por nivel)</td>
      <td>${obj[1].stats.mpregen} (+${obj[1].stats.mpregenperlevel} por nivel) </td>
    </tr>
    </table>
`;
        const divInfo = document.createElement('div');
        divInfo.innerHTML = string;
        divInfo.className = 'data-champ';
        divInfo.id = 'data-champ';
        infoChampion.appendChild(divInfo);
      }
    });
    championsListElement.classList.add('hide');
    infoChampion.classList.remove('hide');
    navFilterAndSearch.classList.add('hide');
    asideStats.classList.add('hide');
  });
};

window.onload = () => {
  funcFilterAndSort();
};

const statOfChamps = (arr) => {
  minHp.innerHTML = lol.statOfChampions(arr, 'hp', 'min');
  maxHp.innerHTML = lol.statOfChampions(arr, 'hp', 'max');
  minAd.innerHTML = lol.statOfChampions(arr, 'ad', 'min');
  maxAd.innerHTML = lol.statOfChampions(arr, 'ad', 'max');
}

const funcFilterAndSort = ()=> {
  let newChampionsArr = arrNameAndImageOfChampions;
  if (selectRoles.value !== 'default') {
    newChampionsArr = lol.filterChampionsRoles(selectRoles.value, arrNameAndImageOfChampions);
    newChampionsArr = lol.sortChampionsCards(sortChampions.value, newChampionsArr);
    newChampionsArr = lol.filterChampionsMana(newChampionsArr, minNumber.value, maxNumber.value);
    printCardsOfChampions(newChampionsArr);
    statOfChamps(newChampionsArr);
  }
  newChampionsArr = lol.sortChampionsCards(sortChampions.value, newChampionsArr);
  newChampionsArr = lol.filterChampionsMana(newChampionsArr, minNumber.value, maxNumber.value);
  printCardsOfChampions(newChampionsArr);
  statOfChamps(newChampionsArr);
}

maxNumber.addEventListener('change', funcFilterAndSort);
maxNumber.addEventListener('keyup', funcFilterAndSort);
minNumber.addEventListener('change', funcFilterAndSort);
minNumber.addEventListener('keyup', funcFilterAndSort);

selectRoles.addEventListener('input', funcFilterAndSort);
sortChampions.addEventListener('input', funcFilterAndSort);

btnSearch.addEventListener('click', () => {
  const searchChampions = arrNameAndImageOfChampions.filter((obj) => {
    return obj.id === search.value;
  });
  printCardsOfChampions(searchChampions);
});

btnHome.addEventListener('click', () => {
  welcomePage.classList.remove('hide');
  tutPage.classList.remove('hide');
  championsPage.classList.add('hide');
  infoChampion.classList.add('hide');
});

btnChamps.addEventListener('click', () => {
  welcomePage.classList.add('hide');
  tutPage.classList.add('hide');
  championsPage.classList.remove('hide');
  championsListElement.classList.remove('hide');
  infoChampion.classList.add('hide');
  navFilterAndSearch.classList.remove('hide');
  sortChampions.value = 'az';
  selectRoles.value = 'default';
  minNumber.value = 0;
  maxNumber.value = 500;
  printCardsOfChampions(arrNameAndImageOfChampions);
});

const funcHideAndShow = ()=> {
  welcomePage.classList.add('hide');
  tutPage.classList.add('hide');
  championsPage.classList.remove('hide');
  navFilterAndSearch.classList.remove('hide');
}
btnInit.addEventListener('click', funcHideAndShow);
btnTut.addEventListener('click', funcHideAndShow);

const funcHideAside = () => {
  asideStats.classList.toggle('hide');
}
btnFilterSort.addEventListener('click', funcHideAside);




