import { z } from 'zod';

export type Zipline3Export = {
  versions: {
    zipline: string;
    node: string;
    export: '3';
  };

  request: {
    user: string;
    date: string;
    os: {
      platform: 'aix' | 'darwin' | 'freebsd' | 'linux' | 'openbsd' | 'sunos' | 'win32';
      arch:
        | 'arm'
        | 'arm64'
        | 'ia32'
        | 'loong64'
        | 'mips'
        | 'mipsel'
        | 'ppc'
        | 'ppc64'
        | 'riscv64'
        | 's390'
        | 's390x'
        | 'x64';
      cpus: number;
      hostname: string;
      release: string;
    };
    env: NodeJS.ProcessEnv;
  };

  // Creates a unique identifier for each model
  // used to map the user's stuff to other data owned by the user
  user_map: Record<number, string>;
  thumbnail_map: Record<number, string>;
  folder_map: Record<number, string>;
  file_map: Record<number, string>;
  url_map: Record<number, string>;
  invite_map: Record<number, string>;

  users: {
    [id: string]: {
      username: string;
      password: string;
      avatar: string;
      administrator: boolean;
      super_administrator: boolean;
      embed: {
        title?: string;
        site_name?: string;
        description?: string;
        color?: string;
      };
      totp_secret: string;
      oauth: {
        provider: 'DISCORD' | 'GITHUB' | 'GOOGLE';
        username: string;
        oauth_id: string;
        access_token: string;
        refresh_token: string;
      }[];
    };
  };

  files: {
    [id: string]: {
      name: string;
      original_name: string;
      type: `${string}/${string}`;
      size: number | bigint;
      user: string | null;
      thumbnail?: string;
      max_views: number;
      views: number;
      expires_at?: string;
      created_at: string;
      favorite: boolean;
      password?: string;
    };
  };

  thumbnails: {
    [id: string]: {
      name: string;
      created_at: string;
    };
  };

  folders: {
    [id: string]: {
      name: string;
      public: boolean;
      created_at: string;
      user: string;
      files: string[];
    };
  };

  urls: {
    [id: number]: {
      destination: string;
      vanity?: string;
      code: string;
      created_at: string;
      max_views: number;
      views: number;
      user: string;
    };
  };

  invites: {
    [id: string]: {
      code: string;
      expites_at?: string;
      created_at: string;
      used: boolean;

      created_by_user: string;
    };
  };

  stats: {
    created_at: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
  }[];
};

export const export3Schema = z.object({
  versions: z.object({
    zipline: z.string(),
    node: z.string(),
    export: z.literal('3'),
  }),

  request: z.object({
    user: z.string(),
    date: z.string(),
    os: z.object({
      platform: z.union([
        z.literal('aix'),
        z.literal('darwin'),
        z.literal('freebsd'),
        z.literal('linux'),
        z.literal('openbsd'),
        z.literal('sunos'),
        z.literal('win32'),
      ]),
      arch: z.union([
        z.literal('arm'),
        z.literal('arm64'),
        z.literal('ia32'),
        z.literal('loong64'),
        z.literal('mips'),
        z.literal('mipsel'),
        z.literal('ppc'),
        z.literal('ppc64'),
        z.literal('riscv64'),
        z.literal('s390'),
        z.literal('s390x'),
        z.literal('x64'),
      ]),
      cpus: z.number(),
      hostname: z.string(),
      release: z.string(),
    }),
    env: z.record(z.string()),
  }),

  user_map: z.record(z.string()),
  thumbnail_map: z.record(z.string()),
  folder_map: z.record(z.string()),
  file_map: z.record(z.string()),
  url_map: z.record(z.string()),
  invite_map: z.record(z.string()),

  users: z.record(
    z.object({
      username: z.string(),
      password: z.string(),
      avatar: z.string(),
      administrator: z.boolean(),
      super_administrator: z.boolean(),
      embed: z.object({
        title: z.string().optional().nullable(),
        site_name: z.string().optional().nullable(),
        description: z.string().optional().nullable(),
        color: z.string().optional().nullable(),
      }),
      totp_secret: z.string().optional().nullable(),
      oauth: z.array(
        z.object({
          provider: z.union([z.literal('DISCORD'), z.literal('GITHUB'), z.literal('GOOGLE')]),
          username: z.string(),
          oauth_id: z.string(),
          access_token: z.string().nullable(),
          refresh_token: z.string().nullable(),
        }),
      ),
    }),
  ),

  files: z.record(
    z.object({
      name: z.string(),
      original_name: z.string().nullable(),
      type: z.string(),
      size: z.union([z.number(), z.bigint()]),
      user: z.string().nullable(),
      thumbnail: z.string().optional().nullable(),
      max_views: z.number().nullable(),
      views: z.number(),
      expires_at: z.string().optional().nullable(),
      created_at: z.string(),
      favorite: z.boolean(),
      password: z.string().optional().nullable(),
    }),
  ),

  thumbnails: z.record(
    z.object({
      name: z.string(),
      created_at: z.string(),
    }),
  ),

  folders: z.record(
    z.object({
      name: z.string(),
      public: z.boolean(),
      created_at: z.string(),
      user: z.string(),
      files: z.array(z.string()),
    }),
  ),

  urls: z.record(
    z.object({
      destination: z.string(),
      vanity: z.string().optional().nullable(),
      code: z.string(),
      created_at: z.string(),
      max_views: z.number(),
      views: z.number(),
      user: z.string(),
    }),
  ),

  invites: z.record(
    z.object({
      code: z.string(),
      expites_at: z.string().optional().nullable(),
      created_at: z.string(),
      used: z.boolean(),
      created_by_user: z.string(),
    }),
  ),

  stats: z.array(
    z.object({
      created_at: z.string(),
      data: z.any(),
    }),
  ),
});

export type Export3 = z.infer<typeof export3Schema>;

export function validateExport(data: unknown): ReturnType<typeof export3Schema.safeParse> {
  const result = export3Schema.safeParse(data);
  if (!result.success) {
    if (typeof window === 'object') console.error('Failed to validate export data', result.error);
  }

  return result;
}
