import { ActionIcon, Tooltip } from '@mantine/core';
import Link from 'next/link';
import styles from './ExternalAuthButton.module.css';

export default function ExternalAuthButton({
  provider,
  leftSection,
}: {
  provider: string;
  leftSection: React.ReactNode;
}) {
  return (
    <Tooltip label={`Sign in with ${provider}`}>
      <ActionIcon
        component={Link}
        href={`/api/auth/oauth/${provider.toLowerCase()}`}
        color={`${provider.toLowerCase()}.0`}
        className={styles.button}
        p='lg'
        variant='oauth'
      >
        {leftSection}
      </ActionIcon>
    </Tooltip>
  );
}
