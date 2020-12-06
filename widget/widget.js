const doc_head = document.querySelector('head');
const widget = document.querySelector('.widget');
widget.innerHTML = '<form><label for="post-textbox"><b>New post</b></label><textarea id="post-textbox" placeholder="What is going on?"></textarea><a id="post-submit" href="#">Post</a></form><div id="posts"></div><a href="#" id="hide-widget-btn" class="btn">Hide form</a> <a href="#" id="mark-all-read" class="btn">Mark all as read</a>';
const widget_hidden_element = document.createElement('div');
widget_hidden_element.className = 'widget-hidden';
widget_hidden_element.innerHTML = '<a href="#" class="widget-btn"><i class="far fa-comments"></i> <div class="widget-notifications-num">0</div> </a>';
widget.after(widget, widget_hidden_element);

const posts = document.querySelector("#posts");
const hide_widget_btn = document.querySelector('#hide-widget-btn');
const readed_btn = document.querySelector("#mark-all-read");

var pictures = [
    'https://store-images.s-microsoft.com/image/apps.36957.13510798885978730.38168a6b-6133-4cea-a5f3-3b6df0b07ea9.4a966d08-2d00-4388-871a-6168d4846658?mode=scale&q=90&h=300&w=300',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9CDy-br3OPx3e-4KiulJMjtKhXheb8OwdrA&usqp=CAU',
    'https://is1-ssl.mzstatic.com/image/thumb/Purple114/v4/4c/0a/fc/4c0afcb1-1ba0-dbff-4745-3a2d219294e6/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/246x0w.png',
    'https://habrastorage.org/getpro/moikrug/uploads/company/901/244/761/logo/medium_c35efb293cd85320d66e74304d3a8076.jpg',
    'https://habrastorage.org/getpro/moikrug/uploads/company/901/244/761/logo/medium_c35efb293cd85320d66e74304d3a8076.jpg'
];
var authors = ['DELFI', 'Postimees', 'Lenta.ru', 'Habrahabr', 'Habrahabr'];
var texts = [
    'Переполненные автобусы, водители без маски: читатель жестко раскритиковал организацию маршрута Маарду-Таллинн, это правда моё тестовое задание? Ну и правда!',
    'В Эстонии скончались еще пять человек с коронавирусом, добавилось 479 зараженных',
    'Россиянин пошел под суд из-за кепки с коноплей',
    'Razer выпустила обещанный в 2014 году модульный геймерский мини-ПК за $3200, и он не очень-то модульный',
    'Почему японский веб-дизайн настолько другой?'
];
var links = [
    'https://journalist.delfi.ee/news/news/perepolnennye-avtobusy-voditeli-bez-maski-chitatel-zhestko-raskritikoval-organizaciyu-marshruta-maardu-tallinn?id=91846574',
    'https://rus.postimees.ee/7126681/v-estonii-skonchalis-eshche-pyat-chelovek-s-koronavirusom-dobavilos-479-zarazhennyh',
    'https://lenta.ru/news/2020/12/06/kepka/',
    'https://habr.com/ru/company/selectel/blog/531564/',
    'https://habr.com/ru/company/skillfactory/blog/531418/'
];

var timestamps = [
    new Date(2020, 11, 6, 13, 50),
    new Date(2020, 11, 6, 10, 23),
    new Date(2020, 11, 6, 23, 05),
    new Date(2020, 11, 6, 18, 52),
    new Date(2020, 11, 6, 16, 23)
];

function connectStylesheet() {
    doc_head.innerHTML += '<link rel="stylesheet" href="widget/widget.css">';
}

function connectFontAwesome() {
    doc_head.innerHTML += '<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.1/css/all.css" integrity="sha384-vp86vTRFVJgpjF9jiIGPEEqYqlDwgyBgEF109VFjmqGmIY/Y4HV4d3Gp2irVfcrp" crossorigin="anonymous">';
}

function createNewPost(image, author, text, link, time) {
    var post = {
        'author_img': image,
        'author': author,
        'text': text,
        'time': time,
        'link': link
    }
    var post_node = document.createElement('div');
    if (widget_hidden_element.style.display != 'none') {
        post_node.className = 'post unread';
        post_node.innerHTML = createPostDiv(image, author, text, link, time);
        post_node.addEventListener('mouseover', (event) => {
            if (post_node.className == 'post unread') {
                post_node.className = 'post';
            }
        });
        notReadedNumber = document.querySelectorAll('.unread').length;
        notReadedNotifications = document.querySelector('.widget-notifications-num');
        notReadedNotifications.innerText = notReadedNumber;
    }
    else {
        post_node.className = 'post';
        post_node.innerHTML = createPostDiv(image, author, text, link, time);
    }

   
    const deleteBtn = post_node.querySelector('.post-author .post-delete-btn');
    deleteBtn.addEventListener('click', (event) => {
        posts.removeChild(post_node);
    });
    posts.append(post_node);
    posts.scrollTo(0, -posts.scrollHeight-386); // .post height
}

function createPostDiv(img, author, text, link, time) {
    if (time == 0) {
        time = new Date(Date.now());
    }
    time = time.toLocaleString('et-EE');
    if (link) {
        return `<img src="${img}" class="author-img"> <div class="post-author">${author} <a href="#" class="post-delete-btn"><i class="fas fa-times"></i> Delete</a></div> <div class="post-text">${text}<br><a href="${link}">Подробнее</a></div> <div class="post-time">${time}</div>`;
    }
    else {
        return `<img src="${img}" class="author-img"> <div class="post-author">${author} <a href="#" class="post-delete-btn"><i class="fas fa-times"></i> Delete</a></div> <div class="post-text">${text}<br></div> <div class="post-time">${time}</div>`;
    }
}

function markAllAsReaded() {
    var not_readed_posts = document.querySelectorAll('.unread');
    not_readed_posts.forEach(post => {  
        post.className = 'post';
    });
    var post_readed_btns = document.querySelectorAll('.post-readed-btn');
    post_readed_btns.forEach(btn => btn.remove());
}

function readNewPostValues() {
    const postText = document.querySelector('#post-textbox').value;
    if (postText != "") {
        console.log(postText);
        event.preventDefault();
        createNewPost('https://pbs.twimg.com/profile_images/1297280735385137153/lShtNbQY_400x400.jpg', 'Nikolas Laus', postText, 0, 0);
    }
    document.querySelector('#post-textbox').value = '';
}

function hideWidget() {
    widget_hidden_element.style.display = 'flex';
    widget.style.display = 'none';
}

function showWidget() {
    widget_hidden_element.style.display = 'none';
    widget.style.display = 'flex';
}


const add_btn = document.querySelector('#post-submit');

add_btn.addEventListener('click', (event) => {
    readNewPostValues();
});

hide_widget_btn.addEventListener('click', (event) =>
{
    hideWidget();
});

readed_btn.addEventListener('click', (event) => {
    markAllAsReaded();
})

widget_hidden_element.addEventListener('click', (event) => {
    showWidget();
});


function simulatePosting() {
    for (let i = 0; i < authors.length; i++) {
        setTimeout(function() { createNewPost(pictures[i], authors[i], texts[i], links[i], timestamps[i]); }, 1000 * i);
    }
}

connectFontAwesome();
connectStylesheet();
simulatePosting();




