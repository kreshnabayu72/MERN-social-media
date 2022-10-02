import { ReplaceImage } from "../utility";

export default ({ user }) => {
  if (!user) {
    return;
  }

  return (
    <img
      className="border-radius-100"
      src={`/api/user/${user._id}/image`}
      alt="USERI"
      onError={(e) => ReplaceImage(e)}
    />
  );
};
