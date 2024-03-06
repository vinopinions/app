import Store from '../../api/pagination/Store';
import Rating from '../Rating';
import Winemaker from '../Winemaker';

type WineDto = {
  id?: string;
  name: string;
  year: number;
  grapeVariety: string;
  heritage: string;
  winemaker?: Winemaker;
  stores?: Store[];
  ratings?: Rating[];
};

export default WineDto;
