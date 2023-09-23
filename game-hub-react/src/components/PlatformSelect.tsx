import {Platform} from '../types.ts';

interface Props {
  platforms: Platform[];
  selected?: string;
  error: string;
  handleSelect: (id: string) => void;
}

const PlatformSelect = ({platforms, selected, error, handleSelect}: Props) => {
  return (
    <>
      <h2>Platforms</h2>
      {error && <p>{error}</p>}
      <select onChange={(event) => handleSelect(event.target.value)}>
        <option key="all" value="">All</option>
        {platforms.map(platform =>
          <option key={platform.id} value={platform.id}
                  selected={selected === platform.id.toString()}>{platform.name}</option>)}
      </select>
    </>
  );
};

export default PlatformSelect;
