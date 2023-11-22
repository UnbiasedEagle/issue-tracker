import Pagination from '@/app/components/Pagination';

const HomePage = () => {
  return <Pagination itemCount={100} pageSize={10} currentPage={2} />;
};

export default HomePage;
