export const LOGO_URL="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";
export const Photo_Url="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738815869~exp=1738819469~hmac=64c1ce7e04a726940e7b329f381b54ee693fa202b3e1ee1145dd5e0662066fde&w=740";

export const API_OPTION = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer ' + (import.meta.env.VITE_TMDB_KEY || ''),
  },
};
export const NEW_LOGO="netflix-gpt\public\new logo 2.webp";

export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500";
export const TMDB_IMG_URL = "https://image.tmdb.org/t/p/w500";
export const BG_URL = "https://assets.nflxext.com/ffe/siteui/vlv3/aa9edac4-a0e6-4f12-896e-32c518daec62/web/IN-en-20241223-TRIFECTA-perspective_1502c512-be5f-4f14-b21a-e3d75fe159ab_small.jpg";
export const SUPPORTED_LANG = [
  { identifier: "en", name: "English" },
  { identifier: "hin", name: "Hindi" },
  { identifier: "bhoj", name: "Bhojpuri" },
  { identifier: "span", name: "Spanish" },
];
export const GPT_API = import.meta.env.VITE_GPT_API || '';