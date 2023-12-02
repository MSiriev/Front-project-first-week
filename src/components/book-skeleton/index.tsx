
import './index.scss'

export const BookSkeleton = () => {
  return (
    <div className="card is-loading">
      <div className="image"></div>
      <div className="content">
        <h2></h2>
        <p></p>
      </div>
    </div>
  );
};
