import {
  createTranslationRef,
  createTranslationResource,
} from '@backstage/core-plugin-api/alpha';
import i18next from 'i18next';

i18next.services?.formatter?.add('lowercase', (value, _lng, _options) => {
  return value.toLowerCase();
});

i18next.services?.formatter?.add('capitalize', (value, _lng, _options) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
});

/** @alpha */
export const qetaTranslationRef = createTranslationRef({
  id: 'qeta',
  messages: {
    pluginName: 'Q&A',
    answerList: {
      errorLoading: 'Could not load answers',
      noAnswers: 'No answers',
      limitSelect: 'Answers per page',
    },
    common: {
      score: '{{score}} score',
      comments: 'Comments',
      anonymousAuthor: 'Anonymous',
      answers_zero: 'No answers',
      answers_one: '{{count}} answer',
      answers_other: '{{count}} answers',
      views_zero: 'Viewed {{count}} times',
      views_one: 'Viewed {{count}} time',
      views_other: 'Viewed {{count}} times',
      viewsShort_zero: '0 views',
      viewsShort_one: '{{count}} view',
      viewsShort_other: '{{count}} views',
      posts_zero: 'No {{itemType, lowercase}}s',
      posts_one: '{{count}} {{itemType, lowercase}}',
      posts_other: '{{count}} {{itemType, lowercase}}s',
    },
    answer: {
      questionTitle: 'Q: {{question}}',
      answeredTime: 'answered',
    },
    answerContainer: {
      title: {
        answersBy: 'Answers by',
        answersAbout: 'Answers about',
        answersTagged: `Answers tagged with {{tags}}`,
      },
      search: {
        label: 'Search for answers',
        placeholder: 'Search...',
      },
    },
    anonymousCheckbox: {
      tooltip:
        "By enabling this, other users won't be able to see you as an author",
      answerAnonymously: 'Answer anonymously',
      postAnonymously: 'Post anonymously',
    },
    postForm: {
      errorPosting: 'Could not post {{type}}',
      titleInput: {
        label: 'Title',
        helperText:
          'Write good title for your {{type}} that people can understand',
      },
      contentInput: {
        placeholder: 'Your {{type}}',
      },
      submit: {
        existingPost: 'Save',
        newPost: 'Post',
      },
    },
    answerForm: {
      errorPosting: 'Could not post answer',
      contentInput: {
        placeholder: 'Your answer',
      },
      submit: {
        existingAnswer: 'Save',
        newAnswer: 'Post',
      },
    },
    entitiesInput: {
      label: 'Entities',
      placeholder: 'Type or select entities',
      helperText: 'Add up to {{max}} entities this question relates to',
    },
    tagsInput: {
      label: 'Tags',
      placeholder: 'Type or select tags',
      helperText: 'Add up to {{max}} tags to categorize your question',
    },
    askPage: {
      title: {
        existingQuestion: 'Edit question',
        entityQuestion: 'Ask a question about {{entity}}',
        newQuestion: 'Ask a question',
      },
    },
    writePage: {
      title: {
        existingArticle: 'Edit article',
        entityArticle: 'Write an article about {{entity}}',
        newArticle: 'New article',
      },
    },
    askQuestionButton: {
      title: 'Ask a question',
    },
    writeArticleButton: {
      title: 'Write an article',
    },
    backToQuestionsButton: {
      title: 'Back',
    },
    commentList: {
      deleteLink: 'delete',
    },
    commentSection: {
      input: {
        placeholder: 'Your comment',
      },
      addComment: 'Add comment',
      post: 'Post',
    },
    deleteModal: {
      title: {
        question: 'Are you sure you want to delete this post?',
        answer: 'Are you sure you want to delete this answer?',
      },
      errorDeleting: 'Failed to delete',
      deleteButton: 'Delete',
      cancelButton: 'Cancel',
    },
    favoritePage: {
      title: 'Favorited posts',
    },
    leftMenu: {
      home: 'Home',
      questions: 'Questions',
      articles: 'Articles',
      profile: 'Profile',
      tags: 'Tags',
      favoriteQuestions: 'Favorites',
      statistics: 'Statistics',
    },
    homePage: {
      title: 'Home',
    },
    impactCard: {
      title: 'Your impact',
      views: 'views',
      contributions: 'Your contributions helped {{lastWeek}} people this week',
    },
    rightMenu: {
      followedEntities: 'Followed entities',
      followedTags: 'Followed tags',
    },
    highlights: {
      loadError: 'Failed to load questions',
      own: {
        title: 'Your latest questions',
        noQuestionsLabel: 'No questions',
      },
      hotQuestions: {
        title: 'Hot questions',
        noQuestionsLabel: 'No questions',
      },
      hotArticles: {
        title: 'Hot articles',
        noArticlesLabel: 'No articles',
      },
      unanswered: {
        title: 'Unanswered questions',
        noQuestionsLabel: 'No unanswered questions',
      },
      incorrect: {
        title: 'Questions without correct answer',
        noQuestionsLabel: 'No questions without correct answers',
      },
    },
    questionsPage: {
      title: 'All questions',
    },
    articlesPage: {
      title: 'All articles',
    },
    userLink: {
      anonymous: 'Anonymous',
    },
    articlePage: {
      errorLoading: 'Could not load article',
      editButton: 'Edit this article',
      deleteButton: 'Delete this article',
    },
    questionPage: {
      errorLoading: 'Could not load question',
      editButton: 'Edit',
      sortAnswers: {
        label: 'Sort answers',
        default: 'Default',
        createdDesc: 'Created (desc)',
        createdAsc: 'Created (asc)',
        scoreDesc: 'Score (desc)',
        scoreAsc: 'Score (asc)',
        commentsDesc: 'Comments (desc)',
        commentsAsc: 'Comments (asc)',
        authorDesc: 'Author (desc)',
        authorAsc: 'Author (asc)',
        updatedDesc: 'Updated (desc)',
        updatedAsc: 'Updated (asc)',
      },
    },
    authorBox: {
      postedAtTime: 'Posted',
      updatedAtTime: 'Updated',
      updatedBy: 'by',
    },
    favorite: {
      remove: 'Remove this post from favorites',
      add: 'Mark this post as favorite',
    },
    link: {
      post: 'Copy link to this post to clipboard',
      answer: 'Copy link to this answer to clipboard',
      aria: 'Copy link to clipboard',
    },
    voteButtons: {
      answer: {
        markCorrect: 'Mark this answer correct',
        markIncorrect: 'Mark this answer incorrect',
        marked: 'This answer has been marked as correct',
        good: 'This answer is good',
        bad: 'This answer is not good',
        own: 'You cannot vote your own answer',
      },
      question: {
        good: 'This post is good',
        bad: 'This post is not good',
        own: 'You cannot vote your own post',
      },
    },
    datePicker: {
      from: 'From date',
      to: 'To date',
      invalidRange:
        "Date range invalid, 'To date' should be greater than 'From date'",
      range: {
        label: 'Date range',
        default: 'Select',
        last7days: 'Last 7 days',
        last30days: 'Last 30 days',
        custom: 'Custom',
      },
    },
    filterPanel: {
      filterButton: 'Filter',
      noAnswers: {
        label: 'No answers',
      },
      noCorrectAnswers: {
        label: 'No correct answers',
      },
      noVotes: {
        label: 'No votes',
      },
      orderBy: {
        label: 'Order by',
        created: 'Created',
        views: 'Views',
        score: 'Score',
        answers: 'Answers',
        updated: 'Updated',
      },
      order: {
        label: 'Order',
        asc: 'Ascending',
        desc: 'Descending',
      },
      filters: {
        label: 'Filters',
        entity: {
          label: 'Entity',
          placeholder: 'Type or select entity',
        },
        tag: {
          label: 'Tag',
          placeholder: 'Type or select tag',
        },
      },
    },
    postsList: {
      errorLoading: 'Could not load {{itemType, lowercase}}s',
      postsPerPage: '{{itemType, capitalize}}s per page',
    },
    postsContainer: {
      title: {
        by: `{{itemType, capitalize}}s by`,
        about: '{{itemType, capitalize}}s about',
        tagged: `{{itemType, capitalize}} tagged with {{tags}}`,
        favorite: 'Your favorite {{itemType, lowercase}}s',
      },
      search: {
        label: 'Search for {{itemType, lowercase}}',
        placeholder: 'Search...',
      },
      noItems: 'No {{itemType, lowercase}}s',
      createButton: 'Go ahead and create one!',
    },
    questionsTable: {
      errorLoading: 'Could not load questions',
      latest: 'Latest',
      mostViewed: 'Most viewed',
      favorites: 'Favorites',
      cells: {
        title: 'Title',
        author: 'Author',
        asked: 'Asked',
        updated: 'Last updated',
      },
    },
    statistics: {
      errorLoading: 'Could not load statistics',
      notAvailable: 'Statistics are unavailable',
      ranking: 'Ranking Q&A 🏆',
      mostQuestions: {
        title: 'Most questions',
        description: 'People who have posted most questions',
      },
      mostAnswers: {
        title: 'Most answers',
        description: 'People who have posted most answers',
      },
      topVotedQuestions: {
        title: 'Top voted questions',
        description: 'People who have the highest rated questions',
      },
      topVotedAnswers: {
        title: 'Top voted answers',
        description: 'People who have the highest rated answers',
      },
      topVotedCorrectAnswers: {
        title: 'Top voted correct answers',
        description: 'People who have the highest rated correct answers',
      },
    },
    tagPage: {
      errorLoading: 'Could not load tags',
      taggedWithTitle: 'Questions tagged with {{tag}}',
      defaultTitle: 'Tags',
      search: {
        label: 'Search tag',
        placeholder: 'Search...',
      },
      tags_zero: 'No tags',
      tags_one: 'Showing {{count}} tag',
      tags_other: 'Showing {{count}} tags',
    },
    userPage: {
      profileTab: 'Profile',
      statistics: 'Statistics',
      questions: 'Questions',
      answers: 'Answers',
      articles: 'Articles',
    },
    stats: {
      noStats: 'No statistics available. Check back later!',
      questions: 'Questions',
      answers: 'Answers',
      comments: 'Comments',
      votes: 'Votes',
      views: 'Views',
      articles: 'Articles',
    },
    tagButton: {
      follow: 'Follow',
      unfollow: 'Unfollow',
      tooltip:
        'By following a tag, you will get notified when ever a new post with that tag is posted',
    },
    entityButton: {
      follow: 'Follow',
      unfollow: 'Unfollow',
      tooltip:
        'By following an entity, you will get notified when ever a new post for that entity is posted',
    },
  },
});

export const qetaTranslations = createTranslationResource({
  ref: qetaTranslationRef,
  translations: {},
});
