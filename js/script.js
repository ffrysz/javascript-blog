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
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.list.tags',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-',
    optAuthorsListSelector = '.list.authors';

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

function calculateTagsParams(tags) {
    const params = {
        maxOccurence: 0,
        minOccurence: 999999,
    };
    for (let tag in tags) {
        //console.log(tags[tag]);
        if (tags[tag] > params.maxOccurence) {
            params.maxOccurence = tags[tag];
        } else if (tags[tag] < params.minOccurence) {
            params.minOccurence = tags[tag];
        }
    }
    return params;
}

function calculateTagClass(count, params) {
    const tagCountDiff = params.maxOccurence - params.minOccurence;
    const classNumber = Math.floor(((count - params.minOccurence) / tagCountDiff) * (optCloudClassCount - 1) + 1);
    const className = optCloudClassPrefix + classNumber;
    return className;
}

function generateTags() {
    /* [NEW] create a new variable allTags with an empty object */
    const allTags = {};
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
            /* [NEW] check if this link is NOT already in allTags */
            if (!allTags[tag]) {
                /* [NEW] add generated code to allTags object */
                allTags[tag] = 1;
            } else {
                allTags[tag]++;
            }
            /* END LOOP: for each tag */
        }
        //console.log(html);

        /* insert HTML of all the links into the tags wrapper */
        tagsWrapper.innerHTML = html;
        /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);

    /* [NEW] find min and max amount of tag's occurences */
    const tagsParams = calculateTagsParams(allTags);
    //console.log('tagsParams: ', tagsParams);

    /* [NEW] add html from allTags to tagList */
    /* [NEW] create variable for all links HTML code */
    let allTagsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */
    for (let tag in allTags) {
        /* [NEW] generate code of a link and add it to allTagsHTML */
        //allTagsHTML += '<a href = "#tag-' + tag + '">' + tag + ' (' + allTags[tag] + ') ' + '</a>';
        allTagsHTML += '<li><a href = "#tag-' + tag + '" class =' + calculateTagClass(allTags[tag], tagsParams) + '>' + tag + ' ' + /*' (' + allTags[tag] + ') ' +*/ '</a></li>';
    }
    /* [NEW] END LOOP: for each tag in allTags: */

    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;
}

generateTags();

function tagClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
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
    const allAuthors = {};
    /* find all articles */
    let articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    for (let article of articles) {
        /* find author wrapper */
        const authorWrapper = article.querySelector(optArticleAuthorSelector);
        /* get author from data-author attribute */
        const articleAuthor = article.getAttribute('data-author');
        //console.log(articleAuthor);
        if (!allAuthors[articleAuthor]) {
            allAuthors[articleAuthor] = 1;
        } else {
            allAuthors[articleAuthor]++;
        }
        //console.log(allAuthors);
        /* generate HTML of the link */
        let linkHTML = '<a href ="#author-' + articleAuthor + '">' + articleAuthor + '</a>';
        //console.log(linkHTML);
        /* insert HTML of all the links into the author wrapper */
        authorWrapper.innerHTML = 'by ' + linkHTML;
        /* END LOOP: for every article: */
    }
    /* Make variable with authors list selector */
    const authorsList = document.querySelector(optAuthorsListSelector);
    /* Html variable for author list */
    let allAuthorsHTML = '';
    /* Loop creating html for each author */
    for (let author in allAuthors) {
        allAuthorsHTML += '<li><a href ="#author-' + author + '"><span class="author-name">' + author + '(' + allAuthors[author] + ')' + '</span></a></li>';
    }
    /* Add HTML content to authors list */
    authorsList.innerHTML = allAuthorsHTML;

}

generateAuthors();

function authorClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    const author = href.replace('#author-', '');
    /* find all author links with class active */
    const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author"]');
    /* START LOOP: for each active author link */
    for (let author of activeAuthorLinks) {
        /* remove class active */
        author.classList.remove('active');
        /* END LOOP: for each active author link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */
    const authorLinks = document.querySelectorAll('a[href ="' + href + '"]');
    /* START LOOP: for each found author link */
    for (let authorLink of authorLinks) {
        /* add class active */
        authorLink.classList.add('active');
        /* END LOOP: for each found author link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
    /* find all links to authors */
    const authorLinks = document.querySelectorAll('a[href^="#author-"]');
    /* START LOOP: for each link */
    for (let authorLink of authorLinks) {
        /* add tagClickHandler as event listener for that link */
        authorLink.addEventListener('click', authorClickHandler);
        /* END LOOP: for each link */
    }

}

addClickListenersToAuthors();