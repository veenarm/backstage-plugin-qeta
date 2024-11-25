import { Post } from '@drodil/backstage-plugin-qeta-common';
import { Link } from '@backstage/core-components';
import { RelativeTimeWithTooltip } from '../RelativeTimeWithTooltip/RelativeTimeWithTooltip';
import React from 'react';
import { useRouteRef } from '@backstage/core-plugin-api';
import { questionRouteRef } from '../../routes';
import { AuthorLink } from '../Links/Links';
import { TableCell, TableRow } from '@material-ui/core';

export const QuestionTableRow = (props: { question: Post }) => {
  const { question } = props;
  const questionRoute = useRouteRef(questionRouteRef);

  return (
    <TableRow key={question.id}>
      <TableCell>
        <Link to={questionRoute({ id: question.id.toString(10) })}>
          {question.title}
        </Link>
      </TableCell>
      <TableCell>
        <AuthorLink entity={question} />
      </TableCell>
      <TableCell>
        <RelativeTimeWithTooltip value={question.created} />
      </TableCell>
      <TableCell>
        <RelativeTimeWithTooltip
          value={question.updated ? question.updated : question.created}
        />
      </TableCell>
    </TableRow>
  );
};
