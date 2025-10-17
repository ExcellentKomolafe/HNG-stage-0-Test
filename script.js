document.addEventListener('DOMContentLoaded', () => {
  let savedPFP = 'savedPFP';
let savedCoverPhoto = 'savedCoverPhoto';

const userProfile = {
  profilePic: getFromLocalStorage(savedPFP, './IMG_20251012_135323_011.jpg'),
  coverPhoto: getFromLocalStorage(savedCoverPhoto, './IMG_20251012_135323_011.jpg'),
  username: getFromLocalStorage('savedUsername', 'Komolafe Ayoola'),
  imgURL: '',
  bio: getFromLocalStorage("savedBio", "Let people Know who you are E.g I'm John Doe a React web developer. with 10 years of experience let us connect ❤️❤️"),
  likes: getFromLocalStorage('savedLikes', ''),
  dislikes: getFromLocalStorage('savedDislikes', '')
}
/* save */
function saveToLocalStorage(savedItem, item){
  return localStorage.setItem(savedItem, item)
};

function getFromLocalStorage(savedItem, fallBackItem)  {
  return localStorage.getItem(savedItem) || fallBackItem;
}

const profileInput = document.getElementById('avatar-photo-input');

const coverPhotoInput = document.getElementById('avatar-cover-photo-input');

/*get DOM */

const profilePic = document.querySelector('.avatar');

const profileCard = document.querySelector('.profile-card');

const editProfileContainer =
document.querySelector('.edit-profile-container');

const coverPhoto = document.querySelector('.avatar-cover-photo');

const editBtn = document.querySelector('.edit-profile-btn');

const saveBtn = document.querySelector('.save');

const coverPhotoURLInput = document.querySelector('.url-cover-photo');

const PFPURLInput = document.querySelector('.url-PFP');

const userNameInput = document.querySelector('.username-input');

const bioInput = document.querySelector('.bio-input');

const likesInput = document.querySelector('.likes-input');

const dislikesInput = document.querySelector('.dislikes-input');

const username = document.querySelector('.username');

const bio = document.querySelector('.bio');

const likes = document.querySelector('.likes')
const dislikes = document.querySelector('.dislikes');

const likeUl = document.querySelector('.Hobbies-ul');

const dislikeUl = document.querySelector('.Dislikes-ul');


document.querySelector('.time-milli').textContent = Date.now();

  
  

function changePic(picInput, pic, saveItem) {
  picInput.addEventListener('change', () => {  
  const image = picInput.files[0];
  if(image) {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
  pic.src = e.target.result;
  saveToLocalStorage(saveItem, e.target.result);
  if (saveItem === savedPFP) userProfile.profilePic = e.target.result;
  if (saveItem === savedCoverPhoto) userProfile.coverPhoto = e.target.result;
} 
   
    fileReader.readAsDataURL(image);
  }
})

};

function uploadPicViaURL(URLInput, savedPhoto, photo) {
  URLInput.addEventListener('change', (e) => {
    saveToLocalStorage(savedPhoto, URLInput.value);
    photo.src = e.target.value;
    if (savedPhoto === savedPFP) userProfile.profilePic = e.target.value;
if (savedPhoto === savedCoverPhoto) userProfile.coverPhoto = e.target.value;
  });
}


uploadPicViaURL(coverPhotoURLInput, savedCoverPhoto, coverPhoto);
uploadPicViaURL(PFPURLInput, savedPFP, profilePic)

changePic(profileInput, profilePic, savedPFP);
changePic(coverPhotoInput, coverPhoto, savedCoverPhoto);

profilePic.src = userProfile.profilePic;
coverPhoto.src = userProfile.coverPhoto;

let profileCardIsHidden = false;
let editProfileContainerisHidden = true;

editBtn.addEventListener('click', () => {
 if(!profileCardIsHidden) {
 profileCard.classList.add('hide-profile-card');
 editProfileContainer.classList.add('reveal-container');
  profileCardIsHidden = true;
 editProfileContainerisHidden = false;
 }
 
});




saveBtn.addEventListener('click', () => {
  if(profileCardIsHidden && !editProfileContainerisHidden) {
    editProfileContainer.classList.remove('reveal-container');
    profileCard.classList.remove('hide-profile-card')
    profileCardIsHidden = false;
    editProfileContainerisHidden = true;
  }
})



function updateDescriptions(input, savedItem, description) {
  input.addEventListener('change', (e) => {
  saveToLocalStorage(savedItem, e.target.value);  
  if(description === username) {
    userProfile.username = e.target.value;
  }
  
  if(description === bio) {
    userProfile.bio = e.target.value;
  }
  
});
}

updateDescriptions(userNameInput, 'savedUsername', username)
updateDescriptions(bioInput, 'savedBio', bio)

username.textContent = userProfile.username;
bio.textContent = userProfile.bio;


function likesDislike(input, savedItem, container) {
  let arr = JSON.parse(localStorage.getItem(savedItem) || '[]');
  container.innerHTML = '';

  function renderList() {
    container.innerHTML = '';
    arr.forEach((val, index) => {
      const li = document.createElement('li');
      li.textContent = val;

      const delBtn = document.createElement('button');
      delBtn.textContent = '✖';
      delBtn.classList.add('js-delete-btn')
      delBtn.addEventListener('click', () => {
        arr.splice(index, 1);
        localStorage.setItem(savedItem, JSON.stringify(arr));
        renderList();
      });

      li.appendChild(delBtn);
      container.appendChild(li);
    });
  }
if(arr.length === 0) arr[0] = 'I like / dislike 🤷‍♂️';
  renderList();

  input.addEventListener('change', e => {
    const value = e.target.value.trim();
    if (!value) return;
    arr.push(value);
    localStorage.setItem(savedItem, JSON.stringify(arr));
    renderList();
    e.target.value = '';
  });
}

likesDislike(likesInput, 'savedLikes', likeUl);
likesDislike(dislikesInput, 'savedDislikes', dislikeUl);
});

const resetBtn = document.querySelector('.reset');



function socialLinks(inputName, inputURL, savedItem, container) {
  let links = JSON.parse(localStorage.getItem(savedItem) || '[]');
if(links.length === 0) links[0] = {name: 'LinkedIn',
url:'https://www.linkedin.com/in/ayoola-komolafe-b0871230a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'}
  render();

  inputName.addEventListener('change', addLink);
  inputURL.addEventListener('change', addLink);

  function addLink() {
    const name = inputName.value.trim();
    const url = inputURL.value.trim();
    if (!name || !url) return;

    links.push({ name, url });
    localStorage.setItem(savedItem, JSON.stringify(links));
    inputName.value = '';
    inputURL.value = '';
    render();
  }

  function render() {
    while (container.firstChild) container.removeChild(container.firstChild);

    const title = document.createElement('h3');
    title.className = 'contact';
    title.textContent = 'Contacts';
    container.appendChild(title);

    links.forEach(({ name, url }) => {
      const li = document.createElement('li');
      li.className = 'social-link-list';

      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = name;

      
      a.setAttribute('data-testid', `test-user-social-${name.trim()}`);

      const btn = document.createElement('button');
      btn.className = 'remove-link';
      btn.textContent = '✖';
      btn.dataset.url = url;
      btn.addEventListener('click', () => {
        links = links.filter(link => link.url !== url);
        localStorage.setItem(savedItem, JSON.stringify(links));
        render();
      });

      li.appendChild(a);
      li.appendChild(btn);
      container.appendChild(li);
    });
  }
}



socialLinks(
  document.querySelector('.social-name-input'),
  document.querySelector('.social-url-input'),
  'savedSocialLinks',
  document.querySelector('.social-link-sec')
);

resetBtn.addEventListener('click', () => {
if (window.confirm("Are you sure you want to reset your profile?")) {
localStorage.clear();
  location.reload();
}    
})
