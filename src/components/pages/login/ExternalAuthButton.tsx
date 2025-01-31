import {
  ActionIcon,
  lighten,
  MantineProvider,
  parseThemeColor,
  rgba,
  Tooltip,
  VariantColorsResolver,
} from '@mantine/core';
import Link from 'next/link';

const variantColorResolver =
  (alpha: number): VariantColorsResolver =>
  (input) => {
    const parsedColor = parseThemeColor({
      color: input.color || input.theme.primaryColor,
      theme: input.theme,
    });

    return {
      background: rgba(parsedColor.value, 1),
      hover: rgba(parsedColor.value, alpha),
      border: `1px solid ${parsedColor.value}`,
      color: lighten(parsedColor.value, 1),
      hoverColor: rgba(parsedColor.value, 1),
    };
  };

export default function ExternalAuthButton({
  provider,
  alpha,
  leftSection,
}: {
  provider: string;
  alpha: number;
  leftSection: React.ReactNode;
}) {
  return (
    <Tooltip label={`Sign in with ${provider}`}>
      <MantineProvider theme={{ variantColorResolver: variantColorResolver(alpha) }}>
        <ActionIcon
          component={Link}
          href={`/api/auth/oauth/${provider.toLowerCase()}`}
          color={`${provider.toLowerCase()}.0`}
          style={{
            transition: 'background-color 100ms ease, color 300ms ease',
          }}
          p='lg'
          variant='oauth'
        >
          {leftSection}
        </ActionIcon>
      </MantineProvider>
    </Tooltip>
  );
}
