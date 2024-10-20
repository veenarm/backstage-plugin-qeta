/* eslint-disable no-console */
import React from 'react';
import ReactMde from 'react-mde';

import { Config } from '@backstage/config';
import 'react-mde/lib/styles/css/react-mde.css';
import 'react-mde/lib/styles/css/react-mde-editor.css';
import 'react-mde/lib/styles/css/react-mde-toolbar.css';
import { useStyles } from '../../utils/hooks';
import FileType from 'file-type';
import { errorApiRef, useApi } from '@backstage/core-plugin-api';
import { qetaApiRef } from '@drodil/backstage-plugin-qeta-react';
import { MarkdownRenderer } from '../MarkdownRenderer/MarkdownRenderer';

export const MarkdownEditor = (props: {
  config: Config;
  value: string;
  onChange: (value: string) => void;
  height: number;
  error?: boolean;
  placeholder?: string;
  onImageUpload: (imageId: number) => void;
}) => {
  const { config, value, onChange, height, error, placeholder } = props;
  const [selectedTab, setSelectedTab] = React.useState<'write' | 'preview'>(
    'write',
  );
  const styles = useStyles();
  const errorApi = useApi(errorApiRef);
  const qetaApi = useApi(qetaApiRef);

  const imageUpload = () => {
    // eslint-disable-next-line func-names
    return async function* (data: ArrayBuffer) {
      const fileType = await FileType.fromBuffer(data);

      const mimeType = fileType ? fileType.mime : 'text/plain';
      const attachment = await qetaApi.postAttachment(
        new Blob([data], { type: mimeType }),
      );
      if ('errors' in attachment) {
        errorApi.post({
          name: 'Upload failed',
          message: attachment.errors?.map(e => e.message).join(', ') ?? '',
        });
        return false;
      }
      props.onImageUpload(attachment.id);
      yield attachment.locationUri;
      return true;
    };
  };

  const isUploadDisabled =
    config?.getOptionalBoolean('qeta.storage.disabled') || false;

  return (
    <ReactMde
      classes={{
        reactMde: `qetaMarkdownEditorEdit ${styles.markdownEditor}`,
        textArea: error
          ? `qetaMarkdownEditorError ${styles.markdownEditorError}`
          : undefined,
        preview: 'qetaMarkdownEditorPreview',
        toolbar: 'qetaMarkdownEditorToolbar',
      }}
      value={value}
      onChange={onChange}
      selectedTab={selectedTab}
      onTabChange={setSelectedTab}
      minEditorHeight={height}
      minPreviewHeight={height - 10}
      childProps={{
        textArea: {
          required: true,
          placeholder,
        },
      }}
      generateMarkdownPreview={content =>
        Promise.resolve(
          <MarkdownRenderer
            content={content}
            className={`qetaMarkdownEditorPreview ${styles.markdownContent}`}
          />,
        )
      }
      paste={
        isUploadDisabled
          ? undefined
          : {
              saveImage: imageUpload(),
            }
      }
    />
  );
};
