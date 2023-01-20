export default function Index() {
  return null;
}

export const getServerSideProps = async () => {
  return {
    redirect: {
      destination: '/doctors',
      permanent: false,
    },
  };
};
