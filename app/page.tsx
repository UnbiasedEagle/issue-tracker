import Pagination from '@/app/components/Pagination';

interface Props {
  searchParams: {
    page: string;
  };
}

const HomePage = ({ searchParams }: Props) => {
  return (
    <Pagination
      itemCount={100}
      pageSize={10}
      currentPage={Number(searchParams.page)}
    />
  );
};

export default HomePage;
