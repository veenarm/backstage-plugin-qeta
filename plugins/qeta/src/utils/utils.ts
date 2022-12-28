import { Entity, stringifyEntityRef } from '@backstage/catalog-model';

export const getEntityTitle = (entity: Entity) => {
  return entity.metadata.title ?? stringifyEntityRef(entity);
};

export const getEntityUrl = (entity: Entity) => {
  return `/catalog/${entity.metadata.namespace ?? 'default'}/${entity.kind}/${
    entity.metadata.name
  }`.toLowerCase();
};

export const formatUsername = (username: string) => {
  const plainUsername = username.split(/[\/:]+/).pop();
  return plainUsername
    ?.split(/[_.-]+/)
    .map(a => a.charAt(0).toUpperCase() + a.slice(1))
    .join(' ');
};
