import '/node_modules/dotenv/config.js'

  async function callAPI() {
    try {
        const response = await fetch("https://api.nookipedia.com/villagers", {
        method: "GET",
        headers: {
            'x-api-key': '',
            'content-type': 'application/json'
        }
        })
    
        if(!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json();
        return data;
    }

    catch (error) {
        console.error('There was an error!', error);
    }
  }
  
  function villagerInfo(villager) {
    const nameDisplay = document.getElementById('name');
    const speciesDisplay = document.getElementById('species');
    const birthdayDisplay = document.getElementById('birthday_day');
    const phraseDisplay = document.getElementById('phrase');
    const quoteDisplay = document.getElementById('quote');
    const imageDisplay = document.getElementById('villagerImage');
    
    
    nameDisplay.textContent = villager.name;
    speciesDisplay.textContent = villager.species;
    birthdayDisplay.textContent = villager.birthday_day;
    phraseDisplay.textContent = villager.phrase;
    quoteDisplay.textContent = villager.quote;
    imageDisplay.src = villager.image_url;
  }

  function findBirthdays(entry, month) {
    console.log('Entry: ', entry);
    const birthMonth = entry.birthday_month;

    if(birthMonth == month) {
        console.log('Birthday is this month!');
    }
    else {
        console.log('Nope');
    }
  }
  
  const villagerData = callAPI();
  console.log(villagerData);