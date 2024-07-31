type LogoProps = {
  url: string;
};

const Logo = ({ url }: LogoProps) => {
  return (
    <div>
      <img src={`${url}`} alt="sdf" />
    </div>
  );
};
export default Logo;
