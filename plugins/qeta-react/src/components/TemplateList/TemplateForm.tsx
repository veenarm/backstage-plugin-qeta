import React, { useEffect } from 'react';
import { useIsModerator, useTranslation } from '../../hooks';
import { QetaApi, TemplateRequest } from '@drodil/backstage-plugin-qeta-common';
import { useApi } from '@backstage/core-plugin-api';
import { qetaApiRef } from '../../api';
import { Controller, useForm } from 'react-hook-form';
import { stringifyEntityRef } from '@backstage/catalog-model';
import { CatalogApi } from '@backstage/catalog-client';
import { compact } from 'lodash';
import { catalogApiRef } from '@backstage/plugin-catalog-react';
import { MarkdownEditor } from '../MarkdownEditor/MarkdownEditor';
import { TagInput } from '../PostForm/TagInput';
import { EntitiesInput } from '../PostForm/EntitiesInput';
import { TemplateFormValues } from '../PostForm/types';
import { Button, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const formToRequest = (form: TemplateFormValues): TemplateRequest => {
  return {
    ...form,
    entities: form.entities?.map(stringifyEntityRef),
  };
};

const getDefaultValues = (): TemplateFormValues => {
  return {
    title: '',
    description: '',
    tags: [],
    entities: [],
  };
};

const getValues = async (
  api: QetaApi,
  catalogApi: CatalogApi,
  id?: string,
): Promise<TemplateFormValues> => {
  if (!id) {
    return getDefaultValues();
  }

  const template = await api.getTemplate(id);
  const entities =
    template.entities && template.entities.length > 0
      ? await catalogApi.getEntitiesByRefs({
          entityRefs: template.entities,
          fields: [
            'kind',
            'metadata.name',
            'metadata.namespace',
            'metadata.title',
          ],
        })
      : [];
  return {
    title: template.title,
    description: template.description,
    questionTitle: template.questionTitle,
    questionContent: template.questionContent,
    tags: template.tags ?? [],
    entities: 'items' in entities ? compact(entities.items) : [],
  };
};

export const TemplateForm = (props: { id?: number; onPost: () => void }) => {
  const { id, onPost } = props;
  const [posting, setPosting] = React.useState(false);
  const catalogApi = useApi(catalogApiRef);
  const qetaApi = useApi(qetaApiRef);
  const [error, setError] = React.useState(false);
  const [values, setValues] = React.useState(getDefaultValues());
  const { isModerator } = useIsModerator();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TemplateFormValues>({
    values,
    defaultValues: getDefaultValues(),
  });

  useEffect(() => {
    if (id) {
      getValues(qetaApi, catalogApi, id.toString(10)).then(data => {
        setValues(data);
      });
    }
  }, [qetaApi, catalogApi, id]);

  const postTemplate = (data: TemplateFormValues) => {
    setPosting(true);

    if (id) {
      qetaApi
        .updateTemplate(id, formToRequest(data))
        .then(_q => {
          reset();
          onPost();
        })
        .catch(_e => {
          setPosting(false);
        });
      return;
    }
    qetaApi
      .createTemplate(formToRequest(data))
      .then(q => {
        if (!q || !q.id) {
          setError(true);
          return;
        }
        reset();
        onPost();
      })
      .catch(_e => {
        setError(true);
        setPosting(false);
      });
  };

  if (!isModerator) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit(postTemplate)}>
      {error && (
        <Alert severity="error">{t('templateList.errorPosting')}</Alert>
      )}
      <TextField
        label={t('templateList.titleInput.label')}
        className="qetaTemplateFormTitle"
        required
        fullWidth
        error={'title' in errors}
        margin="normal"
        variant="outlined"
        helperText={t('templateList.titleInput.helperText')}
        {
          // @ts-ignore
          ...register('title', { required: true, maxLength: 255 })
        }
      />

      <TextField
        label={t('templateList.descriptionInput.label')}
        className="qetaTemplateFormDescription"
        required
        fullWidth
        error={'description' in errors}
        margin="normal"
        variant="outlined"
        helperText={t('templateList.descriptionInput.helperText')}
        {
          // @ts-ignore
          ...register('description', { required: true, maxLength: 255 })
        }
      />

      <TextField
        label={t('templateList.questionTitleInput.label')}
        className="qetaTemplateFormQuestionTitle"
        fullWidth
        error={'questionTitle' in errors}
        margin="normal"
        variant="outlined"
        helperText={t('templateList.questionTitleInput.helperText')}
        {
          // @ts-ignore
          ...register('questionTitle', { maxLength: 255 })
        }
      />

      <Controller
        control={control}
        rules={{}}
        render={({ field: { onChange, value } }) => (
          <MarkdownEditor
            value={value ?? ''}
            disableAttachments
            onChange={onChange}
            height={400}
            error={'questionContent' in errors}
            placeholder={t('templateList.questionContentInput.placeholder')}
          />
        )}
        name="questionContent"
      />
      <Controller
        control={control}
        render={({
          field: { onChange, value },
          fieldState: { error: tagError },
        }) => <TagInput value={value} onChange={onChange} error={tagError} />}
        name="tags"
      />
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <EntitiesInput value={value} onChange={onChange} />
        )}
        name="entities"
      />
      <Button
        color="primary"
        type="submit"
        variant="contained"
        disabled={posting}
      >
        {id
          ? t('templateList.submit.existingTemplate')
          : t('templateList.submit.newTemplate')}
      </Button>
    </form>
  );
};
