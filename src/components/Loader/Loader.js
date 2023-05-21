import { FallingLines } from 'react-loader-spinner';

export default function Loader() {
  return (
    <FallingLines
      color="#8184e5"
      width="10"
      height="10"
      visible={true}
      ariaLabel="falling-lines-loading"
    />
  );
}
