'use strict';

const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    console.log(event);

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */

    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('article.active');
    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */

    const clickedLinkAttribute = clickedElement.getAttribute('href');

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

    const clickedArticle = document.querySelector(clickedLinkAttribute);
    console.log(clickedArticle);

    /* [DONE] add class 'active' to the correct article */

    clickedArticle.classList.add('active');
};



const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author';

function generateTitleLinks(customSelector = '') {
    //console.log(customSelector);
    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    /* [DONE] for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    let html = '';

    for (let article of articles) {

        /* get the article id */
        const articleId = article.getAttribute('id');
        /* find the title element and get the title from the title element */
        const articleTitle = article.querySelector(optTitleSelector).innerHTML;
        /* create HTML of the link */
        const linkHTML = '<li><a href = "#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
        /* insert link into titleList */
        /*titleList.insertAdjacentHTML('beforeend', linkHTML);*/
        html += linkHTML;
        //console.log(html);
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');

    for (let link of links) {
        link.addEventListener('click', titleClickHandler);
    }
}

generateTitleLinks();

function generateTags() {
    /* find all articles */
    let articles = document.querySelectorAll(optArticleSelector);
    //console.log(articles);
    /* START LOOP: for every article: */
    for (let article of articles) {
        /* find tags wrapper */
        const tagsWrapper = article.querySelector(optArticleTagsSelector);
        //console.log(tagsWrapper);
        /* make html variable with empty string */
        let html = '';
        //console.log(html);
        /* get tags from data-tags attribute */
        const articleTags = article.getAttribute('data-tags');
        //console.log(articleTags);
        /* split tags into array */
        const articleTagsArray = articleTags.split(' ');
        //console.log(articleTagsArray);
        /* START LOOP: for each tag */
        for (let tag of articleTagsArray) {
            /* generate HTML of the link */
            let linkHTML = '<li><a href = "#tag-' + tag + '">' + tag + '</a></li>';
            //console.log(linkHTML);
            /* add generated code to html variable */
            html += linkHTML + ' ';
            /* END LOOP: for each tag */
        }
        //console.log(html);

        /* insert HTML of all the links into the tags wrapper */
        tagsWrapper.innerHTML = html;
        /* END LOOP: for every article: */
    }
}

generateTags();

function tagClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = this.getAttribute('href');
    /* make a new constant "tag" and extract tag from the "href" constant */
    //console.log(href);
    const tag = href.replace('#tag-', '');
    //console.log(tag);
    /* find all tag links with class active */
    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    /* START LOOP: for each active tag link */
    for (let tag of activeTagLinks) {
        /* remove class active */
        tag.classList.remove('active');
        /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a[href ="' + href + '"');
    //console.log(tagLinks);
    /* START LOOP: for each found tag link */
    for (let tagLink of tagLinks) {
        /* add class active */
        tagLink.classList.add('active');
        /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
    /* find all links to tags */
    const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
    //console.log(tagLinks);
    /* START LOOP: for each link */
    for (let tagLink of tagLinks) {
        /* add tagClickHandler as event listener for that link */
        tagLink.addEventListener('click', tagClickHandler);
        /* END LOOP: for each link */
    }

}

addClickListenersToTags();

function generateAuthors() {
    /* find all articles */
    let articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    for (let article of articles) {
        /* find author wrapper */
        const authorWrapper = article.querySelector(optArticleAuthorSelector);
        /* get author from data-author attribute */
        const articleAuthor = article.getAttribute('data-author');
        //console.log(articleAuthor);
        /* generate HTML of the link */
        let linkHTML = '<a href ="' + articleAuthor + '">' + articleAuthor + '</a>';
        //console.log(linkHTML);
        /* insert HTML of all the links into the author wrapper */
        authorWrapper.innerHTML = 'by ' + linkHTML;
        /* END LOOP: for every article: */
    }
}

generateAuthors();

function authorClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    //console.log(href);
    /* find all author links with class active */
    const activeAuthorLinks = document.querySelectorAll('a.active[href="' + href + '"]');
    /* START LOOP: for each active author link */
    for (let author of activeAuthorLinks) {
        /* remove class active */
        author.classList.remove('active');
        /* END LOOP: for each active author link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */
    const authorLinks = document.querySelectorAll('a[href ="' + href + '"]');
    //console.log(authorLinks);
    /* START LOOP: for each found author link */
    for (let authorLink of authorLinks) {
        /* add class active */
        authorLink.classList.add('active');
        console.log(authorLink.classList);
        /* END LOOP: for each found author link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + href + '"]');
}

function addClickListenersToAuthors() {
    /* find all links to authors */
    const authorLinks = document.querySelectorAll('.post-author a');
    //console.log(authorLinks);
    /* START LOOP: for each link */
    for (let authorLink of authorLinks) {
        /* add tagClickHandler as event listener for that link */
        authorLink.addEventListener('click', authorClickHandler);
        /* END LOOP: for each link */
    }

}

addClickListenersToAuthors();