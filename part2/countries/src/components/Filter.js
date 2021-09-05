const Filter = ({ setFilter }) => {
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <form>
        find countries
        <input onChange={handleFilterChange}></input>
      </form>
    </div>
  );
};

export default Filter;
