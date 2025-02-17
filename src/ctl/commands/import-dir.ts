import { guess } from '@/lib/mimes';
import { statSync } from 'fs';
import { readFile, readdir } from 'fs/promises';
import { join, parse, resolve } from 'path';

export async function importDir(directory: string, { id, folder }: { id?: string; folder?: string }) {
  const fullPath = resolve(directory);
  if (!statSync(fullPath).isDirectory()) return console.error('Not a directory:', directory);

  const { prisma } = await import('@/lib/db/index.js');
  let userId: string;

  if (id) {
    userId = id;
  } else {
    const user = await prisma.user.findFirst({
      where: { username: 'administrator', role: 'SUPERADMIN' },
    });

    if (!user) {
      const firstSuperAdmin = await prisma.user.findFirst({
        where: {
          role: 'SUPERADMIN',
        },
      });

      if (!firstSuperAdmin) return console.error('No superadmin found or "administrator" user.');

      userId = firstSuperAdmin.id;

      console.log('No "administrator" found, using', firstSuperAdmin.username);
    } else {
      userId = user.id;
    }
  }

  if (folder) {
    const exists = await prisma.folder.findFirst({
      where: {
        id: folder,
        userId,
      },
    });

    if (!exists) return console.error('Folder not found:', folder);
  }

  const files = await readdir(fullPath);
  const data = [];

  for (let i = 0; i !== files.length; ++i) {
    const info = parse(files[i]);
    const mime = await guess(info.ext.replace('.', ''));
    const { size } = statSync(join(fullPath, files[i]));

    data[i] = {
      name: info.base,
      type: mime,
      size,
      userId,
      ...(folder ? { folderId: folder } : {}),
    };
  }

  const res = await prisma.file.createMany({
    data,
  });

  console.log('Imported', res.count, 'files');

  const { datasource } = await import('@/lib/datasource/index.js');
  for (let i = 0; i !== files.length; ++i) {
    const buff = await readFile(join(fullPath, files[i]));

    await datasource.put(data[i].name, buff);
    console.log('Uploaded', data[i].name);
  }

  console.log('Done importing files.');
}
