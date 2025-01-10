import Layout from '@/components/Layout';
import DashboardInvites from '@/components/pages/invites';
import { prisma } from '@/lib/db';
import useLogin from '@/lib/hooks/useLogin';
import { withSafeConfig } from '@/lib/middleware/next/withSafeConfig';
import { isAdministrator } from '@/lib/role';
import { getSession } from '@/server/session';
import { LoadingOverlay } from '@mantine/core';
import { InferGetServerSidePropsType } from 'next';

export default function DashboardAdminInvites({
  config,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { loading } = useLogin(true);
  if (loading) return <LoadingOverlay visible />;

  return (
    <Layout config={config}>
      <DashboardInvites />
    </Layout>
  );
}

export const getServerSideProps = withSafeConfig(async (ctx) => {
  const session = await getSession(ctx.req, ctx.res);
  if (!session.id || !session.sessionId)
    return {
      notFound: true,
    };

  const currentUser = await prisma.user.findFirst({
    where: {
      sessions: {
        has: session.sessionId,
      },
    },
  });

  if (!currentUser)
    return {
      notFound: true,
    };

  if (!isAdministrator(currentUser.role))
    return {
      notFound: true,
    };

  return {};
});

DashboardAdminInvites.title = 'Invites';
