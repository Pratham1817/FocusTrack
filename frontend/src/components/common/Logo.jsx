const Logo = ({ className, onClick }) => {
  return (
    <h1 onClick={onClick} className={className}>
      TaskFlow Pro
    </h1>
  );
};
export default Logo;
