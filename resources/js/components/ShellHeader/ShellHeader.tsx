import React from 'react';
import { Header as MantineHeader, Container, SegmentedControl, Center, Box } from '@mantine/core';
import { IconEye, IconPencil } from '@tabler/icons';
import { useStyles } from './styles';
import { PublishButton } from '../../features/publisher';

const viewControllOptions = [
    {
      value: 'edit',
      label: (
        <Center>
          <IconPencil size={16} />
          <Box ml={10}>Bearbeiten</Box>
        </Center>
      ),
    },
    {
      value: 'preview',
      label: (
        <Center>
          <IconEye size={16} />
          <Box ml={10}>Vorschau</Box>
        </Center>
      ),
    },
];

export function ShellHeader() {
  const { classes } = useStyles();

  return (
    <MantineHeader height={56}>
      <Container className={classes.inner} >

        <PublishButton />
        <SegmentedControl
            data={viewControllOptions}
        />
      </Container>
    </MantineHeader>
  );
}