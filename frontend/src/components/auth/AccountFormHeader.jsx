const AccountFormHeader = ({ pText, spanText }) => {
  return (
    <div className="text-center">
      <p className="text-md font-bold sm:text-xl md:text-2xl">{pText}</p>
      <span className="text-xs sm:text-sm md:text-base">{spanText}</span>
    </div>
  );
};

export default AccountFormHeader;
