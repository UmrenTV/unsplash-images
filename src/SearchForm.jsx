import { useGlobalContext } from "./context";

const SearchForm = () => {
    const { setSearchQuery } = useGlobalContext();
    const handleSubmit = (e) => {
        e.preventDefault();
        const searchValue = e.target.elements.search.value; // the search is the actual input name we've set below
        if (!searchValue) return;
        setSearchQuery(searchValue);
        e.target.elements.search.value = "";
    };

    return (
        <section>
            <h1 className="title">unsplash images</h1>
            <form className="search-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="search-input form-input"
                    name="search"
                    placeholder="cat"
                />
                <button type="submit" className="btn">
                    Submit
                </button>
            </form>
        </section>
    );
};

export default SearchForm;
