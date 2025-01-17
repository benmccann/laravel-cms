import React from 'react';
import { Header as MantineHeader, Container } from '@mantine/core';
import { useStyles } from './styles';
import { BackToPageButton, PublishButton } from '../..';

export function EditorHeader() {
  const { classes } = useStyles();

  return (
    <MantineHeader height={56} className={classes.header}>
      <Container className={classes.inner} >

        <PublishButton />
        <BackToPageButton />

      </Container>
    </MantineHeader>
  );
}