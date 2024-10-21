import { useSearchParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { ContentHeader } from '@backstage/core-components';
import {
  PostHighlightList,
  PostsGrid,
  useTranslation,
  WriteArticleButton,
} from '@drodil/backstage-plugin-qeta-react';
import { filterTags } from '@drodil/backstage-plugin-qeta-common';
import { Grid } from '@material-ui/core';
import Whatshot from '@material-ui/icons/Whatshot';

export const ArticlesPage = () => {
  const [searchParams] = useSearchParams();

  const [entityRef, setEntityRef] = React.useState<string | undefined>(
    undefined,
  );
  const [tags, setTags] = React.useState<string[] | undefined>(undefined);
  const { t } = useTranslation();
  useEffect(() => {
    setEntityRef(searchParams.get('entity') ?? undefined);
    setTags(filterTags(searchParams.get('tags')));
  }, [searchParams, setEntityRef]);

  return (
    <Grid container spacing={4}>
      <Grid item md={12} lg={9} xl={10}>
        <ContentHeader title={t('articlesPage.title')}>
          <WriteArticleButton entity={entityRef} tags={tags} />
        </ContentHeader>
        <PostsGrid type="article" />
      </Grid>
      <Grid item lg={3} xl={2}>
        <PostHighlightList
          type="hot"
          title={t('highlights.hotArticles.title')}
          noQuestionsLabel={t('highlights.hotArticles.noArticlesLabel')}
          icon={<Whatshot fontSize="small" />}
          options={{ favorite: true }}
          postType="article"
        />
      </Grid>
    </Grid>
  );
};
